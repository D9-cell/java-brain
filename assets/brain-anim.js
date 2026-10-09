// Shared step-by-step animation engine for Java Brain topic pages
(function () {
  const ROOT = document.currentScript ? document.currentScript.src.replace(/assets\/brain-anim\.js.*$/, '') : '';
  const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  // Builds a lane snapshot from an array plus highlight options
  function lane(name, arr, o = {}) {
    const cls = i => (o.active || []).includes(i) ? 'active' : (o.done || []).includes(i) ? 'done'
      : (o.warn || []).includes(i) ? 'warn' : (o.bad || []).includes(i) ? 'bad' : (o.ghost || []).includes(i) ? 'ghost' : '';
    const cells = arr.map((v, i) => {
      const isEmpty = o.emptyVal !== undefined && v === o.emptyVal;
      return { v: isEmpty ? (o.emptyLabel ?? '·') : v, cls: (isEmpty ? 'empty ' : '') + cls(i),
        idx: o.showIdx ? i : null, ptr: (o.ptr && o.ptr[i]) || '' };
    });
    return { name, tag: o.tag || '', vertical: !!o.vertical, cells };
  }

  // Builds a 2D table snapshot; cls(r, c) returns a highlight class per cell
  function grid(name, matrix, o = {}) {
    const cls = o.cls || (() => '');
    return { type: 'grid', name, tag: o.tag || '', rowLabels: o.rowLabels || matrix.map((_, r) => r),
      colLabels: o.colLabels || (matrix[0] || []).map((_, c) => c),
      rows: matrix.map((row, r) => row.map((v, c) => ({ v: v === null || v === undefined ? '·' : v, cls: cls(r, c) || '' }))) };
  }

  // Builds a tree snapshot from {id: parentId} plus per-node highlight classes and badges
  function tree(name, parentOf, o = {}) {
    return { type: 'tree', name, tag: o.tag || '', parentOf: { ...parentOf }, labels: o.labels || {},
      cls: o.cls || {}, badge: o.badge || {}, edges: o.edges || [], wide: !!o.wide };
  }

  // Lays out a tree (leaves left to right, parents centred) and returns SVG markup
  function treeSvg(l) {
    const ids = Object.keys(l.parentOf), kids = {}, roots = [];
    ids.forEach(id => { const p = l.parentOf[id]; if (p === null || p === undefined || p === -1 || !(String(p) in l.parentOf)) roots.push(id); else (kids[p] = kids[p] || []).push(id); });
    Object.values(kids).forEach(a => a.sort((x, y) => (isNaN(x) || isNaN(y) ? String(x).localeCompare(String(y), undefined, { numeric: true }) : x - y)));
    const pos = {}; let leaf = 0, maxD = 0;
    const place = (id, d) => { maxD = Math.max(maxD, d); const c = kids[id] || [];
      if (!c.length) pos[id] = { x: leaf++, y: d }; else { c.forEach(k => place(k, d + 1)); pos[id] = { x: (pos[c[0]].x + pos[c[c.length - 1]].x) / 2, y: d }; } };
    roots.forEach(r => place(r, 0));
    const maxLabel = Math.max(1, ...ids.map(id => String(l.labels[id] ?? id).length));
    const W = l.wide ? Math.max(56, maxLabel * 7.5 + 22) : 56, H = 64, w = Math.max(1, leaf) * W + 28, h = (maxD + 1) * H;
    const X = id => pos[id].x * W + W / 2, Y = id => pos[id].y * H + 26;
    const hot = new Set(l.edges.map(([a, b]) => a + '>' + b));
    let s = `<svg class="tree" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">`;
    ids.forEach(id => { const p = l.parentOf[id]; if (pos[p]) s += `<line x1="${X(p)}" y1="${Y(p)}" x2="${X(id)}" y2="${Y(id)}" class="${hot.has(id + '>' + p) || hot.has(p + '>' + id) ? 'hot' : ''}"/>`; });
    ids.forEach(id => {
      const lab = String(l.labels[id] ?? id), bw = lab.length * 7.5 + 14;
      s += `<g class="tn ${l.cls[id] || ''}">${l.wide ? `<rect x="${X(id) - bw / 2}" y="${Y(id) - 14}" width="${bw}" height="28" rx="8"/>` : `<circle cx="${X(id)}" cy="${Y(id)}" r="17"/>`}<text x="${X(id)}" y="${Y(id) + 5}">${esc(lab)}</text>`;
      if (l.badge[id] !== undefined) s += l.wide ? `<text class="badge" x="${X(id)}" y="${Y(id) + 27}" style="text-anchor:middle">${esc(l.badge[id])}</text>` : `<text class="badge" x="${X(id) + 20}" y="${Y(id) - 14}">${esc(l.badge[id])}</text>`;
      s += '</g>';
    });
    return s + '</svg>';
  }


  // Builds a node-link graph snapshot: nodes {id: [x, y]} on a 0..n grid, edges [[a, b, weight?]], options for direction and highlights
  function graph(name, nodes, edges, o = {}) {
    return { type: 'graph', name, tag: o.tag || '', nodes, edges, directed: !!o.directed, cls: o.cls || {}, ecls: o.ecls || {}, badge: o.badge || {} };
  }

  // Places ids evenly on a circle and returns a nodes map for graph()
  function ring(ids, r = 1.6) {
    const m = {}; ids.forEach((id, k) => { const a = -Math.PI / 2 + 2 * Math.PI * k / ids.length; m[id] = [r + r * Math.cos(a), r + r * Math.sin(a)]; });
    return m;
  }

  let markerSeq = 0;
  // Draws a graph snapshot as SVG with weights, arrows, node badges and per-edge classes
  function graphSvg(l) {
    const S = 74, ids = Object.keys(l.nodes), id0 = ++markerSeq;
    const xs = ids.map(i => l.nodes[i][0]), ys = ids.map(i => l.nodes[i][1]);
    const R = i => Math.max(17, String(i).length * 3.8 + 9), wideAny = ids.some(i => String(i).length > 3);
    const minX = Math.min(...xs), minY = Math.min(...ys), w = (Math.max(...xs) - minX) * S + 80 + (wideAny ? 50 : 0), h = (Math.max(...ys) - minY) * S + 70;
    const X = i => (l.nodes[i][0] - minX) * S + (wideAny ? 65 : 40), Y = i => (l.nodes[i][1] - minY) * S + 34;
    const key = (a, b) => l.ecls[a + '>' + b] || (!l.directed && l.ecls[b + '>' + a]) || '';
    let s = `<svg class="graph" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${['', 'hot', 'done', 'bad'].map(c => `<marker id="ar${id0}${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="ah ${c}"/></marker>`).join('')}</defs>`;
    const pairs = new Set(l.edges.map(([a, b]) => a + '>' + b));
    l.edges.forEach(([a, b, wt]) => {
      if (!(a in l.nodes) || !(b in l.nodes)) return;
      const c = key(a, b), d = Math.hypot(X(b) - X(a), Y(b) - Y(a)) || 1, off = l.directed && a !== b && pairs.has(b + '>' + a) ? 5 : 0;
      const x1 = X(a) - (Y(b) - Y(a)) / d * off, y1 = Y(a) + (X(b) - X(a)) / d * off, x2 = X(b) - (Y(b) - Y(a)) / d * off, y2 = Y(b) + (X(b) - X(a)) / d * off;
      const ux = (x2 - x1) / d, uy = (y2 - y1) / d;
      const sx = x1 + ux * R(a), sy = y1 + uy * R(a), ex = x2 - ux * (R(b) + (l.directed ? 3 : 0)), ey = y2 - uy * (R(b) + (l.directed ? 3 : 0));
      s += `<line class="e ${c}" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}"${l.directed ? ` marker-end="url(#ar${id0}${['hot', 'done', 'bad'].includes(c) ? c : ''})"` : ''}/>`;
      if (wt !== undefined && wt !== null) s += `<text class="ew ${c}" x="${(x1 + x2) / 2 - uy * 9}" y="${(y1 + y2) / 2 + ux * 9 + 4}">${esc(wt)}</text>`;
    });
    ids.forEach(i => {
      s += `<g class="gn ${l.cls[i] || ''}">${String(i).length > 3 ? `<rect x="${X(i) - R(i)}" y="${Y(i) - 15}" width="${2 * R(i)}" height="30" rx="10"/>` : `<circle cx="${X(i)}" cy="${Y(i)}" r="17"/>`}<text x="${X(i)}" y="${Y(i) + 5}">${esc(i)}</text>`;
      if (l.badge[i] !== undefined) s += `<text class="badge" x="${X(i) + R(i) + 2}" y="${Y(i) - 15}">${esc(l.badge[i])}</text>`;
      s += '</g>';
    });
    return s + '</svg>';
  }

  // Renders any lane type to HTML
  function laneHtml(l) {
    const head = `<div class="lane-name">${esc(l.name)}<span class="tag">${esc(l.tag)}</span></div>`;
    if (l.type === 'grid') return `<div class="lane">${head}<div class="grid-wrap"><table class="grid"><tr><th></th>${l.colLabels.map(c => `<th>${esc(c)}</th>`).join('')}</tr>
      ${l.rows.map((row, r) => `<tr><th>${esc(l.rowLabels[r])}</th>${row.map(c => `<td class="${c.cls}">${esc(c.v)}</td>`).join('')}</tr>`).join('')}</table></div></div>`;
    if (l.type === 'graph') return `<div class="lane">${head}<div class="tree-wrap">${graphSvg(l)}</div></div>`;
    if (l.type === 'tree') return `<div class="lane">${head}<div class="tree-wrap">${treeSvg(l)}</div></div>`;
    return `<div class="lane">${head}<div class="cells ${l.vertical ? 'vertical' : ''}">${l.cells.length ? l.cells.map(c => `
      <div class="cell-wrap"><div class="ptr">${esc(c.ptr)}</div><div class="cell ${c.cls}">${esc(c.v)}</div>
      ${c.idx !== null ? `<div class="idx">${c.idx}</div>` : ''}</div>`).join('') : '<div class="cell empty">empty</div>'}</div></div>`;
  }

  // Line number of the nth code line containing text (throws if missing, so typos surface early)
  function ln(code, text, nth = 1) {
    const ls = code.replace(/^\n/, '').split('\n');
    for (let k = 0, seen = 0; k < ls.length; k++) if (ls[k].includes(text) && ++seen === nth) return k + 1;
    throw new Error('ln: ' + text);
  }

  // Collects animation steps while a JS simulation runs
  function recorder() {
    const steps = [];
    return {
      steps,
      step(line, say, lanes, vars) { steps.push({ line, say, lanes: JSON.parse(JSON.stringify(lanes)), vars: vars ? { ...vars } : {} }); }
    };
  }

  // Renders one animation (stage + code + controls) into a container
  function player(root, anim, start) {
    let i = Math.min(start || 0, anim.steps.length - 1), timer = null;
    const lines = anim.code.replace(/^\n/, '').split('\n');
    root.innerHTML = `
      <div class="stage-grid">
        <div><div class="stage"></div><div class="say"></div></div>
        <pre class="code">${lines.map((l, k) => `<span class="ln" data-k="${k + 1}">${esc(l) || ' '}</span>`).join('')}</pre>
      </div>
      <div class="controls">
        <button data-a="first">⏮</button><button data-a="prev">◀ Prev</button>
        <button class="primary" data-a="play">▶ Play</button><button data-a="next">Next ▶</button><button data-a="last">⏭</button>
        <label><input type="checkbox" data-a="predict"> Predict mode</label>
        <label>Speed <input type="range" min="300" max="2500" step="100" value="1300" data-a="speed"></label>
        <span class="count"></span>
      </div>
      <div class="hint">Keys: ← → step, space play/pause. Predict mode blurs the explanation: guess first, then click it.</div>`;
    const stage = root.querySelector('.stage'), say = root.querySelector('.say'), count = root.querySelector('.count');
    const playBtn = root.querySelector('[data-a=play]'), predict = root.querySelector('[data-a=predict]'), speed = root.querySelector('[data-a=speed]');

    function render() {
      const s = anim.steps[i];
      stage.innerHTML = s.lanes.map(laneHtml).join('')
        + (Object.keys(s.vars).length ? `<div class="vars">${Object.entries(s.vars).map(([k, v]) => `<span class="var">${esc(k)} = ${esc(v)}</span>`).join('')}</div>` : '');
      say.innerHTML = s.say;
      say.classList.toggle('hidden-say', predict.checked);
      root.querySelectorAll('.ln').forEach(el => el.classList.toggle('on', +el.dataset.k === s.line));
      stage.querySelectorAll('.tree-wrap').forEach(w => {
        const hot = w.querySelector('.tn.active') || w.querySelector('.tn.warn');
        if (!hot || w.scrollWidth <= w.clientWidth) return;
        const box = hot.getBBox();
        w.scrollLeft = Math.max(0, box.x + box.width / 2 - w.clientWidth / 2);
      });
      count.textContent = `step ${i + 1} / ${anim.steps.length}`;
    }
    function go(n) { i = Math.max(0, Math.min(anim.steps.length - 1, n)); render(); if (i === anim.steps.length - 1) stop(); }
    function stop() { clearInterval(timer); timer = null; playBtn.textContent = '▶ Play'; }
    function play() {
      if (timer) return stop();
      if (i === anim.steps.length - 1) go(0);
      playBtn.textContent = '⏸ Pause';
      timer = setInterval(() => go(i + 1), 2800 - +speed.value);
    }
    root.addEventListener('click', e => {
      const a = e.target.dataset.a;
      if (a === 'first') go(0); else if (a === 'prev') go(i - 1); else if (a === 'next') go(i + 1);
      else if (a === 'last') go(anim.steps.length - 1); else if (a === 'play') play();
      if (e.target === say) say.classList.remove('hidden-say');
    });
    predict.addEventListener('change', render);
    speed.addEventListener('input', () => { if (timer) { stop(); play(); } });
    root._keys = e => {
      if (e.key === 'ArrowRight') go(i + 1); else if (e.key === 'ArrowLeft') go(i - 1);
      else if (e.key === ' ') { e.preventDefault(); play(); }
    };
    root._stop = stop;
    render();
  }

  // Builds the hub / previous / next topic bar and returns this page's problem links
  function topicNav() {
    const all = window.BrainLinks || {}, pages = Object.keys(all);
    const here = decodeURIComponent(location.href.split('#')[0]).slice(decodeURIComponent(ROOT).length);
    const k = pages.indexOf(here), rel = h => ROOT + h.split('/').map(encodeURIComponent).join('/');
    const label = h => esc(h.split('/').pop().replace(/ Animations\.html$/, ''));
    const side = (h, cls, arrow) => h ? `<a class="${cls}" href="${rel(h)}">${arrow}</a>` : '<span></span>';
    const bar = `<nav class="topnav"><a href="${ROOT}index.html">⌂ All topics</a>
      ${side(pages[k - 1], 'prev', pages[k - 1] && '← ' + label(pages[k - 1]))}${side(pages[k + 1], 'next', pages[k + 1] && label(pages[k + 1]) + ' →')}</nav>`;
    const dir = here.split('/').slice(0, -1).join('/');
    const note = title => location.protocol === 'file:'
      ? 'obsidian://open?vault=' + encodeURIComponent('Obsidian Vault') + '&file=' + encodeURIComponent('Interview_DS_Algo/Java Brain/' + dir + '/' + title)
      : (window.BrainRepo || 'https://github.com/D9-cell/java-brain/blob/main/') + (dir + '/' + title + '.md').split('/').map(encodeURIComponent).join('/');
    return { bar, links: all[here] || [], note };
  }

  // Mounts a whole topic page with one tab per problem
  function mount(cfg) {
    document.title = cfg.title;
    const app = document.getElementById('app');
    const nav = topicNav();
    app.innerHTML = `<div class="wrap">${nav.bar}<h1>${esc(cfg.title)}</h1><p class="sub">${cfg.sub || ''}</p>
      <div class="tabs">${cfg.problems.map((p, k) => `<button data-p="${k}">${esc(p.name)}</button>`).join('')}</div>
      <div id="problem"></div></div>`;
    const holder = app.querySelector('#problem');
    let current = null;
    const H = Object.fromEntries(location.hash.slice(1).split('&').filter(Boolean).map(x => x.split('=')).map(([a, b]) => [a, +b]));
    function showProblem(k, a0, s0) {
      const p = cfg.problems[k];
      app.querySelectorAll('.tabs button').forEach((b, j) => b.classList.toggle('on', j === k));
      holder.innerHTML = `
        <div class="card"><div class="hook">🧠 ${p.hook}</div><div class="mantra">Mantra: ${esc(p.mantra)}</div>
          <p>${p.statement}</p>${(nav.links[k] || [, []])[1].map(([n, u]) => `<a class="solve" href="${u}" target="_blank" rel="noopener">Solve on ${esc(n)} ↗</a>`).join(' ')}${nav.links[k] ? ` <a class="solve note" href="${nav.note(nav.links[k][0])}" target="_blank" rel="noopener">📖 Note</a>` : ''}${window.BrainProgress ? ' <button class="solvedbtn"></button>' : ''}</div>
        <div class="card"><div class="anim-tabs">${p.anims.map((a, j) => `<button data-x="${j}">${esc(a.name)}</button>`).join('')}</div>
          <div class="player"></div></div>
        <div class="card recall"><h3 style="margin-top:0">Recall before you reveal</h3>
          ${p.recall.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
        ${p.links ? `<div class="card links"><b>Connected problems:</b> ${p.links.map(([t, h]) => typeof h === 'number' ? `<a href="#" data-tab="${h}">${esc(t)}</a>` : `<a href="${h}">${esc(t)}</a>`).join(' · ')}</div>` : ''}`;
      const sb = holder.querySelector('.solvedbtn');
      if (sb) {
        const [t, us] = nav.links[k] || [p.name, []];
        const paint = ok => { sb.classList.toggle('on', ok); sb.textContent = ok ? '✓ Solved' : 'Mark solved'; markTabs(); };
        paint(BrainProgress.isSolved(t, us));
        sb.onclick = () => paint(BrainProgress.toggle(t, us));
      }
      const pl = holder.querySelector('.player');
      const showAnim = (j, st) => {
        if (current && current._stop) current._stop();
        holder.querySelectorAll('.anim-tabs button').forEach((b, x) => b.classList.toggle('on', x === j));
        player(pl, p.anims[j], st); current = pl;
      };
      holder.querySelectorAll('.anim-tabs button').forEach((b, j) => b.onclick = () => showAnim(j));
      holder.querySelectorAll('a[data-tab]').forEach(a => a.onclick = e => { e.preventDefault(); showProblem(+a.dataset.tab); window.scrollTo(0, 0); });
      showAnim(a0 && a0 < p.anims.length ? a0 : 0, s0);
      try { localStorage.setItem('jb-' + cfg.title, k); } catch (e) {}
    }
    // Puts a check mark on the tab of every solved problem
    function markTabs() {
      if (!window.BrainProgress) return;
      app.querySelectorAll('.tabs button').forEach((b, j) => { const [t, us] = nav.links[j] || [cfg.problems[j].name, []]; b.classList.toggle('solved', BrainProgress.isSolved(t, us)); });
    }
    markTabs();
    app.querySelectorAll('.tabs button').forEach((b, k) => b.onclick = () => showProblem(k));
    document.addEventListener('keydown', e => current && current._keys && current._keys(e));
    let start = 0;
    try { start = +(localStorage.getItem('jb-' + cfg.title) || 0); } catch (e) {}
    if ('p' in H) start = H.p;
    showProblem(start < cfg.problems.length ? start : 0, H.a, H.s);
  }

  window.BrainAnim = { lane, grid, tree, graph, ring, recorder, mount, ln, laneHtml };
})();
