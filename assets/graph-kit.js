// Small helpers shared by the Graph animation pages
(function () {
  const { lane, graph, recorder, ln } = BrainAnim;

  // Integer range a..b inclusive
  const range = (a, b) => { const r = []; for (let t = a; t <= b; t++) r.push(t); return r; };

  // Builds a node class map from {active:[..], done:[..], warn:[..], bad:[..], ghost:[..]}
  const C = o => { const m = {}; for (const k of ['ghost', 'done', 'warn', 'bad', 'active']) (o[k] || []).forEach(n => { m[n] = k; }); return m; };

  // Builds an edge class map from [[a, b], ...] lists per class, e.g. EC({hot: [[0, 1]], done: [[1, 2]]})
  const EC = o => { const m = {}; for (const [k, list] of Object.entries(o)) list.forEach(([a, b]) => { m[a + '>' + b] = k; }); return m; };

  // Queue lane: front is the first cell
  const Q = (name, arr, tag) => lane(name, arr, { ptr: arr.length ? { 0: 'front' } : {}, tag: tag || `${arr.length} waiting` });

  // Stack lane drawn bottom to top, the last cell is the top
  const S = (name, arr, tag) => lane(name, arr, { vertical: true, ptr: arr.length ? { [arr.length - 1]: 'top' } : {}, tag: tag || `${arr.length} inside` });

  // Indexed array lane with optional highlight lists
  const A = (name, arr, o = {}) => lane(name, arr, { showIdx: true, ...o });

  // Turns a list of [line, say, lanes, vars] into recorded steps
  const story = list => { const r = recorder(); for (const [line, say, lanes, vars] of list) r.step(line, say, lanes, vars); return r.steps; };

  // Builds an adjacency list from edges; undirected adds both directions
  const adjOf = (n, edges, directed) => { const a = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => { a[u].push(v); if (!directed) a[v].push(u); }); return a; };

  window.GK = { range, C, EC, Q, S, A, story, adjOf, G: graph, lane, ln, recorder };
})();
