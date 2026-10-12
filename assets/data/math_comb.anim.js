const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const nCr = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); };
const fact = n => n <= 1 ? 1 : n * fact(n - 1);

const C_CG = `
return (int) (power(5, (n + 1) / 2) * power(4, n / 2) % MOD);`;
{
  const r = recorder(), n = 4;
  r.step(0, 'n = 4: indexes 0..3. Even indexes take {0,2,4,6,8}, odd indexes take {2,3,5,7}.', [A('choices', [5, 4, 5, 4], { active: [0, 2], warn: [1, 3] })]);
  r.step(ln(C_CG, 'return'), '⌈4/2⌉ = 2 even slots, ⌊4/2⌋ = 2 odd slots: 5² · 4² = <b>400</b>.', [R('answer', [400], { done: [0] })], { evens: 2, odds: 2 });
  ANIM['Count Good Numbers'] = W('Product + fast power', C_CG, r.steps);
}

const C_CO = `
for (int i = 1; i <= n; i++) ways = ways * (2L * i - 1) % MOD * i % MOD;`;
{
  const r = recorder(); let ways = 1; const seq = [];
  for (let i = 1; i <= 4; i++) { ways *= (2 * i - 1) * i; seq.push(ways); r.step(ln(C_CO, 'ways = ways'), `Order ${i}: choose 2 of ${2 * i} positions, P first → ×${(2 * i - 1) * i}. ways = ${ways}.`, [R('ways by n', seq, { active: [seq.length - 1] })], { i, ways }); }
  r.step(0, 'Same as (2n)! / 2ⁿ: 8! / 16 = 2520.', [R('ways by n', seq, { done: [3] })]);
  ANIM['Count All Valid Pickup and Delivery Options'] = W('Insertion product', C_CO, r.steps);
}

const C_DV = `
return (int) (nCr(n - 1, k) * 2 % MOD);`;
{
  const r = recorder(), n = 5, pos = 2, k = 2;
  r.step(0, 'n = 5, pos = 2, k = 2. The four other people each have one direction that makes them visible.', [lane('people', ['?', '?', 'pos', '?', '?'], { active: [2] })]);
  r.step(0, 'Pick 2 of the 4 to be visible, e.g. people 0 and 4. Their directions are now fixed, and so are the others.', [lane('people', ['vis', 'hid', 'pos', 'hid', 'vis'], { done: [0, 4], ghost: [1, 3] })]);
  r.step(ln(C_DV, 'return'), `C(4, 2) = ${nCr(4, 2)} choices × 2 for pos = <b>${2 * nCr(4, 2)}</b>.`, [R('answer', [2 * nCr(4, 2)], { done: [0] })]);
  ANIM['Direction Assignments with Exactly K Visible People'] = W('nCr + Fermat', C_DV, r.steps);
}

const C_CK = `
long choose = fact[n - 1] * inv[k] % MOD * inv[n - 1 - k] % MOD;
return (int) (m * choose % MOD * power(m - 1, n - 1 - k) % MOD);`;
{
  const r = recorder(), n = 4, m = 2, k = 2;
  r.step(0, 'n = 4, m = 2, k = 2. There are 3 joints between neighbours.', [lane('array', ['a0', 'a1', 'a2', 'a3']), lane('joints', ['·', '·', '·'])]);
  r.step(ln(C_CK, 'long choose'), `Choose which 2 joints are equal: C(3, 2) = ${nCr(3, 2)}.`, [lane('joints', ['=', '=', '≠'], { done: [0, 1], warn: [2] })]);
  r.step(ln(C_CK, 'return'), `First value m = 2 ways, the one unequal joint m − 1 = 1 way: 2 · 3 · 1 = <b>6</b>.`, [R('answer', [6], { done: [0] })], { choose: 3 });
  ANIM['Count the Number of Arrays with K Matching Adjacent Elements'] = W('Combinatorics', C_CK, r.steps);
}

const C_IA = `
for (int p = 2; p * p <= x; p++) {
    int e = 0;
    while (x % p == 0) {
        x /= p;
        e++;
    }
    ways = ways * C[n - 1 + e][e] % MOD;
}
if (x > 1) ways = ways * C[n][1] % MOD;`;
{
  const r = recorder(), n = 5; let total = 0;
  for (let v = 1; v <= 3; v++) { const w = v === 1 ? 1 : nCr(n, 1); total += w; r.step(ln(C_IA, v === 1 ? 'for (int p' : 'if (x > 1)'), v === 1 ? 'v = 1: only [1,1,1,1,1] → 1.' : `v = ${v} is prime, exponent 1: choose where it first appears among ${n} slots → C(${n}, 1) = ${w}.`, [R('ways per v', range(1, v).map(u => u === 1 ? 1 : nCr(n, 1)), { active: [v - 1] })], { v, total }); }
  r.step(0, `n = 5, maxValue = 3 → <b>${total}</b>.`, [R('total', [total], { done: [0] })]);
  const r2 = recorder(), n2 = 3, v = 12;
  r2.step(0, 'v = 12 = 2² · 3 with n = 3. Exponents climb independently along the array.', [lane('exponent of 2', ['0..2', '…', '2']), lane('exponent of 3', ['0..1', '…', '1'])]);
  r2.step(ln(C_IA, 'ways = ways * C'), `Prime 2: C(${n2 - 1} + 2, 2) = ${nCr(n2 + 1, 2)}. Prime 3: C(${n2}, 1) = ${nCr(n2, 1)}.`, [R('factors', [nCr(n2 + 1, 2), nCr(n2, 1)], { active: [0, 1] })]);
  r2.step(0, `Ideal arrays of length 3 ending at 12: <b>${nCr(n2 + 1, 2) * nCr(n2, 1)}</b>.`, [R('ways', [nCr(n2 + 1, 2) * nCr(n2, 1)], { done: [0] })]);
  ANIM['Count the Number of Ideal Arrays'] = [{ name: 'n = 5, maxValue = 3', code: C_IA, steps: r.steps }, { name: 'One value: 12', code: C_IA, steps: r2.steps }];
}

const C_RB = `
int root = list.get(0);
for (int i = 1; i < list.size(); i++) (list.get(i) < root ? left : right).add(list.get(i));
return C[list.size() - 1][left.size()] * ways(left) % MOD * ways(right) % MOD;`;
{
  const r = recorder(), nums = [3, 4, 5, 1, 2];
  r.step(ln(C_RB, 'int root'), 'nums = [3,4,5,1,2]. Root 3 must come first.', [A('nums', nums, { active: [0] })]);
  r.step(ln(C_RB, 'left : right'), 'Left subtree [1,2], right subtree [4,5]. Each keeps its own order.', [R('left', [1, 2], { warn: [0, 1] }), R('right', [4, 5], { done: [0, 1] })]);
  r.step(ln(C_RB, 'return C'), `Interleave 2 + 2 items: C(4, 2) = ${nCr(4, 2)}. Both subtrees have 1 way each.`, [R('ways', [nCr(4, 2)])], { ways: 6 });
  r.step(0, 'Minus the original order → <b>5</b>.', [R('answer', [5], { done: [0] })]);
  ANIM['Number of Ways to Reorder Array to Get Same BST'] = W('Recursive split + Pascal', C_RB, r.steps);
}

const C_CU = `
for (int i = 1; i < complexity.length; i++) {
    if (complexity[i] <= complexity[0]) return 0;
    ways = ways * i % MOD;
}`;
{
  const run = c => { const r = recorder(); let ways = 1; for (let i = 1; i < c.length; i++) { if (c[i] <= c[0]) { r.step(ln(C_CU, 'return 0'), `complexity[${i}] = ${c[i]} ≤ ${c[0]} → nobody can unlock it → <b>0</b>.`, [A('complexity', c, { bad: [i], active: [0] })]); return r.steps; } ways *= i; r.step(ln(C_CU, 'ways = ways'), `${c[i]} > ${c[0]}: computer 0 can unlock it. ways = ${ways}.`, [A('complexity', c, { done: range(1, i), active: [0] })], { ways }); } r.step(0, `Answer (n − 1)! = <b>${ways}</b>.`, [R('answer', [ways], { done: [0] })]); return r.steps; };
  ANIM['Count the Number of Computer Unlocking Permutations'] = [{ name: '[1,2,3,4]', code: C_CU, steps: run([1, 2, 3, 4]) }, { name: '[3,3,3,4]', code: C_CU, steps: run([3, 3, 3, 4]) }];
}

const C_EW = `
for (int i = 1; i < maxDepth; i++) ways = ways * 2 % MOD;
return (int) ways;`;
{
  const r = recorder(), par = { 1: null, 2: 1, 3: 1, 4: 3, 5: 3 };
  r.step(0, 'Edges 1-2, 1-3, 3-4, 3-5. BFS from 1 gives max depth 2 (node 4 or 5).', [tree('tree', par, { cls: { 1: 'active', 4: 'done' }, badge: { 1: 'd0', 2: 'd1', 3: 'd1', 4: 'd2', 5: 'd2' } })]);
  r.step(0, 'Path 1 → 3 → 4 has 2 edges. Weights (1,2) and (2,1) give odd sums; (1,1) and (2,2) do not.', [R('assignments', ['1+2 ✓', '2+1 ✓', '1+1', '2+2'], { done: [0, 1], ghost: [2, 3] })]);
  r.step(ln(C_EW, 'return'), '2^(2 − 1) = <b>2</b>.', [R('answer', [2], { done: [0] })], { maxDepth: 2 });
  ANIM['Number of Ways to Assign Edge Weights I'] = W('BFS + power of two', C_EW, r.steps);
}

const C_DC = `
for (int over = 0; over <= 3; over++) {
    long rest = n - (long) over * (limit + 1);
    if (rest < 0) break;
    long ways = choose3(over) * (rest + 2) * (rest + 1) / 2;
    total += over % 2 == 0 ? ways : -ways;
}`;
{
  const r = recorder(), n = 5, limit = 2; let total = 0;
  for (let over = 0; over <= 3; over++) { const rest = n - over * (limit + 1); if (rest < 0) { r.step(ln(C_DC, 'break'), `${over} children over the limit would need ${over * (limit + 1)} > ${n} candies → stop.`, [R('total', [total])], { over }); break; } const w = [1, 3, 3, 1][over] * (rest + 2) * (rest + 1) / 2; total += over % 2 ? -w : w; r.step(ln(C_DC, 'total +='), `${over} child${over === 1 ? '' : 'ren'} forced over (give ${limit + 1} first): ${[1, 3, 3, 1][over]} · C(${rest} + 2, 2) = ${w} → ${over % 2 ? '−' : '+'}. total = ${total}.`, [R('total', [total], { active: [0] })], { over, rest, ways: w }); }
  r.step(0, `n = 5, limit = 2 → <b>${total}</b>: (1,2,2), (2,1,2), (2,2,1).`, [R('answer', [total], { done: [0] })]);
  ANIM['Distribute Candies Among Children II'] = W('Inclusion-exclusion', C_DC, r.steps);
}

const C_PP = `
int states = minutesToTest / minutesToDie + 1, pigs = 0;
long reach = 1;
while (reach < buckets) {
    reach *= states;
    pigs++;
}`;
{
  const r = recorder(), buckets = 1000, states = 60 / 15 + 1; let reach = 1, pigs = 0;
  r.step(ln(C_PP, 'int states'), '1000 buckets, die in 15, test 60 → 4 rounds, so each pig has 5 outcomes (dies in round 1..4 or lives).', [R('states', [states])], { states });
  while (reach < buckets) { reach *= states; pigs++; r.step(ln(C_PP, 'reach *= states'), `${pigs} pig${pigs > 1 ? 's' : ''} → ${reach} buckets distinguishable.`, [R('reach', [reach], reach >= buckets ? { done: [0] } : { active: [0] })], { pigs, reach }); }
  r.step(0, `Answer <b>${pigs}</b> pigs.`, [R('answer', [pigs], { done: [0] })]);
  ANIM['Poor Pigs'] = W('Count states', C_PP, r.steps);
}

const C_ME = `
long[][] result = {{1, 0}, {0, 1}}, base = {{1, 1}, {1, 0}};
while (n > 0) {
    if ((n & 1) == 1) result = multiply(result, base);
    base = multiply(base, base);
    n >>= 1;
}
return result[0][1];`;
{
  const mul = (a, b) => [[a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]], [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]];
  const r = recorder(); let n = 10, pw = 1, res = [[1, 0], [0, 1]], base = [[1, 1], [1, 0]];
  r.step(ln(C_ME, 'long[][] result'), 'F(10). 10 = 1010₂. result = identity, base = [[1,1],[1,0]].', [G('result', res), G('base', base)], { n });
  while (n > 0) { const bit = n & 1; if (bit) res = mul(res, base); r.step(ln(C_ME, 'if ((n & 1)'), bit ? 'Bit 1 → result = result · base.' : 'Bit 0 → result unchanged.', [G('result', res, bit ? [[0, 1, 'active']] : []), G('base', base)], { n }); base = mul(base, base); pw *= 2; n >>= 1; r.step(ln(C_ME, 'base = multiply'), `Square base → M^${pw}, n = ${n}.`, [G('result', res), G('base', base, [[0, 0, 'warn']])], { n }); }
  r.step(ln(C_ME, 'return'), `result = M^10, top-right = F(10) = <b>${res[0][1]}</b>.`, [G('result', res, [[0, 1, 'done']])]);
  ANIM['Matrix Exponentiation'] = W('2 × 2 power', C_ME, r.steps);
}

const C_TC = `
for (int c = 0; c < 26; c++)
    for (int j = 1; j <= nums.get(c); j++) T[(c + j) % 26][c]++;
long[][] P = power(T, t);`;
{
  const r = recorder(); let cnt = { a: 1, b: 1, c: 1, y: 2 }; const nums = { a: 1, b: 1, c: 1, y: 1, z: 2 };
  r.step(0, 's = "abcyy", t = 2, every letter becomes the next one, except z → "ab" (nums[z] = 2).', [R('letters', Object.entries(cnt).map(([k, v]) => `${k}×${v}`))]);
  r.step(ln(C_TC, 'T[(c + j)'), 'Column c of T lists what one c turns into: a → b, …, y → z, z → a + b.', [G('T (part)', [[0, 0, 1], [0, 0, 1], [1, 0, 0]], [[2, 0, 'active'], [0, 2, 'warn'], [1, 2, 'warn']], { rowLabels: ['a', 'b', 'z'], colLabels: ['y', '…', 'z'] })]);
  r.step(ln(C_TC, 'power(T, t)'), 'Step 1: "bcdzz" (5). Step 2: z → ab twice: "cdeabab" → length <b>7</b>.', [R('after 1', ['b', 'c', 'd', 'z', 'z']), R('after 2', ['c', 'd', 'e', 'a', 'b', 'a', 'b'], { done: range(0, 6) })]);
  r.step(0, 'For t = 10⁹ the same answer comes from T^t · counts with about 30 matrix squarings.', [R('answer (t = 2)', [7], { done: [0] })]);
  ANIM['Total Characters in String After Transformations II'] = W('Matrix power', C_TC, r.steps);
}

const C_FA = `
public void append(int val) {
    vals.add((val - add + MOD) % MOD * inverse(mul) % MOD);
}
public void addAll(int inc) {
    add = (add + inc) % MOD;
}
public void multAll(int m) {
    mul = mul * m % MOD;
    add = add * m % MOD;
}
public int getIndex(int idx) {
    return (int) ((vals.get(idx) * mul + add) % MOD);
}`;
{
  const r = recorder(); let mul = 1, add = 0; const raw = [], real = [];
  const snap = () => [R('stored', raw.map(v => Number.isInteger(v) ? v : v.toFixed(2))), R('real', raw.map(v => v * mul + add))];
  const ops = [['append', 2], ['addAll', 3], ['append', 7], ['multAll', 2], ['getIndex', 0], ['addAll', 3], ['append', 10], ['multAll', 2], ['getIndex', 0], ['getIndex', 1], ['getIndex', 2]];
  for (const [op, v] of ops) {
    if (op === 'append') { raw.push((v - add) / mul); r.step(ln(C_FA, 'vals.add'), `append(${v}): store (${v} − ${add}) / ${mul} = ${raw[raw.length - 1]} so the current map turns it back into ${v}.`, snap(), { mul, add }); }
    if (op === 'addAll') { add += v; r.step(ln(C_FA, 'add = (add + inc)'), `addAll(${v}): only add changes.`, snap(), { mul, add }); }
    if (op === 'multAll') { mul *= v; add *= v; r.step(ln(C_FA, 'mul = mul * m'), `multAll(${v}): mul and add both scale.`, snap(), { mul, add }); }
    if (op === 'getIndex') r.step(ln(C_FA, 'vals.get(idx) * mul'), `getIndex(${v}) = ${raw[v]} · ${mul} + ${add} = <b>${raw[v] * mul + add}</b>.`, [R('real', raw.map(x => x * mul + add), { done: [v] })], { mul, add });
  }
  ANIM['Fancy Sequence'] = W('Global map + inverse', C_FA, r.steps);
}

const C_ND = `
for (int len = 1; len < L; len++) count += (int) Math.pow(d, len);
for (int i = 0; i < L; i++) {
    boolean same = false;
    for (String dig : digits) {
        char c = dig.charAt(0);
        if (c < s.charAt(i)) count += (int) Math.pow(d, L - 1 - i);
        else if (c == s.charAt(i)) same = true;
    }
    if (!same) return count;
}
return count + 1;`;
{
  const D = [1, 3, 5, 7], s = '100', r = recorder(); let count = 4 + 16;
  r.step(ln(C_ND, 'for (int len = 1'), 'digits {1,3,5,7}, n = 100. 1-digit: 4, 2-digit: 16 → 20 so far.', [A('n', s.split('').map(Number))], { count });
  r.step(ln(C_ND, 'c < s.charAt(i)'), 'Position 0: n has 1. No digit is smaller than 1; 1 is equal → continue.', [A('n', s.split('').map(Number), { active: [0] }), R('digits', D, { warn: [0] })], { count });
  r.step(ln(C_ND, 'if (!same)'), 'Position 1: n has 0. No digit is ≤ 0 → stop. 3-digit numbers beginning "1" are all above 100.', [A('n', s.split('').map(Number), { bad: [1] })], { count });
  r.step(0, `Answer <b>${count}</b>.`, [R('answer', [count], { done: [0] })]);
  ANIM['Numbers At Most N Given Digit Set'] = W('Digit walk', C_ND, r.steps);
}

const C_GI = `
for (int h = start; h < end; h++) {
    String left = String.valueOf(h);
    String right = new StringBuilder(left.substring(0, n / 2)).reverse().toString();
    String pal = left + right;
    if (Long.parseLong(pal) % k != 0) continue;
    char[] key = pal.toCharArray();
    Arrays.sort(key);
    if (!seen.add(new String(key))) continue;
    long ways = (n - cnt[0]) * fact[n - 1];
    for (int c : cnt) ways /= fact[c];
    total += ways;
}`;
{
  const r = recorder(), n = 3, k = 5, seen = new Set(); let total = 0;
  r.step(0, 'n = 3, k = 5. 3-digit palindromes come from halves 10..99.', [R('multisets', [])]);
  for (let h = 10; h < 100; h++) { const s = String(h), pal = s + s[0]; if (+pal % k) continue; const key = pal.split('').sort().join(''); if (seen.has(key)) continue; seen.add(key); const cnt = Array(10).fill(0); for (const ch of key) cnt[+ch]++; let ways = (n - cnt[0]) * fact(n - 1); cnt.forEach(c => ways /= fact(c)); total += ways; r.step(ln(C_GI, 'total += ways'), `${pal} divisible by 5, digits {${key.split('').join(',')}} → ${ways} arrangements without leading zero.`, [R('multisets', [...seen], { active: [seen.size - 1] })], { total }); }
  r.step(0, `Total <b>${total}</b>.`, [R('answer', [total], { done: [0] })]);
  ANIM['Find the Count of Good Integers'] = W('Palindromes + multisets', C_GI, r.steps);
}

const C_SP = `
for (int c = 0; c < 26; c++) {
    if (cnt[c] == 0) continue;
    cnt[c]--;
    long ways = arrangements(cnt, half - pos - 1, k);
    if (ways >= k) {
        left.append((char) ('a' + c));
        break;
    }
    k -= ways;
    cnt[c]++;
}`;
{
  const r = recorder(); const cnt = { a: 1, b: 1, c: 1 }; let k = 4; const left = [];
  const arr = c => { const t = Object.values(c).reduce((x, y) => x + y, 0); return Object.values(c).reduce((acc, v) => acc / fact(v), fact(t)); };
  r.step(0, 's = "abccba", k = 4. The left half uses the letters {a,b,c}. Half permutations in order: abc, acb, bac, bca, cab, cba.', [R('half letters', ['a', 'b', 'c'])], { k });
  for (let pos = 0; pos < 3; pos++) for (const c of ['a', 'b', 'c']) { if (!cnt[c]) continue; cnt[c]--; const w = arr(cnt); if (w >= k) { left.push(c); r.step(ln(C_SP, 'left.append'), `Start "${left.join('')}": ${w} ways ≥ k = ${k} → take '${c}'.`, [R('left half', left, { active: [left.length - 1] })], { k, ways: w }); break; } k -= w; cnt[c]++; r.step(ln(C_SP, 'k -= ways'), `Start "${[...left, c].join('')}" covers ${w} → skip, k = ${k}.`, [R('left half', [...left, c], { ghost: [left.length] })], { k, ways: w }); }
  r.step(0, `Left half "${left.join('')}" → palindrome <b>${left.join('') + [...left].reverse().join('')}</b>.`, [R('answer', [...left, ...[...left].reverse()], { done: range(0, 5) })]);
  ANIM['Smallest Palindromic Rearrangement II'] = W('Greedy with capped counts', C_SP, r.steps);
}

const C_SU = `
for (String pal : new String[]{s + rev.substring(1), s + rev}) {
    long p = Long.parseLong(pal);
    if (p > 1_000_000_000L) continue;
    long sq = p * p;
    if (sq >= L && sq <= R && isPalindrome(sq)) count++;
}`;
{
  const r = recorder(), L = 4, Rr = 1000, isP = x => String(x) === String(x).split('').reverse().join(''), found = [];
  r.step(0, 'Range [4, 1000]. Roots are palindromes, built from halves 1, 2, 3, …', [R('found', found)]);
  for (const p of [1, 2, 3, 11, 22, 33]) { const sq = p * p, ok = sq >= L && sq <= Rr && isP(sq); if (ok) found.push(sq); r.step(ln(C_SU, 'isPalindrome(sq)'), `p = ${p}: p² = ${sq} ${ok ? '→ super-palindrome' : sq < L ? '< L' : sq > Rr ? '> R' : 'not a palindrome'}.`, [R('p, p²', [p, sq], ok ? { done: [1] } : { ghost: [1] }), R('found', found)]); }
  r.step(0, `Answer <b>${found.length}</b>: ${found.join(', ')}.`, [R('found', found, { done: range(0, found.length - 1) })]);
  ANIM['Super Palindromes'] = W('Build roots from halves', C_SU, r.steps);
}

const C_KM = `
long p = h;
for (long x = len % 2 == 1 ? h / 10 : h; x > 0; x /= 10) p = p * 10 + x % 10;
if (isPalindromeInBase(p, k)) {
    sum += p;
    found++;
}`;
{
  const r = recorder(), k = 2, isPk = x => { const s = x.toString(k); return s === s.split('').reverse().join(''); }; let sum = 0; const found = [];
  for (const p of [1, 2, 3, 4, 5, 6, 7, 8, 9]) { const ok = isPk(p); if (ok && found.length < 5) { found.push(p); sum += p; } r.step(ln(C_KM, ok ? 'sum += p' : 'isPalindromeInBase'), `${p} = ${p.toString(2)}₂ ${ok ? '→ keep' : '→ skip'}.`, [R('found', found, ok ? { active: [found.length - 1] } : {})], { sum }); if (found.length === 5) break; }
  r.step(0, `k = 2, n = 5: ${found.join(' + ')} = <b>${sum}</b>.`, [R('found', found, { done: range(0, 4) })]);
  ANIM['Sum of k-Mirror Numbers'] = W('Ordered generation', C_KM, r.steps);
}
