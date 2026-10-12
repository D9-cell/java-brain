const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const range = (a, b) => idx(Math.max(0, b - a + 1)).map(x => x + a);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const cp = m => m.map(r => r.slice());

const C_MCM1 = `
int solve(int[] arr, int i, int j, int[][] memo) {
    if (i >= j) return 0;
    int best = Integer.MAX_VALUE;
    for (int k = i; k < j; k++)
        best = Math.min(best, solve(arr, i, k, memo) + solve(arr, k + 1, j, memo) + arr[i - 1] * arr[k] * arr[j]);
    return memo[i][j] = best;
}`;
const C_MCM2 = `
for (int len = 2; len < n; len++)
    for (int i = 1; i + len - 1 < n; i++) {
        int j = i + len - 1;
        dp[i][j] = Integer.MAX_VALUE;
        for (int k = i; k < j; k++)
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]);
    }
return dp[1][n - 1];`;
{
  const arr = [10, 30, 5, 60], n = 4, r1 = recorder(), r2 = recorder(), dp = Array.from({ length: n }, () => Array(n).fill(0)), lab = { rowLabels: ['', 'M1', 'M2', 'M3'], colLabels: ['', 'M1', 'M2', 'M3'] };
  r1.step(0, 'arr = [10,30,5,60]: M1 is 10×30, M2 is 30×5, M3 is 5×60. Try every last multiplication.', [A('arr', arr)]);
  r1.step(ln(C_MCM1, 'for (int k = i'), 'Chain M1..M3, split k = 1: (M1)(M2 M3) costs 0 + 30·5·60 + 10·30·60 = 27000. Split k = 2: (M1 M2)(M3) costs 10·30·5 + 0 + 10·5·60 = 4500.', [R('splits', ['(M1)(M2M3) = 27000', '(M1M2)(M3) = 4500'], { done: [1], bad: [0] })]);
  r1.step(ln(C_MCM1, 'return memo'), 'Minimum <b>4500</b>. Subchains are memoised, so each (i, j) is solved once.', [R('answer', [4500], { done: [0] })]);
  r2.step(0, 'Same chain, bottom-up: dp[i][j] for chains of length 2, then 3.', [G('dp', cp(dp), [], lab)]);
  for (let len = 2; len < n; len++) { for (let i = 1; i + len - 1 < n; i++) { const j = i + len - 1; let b = Infinity; for (let k = i; k < j; k++) b = Math.min(b, dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]); dp[i][j] = b; } r2.step(ln(C_MCM2, 'dp[i][j] = Math.min'), `Chains of length ${len} filled.`, [G('dp', cp(dp), idx(n).flatMap(i => idx(n).filter(j => j - i === len - 1 && i >= 1).map(j => [i, j, 'active'])), lab)]); }
  r2.step(ln(C_MCM2, 'return'), `Answer dp[1][3] = <b>${dp[1][3]}</b>.`, [G('dp', cp(dp), [[1, 3, 'done']], lab)]);
  ANIM['Matrix Chain Multiplication'] = [...W('Top-down memo', C_MCM1, r1.steps), ...W('Bottom-up by length', C_MCM2, r2.steps)];
}

const C_BR = `
split[i][j] = k   (the k that gave the smallest cost)
void print(int i, int j) {
    if (i == j) { out.append(name++); return; }
    out.append('(');
    print(i, split[i][j]);
    print(split[i][j] + 1, j);
    out.append(')');
}`;
{
  const arr = [40, 20, 30, 10, 30], r = recorder();
  r.step(0, 'arr = [40,20,30,10,30]: four matrices A, B, C, D. The cost table is the same as Matrix Chain; we also store the best split.', [A('arr', arr)]);
  r.step(ln(C_BR, 'split[i][j] = k'), 'Best splits: split[1][4] = 3, split[1][3] = 1, split[2][3] = 2.', [R('split', ['[1..4] → 3', '[1..3] → 1', '[2..3] → 2'])]);
  r.step(ln(C_BR, 'print(i, split'), 'print(1, 4): "(" then print(1, 3) then print(4, 4) then ")".', [R('out', ['(', '…', 'D', ')'])]);
  r.step(ln(C_BR, 'print(split'), 'print(1, 3) with split 1: "(" A then print(2, 3) = "(BC)" then ")" → (A(BC)).', [R('out', ['((A(BC))D)'], { done: [0] })]);
  r.step(0, 'Answer <b>((A(BC))D)</b>, cost 26000.', [R('answer', ['((A(BC))D)'], { done: [0] })]);
  ANIM['Brackets in Matrix Chain Multiplication'] = W('Table + split + print', C_BR, r.steps);
}

const C_BB = `
for (int len = 2; len <= n + 1; len++)
    for (int l = 0; l + len <= n + 1; l++) {
        int r = l + len;
        for (int k = l + 1; k < r; k++)
            dp[l][r] = Math.max(dp[l][r], dp[l][k] + a[l] * a[k] * a[r] + dp[k][r]);
    }
return dp[0][n + 1];`;
{
  const nums = [3, 1, 5, 8], n = 4, a = [1, ...nums, 1], r = recorder(), dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));
  r.step(0, 'nums = [3,1,5,8] padded to [1,3,1,5,8,1]. dp[l][r] = best coins for the balloons strictly between l and r.', [A('a', a), G('dp', cp(dp))]);
  for (let len = 2; len <= n + 1; len++) { for (let l = 0; l + len <= n + 1; l++) { const rr = l + len; for (let k = l + 1; k < rr; k++) dp[l][rr] = Math.max(dp[l][rr], dp[l][k] + a[l] * a[k] * a[rr] + dp[k][rr]); } r.step(ln(C_BB, 'dp[l][r] = Math.max'), `Gap ${len}: for each (l, r) try every k as the LAST balloon; its neighbours are a[l] and a[r].`, [G('dp', cp(dp), idx(n + 2).flatMap(l => idx(n + 2).filter(rr => rr - l === len).map(rr => [l, rr, 'active'])))]); }
  r.step(ln(C_BB, 'return'), `Answer dp[0][5] = <b>${dp[0][n + 1]}</b>.`, [G('dp', cp(dp), [[0, n + 1, 'done']])]);
  ANIM['Burst Balloons'] = W('Interval DP', C_BB, r.steps);
}

const C_CUT = `
for (int len = 2; len <= m + 1; len++)
    for (int i = 0; i + len <= m + 1; i++) {
        int j = i + len, best = Integer.MAX_VALUE;
        for (int k = i + 1; k < j; k++) best = Math.min(best, dp[i][k] + dp[k][j]);
        dp[i][j] = best + pts[j] - pts[i];
    }`;
{
  const pts = [0, 1, 3, 4, 5, 7], m = 4, r = recorder(), dp = Array.from({ length: m + 2 }, () => Array(m + 2).fill(0));
  r.step(0, 'n = 7, cuts {1,3,4,5} → points [0,1,3,4,5,7]. dp[i][j] = cheapest way to make every cut strictly inside points i..j.', [A('pts', pts), G('dp', cp(dp))]);
  for (let len = 2; len <= m + 1; len++) { for (let i = 0; i + len <= m + 1; i++) { const j = i + len; let b = Infinity; for (let k = i + 1; k < j; k++) b = Math.min(b, dp[i][k] + dp[k][j]); dp[i][j] = b + pts[j] - pts[i]; } r.step(ln(C_CUT, 'dp[i][j] = best'), `Segments spanning ${len} gaps: first cut k costs the whole piece length, then the two halves.`, [G('dp', cp(dp), idx(m + 2).flatMap(i => idx(m + 2).filter(j => j - i === len).map(j => [i, j, 'active'])))]); }
  r.step(0, `Answer dp[0][5] = <b>${dp[0][m + 1]}</b>.`, [G('dp', cp(dp), [[0, m + 1, 'done']])]);
  ANIM['Minimum Cost to Cut a Stick'] = W('Interval DP', C_CUT, r.steps);
}

const C_TRI = `
for (int len = 2; len < n; len++)
    for (int i = 0; i + len < n; i++) {
        int j = i + len;
        dp[i][j] = Integer.MAX_VALUE;
        for (int k = i + 1; k < j; k++)
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]);
    }`;
{
  const v = [3, 7, 4, 5], n = 4, r = recorder(), dp = Array.from({ length: n }, () => Array(n).fill(0));
  r.step(0, 'values [3,7,4,5]. dp[i][j] = cheapest triangulation of polygon i..j.', [A('values', v), G('dp', cp(dp))]);
  for (let len = 2; len < n; len++) { for (let i = 0; i + len < n; i++) { const j = i + len; let b = Infinity; for (let k = i + 1; k < j; k++) b = Math.min(b, dp[i][k] + dp[k][j] + v[i] * v[k] * v[j]); dp[i][j] = b; } r.step(ln(C_TRI, 'dp[i][j] = Math.min'), `Polygons with ${len + 1} vertices: edge (i, j) is in one triangle (i, k, j).`, [G('dp', cp(dp), idx(n).flatMap(i => idx(n).filter(j => j - i === len).map(j => [i, j, 'active'])))]); }
  r.step(0, `Answer dp[0][3] = <b>${dp[0][3]}</b>.`, [G('dp', cp(dp), [[0, 3, 'done']])]);
  ANIM['Minimum Score Triangulation of Polygon'] = W('Interval DP', C_TRI, r.steps);
}

const C_BOOL = `
for (int len = 2; len <= n; len++)
    for (int i = 0; i + len <= n; i++) {
        int j = i + len - 1;
        for (int k = i; k < j; k++) {
            char op = expr.charAt(2 * k + 1);
            // left = [i..k], right = [k+1..j]
            AND: trueWays = lt * rt;   OR: total - lf * rf;   XOR: lt * rf + lf * rt;
            t[i][j] += trueWays;  f[i][j] += total - trueWays;
        }
    }
return t[0][n - 1];`;
{
  const e = 'T^F|F', n = 3, ops = [e[1], e[3]], r = recorder(), t = Array.from({ length: n }, () => Array(n).fill(0)), f = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) { t[i][i] = e[2 * i] === 'T' ? 1 : 0; f[i][i] = 1 - t[i][i]; }
  const view = () => t.map((row, i) => row.map((v, j) => j < i ? '' : `${v}/${f[i][j]}`));
  r.step(0, 'Expression T ^ F | F: operands T, F, F. Each cell shows true/false counts for the operand range.', [G('true/false', view(), [[0, 0, 'active'], [1, 1, 'active'], [2, 2, 'active']], { rowLabels: ['T', 'F', 'F'], colLabels: ['T', 'F', 'F'] })]);
  for (let len = 2; len <= n; len++) { for (let i = 0; i + len <= n; i++) { const j = i + len - 1; for (let k = i; k < j; k++) { const op = e[2 * k + 1], lt = t[i][k], lf = f[i][k], rt = t[k + 1][j], rf = f[k + 1][j], tot = (lt + lf) * (rt + rf); const tw = op === '&' ? lt * rt : op === '|' ? tot - lf * rf : lt * rf + lf * rt; t[i][j] += tw; f[i][j] += tot - tw; } } r.step(ln(C_BOOL, 'trueWays'), `Ranges of ${len} operands: split at each operator and combine the true/false counts.`, [G('true/false', view(), idx(n).flatMap(i => idx(n).filter(j => j - i === len - 1).map(j => [i, j, 'active'])), { rowLabels: ['T', 'F', 'F'], colLabels: ['T', 'F', 'F'] })]); }
  r.step(ln(C_BOOL, 'return'), `Answer t[0][2] = <b>${t[0][2]}</b>: (T^F)|F and T^(F|F).`, [G('true/false', view(), [[0, 2, 'done']], { rowLabels: ['T', 'F', 'F'], colLabels: ['T', 'F', 'F'] })]);
  ANIM['Boolean Parenthesization'] = W('True / false tables', C_BOOL, r.steps);
}

const C_PR = `
for (int i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (int j = i + 1; j < n; j++) {
        dp[i][j] = 1 + dp[i + 1][j];
        for (int k = i + 2; k <= j; k++)
            if (t.charAt(k) == t.charAt(i)) dp[i][j] = Math.min(dp[i][j], dp[i + 1][k - 1] + dp[k][j]);
    }
}`;
{
  const s = 'abcab', n = 5, r = recorder(), dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0)), lab = { rowLabels: [...s, ''], colLabels: [...s, ''] };
  r.step(0, 's = "abcab". dp[i][j] = fewest turns for s[i..j].', [G('dp', cp(dp), [], lab)]);
  for (let i = n - 1; i >= 0; i--) { dp[i][i] = 1; for (let j = i + 1; j < n; j++) { dp[i][j] = 1 + dp[i + 1][j]; for (let k = i + 2; k <= j; k++) if (s[k] === s[i]) dp[i][j] = Math.min(dp[i][j], dp[i + 1][k - 1] + dp[k][j]); } r.step(ln(C_PR, 'dp[i][j] = 1 + dp[i + 1][j]'), `Row ${i} ('${s[i]}'): its own turn, or share a stroke with a later '${s[i]}'.`, [G('dp', cp(dp), range(i, n - 1).map(j => [i, j, 'active']), lab)]); }
  r.step(0, `Answer dp[0][4] = <b>${dp[0][4]}</b>: print a over 0–3, b over 1–4, c over 2, then a over 3.`, [G('dp', cp(dp), [[0, 4, 'done']], lab)]);
  ANIM['Strange Printer'] = W('Interval DP', C_PR, r.steps);
}

const C_RB = `
int solve(int[] b, int l, int r, int k, int[][][] memo) {
    if (l > r) return 0;
    while (l + 1 <= r && b[l + 1] == b[l]) { l++; k++; }
    int best = (k + 1) * (k + 1) + solve(b, l + 1, r, 0, memo);
    for (int m = l + 1; m <= r; m++)
        if (b[m] == b[l]) best = Math.max(best, solve(b, l + 1, m - 1, 0, memo) + solve(b, m, r, k + 1, memo));
    return memo[l][r][k] = best;
}`;
{
  const r = recorder();
  r.step(0, 'boxes [1,3,2,2,2,3,1]. The two 3s and the two 1s could merge if the boxes between them are removed first.', [A('boxes', [1, 3, 2, 2, 2, 3, 1])]);
  r.step(ln(C_RB, 'int best = (k + 1)'), 'Option A for the left 1: remove it now for 1² = 1 point and continue with [3,2,2,2,3,1].', [A('boxes', [1, 3, 2, 2, 2, 3, 1], { active: [0] })]);
  r.step(ln(C_RB, 'for (int m = l + 1'), 'Option B: merge with the last 1. First clear the gap [3,2,2,2,3]: remove 2,2,2 (9), then 3,3 together (4) = 13.', [A('boxes', [1, 3, 2, 2, 2, 3, 1], { done: [0, 6], active: [1, 2, 3, 4, 5] })]);
  r.step(ln(C_RB, 'solve(b, m, r, k + 1'), 'Now the 1s are adjacent: 2 boxes → 4 points. Total 13 + 4 = <b>17</b>, better than option A.', [R('score', [13, 4, 17], { done: [2] })]);
  ANIM['Remove Boxes'] = W('3-D memo', C_RB, r.steps);
}

const C_UB = `
for (int root = lo; root <= hi; root++)
    for (TreeNode left : build(lo, root - 1))
        for (TreeNode right : build(root + 1, hi)) {
            TreeNode node = new TreeNode(root);
            node.left = left; node.right = right;
            res.add(node);
        }`;
{
  const r = recorder(); const ser = (v, l, rr) => (l ? l : '·') + ' ← ' + v + ' → ' + (rr ? rr : '·');
  r.step(0, 'n = 3: values 1..3. Every value can be the root.', [R('range', [1, 2, 3])]);
  r.step(ln(C_UB, 'for (int root'), 'Root 1: left range is empty, right range 2..3 has two trees (2 then 3, or 3 then 2).', [R('trees', ['1 → (2 → 3)', '1 → (3 ← 2)'], { active: [0, 1] })]);
  r.step(ln(C_UB, 'for (TreeNode left'), 'Root 2: left {1}, right {3}: one combination.', [R('trees', ['(1) ← 2 → (3)'], { active: [0] })]);
  r.step(ln(C_UB, 'for (TreeNode right'), 'Root 3: left range 1..2 has two trees, right is empty.', [R('trees', ['(1 → 2) ← 3', '(2 ← 1) ← 3'], { active: [0, 1] })]);
  r.step(0, 'Total <b>5</b> trees = Catalan(3).', [R('count', [2, 1, 2, '= 5'], { done: [3] })]);
  ANIM['Unique Binary Search Trees II'] = W('Recursion over ranges', C_UB, r.steps);
}

const C_FBT = `
if (n % 2 == 0) return new ArrayList<>();
if (n == 1) return List.of(new TreeNode(0));
for (int left = 1; left < n; left += 2)
    for (TreeNode l : allPossibleFBT(left))
        for (TreeNode r : allPossibleFBT(n - 1 - left)) {
            TreeNode root = new TreeNode(0);
            root.left = l; root.right = r;
            res.add(root);
        }`;
{
  const r = recorder();
  r.step(ln(C_FBT, 'n % 2 == 0'), 'n = 7. Even counts are impossible, so only odd splits of the remaining 6 nodes are tried.', [R('splits (left, right)', ['(1,5)', '(3,3)', '(5,1)'])]);
  r.step(ln(C_FBT, 'for (int left'), 'Trees(1) = 1, Trees(3) = 1, Trees(5) = 2 (memoised).', [R('count by size', ['1:1', '3:1', '5:2'], { active: [2] })]);
  r.step(ln(C_FBT, 'for (TreeNode l'), 'Split (1,5): 1 × 2 = 2 trees. Split (3,3): 1 × 1 = 1. Split (5,1): 2 × 1 = 2.', [R('products', [2, 1, 2], { active: [0, 1, 2] })]);
  r.step(0, 'Total <b>5</b> full binary trees with 7 nodes.', [R('total', [5], { done: [0] })]);
  ANIM['All Possible Full Binary Trees'] = W('Memo by size', C_FBT, r.steps);
}

const C_MO = `
for (int i = m - 1; i >= 0; i--)
    for (int left = 0; left <= i; left++) {
        int right = n - 1 - (i - left);
        dp[left] = Math.max(nums[left] * multipliers[i] + dp[left + 1],
                            nums[right] * multipliers[i] + dp[left]);
    }
return dp[0];`;
{
  const nums = [1, 2, 3], mul = [3, 2, 1], n = 3, m = 3, r = recorder(); let dp = [0, 0, 0, 0];
  r.step(0, 'nums = [1,2,3], multipliers = [3,2,1]. dp[left] = best score from operation i onward having taken `left` numbers from the front.', [A('nums', nums), A('multipliers', mul), A('dp', dp)]);
  for (let i = m - 1; i >= 0; i--) { const nd = dp.slice(); for (let left = 0; left <= i; left++) { const right = n - 1 - (i - left); nd[left] = Math.max(nums[left] * mul[i] + dp[left + 1], nums[right] * mul[i] + dp[left]); } dp = nd; r.step(ln(C_MO, 'dp[left] = Math.max'), `Operation ${i} (× ${mul[i]}): front or back. dp = [${dp}].`, [A('dp', dp, { active: range(0, i) })]); }
  r.step(ln(C_MO, 'return'), `Answer dp[0] = <b>${dp[0]}</b>: take 3 × 3, 2 × 2, 1 × 1.`, [A('dp', dp, { done: [0] })]);
  ANIM['Maximum Score from Performing Multiplication Operations'] = W('2-D DP rolled into 1-D', C_MO, r.steps);
}

const C_EGG1 = `
while (dp[k] < n) {
    moves++;
    for (int e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1;
}
return moves;`;
const C_EGG2 = `
for (int e = 2; e <= k; e++)
    for (int f = 1; f <= n; f++) {
        binary search the drop floor mid:
            breaks = t[e - 1][mid - 1], holds = t[e][f - mid];
            best = Math.min(best, 1 + Math.max(breaks, holds));
        t[e][f] = best;
    }`;
{
  const k = 2, n = 6, r1 = recorder(); let dp = [0, 0, 0], moves = 0;
  r1.step(0, 'k = 2 eggs, n = 6 floors. dp[e] = floors you can settle with e eggs and the moves used so far.', [A('dp (eggs 0..2)', dp)]);
  while (dp[k] < n) { moves++; for (let e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1; r1.step(ln(C_EGG1, 'dp[e] = dp[e]'), `Move ${moves}: dp[e] = dp[e] (survives) + dp[e−1] (breaks) + 1 → [${dp}].`, [A('dp (eggs 0..2)', dp, { active: [1, 2] })]); }
  r1.step(ln(C_EGG1, 'return'), `dp[2] = ${dp[2]} ≥ 6 after <b>${moves}</b> moves.`, [A('dp (eggs 0..2)', dp, { done: [2] })]);
  const r2 = recorder(), K = 2, N = 6, t = Array.from({ length: K + 1 }, () => Array(N + 1).fill(0)); for (let f = 1; f <= N; f++) t[1][f] = f;
  r2.step(0, 'Floors table t[eggs][floors]. One egg needs f drops (linear scan).', [G('t', cp(t), [], { rowLabels: ['0 eggs', '1 egg', '2 eggs'], colLabels: idx(N + 1) })]);
  for (let f = 1; f <= N; f++) { let lo = 1, hi = f, best = f; while (lo <= hi) { const mid = (lo + hi) >> 1, br = t[1][mid - 1], ho = t[2][f - mid]; best = Math.min(best, 1 + Math.max(br, ho)); if (br < ho) lo = mid + 1; else hi = mid - 1; } t[2][f] = best; r2.step(ln(C_EGG2, 't[e][f] = best'), `f = ${f}: the best drop floor balances breaks and holds → ${best} moves.`, [G('t', cp(t), [[2, f, 'active']], { rowLabels: ['0 eggs', '1 egg', '2 eggs'], colLabels: idx(N + 1) })]); }
  r2.step(0, `Answer t[2][6] = <b>${t[2][N]}</b>.`, [G('t', cp(t), [[2, N, 'done']], { rowLabels: ['0 eggs', '1 egg', '2 eggs'], colLabels: idx(N + 1) })]);
  ANIM['Super Egg Drop'] = [...W('Moves DP', C_EGG1, r1.steps), ...W('Floors DP + binary search', C_EGG2, r2.steps)];
}
