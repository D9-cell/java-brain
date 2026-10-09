const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => hl.some(([a, b, k]) => a === r && b === c && k) ? hl.find(([a, b]) => a === r && b === c)[2] : '', ...o });

const C_KD = `
for (int len = 2; len <= n; len++) {
    long[] next = new long[10];
    for (int d = 0; d < 10; d++)
        for (int to : MOVES[d]) next[to] = (next[to] + ways[d]) % MOD;
    ways = next;
}
return sum(ways);`;
{
  const MV = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9], [], [0, 1, 7], [2, 6], [1, 3], [2, 4]], r = recorder();
  let w = Array(10).fill(1);
  r.step(0, 'Length 1: every digit is a number on its own, so ways[d] = 1. Jump lists: 0→4,6 · 1→6,8 · 4→0,3,9 · 5→none …', [A('ways[d]', w)]);
  for (let len = 2; len <= 4; len++) {
    const nx = Array(10).fill(0);
    MV.forEach((ts, d) => ts.forEach(t => { nx[t] += w[d]; }));
    r.step(ln(C_KD, 'next[to] = (next[to]'), `Length ${len}: push every count along its jumps. e.g. next[4] = ways[0] + ways[3] + ways[9] = ${w[0]} + ${w[3]} + ${w[9]} = ${nx[4]}.`, [A('previous', w), A('next', nx, { active: [4] })]);
    w = nx;
  }
  r.step(ln(C_KD, 'return sum'), `Sum for n = 4: <b>${w.reduce((a, b) => a + b, 0)}</b> numbers.`, [A('ways[d]', w, { done: idx(10) })]);
  ANIM['Knight Dialer'] = W('Layer per digit', C_KD, r.steps);
}

const C_VOW = `
long a = 1, e = 1, i = 1, o = 1, u = 1;
for (int len = 2; len <= n; len++) {
    long na = (e + i + u) % MOD, ne = (a + i) % MOD, ni = (e + o) % MOD, no = i, nu = (i + o) % MOD;
    a = na; e = ne; i = ni; o = no; u = nu;
}
return (int) ((a + e + i + o + u) % MOD);`;
{
  const r = recorder(); let v = [1, 1, 1, 1, 1];
  r.step(ln(C_VOW, 'long a = 1'), 'Length 1: one string per vowel. Predecessors: a ← e,i,u · e ← a,i · i ← e,o · o ← i · u ← i,o.', [R('a e i o u', v)]);
  for (let len = 2; len <= 4; len++) {
    const [a, e, i, o, u] = v; v = [e + i + u, a + i, e + o, i, i + o];
    r.step(ln(C_VOW, 'long na'), `Length ${len}: a = e+i+u, e = a+i, i = e+o, o = i, u = i+o → [${v}].`, [R('a e i o u', v, { active: idx(5) })]);
  }
  r.step(ln(C_VOW, 'return'), `n = 4 → <b>${v.reduce((x, y) => x + y)}</b> strings.`, [R('a e i o u', v, { done: idx(5) })]);
  ANIM['Count Vowels Permutation'] = W('Five rolling counts', C_VOW, r.steps);
}

const C_ATT = `
for (int day = 0; day < n; day++) {
    long[][] next = new long[2][3];
    for (int a = 0; a < 2; a++)
        for (int l = 0; l < 3; l++) {
            next[a][0] += dp[a][l];                    // P
            if (a == 0) next[1][0] += dp[a][l];        // A
            if (l < 2) next[a][l + 1] += dp[a][l];     // L
        }
    dp = next;
}`.replace(/ +\/\/ [PAL]$/gm, '');
{
  const r = recorder(); let dp = [[1, 0, 0], [0, 0, 0]];
  const lab = { rowLabels: ['A=0', 'A=1'], colLabels: ['L=0', 'L=1', 'L=2'] };
  r.step(0, 'Empty record: 0 absences, 0 trailing lates. Rows = absences used, columns = lates at the end.', [G('dp[a][l]', dp, [[0, 0, 'active']], lab)]);
  for (let d = 1; d <= 4; d++) {
    const nx = [[0, 0, 0], [0, 0, 0]];
    for (let a = 0; a < 2; a++) for (let l = 0; l < 3; l++) { const v = dp[a][l]; nx[a][0] += v; if (a === 0) nx[1][0] += v; if (l < 2) nx[a][l + 1] += v; }
    dp = nx;
    r.step(ln(C_ATT, 'next[a][0] +='), `Day ${d}: P sends everything to column L=0, A moves row 0 down to row 1, L shifts one column right (never past L=2). Total ${dp.flat().reduce((x, y) => x + y)}.`, [G('dp[a][l]', dp, [], lab)]);
  }
  r.step(ln(C_ATT, 'dp = next'), `n = 4 → <b>${dp.flat().reduce((x, y) => x + y)}</b> rewarded records.`, [G('dp[a][l]', dp, [0, 1].flatMap(a => [0, 1, 2].map(l => [a, l, 'done'])), lab)]);
  ANIM['Student Attendance Record II'] = W('6-state machine', C_ATT, r.steps);
}

const C_PH = `
int r = 0, g = 0, b = 0;
for (int[] c : costs) {
    int nr = c[0] + Math.min(g, b), ng = c[1] + Math.min(r, b), nb = c[2] + Math.min(r, g);
    r = nr; g = ng; b = nb;
}
return Math.min(r, Math.min(g, b));`;
{
  const costs = [[14, 2, 11], [11, 14, 5], [14, 3, 10]], r = recorder(), table = [];
  let cur = [0, 0, 0];
  r.step(ln(C_PH, 'int r = 0'), 'costs = [[14,2,11],[11,14,5],[14,3,10]]. Each house: its price plus the cheaper of the other two colours before it.', [G('costs', costs, [], { colLabels: ['R', 'G', 'B'] })]);
  costs.forEach((c, i) => {
    const [x, y, z] = cur; cur = [c[0] + Math.min(y, z), c[1] + Math.min(x, z), c[2] + Math.min(x, y)]; table.push(cur);
    r.step(ln(C_PH, 'int nr'), `House ${i}: R = ${c[0]} + min(${y}, ${z}) = ${cur[0]}, G = ${c[1]} + min(${x}, ${z}) = ${cur[1]}, B = ${c[2]} + min(${x}, ${y}) = ${cur[2]}.`, [G('costs', costs, [0, 1, 2].map(k => [i, k, 'active']), { colLabels: ['R', 'G', 'B'] }), G('best total', table, [], { colLabels: ['R', 'G', 'B'] })]);
  });
  r.step(ln(C_PH, 'return'), `Answer = min(${cur}) = <b>${Math.min(...cur)}</b> (B, G, B → 2 + 5 + 3).`, [G('best total', table, [[2, 1, 'done']], { colLabels: ['R', 'G', 'B'] })]);
  ANIM['Paint House'] = W('Three rolling values', C_PH, r.steps);
}

const C_RD = `
Arrays.sort(a);
for (int i = a.length - 1; i >= 0; i--) {
    suffix += a[i];
    if (suffix <= 0) break;
    total += suffix;
}
return total;`;
{
  const a = [-9, -8, -1, 0, 5], r = recorder(); let suffix = 0, total = 0;
  r.step(ln(C_RD, 'Arrays.sort'), 'Sorted: [-9, -8, -1, 0, 5]. Adding a dish in front shifts every chosen dish one minute later, which adds the suffix sum.', [A('sorted', a)]);
  for (let i = a.length - 1; i >= 0; i--) {
    suffix += a[i];
    if (suffix <= 0) { r.step(ln(C_RD, 'break'), `Add ${a[i]} → suffix ${suffix} ≤ 0: stop, it would lower the total.`, [A('sorted', a, { bad: [i], done: idx(a.length).filter(k => k > i) })]); break; }
    total += suffix;
    r.step(ln(C_RD, 'total += suffix'), `Add ${a[i]} → suffix = ${suffix} > 0, total = ${total}.`, [A('sorted', a, { active: [i], done: idx(a.length).filter(k => k > i) }), R('total', [total])]);
  }
  r.step(ln(C_RD, 'return total'), `Answer <b>${total}</b>: cook -1, 0, 5 → -1·1 + 0·2 + 5·3 = 14.`, [R('total', [total], { done: [0] })]);
  ANIM['Reducing Dishes'] = W('Suffix greedy', C_RD, r.steps);
}

const C_MAS = `
long plus = 0, minus = 0;
for (int x : nums) {
    long np = Math.max(plus, minus + x), nm = Math.max(minus, plus - x);
    plus = np; minus = nm;
}
return plus;`;
{
  const a = [6, 2, 1, 2, 4, 5], r = recorder(); let p = 0, m = 0;
  r.step(ln(C_MAS, 'long plus'), 'nums = [6, 2, 1, 2, 4, 5]. plus: last pick was added. minus: last pick was subtracted.', [A('nums', a), R('plus / minus', [p, m])]);
  a.forEach((x, i) => { const np = Math.max(p, m + x), nm = Math.max(m, p - x); p = np; m = nm; r.step(ln(C_MAS, 'long np'), `x = ${x}: plus = max(plus, minus + ${x}) = ${p}; minus = max(minus, plus − ${x}) = ${m}.`, [A('nums', a, { active: [i], done: idx(i) }), R('plus / minus', [p, m])]); });
  r.step(ln(C_MAS, 'return plus'), `Answer <b>${p}</b> (6 − 1 + 5).`, [R('answer', [p], { done: [0] })]);
  ANIM['Maximum Alternating Subsequence Sum'] = W('Two states', C_MAS, r.steps);
}

const C_TIX = `
for (int d = 1; d <= last; d++) {
    if (!travel[d]) { dp[d] = dp[d - 1]; continue; }
    dp[d] = Math.min(dp[d - 1] + costs[0],
            Math.min(dp[Math.max(0, d - 7)] + costs[1], dp[Math.max(0, d - 30)] + costs[2]));
}
return dp[last];`;
{
  const days = [1, 4, 6, 7, 8, 20], costs = [2, 7, 15], r = recorder(), dp = [0];
  r.step(0, 'days = [1,4,6,7,8,20], costs 1-day 2, 7-day 7, 30-day 15. dp[d] = cheapest cover up to calendar day d.', [R('travel days', days)]);
  for (let d = 1; d <= 20; d++) {
    if (!days.includes(d)) { dp.push(dp[d - 1]); continue; }
    const o1 = dp[d - 1] + 2, o7 = dp[Math.max(0, d - 7)] + 7, o30 = dp[Math.max(0, d - 30)] + 15; dp.push(Math.min(o1, o7, o30));
    r.step(ln(C_TIX, 'dp[d] = Math.min'), `Day ${d}: 1-day ${o1}, 7-day ${o7}, 30-day ${o30} → dp[${d}] = ${dp[d]}.`, [A('dp', dp.slice(0, 21), { active: [d] })]);
  }
  r.step(ln(C_TIX, 'return dp[last]'), `Answer dp[20] = <b>${dp[20]}</b> (1-day on 1, 7-day on 4–10, 1-day on 20).`, [A('dp', dp, { done: [20] })]);
  ANIM['Minimum Cost For Tickets'] = W('Calendar DP', C_TIX, r.steps);
}

const C_BP = `
for (int i = n - 1; i >= 0; i--) {
    int next = Math.min(n, i + questions[i][1] + 1);
    dp[i] = Math.max(questions[i][0] + dp[next], dp[i + 1]);
}
return dp[0];`;
{
  const q = [[3, 2], [4, 3], [4, 4], [2, 5]], n = 4, dp = Array(n + 1).fill(0), r = recorder();
  r.step(0, 'questions = [[3,2],[4,3],[4,4],[2,5]] (points, brainpower). Fill from the right; dp[4] = 0.', [R('questions', q.map(x => `${x[0]}/${x[1]}`)), A('dp', dp)]);
  for (let i = n - 1; i >= 0; i--) { const nx = Math.min(n, i + q[i][1] + 1), take = q[i][0] + dp[nx]; dp[i] = Math.max(take, dp[i + 1]); r.step(ln(C_BP, 'dp[i] = Math.max'), `i = ${i}: solve → ${q[i][0]} + dp[${nx}] = ${take}; skip → dp[${i + 1}] = ${dp[i + 1]}. dp[${i}] = ${dp[i]}.`, [A('dp', dp, { active: [i], done: idx(n + 1).filter(k => k > i) })]); }
  r.step(ln(C_BP, 'return dp[0]'), `Answer <b>${dp[0]}</b> (solve questions 0 and 3).`, [A('dp', dp, { done: [0] })]);
  ANIM['Solving Questions With Brainpower'] = W('Right to left', C_BP, r.steps);
}

const C_VP = `
ok[0] = true;
for (int i = 2; i <= n; i++) {
    if (nums[i - 1] == nums[i - 2] && ok[i - 2]) ok[i] = true;
    if (i >= 3 && ok[i - 3] && (threeEqual || threeConsecutive)) ok[i] = true;
}
return ok[n];`;
{
  const a = [4, 4, 4, 5, 6], r = recorder(), ok = [true, false];
  r.step(ln(C_VP, 'ok[0] = true'), 'nums = [4,4,4,5,6]. ok[i]: the first i numbers split into valid blocks.', [A('nums', a), A('ok', ok.map(b => b ? 'T' : 'F'))]);
  for (let i = 2; i <= 5; i++) {
    let v = false, why = '';
    if (a[i - 1] === a[i - 2] && ok[i - 2]) { v = true; why = `pair ${a[i - 2]},${a[i - 1]} after ok[${i - 2}]`; }
    if (!v && i >= 3 && ok[i - 3]) { const [x, y, z] = a.slice(i - 3, i); if ((x === y && y === z) || (y === x + 1 && z === y + 1)) { v = true; why = `triple ${x},${y},${z} after ok[${i - 3}]`; } }
    ok.push(v);
    r.step(ln(C_VP, v && why.startsWith('pair') ? 'nums[i - 1] == nums[i - 2]' : 'ok[i - 3]'), `ok[${i}] = ${v ? 'true: ' + why : 'false: no valid last block'}.`, [A('nums', a, { active: idx(i).slice(Math.max(0, i - 3)) }), A('ok', ok.map(b => b ? 'T' : 'F'), { active: [i] })]);
  }
  r.step(ln(C_VP, 'return ok[n]'), `ok[5] = <b>${ok[5]}</b>: "4,4" + "4,5,6".`, [A('ok', ok.map(b => b ? 'T' : 'F'), { done: [5] })]);
  ANIM['Check if There is a Valid Partition For The Array'] = W('Last block', C_VP, r.steps);
}

const C_FLIP = `
int ones = 0, flips = 0;
for (char c : s.toCharArray()) {
    if (c == '1') ones++;
    else flips = Math.min(flips + 1, ones);
}
return flips;`;
{
  const s = '010110', r = recorder(); let ones = 0, flips = 0;
  r.step(ln(C_FLIP, 'int ones'), 's = "010110". ones = flips needed if everything so far becomes 0; flips = best answer so far.', [A('s', [...s])]);
  [...s].forEach((c, i) => {
    if (c === '1') { ones++; r.step(ln(C_FLIP, 'ones++'), `'1': ones = ${ones}; a 1 never breaks monotonicity by itself.`, [A('s', [...s], { active: [i], done: idx(i) }), R('ones / flips', [ones, flips])]); }
    else { const was = flips; flips = Math.min(flips + 1, ones); r.step(ln(C_FLIP, 'flips = Math.min'), `'0': flip it (${was} + 1) or flip all ${ones} earlier ones → flips = ${flips}.`, [A('s', [...s], { active: [i], done: idx(i) }), R('ones / flips', [ones, flips])]); }
  });
  r.step(ln(C_FLIP, 'return flips'), `Answer <b>${flips}</b> → "000111" or "011111".`, [R('answer', [flips], { done: [0] })]);
  ANIM['Flip String to Monotone Increasing'] = W('One pass', C_FLIP, r.steps);
}

const C_KST = `
long total = 0;
for (int j = 0; j <= 31; j++) {
    long downs = (1L << j) - k;
    if (downs >= 0 && downs <= j + 1) total += choose(j + 1, (int) downs);
}
return (int) total;`;
{
  const k = 3, r = recorder(), C = (n, m) => { let c = 1; for (let i = 1; i <= m; i++) c = c * (n - m + i) / i; return c; }; let total = 0;
  r.step(0, 'k = 3. After j ups Alice stands on 1 + 1 + 2 + … + 2^(j−1) = 2^j. She needs 2^j − k downs, at most one in each of the j + 1 gaps.', [R('ups j', [0, 1, 2, 3])]);
  for (let j = 0; j <= 3; j++) {
    const d = (1 << j) - k, ok = d >= 0 && d <= j + 1, add = ok ? C(j + 1, d) : 0; total += add;
    r.step(ln(C_KST, ok ? 'total += choose' : 'long downs'), `j = ${j}: position ${1 << j}, downs = ${d}${ok ? ` → C(${j + 1}, ${d}) = ${add}` : ' → impossible'}. total = ${total}.`, [R('ups j', [0, 1, 2, 3], { active: [j], done: idx(j) }), R('total', [total])]);
  }
  r.step(ln(C_KST, 'return'), `Answer for k = 3: <b>${total}</b>.`, [R('total', [total], { done: [0] })]);
  ANIM['Find Number of Ways to Reach the K-th Stair'] = W('Count the downs', C_KST, r.steps);
}

const C_SPELL = `
for (int i = 0; i < m; i++) {
    while (v[j] < v[i] - 2) j++;
    long take = tot[i] + (j > 0 ? dp[j - 1] : 0);
    dp[i] = Math.max(i > 0 ? dp[i - 1] : 0, take);
}
return dp[m - 1];`;
{
  const v = [1, 3, 4, 6], tot = [2, 3, 4, 6], dp = [], r = recorder(); let j = 0;
  r.step(0, 'power = [1,1,3,4,6] → distinct values 1, 3, 4, 6 with totals 2, 3, 4, 6. Taking v blocks every value within 2 of it.', [A('value', v), A('total', tot)]);
  for (let i = 0; i < 4; i++) {
    while (v[j] < v[i] - 2) j++;
    const take = tot[i] + (j > 0 ? dp[j - 1] : 0); dp.push(Math.max(i > 0 ? dp[i - 1] : 0, take));
    r.step(ln(C_SPELL, 'long take'), `v = ${v[i]}: last compatible value is ${j > 0 ? v[j - 1] : 'none'} → take = ${tot[i]} + ${j > 0 ? dp[j - 1] : 0} = ${take}; skip = ${i > 0 ? dp[i - 1] : 0}. dp = ${dp[i]}.`, [A('value', v, { active: [i], done: j > 0 ? [j - 1] : [] }), A('dp', dp)]);
  }
  r.step(ln(C_SPELL, 'return'), `Answer <b>${dp[3]}</b> (1, 1, 4 or 1, 1, 6 …).`, [A('dp', dp, { done: [3] })]);
  ANIM['Maximum Total Damage With Spell Casting'] = W('Sorted House Robber', C_SPELL, r.steps);
}

const C_DG = `
int res = 0, cur = 0;
for (int i = idx; i < s.length(); i++) {
    cur += s.charAt(i) - '0';
    if (cur >= prev) res += count(s, i + 1, cur, memo);
}
return memo[idx][prev] = res;`;
{
  const s = '1119', r = recorder(), groups = [];
  const rec = (idx, prev, path) => { if (idx === s.length) { groups.push(path.join(' | ')); return; } let cur = 0; for (let i = idx; i < s.length; i++) { cur += +s[i]; if (cur >= prev) rec(i + 1, cur, [...path, s.slice(idx, i + 1)]); } };
  rec(0, 0, []);
  r.step(0, 's = "1119". From each start, try every next group whose digit sum is at least the previous group sum.', [A('s', [...s])]);
  groups.forEach((g, k) => r.step(ln(C_DG, 'res += count'), `Grouping ${k + 1}: ${g}`, [A('s', [...s]), R('found', groups.slice(0, k + 1), { active: [k] })]));
  r.step(ln(C_DG, 'return memo'), `Total <b>${groups.length}</b> groupings. The memo key (start, previous sum) makes repeated suffixes free.`, [R('found', groups, { done: idx(groups.length) })]);
  ANIM['Count digit groupings of a number'] = W('Try the next group', C_DG, r.steps);
}

const C_SOUP = `
if (a <= 0 && b <= 0) return 0.5;
if (a <= 0) return 1.0;
if (b <= 0) return 0.0;
return 0.25 * (prob(a - 4, b) + prob(a - 3, b - 1)
             + prob(a - 2, b - 2) + prob(a - 1, b - 3));`;
{
  const m = 4, P = [], r = recorder();
  const f = (a, b) => a <= 0 && b <= 0 ? 0.5 : a <= 0 ? 1 : b <= 0 ? 0 : 0.25 * (f(a - 4, b) + f(a - 3, b - 1) + f(a - 2, b - 2) + f(a - 1, b - 3));
  r.step(0, 'n = 100 ml → m = 4 scoops each. p(a, b) = chance A empties first (+ half a tie) with a, b scoops left.', [R('scoops', [m, m])]);
  for (let a = 1; a <= m; a++) { P.push([1, 2, 3, 4].map(b => +f(a, b).toFixed(3))); r.step(ln(C_SOUP, 'return 0.25'), `Row a = ${a}: each cell averages the four servings below it.`, [G('p(a, b)', P, [], { rowLabels: idx(a).map(x => x + 1), colLabels: [1, 2, 3, 4] })]); }
  r.step(ln(C_SOUP, 'return 0.25'), `p(4, 4) = <b>${f(4, 4)}</b> for n = 100.`, [G('p(a, b)', P, [[3, 3, 'done']], { rowLabels: [1, 2, 3, 4], colLabels: [1, 2, 3, 4] })]);
  ANIM['Soup Servings'] = W('Probability memo', C_SOUP, r.steps);
}

const C_STAY = `
int width = Math.min(arrLen, steps / 2 + 1);
for (int s = 0; s < steps; s++) {
    for (int p = 0; p < width; p++) {
        next[p] += dp[p];
        if (p > 0) next[p - 1] += dp[p];
        if (p + 1 < width) next[p + 1] += dp[p];
    }
    dp = next;
}
return dp[0];`;
{
  const steps = 4, width = 3, r = recorder(); let dp = [1, 0, 0];
  r.step(ln(C_STAY, 'int width'), 'steps = 4, arrLen = 3. Going past steps / 2 = 2 never pays, so width = min(3, 3) = 3. Start: one walk at 0.', [A('dp[pos]', dp)]);
  for (let s = 1; s <= steps; s++) { const nx = [0, 0, 0]; for (let p = 0; p < width; p++) { nx[p] += dp[p]; if (p > 0) nx[p - 1] += dp[p]; if (p + 1 < width) nx[p + 1] += dp[p]; } dp = nx; r.step(ln(C_STAY, 'next[p] += dp[p]'), `After ${s} step(s): stay, left, right from every cell → [${dp}].`, [A('dp[pos]', dp, { active: [0] })]); }
  r.step(ln(C_STAY, 'return dp[0]'), `Walks back at 0 after 4 steps: <b>${dp[0]}</b>.`, [A('dp[pos]', dp, { done: [0] })]);
  ANIM['Number of Ways to Stay in the Same Place After Some Steps'] = W('Layers', C_STAY, r.steps);
}

const C_TRI = `
if (a < x) {
    nUp1 = Math.max(a, up1) + x;
    nUp2 = Math.max(down, up2) + x;
} else if (a > x) {
    nDown = Math.max(up1, down) + x;
}
best = Math.max(best, up2);`;
{
  const a = [0, -2, -1, -3, 0, 2, -1], NEG = -Infinity, r = recorder(); let u1 = NEG, d = NEG, u2 = NEG, best = NEG;
  const show = v => v === NEG ? '−∞' : v;
  r.step(0, 'nums = [0,-2,-1,-3,0,2,-1]. Track best sums ending here in rise 1, fall, rise 2.', [A('nums', a)]);
  for (let i = 1; i < a.length; i++) {
    const p = a[i - 1], x = a[i]; let n1 = NEG, nd = NEG, n2 = NEG;
    if (p < x) { n1 = Math.max(p, u1) + x; n2 = Math.max(d, u2) + x; } else if (p > x) nd = Math.max(u1, d) + x;
    u1 = n1; d = nd; u2 = n2; best = Math.max(best, u2);
    r.step(ln(C_TRI, p < x ? 'nUp1' : p > x ? 'nDown' : 'best'), `${p} → ${x} ${p < x ? 'rises' : p > x ? 'falls' : 'is flat'}: up1 = ${show(u1)}, down = ${show(d)}, up2 = ${show(u2)}.`, [A('nums', a, { active: [i - 1, i] }), R('up1 / down / up2', [show(u1), show(d), show(u2)])]);
  }
  r.step(ln(C_TRI, 'best = Math.max'), `Answer <b>${best}</b>: [-2, -1, -3, 0] (up, down, up).`, [R('best', [best], { done: [0] })]);
  ANIM['Trionic Array II'] = W('Three phases', C_TRI, r.steps);
}

const C_ZZ = `
long below = 0;
for (int v = 0; v < m; v++) { nUp[v] = below; below += down[v]; }
long above = 0;
for (int v = m - 1; v >= 0; v--) { nDown[v] = above; above += up[v]; }
up = nUp; down = nDown;`;
{
  const m = 3, r = recorder(); let up = [1, 1, 1], down = [1, 1, 1];
  r.step(0, 'n = 4, values 1..3. up[v] = arrays ending at v whose last step went up (start both at 1).', [A('up', up), A('down', down)]);
  for (let len = 2; len <= 4; len++) {
    const nu = [], nd = []; let below = 0; for (let v = 0; v < m; v++) { nu[v] = below; below += down[v]; } let above = 0; for (let v = m - 1; v >= 0; v--) { nd[v] = above; above += up[v]; }
    up = nu; down = nd;
    r.step(ln(C_ZZ, 'nUp[v] = below'), `Length ${len}: up[v] = sum of down below v, down[v] = sum of up above v.`, [A('up', up, { active: idx(m) }), A('down', down, { active: idx(m) })]);
  }
  r.step(ln(C_ZZ, 'up = nUp'), `Total = <b>${[...up, ...down].reduce((a, b) => a + b)}</b> zigzag arrays of length 4.`, [A('up', up, { done: idx(m) }), A('down', down, { done: idx(m) })]);
  ANIM['Number of ZigZag Arrays I'] = W('Prefix-sum layers', C_ZZ, r.steps);
}

const C_PL = `
for (int i = 1; i <= goal; i++)
    for (int j = 1; j <= Math.min(i, n); j++) {
        long fresh = dp[i - 1][j - 1] * (n - j + 1);
        long replay = dp[i - 1][j] * Math.max(j - k, 0);
        dp[i][j] = (fresh + replay) % MOD;
    }
return (int) dp[goal][n];`;
{
  const n = 3, goal = 4, k = 1, dp = Array.from({ length: goal + 1 }, () => Array(n + 1).fill(0)), r = recorder(); dp[0][0] = 1;
  r.step(0, 'n = 3 songs, goal = 4, k = 1. dp[i][j] = length i using j distinct songs.', [G('dp[i][j]', dp)]);
  for (let i = 1; i <= goal; i++) for (let j = 1; j <= Math.min(i, n); j++) {
    const fr = dp[i - 1][j - 1] * (n - j + 1), rp = dp[i - 1][j] * Math.max(j - k, 0); dp[i][j] = fr + rp;
    r.step(ln(C_PL, 'dp[i][j] = (fresh'), `dp[${i}][${j}] = new song ${dp[i - 1][j - 1]}·${n - j + 1} + replay ${dp[i - 1][j]}·${Math.max(j - k, 0)} = ${dp[i][j]}.`, [G('dp[i][j]', dp.map(x => x.slice()), [[i, j, 'active'], [i - 1, j - 1, 'warn'], [i - 1, j, 'warn']])]);
  }
  r.step(ln(C_PL, 'return'), `Answer dp[4][3] = <b>${dp[goal][n]}</b>.`, [G('dp[i][j]', dp, [[goal, n, 'done']])]);
  ANIM['Number of Music Playlists'] = W('New or replay', C_PL, r.steps);
}

const C_KIP = `
for (int i = 2; i <= n; i++) {
    long window = 0;
    for (int j = 0; j <= k; j++) {
        window += dp[j];
        if (j - i >= 0) window -= dp[j - i];
        next[j] = window;
    }
    dp = next;
}`;
{
  const n = 4, k = 4, r = recorder(); let dp = [1, 0, 0, 0, 0]; const rows = [dp.slice()];
  r.step(0, 'n = 4, k = 4. With one number there is one permutation and 0 inverse pairs.', [G('dp[i][j]', rows, [], { rowLabels: [1] })]);
  for (let i = 2; i <= n; i++) {
    const nx = []; let w = 0; for (let j = 0; j <= k; j++) { w += dp[j]; if (j - i >= 0) w -= dp[j - i]; nx.push(w); } dp = nx; rows.push(dp.slice());
    r.step(ln(C_KIP, 'next[j] = window'), `Insert ${i}: it can create 0..${i - 1} new pairs, so dp[${i}][j] = sum of the previous row over the window j−${i - 1}..j → [${dp}].`, [G('dp[i][j]', rows, idx(k + 1).map(j => [i - 1, j, 'active']), { rowLabels: idx(i).map(x => x + 1) })]);
  }
  r.step(0, `Permutations of 1..4 with exactly 4 inverse pairs: <b>${dp[k]}</b>.`, [G('dp[i][j]', rows, [[n - 1, k, 'done']], { rowLabels: [1, 2, 3, 4] })]);
  ANIM['K Inverse Pairs Array'] = W('Window sums', C_KIP, r.steps);
}

const C_SEG = `
public int numberOfSetsMath(int n, int k) {
    // add k - 1 virtual points so shared endpoints become distinct
    return C(n + k - 1, 2 * k);
}`.replace(/\n +\/\/.*$/m, '');
{
  const n = 4, k = 2, r = recorder(), sets = [];
  const rec = (from, left, path) => { if (left === 0) { sets.push(path.join(' ')); return; } for (let a = from; a < n; a++) for (let b = a + 1; b < n; b++) rec(b, left - 1, [...path, `[${a},${b}]`]); };
  rec(0, k, []);
  r.step(0, 'n = 4 points (0..3), k = 2 segments; endpoints may be shared.', [A('points', idx(n))]);
  sets.forEach((s, i) => r.step(0, `Set ${i + 1}: ${s}`, [A('points', idx(n)), R('sets', sets.slice(0, i + 1), { active: [i] })]));
  r.step(ln(C_SEG, 'return C'), `C(n + k − 1, 2k) = C(5, 4) = <b>${sets.length}</b>.`, [R('sets', sets, { done: idx(sets.length) })]);
  ANIM['Number of Sets of K Non-Overlapping Line Segments'] = W('Stars and bars', C_SEG, r.steps);
}

const C_OOB = `
for (int move = 0; move < maxMove; move++) {
    for (each cell (r, c) with dp[r][c] > 0)
        for (int[] d : DIRS) {
            if (off the grid) out += dp[r][c];
            else next[nr][nc] += dp[r][c];
        }
    dp = next;
}
return out;`;
{
  const m = 2, n = 2, r = recorder(); let dp = [[1, 0], [0, 0]], out = 0;
  r.step(0, '2 × 2 grid, start (0, 0), maxMove = 2.', [G('dp', dp, [[0, 0, 'active']]), R('out', [out])]);
  for (let mv = 1; mv <= 2; mv++) {
    const nx = [[0, 0], [0, 0]]; let gained = 0;
    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = i + a, y = j + b; if (x < 0 || x >= m || y < 0 || y >= n) gained += dp[i][j]; else nx[x][y] += dp[i][j]; }
    out += gained; dp = nx;
    r.step(ln(C_OOB, 'out += dp'), `Move ${mv}: ${gained} path(s) fall off; the rest spread to neighbours. out = ${out}.`, [G('dp', dp), R('out', [out], { active: [0] })]);
  }
  r.step(ln(C_OOB, 'return out'), `Answer <b>${out}</b>.`, [R('out', [out], { done: [0] })]);
  ANIM['Out of Boundary Paths'] = W('Spread and count exits', C_OOB, r.steps);
}

const C_KP = `
for (int step = 0; step < k; step++) {
    for (each square (r, c))
        for (int[] mv : MOVES)
            if (on the board) next[nr][nc] += dp[r][c] / 8;
    dp = next;
}
return sum of dp;`;
{
  const n = 3, r = recorder(), MV = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]]; let dp = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
  const fmt = g => g.map(row => row.map(v => v ? +v.toFixed(4) : 0)), sum = g => g.flat().reduce((a, b) => a + b, 0);
  r.step(0, '3 × 3 board, start (0, 0), k = 2 moves. Probability 1 on the start.', [G('P', fmt(dp), [[0, 0, 'active']])]);
  for (let s = 1; s <= 2; s++) {
    const nx = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (dp[i][j]) for (const [a, b] of MV) { const x = i + a, y = j + b; if (x >= 0 && x < n && y >= 0 && y < n) nx[x][y] += dp[i][j] / 8; }
    dp = nx;
    r.step(ln(C_KP, 'next[nr][nc] += dp'), `After move ${s}: on-board mass = ${+sum(dp).toFixed(4)}.`, [G('P', fmt(dp))]);
  }
  r.step(ln(C_KP, 'return sum'), `Answer <b>${sum(dp)}</b>.`, [G('P', fmt(dp), [[0, 0, 'done']])]);
  ANIM['Knight Probability in Chessboard'] = W('Probability layers', C_KP, r.steps);
}

const C_CR = `
long res = i == finish ? 1 : 0;
for (int j = 0; j < loc.length; j++) {
    int cost = Math.abs(loc[i] - loc[j]);
    if (j != i && cost <= f) res += routes(loc, j, finish, f - cost, memo);
}
return memo[i][f] = res % MOD;`;
{
  const loc = [2, 3, 6, 8, 4], start = 1, finish = 3, fuel = 5, r = recorder(), found = [];
  const rec = (i, f, path) => { if (i === finish) found.push(path.join('→')); for (let j = 0; j < loc.length; j++) { const c = Math.abs(loc[i] - loc[j]); if (j !== i && c <= f) rec(j, f - c, [...path, j]); } };
  rec(start, fuel, [start]);
  r.step(0, 'locations = [2,3,6,8,4], start 1, finish 3, fuel 5. Each standing on finish is one route.', [A('locations', loc, { active: [start], done: [finish] })]);
  found.forEach((p, i) => r.step(ln(C_CR, 'res += routes'), `Route ${i + 1}: ${p}`, [A('locations', loc, { done: [finish] }), R('routes', found.slice(0, i + 1), { active: [i] })]));
  r.step(ln(C_CR, 'return memo'), `Answer <b>${found.length}</b>. Memo on (city, fuel) avoids redoing shared suffixes.`, [R('routes', found, { done: idx(found.length) })]);
  ANIM['Count All Possible Routes'] = W('Memo over (city, fuel)', C_CR, r.steps);
}

const C_MAS2 = `
int res = x + best(a, k, i + 1, o1, o2, memo);
if (o1 > 0) res = Math.min(res, (x + 1) / 2 + best(a, k, i + 1, o1 - 1, o2, memo));
if (o2 > 0 && x >= k) res = Math.min(res, x - k + best(a, k, i + 1, o1, o2 - 1, memo));
if (o1 > 0 && o2 > 0) res = Math.min(res, both + best(a, k, i + 1, o1 - 1, o2 - 1, memo));
return memo[i][o1][o2] = res;`;
{
  const a = [2, 8, 3, 19, 3], k = 3, r = recorder();
  r.step(0, 'nums = [2,8,3,19,3], k = 3, op1 = 1, op2 = 1. Per index: nothing, halve, subtract, or both.', [A('nums', a)]);
  const opts = x => { const h = Math.ceil(x / 2), o = [`keep ${x}`, `halve ${h}`]; if (x >= k) o.push(`−k ${x - k}`); const both = Math.min(h >= k ? h - k : Infinity, x >= k ? Math.ceil((x - k) / 2) : Infinity); if (both < Infinity) o.push(`both ${both}`); return o; };
  [1, 3].forEach(i => r.step(ln(C_MAS2, 'if (o1 > 0) res'), `Index ${i} (${a[i]}): options ${opts(a[i]).join(', ')}.`, [A('nums', a, { active: [i] })]));
  r.step(ln(C_MAS2, 'if (o2 > 0'), 'Best plan: subtract k from 8 → 5, halve 19 → 10.', [A('after', [2, 5, 3, 10, 3], { done: [1, 3] })]);
  r.step(ln(C_MAS2, 'return memo'), 'Sum = 2 + 5 + 3 + 10 + 3 = <b>23</b>.', [R('answer', [23], { done: [0] })]);
  ANIM['Minimum Array Sum'] = W('Memo over budgets', C_MAS2, r.steps);
}
