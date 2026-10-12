const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });

const C_CM = `
int w = n / 7, r = n % 7;
int full = 28 * w + 7 * w * (w - 1) / 2;
int partial = r * (w + 1) + r * (r - 1) / 2;
return full + partial;`;
{
  const n = 17, r = recorder(), w = Math.floor(n / 7), rr = n % 7, rows = range(0, w).map(k => range(0, 6).map(d => k * 7 + d < n ? k + d + 1 : ''));
  r.step(0, 'n = 17. Week k deposits k+1 … k+7.', [G('deposits', rows, [], { rowLabels: ['wk 0', 'wk 1', 'wk 2'], colLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] })]);
  const full = 28 * w + 7 * w * (w - 1) / 2;
  r.step(ln(C_CM, 'int full'), `${w} full weeks: 28 + 35 = ${full}.`, [G('deposits', rows, range(0, w - 1).flatMap(k => range(0, 6).map(d => [k, d, 'done'])), { rowLabels: ['wk 0', 'wk 1', 'wk 2'], colLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] })], { w, full });
  const part = rr * (w + 1) + rr * (rr - 1) / 2;
  r.step(ln(C_CM, 'int partial'), `${rr} days left starting at ${w + 1}: ${range(w + 1, w + rr).join(' + ')} = ${part}.`, [G('deposits', rows, range(0, rr - 1).map(d => [w, d, 'active']), { rowLabels: ['wk 0', 'wk 1', 'wk 2'], colLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] })], { r: rr, partial: part });
  r.step(ln(C_CM, 'return'), `Total <b>${full + part}</b>.`, [R('total', [full + part], { done: [0] })]);
  ANIM['Calculate Money in Leetcode Bank'] = W('Formula', C_CM, r.steps);
}

const C_CT = `
return n - 1;`;
{
  const r = recorder(); let n = 7, matches = 0;
  while (n > 1) { const m = Math.floor(n / 2); matches += m; r.step(0, `${n} teams: ${m} matches${n % 2 ? ', one bye' : ''}, ${Math.ceil(n / 2)} advance.`, [lane('teams', range(1, n), { bad: range(0, m - 1).map(i => 2 * i + 1) })], { matches }); n = Math.ceil(n / 2); }
  r.step(ln(C_CT, 'return'), `${matches} matches = 7 − 1. Each match removed one team.`, [R('matches', [matches], { done: [0] })]);
  ANIM['Count of Matches in Tournament'] = W('Count eliminations', C_CT, r.steps);
}

const C_PP = `
int trips = time / (n - 1), rest = time % (n - 1);
return trips % 2 == 0 ? 1 + rest : n - rest;`;
{
  const r = recorder(), n = 4;
  for (const time of [2, 5, 7]) { const trips = Math.floor(time / (n - 1)), rest = time % (n - 1), ans = trips % 2 === 0 ? 1 + rest : n - rest; r.step(ln(C_PP, 'return'), `time = ${time}: ${trips} trips of ${n - 1}, ${rest} more → ${trips % 2 ? 'walking back from 4' : 'walking forward from 1'} → person <b>${ans}</b>.`, [lane('people', range(1, n), { active: [ans - 1] })], { trips, rest }); }
  ANIM['Pass the Pillow'] = W('Trips and remainder', C_PP, r.steps);
}

const C_WB = `
int drunk = numBottles, empty = numBottles;
while (empty >= numExchange) {
    int fresh = empty / numExchange;
    drunk += fresh;
    empty = empty % numExchange + fresh;
}`;
{
  const r = recorder(), e = 3; let drunk = 9, empty = 9;
  r.step(ln(C_WB, 'int drunk'), '9 bottles, exchange 3. Drink all 9.', [R('drunk, empty', [drunk, empty])], { drunk, empty });
  while (empty >= e) { const f = Math.floor(empty / e); drunk += f; empty = empty % e + f; r.step(ln(C_WB, 'empty = empty %'), `Trade for ${f} full, drink them: drunk ${drunk}, empty ${empty}.`, [R('drunk, empty', [drunk, empty], { active: [0] })], { drunk, empty }); }
  r.step(0, `Formula: 9 + (9 − 1)/(3 − 1) = <b>${9 + Math.floor(8 / 2)}</b>.`, [R('answer', [drunk], { done: [0] })]);
  ANIM['Water Bottles'] = W('Simulate', C_WB, r.steps);
}

const C_CO = `
while (num1 != 0 && num2 != 0) {
    if (num1 >= num2) {
        ops += num1 / num2;
        num1 %= num2;
    } else {
        ops += num2 / num1;
        num2 %= num1;
    }
}`;
{
  const r = recorder(); let a = 10, b = 3, ops = 0;
  r.step(0, 'num1 = 10, num2 = 3.', [R('num1, num2', [a, b])], { ops });
  while (a && b) { if (a >= b) { ops += Math.floor(a / b); const q = Math.floor(a / b); a %= b; r.step(ln(C_CO, 'num1 %= num2'), `Subtract ${b} from num1 ${q} times at once → ${a}.`, [R('num1, num2', [a, b], { active: [0] })], { ops }); } else { const q = Math.floor(b / a); ops += q; b %= a; r.step(ln(C_CO, 'num2 %= num1'), `Subtract ${a} from num2 ${q} times → ${b}.`, [R('num1, num2', [a, b], { active: [1] })], { ops }); } }
  r.step(0, `Total <b>${ops}</b> operations.`, [R('ops', [ops], { done: [0] })]);
  ANIM['Count Operations to Obtain Zero'] = W('Bulk Euclid', C_CO, r.steps);
}

const C_OD = `
return (high + 1) / 2 - low / 2;`;
{
  const r = recorder(), low = 3, high = 7;
  r.step(0, 'Odds in [0, 7]: 1, 3, 5, 7 → (7 + 1)/2 = 4.', [lane('0..7', range(0, 7), { done: [1, 3, 5, 7] })]);
  r.step(0, 'Odds in [0, 2]: just 1 → 3/2 = 1.', [lane('0..7', range(0, 7), { ghost: [1], done: [3, 5, 7] })]);
  r.step(ln(C_OD, 'return'), '4 − 1 = <b>3</b> (3, 5, 7).', [R('answer', [3], { done: [0] })]);
  ANIM['Count Odd Numbers in an Interval Range'] = W('Prefix counts', C_OD, r.steps);
}

const C_PI = `
int total = n * (n + 1) / 2;
int x = (int) Math.sqrt(total);
return x * x == total ? x : -1;`;
{
  const r = recorder(), n = 8;
  r.step(ln(C_PI, 'int total'), 'n = 8: total = 36.', [lane('1..8', range(1, 8))], { total: 36 });
  r.step(ln(C_PI, 'Math.sqrt'), '√36 = 6. Check: 1+…+6 = 21 and 6+7+8 = 21.', [lane('1..8', range(1, 8), { warn: [0, 1, 2, 3, 4], active: [5], done: [6, 7] })], { x: 6 });
  r.step(ln(C_PI, 'return'), '6² = 36 → <b>6</b>.', [R('answer', [6], { done: [0] })]);
  ANIM['Find the Pivot Integer'] = W('Formula', C_PI, r.steps);
}

const C_CC = `
return 1 + 2L * n * (n - 1);`;
{
  const r = recorder(), N = 7, c = 3;
  for (let n = 1; n <= 4; n++) { const m = range(0, N - 1).map(i => range(0, N - 1).map(j => Math.abs(i - c) + Math.abs(j - c) < n ? (Math.abs(i - c) + Math.abs(j - c) === n - 1 ? 'new' : '■') : '')); r.step(ln(C_CC, 'return'), `Minute ${n}: ring of ${n === 1 ? 1 : 4 * (n - 1)} → total ${1 + 2 * n * (n - 1)}.`, [G('cells', m, range(0, N - 1).flatMap(i => range(0, N - 1).filter(j => Math.abs(i - c) + Math.abs(j - c) === n - 1).map(j => [i, j, 'active'])))], { n, total: 1 + 2 * n * (n - 1) }); }
  ANIM['Count Total Number of Colored Cells'] = W('Series', C_CC, r.steps);
}

const C_AF = `
return (long) n * m / 2;`;
{
  const r = recorder(), n = 3, m = 2, g = range(1, n).map(x => range(1, m).map(y => (x + y) % 2 ? 'A' : 'B'));
  r.step(0, 'n = 3, m = 2. Alice wins when x + y is odd (she makes the last move).', [G('winner', g, range(0, n - 1).flatMap(i => range(0, m - 1).filter(j => (i + j + 2) % 2).map(j => [i, j, 'done'])), { rowLabels: range(1, n), colLabels: range(1, m) })]);
  r.step(ln(C_AF, 'return'), '3 · 2 / 2 = <b>3</b> winning pairs.', [R('answer', [3], { done: [0] })]);
  ANIM['Alice and Bob Playing Flower Game'] = W('Parity count', C_AF, r.steps);
}

const C_VG = `
for (char c : s.toCharArray())
    if ("aeiou".indexOf(c) >= 0) return true;
return false;`;
{
  const r = recorder(), s = 'leetcoder'.split(''), v = s.map((c, i) => 'aeiou'.includes(c) ? i : -1).filter(i => i >= 0);
  r.step(ln(C_VG, 'return true'), '"leetcoder" has 4 vowels (even) → Alice has a winning plan.', [lane('s', s, { warn: v })]);
  r.step(0, 'Alice removes "leetcod" (3 vowels, odd), leaving "er" with one vowel.', [lane('s', s, { ghost: range(0, 6), warn: [7] })]);
  r.step(0, 'Bob needs an even count; he can only remove "r" or nothing useful. Alice then takes the vowel and wins.', [lane('left', ['e', 'r'], { done: [0] })]);
  ANIM['Vowels Game in a String'] = W('Look for a vowel', C_VG, r.steps);
}

const C_AC = `
double m = minutes * 6.0;
double h = (hour % 12) * 30.0 + minutes * 0.5;
double diff = Math.abs(h - m);
return Math.min(diff, 360 - diff);`;
{
  const r = recorder(), hr = 3, mi = 30;
  r.step(ln(C_AC, 'double m'), '3:30. Minute hand: 30 · 6 = 180°.', [R('minute°', [180])], { m: 180 });
  r.step(ln(C_AC, 'double h'), 'Hour hand: 3 · 30 + 30 · 0.5 = 105°. It has moved half way to 4.', [R('hour°', [105])], { m: 180, h: 105 });
  r.step(ln(C_AC, 'return'), '|105 − 180| = 75; min(75, 285) = <b>75</b>.', [R('angle', [75], { done: [0] })]);
  ANIM['Angle Between Hands of a Clock'] = W('Formula', C_AC, r.steps);
}

const C_MO = `
return n * n / 4;`;
{
  const r = recorder(), n = 6, a = range(0, n - 1).map(i => 2 * i + 1);
  r.step(0, `n = 6: arr = [${a}]. The mean is 6, every element ends there.`, [A('arr', a)]);
  r.step(0, 'Lower half needs 5 + 3 + 1 = 9 units moved in from the upper half.', [A('need', a.map(x => 6 - x), { warn: [0, 1, 2], ghost: [3, 4, 5] })]);
  r.step(ln(C_MO, 'return'), '6² / 4 = <b>9</b>.', [R('answer', [9], { done: [0] })]);
  ANIM['Minimum Operations to Make Array Equal'] = W('Formula', C_MO, r.steps);
}

const C_AP = `
int d = (max - min) / (n - 1);
if (d == 0) return true;
boolean[] used = new boolean[n];
for (int x : arr) {
    if ((x - min) % d != 0) return false;
    int slot = (x - min) / d;
    if (used[slot]) return false;
    used[slot] = true;
}`;
{
  const arr = [7, 1, 13, 4, 10], r = recorder(), min = 1, max = 13, d = 3, used = Array(5).fill('·');
  r.step(ln(C_AP, 'int d'), 'arr = [7,1,13,4,10]: min 1, max 13, n = 5 → d = 12/4 = 3.', [A('arr', arr)], { d });
  arr.forEach((x, i) => { const slot = (x - min) / d; used[slot] = x; r.step(ln(C_AP, 'used[slot] = true'), `${x} → slot ${slot}.`, [A('arr', arr, { active: [i] }), A('slots', used.slice(), { done: [slot] })], { slot }); });
  r.step(0, 'Every slot filled once → <b>true</b>.', [A('slots', used, { done: range(0, 4) })]);
  ANIM['Can Make Arithmetic Progression From Sequence'] = W('Slots', C_AP, r.steps);
}

const C_HS = `
for (int d : differences) {
    cur += d;
    min = Math.min(min, cur);
    max = Math.max(max, cur);
}
return (int) Math.max(0, (upper - lower) - (max - min) + 1);`;
{
  const diff = [3, -4, 5, 1, -2], lower = -4, upper = 5, r = recorder(); let cur = 0, mn = 0, mx = 0; const pre = [0];
  r.step(0, 'differences [3,-4,5,1,-2], range [-4, 5]. Start the shape at 0.', [A('prefix', pre)], { min: 0, max: 0 });
  for (const d of diff) { cur += d; pre.push(cur); mn = Math.min(mn, cur); mx = Math.max(mx, cur); r.step(ln(C_HS, 'cur += d'), `prefix ${cur}.`, [A('prefix', pre, { active: [pre.length - 1] })], { min: mn, max: mx }); }
  const ans = Math.max(0, (upper - lower) - (mx - mn) + 1);
  r.step(ln(C_HS, 'return'), `Shape height ${mx - mn}, room ${upper - lower} → <b>${ans}</b> starting values.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Count the Hidden Sequences'] = W('Prefix range', C_HS, r.steps);
}

const C_GL = `
for (int i = 0; i < nums.length; i++)
    if (Math.abs(nums[i] - i) > 1) return false;
return true;`;
{
  const run = a => { const r = recorder(); for (let i = 0; i < a.length; i++) { const bad = Math.abs(a[i] - i) > 1; r.step(ln(C_GL, bad ? 'return false' : 'Math.abs'), `nums[${i}] = ${a[i]}, distance ${Math.abs(a[i] - i)}${bad ? ' > 1 → an inversion skips a position → <b>false</b>' : ''}.`, [A('nums', a, bad ? { bad: [i] } : { active: [i], done: range(0, i - 1) })]); if (bad) return r.steps; } r.step(ln(C_GL, 'return true'), 'Everything within one place → <b>true</b>.', [A('nums', a, { done: range(0, a.length - 1) })]); return r.steps; };
  ANIM['Global and Local Inversions'] = [{ name: '[1,0,2]', code: C_GL, steps: run([1, 0, 2]) }, { name: '[1,2,0]', code: C_GL, steps: run([1, 2, 0]) }];
}

const C_CU = `
if (min % 2 != 0) return true;
for (int x : nums1)
    if (x % 2 != 0) return false;
return true;`;
{
  const r = recorder();
  r.step(ln(C_CU, 'if (min % 2'), '[3,4,8]: min 3 is odd. 4 − 3 = 1 and 8 − 3 = 5 → all odd → <b>true</b>.', [A('nums1', [3, 4, 8], { active: [0], done: [1, 2] })]);
  r.step(ln(C_CU, 'return false'), '[2,3,5]: min 2 is even and stuck. 3 has no smaller odd to subtract → <b>false</b>.', [A('nums1', [2, 3, 5], { active: [0], bad: [1] })]);
  ANIM['Construct Uniform Parity Array II'] = W('Check the minimum', C_CU, r.steps);
}

const C_BA = `
while (res.size() < n) {
    List<Integer> next = new ArrayList<>();
    for (int x : res) if (2 * x - 1 <= n) next.add(2 * x - 1);
    for (int x : res) if (2 * x <= n) next.add(2 * x);
    res = next;
}`;
{
  const r = recorder(), n = 5; let res = [1];
  r.step(0, 'Start with [1].', [R('res', res)]);
  while (res.length < n) { const o = res.map(x => 2 * x - 1).filter(x => x <= n), e = res.map(x => 2 * x).filter(x => x <= n); res = [...o, ...e]; r.step(ln(C_BA, 'res = next'), `Odds 2x − 1 = [${o}], evens 2x = [${e}].`, [R('res', res, { warn: range(0, o.length - 1), done: range(o.length, res.length - 1) })]); }
  r.step(0, `<b>[${res}]</b>: no middle element is the average of two outer ones.`, [R('res', res, { done: range(0, res.length - 1) })]);
  ANIM['Beautiful Array'] = W('Build by doubling', C_BA, r.steps);
}

const C_DR = `
int dx = Math.abs(sx - fx), dy = Math.abs(sy - fy);
if (dx == 0 && dy == 0) return t != 1;
return Math.max(dx, dy) <= t;`;
{
  const r = recorder(), m = range(0, 4).map(() => Array(6).fill(''));
  m[0][0] = 'S'; m[1][1] = 1; m[2][2] = 2; m[3][3] = 3; m[3][4] = 4; m[3][5] = 'F';
  r.step(ln(C_DR, 'int dx'), 'From (0,0) to (3,5): dx = 3, dy = 5. Go diagonal 3 times, then straight 2.', [G('path', m, [[0, 0, 'active'], [3, 5, 'done']])], { dx: 3, dy: 5 });
  r.step(ln(C_DR, 'Math.max'), 'max(3, 5) = 5 ≤ t = 6 → <b>true</b>; the spare second is burnt by a detour.', [G('path', m, [[1, 1, 'warn'], [2, 2, 'warn'], [3, 3, 'warn'], [3, 4, 'warn'], [3, 5, 'done']])], { t: 6 });
  r.step(ln(C_DR, 't != 1'), 'Special case: start = target with t = 1 → must move away and cannot return → false.', [R('t', [1], { bad: [0] })]);
  ANIM['Determine if a Cell Is Reachable at a Given Time'] = W('Distance check', C_DR, r.steps);
}

const C_MT = `
for (int i = 1; i < points.length; i++) {
    int dx = Math.abs(points[i][0] - points[i - 1][0]);
    int dy = Math.abs(points[i][1] - points[i - 1][1]);
    time += Math.max(dx, dy);
}`;
{
  const pts = [[1, 1], [3, 4], [-1, 0]], r = recorder(); let time = 0;
  r.step(0, 'points (1,1) → (3,4) → (−1,0).', [R('points', pts.map(p => `(${p})`))], { time });
  for (let i = 1; i < pts.length; i++) { const dx = Math.abs(pts[i][0] - pts[i - 1][0]), dy = Math.abs(pts[i][1] - pts[i - 1][1]); time += Math.max(dx, dy); r.step(ln(C_MT, 'time +='), `Leg ${i}: dx ${dx}, dy ${dy} → ${Math.max(dx, dy)} seconds.`, [R('points', pts.map(p => `(${p})`), { active: [i - 1, i] })], { dx, dy, time }); }
  r.step(0, `Total <b>${time}</b>.`, [R('time', [time], { done: [0] })]);
  ANIM['Minimum Time Visiting All Points'] = W('Sum of legs', C_MT, r.steps);
}
