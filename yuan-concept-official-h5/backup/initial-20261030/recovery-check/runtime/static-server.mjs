import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const runtimeDir=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(process.env.SITE_ROOT||path.join(runtimeDir,'../dist'));
const port=Number(process.env.PORT||4188);
const host=process.env.HOST||'127.0.0.1';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8'};
const policy="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'";
const server=http.createServer(async(req,res)=>{
  const started=performance.now();
  res.on('finish',()=>process.stdout.write(JSON.stringify({time:new Date().toISOString(),method:req.method,path:(req.url||'/').split('?')[0],status:res.statusCode,duration_ms:Math.round((performance.now()-started)*100)/100})+'\n'));
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');res.setHeader('Content-Security-Policy',policy);res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('X-Robots-Tag','noindex, nofollow');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  if(pathname==='/health'||pathname==='/ready'){
    try{await fsp.access(path.join(root,'index.html'));res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:JSON.stringify({status:pathname==='/health'?'ok':'ready'}));}catch{res.writeHead(503);res.end('{"status":"unavailable"}');}return;
  }
  const parts=pathname.split('/');
  if(parts.some(part=>part.startsWith('.')||part.includes('\\'))||pathname.includes('\0')){res.writeHead(403);res.end('Forbidden');return;}
  let file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end('Forbidden');return;}
  if(pathname.endsWith('/'))file=path.join(file,'index.html');
  let stat;try{stat=await fsp.stat(file);if(!stat.isFile())throw Error('not a file');}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'});res.end('页面不存在');return;}
  const ext=path.extname(file).toLowerCase();
  const etag='"'+stat.size.toString(16)+'-'+Math.trunc(stat.mtimeMs).toString(16)+'"';
  const headers={'Content-Type':types[ext]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':ext==='.html'?'no-cache':pathname.startsWith('/assets/')?'public, max-age=86400':'public, max-age=3600','ETag':etag,'Accept-Ranges':'bytes'};
  if(req.headers['if-none-match']===etag){res.writeHead(304,headers);res.end();return;}
  const range=req.headers.range;
  if(range){
    const match=/^bytes=(\d*)-(\d*)$/.exec(range);let start,end;
    if(match){start=match[1]?Number(match[1]):Math.max(stat.size-Number(match[2]),0);end=match[1]&&match[2]?Number(match[2]):stat.size-1;}
    if(!match||!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<start||end>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
    res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});
    if(req.method==='HEAD')res.end();else fs.createReadStream(file,{start,end}).on('error',()=>res.destroy()).pipe(res);return;
  }
  res.writeHead(200,headers);if(req.method==='HEAD')res.end();else fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
});
server.requestTimeout=15000;server.headersTimeout=10000;
server.listen(port,host,()=>process.stdout.write(`元概念官网预览 http://${host}:${port}/\n`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
