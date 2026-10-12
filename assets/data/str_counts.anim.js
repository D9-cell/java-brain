const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const S_ = s => lane('s', s.split(''), { showIdx: true });
const counts = (s, letters) => letters.map(c => s.split('').filter(x => x === c).length);
const CL = (name, letters, vals, o = {}) => lane(name, vals, { ...o, ptr: Object.fromEntries(letters.map((c, i) => [i, c])) });

const C_VA = `
for (int i = 0; i < s.length(); i++) {
    cnt[s.charAt(i) - 'a']++;
    cnt[t.charAt(i) - 'a']--;
}
for (int c : cnt)
    if (c != 0) return false;
return true;`;
{
  const s = 'anagram', t = 'nagaram', L = ['a', 'g', 'm', 'n', 'r'], r = recorder(), cnt = { a: 0, g: 0, m: 0, n: 0, r: 0 };
  r.step(0, `s = "${s}", t = "${t}". One counter per letter.`, [S_(s), lane('t', t.split('')), CL('cnt', L, L.map(c => cnt[c]))]);
  for (let i = 0; i < s.length; i++) { cnt[s[i]]++; cnt[t[i]]--; r.step(ln(C_VA, "cnt[t.charAt"), `i = ${i}: +1 for '${s[i]}', −1 for '${t[i]}'.`, [lane('s', s.split(''), { active: [i] }), lane('t', t.split(''), { active: [i] }), CL('cnt', L, L.map(c => cnt[c]), { active: [L.indexOf(s[i]), L.indexOf(t[i])] })]); }
  r.step(ln(C_VA, 'return true'), 'Every counter is back to 0 → <b>true</b>.', [CL('cnt', L, L.map(c => cnt[c]), { done: range(0, 4) })]);
  ANIM['Valid Anagram'] = W('One count array', C_VA, r.steps);
}

const C_FD = `
for (char c : s.toCharArray()) x ^= c;
for (char c : t.toCharArray()) x ^= c;
return (char) x;`;
{
  const s = 'abcd', t = 'abcde', r = recorder(); let x = 0;
  for (const c of s) { x ^= c.charCodeAt(0); r.step(ln(C_FD, 's.toCharArray'), `x ^= '${c}' → ${x}.`, [lane('s', s.split(''), { active: [s.indexOf(c)] })], { x }); }
  for (const c of t) { x ^= c.charCodeAt(0); r.step(ln(C_FD, 't.toCharArray'), `x ^= '${c}' → ${x}${c === 'e' ? '' : ' (cancels the copy from s)'}.`, [lane('t', t.split(''), { active: [t.indexOf(c)] })], { x }); }
  r.step(ln(C_FD, 'return'), `x = ${x} = <b>'${String.fromCharCode(x)}'</b>.`, [R('answer', [String.fromCharCode(x)], { done: [0] })]);
  ANIM['Find the Difference'] = W('XOR', C_FD, r.steps);
}

const C_FU = `
for (char c : s.toCharArray()) cnt[c - 'a']++;
for (int i = 0; i < s.length(); i++)
    if (cnt[s.charAt(i) - 'a'] == 1) return i;
return -1;`;
{
  const s = 'loveleetcode', r = recorder(), L = ['c', 'd', 'e', 'l', 'o', 't', 'v'], cnt = counts(s, L);
  r.step(ln(C_FU, 'cnt[c - '), 'Pass 1: count every letter.', [S_(s), CL('cnt', L, cnt)]);
  for (let i = 0; i < s.length; i++) { const c = cnt[L.indexOf(s[i])]; r.step(ln(C_FU, c === 1 ? 'return i' : 'if (cnt'), `s[${i}] = '${s[i]}' appears ${c} time${c > 1 ? 's' : ''}${c === 1 ? ` → answer <b>${i}</b>` : ''}.`, [lane('s', s.split(''), c === 1 ? { done: [i], showIdx: true } : { active: [i], showIdx: true }), CL('cnt', L, cnt, { active: [L.indexOf(s[i])] })]); if (c === 1) break; }
  ANIM['First Unique Character in a String'] = W('Two passes', C_FU, r.steps);
}

const C_FW = `
for (char c : w.toCharArray())
    if (++need[c - 'a'] > have[c - 'a']) {
        ok = false;
        break;
    }
if (ok) total += w.length();`;
{
  const words = ['cat', 'bt', 'hat', 'tree'], chars = 'atach', L = ['a', 'b', 'c', 'e', 'h', 'r', 't'], have = counts(chars, L), r = recorder(); let total = 0;
  r.step(0, `chars = "${chars}" is the budget.`, [CL('have', L, have)], { total });
  for (const w of words) { const need = counts(w, L), bad = L.map((c, i) => need[i] > have[i] ? i : -1).filter(i => i >= 0); if (!bad.length) total += w.length; r.step(ln(C_FW, bad.length ? 'ok = false' : 'total +='), `"${w}": ${bad.length ? `needs more '${L[bad[0]]}' than the budget → skip` : `fits → +${w.length}`}.`, [CL('need', L, need, bad.length ? { bad } : { done: need.map((v, i) => v ? i : -1).filter(i => i >= 0) }), CL('have', L, have)], { total }); }
  ANIM['Find Words That Can Be Formed by Characters'] = W('Counts per word', C_FW, r.steps);
}

const C_MS = `
cnt[s.charAt(i) - 'a']++;
cnt[t.charAt(i) - 'a']--;
for (int c : cnt)
    if (c > 0) steps += c;`;
{
  const s = 'leetcode', t = 'practice', L = [...new Set((s + t).split(''))].sort(), r = recorder(), d = L.map(c => counts(s, [c])[0] - counts(t, [c])[0]);
  r.step(ln(C_MS, 'cnt[t.charAt'), `s = "${s}", t = "${t}". cnt = count in s − count in t.`, [CL('s − t', L, d, { active: d.map((v, i) => v > 0 ? i : -1).filter(i => i >= 0), warn: d.map((v, i) => v < 0 ? i : -1).filter(i => i >= 0) })]);
  const steps = d.filter(v => v > 0).reduce((a, b) => a + b, 0);
  r.step(ln(C_MS, 'steps += c'), `Letters t is missing (positive): total <b>${steps}</b>. Each step rewrites one surplus letter of t.`, [CL('s − t', L, d, { done: d.map((v, i) => v > 0 ? i : -1).filter(i => i >= 0) })], { steps });
  ANIM['Minimum Number of Steps to Make Two Strings Anagram'] = W('Count difference', C_MS, r.steps);
}

const C_CL = `
for (int i = 0; i < 26; i++)
    if ((a[i] == 0) != (b[i] == 0)) return false;
Arrays.sort(a);
Arrays.sort(b);
return Arrays.equals(a, b);`;
{
  const w1 = 'cabbba', w2 = 'abbccc', L = ['a', 'b', 'c'], a = counts(w1, L), b = counts(w2, L), r = recorder();
  r.step(0, `word1 = "${w1}", word2 = "${w2}".`, [CL('word1', L, a), CL('word2', L, b)]);
  r.step(ln(C_CL, '(a[i] == 0)'), 'Both use exactly {a, b, c}.', [CL('word1', L, a, { done: [0, 1, 2] }), CL('word2', L, b, { done: [0, 1, 2] })]);
  r.step(ln(C_CL, 'Arrays.equals'), `Sorted counts [${[...a].sort()}] and [${[...b].sort()}] match → <b>true</b>. Relabel a↔c, then swap letters into place.`, [R('sorted 1', [...a].sort(), { done: [0, 1, 2] }), R('sorted 2', [...b].sort(), { done: [0, 1, 2] })]);
  ANIM['Determine if Two Strings Are Close'] = W('Set + sorted counts', C_CL, r.steps);
}

const C_WS = `
for (String w : words2) {
    int[] c = count(w);
    for (int i = 0; i < 26; i++) need[i] = Math.max(need[i], c[i]);
}
for (int i = 0; i < 26 && ok; i++) ok = c[i] >= need[i];`;
{
  const w1 = ['amazon', 'apple', 'facebook', 'google', 'leetcode'], w2 = ['lc', 'eo'], L = ['c', 'e', 'l', 'o'], r = recorder(), need = [0, 0, 0, 0];
  for (const w of w2) { counts(w, L).forEach((v, i) => need[i] = Math.max(need[i], v)); r.step(ln(C_WS, 'need[i] = Math.max'), `Merge "${w}" → need ${L.map((c, i) => c + need[i]).join(' ')}.`, [CL('need', L, need.slice(), { active: counts(w, L).map((v, i) => v ? i : -1).filter(i => i >= 0) })]); }
  const keep = [];
  for (const w of w1) { const c = counts(w, L), ok = c.every((v, i) => v >= need[i]); if (ok) keep.push(w); r.step(ln(C_WS, 'ok = c[i]'), `"${w}" ${ok ? 'covers every letter → keep' : 'is short of some letter'}.`, [CL(w, L, c, ok ? { done: [0, 1, 2, 3] } : { bad: c.map((v, i) => v < need[i] ? i : -1).filter(i => i >= 0) }), R('result', keep)]); }
  ANIM['Word Subsets'] = W('Max requirement', C_WS, r.steps);
}

const C_RA = `
char[] c = w.toCharArray();
Arrays.sort(c);
String key = new String(c);
if (!key.equals(prevKey)) out.add(w);
prevKey = key;`;
{
  const words = ['abba', 'baba', 'bbaa', 'cd', 'cd'], r = recorder(), out = []; let prev = '';
  for (const w of words) { const key = w.split('').sort().join(''), keep = key !== prev; if (keep) out.push(w); r.step(ln(C_RA, keep ? 'out.add' : 'prevKey = key'), `"${w}" → key "${key}" ${keep ? '≠ previous → keep' : '= previous → delete'}.`, [R('words', words, { active: [words.indexOf(w)] }), R('result', out)]); prev = key; }
  ANIM['Find Resultant Array After Removing Anagrams'] = W('Sorted key scan', C_RA, r.steps);
}

const C_PG = `
for (char c : sentence.toCharArray()) mask |= 1 << (c - 'a');
return mask == (1 << 26) - 1;`;
{
  const s = 'thequickbrownfoxjumpsoverthelazydog', r = recorder(); const on = new Set();
  [5, 15, 25, 35].forEach(k => { for (const c of s.slice(0, k)) on.add(c); r.step(ln(C_PG, 'mask |='), `After ${Math.min(k, s.length)} letters: ${on.size} bits on.`, [lane('bits a..z', 'abcdefghijklmnopqrstuvwxyz'.split('').map(c => on.has(c) ? 1 : 0), { done: 'abcdefghijklmnopqrstuvwxyz'.split('').map((c, i) => on.has(c) ? i : -1).filter(i => i >= 0) })], { bits: on.size }); });
  r.step(ln(C_PG, 'return'), 'All 26 bits set → <b>true</b>.', [R('answer', ['true'], { done: [0] })]);
  ANIM['Check if the Sentence Is Pangram'] = W('Bit mask', C_PG, r.steps);
}

const C_MW = `
for (String w : text.split(" ")) {
    boolean ok = true;
    for (char c : w.toCharArray())
        if (broken[c - 'a']) {
            ok = false;
            break;
        }
    if (ok) count++;
}`;
{
  const words = ['hello', 'world'], r = recorder(); let count = 0;
  r.step(0, 'text = "hello world", broken = {a, d}.', [R('broken', ['a', 'd'], { bad: [0, 1] })]);
  for (const w of words) { const b = w.split('').findIndex(c => 'ad'.includes(c)); if (b < 0) count++; r.step(ln(C_MW, b < 0 ? 'count++' : 'ok = false'), b < 0 ? `"${w}" has no broken letter → count ${count}.` : `"${w}" needs '${w[b]}' → skip.`, [lane(w, w.split(''), b < 0 ? { done: range(0, w.length - 1) } : { bad: [b] })], { count }); }
  ANIM['Maximum Number of Words You Can Type'] = W('Lookup table', C_MW, r.steps);
}

const C_LP = `
for (int c : cnt) {
    len += c / 2 * 2;
    if (c % 2 == 1) odd = true;
}
return odd ? len + 1 : len;`;
{
  const s = 'abccccdd', L = ['a', 'b', 'c', 'd'], c = counts(s, L), r = recorder(); let len = 0, odd = false;
  r.step(0, `s = "${s}".`, [CL('cnt', L, c)]);
  L.forEach((ch, i) => { len += Math.floor(c[i] / 2) * 2; if (c[i] % 2) odd = true; r.step(ln(C_LP, 'len += c / 2'), `'${ch}' × ${c[i]}: use ${Math.floor(c[i] / 2) * 2}${c[i] % 2 ? ', one left over' : ''}.`, [CL('cnt', L, c, { active: [i] })], { len, odd: String(odd) }); });
  r.step(ln(C_LP, 'return'), `${len} + 1 for a centre = <b>${len + 1}</b> (e.g. "dccaccd").`, [R('answer', [len + 1], { done: [0] })]);
  ANIM['Longest Palindrome'] = W('Count pairs', C_LP, r.steps);
}

const C_KP = `
if (k > s.length()) return false;
for (int c : cnt) odd += c % 2;
return odd <= k;`;
{
  const s = 'annabelle', L = ['a', 'b', 'e', 'l', 'n'], c = counts(s, L), r = recorder(), odd = c.filter(v => v % 2).length;
  r.step(ln(C_KP, 'odd += c % 2'), `s = "${s}": odd counts for ${L.filter((_, i) => c[i] % 2).join(', ')} → ${odd}.`, [CL('cnt', L, c, { warn: c.map((v, i) => v % 2 ? i : -1).filter(i => i >= 0) })], { odd });
  r.step(ln(C_KP, 'return'), `k = 2: ${odd} ≤ 2 → <b>true</b> ("anna" + "elble"). k = 1 would fail.`, [R('k = 2', ['anna', 'elble'], { done: [0, 1] })]);
  ANIM['Construct K Palindrome Strings'] = W('Count odds', C_KP, r.steps);
}

const C_HA = `
for (int i = 0; i < n / 2; i++) {
    if (isVowel(s.charAt(i))) diff++;
    if (isVowel(s.charAt(n / 2 + i))) diff--;
}
return diff == 0;`;
{
  const s = 'textbook', r = recorder(), n = s.length; let diff = 0;
  for (let i = 0; i < n / 2; i++) { const a = 'aeiouAEIOU'.includes(s[i]), b = 'aeiouAEIOU'.includes(s[n / 2 + i]); diff += (a ? 1 : 0) - (b ? 1 : 0); r.step(ln(C_HA, 'diff--'), `'${s[i]}' vs '${s[n / 2 + i]}' → diff ${diff}.`, [lane('s', s.split(''), { active: [i, n / 2 + i], warn: [i, n / 2 + i].filter(j => 'aeiou'.includes(s[j])) })], { diff }); }
  r.step(ln(C_HA, 'return'), `diff = ${diff} → <b>${diff === 0}</b>.`, [R('answer', [String(diff === 0)], diff === 0 ? { done: [0] } : { bad: [0] })]);
  ANIM['Determine if String Halves Are Alike'] = W('Balance', C_HA, r.steps);
}

const C_BS = `
for (int i = 0; i < s.length(); i++) {
    if (s.charAt(i) == goal.charAt(i)) continue;
    if (first == -1) first = i;
    else if (second == -1) second = i;
    else return false;
}
return second != -1 && s.charAt(first) == goal.charAt(second) && s.charAt(second) == goal.charAt(first);`;
{
  const s = 'abcd', g = 'cbad', r = recorder();
  r.step(ln(C_BS, 'if (s.charAt(i) == goal'), `s = "${s}", goal = "${g}". Mismatches at 0 and 2.`, [lane('s', s.split(''), { warn: [0, 2] }), lane('goal', g.split(''), { warn: [0, 2] })]);
  r.step(ln(C_BS, 'return second'), "s[0] = 'a' = goal[2] and s[2] = 'c' = goal[0] → swapping fixes both → <b>true</b>.", [lane('s', s.split(''), { done: [0, 2] }), lane('goal', g.split(''), { done: [0, 2] })]);
  r.step(0, 'Special case "aa" vs "aa": already equal, but a repeated letter can be swapped harmlessly → true. "ab" vs "ab" → false.', [R('equal case', ['aa ✓', 'ab ✗'])]);
  ANIM['Buddy Strings'] = W('Mismatch scan', C_BS, r.steps);
}

const C_OS = `
if (first == -1) return true;
return second != -1 && s1.charAt(first) == s2.charAt(second) && s1.charAt(second) == s2.charAt(first);`;
{
  const r = recorder();
  r.step(ln(C_OS, 'return second'), '"bank" vs "kanb": mismatches 0 and 3 cross → <b>true</b>.', [lane('s1', 'bank'.split(''), { done: [0, 3] }), lane('s2', 'kanb'.split(''), { done: [0, 3] })]);
  r.step(ln(C_OS, 'return second'), '"attack" vs "defend": more than two mismatches → <b>false</b>.', [lane('s1', 'attack'.split(''), { bad: [0, 1, 2, 3, 4, 5] }), lane('s2', 'defend'.split(''))]);
  r.step(ln(C_OS, 'if (first == -1)'), '"kelb" vs "kelb": no mismatch, no swap needed → <b>true</b>.', [lane('s1', 'kelb'.split(''), { done: [0, 1, 2, 3] })]);
  ANIM['Check if One String Swap Can Make Strings Equal'] = W('Mismatch scan', C_OS, r.steps);
}

const C_LB = `
if (first[c] == -1) first[c] = i;
else best = Math.max(best, i - first[c] - 1);`;
{
  const s = 'abca', r = recorder(); const first = {}; let best = -1;
  for (let i = 0; i < s.length; i++) { const c = s[i]; if (first[c] === undefined) { first[c] = i; r.step(ln(C_LB, 'first[c] = i'), `'${c}' first seen at ${i}.`, [lane('s', s.split(''), { active: [i], showIdx: true })], { best }); } else { best = Math.max(best, i - first[c] - 1); r.step(ln(C_LB, 'best = Math.max'), `'${c}' again at ${i}: gap ${i} − ${first[c]} − 1 = ${i - first[c] - 1}.`, [lane('s', s.split(''), { done: [first[c], i], warn: range(first[c] + 1, i - 1), showIdx: true })], { best }); } }
  ANIM['Largest Substring Between Two Equal Characters'] = W('First index', C_LB, r.steps);
}

const C_ML = `
for (int c : cnt)
    if (c > 0) len += c % 2 == 1 ? 1 : 2;`;
{
  const s = 'abaacbcbb', L = ['a', 'b', 'c'], c = counts(s, L), r = recorder();
  r.step(0, `s = "${s}".`, [CL('cnt', L, c)]);
  const f = c.map(v => v % 2 ? 1 : 2);
  r.step(ln(C_ML, 'len +='), `Each letter drops by 2 while it has a middle copy: a ${c[0]}→${f[0]}, b ${c[1]}→${f[1]}, c ${c[2]}→${f[2]}. Length <b>${f.reduce((x, y) => x + y)}</b>.`, [CL('final', L, f, { done: [0, 1, 2] })]);
  ANIM['Minimum Length of String After Operations'] = W('Counts', C_ML, r.steps);
}

const C_U3 = `
for (int c = 0; c < 26; c++) {
    if (first[c] == -1 || last[c] - first[c] < 2) continue;
    boolean[] seen = new boolean[26];
    for (int i = first[c] + 1; i < last[c]; i++) seen[s.charAt(i) - 'a'] = true;
    for (boolean b : seen) if (b) count++;
}`;
{
  const s = 'aabca', r = recorder(); let count = 0;
  for (const c of ['a', 'b', 'c']) { const f = s.indexOf(c), l = s.lastIndexOf(c); if (l - f < 2) { r.step(ln(C_U3, 'continue'), `'${c}': first ${f}, last ${l} → no room for a middle.`, [lane('s', s.split(''), { ghost: [f, l], showIdx: true })], { count }); continue; } const mids = [...new Set(s.slice(f + 1, l))]; count += mids.length; r.step(ln(C_U3, 'count++'), `'${c}' at ${f} and ${l}: middles {${mids.join(', ')}} → ${mids.map(m => c + m + c).join(', ')}.`, [lane('s', s.split(''), { done: [f, l], warn: range(f + 1, l - 1), showIdx: true })], { count }); }
  r.step(0, `Total <b>${count}</b>.`, [R('answer', [count], { done: [0] })]);
  ANIM['Unique Length-3 Palindromic Subsequences'] = W('Outer letter scan', C_U3, r.steps);
}

const C_SV = `
for (int i = 0; i < out.length; i++) {
    if (!isVowel(out[i])) continue;
    while (cnt[code] == 0) code++;
    out[i] = (char) code;
    cnt[code]--;
}`;
{
  const s = 'lEetcOde', r = recorder(), out = s.split(''), vs = s.split('').filter(c => 'aeiouAEIOU'.includes(c)).sort();
  r.step(0, `Vowels by ASCII: ${vs.join(' ')} (capitals first).`, [lane('s', out.slice()), R('sorted vowels', vs)]);
  let k = 0; out.forEach((c, i) => { if (!'aeiouAEIOU'.includes(c)) return; out[i] = vs[k++]; r.step(ln(C_SV, 'out[i] = (char) code'), `Vowel slot ${i} ← '${out[i]}'.`, [lane('s', out.slice(), { active: [i] })]); });
  r.step(0, `Result <b>"${out.join('')}"</b>.`, [lane('s', out, { done: range(0, out.length - 1) })]);
  ANIM['Sort Vowels in a String'] = W('Counting sort', C_SV, r.steps);
}

const C_VW = `
if (word.length() < 3) return false;
for (char c : word.toCharArray()) {
    if (Character.isDigit(c)) continue;
    if (!Character.isLetter(c)) return false;
    if ("aeiouAEIOU".indexOf(c) >= 0) vowel = true;
    else consonant = true;
}
return vowel && consonant;`;
{
  const run = w => { const r = recorder(); let v = false, c = false; if (w.length < 3) { r.step(ln(C_VW, 'length() < 3'), `"${w}" is too short → <b>false</b>.`, [lane('word', w.split(''), { bad: range(0, w.length - 1) })]); return r.steps; } for (let i = 0; i < w.length; i++) { const ch = w[i]; if (/\d/.test(ch)) { r.step(ln(C_VW, 'isDigit'), `'${ch}' digit.`, [lane('word', w.split(''), { active: [i] })], { vowel: String(v), consonant: String(c) }); continue; } if (!/[a-zA-Z]/.test(ch)) { r.step(ln(C_VW, 'isLetter'), `'${ch}' is not a letter or digit → <b>false</b>.`, [lane('word', w.split(''), { bad: [i] })]); return r.steps; } if ('aeiouAEIOU'.includes(ch)) v = true; else c = true; r.step(ln(C_VW, 'aeiouAEIOU'), `'${ch}' ${'aeiouAEIOU'.includes(ch) ? 'vowel' : 'consonant'}.`, [lane('word', w.split(''), { active: [i] })], { vowel: String(v), consonant: String(c) }); } r.step(ln(C_VW, 'return vowel'), `→ <b>${v && c}</b>.`, [R('answer', [String(v && c)], v && c ? { done: [0] } : { bad: [0] })]); return r.steps; };
  ANIM['Valid Word'] = [{ name: '"234Adas"', code: C_VW, steps: run('234Adas') }, { name: '"a3$e"', code: C_VW, steps: run('a3$e') }];
}
