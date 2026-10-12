const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const plane = (pts, w, h, mark = {}) => { const m = range(0, h - 1).map(() => Array(w).fill('')); pts.forEach((p, i) => { m[h - 1 - p[1]][p[0]] = mark[i] ?? '●'; }); return m; };
const cellsOf = (pts, h, idx, cls) => idx.map(i => [h - 1 - pts[i][1], pts[i][0], cls]);
const yl = h => range(0, h - 1).reverse();
const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

const C_MP = `
int dx = points[j][0] - points[i][0], dy = points[j][1] - points[i][1];
int g = gcd(Math.abs(dx), Math.abs(dy));
dx /= g;
dy /= g;
int c = slopes.merge(dx + "/" + dy, 1, Integer::sum);
best = Math.max(best, c + 1);`;
{
  const pts = [[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]], r = recorder(), H = 5, Wd = 6, i = 0; const map = {}; let best = 1;
  r.step(0, 'Anchor (1,1). Group the other points by the reduced direction from it.', [G('points', plane(pts, Wd, H), cellsOf(pts, H, [0], 'active'), { rowLabels: yl(H) })]);
  for (let j = 1; j < pts.length; j++) { let dx = pts[j][0] - pts[i][0], dy = pts[j][1] - pts[i][1]; const g = gcd(Math.abs(dx), Math.abs(dy)); dx /= g; dy /= g; if (dx < 0 || (dx === 0 && dy < 0)) { dx = -dx; dy = -dy; } const k = `${dx}/${dy}`; map[k] = (map[k] || 0) + 1; best = Math.max(best, map[k] + 1); r.step(ln(C_MP, 'slopes.merge'), `(${pts[j]}) → direction ${k}, count ${map[k]}.`, [G('points', plane(pts, Wd, H), [...cellsOf(pts, H, [0], 'active'), ...cellsOf(pts, H, [j], 'warn')], { rowLabels: yl(H) }), R('slope map', Object.entries(map).map(([a, b]) => `${a}:${b}`))], { best }); }
  r.step(0, `Direction 2/1 holds (3,2) and (5,3), plus the anchor → <b>${best}</b> points on one line.`, [G('points', plane(pts, Wd, H), cellsOf(pts, H, [0, 1, 2], 'done'), { rowLabels: yl(H) })]);
  ANIM['Max Points on a Line'] = W('Anchor + slope map', C_MP, r.steps);
}

const C_EF = `
for (int i = 0; i < n; i++) {
    while (k >= 2 && cross(hull[k - 2], hull[k - 1], trees[i]) < 0) k--;
    hull[k++] = trees[i];
}`;
{
  const pts = [[0, 0], [1, 1], [2, 0], [2, 2], [3, 1], [4, 0], [2, 4], [4, 2]].sort((a, b) => a[0] - b[0] || a[1] - b[1]), r = recorder(), H = 5, Wd = 5, at = p => pts.findIndex(q => q[0] === p[0] && q[1] === p[1]);
  const hull = [];
  r.step(0, 'Trees sorted by x, then y. Build the lower chain left to right.', [G('trees', plane(pts, Wd, H), [], { rowLabels: yl(H) })]);
  for (const p of pts) { while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], p) < 0) { const out = hull.pop(); r.step(ln(C_EF, 'k--'), `(${p}) makes a right turn after (${out}) → pop (${out}).`, [G('trees', plane(pts, Wd, H), [...cellsOf(pts, H, hull.map(at), 'done'), ...cellsOf(pts, H, [at(out)], 'bad'), ...cellsOf(pts, H, [at(p)], 'active')], { rowLabels: yl(H) })]); } hull.push(p); r.step(ln(C_EF, 'hull[k++]'), `Push (${p}). Lower chain: ${hull.map(q => `(${q})`).join(' ')}.`, [G('trees', plane(pts, Wd, H), [...cellsOf(pts, H, hull.map(at), 'done'), ...cellsOf(pts, H, [at(p)], 'active')], { rowLabels: yl(H) })]); }
  const all = new Set(hull.map(String)); const up = []; for (const p of [...pts].reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) < 0) up.pop(); up.push(p); } up.forEach(p => all.add(String(p)));
  const fence = pts.map((p, i) => all.has(String(p)) ? i : -1).filter(i => i >= 0);
  r.step(0, `The upper chain (same rule, right to left) adds the top. Fence: ${fence.map(i => `(${pts[i]})`).join(' ')}. (2,0) lies on the bottom edge and stays because only right turns pop.`, [G('trees', plane(pts, Wd, H), [...cellsOf(pts, H, fence, 'done'), ...cellsOf(pts, H, pts.map((_, i) => i).filter(i => !fence.includes(i)), 'ghost')], { rowLabels: yl(H) })]);
  ANIM['Erect the Fence'] = W('Monotone chain', C_EF, r.steps);
}

const C_T1 = `
for (long c : rows.values()) {
    long segs = c * (c - 1) / 2 % MOD;
    result = (result + segs * before) % MOD;
    before = (before + segs) % MOD;
}`;
{
  const pts = [[1, 0], [2, 0], [3, 0], [2, 2], [3, 2]], r = recorder(), H = 3, Wd = 4; let before = 0, res = 0;
  r.step(0, 'Row y = 0 has 3 points, row y = 2 has 2.', [G('points', plane(pts, Wd, H), [], { rowLabels: yl(H) })]);
  for (const [y, c] of [[0, 3], [2, 2]]) { const segs = c * (c - 1) / 2; res += segs * before; before += segs; r.step(ln(C_T1, 'result = (result'), `Row y = ${y}: C(${c},2) = ${segs} horizontal segments; pairs with earlier rows → result ${res}.`, [G('points', plane(pts, Wd, H), cellsOf(pts, H, pts.map((p, i) => p[1] === y ? i : -1).filter(i => i >= 0), 'active'), { rowLabels: yl(H) })], { segs, before, result: res }); }
  r.step(0, `Answer <b>${res}</b>.`, [R('answer', [res], { done: [0] })]);
  ANIM['Count Number of Trapezoids I'] = W('Rows + running sum', C_T1, r.steps);
}

const C_T2 = `
parallel += bySlope.merge(slope, 1, Integer::sum) - 1;
sameLine += byLine.merge(line, 1, Integer::sum) - 1;
sharedMid += byMid.merge(mid, 1, Integer::sum) - 1;
sharedMidLine += byMidSlope.merge(midSlope, 1, Integer::sum) - 1;
return (int) ((parallel - sameLine) - (sharedMid - sharedMidLine));`;
{
  const pts = [[0, 0], [2, 0], [1, 2], [3, 2]], r = recorder(), H = 3, Wd = 4;
  r.step(0, 'Four points forming a parallelogram: (0,0),(2,0),(1,2),(3,2).', [G('points', plane(pts, Wd, H), [], { rowLabels: yl(H) })]);
  r.step(ln(C_T2, 'parallel +='), 'Parallel pairs on different lines: bottom ∥ top, and left ∥ right → parallel − sameLine = 2.', [G('points', plane(pts, Wd, H), cellsOf(pts, H, [0, 1, 2, 3], 'warn'), { rowLabels: yl(H) })], { parallel: 2, sameLine: 0 });
  r.step(ln(C_T2, 'sharedMid +='), 'Diagonals (0,0)–(3,2) and (2,0)–(1,2) share midpoint (1.5, 1) and are not collinear → one parallelogram.', [G('points', plane(pts, Wd, H), cellsOf(pts, H, [0, 3], 'active').concat(cellsOf(pts, H, [1, 2], 'done')), { rowLabels: yl(H) })], { sharedMid: 1, sharedMidLine: 0 });
  r.step(ln(C_T2, 'return'), '2 − 1 = <b>1</b> quadrilateral, counted once.', [R('answer', [1], { done: [0] })]);
  ANIM['Count Number of Trapezoids II'] = W('Four hash maps', C_T2, r.steps);
}

const C_CO = `
int cx = Math.max(x1, Math.min(xCenter, x2));
int cy = Math.max(y1, Math.min(yCenter, y2));
int dx = cx - xCenter, dy = cy - yCenter;
return dx * dx + dy * dy <= radius * radius;`;
{
  const r = recorder(), H = 6, Wd = 7, m = range(0, H - 1).map(() => Array(Wd).fill(''));
  for (let x = 1; x <= 3; x++) for (let y = 1; y <= 3; y++) m[H - 1 - y][x] = '▢';
  m[H - 1 - 5][5] = 'C';
  r.step(0, 'Rectangle (1,1)–(3,3), circle centre (5,5) with radius 3.', [G('plane', m, [[0, 5, 'active']], { rowLabels: yl(H) })]);
  m[H - 1 - 3][3] = '★';
  r.step(ln(C_CO, 'int cy'), 'Clamp the centre into the box: x 5 → 3, y 5 → 3. Closest point (3,3).', [G('plane', m, [[0, 5, 'active'], [2, 3, 'warn']], { rowLabels: yl(H) })], { cx: 3, cy: 3 });
  r.step(ln(C_CO, 'return'), '2² + 2² = 8 ≤ 9 → <b>overlap</b>.', [G('plane', m, [[2, 3, 'done']], { rowLabels: yl(H) })], { dist2: 8, r2: 9 });
  ANIM['Circle and Rectangle Overlapping'] = W('Clamp', C_CO, r.steps);
}

const C_SQ = `
int w = Math.min(topRight[i][0], topRight[j][0]) - Math.max(bottomLeft[i][0], bottomLeft[j][0]);
int h = Math.min(topRight[i][1], topRight[j][1]) - Math.max(bottomLeft[i][1], bottomLeft[j][1]);
side = Math.max(side, Math.min(w, h));`;
{
  const bl = [[1, 1], [2, 2], [3, 1]], tr = [[3, 3], [4, 4], [6, 6]], r = recorder(); let side = 0;
  r.step(0, 'Rectangles A (1,1)–(3,3), B (2,2)–(4,4), C (3,1)–(6,6).', [R('rects', ['A', 'B', 'C'])]);
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) { const w = Math.min(tr[i][0], tr[j][0]) - Math.max(bl[i][0], bl[j][0]), h = Math.min(tr[i][1], tr[j][1]) - Math.max(bl[i][1], bl[j][1]); side = Math.max(side, Math.min(w, h)); r.step(ln(C_SQ, 'side = Math.max'), `${'ABC'[i]} ∩ ${'ABC'[j]}: width ${w}, height ${h} → square side ${Math.max(0, Math.min(w, h))}.`, [R('w, h', [w, h], Math.min(w, h) > 0 ? { active: [0, 1] } : { bad: [0, 1] })], { side }); }
  r.step(0, `Largest side ${side} → area <b>${side * side}</b>.`, [R('area', [side * side], { done: [0] })]);
  ANIM['Find the Largest Area of Square Inside Two Rectangles'] = W('All pairs', C_SQ, r.steps);
}

const C_LT = `
double area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2.0;
best = Math.max(best, area);`;
{
  const pts = [[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]], r = recorder(), H = 3, Wd = 3; let best = 0;
  for (const [i, j, k] of [[0, 1, 2], [0, 3, 4], [1, 2, 3], [2, 3, 4]]) { const a = pts[i], b = pts[j], c = pts[k], area = Math.abs(cross(a, b, c)) / 2; best = Math.max(best, area); r.step(ln(C_LT, 'double area'), `(${a}), (${b}), (${c}): area ${area}.`, [G('points', plane(pts, Wd, H), cellsOf(pts, H, [i, j, k], area === best ? 'done' : 'active'), { rowLabels: yl(H) })], { best }); }
  r.step(0, `Largest: <b>${best}</b> from (0,0), (0,2), (2,0).`, [R('answer', [best], { done: [0] })]);
  ANIM['Largest Triangle Area'] = W('All triples', C_LT, r.steps);
}

const C_MD = `
int diag = d[0] * d[0] + d[1] * d[1], area = d[0] * d[1];
if (diag > bestDiag || (diag == bestDiag && area > bestArea)) {
    bestDiag = diag;
    bestArea = area;
}`;
{
  const dims = [[9, 3], [8, 6], [10, 0], [6, 8]], r = recorder(); let bd = 0, ba = 0;
  dims.forEach((d, i) => { const dg = d[0] ** 2 + d[1] ** 2, ar = d[0] * d[1], take = dg > bd || (dg === bd && ar > ba); if (take) { bd = dg; ba = ar; } r.step(ln(C_MD, take ? 'bestDiag = diag' : 'if (diag'), `[${d}]: diagonal² ${dg}, area ${ar}${take ? ' → best' : dg === bd ? ' → tie, area not larger' : ''}.`, [R('dims', dims.map(x => `${x[0]}×${x[1]}`), take ? { done: [i] } : { active: [i] })], { bestDiag: bd, bestArea: ba }); });
  ANIM['Maximum Area of Longest Diagonal Rectangle'] = W('One pass', C_MD, r.steps);
}

const C_RC = `
double len = Math.sqrt(rng.nextDouble()) * r, angle = rng.nextDouble() * 2 * Math.PI;
return new double[]{x + len * Math.cos(angle), y + len * Math.sin(angle)};`;
{
  const r = recorder();
  r.step(0, 'Split the unit disc into rings 0–0.5 and 0.5–1. Areas: 25% and 75%.', [R('area share', ['inner 25%', 'outer 75%'])]);
  r.step(ln(C_RC, 'double len'), 'With len = u (no sqrt), half the points land in the inner ring: too crowded at the centre.', [R('u', ['inner 50%', 'outer 50%'], { bad: [0, 1] })]);
  r.step(ln(C_RC, 'double len'), 'With len = √u: P(len ≤ 0.5) = P(u ≤ 0.25) = 25%. Matches the area.', [R('√u', ['inner 25%', 'outer 75%'], { done: [0, 1] })]);
  r.step(ln(C_RC, 'return'), 'Angle uniform in [0, 2π), convert from polar to x, y around the centre.', [R('point', ['x + len·cos θ', 'y + len·sin θ'])]);
  ANIM['Generate Random Point in a Circle'] = W('Polar with √u', C_RC, r.steps);
}

const C_RR = `
int target = rng.nextInt(prefix[prefix.length - 1]);
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (prefix[mid] > target) hi = mid;
    else lo = mid + 1;
}
return new int[]{r[0] + rng.nextInt(r[2] - r[0] + 1), r[1] + rng.nextInt(r[3] - r[1] + 1)};`;
{
  const r = recorder(), counts = [16, 15], prefix = [16, 31];
  r.step(0, 'Rects (−2,−2,1,1) has 4×4 = 16 points, (2,2,4,6) has 3×5 = 15.', [A('points', counts), A('prefix', prefix)]);
  const target = 20; let lo = 0, hi = 1; while (lo < hi) { const mid = (lo + hi) >> 1; if (prefix[mid] > target) hi = mid; else lo = mid + 1; }
  r.step(ln(C_RR, 'int target'), 'target = 20 out of [0, 31).', [A('prefix', prefix, { ptr: { 0: '16', 1: '31' } })], { target });
  r.step(ln(C_RR, 'prefix[mid] > target'), `First prefix > 20 is index ${lo} → second rectangle.`, [A('prefix', prefix, { done: [lo] })], { lo });
  r.step(ln(C_RR, 'return new int'), 'Uniform x in 2..4 and y in 2..6. Every one of the 31 points has chance 1/31.', [R('point', ['x ∈ [2,4]', 'y ∈ [2,6]'], { done: [0, 1] })]);
  ANIM['Random Point in Non-overlapping Rectangles'] = W('Prefix + binary search', C_RR, r.steps);
}

const C_R10 = `
int idx = (rand7() - 1) * 7 + rand7();
if (idx <= 40) return 1 + (idx - 1) % 10;`;
{
  const r = recorder(), m = range(0, 6).map(a => range(0, 6).map(b => { const idx = a * 7 + b + 1; return idx <= 40 ? 1 + (idx - 1) % 10 : '✕'; }));
  r.step(0, 'Row = first rand7, column = second rand7: 49 equally likely cells.', [G('idx → value', m, [], { rowLabels: range(1, 7), colLabels: range(1, 7) })]);
  r.step(ln(C_R10, 'if (idx <= 40)'), 'Cells 1..40 map to 1..10 four times each. Cells 41..49 are rejected and we retry.', [G('idx → value', m, range(0, 6).flatMap(a => range(0, 6).map(b => [a, b, a * 7 + b + 1 <= 40 ? 'done' : 'bad'])), { rowLabels: range(1, 7), colLabels: range(1, 7) })]);
  r.step(0, 'Example: rolls 3 and 5 → idx 19 → 1 + 18 % 10 = <b>9</b>.', [G('idx → value', m, [[2, 4, 'active']], { rowLabels: range(1, 7), colLabels: range(1, 7) })], { idx: 19 });
  ANIM['Implement Rand10() Using Rand7()'] = W('Rejection', C_R10, r.steps);
}

const C_SH = `
for (int i = a.length - 1; i > 0; i--) {
    int j = rng.nextInt(i + 1);
    int t = a[i];
    a[i] = a[j];
    a[j] = t;
}`;
{
  const r = recorder(), a = [1, 2, 3, 4, 5], js = [1, 3, 0, 1];
  r.step(0, 'a = [1,2,3,4,5]. From the back, each position takes a random element from the unfixed part.', [A('a', a)]);
  for (let i = a.length - 1, s = 0; i > 0; i--, s++) { const j = js[s]; [a[i], a[j]] = [a[j], a[i]]; r.step(ln(C_SH, 'a[j] = t'), `i = ${i}: j = ${j} from [0, ${i}] → swap.`, [A('a', a.slice(), { active: [j], done: range(i, a.length - 1) })], { i, j }); }
  r.step(0, `Result [${a}]. Choices 5·4·3·2 = 120 = 5!, one per permutation.`, [A('a', a, { done: range(0, 4) })]);
  ANIM['Shuffle an Array'] = W('Fisher-Yates', C_SH, r.steps);
}

const C_NG = `
for (int i = 1; i <= n; i++) {
    dp[i] = window / maxPts;
    if (i < k) window += dp[i];
    else result += dp[i];
    if (i - maxPts >= 0 && i - maxPts < k) window -= dp[i - maxPts];
}`;
{
  const n = 6, k = 4, mp = 3, r = recorder(), dp = Array(n + 1).fill(0); dp[0] = 1; let win = 1, res = 0;
  r.step(0, 'n = 6, k = 4, maxPts = 3. Draw while total < 4; want final total ≤ 6.', [A('dp', dp.map(v => +v.toFixed(3)))], { window: 1 });
  for (let i = 1; i <= n; i++) { dp[i] = win / mp; if (i < k) win += dp[i]; else res += dp[i]; if (i - mp >= 0 && i - mp < k) win -= dp[i - mp]; r.step(ln(C_NG, i < k ? 'window += dp[i]' : 'result += dp[i]'), `dp[${i}] = ${+dp[i].toFixed(3)} ${i < k ? '(still drawing, joins the window)' : '(final, add to answer)'}.`, [A('dp', dp.map(v => +v.toFixed(3)), { active: [i], warn: range(Math.max(0, i - mp + 1), Math.min(i, k - 1)) })], { window: +win.toFixed(3), result: +res.toFixed(3) }); }
  r.step(0, `Answer <b>${res.toFixed(5)}</b>.`, [R('answer', [res.toFixed(5)], { done: [0] })]);
  ANIM['New 21 Game'] = W('Window DP', C_NG, r.steps);
}
