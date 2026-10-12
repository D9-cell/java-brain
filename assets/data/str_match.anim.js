const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const L_ = (name, s, o = {}) => lane(name, s.split(''), o);
const lpsOf = p => { const l = Array(p.length).fill(0); for (let i = 1, len = 0; i < p.length;) { if (p[i] === p[len]) l[i++] = ++len; else if (len > 0) len = l[len - 1]; else l[i++] = 0; } return l; };

const C_LPS = `
for (int i = 1, len = 0; i < p.length(); ) {
    if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
    else if (len > 0) len = lps[len - 1];
    else lps[i++] = 0;
}`;
const C_KS = `
if (s.charAt(i) == p.charAt(j)) {
    i++;
    j++;
    if (j == p.length()) {
        out.add(i - j);
        j = lps[j - 1];
    }
} else if (j > 0) j = lps[j - 1];
else i++;`;
{
  const p = 'aabaaab', r = recorder(), lps = Array(p.length).fill(0);
  for (let i = 1, len = 0; i < p.length;) { if (p[i] === p[len]) { lps[i] = ++len; r.step(ln(C_LPS, 'lps[i++] = ++len'), `p[${i}] = p[${len - 1}] = '${p[i]}' → lps[${i}] = ${len}.`, [L_('p', p, { active: [i], warn: range(0, len - 1), showIdx: true }), A('lps', lps.slice())], { i, len }); i++; } else if (len > 0) { const old = len; len = lps[len - 1]; r.step(ln(C_LPS, 'len = lps[len - 1]'), `p[${i}] ≠ p[${old}] → fall back len = lps[${old - 1}] = ${len}.`, [L_('p', p, { bad: [i], showIdx: true }), A('lps', lps.slice())], { i, len }); } else { lps[i] = 0; r.step(ln(C_LPS, 'lps[i++] = 0'), `No border ends at ${i}.`, [L_('p', p, { ghost: [i], showIdx: true }), A('lps', lps.slice())], { i, len }); i++; } }
  const s = 'aabaacaabaaab', pp = 'aabaaab', l2 = lpsOf(pp), r2 = recorder(); let i = 0, j = 0;
  while (i < s.length) { if (s[i] === pp[j]) { i++; j++; if (j === pp.length) { r2.step(ln(C_KS, 'out.add'), `Full match at ${i - j}.`, [L_('s', s, { done: range(i - j, i - 1) })], { i, j }); j = l2[j - 1]; } } else if (j > 0) { const old = j; j = l2[j - 1]; r2.step(ln(C_KS, 'else if (j > 0)'), `Mismatch s[${i}] = '${s[i]}' vs p[${old}] = '${pp[old]}': keep i, jump j ${old} → ${j}.`, [L_('s', s, { bad: [i], warn: range(i - j, i - 1) }), L_('p', pp, { warn: range(0, j - 1) })], { i, j }); } else { r2.step(ln(C_KS, 'else i++'), `Mismatch with j = 0 → move i past ${i}.`, [L_('s', s, { ghost: [i] })], { i, j }); i++; } }
  ANIM['Knuth-Morris-Pratt KMP String Matching Algorithm'] = [{ name: 'Build lps', code: C_LPS, steps: r.steps }, { name: 'Search', code: C_KS, steps: r2.steps }];
}

const C_SS = `
for (int i = 0, j = 0; i < haystack.length(); ) {
    if (haystack.charAt(i) == needle.charAt(j)) {
        i++;
        j++;
        if (j == m) return i - m;
    } else if (j > 0) j = lps[j - 1];
    else i++;
}`;
{
  const h = 'sadbutsad', n = 'sad', r = recorder();
  r.step(0, 'needle "sad" has lps [0,0,0]: no self-overlap.', [L_('haystack', h, { showIdx: true }), A('lps', [0, 0, 0])]);
  r.step(ln(C_SS, 'return i - m'), 'h[0..2] = "sad" matches → return <b>0</b>.', [L_('haystack', h, { done: [0, 1, 2], showIdx: true })]);
  ANIM['Find the Index of the First Occurrence in a String'] = W('KMP', C_SS, r.steps);
}

const C_RS = `
String doubled = s + s;
return doubled.substring(1, doubled.length() - 1).contains(s);`;
{
  const r = recorder(), s = 'abab', d = (s + s).slice(1, -1);
  r.step(ln(C_RS, 'doubled = s + s'), `s + s = "${s + s}", drop the ends → "${d}".`, [L_('trimmed', d, { showIdx: true })]);
  r.step(ln(C_RS, 'contains'), `"${s}" found at index 1 of the trimmed string → <b>true</b> ("ab" × 2).`, [L_('trimmed', d, { done: [1, 2, 3, 4], showIdx: true })]);
  const t = 'aba', dt = (t + t).slice(1, -1);
  r.step(ln(C_RS, 'contains'), `"aba": trimmed "${dt}" does not contain "aba" → false.`, [L_('trimmed', dt, { bad: range(0, dt.length - 1) })]);
  ANIM['Repeated Substring Pattern'] = W('Doubling', C_RS, r.steps);
}

const C_RO = `
return s.length() == goal.length() && (s + s).contains(goal);`;
{
  const r = recorder(), s = 'abcde', g = 'cdeab';
  r.step(ln(C_RO, 'return'), `s + s = "${s + s}" contains "${g}" at index 2 → <b>true</b>.`, [L_('s + s', s + s, { done: [2, 3, 4, 5, 6], showIdx: true })]);
  ANIM['Rotate String'] = W('Doubling', C_RO, r.steps);
}

const C_SP = `
String t = s + "#" + rev;
int keep = lps[t.length() - 1];
return rev.substring(0, s.length() - keep) + s;`;
{
  const s = 'aacecaaa', rev = s.split('').reverse().join(''), t = s + '#' + rev, l = lpsOf(t), keep = l[t.length - 1], r = recorder();
  r.step(ln(C_SP, 'String t'), `t = s + "#" + reverse(s) = "${t}".`, [L_('t', t)]);
  r.step(ln(C_SP, 'int keep'), `lps at the end = ${keep}: s[0..${keep - 1}] = "${s.slice(0, keep)}" is the longest palindromic prefix.`, [L_('s', s, { done: range(0, keep - 1), warn: range(keep, s.length - 1) })], { keep });
  r.step(ln(C_SP, 'return'), `Prepend "${rev.slice(0, s.length - keep)}" → <b>"${rev.slice(0, s.length - keep) + s}"</b>.`, [L_('answer', rev.slice(0, s.length - keep) + s, { warn: range(0, s.length - keep - 1) })]);
  ANIM['Shortest Palindrome'] = W('KMP on s#rev', C_SP, r.steps);
}

const C_R1 = `
while (k * t < n && !word.startsWith(word.substring(k * t))) t++;
return t;`;
{
  const w = 'abacaba', k = 3, r = recorder();
  for (let t = 1; ; t++) { if (k * t >= w.length) { r.step(ln(C_R1, 'return'), `t = ${t}: everything replaced → ${t}.`, [L_('word', w)]); break; } const suf = w.slice(k * t), ok = w.startsWith(suf); r.step(ln(C_R1, ok ? 'return' : 'startsWith'), `t = ${t}: surviving suffix "${suf}" ${ok ? `is a prefix → <b>${t}</b>` : 'is not a prefix'}.`, [L_('word', w, ok ? { done: range(k * t, w.length - 1), warn: range(0, suf.length - 1) } : { bad: range(k * t, w.length - 1) })], { t }); if (ok) break; }
  ANIM['Minimum Time to Revert Word to Initial State I'] = W('Check each t', C_R1, r.steps);
}

const C_R2 = `
for (int i = 1, l = 0, r = 0; i < n; i++) {
    if (i < r) z[i] = Math.min(r - i, z[i - l]);
    while (i + z[i] < n && word.charAt(z[i]) == word.charAt(i + z[i])) z[i]++;
    if (i + z[i] > r) {
        l = i;
        r = i + z[i];
    }
}
while (k * t < n && z[k * t] < n - k * t) t++;`;
{
  const w = 'abacaba', n = w.length, k = 2, r = recorder(), z = Array(n).fill(0);
  for (let i = 1, l = 0, rr = 0; i < n; i++) { if (i < rr) z[i] = Math.min(rr - i, z[i - l]); while (i + z[i] < n && w[z[i]] === w[i + z[i]]) z[i]++; if (i + z[i] > rr) { l = i; rr = i + z[i]; } }
  r.step(ln(C_R2, 'z[i]++'), `Z-function of "${w}".`, [L_('word', w, { showIdx: true }), A('z', z)]);
  let t = 1; while (k * t < n && z[k * t] < n - k * t) { r.step(ln(C_R2, 'z[k * t] < n'), `t = ${t}: z[${k * t}] = ${z[k * t]} < ${n - k * t} → not yet.`, [A('z', z, { bad: [k * t] })], { t }); t++; }
  r.step(ln(C_R2, 'z[k * t] < n'), k * t < n ? `t = ${t}: z[${k * t}] = ${z[k * t]} = ${n - k * t} → <b>${t}</b>.` : `t = ${t}: k·t ≥ n → <b>${t}</b>.`, [A('z', z, { done: k * t < n ? [k * t] : [] })], { t });
  ANIM['Minimum Time to Revert Word to Initial State II'] = W('Z-function', C_R2, r.steps);
}

const C_B1 = `
for (int i : as)
    for (int j : bs)
        if (Math.abs(i - j) <= k) {
            out.add(i);
            break;
        }`;
{
  const s = 'isawsquirrelnearmysquirrelhouseohmy', a = 'my', b = 'squirrel', k = 15, r = recorder();
  const occ = p => { const o = []; for (let i = s.indexOf(p); i >= 0; i = s.indexOf(p, i + 1)) o.push(i); return o; }, as = occ(a), bs = occ(b);
  r.step(0, `"${a}" starts at [${as}], "${b}" starts at [${bs}]. k = ${k}.`, [R('a starts', as), R('b starts', bs)]);
  const out = []; for (const i of as) { const j = bs.find(x => Math.abs(i - x) <= k); if (j !== undefined) out.push(i); r.step(ln(C_B1, j !== undefined ? 'out.add' : 'Math.abs'), j !== undefined ? `i = ${i}: b at ${j} is ${Math.abs(i - j)} away → beautiful.` : `i = ${i}: no b within ${k}.`, [R('a starts', as, { active: [as.indexOf(i)] }), R('result', out)]); }
  ANIM['Find Beautiful Indices in the Given Array I'] = W('Occurrences + check', C_B1, r.steps);
}

const C_B2 = `
for (int i : as) {
    while (j < bs.size() && bs.get(j) < i - k) j++;
    if (j < bs.size() && bs.get(j) <= i + k) out.add(i);
}`;
{
  const as = [2, 9, 20, 33], bs = [4, 26, 40], k = 5, r = recorder(), out = []; let j = 0;
  r.step(0, `Sorted starts. a: [${as}], b: [${bs}], k = ${k}.`, [R('a', as), R('b', bs)]);
  for (const i of as) { while (j < bs.length && bs[j] < i - k) j++; const ok = j < bs.length && bs[j] <= i + k; if (ok) out.push(i); r.step(ln(C_B2, ok ? 'out.add' : 'bs.get(j) <= i + k'), `i = ${i}: window [${i - k}, ${i + k}], candidate b = ${j < bs.length ? bs[j] : 'none'} → ${ok ? 'keep' : 'skip'}.`, [R('a', as, { active: [as.indexOf(i)] }), R('b', bs, { ptr: j < bs.length ? { [j]: 'j' } : {}, done: ok ? [j] : [] }), R('result', out)]); }
  ANIM['Find Beautiful Indices in the Given Array II'] = W('KMP + two pointers', C_B2, r.steps);
}
