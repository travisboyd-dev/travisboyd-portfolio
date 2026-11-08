# Portfolio review — November 8, 2026

The production artifact builds successfully and is structurally compatible with Azure Static Web Apps. The final local browser regression run passed all 14 tests, alongside four static-output tests. No deployment, Azure changes, commits, or pushes were performed during this review.

## Hero refinements

- Reduced desktop hero top padding from 100–120px to 48px, and mobile/tablet top padding from 55px to 32px.
- Aligned the original engineering illustration with the headline on desktop and retained its centered, stacked layout on smaller screens.
- Brightened navigation text within the existing neutral palette. Headline, fonts, mint accent, and illustration artwork remain unchanged.
- Verified both hero actions fit without scrolling at 1280×720, 1366×768, 1440×900, and 1920×1080.
- Verified both hero actions navigate to the correct sections on mobile, tablet, and desktop, with section headings clear of the sticky header.
- Reviewed desktop, tablet, and mobile screenshots from the production build.

## Issues fixed

1. The brand link's explicit accessible label conflicted with its visible text. Removed the redundant label so the visible domain supplies its accessible name; the decorative `tb.` mark remains hidden from assistive technology. The final axe checks pass.
2. Activating “Skip to content” scrolled the page without moving keyboard focus. The main landmark now has `tabindex="-1"`, allowing focus without introducing an extra Tab stop.
3. The generated 404 page advertised a canonical `/404` URL with no corresponding artifact. Error pages now use `noindex` and omit canonical/Open Graph URL metadata.
4. Azure-specific custom error handling was absent. Added a local `staticwebapp.config.json` that preserves a real 404 status and serves `/404.html`. It is included in the production output; Azure behavior has not been exercised against a deployed resource.
5. Added Node type definitions needed by the new TypeScript test configuration.

No broken internal navigation links or missing assets were found. No horizontal overflow was found across the tested routes and widths, including after the hero spacing and alignment refinements.

## Checks and results

| Check | Result |
| --- | --- |
| Initial Astro/TypeScript check | Passed before test additions |
| Final Astro/TypeScript check, including test tooling | Passed on 14 files; zero errors, warnings, or hints after adding Node types |
| Production build after site fixes | Passed; six static pages generated in `dist/` |
| Static-output tests after fixes | 4 passed: links/assets/fragments, shared accessibility markup, Azure 404 configuration, optional-link visibility |
| Initial browser suite | 4 passed, 7 failed; six failures shared the brand accessible-name defect, one identified the skip-link focus defect |
| Internal HTTP links, fragments, and assets | Passed in initial browser suite and final static-output tests |
| Responsive reflow | Passed on all six routes at 320, 360, 390, 540, 768, 800, 801, 1024, 1100, 1280, and 1440 CSS pixels |
| Browser errors | No uncaught page errors observed during initial route checks |
| Missing-route handling | Custom 404 status/content and recovery link passed in local production preview |
| Dependency installation | Successful; npm reported zero vulnerabilities, with a non-blocking cleanup warning for an optional platform package |
| Final browser rerun | 14 passed in local Chrome; no axe violations in the tested desktop/mobile scans |
| Hero CTA visibility and function | Passed on four desktop viewport sizes and mobile/tablet/desktop section navigation |
| Git whitespace check | `git diff --check` passed |

The final browser suite has 14 tests, including an Azure artifact assertion and hero-specific visibility, alignment, and navigation checks. Browser checks use axe WCAG A/AA rules and best practices. Runtime skip-link focus and the final axe scans pass. Automated Chrome tests do not replace manual screen-reader testing or testing in other browser engines.

The public GitHub profile URL remains exactly as supplied by the owner. The web lookup could not fetch that profile, so external profile availability is unverified. Mailto destinations are checked as markup; mailbox delivery is not tested. No real LinkedIn or résumé PDF link is displayed.

## Files changed in this review

| File | Change |
| --- | --- |
| `src/layouts/Layout.astro` | Accessible brand name, skip-target focus, optional noindex metadata |
| `src/styles/global.css` | Tighter hero spacing, improved navigation contrast, illustration alignment |
| `src/pages/404.astro` | Enable noindex for the error page |
| `public/staticwebapp.config.json` | Azure custom 404 response configuration |
| `package.json` / `package-lock.json` | Browser test tooling, Node types, test scripts and locked dependencies |
| `playwright.config.ts` | Local production preview and Chromium/Chrome test configuration |
| `tests/portfolio.spec.ts` | Browser accessibility, navigation, links, responsiveness, and artifact tests |
| `tests/static-output.test.mjs` | Browser-free checks of the generated artifact |
| `.gitignore` | Ignore browser test output and reports |
| `README.md` | Test setup and deployment artifact instructions |
| `docs/REVIEW.md` | Findings, evidence, and remaining verification |

The original implementation was already uncommitted when the review started. Its files remain in place; this list describes review changes only.

## Azure Static Web Apps readiness

The application is static: it needs no server adapter, Azure Functions API, database, runtime secrets, or client-side routing fallback. `dist/` contains the home page, all project pages, CSS, favicon, custom 404, and Azure configuration.

Microsoft documents `dist` as the [Astro output directory](https://learn.microsoft.com/en-us/azure/static-web-apps/front-end-frameworks). The custom 404 follows the documented [response override configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#response-overrides).

Before deployment approval:

1. Review the local result and approve the deployment work; the post-fix browser suite and keyboard-focus checks pass.
2. Define the Azure resource and deployment authorization, then prepare the approved GitHub Actions/Bicep setup.
3. Build with a compatible Node 24 environment and upload `dist/`. Prebuilding in Actions avoids relying on an unverified Azure automatic-build Node version.
4. Configure the domain and HTTPS after deployment approval, and verify direct project URLs and unknown-route 404 behavior on Azure.

**Assessment:** ready as a locally verified static deployment artifact; deployment infrastructure setup and Azure-specific smoke tests remain outstanding.
