---
topic: Grid Paths
pattern: [Remainder state, Counting]
source: LeetCode 2435
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Paths in Matrix Whose Sum Is Divisible by K

> [!TIP]
> **🧠 Memory hook**
> Count paths **by remainder** instead of by sum: sums are huge, remainders are only k.
> **Mantra: dp[i][j][r] → dp[next][(r + cell) % k]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=9) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Count right/down paths from the top-left to the bottom-right whose sum of values is divisible by k, mod 10⁹ + 7.

## Key insight
Keep how many paths reach each cell with each remainder mod k. Pushing into the next cell shifts the remainder by that cell's value.

## Approach: Push forward
```java
// dp[i][j][r] = paths reaching (i, j) whose sum has remainder r mod k
public int numberOfPaths(int[][] grid, int k) {
    int m = grid.length, n = grid[0].length;
    int[][][] dp = new int[m][n][k];
    dp[0][0][grid[0][0] % k] = 1;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            for (int r = 0; r < k; r++) {
                int ways = dp[i][j][r];
                if (ways == 0) continue;
                if (i + 1 < m) {
                    int nr = (r + grid[i + 1][j]) % k;
                    dp[i + 1][j][nr] = (dp[i + 1][j][nr] + ways) % MOD;
                }
                if (j + 1 < n) {
                    int nr = (r + grid[i][j + 1]) % k;
                    dp[i][j + 1][nr] = (dp[i][j + 1][nr] + ways) % MOD;
                }
            }
    return dp[m - 1][n - 1][0];
}
```

| Approach | Time | Space |
|---|---|---|
| Push forward | O(m · n · k) | O(m · n · k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why remainder only?</summary>

Divisibility depends on sum mod k, so the sum itself is irrelevant.

</details>


<details><summary>Start state?</summary>

dp[0][0][grid[0][0] % k] = 1.

</details>


## Connected
- [Unique Paths](Unique%20Paths.md)
- [Number of Paths with Max Score](Number%20of%20Paths%20with%20Max%20Score.md)
