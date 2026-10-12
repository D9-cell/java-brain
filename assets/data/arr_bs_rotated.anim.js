const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const P = (lo, mid, hi, n) => { const p = {}; if (lo >= 0 && lo < n) p[lo] = 'lo'; if (hi >= 0 && hi < n) p[hi] = (p[hi] ? p[hi] + '/' : '') + 'hi'; if (mid !== null && mid >= 0 && mid < n) p[mid] = (p[mid] ? p[mid] + '/' : '') + 'mid'; return p; };
const BA = (name, a, lo, mid, hi, o = {}) => A(name, a, { ptr: P(lo, mid, hi, a.length), ghost: range(0, a.length - 1).filter(i => i < lo || i > hi), ...o });

const C_RS = `
if (nums[mid] == target) return mid;
if (nums[lo] <= nums[mid]) {
    if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
    else lo = mid + 1;
} else {
    if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
    else hi = mid - 1;
}`;
{
  const a = [4, 5, 6, 7, 0, 1, 2], t = 0, r = recorder(); let lo = 0, hi = 6;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (a[mid] === t) { r.step(ln(C_RS, 'return mid'), `nums[${mid}] = 0 → <b>${mid}</b>.`, [BA('nums', a, lo, mid, hi, { done: [mid] })]); break; } const leftSorted = a[lo] <= a[mid]; let msg; if (leftSorted) { const inside = a[lo] <= t && t < a[mid]; msg = `Left half [${a.slice(lo, mid + 1)}] is sorted; 0 ${inside ? 'is' : 'is not'} inside it → go ${inside ? 'left' : 'right'}.`; r.step(ln(C_RS, inside ? 'hi = mid - 1' : 'else lo = mid + 1'), msg, [BA('nums', a, lo, mid, hi, { warn: range(lo, mid) })], { lo, mid, hi }); if (inside) hi = mid - 1; else lo = mid + 1; } else { const inside = a[mid] < t && t <= a[hi]; r.step(ln(C_RS, inside ? 'target <= nums[hi]' : 'else hi = mid - 1'), `Right half [${a.slice(mid, hi + 1)}] is sorted; 0 ${inside ? 'is' : 'is not'} inside → go ${inside ? 'right' : 'left'}.`, [BA('nums', a, lo, mid, hi, { warn: range(mid, hi) })], { lo, mid, hi }); if (inside) lo = mid + 1; else hi = mid - 1; } }
  ANIM['Search in Rotated Sorted Array'] = W('Sorted-half search', C_RS, r.steps);
}

const C_R2 = `
if (nums[mid] == target) return true;
if (nums[lo] == nums[mid] && nums[mid] == nums[hi]) {
    lo++;
    hi--;
}`;
{
  const a = [1, 0, 1, 1, 1], r = recorder();
  r.step(ln(C_R2, 'nums[lo] == nums[mid]'), 'Search 0: nums[lo] = nums[mid] = nums[hi] = 1, so neither half can be trusted.', [BA('nums', a, 0, 2, 4, { warn: [0, 2, 4] })]);
  r.step(ln(C_R2, 'lo++'), 'Drop both ends (they are not the target).', [BA('nums', a, 1, 2, 3)], { lo: 1, hi: 3 });
  r.step(ln(C_R2, 'return true'), 'Now lo = 1, mid = 2: left part [0, 1] holds 0 → found it → <b>true</b>.', [A('nums', a, { done: [1] })]);
  ANIM['Search in Rotated Sorted Array II'] = W('Sorted half + shrink', C_R2, r.steps);
}

const C_FM = `
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
}
return nums[lo];`;
{
  const a = [3, 4, 5, 1, 2], r = recorder(); let lo = 0, hi = 4;
  while (lo < hi) { const mid = (lo + hi) >> 1, right = a[mid] > a[hi]; r.step(ln(C_FM, right ? 'lo = mid + 1' : 'hi = mid;'), `nums[${mid}] = ${a[mid]} ${right ? '>' : '≤'} nums[hi] = ${a[hi]} → drop is ${right ? 'to the right' : 'at mid or left'}.`, [BA('nums', a, lo, mid, hi, { active: [mid, hi] })], { lo, hi }); if (right) lo = mid + 1; else hi = mid; }
  r.step(ln(C_FM, 'return'), `Minimum <b>${a[lo]}</b> at index ${lo}.`, [A('nums', a, { done: [lo] })]);
  ANIM['Find Minimum in Rotated Sorted Array'] = W('Compare with the right end', C_FM, r.steps);
}

const C_F2 = `
if (nums[mid] > nums[hi]) lo = mid + 1;
else if (nums[mid] < nums[hi]) hi = mid;
else hi--;`;
{
  const a = [2, 2, 2, 0, 1, 2], r = recorder(); let lo = 0, hi = 5;
  while (lo < hi) { const mid = (lo + hi) >> 1, c = a[mid] > a[hi] ? 1 : a[mid] < a[hi] ? -1 : 0; r.step(ln(C_F2, c > 0 ? 'lo = mid + 1' : c < 0 ? 'hi = mid;' : 'hi--'), `nums[${mid}] = ${a[mid]} vs nums[hi] = ${a[hi]}: ${c > 0 ? 'bigger → go right' : c < 0 ? 'smaller → hi = mid' : 'equal → drop hi'}.`, [BA('nums', a, lo, mid, hi, { active: [mid, hi] })], { lo, hi }); if (c > 0) lo = mid + 1; else if (c < 0) hi = mid; else hi--; }
  r.step(0, `Minimum <b>${a[lo]}</b>.`, [A('nums', a, { done: [lo] })]);
  ANIM['Find Minimum in Rotated Sorted Array II'] = W('Shrink on ties', C_F2, r.steps);
}

const C_RC = `
if (arr[mid] > arr[hi]) lo = mid + 1;
else hi = mid;
return lo;`;
{
  const a = [15, 18, 2, 3, 6, 12], r = recorder(); let lo = 0, hi = 5;
  while (lo < hi) { const mid = (lo + hi) >> 1, right = a[mid] > a[hi]; r.step(ln(C_RC, right ? 'lo = mid + 1' : 'else hi = mid'), `arr[${mid}] = ${a[mid]} ${right ? '>' : '≤'} ${a[hi]}.`, [BA('arr', a, lo, mid, hi, { active: [mid] })], { lo, hi }); if (right) lo = mid + 1; else hi = mid; }
  r.step(ln(C_RC, 'return lo'), `Minimum at index ${lo} → rotated <b>${lo}</b> times.`, [A('arr', a, { done: [lo] })]);
  ANIM['Find the Rotation Count in Rotated Sorted array'] = W('Index of the minimum', C_RC, r.steps);
}

const C_MD = `
int i = (lo + hi) / 2, j = half - i;
if (aLeft > bRight) hi = i - 1;
else if (bLeft > aRight) lo = i + 1;
else {
    int left = Math.max(aLeft, bLeft);
    if ((m + n) % 2 == 1) return left;
    return (left + (double) Math.min(aRight, bRight)) / 2;
}`;
{
  const a = [1, 3, 8], b = [7, 9, 10, 11], m = 3, n = 4, half = 4, r = recorder(); let lo = 0, hi = m;
  const v = (x, k, side) => side === 'L' ? (k === 0 ? -Infinity : x[k - 1]) : (k === x.length ? Infinity : x[k]);
  while (true) { const i = (lo + hi) >> 1, j = half - i, aL = v(a, i, 'L'), aR = v(a, i, 'R'), bL = v(b, j, 'L'), bR = v(b, j, 'R'); const lane1 = A('a', a, { done: range(0, i - 1), ghost: range(i, m - 1) }), lane2 = A('b', b, { done: range(0, j - 1), ghost: range(j, n - 1) });
    if (aL > bR) { r.step(ln(C_MD, 'hi = i - 1'), `i = ${i}, j = ${j}: aLeft ${aL} > bRight ${bR} → take fewer from a.`, [lane1, lane2], { i, j }); hi = i - 1; }
    else if (bL > aR) { r.step(ln(C_MD, 'lo = i + 1'), `i = ${i}, j = ${j}: bLeft ${bL} > aRight ${aR} → take more from a.`, [lane1, lane2], { i, j }); lo = i + 1; }
    else { const left = Math.max(aL, bL); r.step(ln(C_MD, 'return left;'), `i = ${i}, j = ${j}: borders fit (${aL} ≤ ${bR}, ${bL} ≤ ${aR}). Odd total 7 → median = max(${aL}, ${bL}) = <b>${left}</b>.`, [lane1, lane2], { i, j }); break; } }
  ANIM['Median of Two Sorted Arrays'] = W('Partition binary search', C_MD, r.steps);
}

const C_FP = `
for (int i = 0, j = nums.length - 1; i < j; ) {
    if (nums[i] + nums[j] <= limit) {
        count += j - i;
        i++;
    } else j--;
}`;
{
  const a = [0, 1, 4, 4, 5, 7], r = recorder();
  const run = limit => { let i = 0, j = a.length - 1, c = 0; while (i < j) { if (a[i] + a[j] <= limit) { c += j - i; r.step(ln(C_FP, 'count += j - i'), `limit ${limit}: ${a[i]} + ${a[j]} ≤ ${limit} → ${a[i]} pairs with all ${j - i} elements up to index ${j}. count ${c}.`, [A('sorted', a, { active: [i], warn: range(i + 1, j) })], { count: c }); i++; } else { j--; } } return c; };
  const u = run(6), l = run(2);
  r.step(0, `lower 3, upper 6: ${u} − ${l} = <b>${u - l}</b> fair pairs.`, [R('answer', [u - l], { done: [0] })]);
  ANIM['Count the Number of Fair Pairs'] = W('Two counts', C_FP, r.steps);
}

const C_SP = `
long need = (success + spells[i] - 1) / spells[i];
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (potions[mid] < need) lo = mid + 1;
    else hi = mid;
}
out[i] = m - lo;`;
{
  const sp = [5, 1, 3], po = [1, 2, 3, 4, 5], su = 7, r = recorder();
  sp.forEach(s => { const need = Math.ceil(su / s), lo = po.findIndex(p => p >= need) === -1 ? 5 : po.findIndex(p => p >= need); r.step(ln(C_SP, 'out[i] = m - lo'), `spell ${s}: need potion ≥ ⌈7/${s}⌉ = ${need} → ${5 - lo} potions.`, [A('potions', po, { done: range(lo, 4), ghost: range(0, lo - 1) })], { need, count: 5 - lo }); });
  ANIM['Successful Pairs of Spells and Potions'] = W('Sort + lower bound', C_SP, r.steps);
}

const C_MB = `
for (int i = 0; i < n; i++) best[i] = Math.max(items[i][1], i > 0 ? best[i - 1] : 0);
if (items[mid][0] <= queries[q]) lo = mid + 1;
out[q] = lo == 0 ? 0 : best[lo - 1];`;
{
  const items = [[1, 2], [2, 4], [2, 5], [3, 2], [5, 6]], r = recorder(), best = []; items.forEach((it, i) => best.push(Math.max(it[1], i ? best[i - 1] : 0)));
  r.step(ln(C_MB, 'best[i] = Math.max'), `Sorted by price: ${items.map(x => `(${x})`).join(' ')}. Running max beauty: [${best}].`, [A('price', items.map(x => x[0])), A('best', best)]);
  for (const q of [1, 2, 4, 6]) { const lo = items.filter(x => x[0] <= q).length; r.step(ln(C_MB, 'out[q]'), `query ${q}: ${lo} affordable items → ${lo ? best[lo - 1] : 0}.`, [A('best', best, { done: lo ? [lo - 1] : [], ghost: range(lo, 4) })]); }
  ANIM['Most Beautiful Item for Each Query'] = W('Prefix max + search', C_MB, r.steps);
}

const C_PA = `
for (int i = 1; i < n; i++) jobs[i][1] = Math.max(jobs[i][1], jobs[i - 1][1]);
if (jobs[mid][0] <= w) lo = mid + 1;
if (lo > 0) total += jobs[lo - 1][1];`;
{
  const diff = [2, 4, 6, 8, 10], prof = [10, 20, 30, 40, 50], workers = [4, 5, 6, 7], r = recorder(); let total = 0;
  r.step(ln(C_PA, 'jobs[i][1] = Math.max'), 'Jobs sorted by difficulty; profit is already increasing here.', [A('difficulty', diff), A('best profit', prof)]);
  for (const w of workers) { const lo = diff.filter(d => d <= w).length; total += lo ? prof[lo - 1] : 0; r.step(ln(C_PA, 'total +='), `worker ${w}: hardest doable job has difficulty ${diff[lo - 1]} → +${prof[lo - 1]}, total ${total}.`, [A('best profit', prof, { done: [lo - 1], ghost: range(lo, 4) })], { total }); }
  ANIM['Most Profit Assigning Work'] = W('Prefix max + search', C_PA, r.steps);
}

const C_FB = `
for (int i = 0; i < people.length; i++) out[i] = countAtMost(start, people[i]) - countAtMost(end, people[i] - 1);`;
{
  const fl = [[1, 6], [3, 7], [9, 12], [4, 13]], st = fl.map(f => f[0]).sort((a, b) => a - b), en = fl.map(f => f[1]).sort((a, b) => a - b), r = recorder();
  r.step(0, `Starts [${st}], ends [${en}].`, [A('start', st), A('end', en)]);
  for (const t of [2, 3, 7, 11]) { const s = st.filter(x => x <= t).length, e = en.filter(x => x <= t - 1).length; r.step(ln(C_FB, 'countAtMost'), `t = ${t}: ${s} started, ${e} ended before → <b>${s - e}</b> in bloom.`, [A('start', st, { done: range(0, s - 1) }), A('end', en, { bad: range(0, e - 1) })]); }
  ANIM['Number of Flowers in Full Bloom'] = W('Sorted starts and ends', C_FB, r.steps);
}

const C_AF = `
if (rains[i] == 0) {
    dryDays.add(i);
    ans[i] = 1;
    continue;
}
if (lastRain.containsKey(lake)) {
    Integer day = dryDays.ceiling(lastRain.get(lake));
    if (day == null) return new int[0];
    ans[day] = lake;
    dryDays.remove(day);
}
lastRain.put(lake, i);`;
{
  const rains = [1, 2, 0, 0, 2, 1], r = recorder(), ans = Array(6).fill(''), last = {}, dry = [];
  rains.forEach((lake, i) => { if (!lake) { dry.push(i); ans[i] = '?'; r.step(ln(C_AF, 'dryDays.add'), `Day ${i}: dry day, keep it in reserve.`, [A('rains', rains, { active: [i] }), A('plan', ans.slice()), R('free dry days', dry.slice())]); return; } ans[i] = -1; if (last[lake] !== undefined) { const k = dry.findIndex(d => d > last[lake]); const day = dry[k]; dry.splice(k, 1); ans[day] = lake; r.step(ln(C_AF, 'ans[day] = lake'), `Day ${i}: lake ${lake} is full (rained on day ${last[lake]}). Use dry day ${day}, the first after ${last[lake]}, to empty it.`, [A('rains', rains, { active: [i], done: [day] }), A('plan', ans.slice()), R('free dry days', dry.slice())]); } else r.step(ln(C_AF, 'lastRain.put'), `Day ${i}: rain fills lake ${lake}.`, [A('rains', rains, { active: [i] }), A('plan', ans.slice())]); last[lake] = i; });
  ANIM['Avoid Flood in The City'] = W('Greedy with TreeSet', C_AF, r.steps);
}

const C_FS = `
while (cost(nums, pre, l, r) > k) l++;
best = Math.max(best, r - l + 1);
int m = (l + r) / 2;
long left = med * (m - l) - (pre[m] - pre[l]);
long right = (pre[r + 1] - pre[m + 1]) - med * (r - m);`;
{
  const a = [1, 2, 4, 6], k = 3, r = recorder(), cost = (l, rr) => { const m = (l + rr) >> 1; let c = 0; for (let i = l; i <= rr; i++) c += Math.abs(a[i] - a[m]); return c; }; let l = 0, best = 0;
  for (let rr = 0; rr < a.length; rr++) { while (cost(l, rr) > k) l++; best = Math.max(best, rr - l + 1); r.step(ln(C_FS, 'best = Math.max'), `Window [${a.slice(l, rr + 1)}]: median ${a[(l + rr) >> 1]}, cost ${cost(l, rr)} ≤ 3 → size ${rr - l + 1}.`, [A('sorted', a, { active: range(l, rr), warn: [(l + rr) >> 1] })], { l, r: rr, best }); }
  r.step(0, `Answer <b>${best}</b>.`, [R('answer', [best], { done: [0] })]);
  ANIM['Apply Operations to Maximize Frequency Score'] = W('Window + median cost', C_FS, r.steps);
}

const C_MF = `
for (int d = 0; d <= k; d++) {
    int leftTurn = startPos - d, rightAfter = startPos + Math.max(0, k - 2 * d);
    best = Math.max(best, sum(pos, pre, leftTurn, rightAfter));
    int rightTurn = startPos + d, leftAfter = startPos - Math.max(0, k - 2 * d);
    best = Math.max(best, sum(pos, pre, leftAfter, rightTurn));
}`;
{
  const fr = [[2, 8], [6, 3], [8, 6]], start = 5, k = 4, r = recorder(), sum = (lo, hi) => fr.filter(f => f[0] >= lo && f[0] <= hi).reduce((s, f) => s + f[1], 0); let best = 0;
  r.step(0, 'Fruits at 2 (8), 6 (3), 8 (6). Start 5, k = 4.', [A('positions', fr.map(f => f[0])), A('fruit', fr.map(f => f[1]))]);
  for (const d of [0, 1, 2]) { const a1 = sum(start - d, start + Math.max(0, k - 2 * d)), a2 = sum(start - Math.max(0, k - 2 * d), start + d); best = Math.max(best, a1, a2); r.step(ln(C_MF, 'best = Math.max(best, sum(pos, pre, leftAfter'), `d = ${d}: left-first covers [${start - d}, ${start + Math.max(0, k - 2 * d)}] → ${a1}; right-first covers [${start - Math.max(0, k - 2 * d)}, ${start + d}] → ${a2}.`, [R('best', [best])], { d, best }); }
  r.step(0, `Answer <b>${best}</b>: go right to 6 then 8.`, [R('answer', [best], { done: [0] })]);
  ANIM['Maximum Fruits Harvested After at Most K Steps'] = W('Enumerate the turn', C_MF, r.steps);
}
