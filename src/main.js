import "./style.css";

const areas = [
  ["health","♡","Healthcare","Health, care & wellbeing","mint","Keep health information, medication routines, wellbeing notes and care insights together. Supported health services can be connected when configured."],
  ["safety","♧","Safety & Emergency","Protection and preparedness","peach","Prepare emergency information, manage trusted contacts and review your safety plan. SOS actions remain user-controlled."],
  ["home","⌂","Smart Living","Home and daily routines","sky","Bring compatible home devices and everyday routines into one simple control space. Live controls require supported integrations."],
  ["family","♧","Family & Protection","People who matter","lav","Organise your care circle and trusted people. Sharing and location access require explicit setup and consent."],
  ["profile","◉","Personal & Account","Your settings and privacy","yellow","Manage your profile, preferences, privacy, permissions and connected services."]
];
const features = [
  ["♡","Health & Care","Health records, medication routines, wellbeing journals and care insights.","mint","health"],
  ["♧","Safety & Protection","Emergency readiness, trusted contacts, safety check-ins and response plans.","peach","safety"],
  ["⌂","Smart Living","Compatible home devices and everyday routines in one control space.","sky","home"],
  ["✧","Family & Personal","Care circles, preferences, privacy and account settings.","lav","family"]
];
document.querySelector("#app").innerHTML = `
<div class="shell">
<header class="top"><a class="brand" href="#top"><i>H</i>highto</a><nav id="nav"><a href="#top">Home</a><a href="#ecosystem">Ecosystem</a><a href="#jordan">JORDAN</a><a href="#features">Features</a><a href="#integrations">Integrations</a></nav><div class="nav-actions"><button class="plain" data-open="signin">Sign in</button><a class="btn small" href="./app.html">Open app →</a><button class="menu" aria-label="Menu">☰</button></div></header>
<main id="top">
<section class="hero"><div class="hero-copy"><span class="tag">✦ ONE INTELLIGENT LIFE COMPANION</span><h1>A calmer, smarter<br>way to <em>live well.</em></h1><p>Your health, safety, family and home — organised in one place. JORDAN helps you find the right tools, keep important information together and stay on top of everyday life.</p><div class="actions"><a class="btn" href="./app.html">Get started →</a><a class="btn white" href="#features">See what you can do</a></div><small class="proof">Health · Safety · Family · Smart living</small></div>
<div class="art"><div class="glow"></div><div class="robot"><div class="head"><span class="ear l"></span><span class="ear r"></span><div class="face"><i></i><i></i></div><span class="antenna"></span></div><div class="neck"></div><div class="body"><b>✦</b></div></div><div class="robot-caption"><b>Meet JORDAN</b><span>Your personal Highto companion</span><small>One assistant across every part of your Highto experience.</small></div></div></section>
<section class="values"><div>♡ <span><b>Thoughtful care</b><small>Wellbeing support</small></span></div><div>♧ <span><b>Everyday safety</b><small>Prepared and connected</small></span></div><div>⌂ <span><b>Gentle automation</b><small>A more helpful home</small></span></div><div>✧ <span><b>One companion</b><small>One connected experience</small></span></div></section>
<section class="section center" id="ecosystem"><label>THE HIGHTO ECOSYSTEM</label><h2>One place for the things<br>that matter every day.</h2><p>Choose a space to explore. Each area has its own tools, with JORDAN there to help you navigate.</p><div class="domains">${areas.map(a=>`<button class="domain" data-area="${a[0]}"><i class="${a[4]}">${a[1]}</i><b>${a[2]}</b><small>${a[3]}</small><span>↗</span></button>`).join("")}</div></section>
<section class="jordan" id="jordan"><div class="jordan-art"><div class="disc"><div class="mini-face"><i></i><i></i></div><b>✦</b></div></div><div><label>MEET YOUR COMPANION</label><h2>One AI.<br>One familiar presence.</h2><p>JORDAN brings your Highto experience together. No switching between characters or competing assistants — just one consistent, considerate companion.</p><ul><li>✓ Understands your Highto spaces</li><li>✓ Helps organise routines and information</li><li>✓ Keeps your choices and permissions in view</li></ul><button class="btn" data-open="jordan">Get to know JORDAN →</button></div></section>
<section class="section center" id="features"><label>CORE CAPABILITIES</label><h2>What can Highto help you with?</h2><p>Start with a practical need. Explore the tools available in each area and connect services when you are ready.</p><div class="features">${features.map(f=>`<article><i class="${f[3]}">${f[0]}</i><h3>${f[1]}</h3><p>${f[2]}</p><button data-area="${f[4]}">Explore →</button></article>`).join("")}</div></section>
<section class="section center" id="integrations"><label>WORKS WITH YOUR WORLD</label><h2>Connect what you already use.</h2><p>A welcoming integration space for services and devices you choose. Availability depends on supported providers and your permissions.</p><div class="integrations"><div>⌚<small>Wearables</small></div><div>♡<small>Health platforms</small></div><div>⌂<small>Smart home</small></div><div>✚<small>Care providers</small></div><div>♧<small>Trusted contacts</small></div><div>＋<small>More services</small></div></div></section>
<section class="cta"><div><h2>Make everyday life feel<br>a little more organised.</h2><p>Welcome to Highto — with JORDAN by your side.</p><a class="btn" href="./app.html">Open Highto workspace →</a></div><span>✧</span></section>
</main><footer><a class="brand" href="#top"><i>H</i>highto</a><span>One companion. A more connected life.</span><small>Concept build · No live integrations connected</small></footer></div>
<div class="modal" id="modal"><section><button class="close">×</button><label>HIGHTO</label><h2 id="mt"></h2><p id="mp"></p><button class="btn done">Got it</button></section></div>`;
const modal=document.querySelector("#modal");
function show(t,p){document.querySelector("#mt").textContent=t;document.querySelector("#mp").textContent=p;modal.classList.add("show")}
document.querySelectorAll("[data-area]").forEach(b=>b.onclick=()=>{const a=areas.find(x=>x[0]===b.dataset.area);if(a)show(a[2],a[5])});
document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>show(b.dataset.open==="signin"?"Highto account":"Meet JORDAN",b.dataset.open==="signin"?"Account sign-in will be enabled when authentication is connected.":"JORDAN is Highto’s single AI companion. Live AI responses will be connected in a later implementation stage."));
document.querySelector(".close").onclick=document.querySelector(".done").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
document.querySelector(".menu").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>document.querySelector("#nav").classList.remove("open"));
