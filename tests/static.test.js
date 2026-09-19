const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../docs"),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),app=fs.readFileSync(path.join(root,"app.js"),"utf8"),css=fs.readFileSync(path.join(root,"styles.css"),"utf8");
for(const file of ["index.html","styles.css","app.js","manifest.webmanifest","icon.svg","sw.js"])assert.ok(fs.existsSync(path.join(root,file)),file+" ausente");
for(const id of ["menu-view","app-grid","viewer","back-menu","open-full","app-frame"])assert.ok(html.includes(`id="${id}"`),id+" ausente");
for(const name of ["AnodeFlex_2_ramas_1iny","AnodeFlex_4_ramas_1iny","AnodeFlex_2_2_4_ramas_1iny","AnodeFlex_2_2_4_ramas_2iny","AnodeFlex_3_3_6_ramas_1iny"])assert.ok(app.includes(name),name+" ausente");
assert.ok(app.includes("history.pushState"));assert.ok(app.includes("popstate"));assert.ok(css.includes("100dvh"));
const manifest=JSON.parse(fs.readFileSync(path.join(root,"manifest.webmanifest"),"utf8"));assert.equal(manifest.display,"standalone");assert.equal(manifest.short_name,"ANODEFLEX Menú");
console.log("Pruebas del menú ANODEFLEX: correctas");
