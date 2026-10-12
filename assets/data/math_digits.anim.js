const W = (name, code, steps) => [{ name, code, steps }];
const digs = x => String(x).split('').map(Number);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });

const C_AD1 = `
while (num >= 10) {
    int sum = 0;
    while (num > 0) {
        sum += num % 10;
        num /= 10;
    }
    num = sum;
}
return num;`;
const C_AD2 = `
if (num == 0) return 0;
return 1 + (num - 1) % 9;`;
{
  let num = 9875; const r = recorder();
  r.step(0, `num = ${num}. Keep replacing it with the sum of its digits until one digit is left.`, [A('digits', digs(num))], { num });
  while (num >= 10) { const d = digs(num), s = d.reduce((a, b) => a + b, 0); r.step(ln(C_AD1, 'sum += num % 10'), `${d.join(' + ')} = <b>${s}</b>`, [A('digits', d, { active: d.map((_, i) => i) })], { num, sum: s }); num = s; r.step(ln(C_AD1, 'num = sum'), `num becomes ${num}.`, [A('digits', digs(num), { done: num < 10 ? [0] : [] })], { num }); }
  r.step(ln(C_AD1, 'return num'), `One digit left: <b>${num}</b>.`, [A('digits', [num], { done: [0] })], { num });
  const r2 = recorder(), n = 9875;
  r2.step(0, 'A number and its digit sum leave the same remainder mod 9, because 10 ≡ 1 (mod 9).', [A('n', digs(n)), R('mod 9', [`${n} % 9 = ${n % 9}`, `29 % 9 = ${29 % 9}`, `11 % 9 = ${11 % 9}`, `2 % 9 = 2`])], { n });
  r2.step(ln(C_AD2, 'return 1 +'), `1 + (${n} − 1) % 9 = <b>${1 + (n - 1) % 9}</b>. The shift makes multiples of 9 give 9 instead of 0.`, [R('answer', [1 + (n - 1) % 9], { done: [0] })], { n, root: 1 + (n - 1) % 9 });
  ANIM['Add Digits'] = [{ name: 'Simulate', code: C_AD1, steps: r.steps }, { name: 'Digital root formula', code: C_AD2, steps: r2.steps }];
}

const C_RI = `
int rev = 0;
while (x != 0) {
    int d = x % 10;
    if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && d > 7)) return 0;
    if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && d < -8)) return 0;
    rev = rev * 10 + d;
    x /= 10;
}
return rev;`;
{
  const r = recorder(); let x = -1230, rev = 0;
  r.step(ln(C_RI, 'int rev = 0'), 'x = -1230. Java % keeps the sign, so every digit comes out negative and rev stays negative.', [R('x', [x]), R('rev', [rev])], { x, rev });
  while (x !== 0) { const d = x % 10 === 0 ? 0 : x % 10; r.step(ln(C_RI, 'int d = x % 10'), `d = x % 10 = ${d}.`, [R('x', [x], { active: [0] }), R('rev', [rev])], { x, d, rev }); r.step(ln(C_RI, 'Integer.MAX_VALUE / 10'), `rev = ${rev} is far from ±214748364, safe to grow.`, [R('rev', [rev])], { rev }); rev = rev * 10 + d; x = Math.trunc(x / 10); r.step(ln(C_RI, 'rev = rev * 10 + d'), `rev = ${rev}, x = ${x}.`, [R('x', [x]), R('rev', [rev], { active: [0] })], { x, rev }); }
  r.step(ln(C_RI, 'return rev'), `Answer <b>${rev}</b>. The trailing zero became a leading zero and vanished.`, [R('rev', [rev], { done: [0] })], { rev });
  r.step(ln(C_RI, 'Integer.MAX_VALUE / 10'), 'Overflow case: x = 1534236469 would reverse to 9646324351. When rev = 964632435 > 214748364 the guard returns <b>0</b> before multiplying.', [R('rev', [964632435], { bad: [0] }), R('MAX/10', [214748364])]);
  ANIM['Reverse Integer'] = W('Digit loop with guard', C_RI, r.steps);
}

const C_MD = `
int rev = 0, x = n;
while (x > 0) {
    rev = rev * 10 + x % 10;
    x /= 10;
}
return Math.abs(n - rev);`;
{
  const r = recorder(), n = 120; let x = n, rev = 0;
  r.step(ln(C_MD, 'int rev = 0'), `n = ${n}.`, [A('digits', digs(n))], { n });
  while (x > 0) { rev = rev * 10 + x % 10; x = Math.floor(x / 10); r.step(ln(C_MD, 'rev = rev * 10'), `Move the last digit over: rev = ${rev}, x = ${x}.`, [R('x', [x]), R('rev', [rev], { active: [0] })], { x, rev }); }
  r.step(ln(C_MD, 'return'), `|${n} − ${rev}| = <b>${Math.abs(n - rev)}</b>.`, [R('distance', [Math.abs(n - rev)], { done: [0] })], { rev });
  ANIM['Mirror Distance of an Integer'] = W('Digit loop', C_MD, r.steps);
}

const C_EX = `
while (columnNumber > 0) {
    columnNumber--;
    sb.append((char) ('A' + columnNumber % 26));
    columnNumber /= 26;
}
return sb.reverse().toString();`;
{
  const r = recorder(); let n = 701; const out = [];
  r.step(0, 'columnNumber = 701. Letters are digits 1..26 with no zero.', [R('n', [n]), R('letters', out)], { n });
  while (n > 0) { n--; r.step(ln(C_EX, 'columnNumber--'), `Shift down: ${n}. Now 0..25 maps to A..Z.`, [R('n', [n], { active: [0] }), R('letters', out)], { n }); const c = String.fromCharCode(65 + n % 26); out.push(c); r.step(ln(C_EX, 'sb.append'), `${n} % 26 = ${n % 26} → '${c}'.`, [R('letters', out, { active: [out.length - 1] })], { n }); n = Math.floor(n / 26); r.step(ln(C_EX, 'columnNumber /= 26'), `n = ${n}.`, [R('n', [n]), R('letters', out)], { n }); }
  r.step(ln(C_EX, 'reverse'), `Reverse: <b>${out.slice().reverse().join('')}</b>.`, [R('title', out.slice().reverse(), { done: [0, 1] })]);
  ANIM['Excel Sheet Column Title'] = W('Shifted base 26', C_EX, r.steps);
}

const C_UG = `
if (n <= 0) return false;
for (int p : new int[]{2, 3, 5})
    while (n % p == 0) n /= p;
return n == 1;`;
{
  const run = n0 => { const r = recorder(); let n = n0; r.step(ln(C_UG, 'if (n <= 0)'), `n = ${n0}.`, [R('n', [n])], { n }); for (const p of [2, 3, 5]) { const seq = [n]; while (n % p === 0) { n /= p; seq.push(n); } r.step(ln(C_UG, 'while (n % p'), `Divide out ${p}: ${seq.join(' → ')}.`, [R('n', seq, { active: [seq.length - 1] })], { p, n }); } r.step(ln(C_UG, 'return n == 1'), n === 1 ? `Left with 1 → <b>ugly</b>.` : `Left with ${n}, another prime → <b>not ugly</b>.`, [R('n', [n], n === 1 ? { done: [0] } : { bad: [0] })], { n }); return r.steps; };
  ANIM['Ugly Number'] = [{ name: 'Divide out (n = 60)', code: C_UG, steps: run(60) }, { name: 'Divide out (n = 42)', code: C_UG, steps: run(42) }];
}

const C_P3A = `
if (n <= 0) return false;
while (n % 3 == 0) n /= 3;
return n == 1;`;
const C_P3B = `
return n > 0 && 1162261467 % n == 0;`;
{
  const r = recorder(); let n = 243; const seq = [n];
  r.step(ln(C_P3A, 'if (n <= 0)'), 'n = 243.', [R('n', seq)], { n });
  while (n % 3 === 0) { n /= 3; seq.push(n); r.step(ln(C_P3A, 'while'), `Divide by 3 → ${n}.`, [R('n', seq, { active: [seq.length - 1] })], { n }); }
  r.step(ln(C_P3A, 'return'), 'Reached 1 → <b>true</b>.', [R('n', seq, { done: [seq.length - 1] })]);
  const r2 = recorder();
  r2.step(0, '3¹⁹ = 1162261467 is the largest power of three in an int. Its divisors are exactly 3⁰..3¹⁹.', [R('3^k', [1, 3, 9, 27, 81, 243, '…', 1162261467])]);
  r2.step(ln(C_P3B, 'return'), '1162261467 % 243 = 0 → <b>true</b>. 1162261467 % 45 = 27 → false (45 has a factor 5).', [R('n', [243, 45], { done: [0], bad: [1] })]);
  ANIM['Power of Three'] = [{ name: 'Divide by 3', code: C_P3A, steps: r.steps }, { name: 'Divisor of 3^19', code: C_P3B, steps: r2.steps }];
}

const C_P4 = `
return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;`;
{
  const bits = n => n.toString(2).padStart(8, '0').split('');
  const r = recorder(), mask = '01010101'.split('');
  for (const n of [16, 32]) {
    r.step(ln(C_P4, 'return'), `n = ${n}: n & (n − 1) = ${n & (n - 1)}, so exactly one bit is set.`, [lane('n', bits(n), { active: bits(n).map((b, i) => b === '1' ? i : -1) }), lane('n − 1', bits(n - 1))], { n });
    const ok = (n & 0x55555555) !== 0;
    r.step(ln(C_P4, '0x55555555'), `The mask keeps even positions (bit 0, 2, 4, …). ${n} → ${ok ? '<b>true</b>' : '<b>false</b>, its bit is at an odd position'}.`, [lane('n', bits(n), ok ? { done: [bits(n).indexOf('1')] } : { bad: [bits(n).indexOf('1')] }), lane('mask', mask)], { n });
  }
  ANIM['Power of Four'] = W('Bit mask', C_P4, r.steps);
}

const C_PW = `
long e = n;
if (e < 0) {
    x = 1 / x;
    e = -e;
}
double result = 1;
while (e > 0) {
    if ((e & 1) == 1) result *= x;
    x *= x;
    e >>= 1;
}
return result;`;
{
  const r = recorder(); let x = 2, e = 13, res = 1;
  r.step(ln(C_PW, 'long e = n'), '2^13. 13 = 1101₂, so 2^13 = 2^8 · 2^4 · 2^1.', [lane('bits of e', '1101'.split(''))], { x, e, result: res });
  while (e > 0) { const bit = e & 1; if (bit) res *= x; r.step(ln(C_PW, 'if ((e & 1)'), bit ? `Bit 1 → multiply: result = ${res}.` : 'Bit 0 → skip.', [R('result', [res], bit ? { active: [0] } : {}), R('x', [x])], { x, e, result: res }); x *= x; e >>= 1; r.step(ln(C_PW, 'x *= x'), `Square x → ${x}, e → ${e}.`, [R('result', [res]), R('x', [x], { active: [0] })], { x, e, result: res }); }
  r.step(ln(C_PW, 'return result'), `Answer <b>${res}</b> with 4 rounds instead of 13 multiplications.`, [R('result', [res], { done: [0] })]);
  ANIM['Pow(x, n)'] = W('Iterative fast power', C_PW, r.steps);
}

const C_PN = `
long rev = 0;
for (long x = n; x > 0; x /= 10) rev = rev * 10 + x % 10;
return power(n % MOD, rev);`;
{
  const r = recorder();
  r.step(ln(C_PN, 'for (long x'), 'n = 12 → reverse = 21.', [R('n', [12]), R('rev', [21], { active: [0] })]);
  let b = 12, e = 21, res = 1; const M = 1000000007;
  while (e > 0) { if (e & 1) res = Number(BigInt(res) * BigInt(b) % BigInt(M)); r.step(ln(C_PN, 'return power'), `bit ${e & 1}: result = ${res}; base squared mod M next.`, [R('result', [res], { active: [0] }), R('base', [b])], { e, result: res }); b = Number(BigInt(b) * BigInt(b) % BigInt(M)); e >>= 1; }
  r.step(ln(C_PN, 'return power'), `12^21 mod 1e9+7 = <b>${res}</b>.`, [R('answer', [res], { done: [0] })]);
  ANIM['Power of Numbers'] = W('Reverse + modular fast power', C_PN, r.steps);
}

const C_C3 = `
while (n > 0) {
    if (n % 3 == 2) return false;
    n /= 3;
}
return true;`;
{
  const run = n0 => { const r = recorder(); let n = n0; const d = []; r.step(0, `n = ${n0}. Read base-3 digits from the right.`, [R('base 3', [])], { n }); while (n > 0) { d.unshift(n % 3); if (n % 3 === 2) { r.step(ln(C_C3, 'n % 3 == 2'), `Digit 2 → would need the same power twice → <b>false</b>.`, [R('base 3', d, { bad: [0] })], { n }); return r.steps; } r.step(ln(C_C3, 'n /= 3'), `Digit ${n % 3}.`, [R('base 3', d, { active: [0] })], { n }); n = Math.floor(n / 3); } r.step(ln(C_C3, 'return true'), `All digits 0 or 1 → <b>true</b> (${n0} = ${d.map((v, i) => v ? `3^${d.length - 1 - i}` : '').filter(Boolean).join(' + ')}).`, [R('base 3', d, { done: d.map((_, i) => i) })]); return r.steps; };
  ANIM['Check if Number is a Sum of Powers of Three'] = [{ name: 'n = 91', code: C_C3, steps: run(91) }, { name: 'n = 21', code: C_C3, steps: run(21) }];
}

const C_PI = `
for (int a = 1; a <= bound; a *= x) {
    for (int b = 1; a + b <= bound; b *= y) {
        seen.add(a + b);
        if (y == 1) break;
    }
    if (x == 1) break;
}`;
{
  const r = recorder(), x = 2, y = 3, bound = 10, seen = new Set(), xs = [1, 2, 4, 8], ys = [1, 3, 9];
  const m = xs.map(a => ys.map(b => a + b <= bound ? a + b : '·'));
  r.step(0, 'x = 2, y = 3, bound = 10. Rows are powers of 2, columns powers of 3.', [G('a + b', m.map(row => row.map(() => '')), [], { rowLabels: xs, colLabels: ys })]);
  const shown = m.map(row => row.map(() => ''));
  xs.forEach((a, i) => { ys.forEach((b, j) => { if (a + b <= bound) { seen.add(a + b); shown[i][j] = a + b; } }); r.step(ln(C_PI, 'seen.add'), `a = ${a}: add ${ys.filter(b => a + b <= bound).map(b => a + b).join(', ')}.`, [G('a + b', shown, ys.map((_, j) => [i, j, 'active']), { rowLabels: xs, colLabels: ys }), R('set', [...seen].sort((p, q) => p - q))]); });
  r.step(0, `Result: <b>${[...seen].sort((p, q) => p - q).join(', ')}</b>. Duplicates (like 5 = 4 + 1 = 2 + 3) collapse in the set.`, [R('set', [...seen].sort((p, q) => p - q), { done: [...seen].map((_, i) => i) })]);
  ANIM['Powerful Integers'] = W('Double loop over powers', C_PI, r.steps);
}

const C_RP = `
String key = sortedDigits(n);
for (int p = 0; p < 31; p++)
    if (sortedDigits(1 << p).equals(key)) return true;
return false;`;
{
  const r = recorder(), n = 821, key = String(n).split('').sort().join('');
  r.step(ln(C_RP, 'String key'), `n = ${n}, sorted digits = "${key}".`, [R('key', [key])]);
  for (let p = 0; p < 31; p++) { const v = 2 ** p, k = String(v).split('').sort().join(''); if (String(v).length !== 3 && p !== 9) continue; r.step(ln(C_RP, 'equals(key)'), `2^${p} = ${v} → "${k}" ${k === key ? '= key → <b>true</b>' : '≠ key'}.`, [R('key', [key]), R(`2^${p}`, [k], k === key ? { done: [0] } : {})]); if (k === key) break; }
  ANIM['Reordered Power of 2'] = W('Sorted-digit signature', C_RP, r.steps);
}

const C_SQ = `
long a = 0, b = (long) Math.sqrt(c);
while (a <= b) {
    long s = a * a + b * b;
    if (s == c) return true;
    if (s < c) a++;
    else b--;
}
return false;`;
{
  const r = recorder(), c = 41; let a = 0, b = 6; const sq = [0, 1, 2, 3, 4, 5, 6];
  r.step(ln(C_SQ, 'long a = 0'), `c = 41. a = 0, b = ⌊√41⌋ = 6.`, [A('k', sq, { ptr: { [a]: 'a', [b]: 'b' } })], { a, b });
  while (a <= b) { const s = a * a + b * b; if (s === c) { r.step(ln(C_SQ, 's == c'), `${a}² + ${b}² = 41 → <b>true</b>.`, [A('k', sq, { ptr: { [a]: 'a', [b]: 'b' }, done: [a, b] })], { a, b, s }); break; } r.step(ln(C_SQ, s < c ? 'a++' : 'b--'), `${a}² + ${b}² = ${s} ${s < c ? '< 41 → a++' : '> 41 → b−−'}.`, [A('k', sq, { ptr: { [a]: 'a', [b]: 'b' }, active: [a, b] })], { a, b, s }); if (s < c) a++; else b--; }
  ANIM['Sum of Square Numbers'] = W('Two pointers', C_SQ, r.steps);
}

const C_CT = `
for (int a = 1; a <= n; a++)
    for (int b = 1; b <= n; b++) {
        int s = a * a + b * b;
        int c = (int) Math.sqrt(s);
        if (c <= n && c * c == s) count++;
    }`;
{
  const r = recorder(), n = 10, m = Array.from({ length: n }, () => Array(n).fill('')), hl = []; let count = 0;
  r.step(0, 'n = 10. Cell (a, b) shows c when a² + b² is a perfect square with c ≤ n.', [G('c', m, [], { rowLabels: Array.from({ length: n }, (_, i) => i + 1), colLabels: Array.from({ length: n }, (_, i) => i + 1) })]);
  for (let a = 1; a <= n; a++) { for (let b = 1; b <= n; b++) { const s = a * a + b * b, c = Math.floor(Math.sqrt(s)); if (c <= n && c * c === s) { m[a - 1][b - 1] = c; hl.push([a - 1, b - 1, 'done']); count++; } } if (a % 3 === 0 || a === n) r.step(ln(C_CT, 'count++'), `Rows up to a = ${a}: count = ${count}.`, [G('c', m, hl, { rowLabels: Array.from({ length: n }, (_, i) => i + 1), colLabels: Array.from({ length: n }, (_, i) => i + 1) })], { count }); }
  r.step(0, `Answer <b>${count}</b>: (3,4,5), (4,3,5), (6,8,10), (8,6,10).`, [R('count', [count], { done: [0] })]);
  ANIM['Count Square Sum Triples'] = W('Pairs + square check', C_CT, r.steps);
}

const C_CS = `
String s = Integer.toString(x);
int n = s.length();
if (n % 2 == 1) continue;
int diff = 0;
for (int i = 0; i < n / 2; i++) diff += s.charAt(i) - s.charAt(n - 1 - i);
if (diff == 0) count++;`;
{
  const r = recorder(); let count = 0;
  for (const x of [1203, 1212, 1230, 1224, 123]) { const d = digs(x); if (d.length % 2) { r.step(ln(C_CS, 'n % 2 == 1'), `${x} has odd length → skip.`, [A('digits', d, { ghost: d.map((_, i) => i) })], { count }); continue; } const h = d.length / 2, L = d.slice(0, h).reduce((a, b) => a + b), Rr = d.slice(h).reduce((a, b) => a + b); if (L === Rr) count++; r.step(ln(C_CS, 'diff == 0'), `${x}: ${d.slice(0, h).join('+')} = ${L} vs ${d.slice(h).join('+')} = ${Rr} ${L === Rr ? '→ symmetric' : ''}.`, [A('digits', d, L === Rr ? { done: d.map((_, i) => i) } : { active: d.map((_, i) => i) })], { count }); }
  ANIM['Count Symmetric Integers'] = W('Scan the range', C_CS, r.steps);
}

const C_F3 = `
for (int x = 100; x < 1000; x += 2) {
    int[] need = new int[10];
    need[x / 100]++;
    need[x / 10 % 10]++;
    need[x % 10]++;
    boolean ok = true;
    for (int d = 0; d < 10 && ok; d++) ok = need[d] <= have[d];
    if (ok) out.add(x);
}`;
{
  const r = recorder(), digits = [2, 1, 3, 0], have = Array(10).fill(0); digits.forEach(d => have[d]++); const out = [];
  r.step(0, 'digits = [2,1,3,0] → counts per digit.', [A('have', have)]);
  for (const x of [100, 102, 120, 122, 130, 132, 210, 312, 320, 324]) { const need = Array(10).fill(0); need[Math.floor(x / 100)]++; need[Math.floor(x / 10) % 10]++; need[x % 10]++; const bad = need.map((v, d) => v > have[d] ? d : -1).filter(d => d >= 0); if (!bad.length) out.push(x); r.step(ln(C_F3, bad.length ? 'ok = need[d]' : 'out.add'), `${x}: ${bad.length ? `needs more ${bad.join(',')} than available → skip` : 'fits → keep'}.`, [A('have', have, bad.length ? { bad } : { done: digs(x) }), R('out', out)]); }
  r.step(0, 'The full scan gives [102,120,130,132,210,230,302,310,312,320], sorted and distinct for free.', [R('out', [102, 120, 130, 132, 210, 230, 302, 310, 312, 320], { done: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] })]);
  ANIM['Finding 3-Digit Even Numbers'] = W('Enumerate candidates', C_F3, r.steps);
}

const C_CC = `
return Math.max(n - 999, 0);`;
{
  const r = recorder();
  r.step(0, '1..999: no comma. 1,000..99,999: one comma each.', [R('band', ['1–999: 0', '1,000–99,999: 1'])]);
  r.step(ln(C_CC, 'return'), 'n = 1002 → numbers 1000, 1001, 1002 → <b>3</b> commas.', [R('with comma', [1000, 1001, 1002], { done: [0, 1, 2] })], { n: 1002, answer: 3 });
  ANIM['Count Commas in Range'] = W('Formula', C_CC, r.steps);
}

const C_CC2 = `
long lower = 1000;
for (int commas = 1; lower <= n; commas++) {
    long upper = Math.min(n, lower * 1000 - 1);
    result += (upper - lower + 1) * commas;
    if (lower > n / 1000) break;
    lower *= 1000;
}`;
{
  const r = recorder(), n = 12345678; let lower = 1000, res = 0, k = 1; const bands = [];
  r.step(ln(C_CC2, 'long lower'), `n = ${n.toLocaleString('en-US')}.`, [R('bands', bands)], { result: res });
  while (lower <= n) { const upper = Math.min(n, lower * 1000 - 1), cnt = upper - lower + 1; res += cnt * k; bands.push(`${lower.toLocaleString('en-US')}–${upper.toLocaleString('en-US')}: ${cnt}×${k}`); r.step(ln(C_CC2, 'result +='), `Band with ${k} comma${k > 1 ? 's' : ''}: ${cnt} numbers → +${cnt * k}.`, [R('bands', bands, { active: [bands.length - 1] })], { commas: k, result: res }); lower *= 1000; k++; }
  r.step(0, `Total <b>${res}</b>.`, [R('result', [res], { done: [0] })]);
  ANIM['Count Commas in Range II'] = W('Band counting', C_CC2, r.steps);
}

const C_TW = `
for (int i = 1; i + 1 < s.length(); i++) {
    char a = s.charAt(i - 1), b = s.charAt(i), c = s.charAt(i + 1);
    if ((b > a && b > c) || (b < a && b < c)) score++;
}`;
{
  const r = recorder(); let total = 0;
  for (const x of [4848, 1221, 97]) { const d = digs(x); if (d.length < 3) { r.step(0, `${x}: fewer than three digits → 0.`, [A('digits', d, { ghost: [0, 1] })], { total }); continue; } for (let i = 1; i + 1 < d.length; i++) { const peak = d[i] > d[i - 1] && d[i] > d[i + 1], val = d[i] < d[i - 1] && d[i] < d[i + 1]; if (peak || val) total++; r.step(ln(C_TW, 'score++'), `${x}, digit ${d[i]} between ${d[i - 1]} and ${d[i + 1]}: ${peak ? 'peak' : val ? 'valley' : 'neither'}.`, [A('digits', d, (peak || val) ? { done: [i], active: [i - 1, i + 1] } : { warn: [i] })], { total }); } }
  ANIM['Total Waviness of Numbers in Range I'] = W('Scan each number', C_TW, r.steps);
}

const C_MN1 = `
int n = nums.length, sum = n * (n + 1) / 2;
for (int x : nums) sum -= x;
return sum;`;
const C_MN2 = `
int x = nums.length;
for (int i = 0; i < nums.length; i++) x ^= i ^ nums[i];
return x;`;
{
  const a = [3, 0, 1], r = recorder(); let s = 6;
  r.step(ln(C_MN1, 'int n'), 'nums = [3,0,1], n = 3. Expected 0+1+2+3 = 6.', [A('nums', a)], { sum: s });
  a.forEach((v, i) => { s -= v; r.step(ln(C_MN1, 'sum -= x'), `Subtract ${v} → ${s}.`, [A('nums', a, { active: [i] })], { sum: s }); });
  r.step(ln(C_MN1, 'return'), `Missing <b>${s}</b>.`, [R('answer', [s], { done: [0] })]);
  const r2 = recorder(); let x = 3;
  r2.step(ln(C_MN2, 'int x'), 'Start with x = n = 3.', [A('nums', a)], { x });
  a.forEach((v, i) => { x ^= i ^ v; r2.step(ln(C_MN2, 'x ^= i'), `x ^= ${i} ^ ${v} → ${x}.`, [A('nums', a, { active: [i] })], { x }); });
  r2.step(ln(C_MN2, 'return'), `Every number seen as both index and value cancelled. Left: <b>${x}</b>.`, [R('answer', [x], { done: [0] })]);
  ANIM['Missing Number'] = [{ name: 'Sum formula', code: C_MN1, steps: r.steps }, { name: 'XOR', code: C_MN2, steps: r2.steps }];
}

const C_FM = `
long diff = sum - N * (N + 1) / 2;
long sqDiff = sq - N * (N + 1) * (2 * N + 1) / 6;
long plus = sqDiff / diff;
int a = (int) ((plus + diff) / 2), b = (int) ((plus - diff) / 2);`;
{
  const g = [[9, 1, 7], [8, 9, 2], [3, 4, 6]], r = recorder(), N = 9, flat = g.flat();
  const sum = flat.reduce((x, y) => x + y, 0), sq = flat.reduce((x, y) => x + y * y, 0), S = N * (N + 1) / 2, Q = N * (N + 1) * (2 * N + 1) / 6;
  const d = sum - S, q = sq - Q, p = q / d, a = (p + d) / 2, b = (p - d) / 2;
  r.step(0, 'Grid holds 1..9 except one repeat a and one missing b.', [G('grid', g)]);
  r.step(ln(C_FM, 'long diff'), `sum = ${sum}, expected ${S} → a − b = ${d}.`, [G('grid', g, [[0, 0, 'warn'], [1, 1, 'warn']])], { diff: d });
  r.step(ln(C_FM, 'long sqDiff'), `sum of squares = ${sq}, expected ${Q} → a² − b² = ${q}.`, [G('grid', g)], { diff: d, sqDiff: q });
  r.step(ln(C_FM, 'long plus'), `a + b = ${q} / ${d} = ${p}.`, [R('a + b', [p])], { diff: d, plus: p });
  r.step(ln(C_FM, 'int a'), `a = (${p} + ${d}) / 2 = <b>${a}</b>, b = (${p} − ${d}) / 2 = <b>${b}</b>.`, [R('[a, b]', [a, b], { done: [0, 1] })]);
  ANIM['Find Missing and Repeated Values'] = W('Two equations', C_FM, r.steps);
}

const C_MB = `
for (char c : text.toCharArray()) f[c - 'a']++;
return Math.min(Math.min(f['b' - 'a'], f['a' - 'a']),
       Math.min(Math.min(f['l' - 'a'] / 2, f['o' - 'a'] / 2), f['n' - 'a']));`;
{
  const t = 'loonbalxballpoon', r = recorder(), f = {}; for (const c of t) f[c] = (f[c] || 0) + 1;
  r.step(ln(C_MB, 'f[c - \'a\']++'), `text = "${t}". Count the letters of "balloon".`, [R('letters', ['b', 'a', 'l', 'o', 'n']), R('count', ['b', 'a', 'l', 'o', 'n'].map(c => f[c] || 0))]);
  const per = [f.b, f.a, Math.floor(f.l / 2), Math.floor(f.o / 2), f.n];
  r.step(ln(C_MB, 'return Math.min'), `Copies each letter allows: b ${per[0]}, a ${per[1]}, l/2 ${per[2]}, o/2 ${per[3]}, n ${per[4]} → <b>${Math.min(...per)}</b>.`, [R('copies', per, { done: per.map((v, i) => v === Math.min(...per) ? i : -1) })]);
  ANIM['Maximum Number of Balloons'] = W('Count and divide', C_MB, r.steps);
}
