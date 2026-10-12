const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const chars = s => s.split('').map(c => c === ' ' ? '␣' : c);

const C_LW = `
while (i >= 0 && s.charAt(i) == ' ') i--;
while (i >= 0 && s.charAt(i) != ' ') {
    len++;
    i--;
}`;
{
  const s = 'fly me   to the moon  ', r = recorder(); let i = s.length - 1, len = 0;
  while (i >= 0 && s[i] === ' ') i--;
  r.step(ln(C_LW, "== ' '"), `Skip ${s.length - 1 - i} trailing spaces.`, [lane('s', chars(s), { ghost: range(i + 1, s.length - 1), active: [i] })], { i });
  const end = i; while (i >= 0 && s[i] !== ' ') { len++; i--; }
  r.step(ln(C_LW, 'len++'), `Count letters until a space: "${s.slice(i + 1, end + 1)}" → <b>${len}</b>.`, [lane('s', chars(s), { done: range(i + 1, end) })], { len });
  ANIM['Length of Last Word'] = W('Backward scan', C_LW, r.steps);
}

const C_RW = `
while (i >= 0) {
    while (i >= 0 && s.charAt(i) == ' ') i--;
    if (i < 0) break;
    int end = i;
    while (i >= 0 && s.charAt(i) != ' ') i--;
    if (sb.length() > 0) sb.append(' ');
    sb.append(s, i + 1, end + 1);
}`;
{
  const s = '  the sky  is blue ', r = recorder(); let i = s.length - 1; const out = [];
  r.step(0, 'Walk from the right; extra spaces are never copied.', [lane('s', chars(s))]);
  while (i >= 0) { while (i >= 0 && s[i] === ' ') i--; if (i < 0) break; const end = i; while (i >= 0 && s[i] !== ' ') i--; out.push(s.slice(i + 1, end + 1)); r.step(ln(C_RW, 'sb.append(s'), `Word "${out[out.length - 1]}" → output "${out.join(' ')}".`, [lane('s', chars(s), { active: range(i + 1, end) }), R('output', out)]); }
  r.step(0, `Result <b>"${out.join(' ')}"</b>.`, [R('output', out, { done: range(0, out.length - 1) })]);
  ANIM['Reverse Words in a String'] = W('Right-to-left words', C_RW, r.steps);
}

const C_R2 = `
reverse(s, 0, s.length - 1);
int start = 0;
for (int i = 0; i <= s.length; i++)
    if (i == s.length || s[i] == ' ') {
        reverse(s, start, i - 1);
        start = i + 1;
    }`;
{
  const s = 'the sky is blue'.split(''), r = recorder();
  r.step(0, 'Words in place, single spaces.', [lane('s', chars(s.join('')))]);
  s.reverse(); r.step(ln(C_R2, 'reverse(s, 0'), 'Reverse everything: word order is right, letters are backwards.', [lane('s', chars(s.join('')), { warn: range(0, s.length - 1) })]);
  let start = 0; for (let i = 0; i <= s.length; i++) if (i === s.length || s[i] === ' ') { const w = s.slice(start, i).reverse(); s.splice(start, i - start, ...w); r.step(ln(C_R2, 'reverse(s, start'), `Reverse word [${start}, ${i - 1}] → "${w.join('')}".`, [lane('s', chars(s.join('')), { done: range(start, i - 1) })]); start = i + 1; }
  ANIM['Reverse Words in a String II'] = W('Two reversals', C_R2, r.steps);
}

const C_R3 = `
if (i == a.length || a[i] == ' ') {
    for (int l = start, r = i - 1; l < r; l++, r--) {
        char t = a[l];
        a[l] = a[r];
        a[r] = t;
    }
    start = i + 1;
}`;
{
  const a = "Let's take".split(''), r = recorder(); let start = 0;
  r.step(0, 'Reverse each word, keep the order.', [lane('a', chars(a.join('')))]);
  for (let i = 0; i <= a.length; i++) if (i === a.length || a[i] === ' ') { a.splice(start, i - start, ...a.slice(start, i).reverse()); r.step(ln(C_R3, 'a[r] = t'), `Word at [${start}, ${i - 1}] reversed.`, [lane('a', chars(a.join('')), { done: range(start, i - 1) })]); start = i + 1; }
  ANIM['Reverse Words in a String III'] = W('Reverse each word', C_R3, r.steps);
}

const C_RP = `
int j = word.indexOf(ch);
if (j == -1) return word;
return new StringBuilder(word.substring(0, j + 1)).reverse() + word.substring(j + 1);`;
{
  const w = 'abcdefd', r = recorder(), j = w.indexOf('d');
  r.step(ln(C_RP, 'indexOf'), `First 'd' at ${j}.`, [lane('word', w.split(''), { active: [j], showIdx: true })], { j });
  const out = w.slice(0, j + 1).split('').reverse().join('') + w.slice(j + 1);
  r.step(ln(C_RP, 'reverse()'), `Reverse [0, ${j}] → <b>"${out}"</b>.`, [lane('word', out.split(''), { done: range(0, j) })]);
  ANIM['Reverse Prefix of Word'] = W('indexOf + reverse', C_RP, r.steps);
}

const C_DG = `
for (int g = 0; g < groups; g++) {
    StringBuilder sb = new StringBuilder();
    for (int i = g * k; i < (g + 1) * k; i++) sb.append(i < s.length() ? s.charAt(i) : fill);
    out[g] = sb.toString();
}`;
{
  const s = 'abcdefghij', k = 3, r = recorder(), out = [];
  for (let g = 0; g < Math.ceil(s.length / k); g++) { let t = ''; for (let i = g * k; i < (g + 1) * k; i++) t += i < s.length ? s[i] : 'x'; out.push(t); r.step(ln(C_DG, 'sb.append'), `Group ${g}: "${t}"${t.includes('x') ? ' (padded with x)' : ''}.`, [lane('s', s.split(''), { active: range(g * k, Math.min(s.length, (g + 1) * k) - 1) }), R('groups', out)]); }
  ANIM['Divide a String Into Groups of Size k'] = W('Chunk and pad', C_DG, r.steps);
}

const C_AS = `
for (int i = 0; i < s.length(); i++) {
    if (j < spaces.length && spaces[j] == i) {
        sb.append(' ');
        j++;
    }
    sb.append(s.charAt(i));
}`;
{
  const s = 'LeetcodeHelpsMeLearn', sp = [8, 13, 15], r = recorder(); let out = '', j = 0;
  r.step(0, `spaces = [${sp}].`, [lane('s', s.split(''), { warn: sp, showIdx: true })]);
  for (let i = 0; i < s.length; i++) { if (j < sp.length && sp[j] === i) { out += ' '; j++; r.step(ln(C_AS, "sb.append(' ')"), `i = ${i} is the next space index → insert a space.`, [lane('s', s.split(''), { active: [i] }), R('output', [out.trim().split(' ').join(' ␣ ')])], { j }); } out += s[i]; }
  r.step(0, `<b>"${out}"</b>.`, [R('output', out.split(' '), { done: [0, 1, 2, 3] })]);
  ANIM['Adding Spaces to a String'] = W('Merge pass', C_AS, r.steps);
}

const C_AE = `
if (word1[w1].charAt(c1) != word2[w2].charAt(c2)) return false;
if (++c1 == word1[w1].length()) {
    w1++;
    c1 = 0;
}
if (++c2 == word2[w2].length()) {
    w2++;
    c2 = 0;
}`;
{
  const a = ['ab', 'c'], b = ['a', 'bc'], r = recorder(); let w1 = 0, c1 = 0, w2 = 0, c2 = 0;
  while (w1 < a.length && w2 < b.length) { r.step(ln(C_AE, 'charAt(c1) !='), `word1[${w1}][${c1}] = '${a[w1][c1]}' vs word2[${w2}][${c2}] = '${b[w2][c2]}' → equal.`, [R('word1', a, { active: [w1] }), R('word2', b, { active: [w2] })], { w1, c1, w2, c2 }); if (++c1 === a[w1].length) { w1++; c1 = 0; } if (++c2 === b[w2].length) { w2++; c2 = 0; } }
  r.step(0, 'Both arrays ended together → <b>true</b>.', [R('word1', a, { done: [0, 1] }), R('word2', b, { done: [0, 1] })]);
  ANIM['Check If Two String Arrays are Equivalent'] = W('Four pointers', C_AE, r.steps);
}

const C_TJ = `
while (j < n && letters + words[j].length() + (j - i) <= maxWidth) letters += words[j++].length();
int spaces = maxWidth - letters, each = spaces / gaps, extra = spaces % gaps;
if (k < j - 1) sb.append(" ".repeat(each + (k - i < extra ? 1 : 0)));`;
{
  const words = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], M = 16, r = recorder(); let i = 0; const out = [];
  while (i < words.length) { let j = i, letters = 0; while (j < words.length && letters + words[j].length + (j - i) <= M) letters += words[j++].length; const gaps = j - i - 1; let line;
    if (j === words.length || gaps === 0) { line = words.slice(i, j).join(' ').padEnd(M); r.step(ln(C_TJ, 'while (j < n'), `Line [${words.slice(i, j).join(', ')}]: ${j === words.length ? 'last line' : 'one word'} → left-justify and pad.`, [R('lines', [...out, line].map(x => x.replace(/ /g, '␣')), { active: [out.length] })], { letters }); }
    else { const sp = M - letters, each = Math.floor(sp / gaps), extra = sp % gaps; line = words.slice(i, j).map((w, k) => k < gaps ? w + ' '.repeat(each + (k < extra ? 1 : 0)) : w).join(''); r.step(ln(C_TJ, 'int spaces'), `Line [${words.slice(i, j).join(', ')}]: ${letters} letters, ${sp} spaces over ${gaps} gaps → ${each} each, ${extra} extra to the left.`, [R('lines', [...out, line].map(x => x.replace(/ /g, '␣')), { active: [out.length] })], { letters, each, extra }); }
    out.push(line); i = j; }
  ANIM['Text Justification'] = W('Greedy + distribute', C_TJ, r.steps);
}

const C_CV = `
while (i < version1.length() && version1.charAt(i) != '.') a = a * 10 + (version1.charAt(i++) - '0');
while (j < version2.length() && version2.charAt(j) != '.') b = b * 10 + (version2.charAt(j++) - '0');
if (a != b) return a < b ? -1 : 1;`;
{
  const v1 = '1.01', v2 = '1.001.1', p1 = v1.split('.'), p2 = v2.split('.'), r = recorder();
  for (let k = 0; k < Math.max(p1.length, p2.length); k++) { const a = k < p1.length ? +p1[k] : 0, b = k < p2.length ? +p2[k] : 0; r.step(ln(C_CV, a !== b ? 'return a < b' : 'version2.charAt(j) !='), `Revision ${k}: ${k < p1.length ? `"${p1[k]}"` : 'missing'} → ${a}, ${k < p2.length ? `"${p2[k]}"` : 'missing'} → ${b}${a !== b ? ` → <b>${a < b ? -1 : 1}</b>` : ', equal'}.`, [R('v1', p1, { active: k < p1.length ? [k] : [] }), R('v2', p2, { active: k < p2.length ? [k] : [] })], { a, b }); if (a !== b) break; }
  ANIM['Compare Version Numbers'] = W('Parse in place', C_CV, r.steps);
}

const C_FD = `
int open = parts[k].indexOf('(');
String name = parts[k].substring(0, open);
String content = parts[k].substring(open + 1, parts[k].length() - 1);
byContent.computeIfAbsent(content, x -> new ArrayList<>()).add(parts[0] + "/" + name);`;
{
  const paths = ['root/a 1.txt(abcd) 2.txt(efgh)', 'root/c 3.txt(abcd)', 'root/c/d 4.txt(efgh)', 'root 4.txt(efgh)'], r = recorder(), map = {};
  for (const p of paths) { const parts = p.split(' '); for (const f of parts.slice(1)) { const o = f.indexOf('('), name = f.slice(0, o), c = f.slice(o + 1, -1); (map[c] = map[c] || []).push(parts[0] + '/' + name); } r.step(ln(C_FD, 'computeIfAbsent'), `"${p}"`, Object.entries(map).map(([c, l]) => R(c, l))); }
  r.step(0, 'Both groups have at least two files → both are returned.', Object.entries(map).map(([c, l]) => R(c, l, { done: range(0, l.length - 1) })));
  ANIM['Find Duplicate File in System'] = W('HashMap by content', C_FD, r.steps);
}

const C_RS = `
Arrays.sort(folder);
for (String f : folder)
    if (out.isEmpty() || !f.startsWith(out.get(out.size() - 1) + "/")) out.add(f);`;
{
  const f = ['/a', '/a/b', '/c/d', '/c/d/e', '/c/f', '/c/de'].sort(), r = recorder(), out = [];
  r.step(ln(C_RS, 'Arrays.sort'), 'Sorted: parents come before their sub-folders.', [R('sorted', f)]);
  for (const x of f) { const sub = out.length && x.startsWith(out[out.length - 1] + '/'); if (!sub) out.push(x); r.step(ln(C_RS, 'startsWith'), `${x}: ${sub ? `inside ${out[out.length - 1]} → drop` : out.length > 1 && x.startsWith(out[out.length - 2]) ? `starts with ${out[out.length - 2]} but not ${out[out.length - 2]}/ → keep` : 'keep'}.`, [R('sorted', f, { active: [f.indexOf(x)] }), R('kept', out)]); }
  ANIM['Remove Sub-Folders from the Filesystem'] = W('Sort + prefix', C_RS, r.steps);
}

const C_SS = `
while (front < a.length && a[front].equals(b[front])) front++;
while (back < a.length - front && a[a.length - 1 - back].equals(b[b.length - 1 - back])) back++;
return front + back == a.length;`;
{
  const a = 'My Haley'.split(' '), b = 'My name is Haley'.split(' '), r = recorder();
  r.step(ln(C_SS, 'front++'), 'Front: "My" matches → front = 1.', [R('short', a, { done: [0] }), R('long', b, { done: [0] })], { front: 1 });
  r.step(ln(C_SS, 'back++'), 'Back: "Haley" matches → back = 1.', [R('short', a, { done: [0, 1] }), R('long', b, { done: [0, 3], warn: [1, 2] })], { front: 1, back: 1 });
  r.step(ln(C_SS, 'return'), '1 + 1 = 2 = all of the short sentence → <b>true</b>; "name is" is the inserted block.', [R('inserted', ['name', 'is'], { warn: [0, 1] })]);
  ANIM['Sentence Similarity III'] = W('Front and back match', C_SS, r.steps);
}

const C_IP = `
for (int len = 1; len <= 3 && i + len <= s.length(); len++) {
    String part = s.substring(i, i + len);
    if (part.length() > 1 && part.charAt(0) == '0') break;
    if (Integer.parseInt(part) > 255) break;
    parts.add(part);
    build(s, i + len, parts, out);
    parts.remove(parts.size() - 1);
}`;
{
  const s = '101023', r = recorder(), out = [];
  const go = (i, parts) => { if (parts.length === 4) { if (i === s.length) { out.push(parts.join('.')); r.step(ln(C_IP, 'build(s'), `Found <b>${parts.join('.')}</b>.`, [R('parts', parts, { done: [0, 1, 2, 3] }), R('found', out)]); } return; } for (let len = 1; len <= 3 && i + len <= s.length; len++) { const p = s.slice(i, i + len); if (p.length > 1 && p[0] === '0') { if (parts.length < 2) r.step(ln(C_IP, "charAt(0) == '0'"), `"${p}" has a leading zero → stop extending.`, [R('parts', [...parts, p], { bad: [parts.length] })]); break; } if (+p > 255) break; go(i + len, [...parts, p]); } };
  go(0, []);
  r.step(0, `${out.length} addresses: ${out.join(', ')}.`, [R('found', out, { done: range(0, out.length - 1) })]);
  ANIM['Restore IP Addresses'] = W('Backtracking', C_IP, r.steps);
}

const C_DC = `
for (char c : word.toCharArray())
    if (Character.isUpperCase(c)) caps++;
return caps == 0 || caps == word.length() || (caps == 1 && Character.isUpperCase(word.charAt(0)));`;
{
  const r = recorder();
  for (const w of ['USA', 'leetcode', 'Google', 'FlaG']) { const caps = w.split('').filter(c => c >= 'A' && c <= 'Z').length, ok = caps === 0 || caps === w.length || (caps === 1 && w[0] >= 'A' && w[0] <= 'Z'); r.step(ln(C_DC, 'return caps'), `"${w}": ${caps} capital${caps === 1 ? '' : 's'} → <b>${ok}</b>.`, [lane('word', w.split(''), ok ? { done: range(0, w.length - 1) } : { bad: w.split('').map((c, i) => c >= 'A' && c <= 'Z' ? i : -1).filter(i => i >= 0) })]); }
  ANIM['Detect Capital'] = W('Count capitals', C_DC, r.steps);
}
