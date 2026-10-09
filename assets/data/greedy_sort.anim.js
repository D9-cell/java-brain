const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);

const C_TOK = `
Arrays.sort(tokens);
int lo = 0, hi = tokens.length - 1, score = 0, best = 0;
while (lo <= hi) {
    if (power >= tokens[lo]) { power -= tokens[lo++]; best = Math.max(best, ++score); }
    else if (score > 0) { power += tokens[hi--]; score--; }
    else break;
}`;
{
  const t = [100, 200, 300, 400], r = recorder(); let lo = 0, hi = 3, power = 200, score = 0, best = 0;
  const snap = (say, line, extra = {}) => r.step(line, say, [A('tokens (sorted)', t, { done: idx(t.length).filter(i => i < lo), bad: idx(t.length).filter(i => i > hi), active: extra.active || [] }), A('power / score / best', [power, score, best])]);
  snap('power = 200. Sorted tokens; lo = cheapest, hi = dearest.', 0);
  while (lo <= hi) {
    if (power >= t[lo]) { power -= t[lo]; lo++; score++; best = Math.max(best, score); snap(`Face up the cheapest (${t[lo - 1]}): power ${power}, score ${score}.`, ln(C_TOK, 'power -= tokens[lo++]'), { active: [lo - 1] }); }
    else if (score > 0) { power += t[hi]; hi--; score--; snap(`Cannot afford ${t[lo]}. Sell score for the dearest token (${t[hi + 1]}): power ${power}, score ${score}.`, ln(C_TOK, 'power += tokens[hi--]'), { active: [hi + 1] }); }
    else break;
  }
  snap(`Done. Best score = <b>${best}</b>.`, ln(C_TOK, 'else break'));
  ANIM['Bag of Tokens'] = W('Two pointers', C_TOK, r.steps);
}

const C_BOAT = `
Arrays.sort(people);
int boats = 0;
for (int lo = 0, hi = people.length - 1; lo <= hi; hi--) {
    if (people[lo] + people[hi] <= limit) lo++;
    boats++;
}`;
{
  const p = [1, 2, 2, 3], limit = 3, r = recorder(); let lo = 0, hi = 3, boats = 0;
  r.step(0, 'limit = 3, at most two people per boat. Sorted weights.', [A('people', p), A('boats', [0])]);
  while (lo <= hi) { const fit = p[lo] + p[hi] <= limit; const pair = fit && lo !== hi; if (fit) lo++; boats++; const h = hi; hi--;
    r.step(ln(C_BOAT, 'boats++'), fit && pair ? `Heaviest ${p[h]} + lightest ${p[lo - 1]} = ${p[h] + p[lo - 1]} ≤ ${limit}: share a boat.` : `Heaviest ${p[h]} cannot share with ${p[lo]} (${p[h] + p[lo]} > ${limit}): goes alone.`, [A('people', p, { active: [h, ...(fit && pair ? [lo - 1] : [])], done: idx(p.length).filter(i => i < lo || i > h) }), A('boats', [boats], { done: [0] })]); }
  r.step(ln(C_BOAT, 'for (int lo'), `Boats used: <b>${boats}</b>.`, [A('people', p, { done: idx(4) }), A('boats', [boats], { done: [0] })]);
  ANIM['Boats to Save People'] = W('Heaviest with lightest', C_BOAT, r.steps);
}

const C_AST = `
Arrays.sort(asteroids);
long m = mass;
for (int a : asteroids) {
    if (m < a) return false;
    m += a;
}
return true;`;
{
  const a = [3, 5, 9, 19, 21], r = recorder(); let m = 10;
  r.step(0, 'Planet mass 10. Sorted asteroids: eat the smallest first.', [A('asteroids', a), A('mass', [m])]);
  a.forEach((x, i) => { const ok = m >= x; if (ok) m += x; r.step(ln(C_AST, 'if (m < a)'), ok ? `${m - x} ≥ ${x}: absorb it, mass ${m}.` : `Mass ${m} < ${x}: fail.`, [A('asteroids', a, { done: idx(i), active: [i] }), A('mass', [m], { done: [0] })]); });
  r.step(ln(C_AST, 'return true'), 'All absorbed → <b>true</b>.', [A('asteroids', a, { done: idx(5) }), A('mass', [m], { done: [0] })]);
  ANIM['Destroying Asteroids'] = W('Smallest first', C_AST, r.steps);
}

const C_COIN = `
Arrays.sort(piles);
int n = piles.length / 3, sum = 0;
for (int i = n; i < piles.length; i += 2) sum += piles[i];`;
{
  const p = [1, 2, 2, 4, 7, 8], r = recorder(); let sum = 0;
  r.step(0, 'Sorted piles. Bob gets the smallest third (2 piles).', [A('piles', p, { bad: [0, 1] })]);
  [[2, 'Pair (2, 4... ) — from index 2 step by 2: take 2'], [4, 'take 7']].forEach(([i]) => { sum += p[i]; r.step(ln(C_COIN, 'sum += piles[i]'), `Index ${i}: you take ${p[i]} (Alice takes ${p[i + 1]}). Total ${sum}.`, [A('piles', p, { bad: [0, 1], active: [i], warn: [i + 1] }), A('your coins', [sum], { done: [0] })]); });
  r.step(ln(C_COIN, 'for (int i = n'), `You collect <b>${sum}</b>.`, [A('piles', p, { bad: [0, 1], done: [2, 4] }), A('your coins', [sum], { done: [0] })]);
  ANIM['Maximum Number of Coins You Can Get'] = W('Skip the smallest third', C_COIN, r.steps);
}

const C_TC = `
Arrays.sort(costs, (x, y) -> (x[0] - x[1]) - (y[0] - y[1]));
int n = costs.length / 2, total = 0;
for (int i = 0; i < n; i++) total += costs[i][0] + costs[i + n][1];`;
{
  const c = [[10, 20], [30, 200], [400, 50], [30, 20]], r = recorder();
  r.step(0, 'Each person: [costA, costB]. Sort by costA − costB.', [A('people', c.map(x => `${x[0]}|${x[1]}`))]);
  const s = [...c].sort((x, y) => (x[0] - x[1]) - (y[0] - y[1]));
  r.step(ln(C_TC, 'Arrays.sort'), `Differences: ${s.map(x => x[0] - x[1]).join(', ')}. Sorted: ${s.map(x => `${x[0]}|${x[1]}`).join('  ')}.`, [A('sorted', s.map(x => `${x[0]}|${x[1]}`), { ptr: { 0: 'A', 1: 'A', 2: 'B', 3: 'B' } })]);
  let total = 0; for (let i = 0; i < 2; i++) { total += s[i][0] + s[i + 2][1]; r.step(ln(C_TC, 'total +='), `Person ${i} → A (${s[i][0]}), person ${i + 2} → B (${s[i + 2][1]}). Total ${total}.`, [A('sorted', s.map(x => `${x[0]}|${x[1]}`), { active: [i, i + 2] }), A('total', [total], { done: [0] })]); }
  ANIM['Two City Scheduling'] = W('Sort by difference', C_TC, r.steps);
}

const C_PB = `
int[] cap = warehouse.clone();
for (int i = 1; i < cap.length; i++) cap[i] = Math.min(cap[i], cap[i - 1]);
Arrays.sort(boxes);
for (int room = cap.length - 1; room >= 0 && b < boxes.length; room--) if (boxes[b] <= cap[room]) { placed++; b++; }`;
{
  const wh = [5, 3, 3, 4, 1], boxes = [1, 3, 4, 4], cap = []; wh.forEach((x, i) => cap.push(i ? Math.min(x, cap[i - 1]) : x));
  const r = recorder(); let b = 0, placed = 0;
  r.step(0, 'Warehouse rooms [5, 3, 3, 4, 1]; boxes [1, 3, 4, 4].', [A('warehouse', wh), A('boxes (sorted)', boxes)]);
  r.step(ln(C_PB, 'cap[i] = Math.min'), 'A box cannot pass a lower room, so every room is capped by the minimum before it.', [A('warehouse', wh), A('effective cap', cap, { done: idx(5) })]);
  for (let room = 4; room >= 0 && b < boxes.length; room--) { const ok = boxes[b] <= cap[room]; if (ok) { placed++; b++; } r.step(ln(C_PB, 'if (boxes[b]'), ok ? `Room ${room} (cap ${cap[room]}) takes box ${boxes[b - 1]}.` : `Room ${room} (cap ${cap[room]}) is too low for box ${boxes[b]}: skip.`, [A('effective cap', cap, { active: [room] }), A('boxes', boxes, { done: idx(b) }), A('placed', [placed], { done: [0] })]); }
  r.step(ln(C_PB, 'room >= 0'), `Placed <b>${placed}</b> boxes.`, [A('effective cap', cap), A('boxes', boxes, { done: idx(b) }), A('placed', [placed], { done: [0] })]);
  ANIM['Put Boxes Into the Warehouse I'] = W('Prefix minimum', C_PB, r.steps);
}

const C_ROCK = `
for (int i = 0; i < n; i++) need[i] = capacity[i] - rocks[i];
Arrays.sort(need);
for (int x : need) {
    if (additionalRocks < x) break;
    additionalRocks -= x;
    full++;
}`;
{
  const need = [0, 1, 1, 8], r = recorder(); let rocks = 2, full = 0;
  r.step(0, 'Free space per bag (sorted): [0, 1, 1, 8]. 2 additional rocks.', [A('free space', need), A('rocks left / full', [rocks, full])]);
  need.forEach((x, i) => { if (rocks < x) { r.step(ln(C_ROCK, 'if (additionalRocks'), `${x} > ${rocks} rocks left: stop.`, [A('free space', need, { bad: [i], done: idx(i) }), A('rocks left / full', [rocks, full])]); return; } if (full === i) { rocks -= x; full++; r.step(ln(C_ROCK, 'full++'), `Fill bag ${i} (needs ${x}). Rocks left ${rocks}, full ${full}.`, [A('free space', need, { active: [i], done: idx(i) }), A('rocks left / full', [rocks, full])]); } });
  ANIM['Maximum Bags With Full Capacity of Rocks'] = W('Fill the emptiest first', C_ROCK, r.steps);
}

const C_ICE = `
Arrays.sort(costs);
int bars = 0;
for (int c : costs) {
    if (coins < c) break;
    coins -= c;
    bars++;
}`;
{
  const c = [1, 1, 2, 3, 4], r = recorder(); let coins = 7, bars = 0;
  r.step(0, '7 coins, sorted prices.', [A('prices', c), A('coins / bars', [coins, bars])]);
  c.forEach((x, i) => { if (coins < x) { r.step(ln(C_ICE, 'if (coins < c)'), `${x} > ${coins}: stop.`, [A('prices', c, { bad: [i], done: idx(i) }), A('coins / bars', [coins, bars])]); return; } if (bars === i) { coins -= x; bars++; r.step(ln(C_ICE, 'bars++'), `Buy price ${x}. Coins ${coins}, bars ${bars}.`, [A('prices', c, { active: [i], done: idx(i) }), A('coins / bars', [coins, bars])]); } });
  ANIM['Maximum Ice Cream Bars'] = W('Cheapest first', C_ICE, r.steps);
}

const C_INT = `
for (int x = 1; x <= n; x++) {
    if (ban.contains(x)) continue;
    if (sum + x > maxSum) break;
    sum += x;
    count++;
}`;
{
  const r = recorder(), banned = new Set([1, 6, 5]); let sum = 0, count = 0; const taken = [];
  r.step(0, 'n = 5, banned {1, 6, 5}, maxSum = 6. Walk upward.', [A('numbers', [1, 2, 3, 4, 5], { bad: [0, 4] })]);
  for (let x = 1; x <= 5; x++) { if (banned.has(x)) { r.step(ln(C_INT, 'ban.contains'), `${x} is banned: skip.`, [A('numbers', [1, 2, 3, 4, 5], { bad: [0, 4], active: [x - 1] })]); continue; } if (sum + x > 6) { r.step(ln(C_INT, 'break'), `${sum} + ${x} = ${sum + x} > 6: stop.`, [A('numbers', [1, 2, 3, 4, 5], { bad: [0, 4], done: taken.map(t => t - 1), active: [x - 1] })]); break; } sum += x; count++; taken.push(x); r.step(ln(C_INT, 'count++'), `Take ${x}. Sum ${sum}, count ${count}.`, [A('numbers', [1, 2, 3, 4, 5], { bad: [0, 4], done: taken.map(t => t - 1) })]); }
  ANIM['Maximum Number of Integers to Choose From a Range I'] = W('Walk 1..n', C_INT, r.steps);
}

const C_HAP = `
Arrays.sort(happiness);
long sum = 0;
for (int i = 0; i < k; i++) sum += Math.max(0, happiness[happiness.length - 1 - i] - i);`;
{
  const h = [1, 1, 2, 4, 5], r = recorder(); let sum = 0;
  r.step(0, 'k = 3. Sorted happiness; pick from the right. The i-th pick has lost i happiness.', [A('happiness', h)]);
  for (let i = 0; i < 3; i++) { const v = h[h.length - 1 - i], gain = Math.max(0, v - i); sum += gain; r.step(ln(C_HAP, 'sum +='), `Pick ${v}: it lost ${i}, adds max(0, ${v} − ${i}) = ${gain}. Sum ${sum}.`, [A('happiness', h, { active: [h.length - 1 - i], done: idx(h.length).filter(j => j > h.length - 1 - i) }), A('sum', [sum], { done: [0] })]); }
  ANIM['Maximize Happiness of Selected Children'] = W('Happiest first', C_HAP, r.steps);
}

const C_ME = `
Arrays.sort(arr);
int cur = 0;
for (int x : arr) cur = Math.min(cur + 1, x);`;
{
  const a = [1, 1, 3, 100], r = recorder(); let cur = 0;
  r.step(0, 'Sorted [1, 1, 3, 100]. Build a staircase from 1.', [A('arr', a), A('cur', [cur])]);
  a.forEach((x, i) => { cur = Math.min(cur + 1, x); r.step(ln(C_ME, 'cur = Math.min'), `min(cur+1, ${x}) → <b>${cur}</b>.`, [A('arr', a, { active: [i], done: idx(i) }), A('cur', [cur], { done: [0] })]); });
  ANIM['Maximum Element After Decreasing and Rearranging'] = W('Staircase', C_ME, r.steps);
}

const C_LU = `
Map<Integer, Integer> freq = new HashMap<>();
for (int x : arr) freq.merge(x, 1, Integer::sum);
List<Integer> counts = new ArrayList<>(freq.values());
Collections.sort(counts);
int unique = counts.size();
for (int c : counts) {
    if (k < c) break;
    k -= c;
    unique--;
}`;
{
  const arr = [4, 3, 1, 1, 3, 3, 2], counts = [1, 1, 2, 3], r = recorder(); let k = 3, unique = 4;
  r.step(0, 'Frequencies of 4, 2, 1, 3 are 1, 1, 2, 3. k = 3 removals.', [A('sorted counts', counts), A('k / unique', [k, unique])]);
  counts.forEach((c, i) => { if (k < c) { r.step(ln(C_LU, 'if (k < c)'), `k = ${k} < ${c}: cannot erase this value completely. Stop.`, [A('sorted counts', counts, { bad: [i], done: idx(i) }), A('k / unique', [k, unique])]); return; } if (unique === 4 - i) { k -= c; unique--; r.step(ln(C_LU, 'unique--'), `Erase a value with count ${c}: k = ${k}, unique = ${unique}.`, [A('sorted counts', counts, { active: [i], done: idx(i) }), A('k / unique', [k, unique])]); } });
  ANIM['Least Number of Unique Integers after K Removals'] = W('Erase the rarest', C_LU, r.steps);
}

const C_FK = `
Arrays.sort(idx, (a, b) -> Double.compare((double) values[b] / weights[b], (double) values[a] / weights[a]));
for (int i : idx) {
    int take = Math.min(weights[i], capacity);
    total += (double) values[i] * take / weights[i];
    capacity -= take;
}`;
{
  const v = [60, 100, 120], w = [10, 20, 30], order = [0, 1, 2], r = recorder(); let cap = 50, total = 0;
  r.step(0, 'Values 60, 100, 120 with weights 10, 20, 30; capacity 50. Ratios 6, 5, 4.', [A('value/weight', v.map((x, i) => (x / w[i]).toFixed(1)))]);
  order.forEach(i => { const take = Math.min(w[i], cap); total += v[i] * take / w[i]; cap -= take; r.step(ln(C_FK, 'total +='), take === w[i] ? `Take all of item ${i} (weight ${w[i]}): total ${total}, capacity left ${cap}.` : `Only ${take} of ${w[i]} fits: take the fraction ${take}/${w[i]} → +${(v[i] * take / w[i]).toFixed(1)}. Total ${total}.`, [A('value/weight', v.map((x, j) => (x / w[j]).toFixed(1)), { active: [i], done: idx(i) }), A('total / capacity left', [total, cap])]); });
  ANIM['Fractional Knapsack'] = W('Best ratio first', C_FK, r.steps);
}

const C_MP = `
Arrays.sort(eng, (a, b) -> b[1] - a[1]);
for (int[] e : eng) {
    speeds.add(e[0]);
    sum += e[0];
    if (speeds.size() > k) sum -= speeds.poll();
    best = Math.max(best, sum * e[1]);
}`;
{
  const eng = [[1, 9], [2, 5], [5, 7], [10, 4], [3, 3], [8, 2]].sort((a, b) => b[1] - a[1]), k = 2, r = recorder(), heap = []; let sum = 0, best = 0;
  r.step(0, 'k = 2. Engineers (speed|efficiency) sorted by efficiency descending: ' + eng.map(e => e.join('|')).join('  '), [A('engineers', eng.map(e => e.join('|')))]);
  eng.forEach((e, i) => { heap.push(e[0]); sum += e[0]; heap.sort((a, b) => a - b); if (heap.length > k) sum -= heap.shift(); best = Math.max(best, sum * e[1]);
    r.step(ln(C_MP, 'best = Math.max'), `Add speed ${e[0]}; keep the ${k} fastest: [${heap.join(', ')}] sum ${sum}. Min efficiency now ${e[1]} → ${sum * e[1]}. Best ${best}.`, [A('engineers', eng.map(x => x.join('|')), { active: [i], done: idx(i) }), A('heap of speeds', heap), A('best', [best], { done: [0] })]); });
  ANIM['Maximum Performance of a Team'] = W('Efficiency sweep + heap', C_MP, r.steps);
}

const C_POLY = `
Arrays.sort(nums);
long prefix = 0, best = -1;
for (int x : nums) {
    if (prefix > x) best = prefix + x;
    prefix += x;
}`;
{
  const a = [1, 1, 2, 3, 5, 12, 50], r = recorder(); let prefix = 0, best = -1;
  r.step(0, 'Sorted sides. A side x can be the longest if the sum of all smaller sides exceeds x.', [A('sides', a)]);
  a.forEach((x, i) => { const ok = prefix > x; if (ok) best = prefix + x; prefix += x; r.step(ln(C_POLY, 'if (prefix > x)'), `Before adding ${x}: prefix ${prefix - x} ${ok ? '>' : '≤'} ${x} → ${ok ? 'valid, perimeter ' + best : 'not a valid longest side'}.`, [A('sides', a, { active: [i], done: idx(i) }), A('prefix / best', [prefix, best])]); });
  ANIM['Find Polygon With the Largest Perimeter'] = W('Prefix check', C_POLY, r.steps);
}

const C_DE = `
Arrays.sort(nums);
long prev = Long.MIN_VALUE;
int count = 0;
for (int x : nums) {
    long pick = Math.max(prev + 1, (long) x - k);
    if (pick <= (long) x + k) { prev = pick; count++; }
}`;
{
  const a = [1, 2, 2, 3, 3, 4], k = 2, r = recorder(); let prev = -Infinity, count = 0; const chosen = [];
  r.step(0, 'k = 2. Each x may become any value in [x−2, x+2]. Give each the lowest free value above the previous.', [A('sorted', a)]);
  a.forEach((x, i) => { const pick = Math.max(prev + 1, x - k); if (pick <= x + k) { prev = pick; count++; chosen.push(pick); } r.step(ln(C_DE, 'long pick'), `x = ${x}: window [${x - k}, ${x + k}], pick ${pick}. Distinct so far ${count}.`, [A('sorted', a, { active: [i], done: idx(i) }), A('assigned', chosen)]); });
  ANIM['Maximum Number of Distinct Elements After Operations'] = W('Lowest free value', C_DE, r.steps);
}

const C_MES = `
for (int x : nums1) { s1 += Math.max(x, 1); z1 |= x == 0; }
for (int x : nums2) { s2 += Math.max(x, 1); z2 |= x == 0; }
if (s1 == s2) return s1;
if (s1 < s2) return z1 ? s2 : -1;
return z2 ? s1 : -1;`;
{
  const r = recorder();
  r.step(0, 'nums1 = [3, 2, 0, 1, 0], nums2 = [6, 5, 0].', [A('nums1', [3, 2, 0, 1, 0], { warn: [2, 4] }), A('nums2', [6, 5, 0], { warn: [2] })]);
  r.step(ln(C_MES, 'for (int x : nums1)'), 'Treat every zero as 1 to get the smallest sums: s1 = 3+2+1+1+1 = 8, s2 = 6+5+1 = 12.', [A('s1, s2 (zeros as 1)', [8, 12])]);
  r.step(ln(C_MES, 'if (s1 < s2)'), 's1 < s2, and nums1 has zeros, so it can grow to 12. Answer <b>12</b>.', [A('answer', [12], { done: [0] })]);
  r.step(ln(C_MES, 'return z2'), 'Counter-example: [2,0,2,0] vs [1,4]: s1 = 6 > s2 = 5 and nums2 has no zero → <b>−1</b>.', [A('s1, s2', [6, 5]), A('answer', [-1], { bad: [0] })]);
  ANIM['Minimum Equal Sum of Two Arrays After Replacing Zeros'] = W('Minimum sums', C_MES, r.steps);
}

const C_RF = `
for (Map.Entry<Integer, Integer> e : diff.entrySet()) {
    if (e.getValue() % 2 != 0) return -1;
    for (int i = 0; i < Math.abs(e.getValue()) / 2; i++) extra.add(e.getKey());
}
Collections.sort(extra);
for (int i = 0; i < extra.size() / 2; i++) cost += Math.min(extra.get(i), 2L * min);`;
{
  const r = recorder();
  r.step(0, 'basket1 = [4, 2, 2, 2], basket2 = [1, 4, 1, 2]. Global minimum fruit cost = 1.', [A('basket1', [4, 2, 2, 2]), A('basket2', [1, 4, 1, 2])]);
  r.step(ln(C_RF, 'e.getValue() % 2'), 'Difference (basket1 − basket2) per fruit: 1 → −2, 2 → +2, 4 → 0. All even → possible.', [A('fruit', [1, 2, 4]), A('difference', [-2, 2, 0])]);
  r.step(ln(C_RF, 'extra.add'), 'Half of each surplus: fruit 1 once, fruit 2 once → extra = [1, 2].', [A('extra (sorted)', [1, 2])]);
  r.step(ln(C_RF, 'cost +='), 'Fix the smaller half (1 item): cost min(1, 2·1) = <b>1</b> — swap fruit 2 from basket1 with fruit 1 from basket2.', [A('extra (sorted)', [1, 2], { active: [0] }), A('cost', [1], { done: [0] })]);
  ANIM['Rearranging Fruits'] = W('Surplus and cheap swaps', C_RF, r.steps);
}

const C_MSV = `
for (int x : nums) {
    int y = x ^ k;
    if (y > x) { sum += y; toggled++; } else sum += x;
    minLoss = Math.min(minLoss, Math.abs(x - y));
}
return toggled % 2 == 0 ? sum : sum - minLoss;`;
{
  const nums = [1, 2, 1], k = 3, r = recorder(); let sum = 0, tog = 0, minLoss = Infinity;
  r.step(0, 'k = 3. Any even number of nodes can be XORed with k, whatever the tree looks like.', [A('nums', nums)]);
  nums.forEach((x, i) => { const y = x ^ k; if (y > x) { sum += y; tog++; } else sum += x; minLoss = Math.min(minLoss, Math.abs(x - y)); r.step(ln(C_MSV, 'int y'), `${x} ^ ${k} = ${y} → ${y > x ? 'gain, take ' + y : 'no gain, keep ' + x}. Sum ${sum}, toggled ${tog}, cheapest undo ${minLoss}.`, [A('nums', nums, { active: [i], done: idx(i) }), A('sum / toggled / minLoss', [sum, tog, minLoss])]); });
  r.step(ln(C_MSV, 'return toggled'), `Toggled ${tog} (odd) → subtract the cheapest loss ${minLoss}: <b>${sum - minLoss}</b>.`, [A('answer', [sum - minLoss], { done: [0] })]);
  ANIM['Find the Maximum Sum of Node Values'] = W('Gains and parity', C_MSV, r.steps);
}

const C_CAKE = `
Arrays.sort(h);
Arrays.sort(v);
while (i >= 0 || j >= 0) {
    if (j < 0 || (i >= 0 && h[i] >= v[j])) { cost += h[i--] * vPieces; hPieces++; }
    else { cost += v[j--] * hPieces; vPieces++; }
}`;
{
  const h = [1, 3], v = [5], r = recorder(); let i = 1, j = 0, hp = 1, vp = 1, cost = 0;
  r.step(0, '3×2 cake: horizontal cuts [1, 3], vertical cut [5]. Take the most expensive cut first.', [A('horizontal (sorted)', h), A('vertical (sorted)', v), A('pieces h / v', [hp, vp])]);
  while (i >= 0 || j >= 0) { if (j < 0 || (i >= 0 && h[i] >= v[j])) { const c = h[i] * vp; cost += c; r.step(ln(C_CAKE, 'cost += h[i--]'), `Horizontal cut ${h[i]} crosses ${vp} vertical piece(s): +${c}. Total ${cost}.`, [A('horizontal (sorted)', h, { active: [i] }), A('vertical (sorted)', v), A('total', [cost], { done: [0] })]); i--; hp++; }
    else { const c = v[j] * hp; cost += c; r.step(ln(C_CAKE, 'cost += v[j--]'), `Vertical cut ${v[j]} crosses ${hp} horizontal piece(s): +${c}. Total ${cost}.`, [A('horizontal (sorted)', h), A('vertical (sorted)', v, { active: [j] }), A('total', [cost], { done: [0] })]); j--; vp++; } }
  ANIM['Minimum Cost for Cutting Cake I - II'] = W('Dearest cut first', C_CAKE, r.steps);
}

const C_RND = `
for (int f : freq.values()) {
    if (f == 1) return -1;
    rounds += (f + 2) / 3;
}`;
function roundsAnim(name, intro) {
  const f = [5, 3, 2, 4], r = recorder(); let tot = 0;
  r.step(0, intro, [A('frequencies', f)]);
  f.forEach((x, i) => { tot += Math.ceil(x / 3); r.step(ln(C_RND, 'rounds +='), `Frequency ${x}: ceil(${x}/3) = ${Math.ceil(x / 3)} (${x % 3 === 0 ? 'all triples' : x % 3 === 1 ? 'one triple becomes two pairs' : 'one pair + triples'}). Total ${tot}.`, [A('frequencies', f, { active: [i], done: idx(i) }), A('total', [tot], { done: [0] })]); });
  r.step(ln(C_RND, 'if (f == 1)'), 'A value that appears exactly once can never be removed → −1.', [A('frequencies', [1, 4], { bad: [0] }), A('answer', [-1], { bad: [0] })]);
  return r.steps;
}
ANIM['Minimum Rounds to Complete All Tasks'] = W('Triples first', C_RND, roundsAnim('rounds', 'Count how many tasks have each difficulty, then finish them 2 or 3 at a time.'));
ANIM['Minimum Number of Operations to Make Array Empty'] = W('Triples first', C_RND, roundsAnim('ops', 'Count each value; delete 2 or 3 equal elements per operation.'));

const C_PR = `
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Double.compare(gain(b), gain(a)));
while (extraStudents-- > 0) {
    int[] c = pq.poll();
    c[0]++;
    c[1]++;
    pq.add(c);
}`;
{
  const cl = [[1, 2], [3, 5], [2, 2]].map(x => [...x]), r = recorder(), g = c => (c[0] + 1) / (c[1] + 1) - c[0] / c[1];
  const show = () => cl.map(c => `${c[0]}/${c[1]}`);
  r.step(0, 'Classes (pass/total): ' + show().join(', ') + '. Two extra students. Gain of a class = (p+1)/(t+1) − p/t.', [A('classes', show()), A('gains', cl.map(c => g(c).toFixed(3)))]);
  for (let s = 1; s <= 2; s++) { let b = 0; cl.forEach((c, i) => { if (g(c) > g(cl[b])) b = i; }); cl[b][0]++; cl[b][1]++;
    r.step(ln(C_PR, 'c[0]++'), `Student ${s}: class ${b} has the biggest gain; it becomes ${cl[b][0]}/${cl[b][1]}.`, [A('classes', show(), { active: [b] }), A('gains', cl.map(c => g(c).toFixed(3)))]); }
  const avg = cl.reduce((a, c) => a + c[0] / c[1], 0) / cl.length;
  r.step(ln(C_PR, 'pq.add(c)'), `Average = <b>${avg.toFixed(5)}</b>.`, [A('classes', show(), { done: idx(3) }), A('average', [avg.toFixed(5)], { done: [0] })]);
  ANIM['Maximum Average Pass Ratio'] = W('Heap by marginal gain', C_PR, r.steps);
}
