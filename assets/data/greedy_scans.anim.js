const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);

const C_CANDY = `
Arrays.fill(c, 1);
for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);`;
{
  const rt = [1, 3, 4, 5, 2], c = Array(5).fill(1), r = recorder();
  r.step(ln(C_CANDY, 'Arrays.fill'), 'Ratings [1, 3, 4, 5, 2]. Everyone starts with 1 candy.', [A('ratings', rt), A('candies', c)]);
  for (let i = 1; i < 5; i++) { if (rt[i] > rt[i - 1]) c[i] = c[i - 1] + 1; r.step(ln(C_CANDY, 'c[i] = c[i - 1] + 1'), `Left pass, i = ${i}: ${rt[i]} ${rt[i] > rt[i - 1] ? '>' : '≤'} ${rt[i - 1]} → ${c[i]} candies.`, [A('ratings', rt, { active: [i] }), A('candies', c, { active: [i] })]); }
  for (let i = 3; i >= 0; i--) { if (rt[i] > rt[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1); r.step(ln(C_CANDY, 'Math.max(c[i]'), `Right pass, i = ${i}: ${rt[i]} ${rt[i] > rt[i + 1] ? '>' : '≤'} ${rt[i + 1]} → ${c[i]} candies.`, [A('ratings', rt, { active: [i] }), A('candies', c, { active: [i] })]); }
  r.step(ln(C_CANDY, 'for (int i = n - 2'), `Total candies = ${c.join(' + ')} = <b>${c.reduce((a, b) => a + b)}</b>.`, [A('candies', c, { done: idx(5) })]);
  ANIM['Candy'] = W('Two passes', C_CANDY, r.steps);
}

const C_GAS = `
for (int i = 0; i < gas.length; i++) {
    int diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) { start = i + 1; tank = 0; }
}
return total >= 0 ? start : -1;`;
{
  const gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2], r = recorder(); let total = 0, tank = 0, start = 0;
  r.step(0, 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]. Run a tank; when it goes negative restart after that station.', [A('gas − cost', gas.map((g, i) => g - cost[i]))]);
  gas.forEach((g, i) => { const d = g - cost[i]; total += d; tank += d; let say = `Station ${i}: ${d >= 0 ? '+' : ''}${d} → tank ${tank}.`; if (tank < 0) { start = i + 1; tank = 0; say += ` Negative: new start ${start}, tank reset.`; } r.step(ln(C_GAS, 'if (tank < 0)'), say, [A('gas − cost', gas.map((x, j) => x - cost[j]), { active: [i], done: idx(i).filter(j => j >= start) }), A('tank / start / total', [tank, start, total])]); });
  r.step(ln(C_GAS, 'return total'), `Total ${total} ≥ 0 → start at station <b>${start}</b>.`, [A('answer', [start], { done: [0] })]);
  ANIM['Gas Station'] = W('Reset the start', C_GAS, r.steps);
}

const C_G3 = `
if (sum % 3 == 0) return sum;
if (sum % 3 == 1) {
    if (!r1.isEmpty()) best = Math.max(best, sum - r1.get(0));
    if (r2.size() >= 2) best = Math.max(best, sum - r2.get(0) - r2.get(1));
} else {
    if (!r2.isEmpty()) best = Math.max(best, sum - r2.get(0));
    if (r1.size() >= 2) best = Math.max(best, sum - r1.get(0) - r1.get(1));
}`;
{
  const r = recorder();
  r.step(0, 'nums = [3, 6, 5, 1, 8]. sum = 23, 23 % 3 = 2. Numbers with remainder 1: [1]; remainder 2: [5, 8].', [A('nums', [3, 6, 5, 1, 8]), A('r1 / r2', ['1', '5, 8'])]);
  r.step(ln(C_G3, 'if (!r2.isEmpty())'), 'Remainder 2: drop the smallest r2 → 23 − 5 = 18.', [A('option 1', [18], { done: [0] })]);
  r.step(ln(C_G3, 'if (r1.size() >= 2)'), 'Or drop two r1 numbers: only one r1 exists → not possible.', [A('option 2', ['—'], { bad: [0] })]);
  r.step(ln(C_G3, 'else {'), 'Best = <b>18</b>.', [A('answer', [18], { done: [0] })]);
  ANIM['Greatest Sum Divisible by Three'] = W('Remove the cheapest', C_G3, r.steps);
}

const C_WIG = `
int up = 1, down = 1;
for (int i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = down + 1;
    else if (nums[i] < nums[i - 1]) down = up + 1;
}
return Math.max(up, down);`;
{
  const a = [1, 17, 5, 10, 13, 15, 10, 5, 16, 8], r = recorder(); let up = 1, down = 1;
  r.step(0, 'Track the longest wiggle ending with a rise (up) and with a fall (down).', [A('nums', a), A('up / down', [up, down])]);
  for (let i = 1; i < a.length; i++) { if (a[i] > a[i - 1]) up = down + 1; else if (a[i] < a[i - 1]) down = up + 1; r.step(ln(C_WIG, a[i] > a[i - 1] ? 'up = down + 1' : 'down = up + 1'), `${a[i - 1]} → ${a[i]} is a ${a[i] > a[i - 1] ? 'rise: up = down + 1' : 'fall: down = up + 1'}. up ${up}, down ${down}.`, [A('nums', a, { active: [i - 1, i] }), A('up / down', [up, down])]); }
  ANIM['Wiggle Subsequence'] = W('up / down', C_WIG, r.steps);
}

const C_MDA = `
int min = arrays.get(0).get(0), max = arrays.get(0).get(arrays.get(0).size() - 1), best = 0;
for (int i = 1; i < arrays.size(); i++) {
    int lo = a.get(0), hi = a.get(a.size() - 1);
    best = Math.max(best, Math.max(Math.abs(hi - min), Math.abs(max - lo)));
    min = Math.min(min, lo);
    max = Math.max(max, hi);
}`;
{
  const arrs = [[1, 2, 3], [4, 5], [1, 2, 3]], r = recorder(); let min = 1, max = 3, best = 0;
  r.step(0, 'Arrays [1,2,3], [4,5], [1,2,3]. Only each array\'s first and last element matter.', [A('min / max so far', [min, max]), A('best', [best])]);
  for (let i = 1; i < 3; i++) { const lo = arrs[i][0], hi = arrs[i][arrs[i].length - 1]; best = Math.max(best, Math.abs(hi - min), Math.abs(max - lo)); const m0 = min, M0 = max; min = Math.min(min, lo); max = Math.max(max, hi); r.step(ln(C_MDA, 'best = Math.max'), `Array ${i}: ends ${lo} and ${hi}. |${hi} − ${m0}| = ${Math.abs(hi - m0)}, |${M0} − ${lo}| = ${Math.abs(M0 - lo)}. Best ${best}.`, [A('min / max so far', [min, max]), A('best', [best], { done: [0] })]); }
  ANIM['Maximum Distance in Arrays'] = W('Carry min and max', C_MDA, r.steps);
}

const C_DOM = `
int r = rotations(tops, bottoms, tops[0]);
if (r != -1 || tops[0] == bottoms[0]) return r;
return rotations(tops, bottoms, bottoms[0]);
...
if (a[i] != v && b[i] != v) return -1;
if (a[i] != v) swapA++;
if (b[i] != v) swapB++;
return Math.min(swapA, swapB);`;
{
  const t = [2, 1, 2, 4, 2, 2], b = [5, 2, 6, 2, 3, 2], r = recorder(); let sa = 0, sb = 0;
  r.step(0, 'tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]. Candidate value: 2 (tops[0]).', [A('tops', t), A('bottoms', b)]);
  t.forEach((x, i) => { if (x !== 2) sa++; if (b[i] !== 2) sb++; r.step(ln(C_DOM, 'if (a[i] != v) swapA++'), `Domino ${i} (${x}|${b[i]}): ${x !== 2 && b[i] !== 2 ? 'no 2 at all → impossible' : 'contains a 2'}. Top wrong: ${sa}, bottom wrong: ${sb}.`, [A('tops', t, { active: [i] }), A('bottoms', b, { active: [i] }), A('swapA / swapB', [sa, sb])]); });
  r.step(ln(C_DOM, 'return Math.min'), `All dominoes contain a 2. Min(${sa}, ${sb}) = <b>${Math.min(sa, sb)}</b> rotations.`, [A('answer', [Math.min(sa, sb)], { done: [0] })]);
  ANIM['Minimum Domino Rotations For Equal Row'] = W('Two candidates', C_DOM, r.steps);
}

const C_REP = `
int limit = nums[n - 1];
for (int i = n - 2; i >= 0; i--) {
    if (nums[i] <= limit) { limit = nums[i]; continue; }
    int parts = (nums[i] + limit - 1) / limit;
    ops += parts - 1;
    limit = nums[i] / parts;
}`;
{
  const a = [3, 9, 3], r = recorder(); let limit = 3, ops = 0;
  r.step(0, 'nums = [3, 9, 3]. From the right: limit = 3 (the last element).', [A('nums', a), A('limit / ops', [limit, ops])]);
  r.step(ln(C_REP, 'int parts'), '9 > 3: split into ceil(9/3) = 3 parts (3, 3, 3): 2 operations.', [A('nums', a, { active: [1] }), A('parts', [3, 3, 3], { done: [0, 1, 2] })]); ops = 2; limit = 3;
  r.step(ln(C_REP, 'limit = nums[i] / parts'), 'New limit = 9 / 3 = 3. The first element 3 ≤ 3 is fine.', [A('nums', a, { active: [0] }), A('limit / ops', [limit, ops])]);
  r.step(ln(C_REP, 'continue'), `Total operations = <b>${ops}</b>.`, [A('answer', [ops], { done: [0] })]);
  ANIM['Minimum Replacements to Sort the Array'] = W('Right to left', C_REP, r.steps);
}

const C_BC = `
while (target > startValue) {
    target = target % 2 == 0 ? target / 2 : target + 1;
    ops++;
}
return ops + startValue - target;`;
{
  const r = recorder(); let target = 10, ops = 0; const start = 3;
  r.step(0, 'start = 3, target = 10. Work backwards from the target.', [A('target / ops', [target, ops])]);
  while (target > start) { const was = target; target = target % 2 === 0 ? target / 2 : target + 1; ops++; r.step(ln(C_BC, 'target = target % 2'), `${was} is ${was % 2 === 0 ? 'even → ' + was + ' / 2' : 'odd → ' + was + ' + 1'} = ${target}. ops ${ops}.`, [A('target / ops', [target, ops])]); }
  r.step(ln(C_BC, 'return ops'), `target ${target} ≤ start 3: add ${start - target} decrement(s). Answer = ${ops} + ${start - target} = <b>${ops + start - target}</b>.`, [A('answer', [ops + start - target], { done: [0] })]);
  ANIM['Broken Calculator'] = W('Reverse process', C_BC, r.steps);
}

const C_OP1 = `
if (ones > 0) return n - ones;
if (g != 1) return -1;
for (int i = 0; i < n; i++) {
    int cur = 0;
    for (int j = i; j < n; j++) {
        cur = gcd(cur, nums[j]);
        if (cur == 1) { shortest = Math.min(shortest, j - i + 1); break; }
    }
}
return (shortest - 1) + (n - 1);`;
{
  const r = recorder();
  r.step(0, 'nums = [2, 6, 3, 4]. No 1 exists and the overall gcd is 1, so it is possible.', [A('nums', [2, 6, 3, 4])]);
  r.step(ln(C_OP1, 'cur = gcd'), 'Shortest window with gcd 1: [2, 6] → 2, [6, 3] → 3, [3, 4] → 1. So the shortest window has length 2 (3 and 4).', [A('nums', [2, 6, 3, 4], { active: [2, 3] }), A('shortest', [2])]);
  r.step(ln(C_OP1, 'return (shortest - 1)'), 'Create a 1 with shortest − 1 = 1 operation, then spread it to the other n − 1 = 3 elements: 1 + 3 = <b>4</b>.', [A('nums', [2, 6, 1, 4], { done: [2] }), A('answer', [4], { done: [0] })]);
  ANIM['Minimum Number of Operations to Make All Array Elements Equal to 1'] = W('Shortest gcd-1 window', C_OP1, r.steps);
}

const C_GS = `
int n = nums.length, i = k, j = k, min = nums[k], best = min;
while (i > 0 || j < n - 1) {
    if (i == 0) j++;
    else if (j == n - 1) i--;
    else if (nums[i - 1] > nums[j + 1]) i--;
    else j++;
    min = Math.min(min, Math.min(nums[i], nums[j]));
    best = Math.max(best, min * (j - i + 1));
}`;
{
  const a = [1, 4, 3, 7, 4, 5], k = 3, r = recorder(); let i = 3, j = 3, mn = a[3], best = mn;
  r.step(0, 'nums = [1,4,3,7,4,5], k = 3. Start with the window [3, 3].', [A('nums', a, { active: [3] }), A('min / best', [mn, best])]);
  while (i > 0 || j < a.length - 1) { if (i === 0) j++; else if (j === a.length - 1) i--; else if (a[i - 1] > a[j + 1]) i--; else j++; mn = Math.min(mn, a[i], a[j]); best = Math.max(best, mn * (j - i + 1)); r.step(ln(C_GS, 'best = Math.max'), `Window [${i}, ${j}]: min ${mn} × length ${j - i + 1} = ${mn * (j - i + 1)}. Best ${best}.`, [A('nums', a, { warn: idx(a.length).filter(x => x >= i && x <= j) }), A('min / best', [mn, best])]); }
  ANIM['Maximum Score of a Good Subarray'] = W('Expand to the larger side', C_GS, r.steps);
}

const C_CP = `
for (int end = 1; end <= n; end++) {
    for (int u : conflicts.get(end)) {
        if (u >= max1) { max2 = max1; max1 = u; }
        else if (u > max2) max2 = u;
    }
    valid += end - max1;
    extra[max1] += max1 - max2;
}
return valid + bestExtra;`;
{
  const pairs = [[2, 3], [1, 4]], n = 4, conflicts = Array.from({ length: 5 }, () => []); pairs.forEach(([a, b]) => conflicts[Math.max(a, b)].push(Math.min(a, b)));
  const r = recorder(); let max1 = 0, max2 = 0, valid = 0; const extra = Array(5).fill(0);
  r.step(0, 'n = 4, pairs (2,3) and (1,4). For every right end find the nearest conflicting left point.', [A('pair (left, right)', ['(2,3)', '(1,4)'])]);
  for (let end = 1; end <= n; end++) { conflicts[end].forEach(u => { if (u >= max1) { max2 = max1; max1 = u; } else if (u > max2) max2 = u; }); valid += end - max1; extra[max1] += max1 - max2; r.step(ln(C_CP, 'valid += end - max1'), `end = ${end}: max1 = ${max1}, max2 = ${max2}. Valid subarrays ending here: ${end - max1}. Total ${valid}. Gain if the pair at ${max1} is removed: ${max1 - max2}.`, [A('extra[max1]', extra, { active: [max1] }), A('valid', [valid], { done: [0] })]); }
  r.step(ln(C_CP, 'return valid'), `Best gain = ${Math.max(...extra)} → answer ${valid} + ${Math.max(...extra)} = <b>${valid + Math.max(...extra)}</b>.`, [A('answer', [valid + Math.max(...extra)], { done: [0] })]);
  ANIM['Maximize Subarrays After Removing One Conflicting Pair'] = W('Sweep the right end', C_CP, r.steps);
}

const C_MB = `
long need = -(long) balance[bad], moves = 0;
for (int d = 1; need > 0; d++) {
    int right = (bad + d) % n, left = ((bad - d) % n + n) % n;
    long available = (long) balance[right] + (left == right ? 0 : balance[left]);
    long taken = Math.min(need, available);
    moves += taken * d;
    need -= taken;
}`;
{
  const b = [5, 1, -4], r = recorder();
  r.step(0, 'balance = [5, 1, −4] on a ring. Person 2 is in debt by 4.', [A('balance', b, { bad: [2] })]);
  r.step(ln(C_MB, 'long available'), 'Distance 1: neighbours are person 0 (5) and person 1 (1) → 6 units available.', [A('balance', b, { bad: [2], active: [0, 1] }), A('need / moves', [4, 0])]);
  r.step(ln(C_MB, 'moves += taken * d'), 'Take min(4, 6) = 4 units at distance 1: 4 moves. Debt covered.', [A('balance', b, { done: [2], active: [0, 1] }), A('moves', [4], { done: [0] })]);
  ANIM['Minimum Moves to Balance Circular Array'] = W('Nearest donors first', C_MB, r.steps);
}

const C_TEACH = `
for (int[] f : friendships) {
    ...
    if (!canTalk) { sad.add(u); sad.add(v); }
}
for (int u : sad) for (int l : languages[u]) most = Math.max(most, ++count[l]);
return sad.size() - most;`;
{
  const r = recorder(), langs = [[1], [2], [1, 2]];
  r.step(0, 'n = 2 languages. Users: 1 knows {1}, 2 knows {2}, 3 knows {1,2}. Friendships: (1,2), (1,3), (2,3).', [A('user languages', langs.map(l => '{' + l + '}'))]);
  r.step(ln(C_TEACH, 'if (!canTalk)'), '(1,2) share no language → users 1 and 2 are sad. (1,3) share 1, (2,3) share 2: fine.', [A('user languages', langs.map(l => '{' + l + '}'), { bad: [0, 1], done: [2] })]);
  r.step(ln(C_TEACH, 'most = Math.max'), 'Among sad users, language 1 is known by one and language 2 by one → most = 1.', [A('language known by sad users', [1, 1])]);
  r.step(ln(C_TEACH, 'return sad.size()'), 'Teach the chosen language to the other sad user: 2 − 1 = <b>1</b>.', [A('answer', [1], { done: [0] })]);
  ANIM['Minimum Number of People to Teach'] = W('Most known language', C_TEACH, r.steps);
}

const C_PATCH = `
long miss = 1;
int patches = 0, i = 0;
while (miss <= n) {
    if (i < nums.length && nums[i] <= miss) miss += nums[i++];
    else { miss += miss; patches++; }
}`;
{
  const nums = [1, 5, 10], n = 20, r = recorder(); let miss = 1, patches = 0, i = 0;
  r.step(0, 'nums = [1, 5, 10], n = 20. miss = the smallest sum we cannot form yet.', [A('nums', nums), A('miss / patches', [miss, patches])]);
  while (miss <= n) { if (i < nums.length && nums[i] <= miss) { miss += nums[i]; r.step(ln(C_PATCH, 'miss += nums[i++]'), `${nums[i]} ≤ miss: use it, range now covers 1..${miss - 1}.`, [A('nums', nums, { done: idx(i + 1), active: [i] }), A('miss / patches', [miss, patches])]); i++; } else { r.step(ln(C_PATCH, 'else { miss += miss'), `nums[${i}] = ${nums[i] ?? '∞'} > ${miss}: patch with ${miss}, the range doubles to 1..${2 * miss - 1}.`, [A('nums', nums, { done: idx(i) }), A('miss / patches', [2 * miss, patches + 1])]); miss += miss; patches++; } }
  r.step(ln(C_PATCH, 'while (miss <= n)'), `miss ${miss} > 20: done with <b>${patches}</b> patches (2 and 4).`, [A('patches', [patches], { done: [0] })]);
  ANIM['Patching Array'] = W('Smallest missing sum', C_PATCH, r.steps);
}

const C_SG = `
if ((lq + rq) % 2 == 1) return true;
return 2 * ls + 9 * lq != 2 * rs + 9 * rq;`;
{
  const r = recorder();
  r.step(0, 'num = "25??": left half "25" (sum 7, no ?), right half "??" (sum 0, two ?). Two ? is even.', [A('left sum / left ?', [7, 0]), A('right sum / right ?', [0, 2])]);
  r.step(ln(C_SG, 'return 2 * ls'), 'Compare 2·7 + 9·0 = 14 with 2·0 + 9·2 = 18 → different → Alice wins.', [A('left value', [14]), A('right value', [18], { bad: [0] })]);
  r.step(ln(C_SG, 'if ((lq + rq)'), 'With an odd number of ? Alice wins immediately; equal values (e.g. "5023") mean Bob can always restore balance.', [A('odd ? count', ['Alice'], { done: [0] })]);
  ANIM['Sum Game'] = W('Parity and offsets', C_SG, r.steps);
}

const C_TSV = `
int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;
for (int x : nums) { max = Math.max(max, x); min = Math.min(min, x); }
return (long) (max - min) * k;`;
{
  const a = [4, 2, 5, 1], r = recorder();
  r.step(0, 'nums = [4, 2, 5, 1], k = 3. The whole array has the largest max − min.', [A('nums', a)]);
  r.step(ln(C_TSV, 'for (int x'), 'max = 5, min = 1 → value 4.', [A('nums', a, { active: [2, 3] }), A('max − min', [4])]);
  r.step(ln(C_TSV, 'return (long)'), 'Choose it k = 3 times: 4 × 3 = <b>12</b>.', [A('answer', [12], { done: [0] })]);
  ANIM['Maximum Total Subarray Value I'] = W('Whole array × k', C_TSV, r.steps);
}

const C_OT = `
for (int x : nums) {
    best = Math.max(best, maxDiff * x);
    maxDiff = Math.max(maxDiff, maxPrefix - x);
    maxPrefix = Math.max(maxPrefix, x);
}`;
{
  const a = [12, 6, 1, 2, 7], r = recorder(); let best = 0, md = 0, mp = 0;
  r.step(0, 'nums = [12, 6, 1, 2, 7]. Track best prefix maximum and best (nums[i] − nums[j]).', [A('nums', a), A('best / maxDiff / maxPrefix', [best, md, mp])]);
  a.forEach((x, i) => { best = Math.max(best, md * x); md = Math.max(md, mp - x); mp = Math.max(mp, x); r.step(ln(C_OT, 'maxDiff = Math.max'), `x = ${x}: best ${best}, maxDiff ${md}, maxPrefix ${mp}.`, [A('nums', a, { active: [i], done: idx(i) }), A('best / maxDiff / maxPrefix', [best, md, mp])]); });
  ANIM['Maximum Value of an Ordered Triplet I'] = W('Single pass', C_OT, r.steps);
}
