const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const sum = (a, l, r) => a.slice(l, r).reduce((x, y) => x + y, 0);

const C_PI = `
for (int i = 0; i < nums.length; i++) {
    if (left == total - left - nums[i]) return i;
    left += nums[i];
}`;
{
  const a = [1, 7, 3, 6, 5, 6], total = 28, r = recorder(); let left = 0;
  for (let i = 0; i < a.length; i++) { const right = total - left - a[i], hit = left === right; r.step(ln(C_PI, hit ? 'return i' : 'left += nums[i]'), `i = ${i}: left ${left}, right ${right}${hit ? ' → equal → <b>' + i + '</b>' : ''}.`, [A('nums', a, hit ? { done: [i], warn: range(0, i - 1), active: range(i + 1, 5) } : { active: [i] })], { left, right }); if (hit) break; left += a[i]; }
  ANIM['Find Pivot Index'] = W('Running left sum', C_PI, r.steps);
}

const C_WS = `
for (int i = 0; i + 1 < nums.length; i++) {
    left += nums[i];
    if (left >= total - left) ways++;
}`;
{
  const a = [10, 4, -8, 7], total = 13, r = recorder(); let left = 0, ways = 0;
  for (let i = 0; i + 1 < a.length; i++) { left += a[i]; const ok = left >= total - left; if (ok) ways++; r.step(ln(C_WS, ok ? 'ways++' : 'left += nums[i]'), `Split after ${i}: left ${left} vs right ${total - left} → ${ok ? 'valid' : 'no'}.`, [A('nums', a, { warn: range(0, i), active: range(i + 1, 3) })], { left, ways }); }
  ANIM['Number of Ways to Split Array'] = W('Running sum', C_WS, r.steps);
}

const C_MA = `
left += nums[i];
long a = left / (i + 1), b = i == n - 1 ? 0 : (total - left) / (n - i - 1);
if (Math.abs(a - b) < bestDiff) {`;
{
  const a = [2, 5, 3, 9, 5, 3], n = 6, total = 27, r = recorder(); let left = 0, bd = Infinity, best = 0;
  for (let i = 0; i < n; i++) { left += a[i]; const x = Math.floor(left / (i + 1)), y = i === n - 1 ? 0 : Math.floor((total - left) / (n - i - 1)); if (Math.abs(x - y) < bd) { bd = Math.abs(x - y); best = i; } r.step(ln(C_MA, 'long a'), `i = ${i}: ⌊${left}/${i + 1}⌋ = ${x} vs ${i === n - 1 ? 'empty → 0' : `⌊${total - left}/${n - i - 1}⌋ = ${y}`} → diff ${Math.abs(x - y)}.`, [A('nums', a, { warn: range(0, i), active: range(i + 1, n - 1) })], { best, bestDiff: bd }); }
  ANIM['Minimum Average Difference'] = W('Running sum', C_MA, r.steps);
}

const C_SH = `
score += customers.charAt(j) == 'Y' ? -1 : 1;
if (score < best) {
    best = score;
    bestHour = j + 1;
}`;
{
  const c = 'YYNY', r = recorder(); let score = 0, best = 0, bh = 0;
  r.step(0, 'Closing at hour 0 costs one per Y. Each later hour changes that by −1 (Y) or +1 (N).', [lane('customers', c.split(''), { showIdx: true })], { score, bestHour: bh });
  c.split('').forEach((ch, j) => { score += ch === 'Y' ? -1 : 1; const better = score < best; if (better) { best = score; bh = j + 1; } r.step(ln(C_SH, better ? 'bestHour = j + 1' : 'score +='), `Close at ${j + 1}: relative score ${score}${better ? ' → new best' : ''}.`, [lane('customers', c.split(''), { done: range(0, j), showIdx: true })], { score, bestHour: bh }); });
  ANIM['Minimum Penalty for a Shop'] = W('Running score', C_SH, r.steps);
}

const C_GC = `
total += garbage[i].length();
if (garbage[i].indexOf('M') >= 0) lastM = i;
for (int i = 1; i < garbage.length; i++) pre[i] = pre[i - 1] + travel[i - 1];
return total + pre[lastM] + pre[lastP] + pre[lastG];`;
{
  const g = ['G', 'P', 'GP', 'GG'], tr = [2, 4, 3], r = recorder(), pre = [0, 2, 6, 9];
  r.step(ln(C_GC, 'total +='), 'Units of garbage: 1 + 1 + 2 + 2 = 6 minutes of pickup.', [R('houses', g)], { total: 6 });
  r.step(ln(C_GC, 'pre[i] = pre'), `Travel prefix: [${pre}]. Last M: none (0), last P: house 2, last G: house 3.`, [A('pre', pre, { warn: [2, 3] })]);
  r.step(ln(C_GC, 'return'), 'Answer 6 + 0 + 6 + 9 = <b>21</b>.', [R('answer', [21], { done: [0] })]);
  ANIM['Minimum Amount of Time to Collect Garbage'] = W('Last index + prefix', C_GC, r.steps);
}

const C_VS = `
pre[i + 1] = pre[i] + (good ? 1 : 0);
for (int q = 0; q < queries.length; q++) out[q] = pre[queries[q][1] + 1] - pre[queries[q][0]];`;
{
  const w = ['aba', 'bcb', 'ece', 'aa', 'e'], flags = w.map(x => 'aeiou'.includes(x[0]) && 'aeiou'.includes(x[x.length - 1]) ? 1 : 0), pre = [0], r = recorder(); flags.forEach(f => pre.push(pre[pre.length - 1] + f));
  r.step(ln(C_VS, 'pre[i + 1]'), `Flags [${flags}] → prefix [${pre}].`, [R('words', w, { done: flags.map((f, i) => f ? i : -1).filter(i => i >= 0) }), A('pre', pre)]);
  for (const [l, rr] of [[0, 2], [1, 4], [1, 1]]) r.step(ln(C_VS, 'out[q]'), `[${l}, ${rr}]: pre[${rr + 1}] − pre[${l}] = ${pre[rr + 1]} − ${pre[l]} = <b>${pre[rr + 1] - pre[l]}</b>.`, [A('pre', pre, { active: [l, rr + 1] })]);
  ANIM['Count Vowel Strings in Ranges'] = W('Prefix of flags', C_VS, r.steps);
}

const C_OS = `
sum = (sum + x) % 2;
if (sum == 1) {
    count += even;
    odd++;
} else {
    count += odd;
    even++;
}`;
{
  const a = [1, 3, 5], r = recorder(); let s = 0, odd = 0, even = 1, c = 0;
  r.step(0, 'Empty prefix is even: even = 1.', [A('arr', a)], { odd, even, count: c });
  a.forEach((x, i) => { s = (s + x) % 2; if (s) { c += even; odd++; } else { c += odd; even++; } r.step(ln(C_OS, s ? 'count += even' : 'count += odd'), `Prefix parity ${s ? 'odd' : 'even'} → pairs with ${s ? 'even' : 'odd'} prefixes. count ${c}.`, [A('arr', a, { active: range(0, i) })], { odd, even, count: c }); });
  r.step(0, `Answer <b>${c}</b>: [1], [3], [5], [1,3,5].`, [R('answer', [c], { done: [0] })]);
  ANIM['Number of Sub-arrays With Odd Sum'] = W('Parity counts', C_OS, r.steps);
}

const C_PE = `
for (int i = 1; i < n; i++) ans[i] = ans[i - 1] * nums[i - 1];
for (int i = n - 1; i >= 0; i--) {
    ans[i] *= suffix;
    suffix *= nums[i];
}`;
{
  const a = [1, 2, 3, 4], r = recorder(), ans = [1]; for (let i = 1; i < 4; i++) ans.push(ans[i - 1] * a[i - 1]);
  r.step(ln(C_PE, 'ans[i] = ans[i - 1]'), `Prefix products (everything to the left): [${ans}].`, [A('nums', a), A('ans', ans.slice())]);
  let suf = 1; for (let i = 3; i >= 0; i--) { ans[i] *= suf; r.step(ln(C_PE, 'ans[i] *= suffix'), `i = ${i}: multiply by suffix ${suf} → ${ans[i]}.`, [A('ans', ans.slice(), { active: [i], done: range(i + 1, 3) })], { suffix: suf }); suf *= a[i]; }
  ANIM['Product of Array Except Self'] = W('Two sweeps', C_PE, r.steps);
}

const C_LK = `
public void add(int num) {
    if (num == 0) {
        pre = new ArrayList<>(List.of(1));
        return;
    }
    pre.add(pre.get(pre.size() - 1) * num);
}
public int getProduct(int k) {
    if (k >= n) return 0;
    return pre.get(n - 1) / pre.get(n - 1 - k);
}`;
{
  const r = recorder(); let pre = [1];
  for (const op of [['add', 3], ['add', 0], ['add', 2], ['add', 5], ['add', 4], ['get', 2], ['get', 3], ['get', 4]]) { if (op[0] === 'add') { if (op[1] === 0) { pre = [1]; r.step(ln(C_LK, 'pre = new ArrayList'), 'add(0): every product through here is 0 → reset.', [A('pre', pre.slice())]); } else { pre.push(pre[pre.length - 1] * op[1]); r.step(ln(C_LK, 'pre.add'), `add(${op[1]}).`, [A('pre', pre.slice(), { active: [pre.length - 1] })]); } } else { const k = op[1], n = pre.length; if (k >= n) r.step(ln(C_LK, 'return 0'), `getProduct(${k}): reaches the zero → <b>0</b>.`, [A('pre', pre.slice(), { bad: [0] })]); else r.step(ln(C_LK, 'return pre.get'), `getProduct(${k}) = ${pre[n - 1]} / ${pre[n - 1 - k]} = <b>${pre[n - 1] / pre[n - 1 - k]}</b>.`, [A('pre', pre.slice(), { done: [n - 1], warn: [n - 1 - k] })]); } }
  ANIM['Product of the Last K Numbers'] = W('Prefix products', C_LK, r.steps);
}

const C_PC = `
if (++seen[A[i]] == 2) common++;
if (++seen[B[i]] == 2) common++;
out[i] = common;`;
{
  const A_ = [1, 3, 2, 4], B = [3, 1, 2, 4], r = recorder(), seen = {}, out = []; let common = 0;
  A_.forEach((x, i) => { for (const v of [x, B[i]]) { seen[v] = (seen[v] || 0) + 1; if (seen[v] === 2) common++; } out.push(common); r.step(ln(C_PC, 'out[i] = common'), `i = ${i}: A adds ${x}, B adds ${B[i]} → ${common} common.`, [A('A', A_, { active: [i] }), A('B', B, { active: [i] }), A('C', out.slice())]); });
  ANIM['Find the Prefix Common Array of Two Arrays'] = W('Seen counts', C_PC, r.steps);
}

const C_AD = `
int right = total - left - nums[i];
out[i] = nums[i] * i - left + right - nums[i] * (n - 1 - i);
left += nums[i];`;
{
  const a = [1, 4, 6, 8, 10], n = 5, total = 29, r = recorder(); let left = 0; const out = [];
  a.forEach((x, i) => { const right = total - left - x; out.push(x * i - left + right - x * (n - 1 - i)); r.step(ln(C_AD, 'out[i]'), `x = ${x}: left ${x}·${i} − ${left}, right ${right} − ${x}·${n - 1 - i} → ${out[i]}.`, [A('nums', a, { active: [i], warn: range(0, i - 1) }), A('result', out.slice())]); left += x; });
  ANIM['Sum of Absolute Differences in a Sorted Array'] = W('Prefix sums', C_AD, r.steps);
}

const C_SD = `
for (int i = 0; i < nums.length; i++) groups.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
long i = idx.get(k), right = total - left - i;
out[(int) i] = i * k - left + right - i * (m - 1 - k);`;
{
  const a = [1, 3, 1, 1, 2], r = recorder();
  r.step(ln(C_SD, 'groups.computeIfAbsent'), 'Value 1 sits at indexes [0, 2, 3]; values 3 and 2 appear once.', [A('nums', a, { warn: [0, 2, 3] })]);
  const idx = [0, 2, 3], tot = 5; let left = 0; const out = [0, 0, 0, 0, 0];
  idx.forEach((i, k) => { const right = tot - left - i; out[i] = i * k - left + right - i * (2 - k); r.step(ln(C_SD, 'out[(int) i]'), `Index ${i}: ${i}·${k} − ${left} + ${right} − ${i}·${2 - k} = ${out[i]}.`, [A('result', out.slice(), { active: [i] })]); left += i; });
  ANIM['Sum of Distances'] = W('Groups + prefix sums', C_SD, r.steps);
}
