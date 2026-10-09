// Small helpers shared by the Tree animation pages
(function () {
  const { tree, lane, recorder, ln } = BrainAnim;

  // Builds a node class map from {active:[..], done:[..], warn:[..], bad:[..], ghost:[..]}
  const C = o => { const m = {}; for (const k of ['ghost', 'done', 'warn', 'bad', 'active']) (o[k] || []).forEach(n => { m[n] = k; }); return m; };

  // Array lane with indexes
  const A = (name, arr, o = {}) => lane(name, arr, { showIdx: true, ...o });

  // Queue lane, front is the first cell
  const Q = (name, arr, tag) => lane(name, arr, { ptr: arr.length ? { 0: 'front' } : {}, tag: tag || `${arr.length} waiting` });

  // Stack lane drawn bottom to top
  const S = (name, arr, tag) => lane(name, arr, { vertical: true, ptr: arr.length ? { [arr.length - 1]: 'top' } : {}, tag: tag || `${arr.length} inside` });

  // Plain list lane (no indexes) for results being built
  const R = (name, arr, o = {}) => lane(name, arr.map(x => (Array.isArray(x) ? `[${x.join(',')}]` : x)), o);

  // Parses a LeetCode level-order array; every node id is its index in that array
  function make(arr) {
    const L = {}, Rt = {}, par = {}, ids = [];
    if (arr[0] !== null && arr[0] !== undefined) {
      par[0] = -1; ids.push(0);
      const q = [0]; let i = 1;
      while (q.length && i < arr.length) {
        const u = q.shift();
        if (i < arr.length && arr[i] != null) { L[u] = i; par[i] = u; ids.push(i); q.push(i); } i++;
        if (i < arr.length && arr[i] != null) { Rt[u] = i; par[i] = u; ids.push(i); q.push(i); } i++;
      }
    }
    const t = { arr, L, R: Rt, par, ids, val: id => arr[id] };
    t.root = ids.length ? 0 : null;
    t.snap = (name, o = {}) => tree(name, par, { labels: Object.fromEntries(ids.map(id => [id, arr[id]])), cls: C(o), badge: o.badge || {}, edges: o.edges || [], tag: o.tag || '' });
    t.levels = () => { const out = []; let cur = t.root === null ? [] : [t.root]; while (cur.length) { out.push(cur); const nx = []; cur.forEach(u => { if (L[u] !== undefined) nx.push(L[u]); if (Rt[u] !== undefined) nx.push(Rt[u]); }); cur = nx; } return out; };
    t.bfs = () => t.levels().flat();
    t.pre = () => { const o = []; const f = u => { if (u === undefined) return; o.push(u); f(L[u]); f(Rt[u]); }; f(t.root); return o; };
    t.ino = () => { const o = []; const f = u => { if (u === undefined) return; f(L[u]); o.push(u); f(Rt[u]); }; f(t.root); return o; };
    t.post = () => { const o = []; const f = u => { if (u === undefined) return; f(L[u]); f(Rt[u]); o.push(u); }; f(t.root); return o; };
    t.depth = () => { const d = {}; t.levels().forEach((ids2, k) => ids2.forEach(u => { d[u] = k; })); return d; };
    t.col = () => { const c = {}; const f = (u, x) => { if (u === undefined) return; c[u] = x; f(L[u], x - 1); f(Rt[u], x + 1); }; f(t.root, 0); return c; };
    t.leaf = u => L[u] === undefined && Rt[u] === undefined;
    return t;
  }

  // Runs a callback once per level; the callback returns {line, say, cls, badge, lanes, vars, edges}
  function levelStory(t, o) {
    const r = recorder(), st = {}, name = o.name || 'tree';
    r.step(o.introLine || 0, o.intro, [t.snap(name), ...(o.lanes0 ? o.lanes0(st) : [])]);
    t.levels().forEach((ids, d) => {
      const s = o.step(ids, d, st);
      r.step(s.line, s.say, [t.snap(name, { warn: ids, ...(s.cls || {}), badge: s.badge, edges: s.edges }), ...(s.lanes || [])], s.vars);
    });
    if (o.end) { const s = o.end(st); r.step(s.line, s.say, [t.snap(name, { ...(s.cls || {}), badge: s.badge }), ...(s.lanes || [])], s.vars); }
    return r.steps;
  }

  // Runs a callback once per node in the given order; the callback returns {line, say, cls, badge, lanes, vars, edges}
  function nodeStory(t, order, o) {
    const r = recorder(), st = {}, name = o.name || 'tree';
    r.step(o.introLine || 0, o.intro, [t.snap(name), ...(o.lanes0 ? o.lanes0(st) : [])]);
    order.forEach((u, k) => {
      const s = o.step(u, k, st);
      if (!s) return;
      r.step(s.line, s.say, [t.snap(name, { active: [u], ...(s.cls || {}), badge: s.badge, edges: s.edges }), ...(s.lanes || [])], s.vars);
    });
    if (o.end) { const s = o.end(st); r.step(s.line, s.say, [t.snap(name, { ...(s.cls || {}), badge: s.badge }), ...(s.lanes || [])], s.vars); }
    return r.steps;
  }

  window.TK = { C, A, Q, S, R, make, levelStory, nodeStory, tree, lane, recorder, ln };
})();
