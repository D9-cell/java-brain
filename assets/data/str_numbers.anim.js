const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);

const C_AD = `
while (i >= 0 || j >= 0 || carry > 0) {
    int sum = carry;
    if (i >= 0) sum += num1.charAt(i--) - '0';
    if (j >= 0) sum += num2.charAt(j--) - '0';
    sb.append(sum % 10);
    carry = sum / 10;
}`;
{
  const a = '456', b = '77', r = recorder(); let i = 2, j = 1, carry = 0; const out = [];
  while (i >= 0 || j >= 0 || carry) { let s = carry; const ai = i, bj = j; if (i >= 0) s += +a[i--]; if (j >= 0) s += +b[j--]; out.unshift(s % 10); carry = Math.floor(s / 10); r.step(ln(C_AD, 'sb.append'), `${ai >= 0 ? a[ai] : 0} + ${bj >= 0 ? b[bj] : 0} + carry = ${s} → write ${s % 10}, carry ${carry}.`, [lane('num1', a.split(''), { active: ai >= 0 ? [ai] : [] }), lane('num2', b.split(''), { active: bj >= 0 ? [bj] : [] }), lane('result', out.slice())], { carry }); }
  r.step(0, `<b>${out.join('')}</b>.`, [lane('result', out, { done: range(0, out.length - 1) })]);
  ANIM['Add Strings'] = W('Grade-school addition', C_AD, r.steps);
}

const C_MU = `
for (int i = m - 1; i >= 0; i--)
    for (int j = n - 1; j >= 0; j--) {
        int sum = (num1.charAt(i) - '0') * (num2.charAt(j) - '0') + pos[i + j + 1];
        pos[i + j + 1] = sum % 10;
        pos[i + j] += sum / 10;
    }`;
{
  const a = '123', b = '45', r = recorder(), pos = Array(5).fill(0);
  r.step(0, '123 × 45 has at most 3 + 2 = 5 digits.', [A('pos', pos.slice())]);
  for (let i = 2; i >= 0; i--) for (let j = 1; j >= 0; j--) { const s = +a[i] * +b[j] + pos[i + j + 1]; pos[i + j + 1] = s % 10; pos[i + j] += Math.floor(s / 10); r.step(ln(C_MU, 'pos[i + j] +='), `${a[i]} × ${b[j]} + ${s - +a[i] * +b[j]} = ${s} → slot ${i + j + 1} gets ${s % 10}, carry ${Math.floor(s / 10)} to slot ${i + j}.`, [lane('num1', a.split(''), { active: [i] }), lane('num2', b.split(''), { active: [j] }), A('pos', pos.slice(), { active: [i + j + 1], warn: [i + j] })]); }
  r.step(0, `Drop leading zeros → <b>${pos.join('').replace(/^0+/, '')}</b>.`, [A('pos', pos, { done: range(0, 4) })]);
  ANIM['Multiply Strings'] = W('Slot array', C_MU, r.steps);
}

const C_IR = `
for (int k = 0; k < val.length; k++)
    while (num >= val[k]) {
        sb.append(sym[k]);
        num -= val[k];
    }`;
{
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], sym = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'], r = recorder(); let num = 1994, out = '';
  val.forEach((v, k) => { while (num >= v) { out += sym[k]; num -= v; r.step(ln(C_IR, 'sb.append'), `Take ${sym[k]} (${v}) → "${out}", left ${num}.`, [R('table', sym, { active: [k] }), R('roman', [out])], { num }); } });
  r.step(0, `1994 = <b>${out}</b>.`, [R('roman', [out], { done: [0] })]);
  ANIM['Integer to Roman'] = W('Greedy over 13 values', C_IR, r.steps);
}

const C_CX = `
int[] x = parse(num1), y = parse(num2);
int real = x[0] * y[0] - x[1] * y[1], imag = x[0] * y[1] + x[1] * y[0];
return real + "+" + imag + "i";`;
{
  const r = recorder();
  r.step(ln(C_CX, 'parse(num1)'), '"1+-1i" → a = 1, b = −1; "1+-1i" → c = 1, d = −1.', [R('parts', ['a = 1', 'b = −1', 'c = 1', 'd = −1'])]);
  r.step(ln(C_CX, 'int real'), 'real = 1·1 − (−1)(−1) = 0, imag = 1·(−1) + (−1)·1 = −2.', [R('result', ['0', '−2'], { active: [0, 1] })]);
  r.step(ln(C_CX, 'return'), '<b>"0+-2i"</b>.', [R('answer', ['0+-2i'], { done: [0] })]);
  ANIM['Complex Number Multiplication'] = W('Parse and multiply', C_CX, r.steps);
}

const C_FA = `
num = num * b + sign * a * den;
den *= b;
long g = gcd(Math.abs(num), den);
num /= g;
den /= g;`;
{
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b), r = recorder(); let num = 0, den = 1;
  for (const [sg, a, b] of [[-1, 1, 2], [1, 1, 2], [1, 1, 3]]) { num = num * b + sg * a * den; den *= b; const g = gcd(Math.abs(num), den); num /= g; den /= g; r.step(ln(C_FA, 'num /= g'), `${sg < 0 ? '−' : '+'}${a}/${b} → running sum ${num}/${den}.`, [R('sum', [`${num}/${den}`], { active: [0] })], { num, den }); }
  r.step(0, `"-1/2+1/2+1/3" = <b>${num}/${den}</b>.`, [R('answer', [`${num}/${den}`], { done: [0] })]);
  ANIM['Fraction Addition and Subtraction'] = W('Running fraction', C_FA, r.steps);
}

const C_MS = `
for (int i = 0; i < d.length; i++) last[d[i] - '0'] = i;
for (int i = 0; i < d.length; i++)
    for (int k = 9; k > d[i] - '0'; k--)
        if (last[k] > i) {
            swap(d, i, last[k]);
            return Integer.parseInt(new String(d));
        }`;
{
  const d = '1993'.split(''), r = recorder(), last = {}; d.forEach((c, i) => last[c] = i);
  r.step(ln(C_MS, 'last[d[i]'), 'Last index of each digit: 1 → 0, 9 → 2, 3 → 3.', [lane('digits', d, { showIdx: true })]);
  r.step(ln(C_MS, 'last[k] > i'), "i = 0 (digit 1): the biggest later digit is 9, last copy at index 2.", [lane('digits', d, { active: [0], warn: [2], showIdx: true })]);
  [d[0], d[2]] = [d[2], d[0]];
  r.step(ln(C_MS, 'swap'), `Swap → <b>${d.join('')}</b> (using index 1 would give only 9193).`, [lane('digits', d, { done: [0, 2], showIdx: true })]);
  ANIM['Maximum Swap'] = W('Last index table', C_MS, r.steps);
}

const C_NG = `
int i = d.length - 2;
while (i >= 0 && d[i] >= d[i + 1]) i--;
if (i < 0) return -1;
int j = d.length - 1;
while (d[j] <= d[i]) j--;
swap(d, i, j);
reverse(d, i + 1, d.length - 1);`;
{
  const d = '12443322'.split('').map(Number), r = recorder(); let i = d.length - 2;
  while (i >= 0 && d[i] >= d[i + 1]) i--;
  r.step(ln(C_NG, 'd[i] >= d[i + 1]'), `From the right, the first drop is at i = ${i} (digit ${d[i]}); the tail is non-increasing.`, [A('digits', d.slice(), { active: [i], ghost: range(i + 1, d.length - 1) })]);
  let j = d.length - 1; while (d[j] <= d[i]) j--;
  r.step(ln(C_NG, 'd[j] <= d[i]'), `Rightmost digit bigger than ${d[i]} is ${d[j]} at ${j}.`, [A('digits', d.slice(), { active: [i], warn: [j] })]);
  [d[i], d[j]] = [d[j], d[i]];
  r.step(ln(C_NG, 'swap'), 'Swap them.', [A('digits', d.slice(), { done: [i, j] })]);
  const tail = d.splice(i + 1).reverse(); d.push(...tail);
  r.step(ln(C_NG, 'reverse'), `Reverse the tail → <b>${d.join('')}</b>.`, [A('digits', d, { done: range(i + 1, d.length - 1) })]);
  ANIM['Next Greater Element III'] = W('Next permutation', C_NG, r.steps);
}

const C_CP = `
cand.add((long) Math.pow(10, len - 1) - 1);
cand.add((long) Math.pow(10, len) + 1);
for (long h = half - 1; h <= half + 1; h++)
    if (String.valueOf(h).length() == String.valueOf(half).length()) cand.add(mirror(h, len % 2 == 1));`;
{
  const r = recorder(), n = 12345;
  r.step(ln(C_CP, 'Math.pow(10, len - 1)'), 'n = 12345. Length-change candidates: 9999 and 100001.', [R('candidates', [9999, 100001])]);
  r.step(ln(C_CP, 'cand.add(mirror'), 'Left half 123 (middle digit included). Mirror 122, 123, 124 → 12221, 12321, 12421.', [R('candidates', [9999, 100001, 12221, 12321, 12421], { active: [2, 3, 4] })]);
  r.step(0, 'Distances: 2346, 87656, 124, 24, 76 → <b>12321</b>.', [R('candidates', [9999, 100001, 12221, 12321, 12421], { done: [3] })]);
  ANIM['Find the Closest Palindrome'] = W('Five candidates', C_CP, r.steps);
}

const C_SJ = `
for (char c : s.toCharArray()) v = v * 10 + mapping[c - '0'];
key[i] = v;
Arrays.sort(idx, (a, b) -> Long.compare(key[a], key[b]));`;
{
  const mp = [8, 9, 4, 0, 2, 1, 3, 5, 7, 6], nums = [991, 338, 38], r = recorder(), key = nums.map(x => +String(x).split('').map(c => mp[+c]).join(''));
  r.step(ln(C_SJ, 'mapping[c'), `Mapped values: ${nums.map((x, i) => `${x} → ${key[i]}`).join(', ')}.`, [A('nums', nums), A('key', key)]);
  const order = [0, 1, 2].sort((a, b) => key[a] - key[b]);
  r.step(ln(C_SJ, 'Arrays.sort'), `Stable sort by key: 338 and 38 tie at 7 and keep their order → <b>[${order.map(i => nums[i])}]</b>.`, [A('sorted', order.map(i => nums[i]), { done: [0, 1, 2] })]);
  ANIM['Sort the Jumbled Numbers'] = W('Precomputed keys', C_SJ, r.steps);
}

const C_DI = `
for (int i = 0; i <= pattern.length(); i++) {
    stack.append((char) ('1' + i));
    if (i == pattern.length() || pattern.charAt(i) == 'I') {
        sb.append(stack.reverse());
        stack.setLength(0);
    }
}`;
{
  const p = 'IIIDIDDD', r = recorder(); let st = '', out = '';
  for (let i = 0; i <= p.length; i++) { st += String(i + 1); const flush = i === p.length || p[i] === 'I'; if (flush) { out += st.split('').reverse().join(''); r.step(ln(C_DI, 'sb.append'), `${i === p.length ? 'End' : `p[${i}] = I`}: flush "${st}" reversed → "${out}".`, [lane('pattern', p.split(''), { active: i < p.length ? [i] : [] }), lane('out', out.split(''))]); st = ''; } else r.step(ln(C_DI, 'stack.append'), `p[${i}] = D: hold ${st}.`, [lane('pattern', p.split(''), { warn: [i] }), R('stack', st.split(''))]); }
  ANIM['Construct Smallest Number From DI String'] = W('Stack flush', C_DI, r.steps);
}

const C_PI = `
for (int i = 0; i < pre; i++) {
    int d = t.charAt(i) - '0';
    if (d > limit) return result + (long) Math.pow(limit + 1, pre - i);
    result += d * (long) Math.pow(limit + 1, pre - i - 1);
}
if (t.substring(pre).compareTo(s) >= 0) result++;`;
{
  const r = recorder();
  r.step(0, 'start 1, finish 6000, limit 4, s = "124". count(6000): free prefix is the first digit, x has "6".', [lane('x', '6000'.split(''), { active: [0], ghost: [1, 2, 3] })]);
  r.step(ln(C_PI, 'd > limit'), '6 > limit 4 → every allowed digit 0..4 is smaller: add 5¹ = 5 (124, 1124, 2124, 3124, 4124).', [R('powerful', [124, 1124, 2124, 3124, 4124], { done: [0, 1, 2, 3, 4] })], { result: 5 });
  r.step(0, 'count(0) = 0, so the answer is <b>5</b>.', [R('answer', [5], { done: [0] })]);
  ANIM['Count the Number of Powerful Integers'] = W('Digit walk', C_PI, r.steps);
}

const C_UB = `
for (int i = 0; i < nums.length; i++) sb.append(nums[i].charAt(i) == '0' ? '1' : '0');`;
{
  const nums = ['111', '011', '001'], r = recorder(); let out = '';
  nums.forEach((s, i) => { out += s[i] === '0' ? '1' : '0'; r.step(ln(C_UB, 'sb.append'), `nums[${i}][${i}] = ${s[i]} → write ${out[i]}; now differs from "${s}".`, [lane(`nums[${i}]`, s.split(''), { active: [i] }), lane('answer', out.split(''))]); });
  r.step(0, `<b>"${out}"</b> is not in the list.`, [lane('answer', out.split(''), { done: [0, 1, 2] })]);
  ANIM['Find Unique Binary String'] = W('Diagonal flip', C_UB, r.steps);
}
