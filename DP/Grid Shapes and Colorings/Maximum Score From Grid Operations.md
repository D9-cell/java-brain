---
topic: Grid Shapes and Colorings
pattern: [Column heights, Three-column window]
source: LeetCode 3225
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Score From Grid Operations

> [!TIP]
> **🧠 Memory hook**
> Each column ends up black from the top down to some **height**. A white cell scores iff the column beside it is taller.
> **Mantra: score(col) = Σ cells from h[col] to max(h[col−1], h[col+1]) − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=8) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
An n × n grid starts white. An operation blackens a column from row 0 down to a chosen row. A white cell scores its value if a left or right neighbour is black. Return the maximum score.

## Key insight
Only the final heights matter. The score of column c depends on its own height and the heights on both sides, so DP over columns with state (previous height, current height) and a transition choosing the next height. Prefix sums per column give each score in O(1).

## Approach: Heights DP
```java
// Column heights decide everything: a white cell scores when a side neighbour is black. State = heights of the previous two columns
public long maximumScore(int[][] grid) {
    int n = grid.length;
    long[][] pre = new long[n][n + 1];
    for (int c = 0; c < n; c++) for (int r = 0; r < n; r++) pre[c][r + 1] = pre[c][r] + grid[r][c];
    long NEG = Long.MIN_VALUE / 2;
    long[][] dp = new long[n + 1][n + 1];
    for (long[] row : dp) java.util.Arrays.fill(row, NEG);
    for (int b = 0; b <= n; b++) dp[0][b] = 0;
    for (int col = 0; col < n; col++) {
        long[][] next = new long[n + 1][n + 1];
        for (long[] row : next) java.util.Arrays.fill(row, NEG);
        for (int a = 0; a <= n; a++)
            for (int b = 0; b <= n; b++) {
                if (dp[a][b] == NEG) continue;
                for (int c = 0; c <= (col == n - 1 ? 0 : n); c++) {
                    int top = Math.max(a, c);
                    long gain = top > b ? pre[col][top] - pre[col][b] : 0;
                    next[b][c] = Math.max(next[b][c], dp[a][b] + gain);
                }
            }
        dp = next;
    }
    long ans = 0;
    for (int b = 0; b <= n; b++) ans = Math.max(ans, dp[b][0]);
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Heights DP | O(n⁴) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why not O(n³)?</summary>

A running maximum over the previous height shaves a factor, but O(n⁴) is fine for n ≤ 100.

</details>


<details><summary>Why heights 0..n?</summary>

n means a fully black column, 0 means untouched.

</details>


## Connected
- [Domino and Tromino Tiling](../Stairs%20and%20Robbers/Domino%20and%20Tromino%20Tiling.md)
- [Largest Plus Sign](Largest%20Plus%20Sign.md)
