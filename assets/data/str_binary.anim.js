const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const runsOf = s => { const o = []; for (let i = 0; i < s.length;) { let j = i; while (j < s.length && s[j] === s[i]) j++; o.push([i, j]); i = j; } return o; };
const L_ = (name, s, o = {}) => lane(name, s.split(''), o);

const C_CB = `
if (s.charAt(i) == s.charAt(i - 1)) cur++;
else {
    count += Math.min(prev, cur);
    prev = cur;
    cur = 1;
}`;
{
  const s = '00110011', r = recorder(), rr = runsOf(s); let count = 0;
  r.step(0, `Runs of "${s}": ${rr.map(([i, j]) => j - i).join(', ')}.`, [L_('s', s)]);
  for (let k = 1; k < rr.length; k++) { const p = rr[k - 1][1] - rr[k - 1][0], c = rr[k][1] - rr[k][0]; count += Math.min(p, c); r.step(ln(C_CB, 'Math.min(prev, cur)'), `Boundary at ${rr[k][0]}: runs ${p} and ${c} → +${Math.min(p, c)} ("${s.slice(rr[k][0] - Math.min(p, c), rr[k][0] + Math.min(p, c))}" and shorter).`, [L_('s', s, { warn: range(rr[k - 1][0], rr[k - 1][1] - 1), active: range(rr[k][0], rr[k][1] - 1) })], { count }); }
  r.step(0, `Total <b>${count}</b>.`, [R('count', [count], { done: [0] })]);
  ANIM['Count Binary Substrings'] = W('Run lengths', C_CB, r.steps);
}

const C_CH = `
run = i > 0 && s.charAt(i) == s.charAt(i - 1) ? run + 1 : 1;
total = (total + run) % MOD;`;
{
  const s = 'abbcccaa', r = recorder(); let run = 0, total = 0;
  for (let i = 0; i < s.length; i++) { run = i > 0 && s[i] === s[i - 1] ? run + 1 : 1; total += run; r.step(ln(C_CH, 'total ='), `i = ${i} '${s[i]}': run ${run} → ${run} homogenous substrings end here, total ${total}.`, [L_('s', s, { active: [i], warn: range(i - run + 1, i - 1) })], { run, total }); }
  ANIM['Count Number of Homogenous Substrings'] = W('Running run length', C_CH, r.steps);
}

const C_N1 = `
run = c == '1' ? run + 1 : 0;
total = (total + run) % MOD;`;
{
  const s = '0110111', r = recorder(); let run = 0, total = 0;
  for (let i = 0; i < s.length; i++) { run = s[i] === '1' ? run + 1 : 0; total += run; r.step(ln(C_N1, 'total ='), `s[${i}] = ${s[i]}: run ${run}, total ${total}.`, [L_('s', s, s[i] === '1' ? { active: [i], warn: range(i - run + 1, i - 1) } : { ghost: [i] })], { run, total }); }
  ANIM['Number of Substrings With Only 1s'] = W('Running run length', C_N1, r.steps);
}

const C_SE = `
for (char ch : s.toCharArray())
    if (ch == c) k++;
return k * (k + 1) / 2;`;
{
  const s = 'abada', r = recorder(), idx = [0, 2, 4];
  r.step(ln(C_SE, 'k++'), `c = 'a' appears k = 3 times.`, [L_('s', s, { warn: idx, showIdx: true })], { k: 3 });
  r.step(ln(C_SE, 'return'), 'Pairs start ≤ end: (0,0) (0,2) (0,4) (2,2) (2,4) (4,4) → 3·4/2 = <b>6</b>.', [R('substrings', ['a', 'aba', 'abada', 'a', 'ada', 'a'], { done: range(0, 5) })]);
  ANIM['Count Substrings Starting and Ending with Given Character'] = W('Count and formula', C_SE, r.steps);
}

const C_OS = `
return !s.contains("01");`;
{
  const r = recorder();
  r.step(ln(C_OS, 'return'), '"1001": "01" at index 2 means a second block of ones → <b>false</b>.', [L_('s', '1001', { bad: [2, 3] })]);
  r.step(ln(C_OS, 'return'), '"110": no "01" → <b>true</b>.', [L_('s', '110', { done: [0, 1] })]);
  ANIM['Check if Binary String Has at Most One Segment of Ones'] = W('Look for "01"', C_OS, r.steps);
}

const C_AL = `
for (int i = 0; i < s.length(); i++)
    if (s.charAt(i) - '0' != i % 2) diff++;
return Math.min(diff, s.length() - diff);`;
{
  const s = '0100', r = recorder(), pat = s.split('').map((_, i) => String(i % 2)), mis = s.split('').map((c, i) => c !== pat[i] ? i : -1).filter(i => i >= 0);
  r.step(ln(C_AL, 'diff++'), `Compare with 0101: mismatches at ${mis.join(', ')} → ${mis.length}.`, [L_('s', s, { bad: mis }), lane('0101…', pat)], { diff: mis.length });
  r.step(ln(C_AL, 'return'), `The other pattern needs ${s.length - mis.length}. Answer <b>${Math.min(mis.length, s.length - mis.length)}</b>.`, [R('answer', [Math.min(mis.length, s.length - mis.length)], { done: [0] })]);
  ANIM['Minimum Changes To Make Alternating Binary String'] = W('One pass', C_AL, r.steps);
}

const C_BE = `
for (int i = 0; i < s.length(); i += 2)
    if (s.charAt(i) != s.charAt(i + 1)) changes++;`;
{
  const s = '10011011', r = recorder(); let ch = 0;
  for (let i = 0; i < s.length; i += 2) { const bad = s[i] !== s[i + 1]; if (bad) ch++; r.step(ln(C_BE, bad ? 'changes++' : 'if (s.charAt'), `Pair "${s[i]}${s[i + 1]}" ${bad ? 'differs → 1 change' : 'is fine'}.`, [L_('s', s, bad ? { bad: [i, i + 1] } : { done: [i, i + 1] })], { changes: ch }); }
  ANIM['Minimum Number of Changes to Make Binary String Beautiful'] = W('Pair scan', C_BE, r.steps);
}

const C_SC = `
for (int i = 0; i + 1 < s.length(); i++) {
    balance += s.charAt(i) == '0' ? 1 : -1;
    best = Math.max(best, balance);
}
return ones + best;`;
{
  const s = '011101', r = recorder(), ones = 4; let bal = 0, best = -1e9;
  r.step(0, `"${s}" has ${ones} ones. Score = ones + (zeros − ones) on the left.`, [L_('s', s)], { ones });
  for (let i = 0; i + 1 < s.length; i++) { bal += s[i] === '0' ? 1 : -1; best = Math.max(best, bal); r.step(ln(C_SC, 'best = Math.max'), `Split after ${i}: left balance ${bal} → score ${ones + bal}.`, [L_('s', s, { active: range(0, i), ghost: range(i + 1, s.length - 1) })], { balance: bal, best }); }
  r.step(ln(C_SC, 'return'), `Answer <b>${ones + best}</b>.`, [R('answer', [ones + best], { done: [0] })]);
  ANIM['Maximum Score After Splitting a String'] = W('One pass', C_SC, r.steps);
}

const C_BW = `
if (c == '1') ones++;
else steps += ones;`;
{
  const s = '100101', r = recorder(); let ones = 0, steps = 0;
  for (let i = 0; i < s.length; i++) { if (s[i] === '1') ones++; else steps += ones; r.step(ln(C_BW, s[i] === '1' ? 'ones++' : 'steps +='), s[i] === '1' ? `Black ball, ones = ${ones}.` : `White ball must pass ${ones} black ball${ones === 1 ? '' : 's'} → steps ${steps}.`, [L_('balls', s, { active: [i] })], { ones, steps }); }
  ANIM['Separate Black and White Balls'] = W('Count inversions', C_BW, r.steps);
}

const C_CC = `
while (l <= r && directions.charAt(l) == 'L') l++;
while (r >= l && directions.charAt(r) == 'R') r--;
for (int i = l; i <= r; i++)
    if (directions.charAt(i) != 'S') count++;`;
{
  const d = 'LLRSLLRR', r = recorder();
  r.step(ln(C_CC, "== 'L') l++"), 'Leading L cars drive away to the left.', [L_('cars', d, { ghost: [0, 1] })]);
  r.step(ln(C_CC, "== 'R') r--"), 'Trailing R cars drive away to the right.', [L_('cars', d, { ghost: [0, 1, 6, 7] })]);
  r.step(ln(C_CC, 'count++'), 'Middle "RSLL": every moving car hits something: R, L, L → <b>3</b>.', [L_('cars', d, { ghost: [0, 1, 6, 7], bad: [2, 4, 5], done: [3] })], { count: 3 });
  ANIM['Count Collisions on a Road'] = W('Trim and count', C_CC, r.steps);
}

const C_LB = `
if (cur == 0) continue;
total += prev * cur;
prev = cur;`;
{
  const bank = ['011001', '000000', '010100', '001000'], r = recorder(); let prev = 0, total = 0;
  bank.forEach((row, i) => { const cur = row.split('').filter(c => c === '1').length; if (!cur) { r.step(ln(C_LB, 'continue'), `Row ${i} is empty → skip.`, [L_(`row ${i}`, row, { ghost: range(0, 5) })], { prev, total }); return; } total += prev * cur; r.step(ln(C_LB, 'total +='), `Row ${i}: ${cur} devices × previous ${prev} → total ${total}.`, [L_(`row ${i}`, row, { active: row.split('').map((c, k) => c === '1' ? k : -1).filter(k => k >= 0) })], { prev: cur, total }); prev = cur; });
  ANIM['Number of Laser Beams in a Bank'] = W('Previous non-empty row', C_LB, r.steps);
}

const C_LC = `
if (corridor.charAt(i) != 'S') continue;
seats++;
if (seats > 2 && seats % 2 == 1) ways = ways * (i - lastSeat) % MOD;
lastSeat = i;`;
{
  const c = 'SSPPSPS', r = recorder(); let seats = 0, last = -1, ways = 1;
  for (let i = 0; i < c.length; i++) { if (c[i] !== 'S') continue; seats++; if (seats > 2 && seats % 2 === 1) { ways *= i - last; r.step(ln(C_LC, 'ways = ways'), `Seat ${seats} starts a new pair: ${i - last} places for the divider between index ${last} and ${i}.`, [L_('corridor', c, { warn: range(last, i - 1), active: [i], showIdx: true })], { ways }); } last = i; }
  r.step(0, `${seats} seats (even) → <b>${ways}</b> ways.`, [R('answer', [ways], { done: [0] })]);
  ANIM['Number of Ways to Divide a Long Corridor'] = W('Product of gaps', C_LC, r.steps);
}

const C_MB = `
for (int k = 0; k < n; k++) {
    int i = pass == 0 ? k : n - 1 - k;
    ans[i] += cost;
    if (boxes.charAt(i) == '1') balls++;
    cost += balls;
}`;
{
  const b = '001011', n = 6, r = recorder(), ans = Array(n).fill(0);
  for (const pass of [0, 1]) { let balls = 0, cost = 0; for (let k = 0; k < n; k++) { const i = pass ? n - 1 - k : k; ans[i] += cost; if (b[i] === '1') balls++; cost += balls; } r.step(ln(C_MB, 'ans[i] += cost'), pass ? 'Right-to-left pass adds the cost of balls on the right.' : 'Left-to-right pass: cost of bringing balls from the left; it grows by the balls already passed.', [L_('boxes', b), A('ans', ans.slice(), { active: range(0, n - 1) })]); }
  r.step(0, `Answer <b>[${ans}]</b>.`, [A('ans', ans, { done: range(0, n - 1) })]);
  ANIM['Minimum Number of Operations to Move All Balls to Each Box'] = W('Two sweeps', C_MB, r.steps);
}

const C_DO = `
count += (p < Z ? zeros.get(p) : n) - i;
for (int z = 1; (long) z * z <= n && p + z - 1 < Z; z++) {
    int lo = zeros.get(p + z - 1);
    int hi = (p + z < Z ? zeros.get(p + z) : n) - 1;
    int from = Math.max(lo, i + z * z + z - 1);
    if (from <= hi) count += hi - from + 1;
}`;
{
  const s = '101101', r = recorder(), i = 0;
  r.step(ln(C_DO, 'count += (p'), 'Start i = 0. Zero zeros: end at 0 only ("1") → +1.', [L_('s', s, { done: [0], showIdx: true })], { count: 1 });
  r.step(ln(C_DO, 'int from'), 'One zero: ends 1..3 have exactly one zero; need length ≥ 1 + 1 = 2 → ends 1, 2, 3 → +3.', [L_('s', s, { warn: [1], done: [1, 2, 3], showIdx: true })], { z: 1, count: 4 });
  r.step(ln(C_DO, 'int from'), 'Two zeros: ends 4..5; need length ≥ 4 + 2 = 6 → only end 5 ("101101", 4 ones ≥ 4) → +1.', [L_('s', s, { warn: [1, 4], done: [5], showIdx: true })], { z: 2, count: 5 });
  r.step(0, 'z = 3 would need 9 + 3 = 12 characters: stop. Repeat for every start.', [R('starts', [0, 1, 2, 3, 4, 5], { active: [0] })]);
  ANIM['Count the Number of Substrings With Dominant Ones'] = W('Start × few zeros', C_DO, r.steps);
}

const C_B1 = `
for (int j = i; j < s.length(); j++) {
    if ("aeiou".indexOf(s.charAt(j)) >= 0) v++;
    else c++;
    if (v == c && (v * c) % k == 0) count++;
}`;
{
  const s = 'baeyh', k = 2, r = recorder(); let count = 0;
  for (let i = 0; i < s.length; i++) { let v = 0, c = 0; for (let j = i; j < s.length; j++) { if ('aeiou'.includes(s[j])) v++; else c++; if (v === c && (v * c) % k === 0) { count++; r.step(ln(C_B1, 'count++'), `"${s.slice(i, j + 1)}": v = c = ${v}, ${v * c} % 2 = 0 → beautiful.`, [L_('s', s, { done: range(i, j) })], { count }); } } }
  r.step(0, `Answer <b>${count}</b>.`, [R('answer', [count], { done: [0] })]);
  ANIM['Count Beautiful Substrings I'] = W('All substrings', C_B1, r.steps);
}

const C_B2 = `
while ((long) m * m % k != 0) m++;
long key = key(balance, vowels % m);
count += seen.getOrDefault(key, 0);
seen.merge(key, 1, Integer::sum);`;
{
  const s = 'baeyh', k = 2, r = recorder(); let m = 1; while (m * m % k) m++; const seen = { '0,0': 1 }; let bal = 0, vow = 0, count = 0;
  r.step(ln(C_B2, 'while'), `k = 2 → m = ${m}: v² divisible by 2 iff v is a multiple of 2.`, [L_('s', s)], { m });
  for (let i = 0; i < s.length; i++) { if ('aeiou'.includes(s[i])) { bal++; vow++; } else bal--; const key = `${bal},${vow % m}`, add = seen[key] || 0; count += add; seen[key] = add + 1; r.step(ln(C_B2, 'count +='), `'${s[i]}': key (balance ${bal}, vowels%${m} = ${vow % m}) seen ${add} time${add === 1 ? '' : 's'} → count ${count}.`, [L_('s', s, { active: [i] }), R('seen', Object.entries(seen).map(([a, b]) => `(${a}):${b}`))], { count }); }
  ANIM['Count Beautiful Substrings II'] = W('Prefix map', C_B2, r.steps);
}

const C_AS = `
if (s.charAt(i) == '1') ones += j - i;
else {
    if (seenZero) bestPair = Math.max(bestPair, prevZeros + (j - i));
    prevZeros = j - i;
    seenZero = true;
}`;
{
  const s = '0100', r = recorder();
  r.step(0, '"0100" (imagine 1 at both ends): ones = 1, zero blocks 1 and 2.', [L_('s', s, { warn: [0, 2, 3], active: [1] })], { ones: 1 });
  r.step(ln(C_AS, 'bestPair = Math.max'), 'Adjacent zero blocks around the 1-block: 1 + 2 = 3.', [L_('s', s, { warn: [0, 2, 3] })], { bestPair: 3 });
  r.step(0, 'Trade: "0100" → "0000" → "1111". Answer 1 + 3 = <b>4</b>.', [L_('after', '1111', { done: [0, 1, 2, 3] })]);
  ANIM['Maximize Active Section with Trade I'] = W('Zero-block pairs', C_AS, r.steps);
}

const C_D1 = `
for (int k = 0; i + k < s.length() && j + k < t.length(); k++) {
    if (s.charAt(i + k) != t.charAt(j + k)) diff++;
    if (diff > 1) break;
    if (diff == 1) total++;
}`;
{
  const s = 'aba', t = 'baba', r = recorder(), i = 0, j = 0; let diff = 0, total = 0;
  for (let k = 0; i + k < s.length && j + k < t.length; k++) { if (s[i + k] !== t[j + k]) diff++; if (diff > 1) { r.step(ln(C_D1, 'break'), `Second difference at k = ${k} → stop.`, [L_('s', s, { bad: [k] }), L_('t', t, { bad: [k] })], { diff }); break; } if (diff === 1) total++; r.step(ln(C_D1, diff === 1 ? 'total++' : 'diff++'), `Length ${k + 1}: "${s.slice(0, k + 1)}" vs "${t.slice(0, k + 1)}" differ in ${diff}${diff === 1 ? ' → count' : ''}.`, [L_('s', s, { active: range(0, k) }), L_('t', t, { active: range(0, k) })], { diff, total }); }
  r.step(0, 'Repeat for every pair of start points. Total for this example: <b>6</b>.', [R('answer', [6], { done: [0] })]);
  ANIM['Count Substrings That Differ by One Character'] = W('Extend from each pair', C_D1, r.steps);
}

const C_LV = `
if (c == a) countA++;
if (c == b) {
    countB++;
    restB--;
}
if (countB > 0) best = Math.max(best, countA - countB);
if (countA < countB && restB > 0) {
    countA = 0;
    countB = 0;
}`;
{
  const s = 'aababbb', r = recorder(); let cA = 0, cB = 0, rest = 4, best = 0;
  r.step(0, 'Pair (a = b-letter "b", b = "a"): +1 for b, −1 for a. Look for the largest lead of b over a with at least one a.', [L_('s', s)]);
  for (let i = 0; i < s.length; i++) { const ch = s[i]; if (ch === 'b') cA++; if (ch === 'a') { cB++; rest--; } if (cB > 0) best = Math.max(best, cA - cB); let reset = false; if (cA < cB && rest > 0) { cA = 0; cB = 0; reset = true; } r.step(ln(C_LV, reset ? 'countA = 0' : 'best = Math.max'), `'${ch}': lead ${cA - cB}${reset ? ' → negative with an "a" still ahead → reset' : ''}, best ${best}.`, [L_('s', s, { active: [i] })], { countB_letter: cA, countA_letter: cB, best }); }
  r.step(0, `Best over all pairs is <b>${best}</b> ("babbb": 4 b, 1 a).`, [R('answer', [best], { done: [0] })]);
  ANIM['Substring With Largest Variance'] = W('26 × 26 Kadane', C_LV, r.steps);
}

const C_TH = `
int[] t = top[s.charAt(i) - 'a'];
for (int[] t : top) best = Math.max(best, Math.max(t[0] - 2, Math.max(Math.min(t[0] - 1, t[1]), t[2])));`;
{
  const s = 'aaaabaaab', r = recorder();
  r.step(ln(C_TH, 'int[] t = top'), 'Runs of a: 4 and 3. Top three for a: [4, 3, 0].', [L_('s', s, { warn: [0, 1, 2, 3], active: [5, 6, 7] })], { t0: 4, t1: 3, t2: 0 });
  r.step(ln(C_TH, 'best = Math.max'), 'One run: 4 − 2 = 2. Two runs: min(4 − 1, 3) = 3 ("aaa" twice in the long run, once in the short). Three runs: 0. → <b>3</b>.', [R('candidates', [2, 3, 0], { done: [1] })]);
  ANIM['Find Longest Special Substring That Occurs Thrice'] = W('Top three runs', C_TH, r.steps);
}

const C_MP = `
while (i < n && start.charAt(i) == '_') i++;
while (j < n && target.charAt(j) == '_') j++;
if (start.charAt(i) != target.charAt(j)) return false;
if (start.charAt(i) == 'L' && i < j) return false;
if (start.charAt(i) == 'R' && i > j) return false;`;
{
  const st = '_L__R__R_', tg = 'L______RR', r = recorder(); let i = 0, j = 0;
  while (true) { while (i < st.length && st[i] === '_') i++; while (j < tg.length && tg[j] === '_') j++; if (i === st.length || j === tg.length) break; const ok = st[i] === tg[j] && !(st[i] === 'L' && i < j) && !(st[i] === 'R' && i > j); r.step(ln(C_MP, st[i] === 'L' ? "== 'L' && i < j" : "== 'R' && i > j"), `${st[i]} at ${i} → target ${tg[j]} at ${j}: ${st[i] === 'L' ? 'moves left' : 'moves right'} ${ok ? '✓' : '✗'}.`, [L_('start', st, { active: [i], showIdx: true }), L_('target', tg, { done: [j], showIdx: true })]); i++; j++; }
  r.step(0, 'All pieces matched → <b>true</b>.', [R('answer', ['true'], { done: [0] })]);
  ANIM['Move Pieces to Obtain a String'] = W('Two pointers', C_MP, r.steps);
}
