const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const isPrime = x => { if (x < 2) return false; for (let d = 2; d * d <= x; d++) if (x % d === 0) return false; return true; };

const C_PF = `
for (int p = 2; (long) p * p <= n; p++) {
    if (n % p != 0) continue;
    out.add(p);
    while (n % p == 0) n /= p;
}
if (n > 1) out.add(n);`;
{
  const r = recorder(); let n = 360; const out = [];
  r.step(0, 'n = 360. Try p while p·p ≤ n.', [R('n', [n]), R('factors', out)], { n });
  for (let p = 2; p * p <= n; p++) { if (n % p) { r.step(ln(C_PF, 'continue'), `${p} does not divide ${n}.`, [R('n', [n]), R('factors', out)], { p, n }); continue; } out.push(p); const seq = [n]; while (n % p === 0) { n /= p; seq.push(n); } r.step(ln(C_PF, 'while (n % p'), `${p} divides: ${seq.join(' → ')}.`, [R('n', seq, { active: [seq.length - 1] }), R('factors', out, { active: [out.length - 1] })], { p, n }); }
  r.step(ln(C_PF, 'if (n > 1)'), n > 1 ? `Leftover ${n} > 1 is prime.` : 'Nothing left over.', [R('factors', n > 1 ? [...out, n] : out, { done: range(0, out.length) })], { n });
  const r2 = recorder(); n = 2 * 97 * 97 * 3; const o2 = [];
  r2.step(0, `n = ${n} = 2·3·97².`, [R('n', [n])], { n });
  for (let p = 2; p * p <= n; p++) { if (n % p) continue; o2.push(p); while (n % p === 0) n /= p; r2.step(ln(C_PF, 'out.add(p)'), `Divide out ${p} → n = ${n}.`, [R('factors', o2, { active: [o2.length - 1] }), R('n', [n])], { p, n }); }
  r2.step(ln(C_PF, 'if (n > 1)'), n > 1 ? `Leftover ${n} → add.` : 'The loop ended exactly at 97·97 = n; n is now 1.', [R('factors', n > 1 ? [...o2, n] : o2, { done: range(0, o2.length) })], { n });
  ANIM['Prime Factors'] = [{ name: 'n = 360', code: C_PF, steps: r.steps }, { name: 'n = 56454', code: C_PF, steps: r2.steps }];
}

const C_SS = `
for (int p : base) {
    long start = Math.max((long) p * p, (L + p - 1) / p * p);
    for (long j = start; j <= R; j += p) seg[(int) (j - L)] = true;
}
for (long x = Math.max(L, 2); x <= R; x++)
    if (!seg[(int) (x - L)]) out.add(x);`;
{
  const L = 100, Rr = 130, r = recorder(), base = [2, 3, 5, 7, 11], vals = range(L, Rr), bad = [];
  r.step(0, `Window [${L}, ${Rr}]. √${Rr} ≈ 11.4, so base primes are ${base.join(', ')}.`, [A('window', vals.map(v => v - L)), R('base primes', base)]);
  for (const p of base) { const start = Math.max(p * p, Math.ceil(L / p) * p), hit = []; for (let j = start; j <= Rr; j += p) { if (!bad.includes(j - L)) bad.push(j - L); hit.push(j - L); } r.step(ln(C_SS, 'long start'), `p = ${p}: first multiple ≥ ${L} is ${start}. Cross out every ${p}th.`, [lane('values', vals, { bad: bad.filter(i => !hit.includes(i)), active: hit })], { p, start }); }
  const pr = vals.filter((_, i) => !bad.includes(i));
  r.step(ln(C_SS, 'out.add(x)'), `Survivors are prime: <b>${pr.join(', ')}</b>.`, [lane('values', vals, { bad, done: vals.map((v, i) => pr.includes(v) ? i : -1).filter(i => i >= 0) })]);
  ANIM['Segmented Sieve'] = W('Base primes + window', C_SS, r.steps);
}

const C_CP = `
for (int x = left; x <= right; x++) {
    if (comp[x]) continue;
    if (prev != -1 && x - prev < gap) {
        gap = x - prev;
        best = new int[]{prev, x};
        if (gap <= 2) break;
    }
    prev = x;
}`;
{
  const r = recorder(), left = 89, right = 110, vals = range(left, right), pr = vals.filter(isPrime);
  r.step(0, `Range [${left}, ${right}]. Sieve marks primes: ${pr.join(', ')}.`, [lane('x', vals, { done: vals.map((v, i) => isPrime(v) ? i : -1).filter(i => i >= 0) })]);
  let prev = -1, gap = 1e9, best = [-1, -1];
  for (const x of pr) { if (prev !== -1) { const better = x - prev < gap; if (better) { gap = x - prev; best = [prev, x]; } r.step(ln(C_CP, better ? 'best = new' : 'prev = x'), `Pair (${prev}, ${x}) gap ${x - prev}${better ? ' → new best' : ''}.`, [lane('x', vals, { active: [prev - left, x - left], done: best[0] >= 0 && !better ? [best[0] - left, best[1] - left] : [] })], { gap, best: best.join(',') }); if (gap <= 2) { r.step(ln(C_CP, 'break'), 'Gap 2 cannot be beaten → stop.', [R('answer', best, { done: [0, 1] })]); break; } } prev = x; }
  ANIM['Closest Prime Numbers in Range'] = W('Sieve + scan', C_CP, r.steps);
}

const C_FD = `
for (int d = 1; d * d <= x && count <= 4; d++) {
    if (x % d != 0) continue;
    int e = x / d;
    count += d == e ? 1 : 2;
    sum += d == e ? d : d + e;
}
if (count == 4) total += sum;`;
{
  const r = recorder(); let total = 0;
  for (const x of [21, 4, 16]) { let count = 0, sum = 0; const found = []; for (let d = 1; d * d <= x && count <= 4; d++) { if (x % d) continue; const e = x / d; count += d === e ? 1 : 2; sum += d === e ? d : d + e; found.push(d === e ? `${d}` : `${d}·${e}`); r.step(ln(C_FD, 'count +='), `x = ${x}: divisor pair ${d === e ? d + ' (root, once)' : `(${d}, ${e})`}.`, [R('pairs', found, { active: [found.length - 1] })], { x, count, sum }); } if (count === 4) total += sum; r.step(ln(C_FD, 'if (count == 4)'), `${x} has ${count} divisors${count === 4 ? ` → add ${sum}` : ' → skip'}.`, [R('pairs', found, count === 4 ? { done: range(0, found.length - 1) } : { bad: range(0, found.length - 1) })], { total }); }
  ANIM['Four Divisors'] = W('Pair walk', C_FD, r.steps);
}

const C_TQ = `
for (int i = 2; i <= b; i++)
    if (spf[i] == 0)
        for (int j = i; j <= b; j += i)
            if (spf[j] == 0) spf[j] = i;
for (int x = 2; x <= b; x++) {
    cnt[x] = 1 + cnt[x / spf[x]];
    if (x >= a) total += cnt[x];
}`;
{
  const a = 9, b = 12, r = recorder(), spf = Array(b + 1).fill(0), cnt = Array(b + 1).fill(0);
  for (let i = 2; i <= b; i++) if (!spf[i]) for (let j = i; j <= b; j += i) if (!spf[j]) spf[j] = i;
  r.step(ln(C_TQ, 'spf[j] = i'), 'Smallest prime factor of each number up to 12.', [A('spf', spf.map((v, i) => i < 2 ? '·' : v))]);
  let total = 0;
  for (let x = 2; x <= b; x++) { cnt[x] = 1 + cnt[x / spf[x]]; if (x >= a) total += cnt[x]; if (x >= 6) r.step(ln(C_TQ, 'cnt[x] = 1 +'), `cnt[${x}] = 1 + cnt[${x}/${spf[x]} = ${x / spf[x]}] = ${cnt[x]}${x >= a ? ', in range → total ' + total : ''}.`, [A('cnt', cnt.map((v, i) => i < 2 ? '·' : (i <= x ? v : '')), { active: [x], warn: [x / spf[x]] })], { x, total }); }
  r.step(0, `9 = 3² (2), 10 = 2·5 (2), 11 (1), 12 = 2²·3 (3) → <b>${total}</b>.`, [R('total', [total], { done: [0] })]);
  ANIM['Techfest and the Queue'] = W('SPF sieve + DP', C_TQ, r.steps);
}

const C_SK = `
if (k % 2 == 0 || k % 5 == 0) return -1;
int rem = 0;
for (int len = 1; len <= k; len++) {
    rem = (rem * 10 + 1) % k;
    if (rem == 0) return len;
}`;
{
  const k = 7, r = recorder(); let rem = 0; const rs = [];
  r.step(ln(C_SK, 'k % 2'), 'k = 7 is not a multiple of 2 or 5.', [R('remainders', rs)], { k });
  for (let len = 1; len <= k; len++) { rem = (rem * 10 + 1) % k; rs.push(rem); r.step(ln(C_SK, rem ? 'rem = (rem' : 'return len'), `${'1'.repeat(len)} mod 7 = ${rem}${rem ? '' : ` → answer <b>${len}</b>`}.`, [R('remainders', rs, rem ? { active: [rs.length - 1] } : { done: [rs.length - 1] })], { len, rem }); if (!rem) break; }
  ANIM['Smallest Integer Divisible by K'] = W('Remainder walk', C_SK, r.steps);
}

const C_GO = `
return n;`;
{
  const r = recorder(), n = 4;
  r.step(0, 'n = 4: odd 1+3+5+7 = 16 = n², even 2+4+6+8 = 20 = n(n+1).', [R('odd', [1, 3, 5, 7]), R('even', [2, 4, 6, 8])], { sumOdd: 16, sumEven: 20 });
  r.step(ln(C_GO, 'return n'), 'gcd(16, 20) = 4 · gcd(4, 5) = <b>4</b> = n.', [R('gcd', [gcd(16, 20)], { done: [0] })]);
  ANIM['GCD of Odd and Even Sums'] = W('Formula', C_GO, r.steps);
}

const C_SG = `
for (int g = max; g >= 1; g--) {
    long multiples = 0;
    for (int m = g; m <= max; m += g) multiples += freq[m];
    exact[g] = multiples * (multiples - 1) / 2;
    for (int m = 2 * g; m <= max; m += g) exact[g] -= exact[m];
}`;
{
  const nums = [4, 4, 2, 1], max = 4, r = recorder(), freq = Array(max + 1).fill(0); nums.forEach(x => freq[x]++); const exact = Array(max + 1).fill(0);
  r.step(0, 'nums = [4,4,2,1]. Pair gcds sorted: [1,1,1,2,2,4].', [A('freq', freq)]);
  for (let g = max; g >= 1; g--) { let m = 0; for (let x = g; x <= max; x += g) m += freq[x]; exact[g] = m * (m - 1) / 2; const tot = exact[g]; for (let x = 2 * g; x <= max; x += g) exact[g] -= exact[x]; r.step(ln(C_SG, 'exact[g] -= '), `g = ${g}: ${m} multiples → ${tot} pairs, minus larger multiples → exact ${exact[g]}.`, [A('exact', exact, { active: [g] })], { g, multiples: m }); }
  const pre = [0]; for (let g = 1; g <= max; g++) pre.push(pre[g - 1] + exact[g]);
  r.step(0, `Prefix counts ${pre.slice(1).join(', ')}. Query 3 → first g with prefix > 3 is <b>2</b>.`, [A('prefix', pre, { done: [2] })]);
  ANIM['Sorted GCD Pair Queries'] = W('Multiples + inclusion', C_SG, r.steps);
}

const C_AO = `
long count = (long) (i - left[i]) * (right[i] - i);
long use = Math.min(count, remaining);
result = result * power(nums.get(i), use) % MOD;
remaining -= use;`;
{
  const nums = [8, 3, 9, 3, 8], score = [1, 1, 1, 1, 1], left = [-1, 0, 1, 2, 3], right = [5, 5, 5, 5, 5], r = recorder();
  r.step(0, 'nums = [8,3,9,3,8], k = 2. Prime scores are all 1 (8 = 2³, 3, 9 = 3²).', [A('nums', nums), A('score', score)]);
  r.step(0, 'Equal scores: the leftmost wins. left = nearest score ≥ on the left, right = nearest score > on the right.', [A('left', left), A('right', right)]);
  const cnt = nums.map((_, i) => (i - left[i]) * (right[i] - i));
  r.step(ln(C_AO, 'long count'), `Subarrays won: ${cnt.join(', ')}.`, [A('wins', cnt)]);
  r.step(ln(C_AO, 'result = result'), 'Largest value 9 (index 2) wins 3 subarrays; k = 2 uses two of them: 9² = <b>81</b>.', [A('nums', nums, { done: [2] })], { use: 2, result: 81 });
  ANIM['Apply Operations to Maximize Score'] = W('Stack ranges + greedy', C_AO, r.steps);
}

const C_KS = `
while (lo < hi) {
    long mid = lo + (hi - lo) / 2, count = 0;
    for (int m = 1; m < (1 << n); m++)
        count += (bits[m] % 2 == 1 ? 1 : -1) * (mid / lcm[m]);
    if (count >= k) hi = mid;
    else lo = mid + 1;
}`;
{
  const coins = [5, 2], k = 7, r = recorder(), cnt = x => Math.floor(x / 5) + Math.floor(x / 2) - Math.floor(x / 10);
  r.step(0, 'coins [5,2], k = 7. Amounts: 2,4,5,6,8,10,12,… count(x) = x/5 + x/2 − x/10.', [R('amounts', [2, 4, 5, 6, 8, 10, 12])]);
  let lo = 1, hi = 7 * 5;
  while (lo < hi) { const mid = lo + Math.floor((hi - lo) / 2), c = cnt(mid); r.step(ln(C_KS, c >= k ? 'hi = mid' : 'lo = mid + 1'), `mid = ${mid}: count = ${c} ${c >= k ? '≥ 7 → hi = mid' : '< 7 → lo = mid + 1'}.`, [R('lo, mid, hi', [lo, mid, hi], { active: [1] })], { lo, hi, mid, count: c }); if (c >= k) hi = mid; else lo = mid + 1; }
  r.step(0, `Answer <b>${lo}</b>.`, [R('answer', [lo], { done: [0] })]);
  ANIM['Kth Smallest Amount With Single Denomination Combination'] = W('Binary search + inclusion-exclusion', C_KS, r.steps);
}

const C_FR = `
while (rem != 0) {
    if (seen.containsKey(rem)) {
        sb.insert(seen.get(rem), "(");
        sb.append(')');
        break;
    }
    seen.put(rem, sb.length());
    rem *= 10;
    sb.append(rem / den);
    rem %= den;
}`;
{
  const r = recorder(), den = 12; let rem = 7, s = '0.'; const seen = {};
  r.step(0, '7 / 12: integer part 0, remainder 7.', [R('output', [...s])], { rem });
  while (rem) { if (seen[rem] !== undefined) { const out = s.slice(0, seen[rem]) + '(' + s.slice(seen[rem]) + ')'; r.step(ln(C_FR, 'sb.insert'), `Remainder ${rem} was seen at position ${seen[rem]} → wrap from there: <b>${out}</b>.`, [R('output', [...out], { done: range(0, out.length - 1) })], { rem }); break; } seen[rem] = s.length; rem *= 10; s += Math.floor(rem / den); rem %= den; r.step(ln(C_FR, 'sb.append(rem / den)'), `Digit ${s[s.length - 1]}, remainder ${rem}.`, [R('output', [...s], { active: [s.length - 1] }), R('seen', Object.entries(seen).map(([k, v]) => `${k}@${v}`))], { rem }); }
  ANIM['Fraction to Recurring Decimal'] = W('Long division + map', C_FR, r.steps);
}

const C_BS = `
return (int) Math.sqrt(n);`;
{
  const n = 10, r = recorder(), on = Array(n + 1).fill(0);
  for (let k = 1; k <= n; k++) { for (let i = k; i <= n; i += k) on[i] ^= 1; if (k <= 3 || k === n) r.step(0, `Round ${k}: toggle every ${k}th bulb.`, [lane('bulbs', on.slice(1).map(v => v ? 'on' : '·'), { active: range(0, n - 1).filter(i => (i + 1) % k === 0) })], { round: k }); }
  r.step(ln(C_BS, 'return'), 'On: 1, 4, 9, the squares. ⌊√10⌋ = <b>3</b>.', [lane('bulbs', on.slice(1).map(v => v ? 'on' : '·'), { done: [0, 3, 8] })]);
  ANIM['Bulb Switcher'] = W('Count squares', C_BS, r.steps);
}

const C_DD = `
int total = n * (n + 1) / 2;
int k = n / m;
int divisible = m * k * (k + 1) / 2;
return total - 2 * divisible;`;
{
  const n = 10, m = 3, r = recorder();
  r.step(ln(C_DD, 'int total'), 'n = 10: total 55.', [lane('1..10', range(1, 10))], { total: 55 });
  r.step(ln(C_DD, 'int divisible'), 'Multiples of 3: 3, 6, 9 = 3·(1+2+3) = 18.', [lane('1..10', range(1, 10), { warn: [2, 5, 8] })], { k: 3, divisible: 18 });
  r.step(ln(C_DD, 'return'), 'num1 − num2 = 55 − 2·18 = <b>19</b> (37 − 18).', [R('answer', [19], { done: [0] })]);
  ANIM['Divisible and Non-divisible Sums Difference'] = W('Formula', C_DD, r.steps);
}

const C_MZ = `
for (int k = 1; k <= 60; k++) {
    long x = num1 - (long) k * num2;
    if (x < k) continue;
    if (Long.bitCount(x) <= k) return k;
}`;
{
  const num1 = 3, num2 = -2, r = recorder();
  for (let k = 1; k <= 3; k++) { const x = num1 - k * num2, bc = x.toString(2).split('').filter(c => c === '1').length; r.step(ln(C_MZ, bc <= k && x >= k ? 'return k' : 'Long.bitCount'), `k = ${k}: x = 3 − ${k}·(−2) = ${x} = ${x.toString(2)}₂, popcount ${bc} ${bc <= k && x >= k ? `≤ ${k} → <b>${k}</b>` : `> ${k}`}.`, [lane('bits of x', x.toString(2).split(''), bc <= k ? { done: x.toString(2).split('').map((c, i) => c === '1' ? i : -1) } : { warn: x.toString(2).split('').map((c, i) => c === '1' ? i : -1) })], { k, x }); }
  ANIM['Minimum Operations to Make the Integer Zero'] = W('Try each k', C_MZ, r.steps);
}

const C_SM = `
for (int x : nums) cnt[((x % value) + value) % value]++;
int mex = 0;
while (cnt[mex % value] > 0) {
    cnt[mex % value]--;
    mex++;
}`;
{
  const nums = [1, -10, 7, 13, 6, 8], v = 5, r = recorder(), cnt = Array(v).fill(0); nums.forEach(x => cnt[((x % v) + v) % v]++);
  r.step(ln(C_SM, 'cnt[((x'), `nums = [${nums}], value = 5. Residues: ${nums.map(x => ((x % v) + v) % v).join(', ')}.`, [A('cnt', cnt.slice())]);
  let mex = 0;
  while (cnt[mex % v] > 0) { cnt[mex % v]--; r.step(ln(C_SM, 'cnt[mex % value]--'), `Build ${mex} from residue ${mex % v}.`, [A('cnt', cnt.slice(), { active: [mex % v] })], { mex: mex + 1 }); mex++; }
  r.step(ln(C_SM, 'while'), `Residue ${mex % v} is used up → MEX = <b>${mex}</b>.`, [A('cnt', cnt.slice(), { bad: [mex % v] })], { mex });
  ANIM['Smallest Missing Non-negative Integer After Operations'] = W('Residue counts', C_SM, r.steps);
}

const C_MU = `
if (v % x != r) return -1;
Arrays.sort(a);
int median = a[a.length / 2], ops = 0;
for (int v : a) ops += Math.abs(v - median) / x;`;
{
  const g = [[2, 4], [6, 8]], x = 2, r = recorder(), a = g.flat().sort((p, q) => p - q), med = a[a.length >> 1];
  r.step(ln(C_MU, 'v % x != r'), 'grid [[2,4],[6,8]], x = 2: every value is even → same remainder.', [G('grid', g)]);
  r.step(ln(C_MU, 'int median'), `Sorted ${a.join(', ')}; median = ${med}.`, [A('sorted', a, { active: [a.length >> 1] })], { median: med });
  const ops = a.map(v => Math.abs(v - med) / x);
  r.step(ln(C_MU, 'ops +='), `Steps per cell: ${ops.join(' + ')} = <b>${ops.reduce((p, q) => p + q)}</b>.`, [A('steps', ops, { done: range(0, 3) })], { ops: ops.reduce((p, q) => p + q) });
  ANIM['Minimum Operations to Make a Uni-Value Grid'] = W('Remainder check + median', C_MU, r.steps);
}
