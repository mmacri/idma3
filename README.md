# IDMA3 — Static Local Replica

This repo is a **static, GitHub Pages–ready** replica of IDMA3.com for local work. 
It recreates pages, navigation, content, and basic styling without Wix/JS runtime.

## Quick start
1. Push the folder to a new GitHub repo.
2. Enable **GitHub Pages** (Settings → Pages → Source: Deploy from branch → `/ (root)`).
3. Visit your Pages URL (e.g., `https://<user>.github.io/<repo>/`).

## Pages
- `/index.html` (Home)
- `/about.html`
- `/team.html`
- `/solutions.html`
- `/contact.html`
- `/careers.html`
- `/research-and-technology.html`
- `/privacy-policy.html`
- `/partners.html` (maps Wix `/about-3` placeholder page)
- `/accessibility-statement.html`

## Assets
Place images in: `assets/images/`
- Expected filenames:      - `IDMA3-logo-translucent.png`
  - `IDMA3-technology-design-10.png`
  - `IDMA3-technology-design-11.png`
  - `IDMA3-technology-design-13.png`
  - `Judd-Dunlap-IDMA3.jpeg`
  - `Jonathan-Tranfield-IDMA3.png`
  - `Michele-Sager-IDMA3.jpg`

You can hotlink to Wix CDN images short-term, but it's better to download and store locally.

### Optional: fetch original images automatically
Use `tools/fetch-assets.mjs` (Node 18+) with a filled `tools/assets.json` (map of remote→local) to download.

```json
// tools/assets.json (example)
{
  "https://static.wixstatic.com/media/IDMA3-technology-design-10.png": "assets/images/IDMA3-technology-design-10.png",
  "https://static.wixstatic.com/media/Judd-Dunlap-IDMA3.jpeg": "assets/images/Judd-Dunlap-IDMA3.jpeg"
}
```

Then run:
```bash
node tools/fetch-assets.mjs
```

## Forms on GitHub Pages
The `contact` form defaults to **Formspree**. Replace `action` with your endpoint.
As a fallback, if no endpoint is configured, the form opens a mailto: draft.

## Notes
- This static replica intentionally avoids Wix’s dynamic bundles. 
- If you later migrate content, keep the same URLs and meta where possible.
