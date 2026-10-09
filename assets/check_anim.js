// Headless check: runs an animation page's script with stubs and validates every step (usage: node check_anim.js page.html)
const fs = require('fs'), vm = require('vm'), path = require('path');
const file = path.resolve(process.argv[2]), html = fs.readFileSync(file, 'utf8');
const dir = path.dirname(file);
const ctx = { console, setInterval, clearInterval, location: { hash: '' }, localStorage: { getItem() {}, setItem() {} }, document: { getElementById: () => ({}), addEventListener() {}, title: '' } };
ctx.window = ctx; vm.createContext(ctx);
const scripts = [...html.matchAll(/<script(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)];
let problems = 0, steps = 0, errors = [];
for (const m of scripts) {
  const code = m[1] ? fs.readFileSync(path.resolve(dir, m[1]), 'utf8') : m[2];
  if (!m[1]) {
    ctx.BrainAnim.mount = null;
    const patched = code.replace(/\bmount\(\{/, 'globalThis.__cfg = ({').replace('const { lane, tree, recorder, mount, ln } = BrainAnim;', 'const { lane, tree, recorder, ln } = BrainAnim; const mount = null;');
    try { vm.runInContext(patched, ctx, { filename: 'page' }); } catch (e) { errors.push('script error: ' + e.message + ' @ ' + (e.stack.split('\n').find(l => l.includes('page:')) || '')); }
  } else vm.runInContext(code, ctx, { filename: m[1] });
}
const cfg = ctx.__cfg;
if (cfg) for (const p of cfg.problems) {
  problems++;
  if (!p.anims || !p.anims.length) errors.push(p.name + ': no animations');
  for (const a of p.anims || []) {
    const n = a.code.replace(/^\n/, '').split('\n').length;
    if (!a.steps.length) errors.push(p.name + ': empty steps');
    a.steps.forEach((s, k) => {
      steps++;
      if (!(s.line >= 0 && s.line <= n)) errors.push(`${p.name}/${a.name} step ${k}: line ${s.line} outside 1..${n}`);
      if (!s.say) errors.push(`${p.name}/${a.name} step ${k}: no text`);
      if (!s.lanes || !s.lanes.length) errors.push(`${p.name}/${a.name} step ${k}: no lanes`);
    });
  }
}
console.log(`${path.basename(file)}: ${problems} problems, ${steps} steps, ${errors.length} errors`);
errors.slice(0, 25).forEach(e => console.log('  ' + e));
process.exit(errors.length ? 1 : 0);
