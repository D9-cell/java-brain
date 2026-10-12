const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });

const C_RA = `
for (int[] u : updates) {
    diff[u[0]] += u[2];
    diff[u[1] + 1] -= u[2];
}
for (int i = 0, run = 0; i < length; i++) out[i] = run += diff[i];`;
{
  const ups = [[1, 3, 2], [2, 4, 3], [0, 2, -2]], r = recorder(), diff = Array(6).fill(0);
  for (const [s, e, v] of ups) { diff[s] += v; diff[e + 1] -= v; r.step(ln(C_RA, 'diff[u[0]]'), `Update [${s}, ${e}] += ${v}: mark +${v} at ${s}, −${v} at ${e + 1}.`, [A('diff', diff.slice(), { active: [s, e + 1] })]); }
  const out = []; let run = 0; for (let i = 0; i < 5; i++) { run += diff[i]; out.push(run); }
  r.step(ln(C_RA, 'out[i] = run'), `One prefix sum → <b>[${out}]</b>.`, [A('diff', diff), A('result', out, { done: range(0, 4) })]);
  ANIM['Range Addition'] = W('Difference array', C_RA, r.steps);
}

const C_R2 = `
for (int[] op : ops) {
    m = Math.min(m, op[0]);
    n = Math.min(n, op[1]);
}
return m * n;`;
{
  const r = recorder(), g = range(0, 2).map(() => Array(3).fill(0));
  for (const [a, b] of [[2, 2], [3, 3]]) { for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) g[i][j]++; r.step(ln(C_R2, 'm = Math.min'), `Operation [${a}, ${b}] covers the top-left ${a}×${b}.`, [G('M', g.map(row => row.slice()), range(0, a - 1).flatMap(i => range(0, b - 1).map(j => [i, j, 'active'])))]); }
  r.step(ln(C_R2, 'return'), 'Smallest rectangle 2 × 2 holds the maximum → <b>4</b> cells.', [G('M', g, [[0, 0, 'done'], [0, 1, 'done'], [1, 0, 'done'], [1, 1, 'done']])]);
  ANIM['Range Addition II'] = W('Min dimensions', C_R2, r.steps);
}

const C_IS = `
diff[q[0]][q[1]]++;
diff[q[0]][q[3] + 1]--;
diff[q[2] + 1][q[1]]--;
diff[q[2] + 1][q[3] + 1]++;
out[i][j] = diff[i][j] + up + left - diag;`;
{
  const n = 3, r = recorder(), d = range(0, 3).map(() => Array(4).fill(0)), qs = [[1, 1, 2, 2], [0, 0, 1, 1]];
  for (const [r1, c1, r2, c2] of qs) { d[r1][c1]++; d[r1][c2 + 1]--; d[r2 + 1][c1]--; d[r2 + 1][c2 + 1]++; r.step(ln(C_IS, 'diff[q[2] + 1][q[3] + 1]++'), `Rectangle (${r1},${c1})–(${r2},${c2}): four corner marks.`, [G('diff', d.map(row => row.slice()), [[r1, c1, 'done'], [r1, c2 + 1, 'bad'], [r2 + 1, c1, 'bad'], [r2 + 1, c2 + 1, 'done']])]); }
  const out = range(0, n - 1).map(() => Array(n).fill(0)); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) out[i][j] = d[i][j] + (i ? out[i - 1][j] : 0) + (j ? out[i][j - 1] : 0) - (i && j ? out[i - 1][j - 1] : 0);
  r.step(ln(C_IS, 'out[i][j]'), '2-D prefix sum → final matrix.', [G('result', out, [[1, 1, 'warn']])]);
  ANIM['Increment Submatrices by One'] = W('2-D difference array', C_IS, r.steps);
}

const C_SL = `
int d = sh[2] == 1 ? 1 : -1;
diff[sh[0]] += d;
diff[sh[1] + 1] -= d;
out[i] = (char) ('a' + ((out[i] - 'a' + run) % 26 + 26) % 26);`;
{
  const s = 'abc', shifts = [[0, 1, 0], [1, 2, 1], [0, 2, 1]], r = recorder(), diff = [0, 0, 0, 0];
  for (const [a, b, dir] of shifts) { const d = dir ? 1 : -1; diff[a] += d; diff[b + 1] -= d; r.step(ln(C_SL, 'diff[sh[0]]'), `[${a}, ${b}] ${dir ? 'forward' : 'backward'}: ${d > 0 ? '+1' : '−1'} at ${a}, opposite at ${b + 1}.`, [A('diff', diff.slice(), { active: [a, b + 1] })]); }
  let run = 0; const out = s.split('').map((c, i) => { run += diff[i]; return String.fromCharCode(97 + (((c.charCodeAt(0) - 97 + run) % 26) + 26) % 26); });
  r.step(ln(C_SL, 'out[i] = (char)'), `Net shifts applied → <b>"${out.join('')}"</b>.`, [lane('s', out, { done: [0, 1, 2] })]);
  ANIM['Shifting Letters II'] = W('Difference array', C_SL, r.steps);
}

const C_Z1 = `
for (int i = 0, cover = 0; i < n; i++) {
    cover += diff[i];
    if (cover < nums[i]) return false;
}`;
{
  const nums = [4, 3, 2, 1], qs = [[1, 3], [0, 2]], r = recorder(), cover = [0, 0, 0, 0]; qs.forEach(([a, b]) => { for (let i = a; i <= b; i++) cover[i]++; });
  r.step(0, 'Coverage from queries [1,3] and [0,2].', [A('nums', nums), A('cover', cover)]);
  r.step(ln(C_Z1, 'return false'), 'Index 0 needs 4 decrements but only 1 query covers it → <b>false</b>.', [A('nums', nums, { bad: [0] }), A('cover', cover, { bad: [0] })]);
  ANIM['Zero Array Transformation I'] = W('Coverage counts', C_Z1, r.steps);
}

const C_Z2 = `
while (cover + diff[i] < nums[i]) {
    if (k == queries.length) return -1;
    int[] q = queries[k++];
    if (q[1] < i) continue;
    diff[Math.max(q[0], i)] += q[2];
    diff[q[1] + 1] -= q[2];
}
cover += diff[i];`;
{
  const nums = [2, 0, 2], qs = [[0, 2, 1], [0, 2, 1], [1, 1, 3]], r = recorder(), diff = [0, 0, 0, 0]; let cover = 0, k = 0;
  for (let i = 0; i < 3; i++) { while (cover + diff[i] < nums[i]) { const q = qs[k++]; diff[Math.max(q[0], i)] += q[2]; diff[q[1] + 1] -= q[2]; r.step(ln(C_Z2, 'int[] q = queries[k++]'), `Index ${i} needs ${nums[i]}, has ${cover + diff[i] - q[2]}: apply query ${k - 1} [${q}].`, [A('nums', nums, { active: [i] }), A('diff', diff.slice())], { k }); } cover += diff[i]; r.step(ln(C_Z2, 'cover += diff[i]'), `Index ${i} covered (${cover} ≥ ${nums[i]}).`, [A('nums', nums, { done: range(0, i) })], { k, cover }); }
  r.step(0, `Answer <b>${k}</b> queries.`, [R('answer', [k], { done: [0] })]);
  ANIM['Zero Array Transformation II'] = W('Lazy sweep', C_Z2, r.steps);
}

const C_CM = `
diff[2] += 2;
diff[a + 1] -= 1;
diff[a + b] -= 1;
diff[a + b + 1] += 1;
diff[b + limit + 1] += 1;`;
{
  const nums = [1, 2, 4, 3], limit = 4, r = recorder(), cost = T => [[1, 3], [2, 4]].reduce((s, [x, y]) => { const a = Math.min(x, y), b = Math.max(x, y); return s + (a + b === T ? 0 : (T >= a + 1 && T <= b + limit) ? 1 : 2); }, 0);
  r.step(0, 'Pairs (1, 3) and (2, 4). Each pair paints cost 2 / 1 / 0 over target sums 2..8.', [A('nums', nums)]);
  r.step(ln(C_CM, 'diff[b + limit + 1]'), `Cost by target T = 2..8: [${range(2, 8).map(cost)}].`, [A('cost', range(2, 8).map(cost), { done: range(2, 8).map((T, i) => cost(T) === Math.min(...range(2, 8).map(cost)) ? i : -1).filter(i => i >= 0) })]);
  r.step(0, `Minimum <b>${Math.min(...range(2, 8).map(cost))}</b>.`, [R('answer', [Math.min(...range(2, 8).map(cost))], { done: [0] })]);
  ANIM['Minimum Moves to Make Array Complementary'] = W('Difference over target sums', C_CM, r.steps);
}

const C_F1 = `
for (int t = 0; t < size; t++) {
    int lo = Math.max(0, t - k), hi = Math.min(size - 1, t + k);
    int near = pre[hi + 1] - pre[lo];
    best = Math.max(best, freq[t] + Math.min(numOperations, near - freq[t]));
}`;
{
  const nums = [1, 4, 5], k = 1, ops = 2, r = recorder();
  for (const t of [1, 2, 4, 5]) { const same = nums.filter(x => x === t).length, near = nums.filter(x => Math.abs(x - t) <= k).length; r.step(ln(C_F1, 'best = Math.max'), `target ${t}: ${same} already equal, ${near - same} within 1 → ${same + Math.min(ops, near - same)}.`, [A('nums', nums, { done: nums.map((x, i) => x === t ? i : -1).filter(i => i >= 0), active: nums.map((x, i) => x !== t && Math.abs(x - t) <= k ? i : -1).filter(i => i >= 0) })]); }
  r.step(0, 'Best frequency <b>2</b> (e.g. turn 5 into 4).', [R('answer', [2], { done: [0] })]);
  ANIM['Maximum Frequency of an Element After Performing Operations I'] = W('Prefix counts', C_F1, r.steps);
}

const C_F2 = `
for (int x : a)
    for (long t : new long[]{x, (long) x + k}) {
        int near = upper(a, t + k) - lower(a, t - k);
        int same = upper(a, t) - lower(a, t);
        best = Math.max(best, same + Math.min(numOperations, near - same));
    }`;
{
  const a = [5, 11, 20, 20], k = 5, ops = 1, r = recorder();
  for (const x of [5, 11, 20]) for (const t of [x, x + k]) { const near = a.filter(v => Math.abs(v - t) <= k).length, same = a.filter(v => v === t).length; r.step(ln(C_F2, 'best = Math.max'), `candidate ${t}${t === x ? ' (a value)' : ` (${x} + k)`}: ${same} equal, ${near - same} within 5 → ${same + Math.min(ops, near - same)}.`, [A('sorted', a, { done: a.map((v, i) => v === t ? i : -1).filter(i => i >= 0), active: a.map((v, i) => v !== t && Math.abs(v - t) <= k ? i : -1).filter(i => i >= 0) })]); }
  r.step(0, 'Answer <b>2</b>.', [R('answer', [2], { done: [0] })]);
  ANIM['Maximum Frequency of an Element After Performing Operations II'] = W('Candidates + binary search', C_F2, r.steps);
}

const C_XR = `
if (q[2] >= block) {
    for (int i = q[0]; i <= q[1]; i += q[2]) val[i] = val[i] * q[3] % MOD;
} else small.computeIfAbsent(q[2], key -> new ArrayList<>()).add(q);
diff[q[0]] = diff[q[0]] * q[3] % MOD;
if (next < n) diff[next] = diff[next] * power(q[3], MOD - 2) % MOD;
for (int i = k; i < n; i++) diff[i] = diff[i] * diff[i - k] % MOD;`;
{
  const r = recorder(), n = 9;
  r.step(ln(C_XR, 'if (q[2] >= block)'), 'n = 9, block = 3. Query [0, 8, k = 4, v = 3] has a big step: multiply indexes 0, 4, 8 directly.', [A('touched', range(0, 8).map(i => i % 4 === 0 ? '×3' : '·'), { active: [0, 4, 8] })]);
  r.step(ln(C_XR, 'diff[q[0]] = diff'), 'Query [1, 6, k = 2, v = 5] has a small step: diff[1] ×= 5, and the next index after 5 in the progression (7) gets ×5⁻¹.', [A('diff (k = 2)', ['1', '5', '1', '1', '1', '1', '1', '5⁻¹', '1'], { active: [1, 7] })]);
  r.step(ln(C_XR, 'diff[i - k]'), 'Prefix products in steps of 2 spread ×5 to 1, 3, 5 and cancel it from 7 on.', [A('diff (k = 2)', ['1', '5', '1', '5', '1', '5', '1', '1', '1'], { done: [1, 3, 5] })]);
  ANIM['XOR After Range Multiplication Queries II'] = W('Square root decomposition', C_XR, r.steps);
}

const C_IN = `
int ops = target[0];
for (int i = 1; i < target.length; i++) ops += Math.max(0, target[i] - target[i - 1]);`;
{
  const t = [3, 1, 5, 4, 2], r = recorder(); let ops = t[0];
  r.step(ln(C_IN, 'int ops'), `Start: ${t[0]} layers needed at index 0.`, [A('target', t, { active: [0] })], { ops });
  for (let i = 1; i < t.length; i++) { const rise = Math.max(0, t[i] - t[i - 1]); ops += rise; r.step(ln(C_IN, 'ops +='), `${t[i - 1]} → ${t[i]}: ${rise ? `rise of ${rise}, start ${rise} new operations` : 'drop, free'}. ops ${ops}.`, [A('target', t, { active: [i] })], { ops }); }
  ANIM['Minimum Number of Increments on Subarrays to Form a Target Array'] = W('Sum of rises', C_IN, r.steps);
}

const C_KF = `
active -= endAt[i];
if ((nums[i] + active) % 2 == 0) {
    if (i + k > n) return -1;
    flips++;
    active++;
    endAt[i + k]++;
}`;
{
  const a = [0, 0, 0, 1, 0, 1, 1, 0], k = 3, r = recorder(), endAt = Array(9).fill(0), cur = a.slice(); let active = 0, flips = 0;
  for (let i = 0; i < a.length; i++) { active -= endAt[i]; const bit = (a[i] + active) % 2; if (bit === 0) { flips++; active++; endAt[i + k]++; for (let j = i; j < i + k; j++) cur[j] ^= 1; r.step(ln(C_KF, 'flips++'), `Bit ${i} is 0 after ${active - 1} active flip(s) → start a flip covering ${i}..${i + k - 1}.`, [A('bits', cur.slice(), { active: range(i, i + k - 1), done: range(0, i - 1) })], { active, flips }); } else r.step(ln(C_KF, 'active -= endAt'), `Bit ${i} is already 1.`, [A('bits', cur.slice(), { done: range(0, i) })], { active, flips }); }
  r.step(0, `All ones with <b>${flips}</b> flips.`, [R('answer', [flips], { done: [0] })]);
  ANIM['Minimum Number of K Consecutive Bit Flips'] = W('Greedy with flip counts', C_KF, r.steps);
}

const C_RP = `
for (int b = 0; b < 31; b++)
    if ((n >> b & 1) == 1) exps[m++] = b;
for (int i = 0; i < m; i++) pre[i + 1] = pre[i] + exps[i];
out[q] = (int) power(2, pre[queries[q][1] + 1] - pre[queries[q][0]]);`;
{
  const r = recorder();
  r.step(ln(C_RP, 'exps[m++]'), 'n = 15 = 1111₂ → powers [1, 2, 4, 8], exponents [0, 1, 2, 3].', [A('exps', [0, 1, 2, 3])]);
  r.step(ln(C_RP, 'pre[i + 1]'), 'Exponent prefix [0, 0, 1, 3, 6].', [A('pre', [0, 0, 1, 3, 6])]);
  r.step(ln(C_RP, 'out[q]'), 'Query [0, 1]: 2^(1 − 0) = 2. Query [2, 2]: 2^(3 − 1) = 4. Query [0, 3]: 2^6 = <b>64</b>.', [R('answers', [2, 4, 64], { done: [0, 1, 2] })]);
  ANIM['Range Product Queries of Powers'] = W('Exponent prefix + fast power', C_RP, r.steps);
}

const C_EV = `
if (nums[i] % 2 == 0) even -= nums[i];
nums[i] += queries[q][0];
if (nums[i] % 2 == 0) even += nums[i];`;
{
  const nums = [1, 2, 3, 4], qs = [[1, 0], [-3, 1], [-4, 0], [2, 3]], r = recorder(); let even = 6;
  r.step(0, 'Even sum starts at 2 + 4 = 6.', [A('nums', nums.slice())], { even });
  for (const [v, i] of qs) { const old = nums[i]; if (old % 2 === 0) even -= old; nums[i] += v; if (nums[i] % 2 === 0) even += nums[i]; r.step(ln(C_EV, 'even += nums[i]'), `nums[${i}] ${old} → ${nums[i]}: even sum ${even}.`, [A('nums', nums.slice(), { active: [i] })], { even }); }
  ANIM['Sum of Even Numbers After Queries'] = W('Running even sum', C_EV, r.steps);
}
