How to fetch and validate site assets

1. Ensure Node.js (>=14) is installed locally.
2. From the repo root run:
   node tools/fetch-assets.mjs
   This will download all images listed in tools/assets.json into assets/images/
3. To validate locally after fetching run:
   node tools/ci-validate.mjs

CI: A GitHub Actions workflow ( .github/workflows/validate.yml ) will automatically run on push/PR to fetch assets and validate them.

Notes:
- If you add or change images, update tools/assets.json with the CDN URL as key and the desired local path as value.
- The validator ensures no remaining static.wixstatic.com CDN references and that internal links don't use .html suffixes.
