const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const range = (a, b) => idx(Math.max(0, b - a + 1)).map(x => x + a);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const TF = a => a.map(b => (b ? 'T' : '·'));

// Animates a 1-D 0-1 row: items[i] = [weight, value]; mode 'max' | 'count' | 'bool'
function row01(code, line, items, cap, mode, intro, label, fmt) {
  const r = recorder(); let dp = Array(cap + 1).fill(mode === 'max' ? 0 : mode === 'count' ? 0 : false);
  if (mode !== 'max') dp[0] = mode === 'count' ? 1 : true;
  const view = d => (mode === 'bool' ? TF(d) : d);
  r.step(0, intro, [A(label, view(dp))]);
  items.forEach(([w, v], i) => {
    const before = dp.slice(), changed = [];
    for (let c = cap; c >= w; c--) { const old = dp[c]; if (mode === 'max') dp[c] = Math.max(dp[c], before[c - w] + v); else if (mode === 'count') dp[c] = dp[c] + dp[c - w]; else dp[c] = dp[c] || dp[c - w]; if (dp[c] !== old) changed.push(c); }
    r.step(ln(code, line), fmt(w, v, i, changed), [A(label, view(dp), { active: changed })]);
  });
  return { r, dp };
}

const C_K01 = `
int[] dp = new int[W + 1];
for (int i = 0; i < val.length; i++)
    for (int c = W; c >= wt[i]; c--)
        dp[c] = Math.max(dp[c], val[i] + dp[c - wt[i]]);
return dp[W];`;
{
  const items = [[4, 1], [5, 2], [1, 3], [2, 4]], CAP = 6;
  const { r, dp } = row01(C_K01, 'dp[c] = Math.max', items, CAP, 'max', 'Capacity 6; items (weight, value) = (4,1) (5,2) (1,3) (2,4). dp[c] = best value with capacity c.', 'dp[c]', (w, v, i, ch) => `Item ${i} (w ${w}, v ${v}): scan c from 6 down to ${w}; improved cells ${ch.join(', ') || 'none'}.`);
  r.step(ln(C_K01, 'return dp[W]'), `Answer dp[6] = <b>${dp[CAP]}</b>: take weights 1 and 2 (values 3 + 4).`, [A('dp[c]', dp, { done: [CAP] })]);
  ANIM['0-1 Knapsack'] = W('One row, downward', C_K01, r.steps);
}

const C_SS = `
boolean[] can = new boolean[sum + 1];
can[0] = true;
for (int x : arr)
    for (int s = sum; s >= x; s--) can[s] |= can[s - x];
return can[sum];`;
{
  const a = [3, 4, 5, 2], sum = 9;
  const { r, dp } = row01(C_SS, 'can[s] |= can[s - x]', a.map(x => [x, 0]), sum, 'bool', 'arr = [3, 4, 5, 2], sum = 9. can[s] = some subset reaches s.', 'can[s]', (x, v, i, ch) => `x = ${x}: new sums ${ch.join(', ') || 'none'}.`);
  r.step(ln(C_SS, 'return can[sum]'), `can[9] = <b>${dp[sum]}</b> (4 + 5).`, [A('can[s]', TF(dp), { done: [sum] })]);
  ANIM['Subset Sum Problem'] = W('Boolean row', C_SS, r.steps);
}

const C_CS = `
long[] ways = new long[target + 1];
ways[0] = 1;
for (int x : arr)
    for (int s = target; s >= x; s--) ways[s] = (ways[s] + ways[s - x]) % MOD;
return (int) ways[target];`;
{
  const a = [5, 2, 3, 10, 6, 8], t = 10;
  const { r, dp } = row01(C_CS, 'ways[s] = (ways[s]', a.map(x => [x, 0]), t, 'count', 'arr = [5,2,3,10,6,8], target 10. ways[s] = subsets summing to s.', 'ways[s]', (x, v, i, ch) => `x = ${x}: add ways[s − ${x}] into ways[s] for s = 10..${x}.`);
  r.step(ln(C_CS, 'return'), `ways[10] = <b>${dp[t]}</b>: {5,2,3}, {2,8}, {10}.`, [A('ways[s]', dp, { done: [t] })]);
  ANIM['Count Subsets with Sum'] = W('Counting row', C_CS, r.steps);
}

const C_PES = `
int total = Arrays.stream(nums).sum();
if (total % 2 == 1) return false;
int half = total / 2;
for (int x : nums)
    for (int s = half; s >= x; s--) can[s] |= can[s - x];
return can[half];`;
{
  const a = [1, 5, 11, 5];
  const { r, dp } = row01(C_PES, 'can[s] |= can[s - x]', a.map(x => [x, 0]), 11, 'bool', 'nums = [1,5,11,5], total 22 → half 11. Reach 11 with a subset?', 'can[s]', (x, v, i, ch) => `x = ${x}: new sums ${ch.join(', ') || 'none'}.`);
  r.step(ln(C_PES, 'return can[half]'), `can[11] = <b>${dp[11]}</b>: {11} vs {1, 5, 5}.`, [A('can[s]', TF(dp), { done: [11] })]);
  ANIM['Partition Equal Subset Sum'] = W('Subset sum to half', C_PES, r.steps);
}

const C_PGD = `
int total = Arrays.stream(arr).sum();
if (total < d || (total - d) % 2 == 1) return 0;
int target = (total - d) / 2;
for (int x : arr)
    for (int s = target; s >= x; s--) ways[s] = (ways[s] + ways[s - x]) % MOD;
return (int) ways[target];`;
{
  const a = [5, 2, 6, 4];
  ANIM['Partitions with Given Difference'] = (() => {
    const rr = recorder(), t = 7; let w = Array(t + 1).fill(0); w[0] = 1;
    rr.step(ln(C_PGD, 'int target'), 'arr = [5,2,6,4], d = 3, total 17. S1 + S2 = 17 and S1 − S2 = 3 → S2 = 7.', [A('ways[s]', w)]);
    a.forEach(x => { for (let s = t; s >= x; s--) w[s] += w[s - x]; rr.step(ln(C_PGD, 'ways[s] = (ways[s]'), `x = ${x}: ways = [${w}].`, [A('ways[s]', w.slice(), { active: range(x, t) })]); });
    rr.step(ln(C_PGD, 'return'), `ways[7] = <b>${w[7]}</b>: {5, 2} vs {6, 4}.`, [A('ways[s]', w, { done: [7] })]);
    return W('Reduce to counting', C_PGD, rr.steps);
  })();
}

const C_TS = `
int neg = (total - target) / 2;
int[] ways = new int[neg + 1];
ways[0] = 1;
for (int x : nums)
    for (int s = neg; s >= x; s--) ways[s] += ways[s - x];
return ways[neg];`;
{
  const a = [1, 1, 1, 1, 1], r = recorder(); let w = [1, 0];
  r.step(ln(C_TS, 'int neg'), 'nums = [1,1,1,1,1], target 3, total 5 → the minus group must sum to (5 − 3) / 2 = 1.', [A('ways[s]', w)]);
  a.forEach((x, i) => { w[1] += w[0]; r.step(ln(C_TS, 'ways[s] += ways[s - x]'), `x = 1 (#${i + 1}): ways[1] = ${w[1]}.`, [A('ways[s]', w.slice(), { active: [1] })]); });
  r.step(ln(C_TS, 'return ways[neg]'), 'Answer <b>5</b>: pick which single 1 gets the minus sign.', [A('ways[s]', w, { done: [1] })]);
  ANIM['Target Sum'] = W('Count the minus group', C_TS, r.steps);
}

const C_MSP = `
for (int x : arr)
    for (int s = total / 2; s >= x; s--) can[s] |= can[s - x];
for (int s = total / 2; ; s--) if (can[s]) return total - 2 * s;`;
{
  const a = [1, 6, 11, 5];
  const { r, dp } = row01(C_MSP, 'can[s] |= can[s - x]', a.map(x => [x, 0]), 11, 'bool', 'arr = [1,6,11,5], total 23 → look for the largest reachable s ≤ 11.', 'can[s]', (x, v, i, ch) => `x = ${x}: new sums ${ch.join(', ') || 'none'}.`);
  const s = dp.lastIndexOf(true);
  r.step(ln(C_MSP, 'return total - 2 * s'), `Largest reachable s = ${s} → difference 23 − 2·${s} = <b>${23 - 2 * s}</b>.`, [A('can[s]', TF(dp), { done: [s] })]);
  ANIM['Minimum Sum Partition'] = W('Closest to half', C_MSP, r.steps);
}

const C_LSW = `
int total = Arrays.stream(stones).sum(), half = total / 2;
for (int x : stones)
    for (int s = half; s >= x; s--) can[s] |= can[s - x];
for (int s = half; ; s--) if (can[s]) return total - 2 * s;`;
{
  const a = [2, 7, 4, 1, 8, 1];
  const { r, dp } = row01(C_LSW, 'can[s] |= can[s - x]', a.map(x => [x, 0]), 11, 'bool', 'stones = [2,7,4,1,8,1], total 23. Smashing = giving each stone + or −; split into two piles as evenly as possible.', 'can[s]', (x, v, i, ch) => `stone ${x}: new pile sums ${ch.join(', ') || 'none'}.`);
  const s = dp.lastIndexOf(true);
  r.step(ln(C_LSW, 'return total - 2 * s'), `Pile ${s} vs ${23 - s} → last stone <b>${23 - 2 * s}</b>.`, [A('can[s]', TF(dp), { done: [s] })]);
  ANIM['Last Stone Weight II'] = W('Even split', C_LSW, r.steps);
}

const C_CC = `
Arrays.fill(dp, Integer.MAX_VALUE);
dp[0] = 0;
for (int a = 1; a <= amount; a++)
    for (int c : coins)
        if (c <= a && dp[a - c] != Integer.MAX_VALUE) dp[a] = Math.min(dp[a], dp[a - c] + 1);
return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];`;
{
  const coins = [1, 2, 5], amt = 11, r = recorder(), dp = [0];
  r.step(0, 'coins [1, 2, 5], amount 11. dp[a] = fewest coins for a.', [A('dp', dp)]);
  for (let a = 1; a <= amt; a++) { let b = Infinity, via = 0; for (const c of coins) if (c <= a && dp[a - c] + 1 < b) { b = dp[a - c] + 1; via = c; } dp.push(b); r.step(ln(C_CC, 'dp[a] = Math.min'), `a = ${a}: best last coin ${via} → dp[${a - via}] + 1 = ${b}.`, [A('dp', dp.slice(), { active: [a], warn: [a - via] })]); }
  r.step(ln(C_CC, 'return'), `Answer <b>${dp[amt]}</b>: 5 + 5 + 1.`, [A('dp', dp, { done: [amt] })]);
  ANIM['Coin Change'] = W('Last coin', C_CC, r.steps);
}

const C_CC2 = `
int[] ways = new int[amount + 1];
ways[0] = 1;
for (int c : coins)
    for (int a = c; a <= amount; a++) ways[a] += ways[a - c];
return ways[amount];`;
{
  const coins = [1, 2, 5], amt = 5, r = recorder(), w = [1, 0, 0, 0, 0, 0];
  r.step(0, 'coins [1, 2, 5], amount 5. Coins in the outer loop: combinations, not orders.', [A('ways', w)]);
  coins.forEach(c => { for (let a = c; a <= amt; a++) w[a] += w[a - c]; r.step(ln(C_CC2, 'ways[a] += ways[a - c]'), `After allowing coin ${c}: ways = [${w}].`, [A('ways', w.slice(), { active: range(c, amt) })]); });
  r.step(ln(C_CC2, 'return'), `Answer <b>${w[amt]}</b>: 5, 2+2+1, 2+1+1+1, 1×5.`, [A('ways', w, { done: [amt] })]);
  ANIM['Coin Change II'] = W('Coins outside', C_CC2, r.steps);
}

const C_ROD = `
for (int len = 1; len <= n; len++)
    for (int piece = 1; piece <= len; piece++)
        best[len] = Math.max(best[len], price[piece - 1] + best[len - piece]);
return best[n];`;
{
  const p = [1, 5, 8, 9, 10, 17, 17, 20], n = 8, r = recorder(), best = [0];
  r.step(0, 'price for lengths 1..8 = [1,5,8,9,10,17,17,20]. best[len] tries every first piece.', [A('price', p)]);
  for (let len = 1; len <= n; len++) { let b = 0, via = 0; for (let k = 1; k <= len; k++) if (p[k - 1] + best[len - k] > b) { b = p[k - 1] + best[len - k]; via = k; } best.push(b); r.step(ln(C_ROD, 'best[len] = Math.max'), `len ${len}: best first piece ${via} → ${p[via - 1]} + best[${len - via}] = ${b}.`, [A('best', best.slice(), { active: [len], warn: [len - via] })]); }
  r.step(ln(C_ROD, 'return best[n]'), `Answer <b>${best[n]}</b>: pieces 2 + 6 (5 + 17).`, [A('best', best, { done: [n] })]);
  ANIM['Rod Cutting'] = W('First piece', C_ROD, r.steps);
}

const C_CUT = `
Arrays.fill(best, -1);
best[0] = 0;
for (int len = 1; len <= n; len++)
    for (int p : new int[]{x, y, z})
        if (p <= len && best[len - p] >= 0) best[len] = Math.max(best[len], best[len - p] + 1);
return Math.max(best[n], 0);`;
{
  const n = 11, cuts = [2, 3, 5], r = recorder(), best = [0];
  r.step(0, 'n = 11, pieces 2, 3, 5. best[len] = most pieces, −1 if impossible.', [A('best', best)]);
  for (let len = 1; len <= n; len++) { let b = -1; for (const c of cuts) if (c <= len && best[len - c] >= 0) b = Math.max(b, best[len - c] + 1); best.push(b); r.step(ln(C_CUT, 'best[len] = Math.max'), `len ${len}: ${b < 0 ? 'cannot be cut exactly' : `${b} pieces`}.`, [A('best', best.slice(), { active: [len], bad: b < 0 ? [len] : [] })]); }
  r.step(ln(C_CUT, 'return'), `Answer <b>${best[n]}</b>: 2+2+2+2+3.`, [A('best', best, { done: [n] })]);
  ANIM['Maximize The Cut Segments'] = W('Exact fill', C_CUT, r.steps);
}

const C_OZ = `
for (String s : strs) {
    count zeros and ones;
    for (int i = m; i >= zeros; i--)
        for (int j = n; j >= ones; j--) dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
}
return dp[m][n];`;
{
  const strs = ['10', '0001', '111001', '1', '0'], m = 5, n = 3, r = recorder(), dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  r.step(0, 'strs = ["10","0001","111001","1","0"], m = 5 zeros, n = 3 ones. dp[i][j] = most strings within (i zeros, j ones).', [G('dp', dp)]);
  strs.forEach(s => { const z = [...s].filter(c => c === '0').length, o = s.length - z; for (let i = m; i >= z; i--) for (let j = n; j >= o; j--) dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1); r.step(ln(C_OZ, 'dp[i][j] = Math.max'), `"${s}" weighs (${z} zeros, ${o} ones).`, [G('dp', dp.map(x => x.slice()), [[m, n, 'active']])]); });
  r.step(ln(C_OZ, 'return'), `Answer dp[5][3] = <b>${dp[m][n]}</b>: "10", "0001", "1", "0".`, [G('dp', dp, [[m, n, 'done']])]);
  ANIM['Ones and Zeroes'] = W('Two capacities', C_OZ, r.steps);
}

const C_PS = `
dp[0][0] = 1;
for (int k = 0; k < group.length; k++)
    for (int m = n; m >= group[k]; m--)
        for (int p = minProfit; p >= 0; p--)
            dp[m][min(minProfit, p + profit[k])] += dp[m - group[k]][p];
return Σ dp[m][minProfit];`;
{
  const g = [2, 3, 5], pr = [6, 7, 8], n = 10, mp = 5, r = recorder(), dp = Array.from({ length: n + 1 }, () => Array(mp + 1).fill(0)); dp[0][0] = 1;
  const rows = () => dp.map(x => x.slice());
  r.step(0, 'n = 10 members, minProfit 5, crimes (members, profit) = (2,6) (3,7) (5,8). Profit is capped at 5.', [G('dp[m][p]', rows(), [], { colLabels: [0, 1, 2, 3, 4, '5+'] })]);
  g.forEach((gg, k) => { for (let m = n; m >= gg; m--) for (let p = mp; p >= 0; p--) { const np = Math.min(mp, p + pr[k]); dp[m][np] += dp[m - gg][p]; } r.step(ln(C_PS, 'dp[m][min('), `Crime ${k} (${gg} members, +${pr[k]}): every scheme can add it if members allow.`, [G('dp[m][p]', rows(), [], { colLabels: [0, 1, 2, 3, 4, '5+'] })]); });
  const tot = dp.reduce((s, row) => s + row[mp], 0);
  r.step(ln(C_PS, 'return'), `Sum of the "5+" column = <b>${tot}</b> schemes.`, [G('dp[m][p]', rows(), idx(n + 1).map(m => [m, mp, 'done']), { colLabels: [0, 1, 2, 3, 4, '5+'] })]);
  ANIM['Profitable Schemes'] = W('Capped profit', C_PS, r.steps);
}

const C_TB = `
for (int r : rods) {
    int[] next = dp.clone();
    for (int d = 0; d <= sum; d++) {
        if (dp[d] < 0) continue;
        next[d + r] = Math.max(next[d + r], dp[d]);
        next[|d - r|] = Math.max(next[|d - r|], dp[d] + Math.min(d, r));
    }
    dp = next;
}`;
{
  const rods = [1, 2, 3, 6], sum = 12, r = recorder(); let dp = Array(sum + 1).fill(-1); dp[0] = 0;
  const view = d => d.map(v => (v < 0 ? '·' : v));
  r.step(0, 'rods [1,2,3,6]. dp[diff] = tallest shorter side when the sides differ by diff.', [A('dp[diff]', view(dp))]);
  rods.forEach(x => { const nx = dp.slice(); for (let d = 0; d <= sum; d++) { if (dp[d] < 0) continue; if (d + x <= sum) nx[d + x] = Math.max(nx[d + x], dp[d]); const nd = Math.abs(d - x); nx[nd] = Math.max(nx[nd], dp[d] + Math.min(d, x)); } dp = nx; r.step(ln(C_TB, 'next[|d - r|]'), `Rod ${x}: on the taller side, the shorter side, or unused.`, [A('dp[diff]', view(dp), { active: [0] })]); });
  r.step(ln(C_TB, 'dp = next'), `dp[0] = <b>${dp[0]}</b>: {1, 2, 3} vs {6}.`, [A('dp[diff]', view(dp), { done: [0] })]);
  ANIM['Tallest Billboard'] = W('Knapsack on the difference', C_TB, r.steps);
}

const C_PW = `
Arrays.fill(dp, Integer.MAX_VALUE / 2);
dp[0] = 0;
for (int i = 0; i < n; i++)
    for (int j = n; j > 0; j--) dp[j] = Math.min(dp[j], dp[Math.max(0, j - time[i] - 1)] + cost[i]);
return dp[n];`;
{
  const cost = [1, 2, 3, 2], time = [1, 2, 3, 2], n = 4, r = recorder(); let dp = [0, Infinity, Infinity, Infinity, Infinity];
  const view = d => d.map(v => (v === Infinity ? '∞' : v));
  r.step(0, 'cost [1,2,3,2], time [1,2,3,2]. Paying for wall i covers time + 1 walls. dp[j] = cheapest cover of j walls.', [A('dp', view(dp))]);
  for (let i = 0; i < n; i++) { for (let j = n; j > 0; j--) dp[j] = Math.min(dp[j], dp[Math.max(0, j - time[i] - 1)] + cost[i]); r.step(ln(C_PW, 'dp[j] = Math.min'), `Wall ${i} (cost ${cost[i]}, covers ${time[i] + 1}): dp = [${view(dp)}].`, [A('dp', view(dp), { active: range(1, n) })]); }
  r.step(ln(C_PW, 'return dp[n]'), `Answer <b>${dp[n]}</b>: pay walls 0 and 1 (cover 2 + 3 ≥ 4).`, [A('dp', view(dp), { done: [n] })]);
  ANIM['Painting the Walls'] = W('Coverage knapsack', C_PW, r.steps);
}

const C_TR = `
int[] v = distinct sorted rewardValues;
reach[0] = true;
for (int x : v)
    for (int s = x - 1; s >= 0; s--) if (reach[s]) reach[s + x] = true;
for (int s = 2 * max - 1; ; s--) if (reach[s]) return s;`;
{
  const v = [1, 2, 3, 4, 6], r = recorder(), reach = Array(12).fill(false); reach[0] = true;
  r.step(0, 'rewardValues [1,6,4,3,2] sorted → [1,2,3,4,6]. A value x extends only totals below x.', [A('reach', TF(reach))]);
  v.forEach(x => { const add = []; for (let s = x - 1; s >= 0; s--) if (reach[s] && !reach[s + x]) { reach[s + x] = true; add.push(s + x); } r.step(ln(C_TR, 'reach[s + x] = true'), `x = ${x}: from totals < ${x} → new ${add.sort((a, b) => a - b).join(', ') || 'none'}.`, [A('reach', TF(reach), { active: add })]); });
  r.step(ln(C_TR, 'return s'), `Largest reachable total <b>${reach.lastIndexOf(true)}</b> (1, then 4, then 6).`, [A('reach', TF(reach), { done: [reach.lastIndexOf(true)] })]);
  ANIM['Maximum Total Reward Using Operations I'] = W('Sorted reachability', C_TR, r.steps);
}

const C_POW = `
ways[0] = 1;
for (int b = 1; Math.pow(b, x) <= n; b++) {
    int p = (int) Math.pow(b, x);
    for (int s = n; s >= p; s--) ways[s] = (ways[s] + ways[s - p]) % MOD;
}
return (int) ways[n];`;
{
  const n = 10, r = recorder(), w = Array(n + 1).fill(0); w[0] = 1;
  r.step(0, 'n = 10, x = 2. Items: 1, 4, 9 (squares ≤ 10), each at most once.', [A('ways', w)]);
  [1, 4, 9].forEach(p => { for (let s = n; s >= p; s--) w[s] += w[s - p]; r.step(ln(C_POW, 'ways[s] = (ways[s]'), `Item ${p}: ways = [${w}].`, [A('ways', w.slice(), { active: range(p, n) })]); });
  r.step(ln(C_POW, 'return'), `ways[10] = <b>${w[10]}</b>: 1 + 9.`, [A('ways', w, { done: [10] })]);
  ANIM['Ways to Express an Integer as Sum of Powers'] = W('Counting row', C_POW, r.steps);
}

const C_KC = `
for (List<Integer> pile : piles)
    for (int j = k; j >= 1; j--) {
        int top = 0;
        for (int t = 1; t <= Math.min(j, pile.size()); t++) {
            top += pile.get(t - 1);
            dp[j] = Math.max(dp[j], dp[j - t] + top);
        }
    }`;
{
  const piles = [[1, 100, 3], [7, 8, 9]], k = 2, r = recorder(), dp = [0, 0, 0];
  r.step(0, 'piles [1,100,3] and [7,8,9], k = 2. Each pile offers a prefix of length t.', [A('dp[j]', dp)]);
  piles.forEach((p, i) => { for (let j = k; j >= 1; j--) { let top = 0; for (let t = 1; t <= Math.min(j, p.length); t++) { top += p[t - 1]; dp[j] = Math.max(dp[j], dp[j - t] + top); } } r.step(ln(C_KC, 'dp[j] = Math.max'), `Pile ${i} [${p}]: prefixes ${p.slice(0, k).map((_, t) => p.slice(0, t + 1).reduce((a, b) => a + b)).join(', ')} → dp = [${dp}].`, [A('dp[j]', dp.slice(), { active: [1, 2] })]); });
  r.step(ln(C_KC, 'top +='), `Answer dp[2] = <b>${dp[2]}</b>: take 1 and 100 from the first pile.`, [A('dp[j]', dp, { done: [2] })]);
  ANIM['Maximum Value of K Coins From Piles'] = W('Group knapsack', C_KC, r.steps);
}
