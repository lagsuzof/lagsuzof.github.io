import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const out=new URL('../public/images/',import.meta.url);
await mkdir(out,{recursive:true});
const sources={hero:'hero-lagsuz-cutout.png',about:'about-lagsuz-gym.jpg',deadlift:'hero-lagsuz-deadlift-bw.png',squat:'journey-squat-bw.jpg.jpg',legpress:'journey-legpress-bw.jpg'};
for(const [name,file] of Object.entries(sources)){
 const input=new URL(`../assets/originals/${file}`,import.meta.url); const info=await stat(input);
 for(const width of [480,900,1400]) for(const format of ['avif','webp']){
  const target=new URL(`${name}-${width}.${format}`,out);
  if(await stat(target).then(s=>s.mtimeMs>=info.mtimeMs).catch(()=>false))continue;
  let pipeline=sharp(fileURLToPath(input)).rotate();
  // Remove phone letterboxing only; preserve the person and original source.
  if(name==='squat'||name==='legpress')pipeline=pipeline.extract({left:0,top:210,width:1080,height:1920});
  await pipeline.resize({width}).toFormat(format,{quality:format==='avif'?58:80,effort:4}).toFile(fileURLToPath(target));
 }
 console.log(`Optimized ${name}`);
}
await sharp(fileURLToPath(new URL('../assets/originals/about-lagsuz-gym.jpg',import.meta.url))).resize(1200,630,{fit:'cover',position:'attention'}).jpeg({quality:85}).toFile(fileURLToPath(new URL('social.jpg',out)));