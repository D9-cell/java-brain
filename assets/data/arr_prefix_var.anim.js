const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });

const C_RX = `
for (int l = 0, r = 0; r < n; r++) {
    sum += nums[r];
    while (sum > target) sum -= nums[l++];
    if (sum == target) best = Math.max(best, r - l + 1);
}
return best == -1 ? -1 : n - best;`;
{
  const a = [3, 2, 20, 1, 1, 3], x = 10, target = 30 - x, r = recorder(); let l = 0, s = 0, best = -1;
  r.step(0, `total 30, x = 10 → keep a middle block summing to ${target}.`, [A('nums', a)], { target });
  for (let rr = 0; rr < a.length; rr++) { s += a[rr]; while (s > target) s -= a[l++]; if (s === target) best = Math.max(best, rr - l + 1); r.step(ln(C_RX, s === target ? 'best = Math.max' : 'while (sum > target)'), `window [${l}, ${rr}] sum ${s}${s === target ? ' = target → length ' + (rr - l + 1) : ''}.`, [A('nums', a, { active: range(l, rr), ghost: [...range(0, l - 1), ...range(rr + 1, a.length - 1)] })], { sum: s, best }); }
  r.step(ln(C_RX, 'return best'), `Keep ${best}, remove ${a.length - best} → <b>${a.length - best}</b> operations.`, [R('answer', [a.length - best], { done: [0] })]);
  ANIM['Minimum Operations to Reduce X to Zero'] = W('Sliding window on the complement', C_RX, r.steps);
}

const C_LS = `
Arrays.sort(nums);
for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
if (pre[mid] <= queries[q]) lo = mid;`;
{
  const a = [4, 5, 2, 1].sort((x, y) => x - y), pre = [0], r = recorder(); a.forEach(v => pre.push(pre[pre.length - 1] + v));
  r.step(ln(C_LS, 'Arrays.sort'), `Sorted [${a}], prefix [${pre}].`, [A('sorted', a), A('pre', pre)]);
  for (const q of [3, 10, 21]) { const m = pre.filter(p => p <= q).length - 1; r.step(ln(C_LS, 'pre[mid] <= queries[q]'), `query ${q}: largest prefix ≤ ${q} is pre[${m}] = ${pre[m]} → <b>${m}</b>.`, [A('pre', pre, { done: [m], ghost: range(m + 1, 4) })]); }
  ANIM['Longest Subsequence With Limited Sum'] = W('Sort + prefix + search', C_LS, r.steps);
}

const C_TN = `
for (int end = a + b; end <= n; end++) {
    bestA = Math.max(bestA, pre[end - b] - pre[end - b - a]);
    result = Math.max(result, bestA + pre[end] - pre[end - b]);
}`;
{
  const a = [0, 6, 5, 2, 2, 5, 1, 9, 4], A1 = 1, B = 2, r = recorder(), s = (l, len) => a.slice(l, l + len).reduce((x, y) => x + y, 0); let bestA = 0, res = 0;
  for (let end = A1 + B; end <= a.length; end++) { bestA = Math.max(bestA, s(end - B - A1, A1)); res = Math.max(res, bestA + s(end - B, B)); r.step(ln(C_TN, 'result = Math.max'), `2-block ends at ${end - 1}: [${a.slice(end - B, end)}] = ${s(end - B, B)} + best 1-block before = ${bestA} → ${res}.`, [A('nums', a, { active: range(end - B, end - 1), warn: range(0, end - B - 1) })], { bestA, result: res }); }
  r.step(0, 'The other order (2-block first) is tried the same way. Answer <b>20</b>: [9] + [6, 5].', [R('answer', [20], { done: [0] })]);
  ANIM['Maximum Sum of Two Non-Overlapping Subarrays'] = W('Prefix + best earlier block', C_TN, r.steps);
}

const C_MS = `
pre[i][j] = mat[i - 1][j - 1] + pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1];
int k = side + 1;
if (i >= k && j >= k && pre[i][j] - pre[i - k][j] - pre[i][j - k] + pre[i - k][j - k] <= threshold) side = k;`;
{
  const m = [[1, 1, 3, 2, 4, 3, 2], [1, 1, 3, 2, 4, 3, 2], [1, 1, 3, 2, 4, 3, 2]], th = 4, r = recorder(); let side = 0;
  const sq = (i, j, k) => { let s = 0; for (let a = i - k; a < i; a++) for (let b = j - k; b < j; b++) s += m[a][b]; return s; };
  for (let i = 1; i <= 3; i++) for (let j = 1; j <= 7; j++) { const k = side + 1; if (i >= k && j >= k && sq(i, j, k) <= th) { side = k; r.step(ln(C_MS, 'side = k'), `Bottom-right (${i - 1}, ${j - 1}): the ${k}×${k} square sums to ${sq(i, j, k)} ≤ 4 → side ${k}.`, [G('mat', m, range(i - k, i - 1).flatMap(a => range(j - k, j - 1).map(b => [a, b, 'done'])))], { side }); } }
  r.step(0, `Side 3 would need a 3×3 sum ≤ 4; the smallest is 9. Answer <b>${side}</b>.`, [R('answer', [side], { done: [0] })]);
  ANIM['Maximum Side Length of a Square with Sum Less than or Equal to Threshold'] = W('2-D prefix + growing side', C_MS, r.steps);
}

const C_GG = `
for (int c = 0; c < n; c++) {
    top -= grid[0][c];
    best = Math.min(best, Math.max(top, bottom));
    bottom += grid[1][c];
}`;
{
  const g = [[2, 5, 4], [1, 5, 1]], r = recorder(); let top = 11, bottom = 0, best = Infinity;
  for (let c = 0; c < 3; c++) { top -= g[0][c]; best = Math.min(best, Math.max(top, bottom)); r.step(ln(C_GG, 'best = Math.min'), `Robot 1 turns at column ${c}: top-right left ${top}, bottom-left left ${bottom} → robot 2 gets ${Math.max(top, bottom)}.`, [G('grid', g, [...range(0, c).map(j => [0, j, 'ghost']), ...range(c, 2).map(j => [1, j, 'ghost']), ...range(c + 1, 2).map(j => [0, j, 'active']), ...range(0, c - 1).map(j => [1, j, 'active'])])], { best }); bottom += g[1][c]; }
  ANIM['Grid Game'] = W('Running top and bottom', C_GG, r.steps);
}

const C_P1 = `
for (int i = 0; i + 1 < m; i++)
    if ((run += rows[i]) * 2 == total) return true;`;
{
  const g = [[1, 4], [2, 3]], r = recorder();
  r.step(ln(C_P1, 'run += rows'), 'Row sums [5, 5], total 10. The first row alone is 5 = half → <b>true</b>.', [G('grid', g, [[0, 0, 'done'], [0, 1, 'done'], [1, 0, 'warn'], [1, 1, 'warn']])]);
  ANIM['Equal Sum Grid Partition I'] = W('Row and column prefixes', C_P1, r.steps);
}

const C_P2 = `
long diff = top - (total - top);
if (diff == 0 || diff == g[0][0] || diff == g[0][n - 1] || diff == g[i][0]) return true;
if (i > 0 && n > 1 && seen.contains(diff)) return true;`;
{
  const g = [[1, 2], [3, 4]], r = recorder();
  r.step(ln(C_P2, 'long diff'), 'Top part = row 0 (sum 3), bottom 7. diff = −4: the top cannot fix it, it is smaller.', [G('grid', g, [[0, 0, 'active'], [0, 1, 'active']])]);
  r.step(ln(C_P2, 'seen.contains'), 'Upside-down copy: top part = [3, 4] (sum 7) vs 3 → diff 4. Dropping the cell 4 (an end of a single row) leaves 3 = 3 → <b>true</b>.', [G('grid', g, [[1, 0, 'done'], [1, 1, 'bad'], [0, 0, 'warn'], [0, 1, 'warn']])]);
  ANIM['Equal Sum Grid Partition II'] = W('Prefix + set, four orientations', C_P2, r.steps);
}

const C_J9 = `
for (int i = n - 2; i >= 0; i--) ans[i] = maxLeft[i] > minRight[i + 1] ? ans[i + 1] : maxLeft[i];`;
{
  const a = [2, 1, 3], r = recorder(), mL = [2, 2, 3], mR = [1, 1, 3], ans = [0, 0, 3];
  r.step(0, `maxLeft [${mL}], minRight [${mR}].`, [A('nums', a), A('maxLeft', mL), A('minRight', mR)]);
  for (let i = 1; i >= 0; i--) { ans[i] = mL[i] > mR[i + 1] ? ans[i + 1] : mL[i]; r.step(ln(C_J9, 'ans[i]'), `i = ${i}: maxLeft ${mL[i]} ${mL[i] > mR[i + 1] ? '>' : '≤'} minRight ${mR[i + 1]} → ${mL[i] > mR[i + 1] ? 'joined with the right, share its answer' : 'cut here, answer is maxLeft'} = ${ans[i]}.`, [A('ans', ans.slice(), { active: [i] })]); }
  ANIM['Jump Game IX'] = W('Prefix max + suffix min', C_J9, r.steps);
}

const C_CN = `
number[i + 1] = d != 0 ? (number[i] * 10 + d) % MOD : number[i];
long x = ((number[r] - number[l] * pow10[len]) % MOD + MOD) % MOD;
out[q] = (int) (x * ((digitSum[r] - digitSum[l]) % MOD) % MOD);`;
{
  const s = '10203004', r = recorder(), num = [0], cnt = [0], ds = [0]; for (const ch of s) { const d = +ch; num.push(d ? num[num.length - 1] * 10 + d : num[num.length - 1]); cnt.push(cnt[cnt.length - 1] + (d ? 1 : 0)); ds.push(ds[ds.length - 1] + d); }
  r.step(ln(C_CN, 'number[i + 1]'), `Prefix numbers from non-zero digits: [${num}].`, [A('number', num), A('digitSum', ds)]);
  const [l, rr] = [2, 6]; const len = cnt[rr + 1] - cnt[l], x = num[rr + 1] - num[l] * 10 ** len;
  r.step(ln(C_CN, 'long x'), `Query [2, 6] ("20300"): ${num[rr + 1]} − ${num[l]}·10^${len} = ${x}.`, [lane('s', s.split(''), { active: range(l, rr) })], { x });
  r.step(ln(C_CN, 'out[q]'), `digit sum ${ds[rr + 1] - ds[l]} → ${x} · ${ds[rr + 1] - ds[l]} = <b>${x * (ds[rr + 1] - ds[l])}</b>.`, [R('answer', [x * (ds[rr + 1] - ds[l])], { done: [0] })]);
  ANIM['Concatenate Non-Zero Digits and Multiply by Sum II'] = W('Prefix arrays', C_CN, r.steps);
}

const C_C1 = `
for (int i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
    if (max == i) chunks++;
}`;
{
  const a = [1, 0, 2, 3, 4], r = recorder(); let mx = 0, ch = 0;
  a.forEach((v, i) => { mx = Math.max(mx, v); const cut = mx === i; if (cut) ch++; r.step(ln(C_C1, cut ? 'chunks++' : 'max = Math.max'), `i = ${i}: running max ${mx}${cut ? ' = i → end a chunk' : ''}.`, [A('arr', a, { active: [i] })], { max: mx, chunks: ch }); });
  ANIM['Max Chunks To Make Sorted'] = W('Running max', C_C1, r.steps);
}

const C_C2 = `
for (int i = 0; i + 1 < n; i++) {
    maxLeft = Math.max(maxLeft, arr[i]);
    if (maxLeft <= minRight[i + 1]) chunks++;
}`;
{
  const a = [2, 1, 3, 4, 4], r = recorder(), mR = a.map((_, i) => Math.min(...a.slice(i))); let mL = -Infinity, ch = 1;
  r.step(0, `Suffix minimum [${mR}].`, [A('arr', a), A('minRight', mR)]);
  for (let i = 0; i + 1 < a.length; i++) { mL = Math.max(mL, a[i]); const cut = mL <= mR[i + 1]; if (cut) ch++; r.step(ln(C_C2, cut ? 'chunks++' : 'maxLeft = Math.max'), `After ${i}: max left ${mL} ${cut ? '≤' : '>'} min right ${mR[i + 1]}${cut ? ' → cut' : ''}.`, [A('arr', a, { warn: range(0, i), active: range(i + 1, 4) })], { chunks: ch }); }
  ANIM['Max Chunks To Make Sorted II'] = W('Prefix max + suffix min', C_C2, r.steps);
}

const C_BS = `
for (int j = 1; j < values.length; j++) {
    best = Math.max(best, bestLeft + values[j] - j);
    bestLeft = Math.max(bestLeft, values[j] + j);
}`;
{
  const v = [8, 1, 5, 2, 6], r = recorder(); let bl = v[0], best = -Infinity;
  for (let j = 1; j < v.length; j++) { best = Math.max(best, bl + v[j] - j); r.step(ln(C_BS, 'best = Math.max'), `j = ${j}: best left ${bl} + (${v[j]} − ${j}) = ${bl + v[j] - j}. best ${best}.`, [A('values', v, { active: [j] })], { bestLeft: bl, best }); bl = Math.max(bl, v[j] + j); }
  ANIM['Best Sightseeing Pair'] = W('Running best', C_BS, r.steps);
}

const C_CH = `
long rest = k % total;
for (int i = 0; i < chalk.length; i++) {
    if (rest < chalk[i]) return i;
    rest -= chalk[i];
}`;
{
  const c = [3, 4, 1, 2], k = 25, r = recorder(); let rest = k % 10;
  r.step(ln(C_CH, 'long rest'), `One round uses 10; 25 % 10 = ${rest}.`, [A('chalk', c)], { rest });
  for (let i = 0; i < c.length; i++) { if (rest < c[i]) { r.step(ln(C_CH, 'return i'), `Student ${i} needs ${c[i]} but only ${rest} left → <b>${i}</b>.`, [A('chalk', c, { bad: [i], done: range(0, i - 1) })]); break; } rest -= c[i]; r.step(ln(C_CH, 'rest -= chalk'), `Student ${i} uses ${c[i]}, ${rest} left.`, [A('chalk', c, { done: range(0, i) })], { rest }); }
  ANIM['Find the Student that Will Replace the Chalk'] = W('Mod + scan', C_CH, r.steps);
}
