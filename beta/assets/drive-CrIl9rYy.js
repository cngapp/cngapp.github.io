import{u as f,v as u,S as l}from"./index-BVfVv5XF.js";import{GoogleAuthNeeded as d}from"./gmail-Dnm1MUhz.js";const r=t=>`cng-vinted-${t}.json`;async function i(t,e,o){const a=f();if(!u(a))throw new d;let n;try{n=await o(t,{...e,headers:{...e.headers,Authorization:`Bearer ${a.token}`}})}catch{throw new l("Impossible de joindre Google Drive : vérifie ta connexion internet.")}if(n.status===401)throw new d;if(!n.ok)throw new l(`Google Drive a répondu avec une erreur (${n.status}).`);return n}async function c(t){const e=encodeURIComponent("name contains 'cng-vinted-' and trashed = false");return(await(await i(`https://www.googleapis.com/drive/v3/files?q=${e}&orderBy=name desc&fields=files(id,name)&pageSize=100`,{method:"GET"},t)).json()).files??[]}async function v(t,e,o=fetch){const a=await c(o);for(const s of a.filter(m=>m.name===r(e)))await i(`https://www.googleapis.com/drive/v3/files/${s.id}`,{method:"DELETE"},o);const n="cng"+Math.random().toString(36).slice(2),p=`--${n}\r
Content-Type: application/json; charset=UTF-8\r
\r
${JSON.stringify({name:r(e),mimeType:"application/json"})}\r
--${n}\r
Content-Type: application/json\r
\r
${t}\r
--${n}--`;await i("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",{method:"POST",headers:{"Content-Type":`multipart/related; boundary=${n}`},body:p},o);const w=(await c(o)).slice(30);for(const s of w)await i(`https://www.googleapis.com/drive/v3/files/${s.id}`,{method:"DELETE"},o);return r(e)}async function y(t=fetch){const e=await c(t);if(!e.length)return null;const o=await i(`https://www.googleapis.com/drive/v3/files/${e[0].id}?alt=media`,{method:"GET"},t);return{name:e[0].name,content:await o.json()}}export{v as googleDriveBackup,y as googleDriveLatest};
