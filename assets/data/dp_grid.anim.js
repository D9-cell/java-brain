const W = (name, code, steps) => [{ name, code, steps }];
const idx = n => Array.from({ length: n }, (_, i) => i);
const range = (a, b) => idx(Math.max(0, b - a + 1)).map(x => x + a);
const G = (name, m, hl = [], o = {}) => grid(name, m, { cls: (r, c) => { const h = hl.find(([a, b]) => a === r && b === c); return h ? h[2] : ''; }, ...o });
const cp = m => m.map(r => r.slice());

const C_UP = `
int[] ways = new int[n];
Arrays.fill(ways, 1);
for (int i = 1; i < m; i++)
    for (int j = 1; j < n; j++) ways[j] += ways[j - 1];
return ways[n - 1];`;
{
  const m = 3, n = 4, r = recorder(), d = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => (i === 0 || j === 0) ? 1 : 0));
  r.step(ln(C_UP, 'Arrays.fill'), '3 × 4 grid. First row and first column have one path each.', [G('ways', cp(d))]);
  for (let i = 1; i < m; i++) { for (let j = 1; j < n; j++) d[i][j] = d[i - 1][j] + d[i][j - 1]; r.step(ln(C_UP, 'ways[j] += ways[j - 1]'), `Row ${i}: each cell = above + left.`, [G('ways', cp(d), range(1, n - 1).map(j => [i, j, 'active']))]); }
  r.step(ln(C_UP, 'return'), `Answer <b>${d[m - 1][n - 1]}</b> = C(5, 2).`, [G('ways', cp(d), [[m - 1, n - 1, 'done']])]);
  ANIM['Unique Paths'] = W('Rolling row', C_UP, r.steps);
}

const C_UP2 = `
for (int[] row : grid)
    for (int j = 0; j < n; j++) {
        if (row[j] == 1) ways[j] = 0;
        else if (j > 0) ways[j] += ways[j - 1];
    }
return ways[n - 1];`;
{
  const g = [[0, 0, 0], [0, 1, 0], [0, 0, 0]], r = recorder(), d = g.map(row => row.map(() => 0)); d[0][0] = 1;
  const view = () => cp(d).map((row, i) => row.map((v, j) => g[i][j] === 1 ? '█' : v));
  r.step(0, '3 × 3 grid with an obstacle (█) in the middle.', [G('ways', view())]);
  for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) { if (i === 0 && j === 0) continue; if (g[i][j] === 1) d[i][j] = 0; else d[i][j] = (i ? d[i - 1][j] : 0) + (j ? d[i][j - 1] : 0); } r.step(ln(C_UP2, 'ways[j] += ways[j - 1]'), `Row ${i} done.`, [G('ways', view(), range(0, 2).map(j => [i, j, g[i][j] ? 'bad' : 'active']))]); }
  r.step(ln(C_UP2, 'return'), `Answer <b>${d[2][2]}</b>: around either side of the block.`, [G('ways', view(), [[2, 2, 'done']])]);
  ANIM['Unique Paths II'] = W('Rolling row', C_UP2, r.steps);
}

const C_MPS = `
for (int i = 0; i < grid.length; i++)
    for (int j = 0; j < n; j++) {
        if (i == 0 && j == 0) dp[j] = grid[0][0];
        else if (i == 0) dp[j] = dp[j - 1] + grid[i][j];
        else if (j == 0) dp[j] = dp[j] + grid[i][j];
        else dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }`;
{
  const g = [[1, 3, 1], [1, 5, 1], [4, 2, 1]], r = recorder(), d = g.map(x => x.map(() => '')); const m = 3, n = 3;
  r.step(0, 'grid [[1,3,1],[1,5,1],[4,2,1]]. dp = cheapest cost to reach each cell.', [G('grid', g), G('dp', d)]);
  for (let i = 0; i < m; i++) { for (let j = 0; j < n; j++) d[i][j] = g[i][j] + (i === 0 && j === 0 ? 0 : Math.min(i ? d[i - 1][j] : 1e9, j ? d[i][j - 1] : 1e9)); r.step(ln(C_MPS, 'else dp[j] = Math.min'), `Row ${i}: cost = cell + the cheaper of up and left.`, [G('grid', g), G('dp', cp(d), range(0, n - 1).map(j => [i, j, 'active']))]); }
  r.step(0, `Answer <b>${d[2][2]}</b>: 1 → 3 → 1 → 1 → 1.`, [G('dp', cp(d), [[2, 2, 'done']])]);
  ANIM['Minimum Path Sum'] = W('Rolling row', C_MPS, r.steps);
}

const C_TRI = `
for (int i = n - 1; i >= 0; i--)
    for (int j = 0; j <= i; j++)
        dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
return dp[0];`;
{
  const t = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]], n = 4, r = recorder(); let dp = [0, 0, 0, 0, 0];
  r.step(0, 'triangle [[2],[3,4],[6,5,7],[4,1,8,3]]. dp starts as the virtual row of zeros below.', [R('dp', dp)]);
  for (let i = n - 1; i >= 0; i--) { for (let j = 0; j <= i; j++) dp[j] = t[i][j] + Math.min(dp[j], dp[j + 1]); r.step(ln(C_TRI, 'dp[j] = triangle'), `Row ${i} ${JSON.stringify(t[i])}: add the smaller child.`, [R('row', t[i]), A('dp', dp.slice(0, i + 1), { active: idx(i + 1) })]); }
  r.step(ln(C_TRI, 'return'), `Answer dp[0] = <b>${dp[0]}</b>: 2 + 3 + 5 + 1.`, [A('dp', dp.slice(0, 1), { done: [0] })]);
  ANIM['Triangle'] = W('Bottom-up, O(n) space', C_TRI, r.steps);
}

const C_FP = `
for (int i = 1; i < n; i++) {
    for (int j = 0; j < n; j++) {
        int best = prev[j];
        if (j > 0) best = Math.min(best, prev[j - 1]);
        if (j < n - 1) best = Math.min(best, prev[j + 1]);
        cur[j] = matrix[i][j] + best;
    }
    prev = cur;
}`;
{
  const g = [[2, 1, 3], [6, 5, 4], [7, 8, 9]], n = 3, r = recorder(), d = [g[0].slice()];
  r.step(0, 'matrix [[2,1,3],[6,5,4],[7,8,9]]. Row 0 is the start.', [G('grid', g), G('dp', [d[0]], [], { rowLabels: ['r0'] })]);
  for (let i = 1; i < n; i++) { const cur = []; for (let j = 0; j < n; j++) cur.push(g[i][j] + Math.min(d[i - 1][j], j > 0 ? d[i - 1][j - 1] : 1e9, j < n - 1 ? d[i - 1][j + 1] : 1e9)); d.push(cur); r.step(ln(C_FP, 'cur[j] = matrix'), `Row ${i}: each cell adds the min of the three cells above.`, [G('dp', cp(d).concat(Array.from({ length: n - d.length }, () => Array(n).fill(''))), range(0, n - 1).map(j => [i, j, 'active']))]); }
  r.step(0, `Answer = min of last row = <b>${Math.min(...d[n - 1])}</b>: 1 → 5 → 7.`, [G('dp', cp(d), [[2, d[2].indexOf(Math.min(...d[2])), 'done']])]);
  ANIM['Minimum Falling Path Sum'] = W('Two rows', C_FP, r.steps);
}

const C_FP2 = `
for (int[] row : grid) {
    for (int j = 0; j < n; j++) {
        int cost = row[j] + (j == col1 ? min2 : min1);
        if (cost < nMin1) { nMin2 = nMin1; nMin1 = cost; nCol1 = j; }
        else if (cost < nMin2) nMin2 = cost;
    }
    min1 = nMin1; min2 = nMin2; col1 = nCol1;
}`;
{
  const g = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], r = recorder(); let min1 = 0, min2 = 0, col1 = -1;
  r.step(0, 'grid [[1,2,3],[4,5,6],[7,8,9]]. Keep the two smallest totals of the row above and the column of the smallest.', [G('grid', g)]);
  g.forEach((row, i) => { let n1 = 1e9, n2 = 1e9, nc = -1; const costs = row.map((v, j) => v + (j === col1 ? min2 : min1)); costs.forEach((c, j) => { if (c < n1) { n2 = n1; n1 = c; nc = j; } else if (c < n2) n2 = c; }); r.step(ln(C_FP2, 'int cost'), `Row ${i}: totals ${JSON.stringify(costs)} (a cell in column ${col1} must use min2 = ${min2}, others use min1 = ${min1}).`, [R('totals', costs, { active: [nc] }), R('[min1, min2, col of min1]', [n1, n2, nc])]); min1 = n1; min2 = n2; col1 = nc; });
  r.step(0, `Answer min1 = <b>${min1}</b>: 1 (column 0) → 5 (column 1) → 7 (column 0), no two neighbours share a column.`, [R('answer', [min1], { done: [0] })]);
  ANIM['Minimum Falling Path Sum II'] = W('Track two minima', C_FP2, r.steps);
}

const C_PTS = `
left[0] = prev[0];
for (int j = 1; j < n; j++) left[j] = Math.max(prev[j], left[j - 1] - 1);
right[n - 1] = prev[n - 1];
for (int j = n - 2; j >= 0; j--) right[j] = Math.max(prev[j], right[j + 1] - 1);
for (int j = 0; j < n; j++) cur[j] = points[i][j] + Math.max(left[j], right[j]);`;
{
  const pts = [[1, 2, 3], [1, 5, 1], [3, 1, 1]], n = 3, r = recorder(); let prev = pts[0].slice();
  r.step(0, 'points [[1,2,3],[1,5,1],[3,1,1]]. Row 0 scores are the start.', [A('row 0', prev)]);
  for (let i = 1; i < 3; i++) { const L = [prev[0]], Rr = []; for (let j = 1; j < n; j++) L[j] = Math.max(prev[j], L[j - 1] - 1); Rr[n - 1] = prev[n - 1]; for (let j = n - 2; j >= 0; j--) Rr[j] = Math.max(prev[j], Rr[j + 1] - 1); r.step(ln(C_PTS, 'left[j]'), `Row ${i}: left sweep (best from the left, losing 1 per column) and right sweep.`, [A('prev', prev), A('left', L), A('right', Rr)]); prev = prev.map((_, j) => pts[i][j] + Math.max(L[j], Rr[j])); r.step(ln(C_PTS, 'cur[j]'), `cur[j] = points[${i}][j] + max(left, right) = [${prev}].`, [A('row ' + i, prev, { active: idx(n) })]); }
  r.step(0, `Answer <b>${Math.max(...prev)}</b>: 3 (column 2), 5 (column 1, penalty 1), 3 (column 0, penalty 1).`, [A('row 2', prev, { done: [prev.indexOf(Math.max(...prev))] })]);
  ANIM['Maximum Number of Points with Cost'] = W('Two sweeps', C_PTS, r.steps);
}

const C_DG = `
need[m][n - 1] = 1; need[m - 1][n] = 1;
for (int i = m - 1; i >= 0; i--)
    for (int j = n - 1; j >= 0; j--)
        need[i][j] = Math.max(1, Math.min(need[i + 1][j], need[i][j + 1]) - dungeon[i][j]);
return need[0][0];`;
{
  const g = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]], m = 3, n = 3, r = recorder(), need = g.map(x => x.map(() => '')); const nv = (i, j) => (i === m - 1 && j === n) || (i === m && j === n - 1) ? 1 : (i >= m || j >= n ? 1e9 : need[i][j]);
  r.step(0, 'dungeon [[−2,−3,3],[−5,−10,1],[10,30,−5]]. need[i][j] = health required when entering (i, j). Solve from the princess.', [G('dungeon', g), G('need', cp(need))]);
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) { need[i][j] = Math.max(1, Math.min(nv(i + 1, j), nv(i, j + 1)) - g[i][j]); r.step(ln(C_DG, 'need[i][j] = Math.max'), `(${i},${j}): min(next needs) − ${g[i][j]}, at least 1 → ${need[i][j]}.`, [G('dungeon', g, [[i, j, 'active']]), G('need', cp(need), [[i, j, 'active']])]); }
  r.step(ln(C_DG, 'return'), `Answer need[0][0] = <b>${need[0][0]}</b>.`, [G('need', cp(need), [[0, 0, 'done']])]);
  ANIM['Dungeon Game'] = W('Backwards table', C_DG, r.steps);
}

const C_CH = `
for (int row = 1; row < rows; row++)
    for (int a = 0; a < cols; a++)
        for (int b = 0; b < cols; b++) {
            best = max of dp[a ± 1][b ± 1] (9 pairs)
            next[a][b] = best + grid[row][a] + (a == b ? 0 : grid[row][b]);
        }`;
{
  const g = [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]], rows = 4, cols = 3, r = recorder(); const NEG = -1e9;
  let dp = Array.from({ length: cols }, () => Array(cols).fill(NEG)); dp[0][2] = g[0][0] + g[0][2];
  const show = d => d.map(row => row.map(v => v === NEG ? '·' : v));
  r.step(0, 'grid 4 × 3. Robot A starts at column 0, robot B at column 2. dp[a][b] = best cherries with A in column a, B in column b.', [G('row 0', show(dp), [[0, 2, 'active']], { rowLabels: ['a=0', 'a=1', 'a=2'], colLabels: ['b=0', 'b=1', 'b=2'] })]);
  for (let row = 1; row < rows; row++) { const nx = Array.from({ length: cols }, () => Array(cols).fill(NEG)); for (let a = 0; a < cols; a++) for (let b = 0; b < cols; b++) { let best = NEG; for (let da = -1; da <= 1; da++) for (let db = -1; db <= 1; db++) { const pa = a + da, pb = b + db; if (pa >= 0 && pa < cols && pb >= 0 && pb < cols) best = Math.max(best, dp[pa][pb]); } if (best > NEG / 2) nx[a][b] = best + g[row][a] + (a === b ? 0 : g[row][b]); } dp = nx; r.step(ln(C_CH, 'next[a][b]'), `Row ${row}: each pair (a, b) comes from the best of 9 previous pairs, plus the cherries in both columns.`, [G(`row ${row}`, show(dp), [], { rowLabels: ['a=0', 'a=1', 'a=2'], colLabels: ['b=0', 'b=1', 'b=2'] })]); }
  const best = Math.max(...dp.flat());
  r.step(0, `Answer <b>${best}</b>: the largest cell of the last layer.`, [G('row 3', show(dp), dp.flatMap((row, a) => row.map((v, b) => v === best ? [a, b, 'done'] : null)).filter(Boolean), { rowLabels: ['a=0', 'a=1', 'a=2'], colLabels: ['b=0', 'b=1', 'b=2'] })]);
  ANIM['Cherry Pickup II'] = W('Row layers', C_CH, r.steps);
}

const C_DIVK = `
dp[0][0][grid[0][0] % k] = 1;
for (i, j, r with ways = dp[i][j][r] > 0) {
    if (i + 1 < m) dp[i + 1][j][(r + grid[i + 1][j]) % k] += ways;
    if (j + 1 < n) dp[i][j + 1][(r + grid[i][j + 1]) % k] += ways;
}
return dp[m - 1][n - 1][0];`;
{
  const g = [[5, 2, 4], [3, 0, 5], [0, 7, 2]], k = 3, m = 3, n = 3, r = recorder(), dp = Array.from({ length: m }, () => Array.from({ length: n }, () => Array(k).fill(0)));
  dp[0][0][g[0][0] % k] = 1;
  const view = () => dp.map(row => row.map(c => `[${c.join(',')}]`));
  r.step(ln(C_DIVK, 'dp[0][0]'), 'k = 3. Each cell stores paths per remainder [r0, r1, r2]. Start: 5 % 3 = 2.', [G('grid', g), G('dp (remainders 0,1,2)', view(), [[0, 0, 'active']])]);
  for (let i = 0; i < m; i++) { for (let j = 0; j < n; j++) for (let q = 0; q < k; q++) { const w = dp[i][j][q]; if (!w) continue; if (i + 1 < m) dp[i + 1][j][(q + g[i + 1][j]) % k] += w; if (j + 1 < n) dp[i][j + 1][(q + g[i][j + 1]) % k] += w; } r.step(ln(C_DIVK, 'dp[i + 1][j]'), `Row ${i} pushed into row ${i + 1} and to the right.`, [G('dp (remainders 0,1,2)', view(), range(0, n - 1).map(j => [i, j, 'active']))]); }
  r.step(ln(C_DIVK, 'return'), `Answer dp[2][2][0] = <b>${dp[2][2][0]}</b> paths with sum divisible by 3.`, [G('dp (remainders 0,1,2)', view(), [[2, 2, 'done']])]);
  ANIM['Paths in Matrix Whose Sum Is Divisible by K'] = W('Push forward', C_DIVK, r.steps);
}

const C_MPSG = `
for (int c = add; c <= k; c++) {
    int from = -1;
    if (i > 0) from = Math.max(from, best[i - 1][j][c - add]);
    if (j > 0) from = Math.max(from, best[i][j - 1][c - add]);
    if (from >= 0) best[i][j][c] = from + cell;
}`;
{
  const g = [[0, 1], [2, 0], [1, 2]], k = 3, m = 3, n = 2, r = recorder(), best = Array.from({ length: m }, () => Array.from({ length: n }, () => Array(k + 1).fill(-1)));
  best[0][0][0] = 0;
  const view = () => best.map(row => row.map(c => `[${c.join(',')}]`));
  r.step(0, 'grid [[0,1],[2,0],[1,2]], k = 3. Each cell holds the best score for cost 0..3 (−1 = unreachable).', [G('grid', g), G('best by cost', view(), [[0, 0, 'active']])]);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) { if (!i && !j) continue; const cell = g[i][j], add = cell > 0 ? 1 : 0; for (let c = add; c <= k; c++) { let from = -1; if (i) from = Math.max(from, best[i - 1][j][c - add]); if (j) from = Math.max(from, best[i][j - 1][c - add]); if (from >= 0) best[i][j][c] = from + cell; } r.step(ln(C_MPSG, 'best[i][j][c] ='), `(${i},${j}) value ${cell}: costs ${add} → ${JSON.stringify(best[i][j])}.`, [G('best by cost', view(), [[i, j, 'active']])]); }
  const ans = Math.max(...best[m - 1][n - 1]);
  r.step(0, `Answer: best over all costs ≤ 3 at the end = <b>${ans}</b>.`, [G('best by cost', view(), [[m - 1, n - 1, 'done']])]);
  ANIM['Maximum Path Score in a Grid'] = W('3-D table', C_MPSG, r.steps);
}

const C_ROB = `
int take = from + v;                        // collect the cell
if (v < 0 && t > 0) take = Math.max(take, skipFrom(t - 1));   // or neutralise it
dp[i][j][t] = take;`;
{
  const g = [[0, 1, -1], [1, -2, 3], [2, -3, 4]], m = 3, n = 3, NEG = -1e9, r = recorder(), dp = g.map(row => row.map(() => [NEG, NEG, NEG]));
  r.step(0, 'coins [[0,1,−1],[1,−2,3],[2,−3,4]]. dp[i][j][t]: best with t neutralisations used (t = 0, 1, 2).', [G('coins', g)]);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) { for (let t = 0; t < 3; t++) { const v = g[i][j]; let from = i === 0 && j === 0 ? 0 : NEG; if (i) from = Math.max(from, dp[i - 1][j][t]); if (j) from = Math.max(from, dp[i][j - 1][t]); let b = from === NEG ? NEG : from + v; if (v < 0 && t > 0) { let sk = i === 0 && j === 0 ? 0 : NEG; if (i) sk = Math.max(sk, dp[i - 1][j][t - 1]); if (j) sk = Math.max(sk, dp[i][j - 1][t - 1]); if (sk !== NEG) b = Math.max(b, sk); } dp[i][j][t] = b; } if (g[i][j] < 0 || (i === 0 && j === 0) || (i === m - 1 && j === n - 1)) r.step(ln(C_ROB, 'dp[i][j][t] = take'), `(${i},${j}) coin ${g[i][j]}: [t0, t1, t2] = [${dp[i][j].map(x => x <= NEG / 2 ? '·' : x)}].`, [G('best [t0,t1,t2]', dp.map(row => row.map(c => `[${c.map(x => x <= NEG / 2 ? '·' : x).join(',')}]`)), [[i, j, 'active']])]); }
  const ans = Math.max(...dp[2][2]);
  r.step(0, `Answer = max over t at the end = <b>${ans}</b>.`, [G('best [t0,t1,t2]', dp.map(row => row.map(c => `[${c.map(x => x <= NEG / 2 ? '·' : x).join(',')}]`)), [[2, 2, 'done']])]);
  ANIM['Maximum Amount of Money Robot Can Earn'] = W('Layers by charges used', C_ROB, r.steps);
}

const C_VP = `
ok[0][0][1] = true;
for (i, j, b with ok[i][j][b]) {
    if (i + 1 < m) step(ok[i + 1][j], b, grid[i + 1][j]);
    if (j + 1 < n) step(ok[i][j + 1], b, grid[i][j + 1]);
}
return ok[m - 1][n - 1][0];`;
{
  const g = [['(', '(', '('], [')', '(', ')'], ['(', '(', ')'], ['(', '(', ')']], m = 4, n = 3, r = recorder(), ok = g.map(row => row.map(() => new Set()));
  ok[0][0].add(1);
  const view = () => ok.map(row => row.map(s => s.size ? [...s].sort((x, y) => x - y).join(',') : '·'));
  r.step(0, 'grid rows "(((" ")()" "(()" "(()". Each cell lists the balances reachable there. Start: "(" → balance 1.', [G('grid', g), G('balances', view(), [[0, 0, 'active']])]);
  for (let i = 0; i < m; i++) { for (let j = 0; j < n; j++) for (const b of [...ok[i][j]]) { for (const [ni, nj] of [[i + 1, j], [i, j + 1]]) if (ni < m && nj < n) { const nb = g[ni][nj] === '(' ? b + 1 : b - 1; if (nb >= 0) ok[ni][nj].add(nb); } } r.step(ln(C_VP, 'step(ok[i + 1][j]'), `Row ${i} pushed into row ${i + 1} and to the right.`, [G('balances', view(), range(0, n - 1).map(j => [i, j, 'active']))]); }
  r.step(ln(C_VP, 'return'), `Balance 0 reachable at the end: <b>${ok[m - 1][n - 1].has(0)}</b>.`, [G('balances', view(), [[m - 1, n - 1, ok[m - 1][n - 1].has(0) ? 'done' : 'bad']])]);
  ANIM['Check if There Is a Valid Parentheses String Path'] = W('Balance table', C_VP, r.steps);
}

const C_NNP = `
mx = max(hi[prev] * cell, lo[prev] * cell) over up and left
mn = min(hi[prev] * cell, lo[prev] * cell) over up and left
hi[i][j] = mx; lo[i][j] = mn;
return hi[m - 1][n - 1] < 0 ? -1 : hi % MOD;`;
{
  const g = [[1, -2, 1], [1, -2, 1], [3, -4, 1]], m = 3, n = 3, r = recorder(), hi = g.map(x => x.map(() => '')), lo = g.map(x => x.map(() => ''));
  hi[0][0] = lo[0][0] = 1;
  r.step(0, 'grid [[1,−2,1],[1,−2,1],[3,−4,1]]. Track the largest (hi) and smallest (lo) product reaching each cell.', [G('grid', g), G('hi', cp(hi)), G('lo', cp(lo))]);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) { if (!i && !j) continue; const c = []; if (i) c.push(hi[i - 1][j] * g[i][j], lo[i - 1][j] * g[i][j]); if (j) c.push(hi[i][j - 1] * g[i][j], lo[i][j - 1] * g[i][j]); hi[i][j] = Math.max(...c); lo[i][j] = Math.min(...c); if (j === n - 1 || i === 0) r.step(ln(C_NNP, 'hi[i][j] = mx'), `(${i},${j}) cell ${g[i][j]}: hi ${hi[i][j]}, lo ${lo[i][j]}${g[i][j] < 0 ? ' (negative cell swaps the roles)' : ''}.`, [G('hi', cp(hi), [[i, j, 'active']]), G('lo', cp(lo), [[i, j, 'active']])]); }
  r.step(ln(C_NNP, 'return'), `hi at the end = <b>${hi[2][2]}</b> (not negative), so the answer is ${hi[2][2]}.`, [G('hi', cp(hi), [[2, 2, 'done']])]);
  ANIM['Maximum Non Negative Product in a Matrix'] = W('hi / lo tables', C_NNP, r.steps);
}

const C_PMS = `
for (int[] mv : moves) {
    int pi = i + mv[0], pj = j + mv[1];
    if (score[pi][pj] > best) { best = score[pi][pj]; cnt = ways[pi][pj]; }
    else if (score[pi][pj] == best) cnt += ways[pi][pj];
}
score[i][j] = best + digit; ways[i][j] = cnt;`;
{
  const b = ['E23', '2X2', '12S'], n = 3, r = recorder(), sc = b.map(() => Array(n).fill(-1)), wy = b.map(() => Array(n).fill(0)); sc[2][2] = 0; wy[2][2] = 1;
  const view = () => sc.map((row, i) => row.map((v, j) => b[i][j] === 'X' ? 'X' : v < 0 ? '·' : `${v}×${wy[i][j]}`));
  r.step(0, 'board "E23","2X2","12S". Each cell stores best-score × number-of-ways, filled from S towards E.', [G('score×ways', view(), [[2, 2, 'active']])]);
  for (let i = n - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) { const c = b[i][j]; if (c === 'X' || (i === 2 && j === 2)) continue; let best = -1, cnt = 0; for (const [di, dj] of [[1, 0], [0, 1], [1, 1]]) { const pi = i + di, pj = j + dj; if (pi >= n || pj >= n || sc[pi][pj] < 0) continue; if (sc[pi][pj] > best) { best = sc[pi][pj]; cnt = wy[pi][pj]; } else if (sc[pi][pj] === best) cnt += wy[pi][pj]; } if (best < 0) continue; sc[i][j] = best + (c === 'E' ? 0 : +c); wy[i][j] = cnt; r.step(ln(C_PMS, 'score[i][j] = best'), `(${i},${j}) '${c}': best neighbour ${best} with ${cnt} way${cnt > 1 ? 's' : ''} → score ${sc[i][j]}.`, [G('score×ways', view(), [[i, j, 'active']])]); }
  r.step(0, `Answer <b>[${sc[0][0]}, ${wy[0][0]}]</b>: the best score is ${sc[0][0]}, reached one way.`, [G('score×ways', view(), [[0, 0, 'done']])]);
  ANIM['Number of Paths with Max Score'] = W('Score + ways', C_PMS, r.steps);
}

const C_INC = `
Arrays.sort(order);                       // cells by value
for (long code : order) {
    long w = 1;
    for (4 neighbours) if (grid[r][c] < grid[i][j]) w += ways[r * n + c];
    ways[id] = w % MOD;
    total += ways[id];
}`;
{
  const g = [[1, 1], [3, 4]], r = recorder(), ways = g.map(x => x.map(() => '')); let total = 0;
  const cells = [[0, 0], [0, 1], [1, 0], [1, 1]].sort((a, b) => g[a[0]][a[1]] - g[b[0]][b[1]]);
  r.step(ln(C_INC, 'Arrays.sort'), 'grid [[1,1],[3,4]]. Cells in value order: 1, 1, 3, 4.', [G('grid', g), G('ways ending here', cp(ways))]);
  for (const [i, j] of cells) { let w = 1; for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = i + di, b = j + dj; if (a >= 0 && a < 2 && b >= 0 && b < 2 && g[a][b] < g[i][j]) w += ways[a][b]; } ways[i][j] = w; total += w; r.step(ln(C_INC, 'ways[id]'), `Cell (${i},${j}) = ${g[i][j]}: itself + smaller neighbours → ${w}. Running total ${total}.`, [G('ways ending here', cp(ways), [[i, j, 'active']])]); }
  r.step(0, `Answer <b>${total}</b>.`, [R('total', [total], { done: [0] })]);
  ANIM['Number of Increasing Paths in a Grid'] = W('Sorted cells', C_INC, r.steps);
}

const C_01 = `
// pass 1: top-left to bottom-right
if (i > 0) dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
if (j > 0) dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
// pass 2: bottom-right to top-left
if (i < m - 1) dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
if (j < n - 1) dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);`;
{
  const g = [[0, 0, 0], [0, 1, 0], [1, 1, 1]], m = 3, n = 3, INF = 6, r = recorder(), d = g.map(row => row.map(v => v ? INF : 0));
  r.step(0, 'mat [[0,0,0],[0,1,0],[1,1,1]]. Ones start at "infinity" (6).', [G('dist', cp(d))]);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) { if (g[i][j]) { if (i) d[i][j] = Math.min(d[i][j], d[i - 1][j] + 1); if (j) d[i][j] = Math.min(d[i][j], d[i][j - 1] + 1); } }
  r.step(ln(C_01, 'dist[i - 1][j] + 1'), 'Pass 1 (top-left → bottom-right): distances to zeros above or to the left.', [G('dist', cp(d), idx(m).flatMap(i => idx(n).filter(j => g[i][j]).map(j => [i, j, 'active'])))]);
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) { if (i < m - 1) d[i][j] = Math.min(d[i][j], d[i + 1][j] + 1); if (j < n - 1) d[i][j] = Math.min(d[i][j], d[i][j + 1] + 1); }
  r.step(ln(C_01, 'dist[i + 1][j] + 1'), 'Pass 2 (bottom-right → top-left): fixes cells whose nearest zero is below or to the right.', [G('dist', cp(d), idx(m).flatMap(i => idx(n).filter(j => g[i][j]).map(j => [i, j, 'done'])))]);
  r.step(0, `Answer <b>${JSON.stringify(d)}</b>.`, [G('dist', cp(d))]);
  ANIM['01 Matrix'] = W('Two passes', C_01, r.steps);
}

const C_TEL = `
for (int t = 0; t <= k; t++) {
    pm[v] = min f over cells with value == v; then prefix min over v   // teleport options
    for (i, j from the end)
        g[i][j] = min(pm[grid[i][j]], g[i + 1][j] + grid[i + 1][j], g[i][j + 1] + grid[i][j + 1]);
    f = g;
}`;
{
  const gr = [[1, 3, 3], [2, 5, 2], [1, 4, 1]], m = 3, n = 3, K = 1, r = recorder(); let f = null;
  r.step(0, 'grid [[1,3,3],[2,5,2],[1,4,1]], k = 1. f_t = cheapest cost to the end with t teleports allowed.', [G('grid', gr)]);
  for (let t = 0; t <= K; t++) { const pm = Array(6).fill(1e9); if (t > 0) for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) pm[gr[i][j]] = Math.min(pm[gr[i][j]], f[i][j]); for (let v = 1; v < 6; v++) pm[v] = Math.min(pm[v], pm[v - 1]); const g = gr.map(x => x.map(() => 0)); for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) { if (i === m - 1 && j === n - 1) continue; let b = t > 0 ? pm[gr[i][j]] : 1e9; if (i + 1 < m) b = Math.min(b, g[i + 1][j] + gr[i + 1][j]); if (j + 1 < n) b = Math.min(b, g[i][j + 1] + gr[i][j + 1]); g[i][j] = b; } f = g; r.step(ln(C_TEL, 'f = g'), t === 0 ? 'Layer 0: no teleports, just walk right/down paying each destination cell.' : `Layer ${t}: a cell may also teleport to a cell of value ≤ its own and continue with the layer ${t - 1} cost there.`, [G(`f_${t}`, cp(f), [[0, 0, t === K ? 'done' : 'active']])]); }
  r.step(0, `Answer <b>${f[0][0]}</b>.`, [G(`f_${K}`, cp(f), [[0, 0, 'done']])]);
  ANIM['Minimum Cost Path with Teleportations'] = W('Layered DP + prefix min', C_TEL, r.steps);
}

const C_FRU = `
for (int i = 0; i < n; i++) { total += f[i][i]; f[i][i] = 0; }   // child 1
return total + upperChild(f) + upperChild(transpose(f));
// upperChild: row i, columns j >= max(i, n - 1 - i)
cur[j] = best(prev[j - 1], prev[j], prev[j + 1]) + f[i][j];`;
{
  const f = [[1, 2, 3, 4], [5, 6, 8, 7], [9, 10, 11, 12], [13, 14, 15, 16]], n = 4, r = recorder(); let total = 0; const f0 = f.map(x => x.slice());
  r.step(0, 'fruits 4 × 4. Child 1 (top-left) is forced onto the main diagonal.', [G('fruits', f0, idx(n).map(i => [i, i, 'active']))]);
  for (let i = 0; i < n; i++) { total += f0[i][i]; f0[i][i] = 0; }
  r.step(ln(C_FRU, 'total += f[i][i]'), `Diagonal 1 + 6 + 11 + 16 = ${total}; those cells are now empty.`, [G('fruits left', cp(f0), idx(n).map(i => [i, i, 'done']))]);
  const up = g => { let prev = Array(n).fill(-1e9); prev[n - 1] = g[0][n - 1]; const hist = [prev.slice()]; for (let i = 1; i < n; i++) { const cur = Array(n).fill(-1e9); for (let j = Math.max(i, n - 1 - i); j < n; j++) { let b = prev[j]; if (j) b = Math.max(b, prev[j - 1]); if (j + 1 < n) b = Math.max(b, prev[j + 1]); if (b > -1e8) cur[j] = b + g[i][j]; } prev = cur; hist.push(prev.slice()); } return hist; };
  const h2 = up(f0), t0 = f0.map((row, i) => row.map((_, j) => f0[j][i])), h3 = up(t0);
  h2.forEach((row, i) => { if (i) r.step(ln(C_FRU, 'cur[j]'), `Child 2, row ${i}: best fruits so far in each reachable column = [${row.map(v => v < -1e8 ? '·' : v)}].`, [A('child 2', row.map(v => v < -1e8 ? '·' : v), { active: row.map((v, j) => v > -1e8 ? j : -1).filter(j => j >= 0) })]); });
  r.step(0, `Child 2 collects <b>${h2[n - 1][n - 1]}</b>.`, [A('child 2', h2[n - 1].map(v => v < -1e8 ? '·' : v), { done: [n - 1] })]);
  r.step(0, `Child 3 on the transposed grid collects <b>${h3[n - 1][n - 1]}</b>. Total ${total} + ${h2[n - 1][n - 1]} + ${h3[n - 1][n - 1]} = <b>${total + h2[n - 1][n - 1] + h3[n - 1][n - 1]}</b>.`, [R('totals', [total, h2[n - 1][n - 1], h3[n - 1][n - 1]], { done: [0, 1, 2] })]);
  ANIM['Find the Maximum Number of Fruits Collected'] = W('Diagonal + two triangles', C_FRU, r.steps);
}
