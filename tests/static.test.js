const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../docs"),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),app=fs.readFileSync(path.join(root,"app.js"),"utf8"),css=fs.readFileSync(path.join(root,"styles.css"),"utf8");
for(const file of ["index.html","styles.css","app.js","manifest.webmanifest","icon.svg","sw.js"])assert.ok(fs.existsSync(path.join(root,file)),file+" ausente");
for(const id of ["menu-view","app-grid","viewer","back-menu","open-full","app-frame"])assert.ok(html.includes(`id="${id}"`),id+" ausente");
const vm=require("node:vm");
const apps=vm.runInNewContext(app.slice(0,app.indexOf("const BASE="))+";APPS");
assert.deepEqual(Array.from(apps,a=>a.id),[
  "ANODEFLEX_2N_4R_1INY_v1.3.0",
  "ANODEFLEX_4N_8R_1INY_CAL_1X4_v1.1.0",
  "ANODEFLEX_4N_8R_2INY_CAL_1X4_v1.0.1",
  "ANODEFLEX_5N_10R_2INY_CAL_1X5_v1.0.0",
  "ANODEFLEX_6N_12R_2INY_CAL_1X6_v1.0.0"
]);
assert.deepEqual(Array.from(apps,a=>a.injections),[1,1,2,2,2]);
assert.ok(html.includes("<b>5</b><span>calculadoras"));
assert.ok(app.includes("history.pushState"));assert.ok(app.includes("popstate"));assert.ok(css.includes("100dvh"));
assert.ok(app.includes("?actualizacion="));assert.ok(html.includes("styles.css?v=2"));assert.ok(html.includes("app.js?v=3"));
const manifest=JSON.parse(fs.readFileSync(path.join(root,"manifest.webmanifest"),"utf8"));assert.equal(manifest.display,"standalone");assert.equal(manifest.short_name,"ANODEFLEX Menú");
console.log("Pruebas del menú ANODEFLEX: correctas");
