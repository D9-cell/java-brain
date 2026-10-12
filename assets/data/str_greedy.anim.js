const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const L_ = (name, s, o = {}) => lane(name, s.split(''), o);

const C_IS = `
for (int j = 0; j < t.length() && i < s.length(); j++)
    if (s.charAt(i) == t.charAt(j)) i++;
return i == s.length();`;
{
  const s = 'abc', t = 'ahbgdc', r = recorder(); let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) { const m = s[i] === t[j]; if (m) i++; r.step(ln(C_IS, 'i++'), `t[${j}] = '${t[j]}' ${m ? `matches → i = ${i}` : `≠ '${s[i]}'`}.`, [L_('s', s, { done: range(0, i - 1), active: i < s.length ? [i] : [] }), L_('t', t, { active: [j] })], { i, j }); }
  r.step(ln(C_IS, 'return'), `i reached ${i} = |s| → <b>true</b>.`, [L_('s', s, { done: [0, 1, 2] })]);
  ANIM['Is Subsequence'] = W('Greedy pointers', C_IS, r.steps);
}

const C_AC = `
for (int i = 0; i < s.length() && j < t.length(); i++)
    if (s.charAt(i) == t.charAt(j)) j++;
return t.length() - j;`;
{
  const s = 'coaching', t = 'coding', r = recorder(); let j = 0;
  for (let i = 0; i < s.length && j < t.length; i++) if (s[i] === t[j]) { j++; r.step(ln(C_AC, 'j++'), `s[${i}] = '${s[i]}' matches t[${j - 1}].`, [L_('s', s, { active: [i] }), L_('t', t, { done: range(0, j - 1) })], { j }); }
  r.step(ln(C_AC, 'return'), `Matched "${t.slice(0, j)}"; append "${t.slice(j)}" → <b>${t.length - j}</b>.`, [L_('t', t, { done: range(0, j - 1), warn: range(j, t.length - 1) })]);
  ANIM['Append Characters to String to Make Subsequence'] = W('Greedy pointers', C_AC, r.steps);
}

const C_CI = `
char c = str1.charAt(i), need = str2.charAt(j);
if (c == need || (c - 'a' + 1) % 26 == need - 'a') j++;`;
{
  const a = 'zc', b = 'ad', r = recorder(); let j = 0;
  for (let i = 0; i < a.length && j < b.length; i++) { const c = a[i], need = b[j], ok = c === need || (c.charCodeAt(0) - 96) % 26 === need.charCodeAt(0) - 97; if (ok) j++; r.step(ln(C_CI, 'j++'), `'${c}' ${ok ? `${c === need ? 'equals' : 'increments to'} '${need}' → match` : `cannot become '${need}'`}.`, [L_('str1', a, { active: [i] }), L_('str2', b, { done: range(0, j - 1) })], { j }); }
  r.step(0, '"zc" → "ad" by incrementing both → <b>true</b>.', [R('answer', ['true'], { done: [0] })]);
  ANIM['Make String a Subsequence Using Cyclic Increments'] = W('Greedy pointers', C_CI, r.steps);
}

const C_BS = `
i = nextKept(s, i);
j = nextKept(t, j);
if (i < 0 || j < 0) return i < 0 && j < 0;
if (s.charAt(i) != t.charAt(j)) return false;`;
{
  const s = 'ab##c', t = 'ad#c', r = recorder();
  r.step(ln(C_BS, 'i = nextKept'), "Both end with 'c' (no # after it) → equal.", [L_('s', s, { done: [4] }), L_('t', t, { done: [3] })]);
  r.step(ln(C_BS, 'j = nextKept'), 's: "##" erases b and a → nothing left. t: "#" erases d, a survives.', [L_('s', s, { ghost: [0, 1, 2, 3] }), L_('t', t, { ghost: [1, 2], active: [0] })]);
  r.step(ln(C_BS, 'return i < 0'), 's ran out while t still has "a" → <b>false</b> ("c" vs "ac").', [R('typed', ['c', 'ac'], { bad: [0, 1] })]);
  ANIM['Backspace String Compare'] = W('Two backward pointers', C_BS, r.steps);
}

const C_MG = `
if (n > 0 && Math.abs(st.charAt(n - 1) - c) == 32) st.deleteCharAt(n - 1);
else st.append(c);`;
{
  const s = 'abBAcC', r = recorder(); let st = '';
  for (const c of s) { const pop = st.length && Math.abs(st.charCodeAt(st.length - 1) - c.charCodeAt(0)) === 32; st = pop ? st.slice(0, -1) : st + c; r.step(ln(C_MG, pop ? 'deleteCharAt' : 'st.append'), `'${c}' ${pop ? 'cancels the top' : 'pushed'}.`, [S('stack', st.split(''))]); }
  r.step(0, 'Everything cancelled → <b>""</b>.', [S('stack', [])]);
  ANIM['Make The String Great'] = W('Stack', C_MG, r.steps);
}

const C_RS = `
if (n > 0 && ((c == 'B' && st.charAt(n - 1) == 'A') || (c == 'D' && st.charAt(n - 1) == 'C'))) st.deleteCharAt(n - 1);
else st.append(c);`;
{
  const s = 'ABFCACDB', r = recorder(); let st = '';
  for (const c of s) { const pop = st.length && ((c === 'B' && st.endsWith('A')) || (c === 'D' && st.endsWith('C'))); st = pop ? st.slice(0, -1) : st + c; r.step(ln(C_RS, pop ? 'deleteCharAt' : 'st.append'), `'${c}' ${pop ? `completes "${st.length >= 0 ? (c === 'B' ? 'AB' : 'CD') : ''}" → pop` : 'pushed'}.`, [S('stack', st.split(''))]); }
  r.step(0, `Length <b>${st.length}</b> ("${st}").`, [S('stack', st.split(''))]);
  ANIM['Minimum String Length After Removing Substrings'] = W('Stack', C_RS, r.steps);
}

const C_MR = `
if (c == '(') open++;
else if (c == ')') {
    if (open == 0) continue;
    open--;
}
if (sb.charAt(i) == '(' && open > 0) {
    open--;
    continue;
}`;
{
  const s = 'a)b(c)d(', r = recorder(); let open = 0, keep = [];
  s.split('').forEach((c, i) => { if (c === '(') open++; else if (c === ')') { if (!open) { r.step(ln(C_MR, 'if (open == 0)'), `')' at ${i} has no open partner → drop.`, [L_('s', s, { bad: [i] })], { open }); return; } open--; } keep.push(i); });
  r.step(0, `After pass 1, ${open} '(' still open.`, [L_('s', s, { bad: [1], warn: [7] })], { open });
  r.step(ln(C_MR, 'open--;', 2), "Pass 2 from the right drops the last unmatched '(' → <b>\"ab(c)d\"</b>.", [L_('result', 'ab(c)d', { done: range(0, 5) })]);
  ANIM['Minimum Remove to Make Valid Parentheses'] = W('Two passes', C_MR, r.steps);
}

const C_RD = `
if (inStack[c - 'a']) continue;
while (st.length() > 0 && st.charAt(st.length() - 1) > c && last[st.charAt(st.length() - 1) - 'a'] > i) {
    inStack[st.charAt(st.length() - 1) - 'a'] = false;
    st.deleteCharAt(st.length() - 1);
}
st.append(c);`;
{
  const s = 'cbacdcbc', r = recorder(), last = {}; s.split('').forEach((c, i) => last[c] = i); let st = '';
  for (let i = 0; i < s.length; i++) { const c = s[i]; if (st.includes(c)) { r.step(ln(C_RD, 'continue'), `'${c}' already in the stack → skip.`, [L_('s', s, { ghost: [i] }), S('stack', st.split(''))]); continue; } const popped = []; while (st && st[st.length - 1] > c && last[st[st.length - 1]] > i) { popped.push(st[st.length - 1]); st = st.slice(0, -1); } st += c; r.step(ln(C_RD, popped.length ? 'deleteCharAt' : 'st.append(c)'), `'${c}': ${popped.length ? `pop ${popped.join(', ')} (bigger and seen again later), ` : ''}push.`, [L_('s', s, { active: [i] }), S('stack', st.split(''))]); }
  r.step(0, `Answer <b>"${st}"</b>.`, [S('stack', st.split(''))]);
  ANIM['Remove Duplicate Letters'] = W('Monotonic stack', C_RD, r.steps);
}

const C_RB = `
t.append(s.charAt(i));
while (t.length() > 0 && t.charAt(t.length() - 1) <= minSuffix[i + 1]) {
    paper.append(t.charAt(t.length() - 1));
    t.deleteCharAt(t.length() - 1);
}`;
{
  const s = 'bdda', r = recorder(), ms = []; for (let i = s.length; i >= 0; i--) ms[i] = i === s.length ? '{' : (s[i] < ms[i + 1] ? s[i] : ms[i + 1]); let t = '', paper = '';
  for (let i = 0; i < s.length; i++) { t += s[i]; while (t && t[t.length - 1] <= ms[i + 1]) { paper += t[t.length - 1]; t = t.slice(0, -1); } r.step(ln(C_RB, 'paper.append'), `Push '${s[i]}'. Smallest unread: ${ms[i + 1] === '{' ? 'none' : `'${ms[i + 1]}'`}. Pop while top ≤ it.`, [L_('s', s, { active: [i] }), S('t', t.split('')), R('paper', [paper])]); }
  r.step(0, `Paper <b>"${paper}"</b>.`, [R('paper', [paper], { done: [0] })]);
  ANIM['Using a Robot to Print the Lexicographically Smallest String'] = W('Stack + suffix min', C_RB, r.steps);
}

const C_RL = `
int use = Math.min(cnt[cur], repeatLimit);
for (int k = 0; k < use; k++) sb.append((char) ('a' + cur));
cnt[cur] -= use;
if (cnt[cur] == 0) continue;
int next = cur - 1;
while (next >= 0 && cnt[next] == 0) next--;
if (next < 0) break;
sb.append((char) ('a' + next));
cnt[next]--;`;
{
  const r = recorder(); let out = '';
  r.step(0, 's = "cczazcc", limit 3: z×2, c×4, a×1.', [R('counts', ['z2', 'c4', 'a1'])]);
  out += 'zz'; r.step(ln(C_RL, 'sb.append((char) (\'a\' + cur))'), 'Take both z (under the limit); z is used up.', [R('result', [out])]);
  out += 'ccc'; r.step(ln(C_RL, 'cnt[cur] -= use'), 'Take c three times (the limit); one c remains.', [R('result', [out])]);
  out += 'a'; r.step(ln(C_RL, 'cnt[next]--'), 'Separate with one a.', [R('result', [out])]);
  out += 'c'; r.step(0, `Last c → <b>"${out}"</b>.`, [R('result', [out], { done: [0] })]);
  ANIM['Construct String With Repeat Limit'] = W('Counts + greedy', C_RL, r.steps);
}

const C_BX = `
int n = word.length(), maxLen = n - numFriends + 1;
for (int i = 0; i < n; i++) {
    String cand = word.substring(i, Math.min(n, i + maxLen));
    if (cand.compareTo(best) > 0) best = cand;
}`;
{
  const w = 'dbca', f = 2, r = recorder(), maxLen = w.length - f + 1; let best = '';
  r.step(ln(C_BX, 'maxLen'), `word = "${w}", 2 friends → a piece is at most ${maxLen} long.`, [L_('word', w)], { maxLen });
  for (let i = 0; i < w.length; i++) { const c = w.slice(i, Math.min(w.length, i + maxLen)); const better = c > best; if (better) best = c; r.step(ln(C_BX, 'best = cand'), `Start ${i}: "${c}" ${better ? '→ new best' : ''}.`, [L_('word', w, { active: range(i, Math.min(w.length, i + maxLen) - 1) })], { best }); }
  r.step(0, `Answer <b>"${best}"</b>.`, [R('answer', [best], { done: [0] })]);
  ANIM['Find the Lexicographically Largest String From the Box I'] = W('Try every start', C_BX, r.steps);
}

const C_OQ = `
if (k > 1) {
    char[] c = s.toCharArray();
    Arrays.sort(c);
    return new String(c);
}
for (int i = 1; i < s.length(); i++) {
    String rot = s.substring(i) + s.substring(0, i);
    if (rot.compareTo(best) < 0) best = rot;
}`;
{
  const s = 'cba', r = recorder(); let best = s;
  for (let i = 1; i < s.length; i++) { const rot = s.slice(i) + s.slice(0, i); if (rot < best) best = rot; r.step(ln(C_OQ, 'String rot'), `k = 1, rotation "${rot}" → best "${best}".`, [L_('rotation', rot)], { best }); }
  r.step(ln(C_OQ, 'Arrays.sort'), 'k = 2 on "baaca": any order is reachable → sort → <b>"aaabc"</b>.', [L_('sorted', 'aaabc', { done: range(0, 4) })]);
  ANIM['Orderly Queue'] = W('Rotations or sort', C_OQ, r.steps);
}

const C_OE = `
if (s.charAt(i) != t.charAt(i)) {
    if (s.length() == t.length()) return s.substring(i + 1).equals(t.substring(i + 1));
    return s.substring(i).equals(t.substring(i + 1));
}`;
{
  const r = recorder();
  r.step(ln(C_OE, 's.substring(i).equals'), '"ab" vs "acb": first mismatch at 1; lengths differ → skip t[1]: "b" == "b" → <b>true</b> (insert c).', [L_('s', 'ab', { active: [1] }), L_('t', 'acb', { warn: [1], done: [2] })]);
  r.step(ln(C_OE, 's.length() == t.length()'), '"cab" vs "cad": mismatch at 2, same length → rest after it is "" == "" → <b>true</b> (replace).', [L_('s', 'cab', { active: [2] }), L_('t', 'cad', { active: [2] })]);
  r.step(ln(C_OE, 's.length() == t.length()'), '"1203" vs "1213": mismatch at 2, rest "3" == "3" → true.', [L_('s', '1203', { active: [2] }), L_('t', '1213', { active: [2] })]);
  ANIM['One Edit Distance'] = W('First mismatch', C_OE, r.steps);
}

const C_TE = `
for (int i = 0; i < q.length() && diff <= 2; i++)
    if (q.charAt(i) != d.charAt(i)) diff++;
if (diff <= 2) {
    out.add(q);
    break;
}`;
{
  const qs = ['word', 'note', 'ants'], ds = ['wood', 'joke', 'moat'], r = recorder(), out = [];
  for (const q of qs) { let hit = null; for (const d of ds) { const diff = q.split('').filter((c, i) => c !== d[i]).length; if (diff <= 2) { hit = [d, diff]; break; } } if (hit) out.push(q); r.step(ln(C_TE, hit ? 'out.add' : 'diff++'), hit ? `"${q}" vs "${hit[0]}": ${hit[1]} difference${hit[1] === 1 ? '' : 's'} → keep.` : `"${q}" is 3+ letters from every word → drop.`, [R('kept', out)]); }
  ANIM['Words Within Two Edits of Dictionary'] = W('Pairwise compare', C_TE, r.steps);
}

const C_SC = `
int best = dp(i + 1, k - 1), same = 0, diff = 0;
for (int j = i; j < s.length() && diff <= k; j++) {
    if (s.charAt(j) == s.charAt(i)) same++;
    else diff++;
    best = Math.min(best, encoded(same) + dp(j + 1, k - diff));
}`;
{
  const r = recorder();
  r.step(0, 's = "aaabcccd", k = 2. Encoded as is: "a3bc3d" = 6.', [L_('s', 'aaabcccd')]);
  r.step(ln(C_SC, 'int best = dp(i + 1'), 'Option: delete s[i]. Option: keep a run of s[i]\'s letter, deleting other letters inside it.', [L_('s', 'aaabcccd', { active: [0, 1, 2] })]);
  r.step(ln(C_SC, 'encoded(same)'), 'Keep "aaa" (2 chars), delete b and d with both deletions, keep "ccc" (2 chars) → "a3c3".', [L_('s', 'aaabcccd', { done: [0, 1, 2, 4, 5, 6], bad: [3, 7] })]);
  r.step(0, 'Answer <b>4</b>.', [R('answer', [4], { done: [0] })]);
  ANIM['String Compression II'] = W('Top-down DP', C_SC, r.steps);
}

const C_ST = `
for (int i = 0; i + m <= n; i++) {
    if (visited[i]) continue;
    int changed = unstamp(t, stamp, i);
    if (changed < 0) continue;
    visited[i] = true;
    done += changed;
    order.add(i);
}`;
{
  const stamp = 'abc', r = recorder(); let t = 'ababc'.split(''); const order = [];
  r.step(0, 'stamp "abc", target "ababc". Undo stamps from the last one.', [lane('target', t.slice(), { showIdx: true })]);
  const tryAt = i => { let ch = 0; for (let k = 0; k < 3; k++) { if (t[i + k] === '?') continue; if (t[i + k] !== stamp[k]) return -1; ch++; } if (!ch) return -1; for (let k = 0; k < 3; k++) t[i + k] = '?'; return ch; };
  for (const i of [2, 0]) { const ch = tryAt(i); order.push(i); r.step(ln(C_ST, 'order.add'), `Window ${i} matches "${stamp}" (using ? as wildcards) → un-stamp ${ch} letter${ch === 1 ? '' : 's'}.`, [lane('target', t.slice(), { warn: [i, i + 1, i + 2], showIdx: true })]); }
  r.step(0, `All ? → reverse the order: stamp at <b>[${order.slice().reverse()}]</b>.`, [R('moves', order.slice().reverse(), { done: [0, 1] })]);
  ANIM['Stamping The Sequence'] = W('Reverse stamping', C_ST, r.steps);
}

const C_CW = `
for (int j = 1; j <= n; j++)
    for (int i = 0; i < j && !can[j]; i++)
        can[j] = can[i] && dict.contains(w.substring(i, j));`;
{
  const w = 'catsdogcats', dict = new Set(['cat', 'cats', 'dog', 'rat']), r = recorder(), can = Array(w.length + 1).fill(false); can[0] = true;
  for (let j = 1; j <= w.length; j++) for (let i = 0; i < j && !can[j]; i++) if (can[i] && dict.has(w.slice(i, j))) { can[j] = true; r.step(ln(C_CW, 'can[j] = can[i]'), `can[${j}]: can[${i}] and "${w.slice(i, j)}" is a word.`, [L_('w', w, { done: range(0, i - 1), active: range(i, j - 1) }), A('can', can.map(b => b ? 1 : 0))]); }
  r.step(0, `can[${w.length}] = ${can[w.length]} → "catsdogcats" is <b>concatenated</b>.`, [A('can', can.map(b => b ? 1 : 0), { done: [w.length] })]);
  ANIM['Concatenated Words'] = W('Word break per word', C_CW, r.steps);
}

const C_SU = `
for (String x : subs) owners.merge(x, 1, Integer::sum);
for (int len = 1; len <= w.length() && best.isEmpty(); len++)
    for (int i = 0; i + len <= w.length(); i++) {
        String x = w.substring(i, i + len);
        if (owners.get(x) == 1 && (best.isEmpty() || x.compareTo(best) < 0)) best = x;
    }`;
{
  const arr = ['cab', 'ad', 'bad', 'c'], r = recorder();
  r.step(ln(C_SU, 'owners.merge'), 'Count owners of every substring across the words.', [R('words', arr)]);
  const res = arr.map((w, k) => { for (let len = 1; len <= w.length; len++) { const c = []; for (let i = 0; i + len <= w.length; i++) { const x = w.slice(i, i + len); if (arr.filter((o, j) => j !== k && o.includes(x)).length === 0) c.push(x); } if (c.length) return c.sort()[0]; } return ''; });
  arr.forEach((w, k) => r.step(ln(C_SU, 'best = x'), `"${w}" → ${res[k] ? `"${res[k]}"` : '"" (every substring appears elsewhere)'}.`, [R('answers', res.slice(0, k + 1).map(x => x || '""'), { active: [k] })]));
  ANIM['Shortest Uncommon Substring in an Array'] = W('Substring counts', C_SU, r.steps);
}

const C_SM = `
for (int i = 0; i < words.length; i++)
    for (int j = 0; j < words.length; j++)
        if (i != j && words[j].contains(words[i])) {
            out.add(words[i]);
            break;
        }`;
{
  const ws = ['mass', 'as', 'hero', 'superhero'], r = recorder(), out = [];
  ws.forEach((w, i) => { const j = ws.findIndex((o, k) => k !== i && o.includes(w)); if (j >= 0) out.push(w); r.step(ln(C_SM, j >= 0 ? 'out.add' : 'contains'), j >= 0 ? `"${w}" is inside "${ws[j]}" → keep.` : `"${w}" is inside no other word.`, [R('words', ws, { active: [i], done: j >= 0 ? [j] : [] }), R('result', out)]); });
  ANIM['String Matching in an Array'] = W('Double loop', C_SM, r.steps);
}
