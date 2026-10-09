const W = (name, code, steps) => [{ name, code, steps }];
const vals = (t, ids) => ids.map(u => t.val(u));
const sortedCols = m => Object.keys(m).map(Number).sort((a, b) => a - b);

const C_RSV = `
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        TreeNode cur = q.poll();
        if (i == size - 1) res.add(cur.val);
        if (cur.left != null) q.add(cur.left);
        if (cur.right != null) q.add(cur.right);
    }
}`;
{
  const t = make([1, 2, 3, null, 5, null, 4]);
  ANIM['Binary Tree Right Side View'] = W('BFS, last of level', C_RSV, levelStory(t, {
    intro: 'Scan level by level. The <b>last</b> node of each level is the one you see from the right.',
    step: (ids, d, st) => { st.res = st.res || []; const last = ids[ids.length - 1]; st.res.push(t.val(last));
      return { line: ln(C_RSV, 'res.add'), say: `Level ${d}: [${vals(t, ids).join(', ')}]. Last = <b>${t.val(last)}</b> goes to the answer.`, cls: { active: [last] }, lanes: [A('res', st.res)] }; },
    end: st => ({ line: ln(C_RSV, 'while'), say: `Answer [${st.res.join(', ')}]. Note 5 is visible on level 2 because nothing is to its right.`, lanes: [A('res', st.res, { done: st.res.map((_, i) => i) })] })
  }));
}

const C_LV = `
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        TreeNode cur = q.poll();
        if (i == 0) res.add(cur.val);
        if (cur.left != null) q.add(cur.left);
        if (cur.right != null) q.add(cur.right);
    }
}`;
{
  const t = make([1, 2, 3, null, 4, null, 5]);
  ANIM['Left View of Binary Tree'] = W('BFS, first of level', C_LV, levelStory(t, {
    intro: 'Same scan, but keep the <b>first</b> node of every level.',
    step: (ids, d, st) => { st.res = st.res || []; const f = ids[0]; st.res.push(t.val(f));
      return { line: ln(C_LV, 'res.add'), say: `Level ${d}: [${vals(t, ids).join(', ')}]. First = <b>${t.val(f)}</b>.`, cls: { active: [f] }, lanes: [A('res', st.res)] }; },
    end: st => ({ line: ln(C_LV, 'while'), say: `Answer [${st.res.join(', ')}].`, lanes: [A('res', st.res, { done: st.res.map((_, i) => i) })] })
  }));
}

const C_TOP = `
while (!nodes.isEmpty()) {
    TreeNode cur = nodes.poll();
    int d = dist.poll();
    col.putIfAbsent(d, cur.val);
    if (cur.left != null) { nodes.add(cur.left); dist.add(d - 1); }
    if (cur.right != null) { nodes.add(cur.right); dist.add(d + 1); }
}`;
const C_BOT = C_TOP.replace('putIfAbsent', 'put');
function columnView(code, first, key) {
  const t = make([1, 2, 3, 4, 5, 6, 7]), cols = t.col(), badge = {};
  return nodeStory(t, t.bfs(), {
    intro: `Number the columns: left child −1, right child +1. Level order reaches shallow nodes first. Rule: <b>${first ? 'keep the first node per column' : 'a later node overwrites the column'}</b>.`,
    lanes0: st => { st.col = {}; return [A('column → value', [])]; },
    step: (u, k, st) => { const c = cols[u], had = c in st.col; if (first ? !had : true) st.col[c] = t.val(u); badge[u] = 'c' + c;
      const cs = sortedCols(st.col);
      return { line: ln(code, key), say: first ? (had ? `Node ${t.val(u)} is in column ${c}, already taken by ${st.col[c]} → skip.` : `Node ${t.val(u)} opens column ${c}.`) : `Node ${t.val(u)} in column ${c} ${had ? 'overwrites the earlier one' : 'is the first of its column'}.`,
        badge: { ...badge }, lanes: [lane('column → value', cs.map(x => `${x}: ${st.col[x]}`), { tag: 'sorted by column' })] }; },
    end: st => ({ line: ln(code, 'col.'), say: `Read the map left to right: <b>${sortedCols(st.col).map(x => st.col[x]).join(', ')}</b>.`, badge, lanes: [lane('view', sortedCols(st.col).map(x => st.col[x]), { done: sortedCols(st.col).map((_, i) => i) })] })
  });
}
ANIM['Top View of Binary Tree'] = W('BFS + column map', C_TOP, columnView(C_TOP, true, 'putIfAbsent'));
ANIM['Bottom View of Binary Tree'] = W('BFS + column map', C_BOT, columnView(C_BOT, false, 'put'));

const C_ZZ = `
boolean leftToRight = true;
while (!q.isEmpty()) {
    int size = q.size();
    Integer[] level = new Integer[size];
    for (int i = 0; i < size; i++) {
        TreeNode cur = q.poll();
        level[leftToRight ? i : size - 1 - i] = cur.val;
    }
    res.add(Arrays.asList(level));
    leftToRight = !leftToRight;
}`;
{
  const t = make([3, 9, 20, 4, 5, 15, 7]);
  ANIM['Binary Tree Zigzag Level Order Traversal'] = W('Fill from either end', C_ZZ, levelStory(t, {
    intro: 'The queue always runs left to right. Only the <b>slot in the output row</b> changes: index <code>i</code> or <code>size-1-i</code>.',
    step: (ids, d, st) => { st.res = st.res || []; const row = vals(t, ids), out = d % 2 === 0 ? row : [...row].reverse(); st.res.push(out);
      return { line: ln(C_ZZ, 'level[leftToRight'), say: `Level ${d} goes ${d % 2 === 0 ? 'left → right' : 'right → left'}: [${out.join(', ')}].`, lanes: [R('res', st.res)] }; },
    end: st => ({ line: ln(C_ZZ, 'leftToRight = !'), say: `Result ${JSON.stringify(st.res)}.`, lanes: [R('res', st.res, { done: st.res.map((_, i) => i) })] })
  }));
}

const C_VT = `
while (!nodes.isEmpty()) {
    TreeNode cur = nodes.poll();
    int d = dist.poll();
    col.computeIfAbsent(d, k -> new ArrayList<>()).add(cur.val);
    if (cur.left != null) { nodes.add(cur.left); dist.add(d - 1); }
    if (cur.right != null) { nodes.add(cur.right); dist.add(d + 1); }
}`;
{
  const t = make([1, 2, 3, 4, 5, 6, 7]), cols = t.col(), badge = {};
  ANIM['Vertical Tree Traversal'] = W('BFS + column lists', C_VT, nodeStory(t, t.bfs(), {
    intro: 'Plumb lines: column = left −1 / right +1. BFS appends each node to its column list, so every list is already top to bottom.',
    lanes0: st => { st.col = {}; return [R('columns', [])]; },
    step: (u, k, st) => { const c = cols[u]; (st.col[c] = st.col[c] || []).push(t.val(u)); badge[u] = 'c' + c;
      return { line: ln(C_VT, 'computeIfAbsent'), say: `Node ${t.val(u)} → column ${c}: [${st.col[c].join(', ')}].`, badge: { ...badge }, lanes: [lane('columns (sorted)', sortedCols(st.col).map(x => `${x}: [${st.col[x].join(',')}]`))] }; },
    end: st => ({ line: ln(C_VT, 'while'), say: `Read the columns from left to right: ${JSON.stringify(sortedCols(st.col).map(x => st.col[x]))}.`, badge, lanes: [R('answer', sortedCols(st.col).map(x => st.col[x]), { done: sortedCols(st.col).map((_, i) => i) })] })
  }));
}

const C_987 = `
dfs(root, 0, 0, all);
all.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]);
for (int i = 0; i < all.size(); i++) {
    if (i == 0 || all.get(i)[0] != all.get(i - 1)[0]) res.add(new ArrayList<>());
    res.get(res.size() - 1).add(all.get(i)[2]);
}`;
{
  const t = make([1, 2, 3, 4, 6, 5, 7]), cols = t.col(), depth = t.depth(), r = recorder();
  r.step(0, 'Nodes 5 and 6 share cell (column 0, row 2). The rule says smaller value first, so plain BFS order is not enough.', [t.snap('tree')]);
  const triples = [], badge = {};
  t.pre().forEach(u => { triples.push([cols[u], depth[u], t.val(u)]); badge[u] = `(${cols[u]},${depth[u]})`;
    r.step(ln(C_987, 'dfs('), `Visit ${t.val(u)}: record (col ${cols[u]}, row ${depth[u]}, val ${t.val(u)}).`, [t.snap('tree', { active: [u], badge }), R('triples', triples.map(x => `(${x.join(',')})`))]); });
  const sorted = [...triples].sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  r.step(ln(C_987, 'all.sort'), 'Sort by column, then row, then <b>value</b>. The tie (0,2): 5 before 6.', [t.snap('tree', { badge }), R('sorted triples', sorted.map(x => `(${x.join(',')})`), { warn: [3, 4] })]);
  const res = []; sorted.forEach(x => { if (!res.length || res[res.length - 1].c !== x[0]) res.push({ c: x[0], v: [] }); res[res.length - 1].v.push(x[2]); });
  r.step(ln(C_987, 'res.add(new'), `Cut where the column changes: ${JSON.stringify(res.map(x => x.v))}.`, [t.snap('tree', { badge }), R('answer', res.map(x => x.v), { done: res.map((_, i) => i) })]);
  ANIM['Vertical Order Traversal of a Binary Tree'] = W('Triples + sort', C_987, r.steps);
}

const C_DIAG = `
private void fill(TreeNode n, int d, TreeMap<Integer, List<Integer>> map) {
    if (n == null) return;
    map.computeIfAbsent(d, k -> new ArrayList<>()).add(n.val);
    fill(n.left, d + 1, map);
    fill(n.right, d, map);
}`;
{
  const t = make([8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]), diag = {}, badge = {};
  const f = (u, d) => { if (u === undefined) return; diag[u] = d; f(t.L[u], d + 1); f(t.R[u], d); }; f(t.root, 0);
  ANIM['Diagonal Tree Traversal'] = W('DFS + diagonal map', C_DIAG, nodeStory(t, t.pre(), {
    intro: 'Left child starts a <b>new diagonal</b> (d + 1). Right child stays on the <b>same</b> diagonal (d).',
    lanes0: st => { st.m = {}; return [R('diagonals', [])]; },
    step: (u, k, st) => { const d = diag[u]; (st.m[d] = st.m[d] || []).push(t.val(u)); badge[u] = 'd' + d;
      return { line: ln(C_DIAG, 'computeIfAbsent'), say: `Node ${t.val(u)} joins diagonal ${d}.`, badge: { ...badge }, lanes: [R('diagonals', sortedCols(st.m).map(x => st.m[x]))] }; },
    end: st => ({ line: ln(C_DIAG, 'fill(n.right'), say: `Diagonals: ${JSON.stringify(sortedCols(st.m).map(x => st.m[x]))}.`, badge, lanes: [R('answer', sortedCols(st.m).map(x => st.m[x]), { done: sortedCols(st.m).map((_, i) => i) })] })
  }));
}

const C_BT = `
if (!isLeaf(root)) res.add(root.val);
for (TreeNode n = root.left; n != null && !isLeaf(n); n = n.left != null ? n.left : n.right) res.add(n.val);
leaves(root, res);
for (TreeNode n = root.right; n != null && !isLeaf(n); n = n.right != null ? n.right : n.left) right.add(n.val);
Collections.reverse(right);
res.addAll(right);`;
{
  const t = make([20, 8, 22, 4, 12, null, 25, null, null, 10, 14]), r = recorder(), res = [];
  r.step(0, 'Outline in three parts: left edge (no leaf), all leaves, right edge (no leaf) reversed. Start with the root.', [t.snap('tree')]);
  res.push(20); r.step(ln(C_BT, 'res.add(root.val)'), 'Root 20 first.', [t.snap('tree', { done: [0] }), A('boundary', res)]);
  const left = [1, 3]; left.forEach(u => res.push(t.val(u)));
  r.step(ln(C_BT, 'root.left'), 'Walk down the left edge, skipping the leaf at the bottom: 8, 4 (4 is a leaf, so it waits for the leaf pass).', [t.snap('tree', { done: [0], active: [1] }), A('boundary', [20, 8], {})]);
  res.length = 0; res.push(20, 8);
  const leaves = t.bfs().filter(u => t.leaf(u)); const lv = t.pre().filter(u => t.leaf(u));
  lv.forEach(u => res.push(t.val(u)));
  r.step(ln(C_BT, 'leaves(root'), `All leaves left to right: ${vals(t, lv).join(', ')}.`, [t.snap('tree', { done: [0, 1], warn: lv }), A('boundary', res)]);
  r.step(ln(C_BT, 'root.right'), 'Right edge walked top-down (22, 25 is a leaf so skip): collect 22.', [t.snap('tree', { done: [0, 1], warn: lv, active: [2] }), A('boundary', res)]);
  r.step(ln(C_BT, 'Collections.reverse'), 'Reverse it so the outline goes back up. A single node reverses to itself.', [t.snap('tree', { done: [0, 1], warn: lv, active: [2] }), A('boundary', res)]);
  res.push(22); r.step(ln(C_BT, 'res.addAll'), `Boundary: <b>${res.join(' ')}</b>.`, [t.snap('tree', { done: [0, 1, 2], warn: lv }), A('boundary', res, { done: res.map((_, i) => i) })]);
  ANIM['Boundary Traversal of Binary Tree'] = W('Left edge, leaves, right edge', C_BT, r.steps);
}

const C_BRL = `
collect(root, new ArrayList<>(), paths);
int lo = 0, hi = paths.size() - 1;
while (lo < hi) {
    res.add(paths.get(lo++));
    List<Integer> back = new ArrayList<>(paths.get(hi--));
    Collections.reverse(back);
    res.add(back);
}
if (lo == hi) res.add(paths.get(lo));`;
{
  const t = make([1, 15, 13, 11, null, 7, 29, null, null, null, 2, 3]), r = recorder();
  const paths = [[1, 15, 11], [1, 13, 7, 2], [1, 13, 29, 3]];
  const leafIds = t.pre().filter(u => t.leaf(u));
  r.step(0, 'Step 1: list every root-to-leaf path from left to right.', [t.snap('tree', { warn: leafIds }), R('paths', paths)]);
  const res = [];
  res.push(paths[0]); r.step(ln(C_BRL, 'res.add(paths.get(lo++))'), 'lo = 0 prints the first path forward.', [t.snap('tree'), R('paths', paths, { active: [0] }), R('output', res)]);
  res.push([3, 29, 13, 1]); r.step(ln(C_BRL, 'Collections.reverse'), 'hi = 2 prints the last path <b>reversed</b>: leaf up to root.', [t.snap('tree'), R('paths', paths, { active: [2], done: [0] }), R('output', res)]);
  res.push(paths[1]); r.step(ln(C_BRL, 'if (lo == hi)'), 'lo == hi == 1: one path left, printed forward.', [t.snap('tree'), R('paths', paths, { done: [0, 2], active: [1] }), R('output', res, { done: [0, 1, 2] })]);
  ANIM['Boundary Root to Leaf Path Traversal'] = W('All paths, two pointers', C_BRL, r.steps);
}

const C_MO = `
while (cur != null) {
    if (cur.left == null) { res.add(cur.val); cur = cur.right; continue; }
    TreeNode pre = cur.left;
    while (pre.right != null && pre.right != cur) pre = pre.right;
    if (pre.right == null) { pre.right = cur; cur = cur.left; }
    else { pre.right = null; res.add(cur.val); cur = cur.right; }
}`;
{
  const t = make([4, 2, 6, 1, 3, 5, 7]), L = { ...t.L }, Rt = { ...t.R }, r = recorder(), res = [], thread = {};
  let cur = 0, guard = 0;
  const snap = (extra = {}) => t.snap('tree (badge T→x = thread to x)', { ...extra, badge: Object.fromEntries(Object.entries(thread).map(([p, c]) => [p, 'T→' + t.val(c)])) });
  r.step(0, 'Morris traversal needs no stack. It temporarily points the rightmost node of the left subtree back to the current node: a <b>thread</b>.', [snap()]);
  while (cur !== undefined && guard++ < 60) {
    if (L[cur] === undefined) { res.push(t.val(cur)); r.step(ln(C_MO, 'cur.left == null'), `${t.val(cur)} has no left child → visit it and move right.`, [snap({ active: [cur] }), A('inorder', res)]); const nx = Rt[cur]; cur = nx; continue; }
    let pre = L[cur]; while (Rt[pre] !== undefined && Rt[pre] !== cur) pre = Rt[pre];
    if (Rt[pre] === undefined) { Rt[pre] = cur; thread[pre] = cur; r.step(ln(C_MO, 'pre.right = cur'), `Predecessor of ${t.val(cur)} is ${t.val(pre)}. Thread ${t.val(pre)} → ${t.val(cur)}, then go left.`, [snap({ active: [cur], warn: [pre] }), A('inorder', res)]); cur = L[cur]; }
    else { Rt[pre] = undefined; delete thread[pre]; res.push(t.val(cur)); r.step(ln(C_MO, 'pre.right = null'), `Thread found: the left side is finished. Remove it, visit ${t.val(cur)}, go right.`, [snap({ active: [cur], warn: [pre] }), A('inorder', res)]); const nx = Rt[cur]; cur = nx; }
  }
  r.step(ln(C_MO, 'while (cur != null)'), `Done: inorder <b>${res.join(' ')}</b>, extra space O(1), and the tree is restored.`, [snap({ done: t.ids }), A('inorder', res, { done: res.map((_, i) => i) })]);
  ANIM['Morris Traversal'] = W('Inorder with threads', C_MO, r.steps);
}

const C_PBT = `
res.add(root.val);
q.add(root.left);
q.add(root.right);
while (!q.isEmpty()) {
    TreeNode l = q.poll(), r = q.poll();
    res.add(l.val);
    res.add(r.val);
    if (l.left != null) { q.add(l.left); q.add(r.right); q.add(l.right); q.add(r.left); }
}`;
{
  const t = make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]), r = recorder(), res = [1], q = [1, 2];
  r.step(ln(C_PBT, 'res.add(root.val)'), 'Print the root, then queue its children as a <b>mirror pair</b> (left, right).', [t.snap('tree', { done: [0] }), Q('queue', q.map(i => t.val(i))), A('output', res)]);
  while (q.length) {
    const l = q.shift(), rr = q.shift(); res.push(t.val(l), t.val(rr));
    if (t.L[l] !== undefined) q.push(t.L[l], t.R[rr], t.R[l], t.L[rr]);
    r.step(ln(C_PBT, 'res.add(l.val)'), `Poll the pair (${t.val(l)}, ${t.val(rr)}) and print both. Queue the next mirror pairs: (outer, outer) then (inner, inner).`, [t.snap('tree', { done: res.map(v => v - 1), active: [l, rr] }), Q('queue', q.map(i => t.val(i))), A('output', res)]);
  }
  ANIM['Perfect Binary Tree Specific Level Order Traversal'] = W('Queue of mirror pairs', C_PBT, r.steps);
}

const C_LRG = `
while (!q.isEmpty()) {
    int max = Integer.MIN_VALUE;
    for (int i = q.size(); i > 0; i--) {
        TreeNode cur = q.poll();
        max = Math.max(max, cur.val);
    }
    res.add(max);
}`;
{
  const t = make([1, 3, 2, 5, 3, null, 9]);
  ANIM['Find Largest Value in Each Tree Row'] = W('BFS, max per level', C_LRG, levelStory(t, {
    intro: 'Each level gets one running <code>max</code>.',
    step: (ids, d, st) => { st.res = st.res || []; const m = Math.max(...vals(t, ids)); st.res.push(m); const best = ids.find(u => t.val(u) === m);
      return { line: ln(C_LRG, 'res.add(max)'), say: `Level ${d}: [${vals(t, ids).join(', ')}] → max <b>${m}</b>.`, cls: { active: [best] }, lanes: [A('res', st.res)] }; },
    end: st => ({ line: ln(C_LRG, 'while'), say: `Answer [${st.res.join(', ')}].`, lanes: [A('res', st.res, { done: st.res.map((_, i) => i) })] })
  }));
}

const C_MLS = `
for (int level = 1; !q.isEmpty(); level++) {
    int sum = 0;
    for (int i = q.size(); i > 0; i--) { sum += q.poll().val; }
    if (sum > best) { best = sum; bestLevel = level; }
}`;
{
  const t = make([1, 7, 0, 7, -8, null, null]);
  ANIM['Maximum Level Sum of a Binary Tree'] = W('BFS, sum per level', C_MLS, levelStory(t, {
    intro: 'Sum every level; update the best only on a strictly larger sum so the <b>smallest</b> level wins ties.',
    lanes0: st => { st.best = -Infinity; st.lvl = 1; return [A('sums', [])]; },
    step: (ids, d, st) => { st.sums = st.sums || []; const s = vals(t, ids).reduce((a, b) => a + b, 0); st.sums.push(s); if (s > st.best) { st.best = s; st.lvl = d + 1; }
      return { line: ln(C_MLS, 'if (sum > best)'), say: `Level ${d + 1}: sum ${s}. Best so far: level <b>${st.lvl}</b> (${st.best}).`, vars: { best: st.best, bestLevel: st.lvl }, lanes: [A('level sums', st.sums, { done: [st.lvl - 1] })] }; },
    end: st => ({ line: ln(C_MLS, 'level++'), say: `Answer: level <b>${st.lvl}</b>.`, lanes: [A('level sums', st.sums, { done: [st.lvl - 1] })] })
  }));
}

const C_EO = `
for (int level = 0; !q.isEmpty(); level++) {
    int prev = level % 2 == 0 ? Integer.MIN_VALUE : Integer.MAX_VALUE;
    for (int i = q.size(); i > 0; i--) {
        TreeNode cur = q.poll();
        if (evenLevel && (cur.val % 2 == 0 || cur.val <= prev)) return false;
        if (!evenLevel && (cur.val % 2 == 1 || cur.val >= prev)) return false;
        prev = cur.val;
    }
}`;
{
  const t = make([1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2]);
  ANIM['Even Odd Tree'] = W('BFS with previous value', C_EO, levelStory(t, {
    intro: 'Even levels need <b>odd, strictly increasing</b>; odd levels need <b>even, strictly decreasing</b>.',
    step: (ids, d) => { const v = vals(t, ids), even = d % 2 === 0; const ok = v.every((x, i) => (x % 2 === (even ? 1 : 0)) && (i === 0 || (even ? x > v[i - 1] : x < v[i - 1])));
      return { line: ln(C_EO, 'prev = cur.val'), say: `Level ${d} (${even ? 'even' : 'odd'}): [${v.join(', ')}] — want ${even ? 'odd ↑' : 'even ↓'} → <b>${ok ? 'ok' : 'fail'}</b>.`, cls: ok ? {} : { bad: ids } }; },
    end: () => ({ line: ln(C_EO, 'for (int level'), say: 'Every level passes → <b>true</b>.', cls: { done: t.ids } })
  }));
}

const C_BL = `
q.add(root);
TreeNode cur = root;
while (!q.isEmpty()) {
    cur = q.poll();
    if (cur.right != null) q.add(cur.right);
    if (cur.left != null) q.add(cur.left);
}
return cur.val;`;
{
  const t = make([1, 2, 3, 4, null, 5, 6, null, null, 7]), order = [], q = [0];
  while (q.length) { const u = q.shift(); order.push(u); if (t.R[u] !== undefined) q.push(t.R[u]); if (t.L[u] !== undefined) q.push(t.L[u]); }
  ANIM['Find Bottom Left Tree Value'] = W('BFS right to left', C_BL, nodeStory(t, order, {
    intro: 'Queue the <b>right child first</b>. The very last node polled is on the last level and furthest left.',
    step: (u, k) => ({ line: ln(C_BL, 'cur = q.poll()'), say: `Poll ${t.val(u)}${k === order.length - 1 ? ' — the last one: <b>answer ' + t.val(u) + '</b>' : ''}.`, cls: { done: order.slice(0, k) }, lanes: [A('poll order', order.slice(0, k + 1).map(x => t.val(x)))] })
  }));
}

const C_W = `
while (!nodes.isEmpty()) {
    long first = idx.peek(), last = first;
    for (int i = nodes.size(); i > 0; i--) {
        TreeNode cur = nodes.poll();
        long id = idx.poll() - first;
        last = id;
        if (cur.left != null) { nodes.add(cur.left); idx.add(2 * id); }
        if (cur.right != null) { nodes.add(cur.right); idx.add(2 * id + 1); }
    }
    best = Math.max(best, last + 1);
}`;
{
  const t = make([1, 3, 2, 5, null, null, 9, 6, null, 7]), badge = {}, idxOf = { 0: 0 };
  ANIM['Maximum Width of Binary Tree'] = W('BFS with indexes', C_W, levelStory(t, {
    intro: 'Index nodes like a heap: children of <code>id</code> are <code>2·id</code> and <code>2·id+1</code>. Width = last − first + 1, counting the gaps.',
    lanes0: st => { st.best = 0; return []; },
    step: (ids, d, st) => { const first = idxOf[ids[0]]; ids.forEach(u => { badge[u] = idxOf[u] - first; if (t.L[u] !== undefined) idxOf[t.L[u]] = 2 * (idxOf[u] - first); if (t.R[u] !== undefined) idxOf[t.R[u]] = 2 * (idxOf[u] - first) + 1; });
      const w = badge[ids[ids.length - 1]] + 1; st.best = Math.max(st.best, w);
      return { line: ln(C_W, 'best = Math.max'), say: `Level ${d}: indexes ${ids.map(u => badge[u]).join(', ')} → width ${w}. Best = <b>${st.best}</b>.`, badge: { ...badge }, vars: { best: st.best } }; },
    end: st => ({ line: ln(C_W, 'while'), say: `Answer: <b>${st.best}</b>. Level 3 spans index 0..3 even though only 2 nodes exist.`, badge })
  }));
}

const C_CC = `
Queue<TreeNode> q = new LinkedList<>();
q.add(root);
boolean seenNull = false;
while (!q.isEmpty()) {
    TreeNode cur = q.poll();
    if (cur == null) { seenNull = true; continue; }
    if (seenNull) return false;
    q.add(cur.left);
    q.add(cur.right);
}
return true;`;
{
  const t = make([1, 2, 3, 4, 5, null, 7]), r = recorder();
  const q = [0]; let seenNull = false; const shown = [];
  r.step(0, 'BFS that also queues <b>nulls</b>. After the first null, any real node means a gap.', [t.snap('tree'), Q('queue', ['1'])]);
  let guard = 0;
  while (q.length && guard++ < 40) {
    const u = q.shift(), lbl = x => (x === null ? 'null' : t.val(x));
    if (u === null) { seenNull = true; r.step(ln(C_CC, 'seenNull = true'), 'Polled a null → from now on no real node may appear.', [t.snap('tree'), Q('queue', q.map(lbl)), A('seenNull', [true])]); continue; }
    if (seenNull) { r.step(ln(C_CC, 'if (seenNull) return false'), `Real node ${t.val(u)} after a null → <b>false</b> (not complete).`, [t.snap('tree', { bad: [u] }), Q('queue', q.map(lbl)), A('seenNull', [true])]); break; }
    q.push(t.L[u] === undefined ? null : t.L[u]); q.push(t.R[u] === undefined ? null : t.R[u]);
    r.step(ln(C_CC, 'q.add(cur.left)'), `Poll ${t.val(u)}; queue both children (null if missing).`, [t.snap('tree', { active: [u] }), Q('queue', q.map(lbl)), A('seenNull', [seenNull])]);
  }
  ANIM['Check Completeness of a Binary Tree'] = W('BFS with nulls', C_CC, r.steps);
}

const C_CNT = `
int l = 0, r = 0;
for (TreeNode n = root; n != null; n = n.left) l++;
for (TreeNode n = root; n != null; n = n.right) r++;
if (l == r) return (1 << l) - 1;
return 1 + countNodes(root.left) + countNodes(root.right);`;
{
  const t = make([1, 2, 3, 4, 5, 6]), r = recorder();
  r.step(0, 'In a complete tree one of the two subtrees is always perfect. A perfect subtree of height h has <code>2^h − 1</code> nodes, no counting needed.', [t.snap('tree')]);
  const hl = u => { let h = 0; for (let x = u; x !== undefined; x = t.L[x]) h++; return h; }, hr = u => { let h = 0; for (let x = u; x !== undefined; x = t.R[x]) h++; return h; };
  const done = []; let total = 0;
  const rec = u => { if (u === undefined) return 0; const l = hl(u), rr = hr(u);
    if (l === rr) { const all = []; const g = x => { if (x === undefined) return; all.push(x); g(t.L[x]); g(t.R[x]); }; g(u); done.push(...all); total += all.length;
      r.step(ln(C_CNT, 'if (l == r)'), `Node ${t.val(u)}: left edge ${l}, right edge ${rr} → perfect, 2^${l} − 1 = <b>${(1 << l) - 1}</b>.`, [t.snap('tree', { done: [...done], active: [u] }), A('counted', [total])]); return (1 << l) - 1; }
    r.step(ln(C_CNT, 'return 1 + countNodes'), `Node ${t.val(u)}: left edge ${l}, right edge ${rr} → not equal, count 1 + both children.`, [t.snap('tree', { done: [...done], warn: [u] }), A('counted', [total])]);
    total += 1; done.push(u); return 1 + rec(t.L[u]) + rec(t.R[u]); };
  const n = rec(0);
  r.step(ln(C_CNT, 'return 1 + countNodes'), `Total = <b>${n}</b>.`, [t.snap('tree', { done: t.ids }), A('count', [n])]);
  ANIM['Count Complete Tree Nodes'] = W('Equal edge heights', C_CNT, r.steps);
}

const C_PN1 = `
for (Node leftmost = root; leftmost != null && leftmost.left != null; leftmost = leftmost.left) {
    for (Node cur = leftmost; cur != null; cur = cur.next) {
        cur.left.next = cur.right;
        if (cur.next != null) cur.right.next = cur.next.left;
    }
}`;
{
  const t = make([1, 2, 3, 4, 5, 6, 7]), r = recorder(), nxt = {};
  const chain = () => lane('next chains', t.levels().map(ids => ids.map(u => (nxt[u] !== undefined ? `${t.val(u)}→` : `${t.val(u)}→∅`)).join(' ')));
  r.step(0, 'Row by row, use the already wired row above to wire the row below.', [t.snap('tree'), chain()]);
  [[0]].concat([[1, 2]]).forEach((row, k) => row.forEach(u => {
    nxt[t.L[u]] = t.R[u]; let say = `Node ${t.val(u)}: left.next = right (${t.val(t.L[u])} → ${t.val(t.R[u])}).`;
    const nu = nxt[u]; if (nu !== undefined) { nxt[t.R[u]] = t.L[nu]; say += ` Node has next ${t.val(nu)}, so right.next = next.left (${t.val(t.R[u])} → ${t.val(t.L[nu])}).`; }
    r.step(ln(C_PN1, 'cur.left.next'), say, [t.snap('tree', { active: [u], warn: [t.L[u], t.R[u]] }), chain()]);
  }));
  r.step(ln(C_PN1, 'leftmost.left'), 'Every level is wired using O(1) extra space.', [t.snap('tree', { done: t.ids }), chain()]);
  ANIM['Populating Next Right Pointers in Each Node'] = W('Level-by-level wiring', C_PN1, r.steps);
}

const C_PN2 = `
Node head = root;
while (head != null) {
    Node dummy = new Node(0), tail = dummy;
    for (Node cur = head; cur != null; cur = cur.next) {
        if (cur.left != null) { tail.next = cur.left; tail = tail.next; }
        if (cur.right != null) { tail.next = cur.right; tail = tail.next; }
    }
    head = dummy.next;
}`;
{
  const t = make([1, 2, 3, 4, 5, null, 7]), r = recorder();
  r.step(0, 'Missing children make "left.next = right" unsafe. Build each next row behind a <b>dummy head</b> instead.', [t.snap('tree')]);
  const lv = t.levels(); let wired = [];
  for (let d = 0; d + 1 < lv.length; d++) {
    const chain = []; lv[d].forEach(u => { [t.L[u], t.R[u]].forEach(c => { if (c !== undefined) { chain.push(c); r.step(ln(C_PN2, 'tail.next = cur.left'), `Walking level ${d}: from ${t.val(u)}, append child ${t.val(c)} behind the tail.`, [t.snap('tree', { active: [u], warn: chain }), R('level ' + (d + 1) + ' chain', chain.map(x => t.val(x)))]); } }); });
    wired.push(...chain);
    r.step(ln(C_PN2, 'head = dummy.next'), `Level ${d + 1} is linked: ${vals(t, chain).join(' → ')} → ∅. Its first node becomes the new head.`, [t.snap('tree', { done: wired }), R('level ' + (d + 1) + ' chain', chain.map(x => t.val(x)), { done: chain.map((_, i) => i) })]);
  }
  ANIM['Populating Next Right Pointers in Each Node II'] = W('Dummy head per level', C_PN2, r.steps);
}

const C_RO = `
private void dfs(TreeNode a, TreeNode b, int level) {
    if (a == null) return;
    if (level % 2 == 1) { int t = a.val; a.val = b.val; b.val = t; }
    dfs(a.left, b.right, level + 1);
    dfs(a.right, b.left, level + 1);
}`;
{
  const arr = [2, 3, 5, 8, 13, 21, 34], t = make(arr), r = recorder(), cur = [...arr];
  const snap = (extra = {}) => { const tt = make(cur); return tt.snap('tree', extra); };
  r.step(0, 'On odd levels the values must be mirrored. Walk two mirror nodes down together: <code>a.left</code> with <code>b.right</code>.', [snap()]);
  r.step(ln(C_RO, 'level % 2 == 1'), 'Level 1: a = 3, b = 5 are mirrors → swap values.', [snap({ active: [1, 2] })]);
  [cur[1], cur[2]] = [cur[2], cur[1]];
  r.step(ln(C_RO, 'dfs(a.left'), 'Swapped: 5, 3. Recurse into mirror pairs (8,21) and (13,34)… level 2 is even, so nothing changes.', [snap({ done: [1, 2] })]);
  r.step(ln(C_RO, 'dfs(a.right'), 'Even levels are left alone; the walk goes one deeper only when the tree has more levels.', [snap({ done: [1, 2] }), A('result', cur, { done: [1, 2] })]);
  ANIM['Reverse Odd Levels of Binary Tree'] = W('Mirror DFS', C_RO, r.steps);
}

const C_CII = `
root.val = 0;
for (int level = 1; !q.isEmpty(); level++) {
    for (int i = q.size(); i > 0; i--) {
        TreeNode cur = q.poll();
        int sibling = (cur.left == null ? 0 : cur.left.val) + (cur.right == null ? 0 : cur.right.val);
        if (cur.left != null) { cur.left.val = sums.get(level) - sibling; q.add(cur.left); }
        if (cur.right != null) { cur.right.val = sums.get(level) - sibling; q.add(cur.right); }
    }
}`;
{
  const arr = [5, 4, 9, 1, 10, null, 7], t = make(arr), r = recorder(), cur = [...arr];
  const sums = t.levels().map(ids => ids.reduce((a, u) => a + arr[u], 0));
  const snap = (extra = {}) => make(cur).snap('tree', extra);
  r.step(0, `Level sums first: [${sums.join(', ')}]. A node's cousins = level sum − (itself + its sibling).`, [snap(), A('level sums', sums)]);
  cur[0] = 0; r.step(ln(C_CII, 'root.val = 0'), 'The root has no cousins → 0.', [snap({ done: [0] })]);
  [[0, 1], [1, 3], [2, 3]].forEach(([u, lvl]) => {
    const kids = [t.L[u], t.R[u]].filter(x => x !== undefined); if (!kids.length) return; const sib = kids.reduce((a, c) => a + arr[c], 0);
    r.step(ln(C_CII, 'int sibling'), `Parent ${arr[u]}: children ${kids.map(c => arr[c]).join(' + ')} = ${sib}. New value for each child = ${sums[lvl]} − ${sib} = <b>${sums[lvl] - sib}</b>.`, [snap({ active: [u], warn: kids }), A('level sums', sums)]);
    kids.forEach(c => { cur[c] = sums[lvl] - sib; });
    r.step(ln(C_CII, 'cur.left.val ='), `Children of ${arr[u]} become ${sums[lvl] - sib}.`, [snap({ done: kids }), A('level sums', sums)]);
  });
  ANIM['Cousins in Binary Tree II'] = W('Level sums minus family', C_CII, r.steps);
}

const C_MOP = `
public int minimumOperations(TreeNode root) {
    int ops = 0;
    for (List<Integer> level : TreeNode.levels(root)) ops += minSwaps(toArray(level));
    return ops;
}
static int minSwaps(int[] a) {
    order = indexes sorted by value
    for (int i = 0; i < n; i++) {
        if (seen[i] || order[i] == i) continue;
        for (int j = i; !seen[j]; j = order[j]) { seen[j] = true; len++; }
        swaps += len - 1;
    }
}`;
{
  const t = make([1, 4, 3, 7, 6, 8, 5, null, null, null, null, 9, null, 10]);
  ANIM['Minimum Number of Operations to Sort a Binary Tree by Level'] = W('Cycles per level', C_MOP, levelStory(t, {
    intro: 'Levels are independent. For each level count the swaps needed to sort it: <b>cycle length − 1</b> per cycle.',
    lanes0: st => { st.total = 0; return []; },
    step: (ids, d, st) => { const v = vals(t, ids), sorted = [...v].sort((a, b) => a - b), pos = v.map(x => sorted.indexOf(x)); const seen = Array(v.length).fill(false); let sw = 0; const cyc = [];
      for (let i = 0; i < v.length; i++) { if (seen[i] || pos[i] === i) continue; let len = 0; for (let j = i; !seen[j]; j = pos[j]) { seen[j] = true; len++; } sw += len - 1; cyc.push(len); }
      st.total += sw; return { line: ln(C_MOP, 'swaps += len - 1'), say: `Level ${d}: [${v.join(', ')}] → sorted [${sorted.join(', ')}]. Cycles ${cyc.length ? '[' + cyc.join(', ') + ']' : 'none'} → ${sw} swap(s). Total ${st.total}.`, vars: { total: st.total }, lanes: [A('level', v), A('sorted', sorted)] }; },
    end: st => ({ line: ln(C_MOP, 'return ops'), say: `Answer: <b>${st.total}</b>.`, cls: { done: t.ids } })
  }));
}

const C_AR = `
private void dfs(TreeNode n, int val, int depth, int cur) {
    if (n == null) return;
    if (cur == depth - 1) {
        n.left = new TreeNode(val, n.left, null);
        n.right = new TreeNode(val, null, n.right);
        return;
    }
    dfs(n.left, val, depth, cur + 1);
    dfs(n.right, val, depth, cur + 1);
}`;
{
  const before = make([4, 2, 6, 3, 1, 5]), after = make([4, 1, 1, 2, null, null, 6, 3, 1, 5]), r = recorder();
  r.step(0, 'Insert a row of 1s at depth 2 (val = 1). Stop at depth − 1 = 1, the root level.', [before.snap('before')]);
  r.step(ln(C_AR, 'cur == depth - 1'), 'At node 4 (depth 1): give it a new left child that adopts the old left subtree, and a new right child that adopts the old right subtree.', [before.snap('before', { active: [0] })]);
  r.step(ln(C_AR, 'n.left = new TreeNode'), 'The old children 2 and 6 now hang one level lower, under the new 1s.', [after.snap('after', { warn: [1, 2], done: [0] })]);
  ANIM['Add One Row to Tree'] = W('Splice at depth − 1', C_AR, r.steps);
}

const C_OE = `
private void dfs(TreeNode n, int level, int[] sum) {
    if (n == null) return;
    sum[level % 2] += n.val;
    dfs(n.left, level + 1, sum);
    dfs(n.right, level + 1, sum);
}
return sum[1] - sum[0];`;
{
  const t = make([10, 20, 30, 40, 60]);
  ANIM['Odd Even Level Difference'] = W('Two buckets', C_OE, levelStory(t, {
    intro: 'Level 1 (root) is <b>odd</b>. Odd levels add to bucket 1, even levels to bucket 0. Answer = bucket1 − bucket0.',
    lanes0: st => { st.s = [0, 0]; return [A('sum[0] even, sum[1] odd', [0, 0])]; },
    step: (ids, d, st) => { const sm = vals(t, ids).reduce((a, b) => a + b, 0); st.s[(d + 1) % 2] += sm;
      return { line: ln(C_OE, 'sum[level % 2]'), say: `Level ${d + 1} (${(d + 1) % 2 ? 'odd' : 'even'}): +${sm} to bucket ${(d + 1) % 2}.`, lanes: [A('sum[0] even, sum[1] odd', [...st.s])] }; },
    end: st => ({ line: ln(C_OE, 'return sum[1]'), say: `${st.s[1]} − ${st.s[0]} = <b>${st.s[1] - st.s[0]}</b>.`, lanes: [A('sum[0] even, sum[1] odd', [...st.s])] })
  }));
}

const C_MD = `
for (int depth = 1; ; depth++) {
    for (int i = q.size(); i > 0; i--) {
        TreeNode cur = q.poll();
        if (cur.left == null && cur.right == null) return depth;
        if (cur.left != null) q.add(cur.left);
        if (cur.right != null) q.add(cur.right);
    }
}`;
{
  const t = make([3, 9, 20, null, null, 15, 7]), r = recorder(), q = [0];
  r.step(0, 'BFS stops at the <b>first leaf</b>, which is the shallowest.', [t.snap('tree'), Q('queue', ['3'])]);
  r.step(ln(C_MD, 'cur.left == null && cur.right == null'), 'Level 1: node 3 has children, so it is not a leaf. Queue 9 and 20.', [t.snap('tree', { active: [0] }), Q('queue', ['9', '20'])]);
  r.step(ln(C_MD, 'return depth'), 'Level 2: node 9 has no children → leaf found at depth <b>2</b>. Return immediately.', [t.snap('tree', { active: [1], done: [0] }), Q('queue', ['9', '20'])]);
  const sk = make([2, null, 3, null, 4, null, 5]);
  r.step(0, 'Warning case: for the skewed chain 2→3→4→5, node 2 has a null left child but is <b>not</b> a leaf. The answer is 4, not 1.', [sk.snap('skewed tree', { warn: [0] })]);
  ANIM['Minimum Depth of Binary Tree'] = W('BFS to the first leaf', C_MD, r.steps);
}
