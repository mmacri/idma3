import fs from 'node:fs/promises';
import path from 'node:path';
import https from 'node:https';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cfgPath = path.join(__dirname, 'assets.json');

async function download(url, dest){
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if(res.statusCode !== 200){ reject(new Error(`HTTP ${res.statusCode} for ${url}`)); return; }
      const file = fs.open(dest, 'w').then(handle => {
        res.on('data', async (chunk) => { await handle.write(chunk); });
        res.on('end', async () => { await handle.close(); resolve(); });
        res.on('error', async (e) => { try{ await handle.close(); }catch{} reject(e); });
      });
    }).on('error', reject);
  });
  console.log(`Downloaded → ${dest}`);
}

const raw = await fs.readFile(cfgPath, 'utf8').catch(() => null);
if(!raw){ console.error('Create tools/assets.json first (map of remote→local).'); process.exit(1); }
const mapping = JSON.parse(raw);
for(const [remote, local] of Object.entries(mapping)){
  const dest = path.resolve(path.join(__dirname, '..', local));
  try{
    await download(remote, dest);
  }catch(e){
    console.error(`Failed: ${remote} → ${local}:`, e.message);
  }
}
