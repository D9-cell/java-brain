const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const range = (a, b) => idx(Math.max(0, b - a + 1)).map(x => x + a);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const cp = m => m.map(r => r.slice());
const bin = (v, w) => v.toString(2).padStart(w, '0');
const gcd = (a, b) => b ? gcd(b, a % b) : a;

const C_NO = `
for (int mask = 0; mask < (1 << n); mask++) {
    int op = Integer.bitCount(mask) / 2 + 1;
    for (i not in mask) for (j > i not in mask)
        dp[mask | (1 << i) | (1 << j)] = Math.max(.., dp[mask] + op * g[i][j]);
}
return dp[(1 << n) - 1];`;
{
  const nums = [3, 4, 6, 8], n = 4, r = recorder(), dp = Array(1 << n).fill(-1); dp[0] = 0;
  r.step(0, 'nums = [3,4,6,8]. dp[mask] = best score after removing the elements in mask.', [A('nums', nums)]);
  const seen = [];
  for (let mask = 0; mask < (1 << n); mask++) { if (dp[mask] < 0) continue; const op = [...bin(mask, n)].filter(c => c === '1').length / 2 + 1; for (let i = 0; i < n; i++) { if (mask >> i & 1) continue; for (let j = i + 1; j < n; j++) { if (mask >> j & 1) continue; const nm = mask | 1 << i | 1 << j; dp[nm] = Math.max(dp[nm], dp[mask] + op * gcd(nums[i], nums[j])); } } if (mask === 0 || mask === 3 || mask === 12 || mask === 5) { const o = []; for (let i = 0; i < n; i++) if (mask >> i & 1) o.push(nums[i]); r.step(ln(C_NO, 'dp[mask | (1 << i)'), mask === 0 ? 'mask 0000, operation 1: try every pair, e.g. (3,4) scores 1·gcd = 1, (6,8) scores 2.' : `mask ${bin(mask, n)} (removed ${o}): operation 2 scores 2·gcd of the remaining pair.`, [R('reachable dp', dp.map((v, k) => v >= 0 ? `${bin(k, n)}:${v}` : null).filter(Boolean))]); } }
  r.step(ln(C_NO, 'return'), `Answer dp[1111] = <b>${dp[(1 << n) - 1]}</b>: pair (3,6) then (4,8) → 1·3 + 2·4.`, [R('answer', [dp[(1 << n) - 1]], { done: [0] })]);
  ANIM['Maximize Score After N Operations'] = W('Forward mask DP', C_NO, r.steps);
}

const C_ST = `
for (int p = 0; p < n; p++)
    for (int mask = 0; mask < (1 << m); mask++) {
        if (!seen[mask]) continue;
        int next = mask | skill[p];
        long cand = team[mask] | (1L << p);
        if (!seen[next] || Long.bitCount(cand) < Long.bitCount(team[next])) { seen[next] = true; team[next] = cand; }
    }`;
{
  const req = ['java', 'nodejs', 'reactjs'], ppl = [['java'], ['nodejs'], ['nodejs', 'reactjs']], sk = [1, 2, 6], m = 3, r = recorder();
  const team = Array(1 << m).fill(null); team[0] = []; 
  const show = () => team.map((t, k) => t ? `${bin(k, m)}: {${t}}` : null).filter(Boolean);
  r.step(0, 'skills java=bit0, nodejs=bit1, reactjs=bit2. People: p0 {java}, p1 {nodejs}, p2 {nodejs, reactjs}.', [R('people skills', sk.map(s => bin(s, m)))]);
  for (let p = 0; p < 3; p++) { for (let mask = 0; mask < (1 << m); mask++) { if (!team[mask]) continue; const nx = mask | sk[p], cand = [...team[mask].filter(x => x !== p), p]; if (!team[nx] || cand.length < team[nx].length) team[nx] = cand; } r.step(ln(C_ST, 'team[next] = cand'), `After person p${p}: every covered set can grow by p${p}'s skills.`, [R('best team per covered set', show(), { active: [show().length - 1] })]); }
  r.step(0, `Answer: team for 111 = <b>{${team[7]}}</b> (p0 and p2).`, [R('best team per covered set', show(), { done: [show().length - 1] })]);
  ANIM['Smallest Sufficient Team'] = W('Skill-mask DP', C_ST, r.steps);
}

const C_SS = `
overlap[i][j] = longest suffix of words[i] that is a prefix of words[j]
dp[1 << i][i] = 0;
for (mask) for (last in mask) for (next not in mask)
    dp[mask | (1 << next)][next] = max(.., dp[mask][last] + overlap[last][next]);
// rebuild the order from parent[][] and append each word without its overlap`;
{
  const w = ['bcd', 'abc', 'cde'], r = recorder(), n = 3;
  const ov = (a, b) => { for (let k = Math.min(a.length, b.length); k >= 0; k--) if (a.endsWith(b.slice(0, k))) return k; return 0; };
  const rows = w.map(a => w.map(b => a === b ? '·' : ov(a, b)));
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]], build = p => p.slice(1).reduce((s, i, t) => s + w[i].slice(ov(w[p[t]], w[i])), w[p[0]]);
  const best = perms.map(p => [build(p), p]).sort((x, y) => x[0].length - y[0].length)[0];
  r.step(0, 'words: bcd, abc, cde. Order them so consecutive words overlap as much as possible.', [R('words', w)]);
  r.step(ln(C_SS, 'overlap[i][j]'), 'Overlap matrix (longest suffix of the row word that is a prefix of the column word).', [G('overlap', rows, [[1, 0, 'active'], [0, 2, 'active']], { rowLabels: w, colLabels: w })]);
  r.step(ln(C_SS, 'dp[mask | (1 << next)]'), `The best order is ${best[1].map(i => w[i]).join(' → ')}: overlaps ${ov(w[best[1][0]], w[best[1][1]])} + ${ov(w[best[1][1]], w[best[1][2]])}.`, [R('order', best[1].map(i => w[i]), { done: [0, 1, 2] })]);
  r.step(ln(C_SS, 'rebuild'), `Append each word without its overlap: <b>${best[0]}</b> (length ${best[0].length} instead of 9).`, [R('superstring', [best[0]], { done: [0] })]);
  ANIM['Find the Shortest Superstring'] = W('Bitmask TSP', C_SS, r.steps);
}

const C_MP = `
int solve(int i, int mask, boolean canChange) {
    int best = step(i, mask, s.charAt(i) - 'a', canChange);
    if (canChange) for (int ch = 0; ch < 26; ch++) best = Math.max(best, step(i, mask, ch, false));
    return best;
}
int step(int i, int mask, int ch, boolean canChange) {
    int next = mask | (1 << ch);
    if (Integer.bitCount(next) > k) return 1 + solve(i + 1, 1 << ch, canChange);   // new partition
    return solve(i + 1, next, canChange);
}`;
{
  const r = recorder();
  r.step(0, 's = "accca", k = 2. Without a change, a and c are two distinct letters, so the whole string is one partition.', [A('s', [...'accca'])]);
  r.step(ln(C_MP, 'for (int ch'), 'Change the middle c to b: "acbca". Now a, c, b are three distinct letters.', [A('s', [...'acbca'], { active: [2] })]);
  r.step(ln(C_MP, 'if (Integer.bitCount(next) > k)'), 'Greedy partitions: "ac" (adding b would make 3 distinct) | "bc" (adding a would make 3) | "a" → 3 partitions.', [R('partitions', ['ac', 'bc', 'a'], { done: [0, 1, 2] })]);
  r.step(0, 'Answer <b>3</b>: the free change turns one partition into three.', [R('answer', [3], { done: [0] })]);
  ANIM['Maximize the Number of Partitions After Operations'] = W('Memo on (i, mask, can)', C_MP, r.steps);
}

const C_FX = `
for (int v : nums) {
    long[] next = new long[k];
    for (int x = 0; x < k; x++) next[(int) ((long) x * v % k)] += cnt[x];   // extend
    next[v % k]++;                                                         // start here
    cnt = next;
    for (int x = 0; x < k; x++) result[x] += cnt[x];
}`;
{
  const nums = [1, 2, 3, 4, 5], k = 3, r = recorder(); let cnt = Array(k).fill(0); const res = Array(k).fill(0);
  r.step(0, 'nums = [1,2,3,4,5], k = 3. cnt[x] = subarrays ending at the current element with product ≡ x (mod 3).', [A('nums', nums)]);
  nums.forEach((v, i) => { const nx = Array(k).fill(0); for (let x = 0; x < k; x++) nx[(x * v) % k] += cnt[x]; nx[v % k]++; cnt = nx; for (let x = 0; x < k; x++) res[x] += cnt[x]; r.step(ln(C_FX, 'next[v % k]++'), `Element ${v}: cnt = [${cnt}], result so far [${res}].`, [A('nums', nums, { active: [i] }), A('cnt', cnt), A('result', res, { active: [0, 1, 2] })]); });
  r.step(0, `Answer <b>[${res}]</b>.`, [A('result', res, { done: [0, 1, 2] })]);
  ANIM['Find X Value of Array I'] = W('Remainder table', C_FX, r.steps);
}

const C_TW = `
long[] go(int pos, int a, int b, boolean tight, boolean leading) {   // returns {numbers, waviness}
    for (int d = 0; d <= limit; d++) {
        long[] sub = go(pos + 1, nextA, nextB, tight && d == limit, newLeading);
        count += sub[0]; total += sub[1];
        if (a < b && b > d || a > b && b < d) total += sub[0];     // b is a peak or valley
    }
}
return total(num2) - total(num1 - 1);`;
{
  const r = recorder();
  const wav = v => { const s = String(v); let c = 0; for (let i = 1; i + 1 < s.length; i++) { const a = s[i - 1], b = s[i], d = s[i + 1]; if ((b > a && b > d) || (b < a && b < d)) c++; } return c; };
  r.step(0, 'Range [120, 130]. Waviness = number of peaks and valleys among the inner digits.', [R('numbers', range(120, 130))]);
  r.step(ln(C_TW, 'if (a < b'), 'Each number: 120 → digit 2 is a peak (1 < 2 > 0): 1. 121 → peak: 1. 122 → 0. 123 → 0. 124..129 → 0. 130 → 3 is a peak: 1.', [R('waviness', range(120, 130).map(wav), { active: range(120, 130).map((v, i) => wav(v) ? i : -1).filter(i => i >= 0) })]);
  r.step(ln(C_TW, 'return total'), `The digit DP computes this without listing numbers: f(130) − f(119). Total = <b>${range(120, 130).reduce((s, v) => s + wav(v), 0)}</b>.`, [R('answer', [range(120, 130).reduce((s, v) => s + wav(v), 0)], { done: [0] })]);
  ANIM['Total Waviness of Numbers in Range II'] = W('Digit DP', C_TW, r.steps);
}

const C_MS = `
long go(int i, int rem, int onesLeft, int carry) {
    if (i == n) return rem == 0 && Integer.bitCount(carry) == onesLeft ? 1 : 0;
    for (int t = 0; t <= rem; t++) {
        int sum = carry + t, bit = sum & 1;
        total += C[rem][t] * pow[i][t] * go(i + 1, rem - t, onesLeft - bit, sum >> 1);
    }
}`;
{
  const nums = [5, 4, 3, 2, 1], m = 2, k = 2, r = recorder();
  r.step(0, 'm = 2, k = 2, nums = [5,4,3,2,1]. A magical sequence has 2^i + 2^j with exactly 2 set bits, so i ≠ j.', [A('nums', nums)]);
  r.step(ln(C_MS, 'for (int t'), 'Using the same index twice (i = j) gives 2·2^i = 2^(i+1): one set bit, not magical. Index pairs (i, j) with i ≠ j work.', [R('pairs', ['(0,1)', '(0,2)', '...', '(3,4)'])]);
  let tot = 0; for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) if (i !== j) tot += nums[i] * nums[j];
  r.step(ln(C_MS, 'total +='), `Ordered pairs give C(2,1) = 2 arrangements per unordered pair: sum of products over ordered pairs = ${tot} = <b>170</b>.`, [R('answer', [tot], { done: [0] })]);
  ANIM['Find Sum of Array Product of Magical Sequences'] = W('Memo on (i, rem, ones, carry)', C_MS, r.steps);
}

const C_CN = `
for (int idx = n - 1; idx >= 0; idx--) {          // children before parents (reverse BFS)
    int u = order[idx];
    for (int p = 0; p <= 14; p++) {
        int keep = (coins[u] >> p) - k, halve = coins[u] >> (p + 1);
        for (child v) { keep += dp[v][p]; halve += dp[v][p + 1]; }
        dp[u][p] = Math.max(keep, halve);
    }
}
return dp[0][0];`;
{
  const coins = [10, 10, 3, 3], k = 5, n = 4, r = recorder(); const dp = Array.from({ length: n }, () => Array(16).fill(0));
  r.step(0, 'Chain 0 – 1 – 2 – 3, coins [10,10,3,3], k = 5. dp[v][p] = best points in v\'s subtree after p ancestor halvings.', [A('coins', coins)]);
  for (let u = n - 1; u >= 0; u--) { for (let p = 0; p <= 14; p++) { let keep = (coins[u] >> p) - k, halve = coins[u] >> (p + 1); if (u + 1 < n) { keep += dp[u + 1][p]; halve += dp[u + 1][p + 1]; } dp[u][p] = Math.max(keep, halve); } r.step(ln(C_CN, 'dp[u][p] = Math.max'), `Node ${u} (coins ${coins[u]}): dp for p = 0, 1, 2 → [${dp[u].slice(0, 3)}].`, [A('coins', coins, { active: [u] }), A('dp[u][0..4]', dp[u].slice(0, 5), { active: [0] })]); }
  r.step(ln(C_CN, 'return'), `Answer dp[0][0] = <b>${dp[0][0]}</b>.`, [A('dp[0][0..4]', dp[0].slice(0, 5), { done: [0] })]);
  ANIM['Maximum Points After Collecting Coins From All Nodes'] = W('Reverse BFS tree DP', C_CN, r.steps);
}

const C_ST2 = `
for (int bossBought = 0; bossBought <= 1; bossBought++) {
    int price = bossBought == 1 ? present[u] / 2 : present[u];
    best = merge(children, 0);                                   // u does not buy
    withU = merge(children, 1);                                  // u buys: children see a bought boss
    for (int b = price; b <= budget; b++) best[b] = Math.max(best[b], withU[b - price] + future[u] - price);
}`;
{
  const present = [3, 4], future = [5, 8], budget = 4, r = recorder();
  r.step(0, 'Employee 1 (CEO) present 3 → future 5; employee 2 (boss 1) present 4 → future 8. Budget 4.', [R('present', present), R('future', future)]);
  r.step(ln(C_ST2, 'best = merge'), 'Employee 2 as a leaf: if the boss did not buy, price 4: profit 4 for budget ≥ 4. If the boss bought, price 2: profit 6 for budget ≥ 2.', [R('employee 2 [boss no, boss yes]', ['b≥4: 4', 'b≥2: 6'])]);
  r.step(ln(C_ST2, 'withU'), 'CEO buys at 3 (profit 2); employee 2 then costs 2, over the budget 4 − 3 = 1: not affordable. CEO alone: profit 2. Employee 2 alone (price 4): profit 4.', [R('options', ['CEO only: 2', 'employee 2 only: 4', 'both: needs 5 > 4'], { done: [1], bad: [2] })]);
  r.step(0, 'Answer <b>4</b>.', [R('answer', [4], { done: [0] })]);
  ANIM['Maximum Profit from Trading Stocks with Discounts'] = W('Tree knapsack', C_ST2, r.steps);
}
