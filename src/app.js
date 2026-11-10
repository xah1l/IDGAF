import "./app.css";

const spaces = [
  ["overview","⌂","Overview"],["health","♡","Healthcare"],["safety","♧","Safety & Emergency"],["home","⌂","Smart Living"],["family","♧","Family & Protection"],["profile","◉","Personal & Account"]
];
const store = {
  read(k,fallback=[]){try{return JSON.parse(localStorage.getItem("highto:"+k))??fallback}catch{return fallback}},
  write(k,v){localStorage.setItem("highto:"+k,JSON.stringify(v))}
};
let current="overview";
const app=document.querySelector("#app");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function shell(){
 app.innerHTML=`<div class="app-layout"><aside class="sidebar"><a class="brand" href="/"><i>H</i>highto</a><div class="profile-chip"><div class="avatar">S</div><span><b>Welcome</b><small>Your personal space</small></span></div><div class="nav-caption">YOUR WORKSPACE</div><nav>${spaces.map(s=>`<button data-view="${s[0]}" class="${current===s[0]?"active":""}"><span>${s[1]}</span>${s[2]}</button>`).join("")}</nav><div class="sidebar-bottom"><div class="jordan-mini"><div class="jordan-icon">✦</div><span><b>JORDAN</b><small>Your AI companion</small></span><i>●</i></div><a href="/">← Back to Highto</a></div></aside><main class="main"><header class="app-top"><button class="mobile-menu" id="mobileMenu">☰</button><div><small>HIGHTO / WORKSPACE</small><b id="pageTitle">Overview</b></div><div class="top-right"><span class="local-tag">● Local prototype</span><div class="avatar">S</div></div></header><section id="view" class="view"></section></main></div><div class="toast" id="toast"></div>`;
 document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{current=b.dataset.view;render();document.querySelector(".sidebar").classList.remove("show")});
 document.querySelector("#mobileMenu").onclick=()=>document.querySelector(".sidebar").classList.toggle("show");
 render();
}
function header(kicker,title,desc){return `<div class="view-heading"><div><small>${kicker}</small><h1>${title}</h1><p>${desc}</p></div></div>`}
function card(title,body,extra=""){return `<section class="panel"><div class="panel-head"><h2>${title}</h2>${extra}</div>${body}</section>`}
function render(){
 const title=spaces.find(s=>s[0]===current)?.[2]||"Overview";
 document.querySelector("#pageTitle").textContent=title;
 document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===current));
 const view=document.querySelector("#view");
 const contacts=store.read("contacts"), logs=store.read("healthlogs"), meds=store.read("meds");
 if(current==="overview"){
  view.innerHTML=header("YOUR DAY AT A GLANCE","A little more in control.","Your Highto spaces, brought together with JORDAN.")+`
  <div class="welcome-banner"><div><span class="soft-label">YOUR COMPANION</span><h2>Good day. I'm JORDAN.</h2><p>I can help you organise your day and find the right Highto space.</p><button class="primary-btn" data-jump="jordan">Talk to JORDAN →</button></div><div class="welcome-bot"><div class="bot-face"><i></i><i></i></div><b>✦</b></div></div>
  <div class="stat-grid"><article><span class="stat-icon mint">♡</span><small>Health notes</small><strong>${logs.length}</strong><em>Saved on this device</em></article><article><span class="stat-icon peach">♧</span><small>Trusted contacts</small><strong>${contacts.length}</strong><em>Added by you</em></article><article><span class="stat-icon sky">⌂</span><small>Home devices</small><strong>Demo</strong><em>No devices connected</em></article><article><span class="stat-icon lav">✧</span><small>Medication list</small><strong>${meds.length}</strong><em>Local reminders only</em></article></div>
  <div class="two-col">${card("Your spaces",`<div class="quick-grid">${spaces.slice(1).map(s=>`<button data-jump="${s[0]}"><span>${s[1]}</span><b>${s[2]}</b><small>Open workspace →</small></button>`).join("")}</div>`)}${card("Readiness",`<div class="readiness"><div><b>Profile setup</b><span>Not configured</span></div><div class="progress"><i style="width:20%"></i></div><p>Add trusted contacts and review your personal details to complete your setup.</p><button class="subtle-btn" data-jump="profile">Review setup →</button></div>`)}</div>`;
 }else if(current==="health"){
  view.innerHTML=header("HEALTHCARE","Your wellbeing, in one place.","Keep personal notes and routines organised. This prototype stores entries only in this browser.")+`
  <div class="two-col"><div>${card("Add a health note",`<form id="logForm" class="stack"><label>How are you feeling?<textarea name="note" required placeholder="Write a symptom, check-in or wellbeing note…"></textarea></label><label>Date<input name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required></label><button class="primary-btn">Save health note</button></form>`)}</div><div>${card("Medication list",`<form id="medForm" class="inline-form"><input name="name" required placeholder="Medication name"><button class="primary-btn">Add</button></form><div class="item-list">${meds.length?meds.map((m,i)=>`<div class="list-item"><span>✚</span><b>${esc(m)}</b><button data-remove-med="${i}" aria-label="Remove">×</button></div>`).join(""):'<p class="empty">No medications added.</p>'}</div><p class="hint">Medication reminders and clinical records are not connected.</p>`)}</div></div>
  ${card("Health journal",logs.length?logs.slice().reverse().map((l,i)=>`<div class="journal-item"><small>${esc(l.date)}</small><p>${esc(l.note)}</p><button data-remove-log="${logs.length-1-i}">Delete</button></div>`).join(""):'<p class="empty">Your saved health notes will appear here.</p>')}`;
 }else if(current==="safety"){
  view.innerHTML=header("SAFETY & EMERGENCY","Be prepared, not overwhelmed.","Set up the information you want close at hand in an emergency.")+`
  <div class="notice"><b>Prototype status</b><p>Highto does not contact emergency services, share live location or send alerts in this build. Add your local emergency number and keep it accessible.</p></div><div class="two-col">${card("Emergency information",`<form id="emergencyForm" class="stack"><label>Local emergency number<input name="number" placeholder="Enter your local number" value="${esc(store.read("emergency",{}).number||"")}"></label><label>Important information<textarea name="notes" placeholder="Allergies, relevant notes or instructions…">${esc(store.read("emergency",{}).notes||"")}</textarea></label><button class="primary-btn">Save emergency details</button></form>`)}${card("SOS readiness",`<div class="sos-mark">!</div><h3>Keep your emergency plan ready</h3><p class="hint">Your configured details stay in this browser. SOS dispatch is not available in this prototype.</p><button class="danger-btn" id="sosInfo">View SOS information</button>`)}</div>`;
 }else if(current==="home"){
  const devices=store.read("devices",{lights:false,climate:false,security:false});
  view.innerHTML=header("SMART LIVING","A more thoughtful home.","Explore the control experience. These switches are visual demos and do not control physical devices.")+`
  <div class="notice"><b>Demo controls only</b><p>No smart-home account or physical device is connected. Your switch selections are saved locally for this preview.</p></div><div class="device-grid">${[["lights","☼","Living room lights","Lighting"],["climate","☁","Climate control","Comfort"],["security","♧","Home security","Safety"]].map(d=>`<article class="device-card"><span class="device-icon">${d[1]}</span><small>${d[3]}</small><h3>${d[2]}</h3><div class="device-foot"><span>${devices[d[0]]?"On":"Off"}</span><button class="toggle ${devices[d[0]]?"on":""}" data-device="${d[0]}" aria-label="Toggle ${d[2]}"><i></i></button></div></article>`).join("")}</div>`;
 }else if(current==="family"){
  view.innerHTML=header("FAMILY & PROTECTION","Your trusted circle.","Keep the people you trust organised. Adding a contact here does not notify or invite them.")+`
  <div class="two-col"><div>${card("Add a trusted contact",`<form id="contactForm" class="stack"><label>Full name<input name="name" required placeholder="Contact name"></label><label>Phone number<input name="phone" type="tel" required placeholder="+…"></label><label>Relationship<input name="relation" placeholder="e.g. Parent, friend"></label><button class="primary-btn">Save contact</button></form>`)}</div><div>${card("Your trusted contacts",contacts.length?contacts.map((c,i)=>`<div class="list-item"><span class="contact-avatar">${esc(c.name.slice(0,1).toUpperCase())}</span><span class="contact-copy"><b>${esc(c.name)}</b><small>${esc(c.relation||"Trusted contact")} · ${esc(c.phone)}</small></span><button data-remove-contact="${i}">×</button></div>`).join(""):'<p class="empty">No trusted contacts saved yet.</p>')}</div></div><p class="hint">No invitations, calls, messages or live location sharing are sent from this prototype.</p>`;
 }else{
  view.innerHTML=header("PERSONAL & ACCOUNT","Your space, your choices.","Manage the local profile used in this preview.")+`
  <div class="two-col">${card("Personal profile",`<form id="profileForm" class="stack"><label>Display name<input name="name" value="${esc(store.read("profile",{name:"Sahil"}).name)}" required></label><label>Preferred region<input name="region" value="${esc(store.read("profile",{region:"India"}).region)}"></label><button class="primary-btn">Save profile</button></form>`)}${card("Privacy & data",`<p class="hint">This prototype stores the notes, contacts and preferences you enter in this browser's local storage. They are not synced to an account or backend.</p><button class="danger-btn" id="clearData">Clear local prototype data</button>`)}</div>`;
 }
 bindView();
}
function toast(msg){const t=document.querySelector("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function bindView(){
 document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>{current=b.dataset.jump;render()});
 const lf=document.querySelector("#logForm");if(lf)lf.onsubmit=e=>{e.preventDefault();const fd=new FormData(lf);const arr=store.read("healthlogs");arr.push({note:fd.get("note"),date:fd.get("date")});store.write("healthlogs",arr);render();toast("Health note saved on this device.")};
 const mf=document.querySelector("#medForm");if(mf)mf.onsubmit=e=>{e.preventDefault();const fd=new FormData(mf);const arr=store.read("meds");arr.push(fd.get("name"));store.write("meds",arr);render();toast("Medication added to local list.")};
 document.querySelectorAll("[data-remove-med]").forEach(b=>b.onclick=()=>{const a=store.read("meds");a.splice(+b.dataset.removeMed,1);store.write("meds",a);render()});
 document.querySelectorAll("[data-remove-log]").forEach(b=>b.onclick=()=>{const a=store.read("healthlogs");a.splice(+b.dataset.removeLog,1);store.write("healthlogs",a);render()});
 const cf=document.querySelector("#contactForm");if(cf)cf.onsubmit=e=>{e.preventDefault();const fd=new FormData(cf);const a=store.read("contacts");a.push({name:fd.get("name"),phone:fd.get("phone"),relation:fd.get("relation")});store.write("contacts",a);render();toast("Contact saved on this device.")};
 document.querySelectorAll("[data-remove-contact]").forEach(b=>b.onclick=()=>{const a=store.read("contacts");a.splice(+b.dataset.removeContact,1);store.write("contacts",a);render()});
 const ef=document.querySelector("#emergencyForm");if(ef)ef.onsubmit=e=>{e.preventDefault();const fd=new FormData(ef);store.write("emergency",{number:fd.get("number"),notes:fd.get("notes")});toast("Emergency details saved locally.")};
 document.querySelectorAll("[data-device]").forEach(b=>b.onclick=()=>{const d=store.read("devices",{lights:false,climate:false,security:false});d[b.dataset.device]=!d[b.dataset.device];store.write("devices",d);render()});
 const pf=document.querySelector("#profileForm");if(pf)pf.onsubmit=e=>{e.preventDefault();const fd=new FormData(pf);store.write("profile",{name:fd.get("name"),region:fd.get("region")});toast("Profile saved locally.")};
 const clear=document.querySelector("#clearData");if(clear)clear.onclick=()=>{if(confirm("Clear all Highto prototype data stored in this browser?")){Object.keys(localStorage).filter(k=>k.startsWith("highto:")).forEach(k=>localStorage.removeItem(k));render();toast("Local data cleared.")}};
 const sos=document.querySelector("#sosInfo");if(sos)sos.onclick=()=>alert("This prototype does not place emergency calls or dispatch assistance. Use your local emergency number directly.");
}
shell();
