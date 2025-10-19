import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function fileExists(p) {
  return fs.existsSync(p);
}

(async function main(){
  try {
    const assetsMapPath = path.join(repoRoot, 'tools', 'assets.json');
    const assets = readJSON(assetsMapPath);

    const missing = [];
    for (const local of Object.values(assets)) {
      const p = path.join(repoRoot, local);
      if (!fileExists(p)) missing.push(local);
    }

    if (missing.length) {
      console.error('Missing asset files:', missing.join('\n'));
      process.exitCode = 2;
    } else {
      console.log('All mapped assets present.');
    }

    // Quick HTML checks: ensure no static.wixstatic.com references remain and links are root-relative
    const htmlFiles = fs.readdirSync(repoRoot).filter(f => f.endsWith('.html'));
    const badReferences = [];
    for (const f of htmlFiles) {
      const content = fs.readFileSync(path.join(repoRoot, f), 'utf8');
      if (content.includes('static.wixstatic.com')) badReferences.push(f);
      // check for .html internal links (we prefer /about not about.html)
      const matches = content.match(/href=["']([^"']+\.html)["']/g);
      if (matches) badReferences.push(...matches.map(m=>`${f}: ${m}`));
    }

    if (badReferences.length) {
      console.error('Found disallowed references or .html links:');
      badReferences.forEach(x=>console.error(' -', x));
      process.exitCode = 3;
    } else {
      console.log('HTML checks passed.');
    }

    // Basic success
    if (!missing.length && !badReferences.length) {
      console.log('Validation succeeded.');
    }
  } catch (e) {
    console.error('Validation error', e);
    process.exitCode = 1;
  }
})();
