const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const range = (a, b) => idx(Math.max(0, b - a + 1)).map(x => x + a);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const isPal = (s, i, j) => { while (i < j) if (s[i++] !== s[j--]) return false; return true; };

const C_LPS = `
for (int i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (int j = i + 1; j < n; j++)
        dp[i][j] = s.charAt(i) == s.charAt(j) ? dp[i + 1][j - 1] + 2
                                              : Math.max(dp[i + 1][j], dp[i][j - 1]);
}
return dp[0][n - 1];`;
{
  const s = 'bbbab', n = 5, r = recorder(), dp = Array.from({ length: n }, () => Array(n).fill('')), lab = { rowLabels: [...s], colLabels: [...s] };
  r.step(0, 's = "bbbab". dp[i][j] = LPS of s[i..j]; fill rows from the bottom.', [G('dp', dp, [], lab)]);
  for (let i = n - 1; i >= 0; i--) { dp[i][i] = 1; for (let j = i + 1; j < n; j++) dp[i][j] = s[i] === s[j] ? (j - i === 1 ? 0 : dp[i + 1][j - 1]) + 2 : Math.max(dp[i + 1][j], dp[i][j - 1]); r.step(ln(C_LPS, 'dp[i][j] = s.charAt'), `Row ${i} ('${s[i]}'): equal ends wrap the inside (+2), otherwise drop one end.`, [G('dp', dp.map(x => x.slice()), range(i, n - 1).map(j => [i, j, s[i] === s[j] ? 'done' : 'active']), lab)]); }
  r.step(ln(C_LPS, 'return'), `Answer dp[0][4] = <b>${dp[0][4]}</b>: "bbbb".`, [G('dp', dp, [[0, 4, 'done']], lab)]);
  ANIM['Longest Palindromic Subsequence'] = W('Range DP', C_LPS, r.steps);
}

const C_LPSS = `
for (int c = 0; c < 2 * s.length() - 1; c++) {
    int l = c / 2, r = l + c % 2;
    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
    if (r - l - 1 > len) { len = r - l - 1; start = l + 1; }
}
return s.substring(start, start + len);`;
{
  const s = 'babad', r = recorder(); let start = 0, len = 0;
  r.step(0, 's = "babad": 9 centres (5 letters + 4 gaps).', [A('s', [...s])]);
  for (let c = 0; c < 2 * s.length - 1; c++) { let l = c >> 1, rr = l + (c % 2); while (l >= 0 && rr < s.length && s[l] === s[rr]) { l--; rr++; } const L = rr - l - 1; if (L > len) { len = L; start = l + 1; } r.step(ln(C_LPSS, 'while (l >= 0'), `Centre ${c % 2 ? `gap ${c >> 1}|${(c >> 1) + 1}` : `letter ${c >> 1}`}: grows to "${s.slice(l + 1, rr)}" (length ${L}). Best "${s.slice(start, start + len)}".`, [A('s', [...s], { active: range(l + 1, rr - 1), done: range(start, start + len - 1).filter(x => x < l + 1 || x > rr - 1) })]); }
  r.step(ln(C_LPSS, 'return'), `Answer <b>"${s.slice(start, start + len)}"</b>.`, [A('s', [...s], { done: range(start, start + len - 1) })]);
  ANIM['Longest Palindromic Substring'] = W('Expand around centres', C_LPSS, r.steps);
}

const C_PSS = `
int count = 0;
for (int c = 0; c < 2 * s.length() - 1; c++)
    for (int l = c / 2, r = l + c % 2; l >= 0 && r < s.length()
            && s.charAt(l) == s.charAt(r); l--, r++) count++;
return count;`;
{
  const s = 'aaa', r = recorder(); let count = 0;
  r.step(0, 's = "aaa". Every successful expansion is one palindrome.', [A('s', [...s])]);
  for (let c = 0; c < 5; c++) for (let l = c >> 1, rr = l + (c % 2); l >= 0 && rr < 3 && s[l] === s[rr]; l--, rr++) { count++; r.step(ln(C_PSS, 'count++'), `Centre ${c}: "${s.slice(l, rr + 1)}" → count ${count}.`, [A('s', [...s], { active: range(l, rr) })]); }
  r.step(ln(C_PSS, 'return count'), `Answer <b>${count}</b>.`, [R('count', [count], { done: [0] })]);
  ANIM['Palindromic Substrings'] = W('Expand and count', C_PSS, r.steps);
}

const C_PP2 = `
for (int j = 0; j < n; j++) {
    cuts[j] = j;
    for (int i = 0; i <= j; i++)
        if (s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1])) {
            pal[i][j] = true;
            cuts[j] = i == 0 ? 0 : Math.min(cuts[j], cuts[i - 1] + 1);
        }
}`;
{
  const s = 'aabcb', n = 5, r = recorder(), cuts = [];
  r.step(0, 's = "aabcb". cuts[j] = fewest cuts for s[0..j]; the last piece s[i..j] must be a palindrome.', [A('s', [...s])]);
  for (let j = 0; j < n; j++) { let best = Infinity, from = 0; for (let i = 0; i <= j; i++) if (isPal(s, i, j)) { const v = i === 0 ? 0 : cuts[i - 1] + 1; if (v < best) { best = v; from = i; } } cuts.push(best); r.step(ln(C_PP2, 'cuts[j] = i == 0'), `j = ${j}: best last palindrome "${s.slice(from, j + 1)}" → cuts = ${best}.`, [A('s', [...s], { active: range(from, j) }), A('cuts', cuts.slice())]); }
  r.step(0, `Answer <b>${cuts[n - 1]}</b>: "aa" | "bcb".`, [A('cuts', cuts, { done: [n - 1] })]);
  ANIM['Palindrome Partitioning II'] = W('Last palindrome piece', C_PP2, r.steps);
}

const C_NOP = `
for (int i = 1; i <= n; i++) {
    dp[i] = dp[i - 1];
    for (int len = k; len <= k + 1; len++)
        if (i - len >= 0 && isPal(s, i - len, i - 1)) dp[i] = Math.max(dp[i], dp[i - len] + 1);
}
return dp[n];`;
{
  const s = 'abaccdbbd', k = 3, r = recorder(), dp = [0];
  r.step(0, 's = "abaccdbbd", k = 3. Only palindromes of length 3 or 4 ending at i are tried.', [A('s', [...s])]);
  for (let i = 1; i <= s.length; i++) { let v = dp[i - 1], used = null; for (let len = k; len <= k + 1; len++) if (i - len >= 0 && isPal(s, i - len, i - 1) && dp[i - len] + 1 > v) { v = dp[i - len] + 1; used = len; } dp.push(v); r.step(ln(C_NOP, used ? 'dp[i] = Math.max' : 'dp[i] = dp[i - 1]'), used ? `i = ${i}: "${s.slice(i - used, i)}" is a palindrome → dp = ${v}.` : `i = ${i}: no palindrome of length 3–4 ends here → dp = ${v}.`, [A('s', [...s], { active: used ? range(i - used, i - 1) : [i - 1] }), A('dp', dp.slice())]); }
  r.step(ln(C_NOP, 'return'), `Answer <b>${dp[s.length]}</b>: "aba" and "dbbd".`, [A('dp', dp, { done: [s.length] })]);
  ANIM['Maximum Number of Non-overlapping Palindrome Substrings'] = W('Shortest pieces', C_NOP, r.steps);
}

const C_MIS = `
for (int i = n - 1; i >= 0; i--)
    for (int j = i + 1; j < n; j++)
        dp[i][j] = s.charAt(i) == s.charAt(j) ? dp[i + 1][j - 1]
                : 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
return dp[0][n - 1];`;
{
  const s = 'mbadm', n = 5, r = recorder(), dp = Array.from({ length: n }, () => Array(n).fill(0)), lab = { rowLabels: [...s], colLabels: [...s] };
  r.step(0, 's = "mbadm". dp[i][j] = insertions to make s[i..j] a palindrome.', [G('dp', dp, [], lab)]);
  for (let i = n - 1; i >= 0; i--) { for (let j = i + 1; j < n; j++) dp[i][j] = s[i] === s[j] ? dp[i + 1][j - 1] : 1 + Math.min(dp[i + 1][j], dp[i][j - 1]); r.step(ln(C_MIS, 'dp[i][j] = s.charAt'), `Row ${i} ('${s[i]}').`, [G('dp', dp.map(x => x.slice()), range(i + 1, n - 1).map(j => [i, j, s[i] === s[j] ? 'done' : 'active']), lab)]); }
  r.step(ln(C_MIS, 'return'), `Answer <b>${dp[0][4]}</b>: "mbdadbm" (insert d and b).`, [G('dp', dp, [[0, 4, 'done']], lab)]);
  ANIM['Minimum Insertion Steps to Make a String Palindrome'] = W('Range DP', C_MIS, r.steps);
}

const C_WB = `
ok[0] = true;
for (int i = 1; i <= s.length(); i++)
    for (int j = Math.max(0, i - maxLen); j < i && !ok[i]; j++)
        ok[i] = ok[j] && dict.contains(s.substring(j, i));
return ok[s.length()];`;
{
  const s = 'applepenapple', dict = ['apple', 'pen'], r = recorder(), ok = [true];
  r.step(ln(C_WB, 'ok[0] = true'), 's = "applepenapple", dict {apple, pen}. ok[i] = s[0..i) splits into words.', [A('s', [...s])]);
  for (let i = 1; i <= s.length; i++) { let v = false, from = -1; for (let j = Math.max(0, i - 5); j < i && !v; j++) if (ok[j] && dict.includes(s.slice(j, i))) { v = true; from = j; } ok.push(v); if (v) r.step(ln(C_WB, 'ok[i] = ok[j]'), `ok[${i}] = true: ok[${from}] + "${s.slice(from, i)}".`, [A('s', [...s], { active: range(from, i - 1), done: range(0, from - 1) })]); }
  r.step(ln(C_WB, 'return'), `ok[13] = <b>${ok[13]}</b>: apple | pen | apple.`, [A('s', [...s], { done: idx(13) })]);
  ANIM['Word Break'] = W('Prefix booleans', C_WB, r.steps);
}

const C_EC = `
for (int i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    for (int j = 0; j < i; j++) if (dict.contains(s.substring(j, i))) dp[i] = Math.min(dp[i], dp[j]);
}
return dp[n];`;
{
  const s = 'leetscode', dict = ['leet', 'code', 'leetcode'], r = recorder(), dp = [0];
  r.step(0, 's = "leetscode", dict {leet, code, leetcode}. dp[i] = fewest extras in s[0..i).', [A('s', [...s])]);
  for (let i = 1; i <= s.length; i++) { let v = dp[i - 1] + 1, w = null; for (let j = 0; j < i; j++) if (dict.includes(s.slice(j, i)) && dp[j] < v) { v = dp[j]; w = j; } dp.push(v); r.step(ln(C_EC, w !== null ? 'dp[i] = Math.min' : 'dp[i] = dp[i - 1] + 1'), w !== null ? `i = ${i}: word "${s.slice(w, i)}" ends here → dp = ${v}.` : `i = ${i}: '${s[i - 1]}' stays extra → dp = ${v}.`, [A('s', [...s], { active: w !== null ? range(w, i - 1) : [i - 1] }), A('dp', dp.slice())]); }
  r.step(ln(C_EC, 'return'), `Answer <b>${dp[s.length]}</b>: only the "s" is extra.`, [A('dp', dp, { done: [s.length] })]);
  ANIM['Extra Characters in a String'] = W('Extra or word', C_EC, r.steps);
}

const C_SCR = `
if (s1[i..i+len) equals s2[j..j+len)) return true;
if (letter counts differ) return false;
for (int k = 1; k < len; k++) {
    if (go(i, j, k) && go(i + k, j + k, len - k)) return true;
    if (go(i, j + len - k, k) && go(i + k, j, len - k)) return true;
}
return false;`;
{
  const r = recorder();
  r.step(0, 's1 = "great", s2 = "rgeat". Same letters, so try cuts.', [R('s1', [...'great']), R('s2', [...'rgeat'])]);
  r.step(ln(C_SCR, 'if (go(i, j, k) && go(i + k, j + k'), 'Cut after "gr" | "eat" without swap: "gr" vs "rg", "eat" vs "eat".', [R('s1', ['gr', 'eat'], { active: [0] }), R('s2', ['rg', 'eat'], { active: [0] })]);
  r.step(ln(C_SCR, 'if (go(i, j + len - k'), 'Inside "gr" vs "rg": cut "g" | "r" and swap → matches.', [R('s1', ['g', 'r']), R('s2', ['r', 'g'], { done: [0, 1] })]);
  r.step(ln(C_SCR, 'equals'), '"eat" equals "eat" directly.', [R('s1', ['eat'], { done: [0] }), R('s2', ['eat'], { done: [0] })]);
  r.step(ln(C_SCR, 'return true'), 'Both halves work → <b>true</b>.', [R('answer', ['true'], { done: [0] })]);
  ANIM['Scramble String'] = W('Cut, swap or not', C_SCR, r.steps);
}

const C_SB1 = `
int have = first == 0 ? z : o;
for (int len = 1; len <= Math.min(limit, have); len++) {
    int nz = first == 0 ? z - len : z, no = first == 1 ? o - len : o;
    if (nz == 0 && no == 0) res++;
    else res += runs(nz, no, 1 - first, limit, memo);
}`;
{
  const r = recorder(), found = [];
  const rec = (z, o, f, cur) => { const have = f === 0 ? z : o; for (let len = 1; len <= Math.min(2, have); len++) { const nz = f === 0 ? z - len : z, no = f === 1 ? o - len : o, s = cur + (f === 0 ? '0' : '1').repeat(len); if (!nz && !no) found.push(s); else rec(nz, no, 1 - f, s); } };
  rec(2, 2, 0, ''); rec(2, 2, 1, '');
  r.step(0, 'zero = 2, one = 2, limit = 2. Build run by run, alternating symbols.', [R('runs', ['0-run', '1-run'])]);
  found.forEach((x, i) => r.step(ln(C_SB1, 'res++'), `Array ${i + 1}: ${x}`, [R('found', found.slice(0, i + 1), { active: [i] })]));
  r.step(0, `Total <b>${found.length}</b>: with limit 2, every arrangement of two 0s and two 1s is stable.`, [R('found', found, { done: idx(found.length) })]);
  ANIM['Find All Possible Stable Binary Arrays I'] = W('Run by run', C_SB1, r.steps);
}

const C_SB2 = `
dp[i][j][0] = dp[i - 1][j][0] + dp[i - 1][j][1]
            - (i > limit ? dp[i - limit - 1][j][1] : 0);
dp[i][j][1] = dp[i][j - 1][0] + dp[i][j - 1][1]
            - (j > limit ? dp[i][j - limit - 1][0] : 0);`;
{
  const Z = 3, O = 3, L = 2, r = recorder(), d0 = Array.from({ length: Z + 1 }, () => Array(O + 1).fill(0)), d1 = Array.from({ length: Z + 1 }, () => Array(O + 1).fill(0));
  for (let i = 1; i <= Math.min(Z, L); i++) d0[i][0] = 1; for (let j = 1; j <= Math.min(O, L); j++) d1[0][j] = 1;
  const view = () => d0.map((row, i) => row.map((v, j) => `${v}/${d1[i][j]}`));
  r.step(0, 'zero = 3, one = 3, limit = 2. Cell = (ends in 0) / (ends in 1). Borders: only zeros or only ones, up to limit.', [G('dp[i][j]', view(), [], { rowLabels: ['0 zeros', '1', '2', '3'], colLabels: ['0 ones', '1', '2', '3'] })]);
  for (let i = 1; i <= Z; i++) { for (let j = 1; j <= O; j++) { d0[i][j] = d0[i - 1][j] + d1[i - 1][j] - (i > L ? d1[i - L - 1][j] : 0); d1[i][j] = d0[i][j - 1] + d1[i][j - 1] - (j > L ? d0[i][j - L - 1] : 0); } r.step(ln(C_SB2, 'dp[i][j][0]'), `Row ${i}: append a 0 or a 1, then remove arrays whose last run became 3 long.`, [G('dp[i][j]', view(), range(1, O).map(j => [i, j, 'active']), { rowLabels: ['0 zeros', '1', '2', '3'], colLabels: ['0 ones', '1', '2', '3'] })]); }
  r.step(0, `Answer ${d0[Z][O]} + ${d1[Z][O]} = <b>${d0[Z][O] + d1[Z][O]}</b>.`, [G('dp[i][j]', view(), [[Z, O, 'done']], { rowLabels: ['0 zeros', '1', '2', '3'], colLabels: ['0 ones', '1', '2', '3'] })]);
  ANIM['Find All Possible Stable Binary Arrays II'] = W('Subtract the overflow', C_SB2, r.steps);
}

const C_BP = `
for (int d = 0; d <= 9; d++)
    for (used, sum with dp[used][sum] > 0)
        for (int e = 0; e <= cnt[d]; e++)
            next[used + e][sum + e * d] += dp[used][sum] * inv[e] * inv[cnt[d] - e];
return dp[evenSlots][half] * fact[evenSlots] * fact[oddSlots];`;
{
  const r = recorder();
  r.step(0, 'num = "123": total 6 → each half sums to 3; even slots = 2 (indexes 0, 2), odd slots = 1.', [R('digits', ['1', '2', '3'])]);
  r.step(ln(C_BP, 'next[used + e]'), 'Even slots must hold 2 digits summing to 3: {1, 2}. Odd slot gets {3}.', [R('even slots', ['1', '2'], { active: [0, 1] }), R('odd slot', ['3'])]);
  r.step(ln(C_BP, 'return'), 'Arrangements: 2! for the even slots × 1! for the odd slot = <b>2</b> → "132" and "231".', [R('answers', ['132', '231'], { done: [0, 1] })]);
  ANIM['Count Number of Balanced Permutations'] = W('Choose counts, then arrange', C_BP, r.steps);
}

const C_OTS = `
long total = product of run lengths;
if (runs.size() >= k) return total;
for (int g : runs)
    for (int len = 1; len < k; len++) next[len] = prefix[len] - prefix[max(0, len - g)];
return total - Σ dp;`;
{
  const runs = [2, 2, 2, 2], k = 7, r = recorder(); let dp = Array(k).fill(0); dp[0] = 1;
  r.step(ln(C_OTS, 'long total'), 'word "aabbccdd": runs [2,2,2,2] → total choices 2⁴ = 16. k = 7, so count originals shorter than 7.', [A('dp[len]', dp)]);
  runs.forEach((g, i) => { const nx = Array(k).fill(0); for (let len = 1; len < k; len++) for (let c = 1; c <= g; c++) if (len - c >= 0) nx[len] += dp[len - c]; dp = nx; r.step(ln(C_OTS, 'next[len]'), `Run ${i + 1} adds 1 or 2 letters: dp = [${dp}].`, [A('dp[len]', dp.slice())]); });
  const short = dp.reduce((a, b) => a + b, 0);
  r.step(ln(C_OTS, 'return total'), `Short ones: ${short}. Answer 16 − ${short} = <b>${16 - short}</b>.`, [R('answer', [16 - short], { done: [0] })]);
  ANIM['Find the Original Typed String II'] = W('Complement counting', C_OTS, r.steps);
}
