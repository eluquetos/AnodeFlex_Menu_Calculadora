const APPS=[
  {id:"ANODEFLEX_2N_4R_1INY_v1.3.0",name:"2 nodos · 1 inyección",code:"2N / 4R",nodes:2,branches:4,injections:1,description:"Cadena de dos nodos con cuatro ramas. Una fuente para medición y regulación.",accent:"orange"},
  {id:"ANODEFLEX_4N_8R_1INY_CAL_1X4N_v1.1.0",name:"4 nodos · 1 inyección",code:"4N / 8R",nodes:4,branches:8,injections:1,description:"Cadena completa de cuatro nodos y ocho ramas alimentada desde el nodo 1.",accent:"blue"},
  {id:"ANODEFLEX_4N_8R_1INY_CAL_2X2N_v1.0.1",name:"2 + 2 nodos · 1 inyección",code:"2+2 / 8R",nodes:4,branches:8,injections:1,description:"Dos grupos independientes en campo y una sola inyección durante la regulación.",accent:"violet"},
  {id:"ANODEFLEX_4N_8R_2INY_CAL_2X2N_v1.0.1",name:"2 + 2 nodos · 2 inyecciones",code:"2+2 / 8R",nodes:4,branches:8,injections:2,description:"Alimentación desde el centro mediante dos fuentes independientes para ambos lados.",accent:"cyan"},
  {id:"ANODEFLEX_6N_12R_1INY_CAL_2X3N_v1.0.0",name:"3 + 3 nodos · 1 inyección",code:"3+3 / 12R",nodes:6,branches:12,injections:1,description:"Doce ramas calibradas en dos grupos de tres nodos y reguladas desde una sola fuente.",accent:"pink"},
  {id:"ANODEFLEX_5N_10R_1INY_CAL_1X5N",name:"5 nodos · 1 inyección",code:"5N / 10R",nodes:5,branches:10,injections:1,description:"Cadena completa de cinco nodos y diez ramas alimentada desde el nodo 1.",accent:"orange"}
];
const BASE="https://eluquetos.github.io/";
const APP_REVISION="ajuste-minimo-20261011";
const $=id=>document.getElementById(id);
const menu=$("menu-view"),viewer=$("viewer"),frame=$("app-frame"),loading=$("loading");

function renderMenu(){
  $("app-grid").innerHTML=APPS.map((app,index)=>`
    <article class="app-card accent-${app.accent}">
      <div class="card-top"><span class="index">${String(index+1).padStart(2,"0")}</span><span class="code">${app.code}</span></div>
      <div><p class="card-label">ANODEFLEX</p><h3>${app.name}</h3><p class="description">${app.description}</p></div>
      <div class="specs"><span><b>${app.nodes}</b> nodos</span><span><b>${app.branches}</b> ramas</span><span><b>${app.injections}</b> ${app.injections===1?"inyección":"inyecciones"}</span></div>
      <button type="button" data-app="${app.id}">Abrir calculadora <span aria-hidden="true">→</span></button>
    </article>`).join("");
}

function getApp(id){return APPS.find(app=>app.id===id)}
function appUrl(app){return BASE+app.id+"/?actualizacion="+APP_REVISION}
function showMenu({historyMode="push"}={}){
  frame.removeAttribute("src");viewer.hidden=true;menu.hidden=false;document.body.classList.remove("viewing");document.title="ANODEFLEX · Menú de calculadoras";
  if(historyMode==="push")history.pushState({},"",location.pathname);
  window.scrollTo({top:0,behavior:"instant"});
}
function openApp(id,{historyMode="push"}={}){
  const app=getApp(id);if(!app)return showMenu({historyMode:"replace"});
  menu.hidden=true;viewer.hidden=false;document.body.classList.add("viewing");loading.hidden=false;
  $("viewer-name").textContent=app.name;$("open-full").href=appUrl(app);frame.title="ANODEFLEX · "+app.name;frame.src=appUrl(app);document.title=app.name+" · ANODEFLEX";
  const url=new URL(location.href);url.searchParams.set("app",app.id);history[historyMode+"State"]({app:app.id},"",url);
}

$("app-grid").addEventListener("click",event=>{const button=event.target.closest("[data-app]");if(button)openApp(button.dataset.app)});
$("back-menu").addEventListener("click",()=>showMenu());
$("reload-app").addEventListener("click",()=>{loading.hidden=false;frame.src=frame.src});
frame.addEventListener("load",()=>{loading.hidden=true});
window.addEventListener("popstate",()=>{const id=new URL(location.href).searchParams.get("app");id?openApp(id,{historyMode:"replace"}):showMenu({historyMode:"replace"})});
renderMenu();const initial=new URL(location.href).searchParams.get("app");if(initial)openApp(initial,{historyMode:"replace"});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
