const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const runsOf = s => { const o = []; for (let i = 0; i < s.length;) { let j = i; while (j < s.length && s[j] === s[i]) j++; o.push([i, j]); i = j; } return o; };

const C_RR = `
if (c == 'U') y++;
else if (c == 'D') y--;
else if (c == 'L') x--;
else x++;
return x == 0 && y == 0;`;
{
  const m = 'UDLLRR', r = recorder(); let x = 0, y = 0;
  m.split('').forEach((c, i) => { if (c === 'U') y++; else if (c === 'D') y--; else if (c === 'L') x--; else x++; r.step(ln(C_RR, c === 'U' ? 'y++' : c === 'D' ? 'y--' : c === 'L' ? 'x--' : 'else x++'), `'${c}' → (${x}, ${y}).`, [lane('moves', m.split(''), { active: [i], done: range(0, i - 1) })], { x, y }); });
  r.step(ln(C_RR, 'return'), 'Back at (0, 0) → <b>true</b>.', [R('answer', ['true'], { done: [0] })]);
  ANIM['Robot Return to Origin'] = W('Track x and y', C_RR, r.steps);
}

const C_FP = `
return Math.abs(l - r) + blank;`;
{
  const m = 'L_RL__R', r = recorder();
  r.step(0, `moves "${m}": L = 2, R = 2, blanks = 3.`, [lane('moves', m.split(''), { warn: [1, 4, 5] })], { l: 2, r: 2, blank: 3 });
  r.step(ln(C_FP, 'return'), 'Fixed moves cancel; send all 3 blanks the same way → <b>3</b>.', [R('answer', [3], { done: [0] })]);
  ANIM['Furthest Point From Origin'] = W('Count', C_FP, r.steps);
}

const C_CS = `
for (int i = 0; i < s.length(); ) {
    int j = i;
    while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
    sb.append(j - i).append(s.charAt(i));
    i = j;
}`;
{
  const r = recorder(); let s = '1';
  for (let t = 2; t <= 6; t++) { const rr = runsOf(s), nx = rr.map(([i, j]) => `${j - i}${s[i]}`).join(''); r.step(ln(C_CS, 'sb.append(j - i)'), `Term ${t - 1} "${s}" reads as ${rr.map(([i, j]) => `${j - i}×${s[i]}`).join(', ')} → "${nx}".`, [lane(`term ${t - 1}`, s.split(''), { active: rr.flatMap(([i, j], k) => k % 2 ? [] : range(i, j - 1)), warn: rr.flatMap(([i, j], k) => k % 2 ? range(i, j - 1) : []) }), lane(`term ${t}`, nx.split(''))]); s = nx; }
  ANIM['Count and Say'] = W('Iterate runs', C_CS, r.steps);
}

const C_SC = `
while (i < chars.length) {
    int j = i;
    while (j < chars.length && chars[j] == chars[i]) j++;
    chars[write++] = chars[i];
    if (j - i > 1)
        for (char d : String.valueOf(j - i).toCharArray()) chars[write++] = d;
    i = j;
}`;
{
  const src = 'abbbbbbbbbbbbc'.split(''), a = src.slice(), r = recorder(); let w = 0;
  r.step(0, 'chars = a, twelve b, c.', [lane('chars', a.slice(), { showIdx: true })]);
  for (const [i, j] of runsOf(src.join(''))) { a[w++] = src[i]; if (j - i > 1) for (const d of String(j - i)) a[w++] = d; r.step(ln(C_SC, j - i > 1 ? 'chars[write++] = d' : 'chars[write++] = chars[i]'), `Run '${src[i]}' × ${j - i} → write ${src[i]}${j - i > 1 ? j - i : ''}; write = ${w}.`, [lane('chars', a.slice(), { done: range(0, w - 1), active: range(i, j - 1).filter(k => k >= w), showIdx: true })], { read: j, write: w }); }
  r.step(0, `Return <b>${w}</b>: "${a.slice(0, w).join('')}".`, [lane('chars', a.slice(0, w), { done: range(0, w - 1) })]);
  ANIM['String Compression'] = W('Two pointers', C_SC, r.steps);
}

const C_C3 = `
while (j < word.length() && j - i < 9 && word.charAt(j) == word.charAt(i)) j++;
sb.append(j - i).append(word.charAt(i));`;
{
  const w = 'aaaaaaaaaaaaaabb', r = recorder(); let i = 0, out = '';
  while (i < w.length) { let j = i; while (j < w.length && j - i < 9 && w[j] === w[i]) j++; out += `${j - i}${w[i]}`; r.step(ln(C_C3, 'sb.append'), `Take ${j - i} × '${w[i]}'${j - i === 9 && w[j] === w[i] ? ' (capped at 9)' : ''} → "${out}".`, [lane('word', w.split(''), { done: range(0, i - 1), active: range(i, j - 1) })]); i = j; }
  ANIM['String Compression III'] = W('Capped runs', C_C3, r.steps);
}

const C_SL = `
for (int i = a.length - 1; i >= 0; i--) {
    suffix = (suffix + shifts[i]) % 26;
    a[i] = (char) ('a' + (a[i] - 'a' + suffix) % 26);
}`;
{
  const s = 'abc', sh = [3, 5, 9], r = recorder(), a = s.split(''); let suf = 0;
  r.step(0, 'shifts[i] moves letters 0..i, so letter i moves by the sum of shifts[i..].', [lane('s', a.slice()), A('shifts', sh)]);
  for (let i = a.length - 1; i >= 0; i--) { suf = (suf + sh[i]) % 26; a[i] = String.fromCharCode(97 + (a[i].charCodeAt(0) - 97 + suf) % 26); r.step(ln(C_SL, "a[i] = (char)"), `i = ${i}: suffix ${suf} → '${a[i]}'.`, [lane('s', a.slice(), { active: [i], done: range(i + 1, 2) }), A('shifts', sh, { warn: range(i, 2) })], { suffix: suf }); }
  r.step(0, `Result <b>"${a.join('')}"</b>.`, [lane('s', a, { done: [0, 1, 2] })]);
  ANIM['Shifting Letters'] = W('Suffix sum', C_SL, r.steps);
}

const C_DS = `
for (int start = 0; start < cols; start++)
    for (int r = 0, c = start; r < rows && c < cols; r++, c++) sb.append(encodedText.charAt(r * cols + c));
while (end > 0 && sb.charAt(end - 1) == ' ') end--;`;
{
  const t = 'ch   ie   pr', rows = 3, cols = t.length / rows, g = range(0, rows - 1).map(r => t.slice(r * cols, (r + 1) * cols).split('').map(c => c === ' ' ? '␣' : c)), rec = recorder(); let out = '';
  rec.step(0, `encodedText in a ${rows} × ${cols} grid, row by row.`, [G('grid', g)]);
  for (let st = 0; st < cols; st++) { const cells = []; for (let r = 0, c = st; r < rows && c < cols; r++, c++) { out += t[r * cols + c]; cells.push([r, c, 'active']); } rec.step(ln(C_DS, 'sb.append'), `Diagonal from column ${st}: "${out.replace(/ /g, '␣')}".`, [G('grid', g, cells)]); }
  rec.step(ln(C_DS, 'end--'), `Trim trailing spaces → <b>"${out.trimEnd()}"</b>.`, [R('text', [out.trimEnd()], { done: [0] })]);
  ANIM['Decode the Slanted Ciphertext'] = W('Read diagonals', C_DS, rec.steps);
}

const C_P1 = `
if (c == '*') {
    if (res.length() > 0) res.deleteCharAt(res.length() - 1);
} else if (c == '#') res.append(res.toString());
else if (c == '%') res.reverse();
else res.append(c);`;
{
  const s = 'a#b%*', r = recorder(); let res = '';
  for (const c of s) { if (c === '*') res = res.slice(0, -1); else if (c === '#') res += res; else if (c === '%') res = res.split('').reverse().join(''); else res += c; r.step(ln(C_P1, c === '*' ? 'deleteCharAt' : c === '#' ? 'res.toString' : c === '%' ? 'reverse' : 'else res.append'), `'${c}' → "${res}".`, [lane('s', s.split(''), { active: [s.indexOf(c)] }), lane('result', res.split(''))]); }
  ANIM['Process String with Special Operations I'] = W('Simulate', C_P1, r.steps);
}

const C_P2 = `
for (int i = s.length() - 1; i >= 0; i--) {
    char c = s.charAt(i);
    if (c == '*') len++;
    else if (c == '%') k = len - 1 - k;
    else if (c == '#') {
        len /= 2;
        if (k >= len) k -= len;
    } else {
        len--;
        if (k == len) return c;
    }
}`;
{
  const s = 'cd%#*#', r = recorder(); let len = 0; const lens = [];
  for (const c of s) { if (c === '*') len = Math.max(0, len - 1); else if (c === '#') len *= 2; else if (c !== '%') len++; lens.push(len); }
  r.step(0, `Forward pass keeps only lengths: ${lens.join(', ')}. Final length ${len}; k = 3.`, [lane('s', s.split(''), { showIdx: true }), A('length after', lens)], { len, k: 3 });
  let k = 3;
  for (let i = s.length - 1; i >= 0; i--) { const c = s[i]; let msg; if (c === '*') { len++; msg = '* undone: one more character existed, k unchanged.'; } else if (c === '%') { k = len - 1 - k; msg = `% mirrors k → ${k}.`; } else if (c === '#') { len /= 2; if (k >= len) k -= len; msg = `# halves: len ${len}, k folds to ${k}.`; } else { len--; if (k === len) { r.step(ln(C_P2, 'return c'), `Letter '${c}' sits at index ${len} = k → <b>'${c}'</b>.`, [lane('s', s.split(''), { done: [i] })], { len, k }); break; } msg = `Letter '${c}' was at ${len}, not k.`; } r.step(ln(C_P2, c === '*' ? 'len++' : c === '%' ? 'k = len - 1 - k' : c === '#' ? 'len /= 2' : 'len--'), msg, [lane('s', s.split(''), { active: [i] })], { len, k }); }
  ANIM['Process String with Special Operations II'] = W('Length then reverse walk', C_P2, r.steps);
}

const C_DA = `
for (int i = s.length() - 1; i >= 0; i--) {
    char c = s.charAt(i);
    K %= size;
    if (K == 0 && Character.isLetter(c)) return String.valueOf(c);
    size = Character.isDigit(c) ? size / (c - '0') : size - 1;
}`;
{
  const s = 'leet2code3', r = recorder(); let size = 0; for (const c of s) size = /\d/.test(c) ? size * +c : size + 1; let K = 10;
  r.step(0, `"leet2code3" decodes to "leetleetcodeleetleetcodeleetleetcode", size ${size}. k = 10.`, [lane('s', s.split(''))], { size, k: K });
  for (let i = s.length - 1; i >= 0; i--) { const c = s[i]; K %= size; if (K === 0 && /[a-z]/.test(c)) { r.step(ln(C_DA, 'return String'), `k % size = 0 at letter '${c}' → <b>"${c}"</b>.`, [lane('s', s.split(''), { done: [i] })], { size, k: K }); break; } const ns = /\d/.test(c) ? size / +c : size - 1; r.step(ln(C_DA, 'size = Character'), `'${c}': k %= ${size} → ${K}; size → ${ns}.`, [lane('s', s.split(''), { active: [i] })], { size: ns, k: K }); size = ns; }
  ANIM['Decoded String at Index'] = W('Length then reverse walk', C_DA, r.steps);
}

const C_KC = `
return (char) ('a' + Integer.bitCount(k - 1) % 26);`;
{
  const r = recorder(); let w = 'a';
  while (w.length < 8) { w += w.split('').map(c => String.fromCharCode(97 + (c.charCodeAt(0) - 96) % 26)).join(''); r.step(0, `Append a shifted copy → "${w}".`, [lane('word', w.split(''), { showIdx: true })]); }
  r.step(ln(C_KC, 'bitCount'), 'k = 5 → index 4 = 100₂ → one set bit → shifted once → <b>\'b\'</b>.', [lane('word', w.split(''), { done: [4], showIdx: true })], { 'k − 1': '100₂' });
  ANIM['Find the K-th Character in String Game I'] = W('Popcount', C_KC, r.steps);
}

const C_DE = `
for (int len = d.length; len > 2; len--)
    for (int i = 0; i + 1 < len; i++) d[i] = (d[i] + d[i + 1]) % 10;
return d[0] == d[1];`;
{
  const r = recorder(); let d = '3902'.split('').map(Number);
  r.step(0, 's = "3902".', [A('digits', d)]);
  while (d.length > 2) { d = d.slice(0, -1).map((v, i) => (v + d[i + 1]) % 10); r.step(ln(C_DE, 'd[i] = (d[i]'), `Neighbour sums mod 10 → [${d}].`, [A('digits', d)]); }
  r.step(ln(C_DE, 'return'), `${d[0]} ${d[0] === d[1] ? '=' : '≠'} ${d[1]} → <b>${d[0] === d[1]}</b>.`, [A('digits', d, { done: [0, 1] })]);
  ANIM['Check If Digits Are Equal in String After Operations I'] = W('Shrink in place', C_DE, r.steps);
}

const C_FS = `
if (n >= 2 && sb.charAt(n - 1) == c && sb.charAt(n - 2) == c) continue;
sb.append(c);`;
{
  const s = 'leeetcoooode', r = recorder(); let sb = '';
  s.split('').forEach((c, i) => { const skip = sb.length >= 2 && sb.endsWith(c + c); if (!skip) sb += c; if (skip || i < 4) r.step(ln(C_FS, skip ? 'continue' : 'sb.append'), skip ? `'${c}' would be the third in a row → skip.` : `Append '${c}'.`, [lane('s', s.split(''), skip ? { bad: [i] } : { active: [i] }), lane('kept', sb.split(''))]); });
  r.step(0, `<b>"${sb}"</b>.`, [lane('kept', sb.split(''), { done: range(0, sb.length - 1) })]);
  ANIM['Delete Characters to Make Fancy String'] = W('Builder', C_FS, r.steps);
}

const C_OT = `
for (int i = 1; i < word.length(); i++)
    if (word.charAt(i) == word.charAt(i - 1)) count++;`;
{
  const w = 'abbcccc', r = recorder(); let count = 1;
  r.step(0, 'count starts at 1 (nothing was held too long).', [lane('word', w.split(''))], { count });
  for (let i = 1; i < w.length; i++) if (w[i] === w[i - 1]) { count++; r.step(ln(C_OT, 'count++'), `word[${i}] repeats '${w[i]}' → one more original (that run shorter by one more).`, [lane('word', w.split(''), { active: [i - 1, i] })], { count }); }
  r.step(0, `Answer <b>${count}</b>: abbcccc, abbccc, abbcc, abbc, abcccc.`, [R('answer', [count], { done: [0] })]);
  ANIM['Find the Original Typed String I'] = W('Count pairs', C_OT, r.steps);
}

const C_D1 = `
for (int c = 0; c < strs[0].length(); c++)
    for (int r = 1; r < strs.length; r++)
        if (strs[r].charAt(c) < strs[r - 1].charAt(c)) {
            del++;
            break;
        }`;
{
  const s = ['cba', 'daf', 'ghi'], g = s.map(x => x.split('')), r = recorder(); let del = 0;
  for (let c = 0; c < 3; c++) { const bad = range(1, 2).find(i => s[i][c] < s[i - 1][c]); if (bad !== undefined) del++; r.step(ln(C_D1, bad !== undefined ? 'del++' : 'for (int r'), `Column ${c} (${s.map(x => x[c]).join('')}) ${bad !== undefined ? 'goes down → delete' : 'is sorted'}.`, [G('strs', g, range(0, 2).map(i => [i, c, bad !== undefined ? 'bad' : 'done']))], { del }); }
  ANIM['Delete Columns to Make Sorted'] = W('Scan columns', C_D1, r.steps);
}

const C_D2 = `
for (int r = 0; r + 1 < n && !bad; r++)
    if (!decided[r] && strs[r].charAt(c) > strs[r + 1].charAt(c)) bad = true;
if (bad) {
    del++;
    continue;
}
for (int r = 0; r + 1 < n; r++)
    if (strs[r].charAt(c) < strs[r + 1].charAt(c)) decided[r] = true;`;
{
  const s = ['xga', 'xfb', 'yfa'], g = s.map(x => x.split('')), r = recorder(), dec = [false, false]; let del = 0;
  for (let c = 0; c < 3; c++) { const bad = [0, 1].some(i => !dec[i] && s[i][c] > s[i + 1][c]); if (bad) { del++; r.step(ln(C_D2, 'del++'), `Column ${c}: an undecided pair goes down → delete.`, [G('strs', g, range(0, 2).map(i => [i, c, 'bad'])), R('decided', dec.map(String))], { del }); continue; } [0, 1].forEach(i => { if (s[i][c] < s[i + 1][c]) dec[i] = true; }); r.step(ln(C_D2, 'decided[r] = true'), `Column ${c}: keep. Pairs now decided: ${dec.map((d, i) => d ? `(${i},${i + 1})` : '').filter(Boolean).join(' ') || 'none'}.`, [G('strs', g, range(0, 2).map(i => [i, c, 'done'])), R('decided', dec.map(String), { done: dec.map((d, i) => d ? i : -1).filter(i => i >= 0) })], { del }); }
  ANIM['Delete Columns to Make Sorted II'] = W('Greedy with decided pairs', C_D2, r.steps);
}

const C_LO = `
for (int i = num.length() - 1; i >= 0; i--)
    if ((num.charAt(i) - '0') % 2 == 1) return num.substring(0, i + 1);`;
{
  const n = '35427', r = recorder(), m = '52046';
  r.step(ln(C_LO, 'return num.substring'), `"${n}": last digit 7 is odd → the whole string <b>"${n}"</b>.`, [lane('num', n.split(''), { done: range(0, 4) })]);
  r.step(ln(C_LO, '% 2 == 1'), `"${m}": scan from the right, 6, 4, 0, 2 even, 5 odd → <b>"5"</b>.`, [lane('num', m.split(''), { done: [0], ghost: [1, 2, 3, 4] })]);
  ANIM['Largest Odd Number in String'] = W('Backward scan', C_LO, r.steps);
}

const C_L3 = `
for (int i = 2; i < num.length(); i++)
    if (num.charAt(i) == num.charAt(i - 1) && num.charAt(i) == num.charAt(i - 2)) best = (char) Math.max(best, num.charAt(i));`;
{
  const n = '6777133339', r = recorder(); let best = '';
  for (let i = 2; i < n.length; i++) if (n[i] === n[i - 1] && n[i] === n[i - 2]) { if (n[i] > best) best = n[i]; r.step(ln(C_L3, 'best = (char)'), `Triple "${n[i].repeat(3)}" at ${i - 2}..${i}; best = '${best}'.`, [lane('num', n.split(''), { active: [i - 2, i - 1, i] })], { best }); }
  r.step(0, `Answer <b>"${best.repeat(3)}"</b>.`, [R('answer', [best.repeat(3)], { done: [0] })]);
  ANIM['Largest 3-Same-Digit Number in String'] = W('Window scan', C_L3, r.steps);
}

const C_FF = `
for (String w : words) {
    int l = 0, r = w.length() - 1;
    while (l < r && w.charAt(l) == w.charAt(r)) {
        l++;
        r--;
    }
    if (l >= r) return w;
}`;
{
  const ws = ['abc', 'car', 'ada', 'racecar'], r = recorder();
  for (const w of ws) { let l = 0, q = w.length - 1; while (l < q && w[l] === w[q]) { l++; q--; } const ok = l >= q; r.step(ln(C_FF, ok ? 'return w' : 'while (l < r'), `"${w}": ${ok ? 'pointers met → palindrome → <b>return it</b>' : `'${w[l]}' ≠ '${w[q]}'`}.`, [lane(w, w.split(''), ok ? { done: range(0, w.length - 1) } : { bad: [l, q] })]); if (ok) break; }
  ANIM['Find First Palindromic String in the Array'] = W('Two pointers', C_FF, r.steps);
}
