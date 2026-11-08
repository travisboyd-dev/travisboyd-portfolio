import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

const routes = [
  '/',
  '/projects/portfolio-as-code/',
  '/projects/azure-engineering/',
  '/projects/home-networking-lab/',
  '/projects/family-website/',
  '/404.html',
];

test('Azure deployment artifact preserves the custom 404 configuration', async () => {
  const config = JSON.parse(await readFile('dist/staticwebapp.config.json', 'utf8'));
  expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  expect(config.navigationFallback).toBeUndefined();
  expect(await readFile('dist/404.html', 'utf8')).toContain('A loose connection.');
});

for (const route of routes) {
  test(`${route} has accessible content and no browser errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('all internal links, fragment targets, and assets resolve', async ({ page, request }) => {
  const checked = new Set<string>();
  for (const route of routes) {
    const failedRequests: string[] = [];
    page.on('requestfailed', req => failedRequests.push(req.url()));
    await page.goto(route);
    const references = await page.locator('a[href], link[href], script[src], img[src]').evaluateAll(elements =>
      elements.map(element => element.getAttribute('href') ?? element.getAttribute('src') ?? ''),
    );
    for (const reference of references) {
      const url = new URL(reference, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      if (checked.has(url.href)) continue;
      checked.add(url.href);
      const response = await request.get(url.href);
      expect(response.status(), url.href).toBe(200);
      if (url.hash) {
        const targetPage = await page.context().newPage();
        await targetPage.goto(url.href);
        await expect(targetPage.locator(`[id=${JSON.stringify(decodeURIComponent(url.hash.slice(1)))}]`)).toHaveCount(1);
        await targetPage.close();
      }
    }
    expect(failedRequests).toEqual([]);
  }
});

test('layouts reflow without horizontal overflow across breakpoints', async ({ page }) => {
  for (const width of [320, 360, 390, 540, 768, 800, 801, 1024, 1100, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const overflowing = await page.evaluate(() =>
        [...document.querySelectorAll('main, header, footer, main a, nav a, h1, h2, h3, p')]
          .filter(element => {
            const rect = element.getBoundingClientRect();
            return rect.left < -1 || rect.right > document.documentElement.clientWidth + 1;
          }).map(element => ({ tag: element.tagName, text: element.textContent?.slice(0, 60) })),
      );
      expect(overflowing, `${route} at ${width}px`).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true);
    }
  }
});

test('keyboard users can skip navigation and open project cards', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const project = page.getByRole('link', { name: 'Portfolio-as-Code', exact: true });
  await project.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/projects\/portfolio-as-code\/$/);
  await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
  const bounds = await page.locator('#contact').boundingBox();
  const header = await page.locator('header').boundingBox();
  expect(bounds!.y).toBeGreaterThanOrEqual(header!.height);
});

test('mobile content passes accessibility checks and optional links remain hidden', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
  await expect(page.getByRole('link', { name: /linkedin|download résumé/i })).toHaveCount(0);
  await expect(page.locator('a[href="mailto:travis@travisboyd.dev"]')).toHaveCount(2);
});

test('unknown URLs return the custom 404 with a recovery link', async ({ page }) => {
  const response = await page.goto('/not-a-real-page/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A loose connection.');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
});

test('desktop hero actions fit above the fold and the illustration aligns with the headline', async ({ page }, testInfo) => {
  for (const [width, height] of [[1280, 720], [1366, 768], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    for (const action of await page.locator('.hero-actions a').all()) {
      const bounds = await action.boundingBox();
      expect(bounds!.y).toBeGreaterThan(0);
      expect(bounds!.y + bounds!.height, `Hero action at ${width}×${height}`).toBeLessThanOrEqual(height);
    }
    const headline = await page.locator('.hero h1').boundingBox();
    const illustration = await page.locator('.engineering-panel').boundingBox();
    expect(Math.abs(illustration!.y - headline!.y)).toBeLessThan(24);
    expect(illustration!.width).toBeLessThan(550);
    if (width === 1366) await page.screenshot({ path: testInfo.outputPath('desktop-hero.png') });
  }
});

test('hero actions navigate to the correct sections on desktop, tablet, and mobile', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 768, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    if (width !== 1366) await page.screenshot({ path: testInfo.outputPath(`hero-${width}.png`), fullPage: true });
    for (const [label, id] of [['Explore my projects', 'projects'], ['A little about me', 'about']]) {
      await page.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
      const section = await page.locator(`#${id}`).boundingBox();
      const header = await page.locator('header').boundingBox();
      expect(section!.y).toBeGreaterThanOrEqual(header!.height);
    }
  }
});
