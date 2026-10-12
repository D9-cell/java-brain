---
topic: Grid Paths
pattern: [Used-count dimension, Right/down DP]
source: LeetCode 3418
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Amount of Money Robot Can Earn

> [!TIP]
> **🧠 Memory hook**
> A cell may be **taken or neutralised**; the second option costs one of at most two charges.
> **Mantra: dp[i][j][t] = max(take, neutralise IF coin < 0 AND t > 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=11) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
The robot walks right/down collecting coins; negative cells are robbers. It can neutralise up to 2 robbers. Return the maximum coins at the end.

## Key insight
The third axis t counts neutralisations used. Taking a cell adds its value. Neutralising a negative cell adds 0 but comes from t − 1.

## Approach: Layers by charges used
```java
// dp[i][j][t] = most coins at (i, j) having neutralised t robbers so far (t = 0..2)
public int maximumAmount(int[][] coins) {
    int m = coins.length, n = coins[0].length, NEG = Integer.MIN_VALUE / 2;
    int[][][] dp = new int[m][n][3];
    for (int[][] plane : dp) for (int[] row : plane) java.util.Arrays.fill(row, NEG);
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            for (int t = 0; t < 3; t++) {
                int v = coins[i][j];
                int from = (i == 0 && j == 0) ? 0 : NEG;
                if (i > 0) from = Math.max(from, dp[i - 1][j][t]);
                if (j > 0) from = Math.max(from, dp[i][j - 1][t]);
                int best = from == NEG ? NEG : from + v;
                if (v < 0 && t > 0) {
                    int skip = (i == 0 && j == 0) ? 0 : NEG;
                    if (i > 0) skip = Math.max(skip, dp[i - 1][j][t - 1]);
                    if (j > 0) skip = Math.max(skip, dp[i][j - 1][t - 1]);
                    if (skip != NEG) best = Math.max(best, skip);
                }
                dp[i][j][t] = best;
            }
    return Math.max(dp[m - 1][n - 1][0], Math.max(dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]));
}
```

| Approach | Time | Space |
|---|---|---|
| Layers by charges used | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why three layers?</summary>

Using 0, 1 or 2 charges.

</details>


<details><summary>Why not always neutralise?</summary>

Only negative cells benefit, and only two are allowed.

</details>


## Connected
- [Maximum Path Score in a Grid](Maximum%20Path%20Score%20in%20a%20Grid.md)
- [Maximum Non Negative Product in a Matrix](Maximum%20Non%20Negative%20Product%20in%20a%20Matrix.md)
