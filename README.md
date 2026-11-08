# Project 001 — Portfolio-as-Code

Travis Boyd’s personal engineering portfolio for **travisboyd.dev**. Built with Astro and TypeScript as a static website, with a responsive dark design and reusable components. The initial implementation is local only; the domain in metadata is the intended production URL, not a deployment claim.

The portfolio presents an experienced C#/.NET Lead Software Developer expanding into Azure Cloud and DevOps engineering. Includes Home, About, Projects, Résumé, and Contact sections, four editable project entries with individual detail pages, and a custom 404 page.

## Requirements

- Node.js 24 LTS (24.10.0 used during setup) and npm.
- A terminal opened in this repository.

This is a custom implementation using Astro directly; no third-party portfolio theme is required. Fonts come from the operating system, graphics are CSS/SVG, and no external services or secrets are needed.

## Run locally

```powershell
npm.cmd ci
npm.cmd run dev
```

Open **http://127.0.0.1:4321/**. Astro prints the actual address; if the port is occupied, use the next port it reports. Keep the terminal open. Source changes reload automatically; stop with `Ctrl+C`.

On macOS/Linux, or a Windows shell without PowerShell script restrictions, `npm` can replace `npm.cmd`. Using `npm.cmd` avoids Windows blocking the unsigned `npm.ps1` shim; no execution-policy change is needed.

## Validate and preview a production build

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

Open the URL printed by the preview command (normally **http://127.0.0.1:4321/**). Stop the development server first or follow the different port printed by Astro. `check` validates Astro/TypeScript; `build` writes static output to `dist/`; `preview` serves that output locally. Rebuild after editing source to refresh the production preview.

Review the home page, four project pages, narrow/mobile layouts, keyboard navigation, and email/GitHub links. Section navigation intentionally uses home-page anchors. No client JavaScript is needed for navigation or content.

### Automated tests

```powershell
# Build, run static checks, and run the production-site browser suite
npx.cmd playwright install chromium
npm.cmd test
```

The browser download is a one-time setup per Playwright version. If Google Chrome is already installed, use it instead of downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm.cmd test
```

On macOS/Linux, use `PLAYWRIGHT_CHANNEL=chrome npm test` for installed Chrome. The test runner starts and stops a production preview at port 4322; keep that port free. It checks all six pages with axe, local links and fragments, keyboard navigation, custom 404 behavior, optional-link visibility, and reflow across 11 widths from 320 to 1440 pixels. Failures retain traces in ignored `test-results/`.

For tests that do not launch a browser, build first and run `npm.cmd run test:static`. These validate generated links, assets, fragments, accessibility markup, and Azure 404 configuration. Automated checks do not replace screen-reader or cross-browser review.

## Edit content

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | Name, description, email, GitHub, optional LinkedIn and résumé PDF, skills |
| `src/data/projects.ts` | Project entries, summaries, stages, technologies, next steps, optional links |
| `src/pages/index.astro` | Home, About, Résumé overview, Contact copy |
| `src/pages/projects/[slug].astro` | Shared project detail layout; routes generated from project data |
| `src/components/` | Project cards, section headings, SVG icons |
| `src/layouts/Layout.astro` | Navigation, footer, metadata, canonical URLs |
| `src/styles/global.css` | Design tokens, layout, breakpoints, reduced motion and print styles |
| `public/` | Static files, including the favicon and a future résumé PDF |
| `astro.config.mjs` | Static output and canonical site origin |

### Contact and résumé

Email is `travis@travisboyd.dev`; GitHub is `https://github.com/travisboyd-dev`. `linkedin` is an empty string in configuration, and no link appears until a real URL is supplied.

The résumé section includes a professional overview and technical skills. To enable a download, add a real PDF such as `public/travis-boyd-resume.pdf`, then set `resumePdf` to `/travis-boyd-resume.pdf` in `src/data/site.ts`. An empty value hides the download link. Do not invent employment dates, certifications, achievements, or metrics.

### Projects

Each project has a stable `slug`, number, category, status, summary, tags, overview, current-stage notes, and next steps. Add an object to the typed `projects` array to create another card and route. Optional `repository` and `liveUrl` fields display links on the detail page; leave them out until verified.

- **001 / Portfolio-as-Code:** In Progress; local Astro implementation.
- **002 / Azure engineering project:** Planned; scope to be confirmed.
- **003 / Home networking lab:** In Progress; hands-on Cisco SG300, VLAN segmentation, UniFi gateway, DHCP, and network configuration work.
- **004 / A website for my son:** Planned; family details kept private.

Update statuses and evidence as work progresses. Cloud technologies labeled “planned” are intentions, not completed experience. This portfolio is separate from StratoLinq.

## Planned cloud architecture

After the local site is reviewed and deployment is approved:

1. Host the static `dist/` output on **Azure Static Web Apps**.
2. Validate and build with **GitHub Actions** before delivery.
3. Describe Azure infrastructure with **Azure Bicep**.
4. Configure the custom domain, HTTPS, and deployment settings.

No Azure resources, deployment workflows, Bicep files, or public deployments are created by this implementation. No credentials are needed locally. Deployment, Azure modifications, and pushes require approval.

### Deployment artifact readiness

`public/staticwebapp.config.json` is copied into `dist/` by Astro. It instructs Azure Static Web Apps to return the custom `/404.html` with HTTP 404. This is a static multi-page site and intentionally has no SPA fallback.

The static output is compatible with Azure Static Web Apps; see Microsoft's [framework settings](https://learn.microsoft.com/en-us/azure/static-web-apps/front-end-frameworks) and [build configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration). For a future build managed by Azure, use app location `/`, output location `dist`, and no API location. Ensure the build environment supports the project's Node 24 requirement. An alternative is to build and test with Node 24 in GitHub Actions, then upload the already-built `dist/` with `skip_app_build: true`, `app_location: dist`, and an empty `output_location`.

The Azure resource, deployment authorization, workflow, DNS, and custom-domain TLS are still future setup. See [the review report](docs/REVIEW.md) for current verification results. The latest local run passed all 14 browser tests and four static-output tests.

## Troubleshooting

- Use `npm.cmd` in PowerShell if `npm.ps1` is blocked.
- If port 4321 is busy, follow the URL Astro prints or run `npm.cmd run dev -- --port 4322`.
- If dependencies are missing, run `npm.cmd ci` from the repository root. The committed lockfile pins the resolved dependency tree.
- In a restricted sandbox, Astro may need permission to initialize its user configuration directory. Installation also needs npm registry access. Normal local development does not require administrator privileges.
- Do not open `dist/index.html` directly from disk; use the preview server so absolute asset paths resolve correctly.

## Initial local verification

- Dependencies installed; npm reported zero vulnerabilities during installation.
- `npm.cmd run check`: zero errors, warnings, or hints.
- `npm.cmd run build`: six static pages generated, including the custom 404.
- Development server and production preview: home, four project routes, and local assets checked successfully.
- Headless Chrome: production layout checked at 390, 768, and 1440 CSS pixels with no horizontal overflow; desktop and mobile screenshots reviewed.
- Empty LinkedIn and résumé PDF configuration correctly hides those links.

Temporary preview servers were stopped after verification. Start your own preview using the commands above.
