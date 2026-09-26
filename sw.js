const CACHE='bmx-racing-lab-v4-auto';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){
  e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{const y=x.clone();caches.open(CACHE).then(c=>c.put('./index.html',y));return x}).catch(()=>caches.match('./index.html').then(x=>x||caches.match('./'))));return;
 }
 e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{if(x&&x.ok){const y=x.clone();caches.open(CACHE).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r)));
});