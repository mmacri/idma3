#!/usr/bin/env node
// Simple fetch script to download remote images listed in tools/assets.json
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapPath = path.join(__dirname, 'assets.json');
if(!fs.existsSync(mapPath)){
  console.error('tools/assets.json not found.');
  process.exit(1);
}
const map = JSON.parse(fs.readFileSync(mapPath,'utf8'));

async function download(url, outPath){
  return new Promise((resolve, reject) => {
    const dir = path.dirname(outPath);
    fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(outPath);
    https.get(url, (res) => {
      if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location){
        // follow redirect
        return download(res.headers.location, outPath).then(resolve).catch(reject);
      }
      if(res.statusCode !== 200){
        return reject(new Error(`Failed ${url} - ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => reject(err));
  });
}

(async function(){
  const entries = Object.entries(map);
  for(const [url, dest] of entries){
    const outPath = path.join(__dirname, '..', dest.replace(/\//g, path.sep));
    try{
      console.log('Downloading', url, '->', outPath);
      await download(url, outPath);
    }catch(e){
      console.error('Error downloading', url, e.message);
    }
  }
  console.log('Done');
})();
