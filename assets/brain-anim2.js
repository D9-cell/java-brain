// Shared step-by-step animation engine for Java Brain topic pages
(function () {
  const ROOT = document.currentScript ? document.currentScript.src.replace(/assets\/brain-anim[^/]*\.js.*$/, '') : '';
  const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  const svg = (d, o = {}) => `<svg aria-hidden="true" width="${o.s || 16}" height="${o.s || 16}" viewBox="0 0 24 24" fill="${o.fill || 'none'}" stroke="${o.fill ? 'none' : 'currentColor'}" stroke-width="${o.w || 2.4}" stroke-linecap="round" stroke-linejoin="round"${o.cls ? ` class="${o.cls}"` : ''}>${d}</svg>`;
  const ICON = {
    first: svg('<path d="M6 5v14"/><path d="m18 6-8 6 8 6z"/>', { s: 18, w: 2.2 }), last: svg('<path d="M18 5v14"/><path d="m6 6 8 6-8 6z"/>', { s: 18, w: 2.2 }),
    prev: svg('<path d="m15 18-6-6 6-6"/>'), next: svg('<path d="m9 18 6-6-6-6"/>'),
    play: svg('<polygon points="7 4 20 12 7 20"/>', { s: 18, fill: 'currentColor' }), pause: svg('<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>', { s: 18, fill: 'currentColor' }),
    chat: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    bulb: svg('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>', { s: 20, w: 2 }),
    check: svg('<polyline points="20 6 9 17 4 12"/>', { s: 18, w: 3 }), tick: svg('<polyline points="20 6 9 17 4 12"/>', { s: 14, w: 3.5, cls: 'tick' }),
    ext: svg('<path d="M7 17 17 7"/><path d="M8 7h9v9"/>'), book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>', { w: 2.2 }),
    grid: svg('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>', { w: 2.2 }),
    arrowL: svg('<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>'), arrowR: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
    chev: svg('<path d="m9 18 6-6-6-6"/>', { s: 18, cls: 'chev' }),
    moon: '<svg class="ico-moon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>',
    sun: '<svg class="ico-sun" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>'
  };
  const ABBR = { Backtracking: 'BT', 'Binary Lifting': 'BL', Bit_Magic: 'BM', DP: 'DP', Design: 'DS', Graph: 'GR', Greedy: 'GD', HashMap: 'HM', HashSet: 'HS', Heap: 'HP', 'Line Sweep': 'LS', 'Linked List': 'LL', 'Meet In The Middle': 'MM', Queue: 'QU', Recursion: 'RC', 'Segment Tree': 'ST', 'Sliding Window': 'SW', Stack: 'SK', Tree: 'TR', Trie: 'TI' };

  // Splits a code line into its source and trailing // comment, ignoring slashes inside quotes
  function splitComment(l) {
    let q = null;
    for (let k = 0; k < l.length - 1; k++) {
      const c = l[k];
      if (q) { if (c === '\\') k++; else if (c === q) q = null; } else if (c === '"' || c === "'") q = c;
      else if (c === '/' && l[k + 1] === '/') return [l.slice(0, k), l.slice(k)];
    }
    return [l, ''];
  }

  // Picks the color class for a code comment from the choose / explore / un-choose vocabulary
  const cmtClass = c => /un-?choose/i.test(c) ? 'c-green' : /explore/i.test(c) ? 'c-yellow' : /choose/i.test(c) ? 'c-blue' : '';

  // Colors the pointer label above a cell: a and i blue, b and j red, anything else green
  const ptrClass = p => /^(a|i)$/i.test(p) ? 'p-blue' : /^(b|j)$/i.test(p) ? 'p-red' : '';

  // Splits a mantra into short pills on middots and top-level commas
  function mantraPills(m) {
    const out = []; let d = 0, cur = '';
    for (const ch of String(m)) {
      if ('([{'.includes(ch)) d++; else if (')]}'.includes(ch)) d--;
      if (d <= 0 && (ch === ',' || ch === '·')) { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur);
    return out.map(x => x.trim()).filter(Boolean);
  }

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
      <div class="cell-wrap"><div class="ptr ${ptrClass(c.ptr)}">${esc(c.ptr)}</div><div class="cell ${c.cls}">${esc(c.v)}</div>
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

  // Renders one animation (step bar + stage + code + controls) into a container
  function player(root, anim, start) {
    let i = Math.min(start || 0, anim.steps.length - 1), timer = null;
    const lines = anim.code.replace(/^\n/, '').split('\n');
    const codeLine = (l, n) => { const [src, cmt] = splitComment(l); return `<span class="ln" data-k="${n}"><span class="no">${n}</span><span class="src">${esc(src) || ' '}</span>${cmt ? `<span class="cmt ${cmtClass(cmt)}">${esc(cmt)}</span>` : ''}</span>`; };
    root.innerHTML = `
      <div class="stepbar" role="group" aria-label="Steps">${anim.steps.map((_, k) => `<button type="button" class="seg" data-a="seg" data-k="${k}" aria-label="Go to step ${k + 1}"></button>`).join('')}</div>
      <div class="stage-grid">
        <div class="stage-col">
          <div class="stage"></div>
          <div class="vars"></div>
          <div class="say-box"><span class="say-ico" aria-hidden="true">${ICON.chat}</span><div class="say-main"><div class="say-head">WHAT HAPPENS</div><div class="say"></div></div></div>
        </div>
        <div class="code-card"><div class="code-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="fname">Solution.java</span></div>
          <pre class="code">${lines.map((l, k) => codeLine(l, k + 1)).join('')}</pre></div>
      </div>
      <div class="controls">
        <div class="ctl-main">
          <button type="button" class="ico-btn" data-a="first" aria-label="First step">${ICON.first}</button>
          <button type="button" data-a="prev">${ICON.prev}Prev</button>
          <button type="button" class="play" data-a="play">${ICON.play}Play</button>
          <button type="button" data-a="next">Next${ICON.next}</button>
          <button type="button" class="ico-btn" data-a="last" aria-label="Last step">${ICON.last}</button>
        </div>
        <div class="ctl-opts">
          <label class="switch"><input type="checkbox" data-a="predict"><span class="track"><span class="knob"></span></span>Predict mode</label>
          <label class="speed">Speed <input type="range" min="300" max="2500" step="100" value="1300" data-a="speed"></label>
          <span class="count"></span>
        </div>
      </div>
      <div class="hint"><kbd>←</kbd><kbd>→</kbd> step <kbd class="gap">Space</kbd> play or pause <span class="gap">Predict mode blurs the explanation. Guess first, then click it.</span></div>`;
    const stage = root.querySelector('.stage'), say = root.querySelector('.say'), count = root.querySelector('.count'), varsEl = root.querySelector('.vars'), sayHead = root.querySelector('.say-head');
    const playBtn = root.querySelector('[data-a=play]'), predict = root.querySelector('[data-a=predict]'), speed = root.querySelector('[data-a=speed]');
    const segs = [...root.querySelectorAll('.seg')];

    function render() {
      const s = anim.steps[i];
      stage.innerHTML = s.lanes.map(laneHtml).join('');
      varsEl.innerHTML = Object.entries(s.vars).map(([k, v]) => `<span class="var"><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></span>`).join('');
      say.innerHTML = s.say;
      say.classList.toggle('hidden-say', predict.checked);
      sayHead.textContent = predict.checked ? 'PREDICT FIRST. CLICK TO REVEAL' : 'WHAT HAPPENS';
      say.classList.remove('fade'); void say.offsetWidth; say.classList.add('fade');
      segs.forEach((g, k) => { g.classList.toggle('past', k < i); g.classList.toggle('now', k === i); });
      root.querySelectorAll('.ln').forEach(el => el.classList.toggle('on', +el.dataset.k === s.line));
      stage.querySelectorAll('.tree-wrap').forEach(w => {
        const hot = w.querySelector('.tn.active') || w.querySelector('.tn.warn');
        if (!hot || w.scrollWidth <= w.clientWidth) return;
        const box = hot.getBBox();
        w.scrollLeft = Math.max(0, box.x + box.width / 2 - w.clientWidth / 2);
      });
      count.textContent = `step ${i + 1} / ${anim.steps.length}`;
    }
    function paintPlay(on) { playBtn.innerHTML = (on ? ICON.pause : ICON.play) + (on ? 'Pause' : 'Play'); playBtn.classList.toggle('playing', on); }
    function go(n) { i = Math.max(0, Math.min(anim.steps.length - 1, n)); render(); if (i === anim.steps.length - 1) stop(); }
    function stop() { clearInterval(timer); timer = null; paintPlay(false); }
    function play() {
      if (timer) return stop();
      if (i === anim.steps.length - 1) go(0);
      paintPlay(true);
      timer = setInterval(() => go(i + 1), 2800 - +speed.value);
    }
    root.addEventListener('click', e => {
      const a = e.target.dataset.a;
      if (a === 'first') go(0); else if (a === 'prev') go(i - 1); else if (a === 'next') go(i + 1);
      else if (a === 'last') go(anim.steps.length - 1); else if (a === 'play') play(); else if (a === 'seg') go(+e.target.dataset.k);
      if (e.target.closest('.say-box')) { say.classList.remove('hidden-say'); sayHead.textContent = 'WHAT HAPPENS'; }
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

  // Builds the sticky top bar and returns this page's topic info and problem links
  function topicNav() {
    const all = window.BrainLinks || {}, pages = Object.keys(all);
    const here = decodeURIComponent(location.href.split('#')[0]).slice(decodeURIComponent(ROOT).length);
    const k = pages.indexOf(here), rel = h => ROOT + h.split('/').map(encodeURIComponent).join('/');
    const label = h => esc(h.split('/').pop().replace(/ Animations\.html$/, ''));
    const tops = [...new Set(pages.map(h => h.split('/')[0]))], top = here.split('/')[0], ti = Math.max(0, tops.indexOf(top));
    const pill = (h, arrow, left) => h ? `<a class="${left ? 'prev' : 'next'}" href="${rel(h)}">${left ? ICON.arrowL + label(h) : label(h) + ICON.arrowR}</a>` : '';
    const bar = `<header class="jb-top"><div class="jb-top-in">
      <a class="brand" href="${ROOT}index.html"><span class="bdots" aria-hidden="true"><i style="background:var(--blue)"></i><i style="background:var(--red)"></i><i style="background:var(--yellow)"></i><i style="background:var(--green)"></i></span><span class="bname">Java Brain<span>.</span></span></a>
      <nav class="topnav" aria-label="Topics"><a class="tn-all" href="${ROOT}index.html">${ICON.grid}All topics</a>${pill(pages[k - 1], '', true)}${pill(pages[k + 1], '', false)}<button type="button" class="themebtn" data-theme-toggle aria-label="Switch to dark mode">${ICON.moon}${ICON.sun}</button></nav>
    </div></header>`;
    const dir = here.split('/').slice(0, -1).join('/');
    const note = title => location.protocol === 'file:'
      ? 'obsidian://open?vault=' + encodeURIComponent('Obsidian Vault') + '&file=' + encodeURIComponent('Interview_DS_Algo/Java Brain/' + dir + '/' + title)
      : (window.BrainRepo || 'https://github.com/D9-cell/java-brain/blob/main/') + (dir + '/' + title + '.md').split('/').map(encodeURIComponent).join('/');
    return { bar, links: all[here] || [], note, topic: { n: ti + 1, total: tops.length, abbr: ABBR[top] || top.slice(0, 2).toUpperCase(), hue: ti % 4 } };
  }

  // Mounts a whole topic page with one tab per problem
  function mount(cfg) {
    document.title = cfg.title;
    const app = document.getElementById('app');
    const nav = topicNav(), T = nav.topic, pad = n => String(n).padStart(2, '0');
    const sub = (cfg.sub || '').replace(/\b(un-choose|choose|explore)\b/gi, w => `<span class="${/^un/i.test(w) ? 'c-green' : /^choose/i.test(w) ? 'c-blue' : 'c-yellow'}">${w}</span>`);
    app.innerHTML = `${nav.bar}<main class="wrap">
      <section class="hero jb-up" aria-labelledby="ttl"><div class="hero-copy"><div class="eyebrow"><span class="tbadge h${T.hue}" aria-hidden="true">${esc(T.abbr)}</span>TOPIC ${pad(T.n)} OF ${T.total}</div>
        <h1 id="ttl">${esc(cfg.title.replace(/ Animations$/, ''))}</h1><p class="sub">${sub}</p></div>
        <div class="tprog"><div class="row"><span>Topic progress</span><span class="big"><span id="tp-n">0</span> <small>/ ${cfg.problems.length}</small></span></div><div class="track"><i id="tp-bar"></i></div></div></section>
      <nav class="tabs-card jb-up" aria-label="Problems" style="animation-delay:.08s"><div class="tabs">${cfg.problems.map((p, k) => `<button type="button" data-p="${k}"><span class="num">${k + 1}</span>${esc(p.name)}${ICON.tick}</button>`).join('')}</div></nav>
      <div id="problem"></div></main>`;
    const holder = app.querySelector('#problem');
    let current = null;
    const H = Object.fromEntries(location.hash.slice(1).split('&').filter(Boolean).map(x => x.split('=')).map(([a, b]) => [a, +b]));
    function showProblem(k, a0, s0) {
      const p = cfg.problems[k], links = (nav.links[k] || [, []])[1], first = links[0];
      const chip = first ? `<span class="chip ${/^LeetCode/i.test(first[0]) ? 'lc' : /^GfG/i.test(first[0]) ? 'gfg' : ''}">${esc(first[0].replace(/^LeetCode/i, 'LC'))}</span>` : '';
      const prevP = cfg.problems[k - 1], nextP = cfg.problems[k + 1];
      app.querySelectorAll('.tabs button').forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-current', j === k ? 'page' : 'false'); });
      holder.innerHTML = `
        <section class="pcard jb-up" aria-labelledby="pname"><div class="pmain">
          <div class="ptitle-row">${chip}<h2 id="pname">${esc(p.name)}</h2></div>
          <p class="statement">${p.statement}</p>
          <div class="hook"><span class="hook-ico" aria-hidden="true">${ICON.bulb}</span><div class="hook-body"><div class="lbl">MEMORY HOOK</div><div>${p.hook}</div></div></div>
          <div class="mantra"><div class="lbl">MANTRA</div><div class="pills">${mantraPills(p.mantra).map(m => `<span>${esc(m)}</span>`).join('')}</div></div></div>
          <div class="pside">${window.BrainProgress ? '<button type="button" class="solvedbtn" aria-pressed="false"></button>' : ''}${links.map(([n, u]) => `<a class="solve" href="${u}" target="_blank" rel="noopener">Solve on ${esc(n.replace(/\s*\d+$/, ''))}${ICON.ext}</a>`).join('')}${nav.links[k] ? `<a class="solve note" href="${nav.note(nav.links[k][0])}" target="_blank" rel="noopener">${ICON.book}Open note</a>` : ''}</div></section>
        <section class="acard jb-up" aria-labelledby="player-h"><div class="ahead"><h2 id="player-h">Animation</h2><div class="anim-tabs">${p.anims.map((a, j) => `<button type="button" data-x="${j}">${esc(a.name)}</button>`).join('')}</div></div>
          <div class="player"></div></section>
        <section class="card recall jb-up" aria-labelledby="recall-h"><div class="rhead"><span class="rdots" aria-hidden="true"><i></i><i></i><i></i><i></i></span><h2 id="recall-h">Recall before you reveal</h2></div>
          ${p.recall.map(([q, a], n) => `<details><summary><span class="rn">${n + 1}</span><span class="rq">${q}</span>${ICON.chev}</summary><p class="ans">${a}</p></details>`).join('')}</section>
        ${p.links && p.links.length ? `<div class="card links"><b>Connected problems:</b> ${p.links.map(([t, h]) => typeof h === 'number' ? `<a href="#" data-tab="${h}">${esc(t)}</a>` : `<a href="${h}">${esc(t)}</a>`).join(' · ')}</div>` : ''}
        <nav class="probnav" aria-label="Problem navigation">${prevP ? `<button type="button" class="pn-prev" data-go="${k - 1}">${ICON.arrowL}Previous: ${esc(prevP.name)}</button>` : '<span class="pn-none">First problem</span>'}${nextP ? `<button type="button" class="pn-next" data-go="${k + 1}">Next: ${esc(nextP.name)}${ICON.arrowR}</button>` : '<span class="pn-none">Last problem</span>'}</nav>`;
      const sb = holder.querySelector('.solvedbtn');
      if (sb) {
        const [t, us] = nav.links[k] || [p.name, []];
        const paint = ok => { sb.classList.toggle('on', ok); sb.setAttribute('aria-pressed', ok); sb.innerHTML = (ok ? ICON.check : '') + (ok ? 'Solved' : 'Mark solved'); markTabs(); };
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
      holder.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { showProblem(+b.dataset.go); window.scrollTo(0, 0); });
      showAnim(a0 && a0 < p.anims.length ? a0 : 0, s0);
      try { localStorage.setItem('jb-' + cfg.title, k); } catch (e) {}
    }
    // Puts a check mark on the tab of every solved problem and updates the topic progress card
    function markTabs() {
      if (!window.BrainProgress) return;
      let n = 0;
      app.querySelectorAll('.tabs button').forEach((b, j) => { const [t, us] = nav.links[j] || [cfg.problems[j].name, []], ok = BrainProgress.isSolved(t, us); b.classList.toggle('solved', ok); n += ok; });
      app.querySelector('#tp-n').textContent = n;
      app.querySelector('#tp-bar').style.width = (100 * n / cfg.problems.length) + '%';
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
