const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const chars = s => [...s];

const C_FIB = `
public int fib(int n) {
    if (n < 2) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}`;
{
  const r = recorder(), f = [0, 1];
  r.step(0, 'fib(8). Base cases: f(0) = 0, f(1) = 1. Keep only the last two values.', [A('f', f, { done: [0, 1] })]);
  for (let i = 2; i <= 8; i++) { f.push(f[i - 1] + f[i - 2]); r.step(ln(C_FIB, 'int c = a + b'), `f(${i}) = f(${i - 1}) + f(${i - 2}) = ${f[i - 1]} + ${f[i - 2]} = <b>${f[i]}</b>.`, [A('f', f, { active: [i], done: idx(i) })]); }
  ANIM['Fibonacci Number'] = W('Bottom-up', C_FIB, r.steps);
}

const C_CLIMB = `
public int climbStairs(int n) {
    int a = 1, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}`;
{
  const r = recorder(), w = [1, 1];
  r.step(0, 'ways(0) = 1 (stand still), ways(1) = 1. To reach step i you came from i−1 (one step) or i−2 (two steps).', [A('ways', w, { done: [0, 1] })]);
  for (let i = 2; i <= 6; i++) { w.push(w[i - 1] + w[i - 2]); r.step(ln(C_CLIMB, 'int c = a + b'), `ways(${i}) = ways(${i - 1}) + ways(${i - 2}) = ${w[i - 1]} + ${w[i - 2]} = <b>${w[i]}</b>.`, [A('ways', w, { active: [i], done: idx(i) })]); }
  ANIM['Climbing Stairs'] = W('Last-step argument', C_CLIMB, r.steps);
}

const C_TRI = `
int a = 0, b = 1, c = 1;
for (int i = 3; i <= n; i++) { int d = a + b + c; a = b; b = c; c = d; }
return c;`;
{
  const r = recorder(), t = [0, 1, 1];
  r.step(0, 'T(0) = 0, T(1) = T(2) = 1. Each term is the sum of the previous three.', [A('T', t, { done: [0, 1, 2] })]);
  for (let i = 3; i <= 8; i++) { t.push(t[i - 1] + t[i - 2] + t[i - 3]); r.step(ln(C_TRI, 'int d = a + b + c'), `T(${i}) = ${t[i - 1]} + ${t[i - 2]} + ${t[i - 3]} = <b>${t[i]}</b>.`, [A('T', t, { active: [i], done: idx(i) })]); }
  ANIM['N-th Tribonacci Number'] = W('Three variables', C_TRI, r.steps);
}

const C_MCC = `
int a = 0, b = 0;
for (int i = 2; i <= cost.length; i++) {
    int c = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b; b = c;
}
return b;`;
{
  const cost = [10, 15, 20], r = recorder(), best = [0, 0];
  r.step(0, 'cost = [10, 15, 20]. best[i] = cheapest way to stand on step i (toll not yet paid). You may start on step 0 or 1 for free.', [A('cost', cost), A('best', best, { done: [0, 1] })]);
  for (let i = 2; i <= 3; i++) { const v = Math.min(best[i - 1] + cost[i - 1], best[i - 2] + cost[i - 2]); best.push(v); r.step(ln(C_MCC, 'int c = Math.min'), `best[${i}] = min(${best[i - 1]} + ${cost[i - 1]}, ${best[i - 2]} + ${cost[i - 2]}) = <b>${v}</b>.`, [A('cost', cost, { active: [i - 1, i - 2].filter(x => x < 3) }), A('best', best, { active: [i], done: idx(i) })]); }
  r.step(ln(C_MCC, 'return b'), `The top is step 3: answer <b>${best[3]}</b> (pay 15 on step 1 and jump two).`, [A('best', best, { done: idx(4) })]);
  ANIM['Min Cost Climbing Stairs'] = W('Cheapest arrival', C_MCC, r.steps);
}

const C_HR = `
int skip = 0, take = 0;
for (int x : nums) { int newTake = skip + x; skip = Math.max(skip, take); take = newTake; }
return Math.max(skip, take);`;
{
  const a = [2, 7, 9, 3, 1], r = recorder(); let skip = 0, take = 0;
  r.step(0, 'nums = [2, 7, 9, 3, 1]. Track the best total if the previous house was skipped / taken.', [A('nums', a), A('skip / take', [skip, take])]);
  a.forEach((x, i) => { const nt = skip + x; skip = Math.max(skip, take); take = nt; r.step(ln(C_HR, 'int newTake'), `House ${i} (${x}): take = old skip + ${x} = ${take}; skip = max(old skip, old take) = ${skip}.`, [A('nums', a, { active: [i], done: idx(i) }), A('skip / take', [skip, take])]); });
  r.step(ln(C_HR, 'return Math.max'), `Answer = max(${skip}, ${take}) = <b>${Math.max(skip, take)}</b> (rob 2, 9, 1).`, [A('answer', [Math.max(skip, take)], { done: [0] })]);
  ANIM['House Robber'] = W('Skip / take', C_HR, r.steps);
}

const C_HR2 = `
public int rob(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(line(nums, 0, n - 2), line(nums, 1, n - 1));
}`;
{
  const a = [2, 3, 2], r = recorder();
  r.step(0, 'Houses 0 and 2 are neighbours in the circle (nums = [2, 3, 2]).', [A('nums', a, { warn: [0, 2] })]);
  r.step(ln(C_HR2, 'line(nums, 0, n - 2)'), 'Case 1: ignore the last house → houses [2, 3] → best 3.', [A('nums', a, { done: [0, 1], bad: [2] }), A('case 1', [3], { done: [0] })]);
  r.step(ln(C_HR2, 'line(nums, 1, n - 1)'), 'Case 2: ignore the first house → houses [3, 2] → best 3.', [A('nums', a, { bad: [0], done: [1, 2] }), A('case 2', [3], { done: [0] })]);
  r.step(ln(C_HR2, 'return Math.max'), 'Answer = max(3, 3) = <b>3</b>. Robbing both 2s is illegal: they are neighbours in the circle.', [A('answer', [3], { done: [0] })]);
  ANIM['House Robber II'] = W('Break the circle', C_HR2, r.steps);
}

const C_HR3 = `
private int[] dfs(TreeNode n) {
    if (n == null) return new int[]{0, 0};
    int[] l = dfs(n.left), r = dfs(n.right);
    int robbed = n.val + l[1] + r[1];
    int skipped = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
    return new int[]{robbed, skipped};
}`;
{
  const t = make([3, 2, 3, null, 3, null, 1]), res = {}, badge = {}, r = recorder();
  r.step(0, 'Each node returns {robbed, skipped}. A robbed node forces its children to be skipped.', [t.snap('tree')]);
  const post = t.post();
  post.forEach((u, k) => { const l = t.L[u] === undefined ? [0, 0] : res[t.L[u]], rr = t.R[u] === undefined ? [0, 0] : res[t.R[u]]; const robbed = t.val(u) + l[1] + rr[1], skipped = Math.max(...l) + Math.max(...rr); res[u] = [robbed, skipped]; badge[u] = `${robbed}/${skipped}`; r.step(ln(C_HR3, 'int skipped'), `Node ${t.val(u)}: robbed = ${t.val(u)} + ${l[1]} + ${rr[1]} = ${robbed}; skipped = max(${l}) + max(${rr}) = ${skipped}.`, [t.snap('tree', { active: [u], done: post.slice(0, k), badge: { ...badge } })]); });
  r.step(ln(C_HR3, 'return new int[]{robbed'), `Answer = max(${res[0]}) = <b>${Math.max(...res[0])}</b>.`, [t.snap('tree', { done: t.ids, badge })]);
  ANIM['House Robber III'] = W('Pair per node', C_HR3, r.steps);
}

const C_IB = `
int[] dp = new int[n + 1];
dp[1] = 1;
for (int i = 2; i <= n; i++) for (int j = 1; j < i; j++) dp[i] = Math.max(dp[i], j * Math.max(i - j, dp[i - j]));`;
{
  const r = recorder(), dp = [0, 1];
  r.step(0, 'dp[i] = best product when breaking i. dp[1] = 1.', [A('dp', dp, { done: [1] })]);
  for (let i = 2; i <= 8; i++) { let best = 0, bj = 1; for (let j = 1; j < i; j++) { const v = j * Math.max(i - j, dp[i - j]); if (v > best) { best = v; bj = j; } } dp.push(best); r.step(ln(C_IB, 'dp[i] = Math.max'), `i = ${i}: best first piece ${bj} → ${bj} × max(${i - bj}, dp[${i - bj}]=${dp[i - bj]}) = <b>${best}</b>.`, [A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['Integer Break'] = W('Try every first piece', C_IB, r.steps);
}

const C_PS = `
int[] dp = new int[n + 1];
for (int i = 1; i <= n; i++) {
    dp[i] = Integer.MAX_VALUE;
    for (int s = 1; s * s <= i; s++) dp[i] = Math.min(dp[i], dp[i - s * s] + 1);
}`;
{
  const r = recorder(), dp = [0];
  r.step(0, 'dp[i] = fewest squares summing to i. dp[0] = 0.', [A('dp', dp, { done: [0] })]);
  for (let i = 1; i <= 13; i++) { let best = Infinity, bs = 1; for (let s = 1; s * s <= i; s++) if (dp[i - s * s] + 1 < best) { best = dp[i - s * s] + 1; bs = s; } dp.push(best); r.step(ln(C_PS, 'dp[i] = Math.min'), `i = ${i}: use ${bs * bs} then dp[${i - bs * bs}] = ${dp[i - bs * bs]} → <b>${best}</b>.`, [A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['Perfect Squares'] = W('Coins are squares', C_PS, r.steps);
}

const C_2K = `
int[] dp = new int[n + 1];
for (int i = 2; i <= n; i++) {
    dp[i] = i;
    for (int d = 2; d < i; d++) if (i % d == 0) dp[i] = Math.min(dp[i], dp[d] + i / d);
}`;
{
  const r = recorder(), dp = [0, 0];
  r.step(0, 'dp[i] = fewest operations to get i letters. dp[1] = 0.', [A('dp', dp, { done: [0, 1] })]);
  for (let i = 2; i <= 12; i++) { let best = i; for (let d = 2; d < i; d++) if (i % d === 0) best = Math.min(best, dp[d] + i / d); dp.push(best); r.step(ln(C_2K, 'dp[i] = Math.min'), `i = ${i}: ${i === best ? 'prime or no better divisor → ' + i : 'best divisor gives <b>' + best + '</b>'}.`, [A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['2 Keys Keyboard'] = W('Divisors', C_2K, r.steps);
}

const C_4K = `
int[] dp = new int[n + 1];
for (int i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    for (int j = 2; j < i; j++) dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1));
}`;
{
  const r = recorder(), dp = [0];
  r.step(0, 'dp[i] = most A\'s with i presses. Option 1: type one more A. Option 2: from step j−2 do Ctrl-A, Ctrl-C and paste until i.', [A('dp', dp, { done: [0] })]);
  for (let i = 1; i <= 10; i++) { let best = dp[i - 1] + 1, how = 'type A'; for (let j = 2; j < i; j++) { const v = dp[j - 2] * (i - j + 1); if (v > best) { best = v; how = `copy at ${j - 2}, ×${i - j + 1}`; } } dp.push(best); r.step(ln(C_4K, 'dp[i] = Math.max(dp[i], dp[j - 2]'), `i = ${i}: <b>${best}</b> (${how}).`, [A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['4 Keys Keyboard'] = W('Typing vs copy-paste', C_4K, r.steps);
}

const C_DW = `
int prev2 = 1, prev1 = s.charAt(0) == '0' ? 0 : 1;
for (int i = 2; i <= n; i++) {
    int cur = 0;
    if (s.charAt(i - 1) != '0') cur += prev1;
    int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1; prev1 = cur;
}`;
{
  const s = '226', r = recorder(), dp = [1, 1];
  r.step(0, '"226": dp[i] = ways to decode the first i characters. dp[0] = 1, dp[1] = 1.', [A('digits', chars(s)), A('dp', dp, { done: [0, 1] })]);
  for (let i = 2; i <= 3; i++) { let cur = 0, note = []; if (s[i - 1] !== '0') { cur += dp[i - 1]; note.push(`single ${s[i - 1]} → +${dp[i - 1]}`); } const two = +s.slice(i - 2, i); if (two >= 10 && two <= 26) { cur += dp[i - 2]; note.push(`pair ${two} → +${dp[i - 2]}`); } dp.push(cur); r.step(ln(C_DW, 'if (two >= 10'), `dp[${i}] = ${note.join(', ')} = <b>${cur}</b>.`, [A('digits', chars(s), { active: [i - 1] }), A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['Decode Ways'] = W('Single or pair', C_DW, r.steps);
}

const C_DW2 = `
private long single(char c) { return c == '*' ? 9 : c == '0' ? 0 : 1; }
private long pair(char a, char b) {
    if (a == '*' && b == '*') return 15;
    if (a == '*') return b <= '6' ? 2 : 1;
    if (b == '*') return a == '1' ? 9 : a == '2' ? 6 : 0;
    int v = (a - '0') * 10 + (b - '0');
    return v >= 10 && v <= 26 ? 1 : 0;
}
long cur = (prev1 * single(s.charAt(i)) + prev2 * pair(s.charAt(i - 1), s.charAt(i))) % MOD;`;
{
  const s = '1*', r = recorder();
  r.step(0, '"1*": the star is any digit 1–9.', [A('s', chars(s))]);
  r.step(ln(C_DW2, 'private long single'), 'First character `1`: single(1) = 1 way → dp[1] = 1, dp[0] = 1.', [A('dp', [1, 1], { done: [0, 1] })]);
  r.step(ln(C_DW2, 'if (b == \'*\')'), 'Second character `*`: single(*) = 9 ways with dp[1] = 1 → 9. Pair "1*" decodes as 11…19 = 9 ways with dp[0] = 1 → 9.', [A('terms', [9, 9], { active: [0, 1] })]);
  r.step(ln(C_DW2, 'long cur'), 'dp[2] = 9 + 9 = <b>18</b>.', [A('dp', [1, 1, 18], { done: [0, 1, 2] })]);
  ANIM['Decode Ways II'] = W('Multipliers for *', C_DW2, r.steps);
}

const C_UG = `
for (int i = 1; i < n; i++) {
    int a = ugly[i2] * 2, b = ugly[i3] * 3, c = ugly[i5] * 5;
    ugly[i] = Math.min(a, Math.min(b, c));
    if (ugly[i] == a) i2++;
    if (ugly[i] == b) i3++;
    if (ugly[i] == c) i5++;
}`;
{
  const u = [1], r = recorder(); let i2 = 0, i3 = 0, i5 = 0;
  r.step(0, 'Start with [1]. The next ugly number is the smallest of u[i2]·2, u[i3]·3, u[i5]·5.', [A('ugly', u)]);
  for (let i = 1; i < 10; i++) { const a = u[i2] * 2, b = u[i3] * 3, c = u[i5] * 5, m = Math.min(a, b, c); u.push(m); if (m === a) i2++; if (m === b) i3++; if (m === c) i5++; r.step(ln(C_UG, 'ugly[i] = Math.min'), `Candidates ${a}, ${b}, ${c} → <b>${m}</b>. Pointers (i2, i3, i5) = (${i2}, ${i3}, ${i5}).`, [A('ugly', u, { active: [i] })]); }
  ANIM['Ugly Number II'] = W('Three pointers', C_UG, r.steps);
}

const C_TILE = `
long a = 1, b = 1, c = 2;
for (int i = 3; i <= n; i++) { long d = (2 * c + a) % MOD; a = b; b = c; c = d; }`;
{
  const f = [1, 1, 2], r = recorder();
  r.step(0, 'f(0) = 1, f(1) = 1, f(2) = 2 (two vertical dominoes or two horizontal).', [A('f', f, { done: [0, 1, 2] })]);
  for (let i = 3; i <= 7; i++) { f.push(2 * f[i - 1] + f[i - 3]); r.step(ln(C_TILE, 'long d'), `f(${i}) = 2 · ${f[i - 1]} + ${f[i - 3]} = <b>${f[i]}</b>.`, [A('f', f, { active: [i], done: idx(i) })]); }
  ANIM['Domino and Tromino Tiling'] = W('f(n) = 2f(n−1) + f(n−3)', C_TILE, r.steps);
}

const C_GOOD = `
int[] dp = new int[high + 1];
dp[0] = 1;
for (int len = 1; len <= high; len++) {
    if (len >= zero) dp[len] = (dp[len] + dp[len - zero]) % MOD;
    if (len >= one) dp[len] = (dp[len] + dp[len - one]) % MOD;
    if (len >= low) total = (total + dp[len]) % MOD;
}`;
{
  const low = 2, high = 3, zero = 1, one = 2, dp = [1], r = recorder(); let total = 0;
  r.step(0, 'low = 2, high = 3, zero = 1, one = 2. dp[len] = strings of exactly that length.', [A('dp', dp, { done: [0] })]);
  for (let len = 1; len <= high; len++) { let v = 0; if (len >= zero) v += dp[len - zero]; if (len >= one) v += dp[len - one]; dp.push(v); if (len >= low) total += v; r.step(ln(C_GOOD, 'dp[len] = (dp[len] + dp[len - zero])'), `dp[${len}] = dp[${len - zero}]${len >= one ? ' + dp[' + (len - one) + ']' : ''} = ${v}${len >= low ? '; counted in the total (' + total + ')' : ''}.`, [A('dp', dp, { active: [len], done: idx(len) }), A('total', [total], { done: [0] })]); }
  ANIM['Count Ways To Build Good Strings'] = W('Count by length', C_GOOD, r.steps);
}

const C_DICE = `
int[][] dp = new int[n + 1][target + 1];
dp[0][0] = 1;
for (int d = 1; d <= n; d++) for (int t = 1; t <= target; t++)
    for (int f = 1; f <= k && f <= t; f++) dp[d][t] = (dp[d][t] + dp[d - 1][t - f]) % MOD;`;
{
  const n = 2, k = 6, target = 7, dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(0)), r = recorder(); dp[0][0] = 1;
  const show = (hl) => BrainAnim.grid('dp[dice][sum]', dp, { cls: (i, j) => hl && hl[0] === i && hl[1] === j ? 'active' : '', rowLabels: idx(n + 1), colLabels: idx(target + 1) });
  r.step(0, '2 dice with 6 faces, target 7. dp[d][t] = ways to get sum t with d dice.', [show()]);
  for (let d = 1; d <= n; d++) { for (let t = 1; t <= target; t++) for (let f = 1; f <= k && f <= t; f++) dp[d][t] += dp[d - 1][t - f]; r.step(ln(C_DICE, 'dp[d][t] = (dp[d][t]'), `Row d = ${d} filled: each cell sums the previous row over faces 1..${k}.`, [show([d, Math.min(target, 7)])]); }
  r.step(ln(C_DICE, 'dp[d][t] = (dp[d][t]'), `dp[2][7] = <b>${dp[2][7]}</b> ways.`, [show([2, 7])]);
  ANIM['Number of Dice Rolls With Target Sum'] = W('Sum DP', C_DICE, r.steps);
}

const C_RESTORE = `
for (int i = 1; i <= n; i++) {
    long value = 0, pow = 1;
    for (int j = i - 1; j >= 0; j--) {
        value += (s.charAt(j) - '0') * pow;
        if (value > k) break;
        pow *= 10;
        if (s.charAt(j) != '0') dp[i] = (dp[i] + dp[j]) % MOD;
    }
}`;
{
  const s = '1317', k = 2000, dp = [1], r = recorder();
  r.step(0, 's = "1317", k = 2000. dp[i] = ways to split the first i digits into numbers in [1, k] without leading zeros.', [A('digits', chars(s)), A('dp', dp, { done: [0] })]);
  for (let i = 1; i <= 4; i++) { let v = 0, val = 0, pow = 1; const parts = []; for (let j = i - 1; j >= 0; j--) { val += (+s[j]) * pow; if (val > k) break; pow *= 10; if (s[j] !== '0') { v += dp[j]; parts.push(s.slice(j, i)); } } dp.push(v); r.step(ln(C_RESTORE, 'dp[i] = (dp[i] + dp[j])'), `dp[${i}]: last number can be ${parts.map(p => '"' + p + '"').join(', ')} → <b>${v}</b>.`, [A('digits', chars(s), { active: [i - 1] }), A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['Restore The Array'] = W('Last number', C_RESTORE, r.steps);
}

const C_SEC = `
for (int day = 2; day <= n; day++) {
    if (day - delay >= 1) sharing = (sharing + fresh[day - delay]) % MOD;
    if (day - forget >= 1) sharing = (sharing - fresh[day - forget] + MOD) % MOD;
    fresh[day] = sharing;
}`;
{
  const n = 6, delay = 2, forget = 4, fresh = [0, 1], r = recorder(); let sharing = 0;
  r.step(0, 'n = 6, delay = 2, forget = 4. fresh[d] = people who learn the secret on day d. Day 1: 1 person.', [A('fresh (index = day)', fresh, { done: [1] })]);
  for (let d = 2; d <= n; d++) { if (d - delay >= 1) sharing += fresh[d - delay]; if (d - forget >= 1) sharing -= fresh[d - forget]; fresh.push(sharing); r.step(ln(C_SEC, 'fresh[day] = sharing'), `Day ${d}: sharers now ${sharing} (add day ${d - delay}'s learners, remove day ${d - forget}'s). fresh[${d}] = ${sharing}.`, [A('fresh (index = day)', fresh, { active: [d], done: idx(d).filter(x => x >= 1) })]); }
  const total = fresh.slice(Math.max(1, n - forget + 1)).reduce((a, b) => a + b, 0);
  r.step(ln(C_SEC, 'for (int day'), `People who still remember on day 6 = fresh[3..6] = ${fresh.slice(3).join(' + ')} = <b>${total}</b>.`, [A('answer', [total], { done: [0] })]);
  ANIM['Number of People Aware of a Secret'] = W('Running sum of sharers', C_SEC, r.steps);
}

const C_ENERGY = `
int[] dp = new int[n];
for (int i = n - 1; i >= 0; i--) {
    dp[i] = energy[i] + (i + k < n ? dp[i + k] : 0);
    best = Math.max(best, dp[i]);
}`;
{
  const e = [5, 2, -10, -5, 1], k = 3, dp = Array(5).fill(0), r = recorder(); let best = -Infinity;
  r.step(0, 'energy = [5, 2, −10, −5, 1], k = 3. From i you collect energy[i] then continue at i + 3.', [A('energy', e), A('dp', dp)]);
  for (let i = 4; i >= 0; i--) { dp[i] = e[i] + (i + k < 5 ? dp[i + k] : 0); best = Math.max(best, dp[i]); r.step(ln(C_ENERGY, 'dp[i] = energy[i]'), `dp[${i}] = ${e[i]} + ${i + k < 5 ? dp[i + k] : 0} = ${dp[i]}. Best so far ${best}.`, [A('energy', e, { active: [i] }), A('dp', dp, { active: [i] })]); }
  ANIM['Taking Maximum Energy From the Mystic Dungeon'] = W('Suffix DP with stride', C_ENERGY, r.steps);
}

const C_ROT = `
for (int i = 0; i <= n; i++) {
    if (i < 10) dp[i] = (i == 0 || i == 1 || i == 8) ? 1 : (i == 2 || i == 5 || i == 6 || i == 9) ? 2 : 0;
    else {
        int a = dp[i / 10], b = dp[i % 10];
        dp[i] = (a == 0 || b == 0) ? 0 : (a == 1 && b == 1) ? 1 : 2;
    }
    if (dp[i] == 2) count++;
}`;
{
  const dp = [], r = recorder(); let count = 0;
  r.step(0, '0 = invalid, 1 = same after rotation, 2 = good (valid and different).', [A('dp', dp)]);
  for (let i = 0; i <= 12; i++) { let v; if (i < 10) v = [0, 1, 8].includes(i) ? 1 : [2, 5, 6, 9].includes(i) ? 2 : 0; else { const a = dp[Math.floor(i / 10)], b = dp[i % 10]; v = (a === 0 || b === 0) ? 0 : (a === 1 && b === 1) ? 1 : 2; } dp.push(v); if (v === 2) count++; r.step(ln(C_ROT, 'if (dp[i] == 2) count++'), `${i}: class ${v}${v === 2 ? ' → good, count ' + count : ''}.`, [A('dp', dp, { active: [i], done: idx(i) })]); }
  ANIM['Rotated Digits'] = W('Classify prefixes', C_ROT, r.steps);
}
