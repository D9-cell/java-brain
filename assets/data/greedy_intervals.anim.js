const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const iv = a => a.map(x => `[${x[0]},${x[1]}]`);

const C_NOI = `
Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
int removed = 0, end = Integer.MIN_VALUE;
for (int[] in : intervals) {
    if (in[0] >= end) end = in[1]; else removed++;
}`;
{
  const a = [[1, 2], [1, 3], [2, 3], [3, 4]], r = recorder(); let end = -Infinity, removed = 0;
  r.step(0, 'Intervals sorted by end: ' + iv(a).join(' ') + '. Keep one when it starts at or after the last kept end.', [A('intervals', iv(a))]);
  a.forEach((x, i) => { const keep = x[0] >= end; if (keep) end = x[1]; else removed++; r.step(ln(C_NOI, 'if (in[0] >= end)'), keep ? `[${x}] starts at ${x[0]} ≥ last end → keep, end = ${end}.` : `[${x}] starts at ${x[0]} < ${end} → overlaps, remove it.`, [A('intervals', iv(a), { active: [i], done: idx(i).filter(j => a[j][0] >= -Infinity) }), A('end / removed', [end === -Infinity ? '−∞' : end, removed])]); });
  ANIM['Non-overlapping Intervals'] = W('Sort by end', C_NOI, r.steps);
}

const C_ARR = `
Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
int arrows = 0;
long shot = Long.MIN_VALUE;
for (int[] p : points) {
    if (p[0] > shot) { arrows++; shot = p[1]; }
}`;
{
  const a = [[1, 6], [2, 8], [7, 12], [10, 16]], r = recorder(); let shot = -Infinity, arrows = 0;
  r.step(0, 'Balloons sorted by end: ' + iv(a).join(' ') + '.', [A('balloons', iv(a))]);
  a.forEach((p, i) => { const hit = p[0] <= shot; if (!hit) { arrows++; shot = p[1]; } r.step(ln(C_ARR, 'if (p[0] > shot)'), hit ? `[${p}] starts at ${p[0]} ≤ ${shot}: already burst by the last arrow.` : `[${p}] not hit: new arrow at its end ${p[1]}.`, [A('balloons', iv(a), { active: [i] }), A('arrows / last shot', [arrows, shot === -Infinity ? '−∞' : shot])]); });
  ANIM['Minimum Number of Arrows to Burst Balloons'] = W('Shoot at the first end', C_ARR, r.steps);
}

const C_TAP = `
for (int i = 0; i <= n; i++) {
    int left = Math.max(0, i - ranges[i]), right = Math.min(n, i + ranges[i]);
    maxReach[left] = Math.max(maxReach[left], right);
}
for (int i = 0; i <= n && curEnd < n; i++) {
    farthest = Math.max(farthest, maxReach[i]);
    if (i == curEnd) {
        if (farthest <= curEnd) return -1;
        taps++;
        curEnd = farthest;
    }
}`;
{
  const n = 5, ranges = [3, 4, 1, 1, 0, 0], reach = Array(n + 1).fill(0), r = recorder();
  ranges.forEach((rg, i) => { const l = Math.max(0, i - rg), rr = Math.min(n, i + rg); reach[l] = Math.max(reach[l], rr); });
  r.step(ln(C_TAP, 'maxReach[left]'), 'ranges = [3, 4, 1, 1, 0, 0]. For each left end, the farthest right end any tap reaches: ' + reach.join(', '), [A('maxReach', reach)]);
  let taps = 0, curEnd = 0, far = 0;
  for (let i = 0; i <= n && curEnd < n; i++) { far = Math.max(far, reach[i]); let say = `i = ${i}: farthest = ${far}.`; if (i === curEnd) { if (far <= curEnd) { say += ' Stuck → −1.'; } else { taps++; curEnd = far; say += ` Reached the covered end: open a tap, now covered up to ${curEnd}. Taps ${taps}.`; } }
    r.step(ln(C_TAP, 'if (i == curEnd)'), say, [A('maxReach', reach, { active: [i] }), A('curEnd / farthest / taps', [curEnd, far, taps])]); }
  ANIM['Minimum Number of Taps to Open to Water a Garden'] = W('Jump game style', C_TAP, r.steps);
}

const C_WP = `
iv.sort((a, b) -> a[0] - b[0]);
int count = 0, i = 0, target = 0;
while (target < n) {
    int best = -1;
    while (i < iv.size() && iv.get(i)[0] <= target) best = Math.max(best, iv.get(i++)[1]);
    if (best < target) return -1;
    count++;
    target = best + 1;
}`;
{
  const g = [-1, 2, 2, -1, 0, 0], n = 6, ints = []; g.forEach((x, i) => { if (x !== -1) ints.push([Math.max(0, i - x), Math.min(n - 1, i + x)]); }); ints.sort((a, b) => a[0] - b[0]);
  const r = recorder(); let count = 0, target = 0, i = 0;
  r.step(0, 'gallery = [-1, 2, 2, -1, 0, 0]. Water intervals sorted by left end: ' + iv(ints).join(' '), [A('gallery', g), A('intervals', iv(ints))]);
  while (target < n) { let best = -1; const from = i; while (i < ints.length && ints[i][0] <= target) best = Math.max(best, ints[i++][1]); count++; r.step(ln(C_WP, 'target = best + 1'), `First unwatered position ${target}. Candidates starting ≤ ${target}: farthest right end ${best}. Use that sprinkler (count ${count}).`, [A('intervals', iv(ints), { active: idx(i).filter(j => j >= from) }), A('unwatered from', [best + 1], { done: [0] })]); target = best + 1; }
  r.step(ln(C_WP, 'return'), `All positions watered with <b>${count}</b> sprinklers.`, [A('intervals', iv(ints), { done: idx(ints.length) }), A('sprinklers', [count], { done: [0] })]);
  ANIM['Water the Plants'] = W('Cover by farthest reach', C_WP, r.steps);
}

const C_BLOOM = `
Arrays.sort(order, (a, b) -> growTime[b] - growTime[a]);
int planted = 0, ans = 0;
for (int i : order) {
    planted += plantTime[i];
    ans = Math.max(ans, planted + growTime[i]);
}`;
{
  const p = [1, 4, 3], g = [2, 3, 1], order = [1, 0, 2], r = recorder(); let planted = 0, ans = 0;
  r.step(0, 'plant = [1, 4, 3], grow = [2, 3, 1]. Plant the longest-growing seeds first.', [A('plantTime', p), A('growTime', g, { active: [1, 0, 2] })]);
  order.forEach(i => { planted += p[i]; ans = Math.max(ans, planted + g[i]); r.step(ln(C_BLOOM, 'ans = Math.max'), `Plant seed ${i}: planting ends at day ${planted}, blooms at day ${planted + g[i]}. Latest bloom so far ${ans}.`, [A('plantTime', p, { active: [i] }), A('planted / ans', [planted, ans], { done: [1] })]); });
  ANIM['Earliest Possible Day of Full Bloom'] = W('Longest grower first', C_BLOOM, r.steps);
}

const C_MON = `
for (int i = 0; i < n; i++) arrive[i] = (dist[i] + speed[i] - 1) / speed[i];
Arrays.sort(arrive);
for (int i = 0; i < n; i++) if (arrive[i] <= i) return i;
return n;`;
{
  const dist = [3, 2, 4], speed = [5, 3, 2], arrive = dist.map((d, i) => Math.ceil(d / speed[i])), s = [...arrive].sort((a, b) => a - b), r = recorder();
  r.step(0, 'dist = [3, 2, 4], speed = [5, 3, 2]. Arrival minutes = ceil(dist / speed) = ' + arrive.join(', '), [A('arrive', arrive), A('sorted', s)]);
  for (let i = 0; i < s.length; i++) { const lose = s[i] <= i; r.step(ln(C_MON, 'arrive[i] <= i'), lose ? `Minute ${i}: the next monster arrives at ${s[i]} ≤ ${i} → it reaches the city first. You eliminated <b>${i}</b>.` : `Minute ${i}: shoot the monster arriving at ${s[i]} (> ${i}).`, [A('sorted arrivals', s, { active: [i], done: idx(i) }), A('minute', [i])]); if (lose) break; }
  ANIM['Eliminate Maximum Number of Monsters'] = W('Sort arrival minutes', C_MON, r.steps);
}

const C_TS = `
int[] cnt = new int[26];
int max = 0;
for (char c : tasks) max = Math.max(max, ++cnt[c - 'A']);
int ties = 0;
for (int c : cnt) if (c == max) ties++;
return Math.max(tasks.length, (max - 1) * (n + 1) + ties);`;
{
  const r = recorder();
  r.step(0, 'tasks = AAABBB, n = 2. Count: A×3, B×3. max = 3, ties = 2.', [A('counts', [3, 3], { ptr: { 0: 'A', 1: 'B' } })]);
  r.step(ln(C_TS, 'return Math.max'), 'Frame: (max − 1) = 2 rows of width n + 1 = 3, then the last row holds A and B: (3 − 1)·3 + 2 = 8.', [A('slots', ['A', 'B', 'idle', 'A', 'B', 'idle', 'A', 'B'], { done: [0, 1, 3, 4, 6, 7], warn: [2, 5] }), A('answer', [8], { done: [0] })]);
  r.step(ln(C_TS, 'tasks.length'), 'With many distinct tasks (AAAAAABCDEFG, n = 2) the frame has no idle slots, so the answer is simply the number of tasks.', [A('frame', [16]), A('tasks', [12]), A('answer', [16], { done: [0] })]);
  ANIM['Task Scheduler'] = W('Frame formula', C_TS, r.steps);
}

const C_CIN = `
Map<Integer, Integer> rows = new HashMap<>();
for (int[] s : reservedSeats) if (s[1] >= 2 && s[1] <= 9) rows.merge(s[0], 1 << (s[1] - 2), (a, b) -> a | b);
int total = 2 * (n - rows.size());
for (int mask : rows.values()) {
    boolean l = (mask & left) == 0, m = (mask & mid) == 0, r = (mask & right) == 0;
    if (l && r) total += 2; else if (l || m || r) total += 1;
}`;
{
  const r = recorder(), seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  r.step(0, 'One row, seats 1..10. Blocks: left 2-5, middle 4-7, right 6-9. Seats 1 and 10 never matter.', [A('seat', seats, { warn: [1, 2, 3, 4] })]);
  r.step(ln(C_CIN, 'rows.merge'), 'Reserved seat 6 → bit for seat 6. Left block (2-5) is free, middle (4-7) and right (6-9) are not.', [A('seat', seats, { bad: [5], done: [1, 2, 3, 4] })]);
  r.step(ln(C_CIN, 'if (l && r)'), 'Only the left block is free (the right block is blocked) → this row holds 1 family.', [A('families in this row', [1], { done: [0] })]);
  r.step(ln(C_CIN, 'int total'), 'A row with no reservation holds 2 families (left block + right block), so those rows are counted first as 2 each.', [A('empty row', [2], { done: [0] })]);
  ANIM['Cinema Seat Allocation'] = W('Bit masks per row', C_CIN, r.steps);
}

const C_BH = `
for (int i = 1; i < m; i++) r.get(i)[1] = Math.min(r.get(i)[1], r.get(i - 1)[1] + r.get(i)[0] - r.get(i - 1)[0]);
for (int i = m - 2; i >= 0; i--) r.get(i)[1] = Math.min(r.get(i)[1], r.get(i + 1)[1] + r.get(i + 1)[0] - r.get(i)[0]);
for (int i = 1; i < m; i++) best = Math.max(best, (hl + hr + (rr - l)) / 2);`;
{
  const pos = [1, 2, 4], h = [0, 5, 1], r = recorder();
  r.step(0, 'n = 5, restrictions (2, 5) and (4, 1), plus building 1 = 0.', [A('position', pos), A('limit', h)]);
  const f = [...h]; for (let i = 1; i < 3; i++) f[i] = Math.min(f[i], f[i - 1] + pos[i] - pos[i - 1]);
  r.step(ln(C_BH, 'r.get(i - 1)[1] + r.get(i)[0]'), `Forward pass: a limit can rise by at most the distance: limits become ${f.join(', ')}.`, [A('position', pos), A('limit', f, { active: [1] })]);
  const b = [...f]; for (let i = 1; i >= 0; i--) b[i] = Math.min(b[i], b[i + 1] + pos[i + 1] - pos[i]);
  r.step(ln(C_BH, 'for (int i = m - 2'), `Backward pass: limits become ${b.join(', ')}.`, [A('position', pos), A('limit', b, { active: [2] })]);
  let best = 0; for (let i = 1; i < 3; i++) { const v = Math.floor((b[i - 1] + b[i] + (pos[i] - pos[i - 1])) / 2); best = Math.max(best, v); r.step(ln(C_BH, 'best = Math.max'), `Gap ${pos[i - 1]}→${pos[i]}: peak (${b[i - 1]} + ${b[i]} + ${pos[i] - pos[i - 1]}) / 2 = ${v}.`, [A('limit', b, { active: [i - 1, i] }), A('best', [best], { done: [0] })]); }
  r.step(ln(C_BH, 'for (int i = 1'), `After the last limit the height can still grow: ${b[2]} + (5 − 4) = ${b[2] + 1}. Answer <b>${Math.max(best, b[2] + 1)}</b>.`, [A('answer', [Math.max(best, b[2] + 1)], { done: [0] })]);
  ANIM['Maximum Building Height'] = W('Propagate limits, find peaks', C_BH, r.steps);
}

const C_SPL = `
for (int x : nums) {
    if (left.get(x) == 0) continue;
    left.merge(x, -1, Integer::sum);
    if (need.getOrDefault(x, 0) > 0) {
        need.merge(x, -1, Integer::sum);
        need.merge(x + 1, 1, Integer::sum);
    } else if (left.getOrDefault(x + 1, 0) > 0 && left.getOrDefault(x + 2, 0) > 0) {
        left.merge(x + 1, -1, Integer::sum);
        left.merge(x + 2, -1, Integer::sum);
        need.merge(x + 3, 1, Integer::sum);
    } else return false;
}`;
{
  const nums = [1, 2, 3, 3, 4, 5], left = {}, need = {}, r = recorder(); nums.forEach(x => { left[x] = (left[x] || 0) + 1; });
  const st = () => [A('numbers left', Object.keys(left).map(k => `${k}×${left[k]}`)), A('chains needing x', Object.entries(need).filter(([, c]) => c > 0).map(([k, c]) => `${k}×${c}`))];
  r.step(0, '[1, 2, 3, 3, 4, 5]: extend a chain if one needs x, otherwise start x, x+1, x+2.', st());
  nums.forEach(x => { if (left[x] === 0) return; left[x]--; let say;
    if ((need[x] || 0) > 0) { need[x]--; need[x + 1] = (need[x + 1] || 0) + 1; say = `${x}: a chain needs ${x} → extend it; it now needs ${x + 1}.`; }
    else if ((left[x + 1] || 0) > 0 && (left[x + 2] || 0) > 0) { left[x + 1]--; left[x + 2]--; need[x + 3] = (need[x + 3] || 0) + 1; say = `${x}: no chain needs it → start ${x}, ${x + 1}, ${x + 2}; that chain now needs ${x + 3}.`; }
    else say = 'cannot extend or start → false';
    r.step(ln(C_SPL, 'if (need.getOrDefault'), say, st()); });
  r.step(ln(C_SPL, 'else return false'), 'Everything placed → <b>true</b> (chains 1-2-3 and 3-4-5).', st());
  ANIM['Split Array into Consecutive Subsequences'] = W('Extend or start', C_SPL, r.steps);
}

const C_SUB = `
for (int c = 0; c < 26; c++) {
    if (last[c] < 0) continue;
    int[] rg = expand(s, c, first, last);
    if (rg != null) ranges.add(rg);
}
ranges.sort((a, b) -> a[1] != b[1] ? a[1] - b[1] : b[0] - a[0]);
for (int[] r : ranges) if (r[0] > end) { res.add(s.substring(r[0], r[1] + 1)); end = r[1]; }`;
{
  const s = 'adefaddaccc', chars = [...s], r = recorder();
  r.step(0, 's = adefaddaccc. For each letter take its range first..last and grow it to include everything inside.', [A('s', chars)]);
  r.step(ln(C_SUB, 'int[] rg'), 'a: 0..7 contains d (0..6) and e, f — all of their occurrences are inside → range [0, 7]. d: [1, 6] inside a\'s range but starts at 1 > 0 → valid [1, 6]. e: [2, 2]. f: [3, 3]. c: [8, 10].', [A('s', chars, { warn: [0, 1, 2, 3, 4, 5, 6, 7] })]);
  r.step(ln(C_SUB, 'ranges.sort'), 'Sort ranges by end (shorter first on ties): e[2,2], f[3,3], d[1,6], a[0,7], c[8,10].', [A('ranges', ['e', 'f', 'd', 'a', 'c'])]);
  r.step(ln(C_SUB, 'if (r[0] > end)'), 'Pick e (end 2), f (3), skip d and a (they overlap), pick c (8..10): <b>e, f, ccc</b>.', [A('s', chars, { done: [2, 3, 8, 9, 10], bad: [1, 4, 5, 6, 7] })]);
  ANIM['Maximum Number of Non-Overlapping Substrings'] = W('Expand, then select', C_SUB, r.steps);
}

const C_D2 = `
for (int i = 0; i < n; i++) if (senate.charAt(i) == 'R') r.add(i); else d.add(i);
while (!r.isEmpty() && !d.isEmpty()) {
    int a = r.poll(), b = d.poll();
    if (a < b) r.add(a + n); else d.add(b + n);
}
return r.isEmpty() ? "Dire" : "Radiant";`;
{
  const s = 'RDD', n = 3, r = recorder(); let R = [0], D = [1, 2];
  r.step(0, 'RDD: R at index 0; D at 1 and 2. Compare the fronts of the two queues.', [A('senate', [...s]), A('R queue', R), A('D queue', D)]);
  while (R.length && D.length) { const a = R.shift(), b = D.shift(); if (a < b) { R.push(a + n); } else { D.push(b + n); }
    r.step(ln(C_D2, 'if (a < b)'), a < b ? `R${a} acts before D${b}: it bans that D and returns as ${a + n}.` : `D${b} acts before R${a}: it bans that R and returns as ${b + n}.`, [A('R queue', R), A('D queue', D)]); }
  r.step(ln(C_D2, 'return r.isEmpty()'), `R queue is empty → <b>Dire</b> wins.`, [A('R queue', R), A('D queue', D, { done: D.map((_, i) => i) })]);
  ANIM['Dota2 Senate'] = W('Two queues', C_D2, r.steps);
}

const C_RM = `
gap[0] = startTime[0];
for (int i = 1; i < n; i++) gap[i] = startTime[i] - endTime[i - 1];
gap[n] = eventTime - endTime[n - 1];
for (int i = 1; i <= n; i++) {
    int dur = endTime[i - 1] - startTime[i - 1];
    if (dur <= Math.max(maxLeft[i - 1], maxRight[i])) best = Math.max(best, gap[i - 1] + dur + gap[i]);
    best = Math.max(best, gap[i - 1] + gap[i]);
}`;
{
  const r = recorder(); const gaps = [0, 6, 1, 0];
  r.step(0, 'eventTime = 10 with meetings [0,1], [7,8], [9,10]. The free gaps between them are [0, 6, 1, 0].', [A('gaps', gaps), A('meetings', ['[0,1]', '[7,8]', '[9,10]'])]);
  r.step(ln(C_RM, 'int dur'), 'Meeting 1 [0,1] (dur 1): the neighbouring gaps are 0 and 6. Another gap that is not adjacent: 1 (and 0) — max 1 ≥ dur → it can leave completely: 0 + 1 + 6 = 7.', [A('gaps', gaps, { active: [0, 1], done: [2] }), A('free time', [7], { done: [0] })]);
  r.step(ln(C_RM, 'best = Math.max(best, gap[i - 1] + gap[i])'), 'Even if it only slides, the two gaps merge: 0 + 6 = 6. Take the better one: <b>7</b>.', [A('gaps', gaps, { active: [0, 1] }), A('answer', [7], { done: [0] })]);
  ANIM['Reschedule Meetings for Maximum Free Time II'] = W('Merge the neighbouring gaps', C_RM, r.steps);
}

const C_ES = `
int[] last = new int[n + 1];
Arrays.fill(last, -1);
for (int i = 0; i < s; i++) last[change[i]] = i;
for (int i = 1; i <= n; i++) if (last[i] == -1) return false;
Arrays.sort(order, (a, b) -> last[a] - last[b]);
int used = 0;
for (int idx : order) {
    int need = nums[idx - 1] + 1;
    if (used + need > last[idx] + 1) return false;
    used += need;
}`;
{
  const nums = [1, 3], ch = [1, 1, 1, 2, 1, 1, 1], r = recorder();
  r.step(0, 'nums = [1, 3], changeIndices = [1,1,1,2,1,1,1]. Binary search on the second; check s = 6.', [A('changeIndices', ch, { done: [0, 1, 2, 3, 4, 5] })]);
  r.step(ln(C_ES, 'last[change[i]] = i'), 'Within the first 6 seconds the last occurrence of index 1 is second 6 and of index 2 is second 4 (1-based). Those are the marking seconds.', [A('index', [1, 2]), A('marking second', [6, 4], { done: [0, 1] })]);
  r.step(ln(C_ES, 'Arrays.sort(order'), 'Process indices by marking second: index 2 (second 4) first, then index 1 (second 6).', [A('order', [2, 1], { active: [0] })]);
  r.step(ln(C_ES, 'int need'), 'Index 2 needs nums = 3 decrements + 1 mark = 4 seconds; they fit into seconds 1..4 (4 ≤ 4). used = 4.', [A('used / limit', [4, 4], { done: [0] })]);
  r.step(ln(C_ES, 'if (used + need'), 'Index 1 needs 1 decrement + 1 mark = 2 seconds: 4 + 2 = 6 ≤ 6, so it also fits. Second 6 is feasible; second 5 is not (index 1 would be marked at second 5 or earlier with no room), so the answer is <b>6</b>.', [A('schedule', ['dec2', 'dec2', 'dec2', 'mark2', 'dec1', 'mark1'], { done: [0, 1, 2, 3, 4, 5] }), A('answer', [6], { done: [0] })]);
  ANIM['Earliest Second to Mark Indices I'] = W('Binary search + last occurrences', C_ES, r.steps);
}
