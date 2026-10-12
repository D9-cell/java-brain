const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const MP = (name, m) => R(name, Object.entries(m).map(([k, v]) => `${k}:${v}`));

const C_4S = `
for (int a : nums1)
    for (int b : nums2) sums.merge(a + b, 1, Integer::sum);
for (int c : nums3)
    for (int d : nums4) count += sums.getOrDefault(-(c + d), 0);`;
{
  const n1 = [1, 2], n2 = [-2, -1], n3 = [-1, 2], n4 = [0, 2], r = recorder(), sums = {};
  for (const a of n1) for (const b of n2) sums[a + b] = (sums[a + b] || 0) + 1;
  r.step(ln(C_4S, 'sums.merge'), 'All a + b from the first two arrays.', [MP('a + b counts', sums)]);
  let count = 0; for (const c of n3) for (const d of n4) { const add = sums[-(c + d)] || 0; count += add; r.step(ln(C_4S, 'count +='), `c + d = ${c + d}: need a + b = ${-(c + d)} → ${add}. count ${count}.`, [MP('a + b counts', sums)], { count }); }
  ANIM['4Sum II'] = W('Pair sums + map', C_4S, r.steps);
}

const C_TP = `
int p = nums[i] * nums[j];
count += 8 * products.getOrDefault(p, 0);
products.merge(p, 1, Integer::sum);`;
{
  const a = [2, 3, 4, 6], r = recorder(), prod = {}; let count = 0;
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { const p = a[i] * a[j], add = 8 * (prod[p] || 0); count += add; prod[p] = (prod[p] || 0) + 1; r.step(ln(C_TP, 'count += 8'), `${a[i]} × ${a[j]} = ${p}${add ? ` matches an earlier pair → +${add}` : ''}. count ${count}.`, [A('nums', a, { active: [i, j] }), MP('products', prod)], { count }); }
  ANIM['Tuple with Same Product'] = W('Products in a map', C_TP, r.steps);
}

const C_DS = `
Integer prev = best.get(s);
if (prev != null) answer = Math.max(answer, prev + x);
if (prev == null || x > prev) best.put(s, x);`;
{
  const a = [18, 43, 36, 13, 7], r = recorder(), best = {}; let ans = -1;
  a.forEach((x, i) => { const s = String(x).split('').reduce((p, c) => p + +c, 0), prev = best[s]; if (prev !== undefined) ans = Math.max(ans, prev + x); if (prev === undefined || x > prev) best[s] = x; r.step(ln(C_DS, prev !== undefined ? 'answer = Math.max' : 'best.put'), `${x}: digit sum ${s}${prev !== undefined ? `, pairs with ${prev} → ${prev + x}` : ''}. answer ${ans}.`, [A('nums', a, { active: [i] }), MP('best by digit sum', best)], { answer: ans }); });
  ANIM['Max Sum of a Pair With Equal Sum of Digits'] = W('Best per digit sum', C_DS, r.steps);
}

const C_PS = `
int r = t % 60;
pairs += count[(60 - r) % 60];
count[r]++;`;
{
  const t = [30, 20, 150, 100, 40], r = recorder(), cnt = {}; let pairs = 0;
  t.forEach((x, i) => { const rem = x % 60, need = (60 - rem) % 60, add = cnt[need] || 0; pairs += add; cnt[rem] = (cnt[rem] || 0) + 1; r.step(ln(C_PS, 'pairs +='), `${x}: remainder ${rem}, partner remainder ${need} seen ${add} time${add === 1 ? '' : 's'}. pairs ${pairs}.`, [A('time', t, { active: [i] }), MP('count by remainder', cnt)], { pairs }); });
  ANIM['Pairs of Songs With Total Durations Divisible by 60'] = W('Remainder counts', C_PS, r.steps);
}

const C_D4 = `
for (int x : arr) c[x % 4]++;
return c[0] * (c[0] - 1) / 2 + c[2] * (c[2] - 1) / 2 + c[1] * c[3];`;
{
  const a = [2, 2, 1, 7, 5], r = recorder(), c = [0, 0, 0, 0]; a.forEach(x => c[x % 4]++);
  r.step(ln(C_D4, 'c[x % 4]++'), `Remainders mod 4: counts [${c}].`, [A('arr', a), A('count', c)]);
  r.step(ln(C_D4, 'return'), `C(${c[0]},2) + C(${c[2]},2) + ${c[1]}·${c[3]} = <b>${c[0] * (c[0] - 1) / 2 + c[2] * (c[2] - 1) / 2 + c[1] * c[3]}</b>: (2,2), (1,7), (7,5).`, [R('answer', [c[0] * (c[0] - 1) / 2 + c[2] * (c[2] - 1) / 2 + c[1] * c[3]], { done: [0] })]);
  ANIM['Pairs which are Divisible by 4'] = W('Remainder counts', C_D4, r.steps);
}

const C_SQ = `
for (int x : a) squares.merge((long) x * x, 1, Integer::sum);
for (int j = 0; j < b.length; j++)
    for (int k = j + 1; k < b.length; k++) total += squares.getOrDefault((long) b[j] * b[k], 0);`;
{
  const a = [7, 4], b = [5, 2, 8, 9], r = recorder();
  r.step(ln(C_SQ, 'squares.merge'), 'Squares of nums1: {49, 16}.', [A('nums1', a), MP('squares', { 49: 1, 16: 1 })]);
  r.step(ln(C_SQ, 'total +='), 'Pair products of nums2: 10, 40, 45, 16, 18, 72. Only 2 × 8 = 16 matches → type 1 count 1.', [A('nums2', b, { done: [1, 2] })]);
  r.step(0, 'Type 2 (squares of nums2 vs pairs of nums1): 7 × 4 = 28 is no square → 0. Answer <b>1</b>.', [R('answer', [1], { done: [0] })]);
  ANIM['Number of Ways Where Square of Number Is Equal to Product of Two Numbers'] = W('Squares map + pair products', C_SQ, r.steps);
}

const C_FC = `
int delta = (sb - sa) / 2;
for (int x : aliceSizes)
    if (bob.contains(x + delta)) return new int[]{x, x + delta};`;
{
  const a = [1, 2, 5], b = [2, 4], r = recorder();
  r.step(ln(C_FC, 'int delta'), 'Alice 8, Bob 6 → y − x = (6 − 8)/2 = −1.', [A('alice', a), A('bob', b)], { delta: -1 });
  r.step(ln(C_FC, 'bob.contains'), 'x = 1 → need 0 (no). x = 2 → need 1 (no). x = 5 → need 4 (yes) → <b>[5, 4]</b>.', [A('alice', a, { done: [2] }), A('bob', b, { done: [1] })]);
  ANIM['Fair Candy Swap'] = W('Set lookup', C_FC, r.steps);
}

const C_SW = `
if ((sb - sa) % 2 != 0) return -1;
long delta = (sb - sa) / 2;
for (int x : a)
    if (inB.contains(x + delta)) return 1;`;
{
  const a = [4, 1, 2, 1, 1, 2], b = [3, 6, 3, 3], r = recorder();
  r.step(ln(C_SW, '% 2 != 0'), 'Sums 11 and 15: difference 4 is even.', [A('a', a), A('b', b)], { delta: 2 });
  r.step(ln(C_SW, 'return 1'), 'x = 4 needs 6 in b → yes. Swapping 4 and 6 makes both 13 → <b>1</b>.', [A('a', a, { done: [0] }), A('b', b, { done: [1] })]);
  ANIM['Swapping pairs make sum equal'] = W('Set lookup', C_SW, r.steps);
}

const C_TM = `
for (int i = 0; i < j; i++) {
    if (rating[i] < rating[j]) lessL++;
    else if (rating[i] > rating[j]) moreL++;
}
teams += lessL * moreR + moreL * lessR;`;
{
  const a = [2, 5, 3, 4, 1], r = recorder(); let teams = 0;
  a.forEach((v, j) => { const lL = a.slice(0, j).filter(x => x < v).length, mL = a.slice(0, j).filter(x => x > v).length, lR = a.slice(j + 1).filter(x => x < v).length, mR = a.slice(j + 1).filter(x => x > v).length; teams += lL * mR + mL * lR; r.step(ln(C_TM, 'teams +='), `middle ${v}: ${lL}·${mR} increasing + ${mL}·${lR} decreasing → teams ${teams}.`, [A('rating', a, { active: [j], warn: range(0, j - 1), done: range(j + 1, 4) })], { teams }); });
  ANIM['Count Number of Teams'] = W('Middle counting', C_TM, r.steps);
}
