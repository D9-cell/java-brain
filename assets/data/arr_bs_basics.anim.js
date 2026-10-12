const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const P = (lo, mid, hi, n) => { const p = {}; if (lo < n) p[lo] = 'lo'; if (hi >= 0 && hi < n) p[hi] = (p[hi] ? p[hi] + '/' : '') + 'hi'; if (mid !== null && mid >= 0 && mid < n) p[mid] = (p[mid] ? p[mid] + '/' : '') + 'mid'; return p; };
const BA = (name, a, lo, mid, hi, o = {}) => A(name, a, { ptr: P(lo, mid, hi, a.length), ghost: range(0, a.length - 1).filter(i => i < lo || i > hi), ...o });

const C_BS = `
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;`;
{
  const a = [-1, 0, 3, 5, 9, 12], t = 9, r = recorder(); let lo = 0, hi = a.length - 1;
  while (lo <= hi) { const mid = lo + Math.floor((hi - lo) / 2); if (a[mid] === t) { r.step(ln(C_BS, 'return mid'), `nums[${mid}] = ${t} → <b>${mid}</b>.`, [BA('nums', a, lo, mid, hi, { done: [mid] })], { lo, mid, hi }); break; } const right = a[mid] < t; r.step(ln(C_BS, right ? 'lo = mid + 1' : 'hi = mid - 1'), `nums[${mid}] = ${a[mid]} ${right ? '<' : '>'} ${t} → drop the ${right ? 'left' : 'right'} half.`, [BA('nums', a, lo, mid, hi, { active: [mid] })], { lo, mid, hi }); if (right) lo = mid + 1; else hi = mid - 1; }
  ANIM['Binary Search'] = W('Closed range', C_BS, r.steps);
}

const C_GN = `
int g = guess(mid);
if (g == 0) return mid;
if (g < 0) hi = mid - 1;
else lo = mid + 1;`;
{
  const n = 10, pick = 6, r = recorder(), a = range(1, n); let lo = 1, hi = n;
  while (lo <= hi) { const mid = lo + Math.floor((hi - lo) / 2), g = Math.sign(pick - mid); r.step(ln(C_GN, g === 0 ? 'return mid' : g < 0 ? 'hi = mid - 1' : 'lo = mid + 1'), `guess(${mid}) = ${g}${g === 0 ? ' → found <b>' + mid + '</b>' : g < 0 ? ' (too high)' : ' (too low)'}.`, [BA('1..10', a, lo - 1, mid - 1, hi - 1, g === 0 ? { done: [mid - 1] } : { active: [mid - 1] })], { lo, mid, hi }); if (!g) break; if (g < 0) hi = mid - 1; else lo = mid + 1; }
  ANIM['Guess Number Higher or Lower'] = W('Binary search', C_GN, r.steps);
}

const C_SL = `
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (letters[mid] <= target) lo = mid + 1;
    else hi = mid;
}
return letters[lo % letters.length];`;
{
  const L = ['c', 'f', 'j'], r = recorder();
  for (const t of ['c', 'k']) { let lo = 0, hi = L.length; while (lo < hi) { const mid = (lo + hi) >> 1; const right = L[mid] <= t; r.step(ln(C_SL, right ? 'lo = mid + 1' : 'hi = mid;'), `target '${t}': letters[${mid}] = '${L[mid]}' ${right ? '≤' : '>'} target.`, [A('letters', L, { ptr: P(lo, mid, hi, 3), active: [mid] })], { lo, hi }); if (right) lo = mid + 1; else hi = mid; } r.step(ln(C_SL, 'return'), `lo = ${lo} → '${L[lo % 3]}'${lo === 3 ? ' (wrapped around)' : ''}.`, [A('letters', L, { done: [lo % 3] })]); }
  ANIM['Find Smallest Letter Greater Than Target'] = W('Upper bound', C_SL, r.steps);
}

const C_FL = `
int first = lowerBound(nums, target);
if (first == nums.length || nums[first] != target) return new int[]{-1, -1};
return new int[]{first, lowerBound(nums, target + 1) - 1};`;
{
  const a = [5, 7, 7, 8, 8, 10], r = recorder(), lb = x => { let lo = 0, hi = a.length; while (lo < hi) { const m = (lo + hi) >> 1; if (a[m] < x) lo = m + 1; else hi = m; } return lo; };
  r.step(ln(C_FL, 'int first'), `lowerBound(8) = ${lb(8)}: first value ≥ 8.`, [A('nums', a, { active: [lb(8)] })], { first: lb(8) });
  r.step(ln(C_FL, 'lowerBound(nums, target + 1)'), `lowerBound(9) = ${lb(9)}: first value ≥ 9, so the last 8 is at ${lb(9) - 1}.`, [A('nums', a, { active: [lb(9)], done: [lb(8), lb(9) - 1] })]);
  r.step(ln(C_FL, 'return new int[]{first'), `Answer <b>[${lb(8)}, ${lb(9) - 1}]</b>.`, [A('nums', a, { done: range(lb(8), lb(9) - 1) })]);
  ANIM['Find First and Last Position of Element in Sorted Array'] = W('Two lower bounds', C_FL, r.steps);
}

const C_25 = `
for (int pos : new int[]{n / 4, n / 2, 3 * n / 4}) {
    int x = arr[pos];
    if (lowerBound(arr, x + 1) - lowerBound(arr, x) > n / 4) return x;
}`;
{
  const a = [1, 2, 2, 6, 6, 6, 6, 7, 10], n = a.length, r = recorder(), lb = x => a.findIndex(v => v >= x) === -1 ? n : a.findIndex(v => v >= x);
  r.step(0, `n = ${n}: a run longer than ${Math.floor(n / 4)} must cover index ${Math.floor(n / 4)}, ${Math.floor(n / 2)} or ${Math.floor(3 * n / 4)}.`, [A('arr', a, { warn: [Math.floor(n / 4), Math.floor(n / 2), Math.floor(3 * n / 4)] })]);
  for (const pos of [Math.floor(n / 4), Math.floor(n / 2)]) { const x = a[pos], len = lb(x + 1) - lb(x); r.step(ln(C_25, 'lowerBound(arr, x + 1)'), `Candidate ${x} at ${pos}: run length ${len} ${len > Math.floor(n / 4) ? `> ${Math.floor(n / 4)} → <b>${x}</b>` : '— too short'}.`, [A('arr', a, len > Math.floor(n / 4) ? { done: range(lb(x), lb(x + 1) - 1) } : { active: range(lb(x), lb(x + 1) - 1) })]); if (len > Math.floor(n / 4)) break; }
  ANIM['Element Appearing More Than 25% In Sorted Array'] = W('Quarter points', C_25, r.steps);
}

const C_KM = `
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (arr[mid] - mid - 1 < k) lo = mid + 1;
    else hi = mid;
}
return lo + k;`;
{
  const a = [2, 3, 4, 7, 11], k = 5, r = recorder(), miss = a.map((v, i) => v - i - 1); let lo = 0, hi = a.length;
  r.step(0, 'Missing numbers before each index: arr[i] − i − 1.', [A('arr', a), A('missing', miss)]);
  while (lo < hi) { const mid = (lo + hi) >> 1; const right = miss[mid] < k; r.step(ln(C_KM, right ? 'lo = mid + 1' : 'hi = mid;'), `missing[${mid}] = ${miss[mid]} ${right ? '<' : '≥'} k = ${k}.`, [A('missing', miss, { ptr: P(lo, mid, Math.min(hi, 4), 5), active: [mid] })], { lo, hi }); if (right) lo = mid + 1; else hi = mid; }
  r.step(ln(C_KM, 'return lo + k'), `lo = ${lo} → answer ${lo} + ${k} = <b>${lo + k}</b>.`, [R('answer', [lo + k], { done: [0] })]);
  ANIM['Kth Missing Positive Number'] = W('Binary search on missing count', C_KM, r.steps);
}

const C_SE = `
int mid = (lo + hi) / 2;
if (mid % 2 == 1) mid--;
if (nums[mid] == nums[mid + 1]) lo = mid + 2;
else hi = mid;`;
{
  const a = [1, 1, 2, 3, 3, 4, 4, 8, 8], r = recorder(); let lo = 0, hi = a.length - 1;
  while (lo < hi) { let mid = (lo + hi) >> 1; if (mid % 2) mid--; const intact = a[mid] === a[mid + 1]; r.step(ln(C_SE, intact ? 'lo = mid + 2' : 'hi = mid;'), `mid = ${mid} (even): ${a[mid]} ${intact ? '=' : '≠'} ${a[mid + 1]} → single is ${intact ? 'to the right' : 'here or to the left'}.`, [BA('nums', a, lo, mid, hi, { active: [mid, mid + 1] })], { lo, hi }); if (intact) lo = mid + 2; else hi = mid; }
  r.step(0, `Single element <b>${a[lo]}</b>.`, [A('nums', a, { done: [lo] })]);
  ANIM['Single Element in a Sorted Array'] = W('Even-index search', C_SE, r.steps);
}

const C_PK = `
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
}`;
{
  const a = [0, 2, 5, 8, 6, 3, 1], r = recorder(); let lo = 0, hi = a.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1, up = a[mid] < a[mid + 1]; r.step(ln(C_PK, up ? 'lo = mid + 1' : 'hi = mid;'), `arr[${mid}] = ${a[mid]} ${up ? '<' : '>'} arr[${mid + 1}] = ${a[mid + 1]} → ${up ? 'rising, peak is right' : 'falling, peak is here or left'}.`, [BA('arr', a, lo, mid, hi, { active: [mid, mid + 1] })], { lo, hi }); if (up) lo = mid + 1; else hi = mid; }
  r.step(0, `Peak at <b>${lo}</b>.`, [A('arr', a, { done: [lo] })]);
  ANIM['Peak Index in a Mountain Array'] = W('Slope search', C_PK, r.steps);
}

const C_MA = `
int peak = lo;
int left = search(m, target, 0, peak, true);
return left != -1 ? left : search(m, target, peak + 1, n - 1, false);`;
{
  const a = [1, 2, 3, 4, 5, 3, 1], r = recorder();
  r.step(ln(C_MA, 'int peak'), 'Slope search finds the peak at index 4.', [A('mountain', a, { warn: [4] })], { peak: 4 });
  r.step(ln(C_MA, 'int left'), 'Search target 3 in the rising part [0..4] → found at 2.', [A('mountain', a, { done: [2], ghost: [5, 6] })], { left: 2 });
  r.step(ln(C_MA, 'return left'), 'Left side found it, so return <b>2</b> (index 5 also holds 3 but is larger).', [A('mountain', a, { done: [2], warn: [5] })]);
  ANIM['Find in Mountain Array'] = W('Three searches', C_MA, r.steps);
}

const C_AP = `
int n = arr.length, d = (arr[n - 1] - arr[0]) / n;
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (arr[mid] == arr[0] + mid * d) lo = mid + 1;
    else hi = mid;
}
return arr[0] + lo * d;`;
{
  const a = [5, 7, 11, 13], r = recorder(), d = (13 - 5) / 4; let lo = 0, hi = 3;
  r.step(ln(C_AP, 'int n'), `d = (13 − 5) / 4 = ${d}. Expected: ${a.map((_, i) => 5 + i * d).join(', ')}.`, [A('arr', a), A('expected', a.map((_, i) => 5 + i * d))]);
  while (lo < hi) { const mid = (lo + hi) >> 1, ok = a[mid] === 5 + mid * d; r.step(ln(C_AP, ok ? 'lo = mid + 1' : 'hi = mid;'), `arr[${mid}] = ${a[mid]} ${ok ? '= expected → gap is right' : `≠ ${5 + mid * d} → gap is here or left`}.`, [BA('arr', a, lo, mid, hi, { active: [mid] })], { lo, hi }); if (ok) lo = mid + 1; else hi = mid; }
  r.step(ln(C_AP, 'return'), `Missing <b>${5 + lo * d}</b>.`, [R('answer', [5 + lo * d], { done: [0] })]);
  ANIM['Missing Number In Arithmetic Progression'] = W('Binary search', C_AP, r.steps);
}

const C_2D = `
int mid = (lo + hi) / 2, v = matrix[mid / n][mid % n];
if (v == target) return true;
if (v < target) lo = mid + 1;
else hi = mid - 1;`;
{
  const m = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], t = 3, r = recorder(); let lo = 0, hi = 11;
  while (lo <= hi) { const mid = (lo + hi) >> 1, v = m[Math.floor(mid / 4)][mid % 4]; r.step(ln(C_2D, v === t ? 'return true' : v < t ? 'lo = mid + 1' : 'hi = mid - 1'), `k = ${mid} → cell (${Math.floor(mid / 4)}, ${mid % 4}) = ${v}${v === t ? ' → <b>true</b>' : v < t ? ' < 3' : ' > 3'}.`, [G('matrix', m, [[Math.floor(mid / 4), mid % 4, v === t ? 'done' : 'active']])], { lo, mid, hi }); if (v === t) break; if (v < t) lo = mid + 1; else hi = mid - 1; }
  ANIM['Search a 2D Matrix'] = W('Flattened search', C_2D, r.steps);
}

const C_KW = `
for (int i = 0; i < m; i++) rows[i] = new int[]{soldiers(mat[i]), i};
Arrays.sort(rows, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);`;
{
  const mat = [[1, 1, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 1, 1]], r = recorder(), cnt = mat.map(row => row.indexOf(0) === -1 ? 5 : row.indexOf(0));
  r.step(ln(C_KW, 'soldiers(mat[i])'), `First 0 in each row (binary search): ${cnt.join(', ')}.`, [G('mat', mat, mat.map((_, i) => [i, Math.min(cnt[i], 4), 'warn']))], {});
  const order = [0, 1, 2, 3, 4].sort((p, q) => cnt[p] - cnt[q] || p - q);
  r.step(ln(C_KW, 'Arrays.sort'), `Sort by (count, index): ${order.map(i => `row ${i} (${cnt[i]})`).join(', ')}. k = 3 → <b>[${order.slice(0, 3)}]</b>.`, [R('weakest', order, { done: [0, 1, 2] })]);
  ANIM['The K Weakest Rows in a Matrix'] = W('Count + sort', C_KW, r.steps);
}

const C_SD = `
int j = Collections.binarySearch(p, q[0]);
int ins = -j - 1, best = Integer.MAX_VALUE;
if (ins < p.size()) best = p.get(ins) - q[0];
if (ins > 0) best = Math.min(best, q[0] - p.get(ins - 1));`;
{
  const colors = [1, 1, 2, 1, 3, 2, 2, 3, 3], r = recorder(), pos = { 1: [], 2: [], 3: [] }; colors.forEach((c, i) => pos[c].push(i));
  r.step(0, `Positions: 1 → [${pos[1]}], 2 → [${pos[2]}], 3 → [${pos[3]}].`, [A('colors', colors)]);
  r.step(ln(C_SD, 'int ins'), 'Query (1, 3): insert 1 into [4, 7, 8] at 0 → only the right neighbour 4 → distance <b>3</b>.', [A('colors', colors, { active: [1], done: [4] })]);
  r.step(ln(C_SD, 'best = Math.min'), 'Query (2, 2): 2 is in [2, 5, 6] → distance <b>0</b>.', [A('colors', colors, { done: [2] })]);
  ANIM['Shortest Distance to Target Color'] = W('Lists + binary search', C_SD, r.steps);
}

const C_KC = `
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (x - arr[mid] > arr[mid + k] - x) lo = mid + 1;
    else hi = mid;
}`;
{
  const a = [1, 2, 3, 4, 5, 6, 7, 8], k = 3, x = 6, r = recorder(); let lo = 0, hi = a.length - k;
  while (lo < hi) { const mid = (lo + hi) >> 1, right = x - a[mid] > a[mid + k] - x; r.step(ln(C_KC, right ? 'lo = mid + 1' : 'hi = mid;'), `Window at ${mid}: x − ${a[mid]} = ${x - a[mid]} vs ${a[mid + k]} − x = ${a[mid + k] - x} → ${right ? 'slide right' : 'keep or slide left'}.`, [A('arr', a, { active: range(mid, mid + k - 1), warn: [mid + k] })], { lo, hi }); if (right) lo = mid + 1; else hi = mid; }
  r.step(0, `Window starts at ${lo} → <b>[${a.slice(lo, lo + k)}]</b>.`, [A('arr', a, { done: range(lo, lo + k - 1) })]);
  ANIM['Find K Closest Elements'] = W('Window start search', C_KC, r.steps);
}
