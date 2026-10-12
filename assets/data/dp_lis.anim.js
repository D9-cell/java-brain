const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const range = (a, b) => idx(Math.max(0, b - a + 1)).map(x => x + a);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const lower = (t, n, x) => { let lo = 0, hi = n; while (lo < hi) { const m = (lo + hi) >> 1; if (t[m] < x) lo = m + 1; else hi = m; } return lo; };
const upper = (t, n, x) => { let lo = 0, hi = n; while (lo < hi) { const m = (lo + hi) >> 1; if (t[m] <= x) lo = m + 1; else hi = m; } return lo; };

const C_LIS1 = `
for (int i = 0; i < nums.length; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++)
        if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    best = Math.max(best, dp[i]);
}
return best;`;
const C_LIS2 = `
for (int x : nums) {
    int pos = lowerBound(tails, size, x);
    tails[pos] = x;
    if (pos == size) size++;
}
return size;`;
{
  const a = [10, 9, 2, 5, 3, 7, 101, 18], n = a.length, r1 = recorder(), dp = [];
  r1.step(0, 'nums = [10,9,2,5,3,7,101,18]. dp[i] = longest increasing subsequence ending at i.', [A('nums', a)]);
  for (let i = 0; i < n; i++) { let v = 1, from = -1; for (let j = 0; j < i; j++) if (a[j] < a[i] && dp[j] + 1 > v) { v = dp[j] + 1; from = j; } dp.push(v); r1.step(ln(C_LIS1, 'dp[i] = Math.max'), from < 0 ? `i = ${i} (${a[i]}): nothing smaller before it, dp = 1.` : `i = ${i} (${a[i]}): extend j = ${from} (${a[from]}, dp ${dp[from]}) → dp = ${v}.`, [A('nums', a, { active: [i], done: from < 0 ? [] : [from] }), A('dp', dp, { active: [i] })]); }
  r1.step(ln(C_LIS1, 'return best'), `Answer <b>${Math.max(...dp)}</b>, e.g. 2, 3, 7, 18.`, [A('dp', dp, { done: [dp.indexOf(Math.max(...dp))] })]);
  const r2 = recorder(), tails = []; let size = 0;
  r2.step(0, 'tails[k] = smallest tail of any increasing subsequence of length k + 1. It stays sorted.', [A('nums', a), R('tails', [])]);
  for (let i = 0; i < n; i++) { const pos = lower(tails, size, a[i]); const rep = pos < size; tails[pos] = a[i]; if (pos === size) size++; r2.step(ln(C_LIS2, 'tails[pos] = x'), `${a[i]}: first tail ≥ ${a[i]} is slot ${pos} → ${rep ? 'replace it (a smaller tail is easier to extend)' : 'append, longest so far'}.`, [A('nums', a, { active: [i] }), R('tails', tails.slice(0, size), { active: [pos] })]); }
  r2.step(ln(C_LIS2, 'return size'), `Answer = size = <b>${size}</b>. tails is not the subsequence itself.`, [R('tails', tails.slice(0, size), { done: idx(size) })]);
  ANIM['Longest Increasing Subsequence'] = [...W('Chain DP', C_LIS1, r1.steps), ...W('Tails + binary search', C_LIS2, r2.steps)];
}

const C_NLIS = `
for (int j = 0; j < i; j++) {
    if (nums[j] >= nums[i]) continue;
    if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
    else if (len[j] + 1 == len[i]) cnt[i] += cnt[j];
}`;
{
  const a = [1, 3, 5, 4, 7], n = 5, r = recorder(), len = [], cnt = [];
  r.step(0, 'nums = [1,3,5,4,7]. Track length and number of ways for each ending index.', [A('nums', a)]);
  for (let i = 0; i < n; i++) { let L = 1, c = 1; for (let j = 0; j < i; j++) { if (a[j] >= a[i]) continue; if (len[j] + 1 > L) { L = len[j] + 1; c = cnt[j]; } else if (len[j] + 1 === L) c += cnt[j]; } len.push(L); cnt.push(c); r.step(ln(C_NLIS, 'cnt[i] += cnt[j]'), `i = ${i} (${a[i]}): best length ${L} reached in ${c} way${c > 1 ? 's' : ''}.`, [A('nums', a, { active: [i] }), A('len', len, { active: [i] }), A('cnt', cnt, { active: [i] })]); }
  const best = Math.max(...len), ways = len.reduce((s, l, i) => s + (l === best ? cnt[i] : 0), 0);
  r.step(0, `Longest length ${best}; sum cnt where len = ${best}: <b>${ways}</b> (1,3,4,7 and 1,3,5,7).`, [A('len', len, { done: idx(n).filter(i => len[i] === best) }), A('cnt', cnt, { done: idx(n).filter(i => len[i] === best) })]);
  ANIM['Number of Longest Increasing Subsequence'] = W('Length + count', C_NLIS, r.steps);
}

const C_RUS = `
Arrays.sort(envelopes, (a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);
for (int[] e : envelopes) {
    int pos = lowerBound(tails, size, e[1]);
    tails[pos] = e[1];
    if (pos == size) size++;
}
return size;`;
{
  const env = [[5, 4], [6, 4], [6, 7], [2, 3]], r = recorder();
  const sorted = env.slice().sort((p, q) => p[0] !== q[0] ? p[0] - q[0] : q[1] - p[1]), hs = sorted.map(e => e[1]), tails = []; let size = 0;
  r.step(0, 'Envelopes (w,h): (5,4) (6,4) (6,7) (2,3).', [R('envelopes', env)]);
  r.step(ln(C_RUS, 'Arrays.sort'), 'Sort by width ascending, ties by height <b>descending</b>: (2,3) (5,4) (6,7) (6,4).', [R('sorted', sorted), A('heights', hs)]);
  hs.forEach((h, i) => { const pos = lower(tails, size, h); tails[pos] = h; if (pos === size) size++; r.step(ln(C_RUS, 'tails[pos] = e[1]'), `Height ${h}: slot ${pos}${i === 3 ? ' (replaces 7 with 4: (6,7) and (6,4) cannot both be used)' : ''}.`, [A('heights', hs, { active: [i] }), R('tails', tails.slice(0, size), { active: [pos] })]); });
  r.step(ln(C_RUS, 'return size'), `Answer <b>${size}</b>: (2,3) → (5,4) → (6,7).`, [R('tails', tails.slice(0, size), { done: idx(size) })]);
  ANIM['Russian Doll Envelopes'] = W('Sort + tails', C_RUS, r.steps);
}

const C_OBS = `
for (int i = 0; i < n; i++) {
    int pos = upperBound(tails, size, obstacles[i]);
    tails[pos] = obstacles[i];
    if (pos == size) size++;
    res[i] = pos + 1;
}`;
{
  const a = [1, 2, 3, 2], r = recorder(), tails = [], res = []; let size = 0;
  r.step(0, 'obstacles = [1,2,3,2]. Non-decreasing LIS ending at each i.', [A('obstacles', a)]);
  a.forEach((x, i) => { const pos = upper(tails, size, x); tails[pos] = x; if (pos === size) size++; res.push(pos + 1); r.step(ln(C_OBS, 'res[i] = pos + 1'), `${x}: first tail > ${x} is slot ${pos}, so the course ending here has length ${pos + 1}.`, [A('obstacles', a, { active: [i] }), R('tails', tails.slice(0, size), { active: [pos] }), A('res', res, { active: [i] })]); });
  r.step(0, `Answer <b>[${res}]</b>. The last 2 can follow 1, 2 (equal allowed) but not 3.`, [A('res', res, { done: idx(res.length) })]);
  ANIM['Find the Longest Valid Obstacle Course at Each Position'] = W('Tails with upper bound', C_OBS, r.steps);
}

const C_PAIR = `
Arrays.sort(pairs, (a, b) -> a[1] - b[1]);
for (int[] p : pairs)
    if (p[0] > end) { count++; end = p[1]; }
return count;`;
{
  const pairs = [[1, 6], [2, 3], [4, 5], [7, 8]], r = recorder(), sorted = pairs.slice().sort((p, q) => p[1] - q[1]); let end = -Infinity, count = 0; const taken = [], skipped = [];
  r.step(0, 'pairs = (1,6) (2,3) (4,5) (7,8).', [R('pairs', pairs)]);
  r.step(ln(C_PAIR, 'Arrays.sort'), 'Sort by right end: (2,3) (4,5) (1,6) (7,8).', [R('sorted', sorted)]);
  sorted.forEach((p, i) => { if (p[0] > end) { count++; end = p[1]; taken.push(i); } else skipped.push(i); r.step(ln(C_PAIR, 'if (p[0] > end)'), taken.includes(i) ? `(${p}) starts after end → take it, end = ${end}.` : `(${p}) starts at ${p[0]} ≤ ${end} → skip.`, [R('sorted', sorted, { active: [i], done: taken.filter(t => t !== i), ghost: skipped.filter(t => t !== i), bad: skipped.includes(i) ? [i] : [] })]); });
  r.step(ln(C_PAIR, 'return count'), `Answer <b>${count}</b>.`, [R('sorted', sorted, { done: taken, ghost: skipped })]);
  ANIM['Maximum Length of Pair Chain'] = W('Greedy by end', C_PAIR, r.steps);
}

const C_CHAIN = `
Arrays.sort(words, (a, b) -> a.length() - b.length());
for (String w : words) {
    int cur = 1;
    for (int i = 0; i < w.length(); i++) {
        String prev = w.substring(0, i) + w.substring(i + 1);
        cur = Math.max(cur, best.getOrDefault(prev, 0) + 1);
    }
    best.put(w, cur);
}`;
{
  const words = ['a', 'b', 'ba', 'bca', 'bda', 'bdca'], r = recorder(), best = {}, shown = [];
  r.step(ln(C_CHAIN, 'Arrays.sort'), 'Words sorted by length: a b ba bca bda bdca. best[w] = longest chain ending at w.', [R('words', words)]);
  words.forEach((w, i) => { let cur = 1, via = null; for (let k = 0; k < w.length; k++) { const p = w.slice(0, k) + w.slice(k + 1); if ((best[p] || 0) + 1 > cur) { cur = best[p] + 1; via = p; } } best[w] = cur; shown.push(`${w}:${cur}`); r.step(ln(C_CHAIN, 'best.put(w, cur)'), via ? `"${w}": deleting a letter gives "${via}" (chain ${best[via]}) → ${cur}.` : `"${w}": no predecessor in the map → 1.`, [R('words', words, { active: [i] }), R('best', shown.slice(), { active: [shown.length - 1] })]); });
  r.step(0, `Answer <b>${Math.max(...Object.values(best))}</b>: a → ba → bda → bdca.`, [R('best', shown, { done: [shown.length - 1] })]);
  ANIM['Longest String Chain'] = W('Sort + hash map', C_CHAIN, r.steps);
}

const C_DIV = `
Arrays.sort(nums);
for (int i = 0; i < n; i++) {
    dp[i] = 1; prev[i] = -1;
    for (int j = 0; j < i; j++)
        if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; prev[i] = j; }
}
for (int i = bestEnd; i >= 0; i = prev[i]) res.addFirst(nums[i]);`;
{
  const a = [1, 2, 3, 4, 8], n = 5, r = recorder(), dp = [], prev = []; let end = 0;
  r.step(ln(C_DIV, 'Arrays.sort'), 'Sorted nums = [1,2,3,4,8]. dp[i] = longest divisible chain ending at i.', [A('nums', a)]);
  for (let i = 0; i < n; i++) { let v = 1, p = -1; for (let j = 0; j < i; j++) if (a[i] % a[j] === 0 && dp[j] + 1 > v) { v = dp[j] + 1; p = j; } dp.push(v); prev.push(p); if (v > dp[end]) end = i; r.step(ln(C_DIV, 'prev[i] = j'), p < 0 ? `${a[i]}: nothing divides it yet except itself → 1.` : `${a[i]}: best predecessor ${a[p]} (dp ${dp[p]}) → ${v}.`, [A('nums', a, { active: [i], done: p < 0 ? [] : [p] }), A('dp', dp, { active: [i] }), A('prev', prev, { active: [i] })]); }
  const chain = []; for (let i = end; i >= 0; i = prev[i]) chain.unshift(a[i]);
  r.step(ln(C_DIV, 'for (int i = bestEnd'), `Walk prev from index ${end}: <b>[${chain}]</b>.`, [R('answer', chain, { done: idx(chain.length) })]);
  ANIM['Largest Divisible Subset'] = W('Chain DP + prev', C_DIV, r.steps);
}

const C_IDEAL = `
for (char ch : s.toCharArray()) {
    int c = ch - 'a', cur = 1;
    for (int p = Math.max(0, c - k); p <= Math.min(25, c + k); p++)
        cur = Math.max(cur, best[p] + 1);
    best[c] = cur;
}`;
{
  const s = 'acfgbd', k = 2, best = Array(26).fill(0), r = recorder(), cur = [];
  r.step(0, 's = "acfgbd", k = 2. best[letter] = longest ideal subsequence ending in that letter.', [A('s', [...s])]);
  [...s].forEach((ch, i) => { const c = ch.charCodeAt(0) - 97; let v = 1, from = null; for (let p = Math.max(0, c - k); p <= Math.min(25, c + k); p++) if (best[p] + 1 > v) { v = best[p] + 1; from = String.fromCharCode(97 + p); } best[c] = v; cur.push(v); r.step(ln(C_IDEAL, 'best[c] = cur'), from ? `'${ch}': letters ${String.fromCharCode(97 + Math.max(0, c - k))}..${String.fromCharCode(97 + Math.min(25, c + k))} are allowed; best is '${from}' → ${v}.` : `'${ch}': nothing in range yet → 1.`, [A('s', [...s], { active: [i] }), A('len ending here', cur, { active: [i] })]); });
  r.step(0, `Answer <b>${Math.max(...cur)}</b>, e.g. "acbd".`, [A('len ending here', cur, { done: [cur.indexOf(Math.max(...cur))] })]);
  ANIM['Longest Ideal Subsequence'] = W('Best per letter', C_IDEAL, r.steps);
}

const C_MTN = `
for (int i = 0; i < n; i++)            // inc[i] = LIS ending at i
    for (int j = 0; j < i; j++) if (nums[j] < nums[i]) inc[i] = Math.max(inc[i], inc[j] + 1);
for (int i = n - 1; i >= 0; i--)       // dec[i] = longest decreasing run starting at i
    for (int j = n - 1; j > i; j--) if (nums[j] < nums[i]) dec[i] = Math.max(dec[i], dec[j] + 1);
for (int i = 1; i < n - 1; i++)
    if (inc[i] > 1 && dec[i] > 1) keep = Math.max(keep, inc[i] + dec[i] - 1);
return n - keep;`;
{
  const a = [2, 1, 1, 5, 6, 2, 3, 1], n = 8, r = recorder(), inc = Array(n).fill(1), dec = Array(n).fill(1);
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (a[j] < a[i]) inc[i] = Math.max(inc[i], inc[j] + 1);
  for (let i = n - 1; i >= 0; i--) for (let j = n - 1; j > i; j--) if (a[j] < a[i]) dec[i] = Math.max(dec[i], dec[j] + 1);
  r.step(0, 'nums = [2,1,1,5,6,2,3,1]. Remove the fewest elements to leave a mountain.', [A('nums', a)]);
  r.step(ln(C_MTN, 'inc[i] = Math.max'), 'inc[i]: longest increasing subsequence that ends at i.', [A('nums', a), A('inc', inc)]);
  r.step(ln(C_MTN, 'dec[i] = Math.max'), 'dec[i]: longest decreasing subsequence that starts at i.', [A('nums', a), A('inc', inc), A('dec', dec)]);
  let keep = 0, bi = -1; for (let i = 1; i < n - 1; i++) if (inc[i] > 1 && dec[i] > 1 && inc[i] + dec[i] - 1 > keep) { keep = inc[i] + dec[i] - 1; bi = i; }
  r.step(ln(C_MTN, 'keep = Math.max'), `Peak at index ${bi} (${a[bi]}): inc ${inc[bi]} + dec ${dec[bi]} − 1 = ${keep} kept.`, [A('inc', inc, { done: [bi] }), A('dec', dec, { done: [bi] })]);
  r.step(ln(C_MTN, 'return n - keep'), `Answer 8 − ${keep} = <b>${n - keep}</b>.`, [R('answer', [n - keep], { done: [0] })]);
  ANIM['Minimum Number of Removals to Make Mountain Array'] = W('Two LIS passes', C_MTN, r.steps);
}

const C_COLS = `
for (int j = 0; j < cols; j++) {
    dp[j] = 1;
    for (int i = 0; i < j; i++)
        if (before(strs, i, j)) dp[j] = Math.max(dp[j], dp[i] + 1);
}
return cols - best;`;
{
  const strs = ['babca', 'bbazb'], cols = 5, r = recorder(), dp = [];
  const colTxt = j => strs.map(s => s[j]).join('');
  const before = (i, j) => strs.every(s => s[i] <= s[j]);
  r.step(0, 'strs = ["babca","bbazb"]. Each column is one element; keep the longest chain of columns that is ≤ in every row.', [R('columns', idx(cols).map(colTxt))]);
  for (let j = 0; j < cols; j++) { let v = 1, from = -1; for (let i = 0; i < j; i++) if (before(i, j) && dp[i] + 1 > v) { v = dp[i] + 1; from = i; } dp.push(v); r.step(ln(C_COLS, 'dp[j] = Math.max'), from < 0 ? `Column ${j} "${colTxt(j)}": no earlier column fits in every row → 1.` : `Column ${j} "${colTxt(j)}": follows column ${from} "${colTxt(from)}" → ${v}.`, [R('columns', idx(cols).map(colTxt), { active: [j], done: from < 0 ? [] : [from] }), A('dp', dp, { active: [j] })]); }
  r.step(ln(C_COLS, 'return cols'), `Answer 5 − ${Math.max(...dp)} = <b>${5 - Math.max(...dp)}</b> deleted columns.`, [A('dp', dp, { done: [dp.indexOf(Math.max(...dp))] })]);
  ANIM['Delete Columns to Make Sorted III'] = W('LIS over columns', C_COLS, r.steps);
}

const C_V1 = `
for (int x : nums) {
    int p = x & 1;
    if (p == 0) even++; else odd++;
    if (p != last) { alt++; last = p; }
}
return Math.max(alt, Math.max(even, odd));`;
{
  const a = [1, 2, 1, 1, 2, 1, 2], r = recorder(); let even = 0, odd = 0, alt = 0, last = -1;
  r.step(0, 'nums = [1,2,1,1,2,1,2]. Three shapes: all even, all odd, alternating parity.', [A('nums', a)]);
  a.forEach((x, i) => { if (x % 2 === 0) even++; else odd++; if (x % 2 !== last) { alt++; last = x % 2; } r.step(ln(C_V1, 'if (p != last)'), `${x} is ${x % 2 ? 'odd' : 'even'}: even ${even}, odd ${odd}, alternating ${alt}.`, [A('nums', a, { active: [i] }), R('counters [even, odd, alt]', [even, odd, alt], { active: [2] })]); });
  r.step(ln(C_V1, 'return'), `Answer max(${alt}, ${even}, ${odd}) = <b>${Math.max(alt, even, odd)}</b>.`, [R('counters [even, odd, alt]', [even, odd, alt], { done: [2] })]);
  ANIM['Find the Maximum Length of Valid Subsequence I'] = W('Three counters', C_V1, r.steps);
}

const C_V2 = `
for (int x : nums) {
    int r = x % k;
    for (int s = 0; s < k; s++) {
        int prev = ((s - r) % k + k) % k;
        dp[r][s] = Math.max(dp[r][s], dp[prev][s] + 1);
    }
}`;
{
  const a = [1, 4, 2, 3, 1, 4], k = 3, r = recorder(), dp = Array.from({ length: k }, () => Array(k).fill(0)), lab = { rowLabels: ['r=0', 'r=1', 'r=2'], colLabels: ['s=0', 's=1', 's=2'] };
  r.step(0, 'nums = [1,4,2,3,1,4], k = 3. dp[r][s]: longest subsequence ending in residue r whose adjacent sums are all ≡ s.', [A('nums', a), G('dp', dp, [], lab)]);
  a.forEach((x, i) => { const rr = x % k; for (let s = 0; s < k; s++) { const prev = ((s - rr) % k + k) % k; dp[rr][s] = Math.max(dp[rr][s], dp[prev][s] + 1); } r.step(ln(C_V2, 'dp[r][s] = Math.max'), `${x} (residue ${rr}): row ${rr} becomes 1 + the cell at residue (s − ${rr}) mod 3 for each s.`, [A('nums', a, { active: [i] }), G('dp', dp.map(q => q.slice()), range(0, k - 1).map(s => [rr, s, 'active']), lab)]); });
  const best = Math.max(...dp.flat());
  r.step(0, `Largest cell = <b>${best}</b>.`, [G('dp', dp, dp.flatMap((row, a2) => row.map((v, b2) => v === best ? [a2, b2, 'done'] : null)).filter(Boolean), lab)]);
  ANIM['Find the Maximum Length of Valid Subsequence II'] = W('Residue table', C_V2, r.steps);
}

const C_GRP = `
for (int i = 0; i < n; i++) {
    dp[i] = 1; prev[i] = -1;
    for (int j = 0; j < i; j++)
        if (groups[i] != groups[j] && hamming1(words[i], words[j]) && dp[j] + 1 > dp[i]) {
            dp[i] = dp[j] + 1; prev[i] = j;
        }
}`;
{
  const words = ['bab', 'dab', 'cab'], groups = [1, 2, 2], r = recorder(), dp = [], prev = [];
  const h1 = (x, y) => x.length === y.length && [...x].filter((c, i) => c !== y[i]).length === 1;
  r.step(0, 'words = [bab, dab, cab], groups = [1,2,2].', [A('words', words), A('groups', groups)]);
  words.forEach((w, i) => { let v = 1, p = -1; for (let j = 0; j < i; j++) if (groups[i] !== groups[j] && h1(w, words[j]) && dp[j] + 1 > v) { v = dp[j] + 1; p = j; } dp.push(v); prev.push(p); r.step(ln(C_GRP, 'dp[i] = dp[j] + 1'), p < 0 ? `"${w}": nobody before it qualifies → 1.` : `"${w}" follows "${words[p]}" (other group, one letter apart) → ${v}.`, [A('words', words, { active: [i], done: p < 0 ? [] : [p] }), A('dp', dp, { active: [i] }), A('prev', prev, { active: [i] })]); });
  r.step(0, 'Answer: <b>["bab","dab"]</b> (cab has the same group as dab, so it cannot follow it).', [R('answer', ['bab', 'dab'], { done: [0, 1] })]);
  ANIM['Longest Unequal Adjacent Groups Subsequence II'] = W('Chain DP + prev', C_GRP, r.steps);
}

const C_BAL = `
for (int i = 0; i < n; i++) keys[i] = nums[i] - i;
for (int i = 0; i < n; i++) {
    int pos = Arrays.binarySearch(sorted, keys[i]) + 1;
    long cur = nums[i] + Math.max(0, query(tree, pos));
    update(tree, pos, cur);
    ans = Math.max(ans, cur);
}`;
{
  const a = [3, 3, 5, 6], n = 4, r = recorder(), keys = a.map((x, i) => x - i), dp = [];
  r.step(ln(C_BAL, 'keys[i] = nums[i] - i'), 'nums = [3,3,5,6] → keys nums[i] − i = [3,2,3,3]. A balanced subsequence needs non-decreasing keys.', [A('nums', a), A('keys', keys)]);
  for (let i = 0; i < n; i++) { let best = 0, from = -1; for (let j = 0; j < i; j++) if (keys[j] <= keys[i] && dp[j] > best) { best = dp[j]; from = j; } dp.push(a[i] + best); r.step(ln(C_BAL, 'long cur'), from < 0 ? `i = ${i}: no earlier key ≤ ${keys[i]} worth taking → dp = ${a[i]}.` : `i = ${i}: best earlier dp with key ≤ ${keys[i]} is ${best} (index ${from}) → ${a[i]} + ${best} = ${dp[i]}.`, [A('keys', keys, { active: [i], done: from < 0 ? [] : [from] }), A('dp', dp, { active: [i] })]); }
  r.step(0, `Answer <b>${Math.max(...dp)}</b> (3 + 5 + 6). The Fenwick tree makes each "best earlier" an O(log n) prefix maximum.`, [A('dp', dp, { done: [n - 1] })]);
  ANIM['Maximum Balanced Subsequence Sum'] = W('Fenwick tree', C_BAL, r.steps);
}

const C_BUILD = `
for (int len = 2; len <= n; len++)
    for (int mx = 1; mx <= m; mx++)
        for (int cost = 1; cost <= k; cost++) {
            long ways = dp[len - 1][mx][cost] * mx % MOD;
            for (int prev = 1; prev < mx; prev++) ways += dp[len - 1][prev][cost - 1];
            dp[len][mx][cost] = ways % MOD;
        }`;
{
  const n = 3, m = 3, k = 2, r = recorder(), dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => Array(k + 1).fill(0)));
  for (let v = 1; v <= m; v++) dp[1][v][1] = 1;
  const view = c => dp.slice(1).map(row => row.slice(1).map(x => x[c]));
  const lab = { rowLabels: ['len 1', 'len 2', 'len 3'], colLabels: ['max 1', 'max 2', 'max 3'] };
  r.step(0, 'n = 3, m = 3, k = 2. Cell = arrays of that length and maximum with exactly <i>cost</i> updates. Length 1: one update.', [G('cost 1', view(1), [], lab), G('cost 2', view(2), [], lab)]);
  for (let len = 2; len <= n; len++) { for (let mx = 1; mx <= m; mx++) for (let c = 1; c <= k; c++) { let w = dp[len - 1][mx][c] * mx; for (let p = 1; p < mx; p++) w += dp[len - 1][p][c - 1]; dp[len][mx][c] = w; } r.step(ln(C_BUILD, 'dp[len][mx][cost] = ways'), `Length ${len}: keep the max (× max choices, same cost) or add a new bigger max (cost + 1).`, [G('cost 1', view(1), range(0, m - 1).map(c => [len - 1, c, 'active']), lab), G('cost 2', view(2), range(0, m - 1).map(c => [len - 1, c, 'active']), lab)]); }
  const total = dp[n].reduce((s, x) => s + x[k], 0);
  r.step(0, `Sum of the cost-2 column at length 3: <b>${total}</b>.`, [G('cost 2', view(2), range(0, m - 1).map(c => [n - 1, c, 'done']), lab)]);
  ANIM['Build Array Where You Can Find The Maximum Exactly K Comparisons'] = W('3-D DP', C_BUILD, r.steps);
}

const C_GIVEN = `
for (int x : arr) {
    int cur = len.getOrDefault(x - diff, 0) + 1;
    len.put(x, cur);
    ans = Math.max(ans, cur);
}`;
{
  const a = [1, 5, 7, 8, 5, 3, 4, 2, 1], diff = -2, r = recorder(), len = {}; let ans = 0;
  r.step(0, 'arr = [1,5,7,8,5,3,4,2,1], diff = −2. len[v] = longest run ending in value v.', [A('arr', a)]);
  a.forEach((x, i) => { const cur = (len[x - diff] || 0) + 1; len[x] = cur; ans = Math.max(ans, cur); r.step(ln(C_GIVEN, 'len.put'), `${x}: look up ${x - diff} → ${len[x - diff] !== undefined && cur > 1 ? 'found, ' : 'none, '}len[${x}] = ${cur}.`, [A('arr', a, { active: [i] }), R('len map', Object.entries(len).map(([v, l]) => `${v}:${l}`), { active: [Object.keys(len).indexOf(String(x))] })]); });
  r.step(0, `Answer <b>${ans}</b>: 7, 5, 3, 1.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Longest Arithmetic Subsequence of Given Difference'] = W('Hash map', C_GIVEN, r.steps);
}

const C_ARITH = `
for (int i = 1; i < n; i++)
    for (int j = 0; j < i; j++) {
        int d = nums[i] - nums[j] + 500;
        dp[i][d] = Math.max(dp[i][d], dp[j][d] > 0 ? dp[j][d] + 1 : 2);
        ans = Math.max(ans, dp[i][d]);
    }`;
{
  const a = [9, 4, 7, 2, 10], r = recorder(), dp = a.map(() => ({})); let ans = 2;
  r.step(0, 'nums = [9,4,7,2,10]. dp[i][d] = longest arithmetic subsequence ending at i with difference d.', [A('nums', a)]);
  for (let i = 1; i < a.length; i++) { const notes = []; for (let j = 0; j < i; j++) { const d = a[i] - a[j]; dp[i][d] = Math.max(dp[i][d] || 0, dp[j][d] ? dp[j][d] + 1 : 2); ans = Math.max(ans, dp[i][d]); if (dp[i][d] > 2) notes.push(`d=${d} → ${dp[i][d]}`); } r.step(ln(C_ARITH, 'ans = Math.max'), notes.length ? `i = ${i} (${a[i]}): ${notes.join(', ')}.` : `i = ${i} (${a[i]}): only pairs (length 2).`, [A('nums', a, { active: [i] }), R(`dp[${i}] (diff:len)`, Object.entries(dp[i]).map(([d, l]) => `${d}:${l}`))]); }
  r.step(0, `Answer <b>${ans}</b>: 4, 7, 10 (difference 3).`, [R('answer', [ans], { done: [0] })]);
  ANIM['Longest Arithmetic Subsequence'] = W('dp[i][diff]', C_ARITH, r.steps);
}

const C_FIB = `
for (int k = 0; k < n; k++)
    for (int j = 0; j < k; j++) {
        Integer i = index.get(arr[k] - arr[j]);
        if (i != null && i < j) dp[j][k] = (dp[i][j] > 0 ? dp[i][j] : 2) + 1;
    }`;
{
  const a = [1, 2, 3, 4, 5, 6, 7, 8], n = 8, r = recorder(), dp = Array.from({ length: n }, () => Array(n).fill(0)), index = Object.fromEntries(a.map((x, i) => [x, i])), lab = { rowLabels: a, colLabels: a };
  r.step(0, 'arr = 1..8. dp[j][k] = longest Fibonacci chain ending with arr[j], arr[k].', [G('dp', dp, [], lab)]);
  for (let k = 0; k < n; k++) { const hl = []; for (let j = 0; j < k; j++) { const i = index[a[k] - a[j]]; if (i !== undefined && i < j) { dp[j][k] = (dp[i][j] > 0 ? dp[i][j] : 2) + 1; hl.push([j, k, 'active']); } } if (hl.length) r.step(ln(C_FIB, 'dp[j][k] ='), `Column k = ${k} (${a[k]}): pairs whose earlier term ${a[k]} − arr[j] exists before j light up.`, [G('dp', dp.map(x => x.slice()), hl, lab)]); }
  const best = Math.max(...dp.flat());
  r.step(0, `Largest cell <b>${best}</b>: 1, 2, 3, 5, 8.`, [G('dp', dp, dp.flatMap((row, i2) => row.map((v, j2) => v === best ? [i2, j2, 'done'] : null)).filter(Boolean), lab)]);
  ANIM['Length of Longest Fibonacci Subsequence'] = W('Pair DP + map', C_FIB, r.steps);
}

const C_SL2 = `
for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        long d = (long) nums[i] - nums[j];
        int ending = cnt.get(j).getOrDefault(d, 0);
        total += ending;
        cur.merge(d, ending + 1, Integer::sum);
    }
    cnt.add(cur);
}`;
{
  const a = [2, 4, 6, 8, 10], r = recorder(), cnt = []; let total = 0;
  r.step(0, 'nums = [2,4,6,8,10]. cnt[i][d] = arithmetic subsequences of length ≥ 2 ending at i with difference d.', [A('nums', a)]);
  a.forEach((x, i) => { const cur = {}; const add = []; for (let j = 0; j < i; j++) { const d = x - a[j], e = cnt[j][d] || 0; total += e; cur[d] = (cur[d] || 0) + e + 1; if (e) add.push(`+${e} via j=${j}`); } cnt.push(cur); r.step(ln(C_SL2, 'total += ending'), add.length ? `i = ${i} (${x}): ${add.join(', ')} → total ${total}.` : `i = ${i} (${x}): no earlier chain to extend, total ${total}.`, [A('nums', a, { active: [i] }), R(`cnt[${i}] (diff:count)`, Object.entries(cur).map(([d, c]) => `${d}:${c}`)), R('total', [total], { done: [0] })]); });
  r.step(0, `Answer <b>${total}</b>.`, [R('total', [total], { done: [0] })]);
  ANIM['Arithmetic Slices II - Subsequence'] = W('Maps of counts', C_SL2, r.steps);
}

const C_STRICT = `
for (int x : arr1) {
    for (entry : dp) {
        if (x > last) next.merge(x, ops, Math::min);
        int pos = upperBound(repl, last);
        if (pos < repl.length) next.merge(repl[pos], ops + 1, Math::min);
    }
    dp = next;
}`;
{
  const arr1 = [1, 5, 3, 6, 7], repl = [1, 2, 3, 4], r = recorder(); let dp = new Map([[-Infinity, 0]]);
  r.step(0, 'arr1 = [1,5,3,6,7], arr2 = {1,2,3,4}. dp maps "last kept value" → fewest replacements.', [A('arr1', arr1), R('dp (last:ops)', ['start:0'])]);
  arr1.forEach((x, i) => { const next = new Map(); for (const [last, ops] of dp) { if (x > last) next.set(x, Math.min(next.has(x) ? next.get(x) : Infinity, ops)); const pos = upper(repl, repl.length, last); if (pos < repl.length) next.set(repl[pos], Math.min(next.has(repl[pos]) ? next.get(repl[pos]) : Infinity, ops + 1)); } dp = next; r.step(ln(C_STRICT, 'dp = next'), `Element ${x}: keep it if above the last value, or replace it with the next larger arr2 value (+1).`, [A('arr1', arr1, { active: [i] }), R('dp (last:ops)', [...dp].map(([l, o]) => `${l}:${o}`))]); });
  r.step(0, `Answer <b>${Math.min(...dp.values())}</b>: replace 5 with 2, giving [1,2,3,6,7].`, [R('dp (last:ops)', [...dp].map(([l, o]) => `${l}:${o}`), { done: [0] })]);
  ANIM['Make Array Strictly Increasing'] = W('Map of states', C_STRICT, r.steps);
}

const C_EG = `
for (int x : nums) {
    for (a, b with dp[a][b] != 0) {
        next[a][b] += dp[a][b];                  // skip x
        next[gcd(a, x)][b] += dp[a][b];          // put x in A
        next[a][gcd(b, x)] += dp[a][b];          // put x in B
    }
}
return Σ dp[g][g] for g >= 1;`;
{
  const nums = [10, 20, 30], gcd = (a, b) => b ? gcd(b, a % b) : a, r = recorder(); let dp = new Map([['0,0', 1]]);
  const fmt = m => [...m].map(([k, v]) => `(${k})×${v}`);
  r.step(0, 'nums = [10,20,30]. State (gcd of A, gcd of B), 0 = still empty. Start (0,0) × 1.', [A('nums', nums), R('states', fmt(dp))]);
  nums.forEach((x, i) => { const nx = new Map(), add = (a, b, w) => { const k = `${a},${b}`; nx.set(k, (nx.get(k) || 0) + w); }; for (const [k, w] of dp) { const [a, b] = k.split(',').map(Number); add(a, b, w); add(gcd(a, x), b, w); add(a, gcd(b, x), w); } dp = nx; r.step(ln(C_EG, 'next[a][b] += dp[a][b];'), `After ${x}: every state splits three ways (skip, A, B).`, [A('nums', nums, { active: [i] }), R('states', fmt(dp))]); });
  let total = 0; for (const [k, w] of dp) { const [a, b] = k.split(',').map(Number); if (a === b && a > 0) total += w; }
  r.step(ln(C_EG, 'return'), `Add the states with equal non-zero gcds: <b>${total}</b> pairs, ({10}, {20,30}) and ({20,30}, {10}).`, [R('states', fmt(dp), { done: [...dp.keys()].map((k, i) => { const [a, b] = k.split(',').map(Number); return a === b && a > 0 ? i : -1; }).filter(i => i >= 0) })]);
  ANIM['Find the Number of Subsequences With Equal GCD'] = W('GCD pair table', C_EG, r.steps);
}
