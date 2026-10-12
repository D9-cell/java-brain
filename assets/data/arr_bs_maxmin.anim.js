const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const minSearch = (r, code, lo, hi, ok, lineOk, lineBad, lanes = () => []) => { while (lo < hi) { const mid = Math.floor((lo + hi) / 2), [good, txt] = ok(mid); r.step(ln(code, good ? lineOk : lineBad), `try ${mid}: ${txt} → ${good ? 'works, search lower' : 'fails, search higher'}.`, [R('lo · mid · hi', [lo, mid, hi], { active: [1] }), ...lanes(mid)], { lo, mid, hi }); if (good) hi = mid; else lo = mid + 1; } return lo; };
const maxSearch = (r, code, lo, hi, ok, lineOk, lineBad, lanes = () => []) => { while (lo < hi) { const mid = lo + Math.floor((hi - lo + 1) / 2), [good, txt] = ok(mid); r.step(ln(code, good ? lineOk : lineBad), `try ${mid}: ${txt} → ${good ? 'works, search higher' : 'fails, search lower'}.`, [R('lo · mid · hi', [lo, mid, hi], { active: [1] }), ...lanes(mid)], { lo, mid, hi }); if (good) lo = mid; else hi = mid - 1; } return lo; };

const C_MF = `
int count = 1, last = pos[0];
for (int p : pos)
    if (p - last >= d) {
        count++;
        last = p;
    }
return count >= m;`;
{
  const pos = [1, 2, 3, 4, 7], m = 3, r = recorder(), place = d => { const o = [0]; let last = pos[0]; pos.forEach((p, i) => { if (p - last >= d) { o.push(i); last = p; } }); return o; };
  const ans = maxSearch(r, C_MF, 1, 6, d => [place(d).length >= m, `balls at ${place(d).map(i => pos[i]).join(', ')}`], 'return count >= m', 'return count >= m', d => [A('positions', pos, { done: place(d) })]);
  r.step(0, `Largest minimum gap <b>${ans}</b> (balls at 1, 4, 7).`, [A('positions', pos, { done: place(ans) })]);
  ANIM['Magnetic Force Between Two Balls'] = W('Binary search on gap', C_MF, r.steps);
}

const C_PD = `
for (int i = 1; i < nums.length && pairs < p; i++)
    if (nums[i] - nums[i - 1] <= mid) {
        pairs++;
        i++;
    }
if (pairs >= p) hi = mid;
else lo = mid + 1;`;
{
  const a = [1, 1, 2, 3, 7, 10], p = 2, r = recorder(), pr = d => { const o = []; for (let i = 1; i < a.length && o.length < p; i++) if (a[i] - a[i - 1] <= d) { o.push(i - 1, i); i++; } return o; };
  r.step(0, 'nums sorted: [1,1,2,3,7,10], p = 2.', [A('sorted', a)]);
  const ans = minSearch(r, C_PD, 0, 9, d => [pr(d).length / 2 >= p, `${pr(d).length / 2} pair${pr(d).length === 2 ? '' : 's'}`], 'hi = mid', 'lo = mid + 1', d => [A('sorted', a, { done: pr(d) })]);
  r.step(0, `Answer <b>${ans}</b>: pairs (1,1) and (2,3).`, [A('sorted', a, { done: pr(ans) })]);
  ANIM['Minimize the Maximum Difference of Pairs'] = W('Binary search + greedy', C_PD, r.steps);
}

const C_HR = `
for (int i = 0; i < nums.length; i++)
    if (nums[i] <= mid) {
        taken++;
        i++;
    }
if (taken >= k) hi = mid;`;
{
  const a = [2, 3, 5, 9], k = 2, r = recorder(), take = c => { const o = []; for (let i = 0; i < a.length; i++) if (a[i] <= c) { o.push(i); i++; } return o; };
  const ans = minSearch(r, C_HR, 2, 9, c => [take(c).length >= k, `rob houses ${take(c).map(i => a[i]).join(', ') || 'none'}`], 'hi = mid', 'if (nums[i] <= mid)', c => [A('houses', a, { done: take(c) })]);
  r.step(0, `Minimum capability <b>${ans}</b>: rob 2 and 5.`, [A('houses', a, { done: take(ans) })]);
  ANIM['House Robber IV'] = W('Binary search + greedy', C_HR, r.steps);
}

const C_KD = `
for (int l = 0, r = 0; r < nums.length; r++) {
    while (nums[r] - nums[l] > mid) l++;
    count += r - l;
}
if (count >= k) hi = mid;
else lo = mid + 1;`;
{
  const a = [1, 1, 3, 6], k = 3, r = recorder(), cnt = d => { let c = 0, l = 0; for (let rr = 0; rr < a.length; rr++) { while (a[rr] - a[l] > d) l++; c += rr - l; } return c; };
  r.step(0, 'Sorted [1,1,3,6]. Distances: 0, 2, 2, 3, 5, 5. k = 3.', [A('sorted', a)]);
  const ans = minSearch(r, C_KD, 0, 5, d => [cnt(d) >= k, `${cnt(d)} pairs within ${d}`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `3rd smallest distance <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Find K-th Smallest Pair Distance'] = W('Binary search + window count', C_KD, r.steps);
}

const C_KP = `
if (x >= 0) {
    while (lo < hi) { ... if ((long) x * b[mid] <= v) lo = mid + 1; else hi = mid; }
    count += lo;
} else {
    while (lo < hi) { ... if ((long) x * b[mid] <= v) hi = mid; else lo = mid + 1; }
    count += n - lo;
}`;
{
  const a = [-4, -2, 0, 3], b = [2, 4], k = 6, r = recorder(), prods = a.flatMap(x => b.map(y => x * y)).sort((p, q) => p - q), cnt = v => a.reduce((s, x) => s + b.filter(y => x * y <= v).length, 0);
  r.step(0, `All products sorted: [${prods}]. k = 6.`, [A('products', prods, { warn: [5] })]);
  r.step(ln(C_KP, 'count += n - lo'), 'For x = −4 the products shrink as b grows, so products ≤ v form a suffix of b.', [R('x = −4', b.map(y => -4 * y))]);
  const ans = minSearch(r, C_KP, -16, 12, v => [cnt(v) >= k, `${cnt(v)} products ≤ ${v}`], 'count += lo', 'count += n - lo');
  r.step(0, `6th smallest product <b>${ans}</b>.`, [A('products', prods, { done: [5] })]);
  ANIM['Kth Smallest Product of Two Sorted Arrays'] = W('Binary search + per-row bounds', C_KP, r.steps);
}

const C_TA = `
int strongest = pool.lastKey();
if (strongest >= need) {
    remove(pool, strongest);
    continue;
}
if (pills == 0) return false;
Integer w = pool.ceilingKey(need - strength);`;
{
  const tasks = [5, 9, 8, 5, 9], workers = [1, 6, 4, 2, 6], pills = 1, strength = 5, r = recorder();
  r.step(0, 'Sorted tasks [5,5,8,9,9], workers [1,2,4,6,6], 1 pill of +5.', [A('tasks', [5, 5, 8, 9, 9]), A('workers', [1, 2, 4, 6, 6])]);
  r.step(ln(C_TA, 'pool.lastKey'), 'Try k = 2: easiest tasks [5,5], strongest workers [6,6]. Both 6 ≥ 5 → works.', [A('tasks', [5, 5], { done: [0, 1] }), A('workers', [6, 6], { done: [0, 1] })], { k: 2 });
  r.step(ln(C_TA, 'ceilingKey'), 'Try k = 3: tasks [5,5,8], workers [4,6,6]. Task 8: strongest 6 < 8 → pill: weakest with ≥ 3 is 4 (4 + 5 = 9). Then 6, 6 do the 5s → works.', [A('tasks', [5, 5, 8], { done: [0, 1, 2] }), A('workers', [4, 6, 6], { warn: [0], done: [1, 2] })], { k: 3 });
  r.step(ln(C_TA, 'pills == 0'), 'k = 4 needs two pills → fails. Answer <b>3</b>.', [R('answer', [3], { done: [0] })]);
  ANIM['Maximum Number of Tasks You Can Assign'] = W('Binary search + TreeMap', C_TA, r.steps);
}

const C_PC = `
added += extra[i];
long have = power[i] + added;
if (have < target) {
    long need = target - have;
    if (need > k) return false;
    k -= need;
    added += need;
    extra[Math.min(n, i + 2 * r + 1)] -= need;
}`;
{
  const st = [1, 2, 4, 5, 0], rr = 1, k = 2, r = recorder(), n = 5, pw = st.map((_, i) => range(Math.max(0, i - rr), Math.min(n - 1, i + rr)).reduce((s, j) => s + st[j], 0));
  r.step(0, `Power with r = 1: [${pw}]. k = 2 new stations.`, [A('power', pw)]);
  const reach = t => { let kk = k, added = 0; const extra = Array(n + 1).fill(0), out = []; for (let i = 0; i < n; i++) { added += extra[i]; const have = pw[i] + added; if (have < t) { const need = t - have; if (need > kk) return [false, out]; kk -= need; added += need; extra[Math.min(n, i + 2 * rr + 1)] -= need; out.push(`+${need} at ${Math.min(n - 1, i + rr)}`); } } return [true, out]; };
  const ans = maxSearch(r, C_PC, 0, 13, t => { const [ok, out] = reach(t); return [ok, out.length ? out.join(', ') : 'no new stations needed']; }, 'k -= need', 'return false');
  r.step(0, `Best minimum power <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Maximize the Minimum Powered City'] = W('Binary search + greedy sweep', C_PC, r.steps);
}

const C_GS = `
long need = (x + p[i] - 1) / p[i] - spill;
if (need > 0) {
    moves += 2 * need - 1;
    spill = need - 1;
} else if (i < n - 1) {
    moves += 1;
    spill = 0;
}`;
{
  const p = [2, 4], m = 3, r = recorder(), cost = x => { let mv = 0, sp = 0; for (let i = 0; i < p.length; i++) { const need = Math.ceil(x / p[i]) - sp; if (need > 0) { mv += 2 * need - 1; sp = need - 1; } else if (i < p.length - 1) { mv += 1; sp = 0; } } return mv; };
  r.step(0, 'points [2,4], m = 3 moves, start at index −1.', [A('points', p)]);
  const ans = maxSearch(r, C_GS, 0, 12, x => [cost(x) <= m, `needs ${cost(x)} moves`], 'moves += 2 * need - 1', 'moves += 2 * need - 1');
  r.step(0, `Answer <b>${ans}</b>: walk 0 → 1 → 0 gives scores [4, 4].`, [A('gameScore', [4, 4], { done: [0, 1] })]);
  ANIM['Maximize the Minimum Game Score'] = W('Binary search + greedy walk', C_GS, r.steps);
}

const C_PS = `
if (y == 0) return x;
if (x == side) return (long) side + y;
if (y == side) return 3L * side - x;
return 4L * side - y;`;
{
  const side = 2, pts = [[0, 2], [2, 0], [2, 2], [0, 0]], r = recorder(), un = ([x, y]) => y === 0 ? x : x === side ? side + y : y === side ? 3 * side - x : 4 * side - y;
  r.step(ln(C_PS, 'if (y == 0)'), 'Walk the boundary counter-clockwise from (0, 0): bottom, right, top, left.', [R('points', pts.map(p => `(${p})`))]);
  r.step(ln(C_PS, 'return 4L'), `Unrolled positions: ${pts.map(p => `(${p}) → ${un(p)}`).join(', ')}. Perimeter 8.`, [A('position', pts.map(un).sort((a, b) => a - b))]);
  r.step(0, 'k = 4: the four corners sit 2 apart all round the circle → answer <b>2</b>.', [A('position', [0, 2, 4, 6], { done: [0, 1, 2, 3] })]);
  ANIM['Maximize the Distance Between Points on a Square'] = W('Binary search + greedy jumps', C_PS, r.steps);
}

const C_AD = `
boolean single = fits(a, x, d) && fits(b, x, d) || fits(a, y, d) && fits(b, y, d);
boolean pair = j - i >= 2 && Math.abs(x - y) <= d && (fits(a, x, d) && fits(b, y, d) || fits(a, y, d) && fits(b, x, d));
if (!single && !pair) return false;`;
{
  const nums = [1, 2, -1, 10, 8], r = recorder();
  r.step(0, 'nums [1,2,−1,10,8]. Known gaps: |1 − 2| = 1, |10 − 8| = 2 → at least 2. Neighbours of −1: 2 and 10.', [A('nums', nums, { warn: [2] })]);
  const ok = d => { const x = 2 + d, y = 10 - d; const f = (n, v) => Math.abs(n - v) <= d; return f(2, x) && f(10, x) || f(2, y) && f(10, y); };
  const ans = minSearch(r, C_AD, 2, 8, d => [ok(d), `x = ${2 + d}, y = ${10 - d}: ${ok(d) ? 'one value fits both 2 and 10' : 'no value fits both ends'}`], 'boolean single', 'return false');
  r.step(0, `Answer <b>${ans}</b>: put 6 → [1,2,6,10,8].`, [A('nums', [1, 2, 6, 10, 8], { done: [2] })]);
  ANIM['Minimize the Maximum Adjacent Element Difference'] = W('Binary search + run checks', C_AD, r.steps);
}

const C_IE = `
Arrays.sort(tasks, (a, b) -> (b[1] - b[0]) - (a[1] - a[0]));
for (int[] t : tasks) {
    if (energy < t[1]) return false;
    energy -= t[0];
}`;
{
  const tasks = [[1, 2], [2, 4], [4, 8]], r = recorder(), ord = tasks.slice().sort((a, b) => (b[1] - b[0]) - (a[1] - a[0])), fin = e => { for (const t of ord) { if (e < t[1]) return false; e -= t[0]; } return true; };
  r.step(ln(C_IE, 'Arrays.sort'), `Order by slack (min − actual): ${ord.map(t => `[${t}]`).join(' ')}.`, [R('order', ord.map(t => `[${t}]`))]);
  const ans = minSearch(r, C_IE, 0, 14, e => [fin(e), fin(e) ? 'all tasks done' : 'stuck on a task'], 'energy -= t[0]', 'return false');
  r.step(0, `Minimum initial energy <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Minimum Initial Energy to Finish Tasks'] = W('Sort + binary search', C_IE, r.steps);
}

const C_LD = `
for (int i = 0; i < day; i++) water[cells[i][0] - 1][cells[i][1] - 1] = true;
for (int c = 0; c < col; c++)
    if (!water[0][c]) {
        seen[0][c] = true;
        q.add(new int[]{0, c});
    }
if (cur[0] == row - 1) return true;`;
{
  const cells = [[1, 2], [2, 1], [3, 3], [2, 2], [1, 1], [1, 3], [2, 3], [3, 2], [3, 1]], row = 3, col = 3, r = recorder();
  const gridAt = day => { const g = range(0, 2).map(() => Array(3).fill('·')); cells.slice(0, day).forEach(([a, b]) => g[a - 1][b - 1] = '≈'); return g; };
  const can = day => { const g = gridAt(day), seen = new Set(), q = []; for (let c = 0; c < 3; c++) if (g[0][c] === '·') { q.push([0, c]); seen.add('0,' + c); } while (q.length) { const [a, b] = q.shift(); if (a === 2) return true; for (const [da, db] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const na = a + da, nb = b + db; if (na < 0 || nb < 0 || na > 2 || nb > 2 || g[na][nb] !== '·' || seen.has(na + ',' + nb)) continue; seen.add(na + ',' + nb); q.push([na, nb]); } } return false; };
  const ans = maxSearch(r, C_LD, 0, 9, d => [can(d), can(d) ? 'land path exists' : 'top and bottom cut off'], 'return true', 'q.add', d => [G(`day ${d}`, gridAt(d))]);
  r.step(0, `Last day to cross: <b>${ans}</b>.`, [G(`day ${ans}`, gridAt(ans))]);
  ANIM['Last Day Where You Can Still Cross'] = W('Binary search + BFS', C_LD, r.steps);
}

const C_SP = `
if (grid.get(r).get(c) == 1) {
    dist[r][c] = 0;
    q.add(new int[]{r, c});
}
dist[r][c] = dist[cur[0]][cur[1]] + 1;
if (r < 0 || c < 0 || r >= n || c >= n || seen[r][c] || dist[r][c] < s) continue;`;
{
  const g = [[0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]], n = 4, r = recorder(), dist = g.map((row, i) => row.map((_, j) => { let d = 99; g.forEach((rr, a) => rr.forEach((v, b) => { if (v) d = Math.min(d, Math.abs(a - i) + Math.abs(b - j)); })); return d; }));
  r.step(ln(C_SP, 'dist[r][c] = dist'), 'Multi-source BFS from both thieves gives each cell its safeness.', [G('dist', dist, [[0, 3, 'bad'], [3, 0, 'bad']])]);
  const path = s => { const seen = new Set(['0,0']), q = [[0, 0]]; if (dist[0][0] < s) return false; while (q.length) { const [a, b] = q.shift(); if (a === 3 && b === 3) return true; for (const [da, db] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const na = a + da, nb = b + db; if (na < 0 || nb < 0 || na > 3 || nb > 3 || seen.has(na + ',' + nb) || dist[na][nb] < s) continue; seen.add(na + ',' + nb); q.push([na, nb]); } } return false; };
  const ans = maxSearch(r, C_SP, 0, Math.min(dist[0][0], dist[3][3]), s => [path(s), path(s) ? 'path through cells ≥ ' + s : 'blocked'], 'seen[r][c] || dist', 'seen[r][c] || dist', s => [G('cells ≥ s', dist.map(row => row.map(v => v >= s ? v : '·')))]);
  r.step(0, `Maximum safeness <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Find the Safest Path in a Grid'] = W('BFS + binary search', C_SP, r.steps);
}

const C_SS = `
for (int it = 0; it < 100; it++) {
    double mid = (lo + hi) / 2;
    if (areaBelow(squares, mid) * 2 >= total) hi = mid;
    else lo = mid;
}`;
{
  const sq = [[0, 0, 2], [1, 1, 1]], r = recorder(), below = y => sq.reduce((s, [x, b, l]) => s + l * Math.max(0, Math.min(l, y - b)), 0), total = 5; let lo = 0, hi = 2;
  r.step(0, 'Squares: 2×2 at y 0..2 and 1×1 at y 1..2. Total area 5, need 2.5 below.', [R('squares', ['[0,0,2]', '[1,1,1]'])]);
  for (let it = 0; it < 6; it++) { const mid = (lo + hi) / 2, b = below(mid); r.step(ln(C_SS, b * 2 >= total ? 'hi = mid' : 'else lo = mid'), `y = ${mid.toFixed(4)}: area below ${b.toFixed(3)} ${b * 2 >= total ? '≥' : '<'} 2.5.`, [R('lo · hi', [lo.toFixed(4), hi.toFixed(4)])], { y: mid.toFixed(4) }); if (b * 2 >= total) hi = mid; else lo = mid; }
  r.step(0, 'Converges to y = <b>1.16667</b> (2y + (y − 1) = 2.5).', [R('answer', ['1.16667'], { done: [0] })]);
  ANIM['Separate Squares I'] = W('Bisection', C_SS, r.steps);
}
