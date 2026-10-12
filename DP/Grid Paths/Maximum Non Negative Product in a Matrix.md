---
topic: Grid Paths
pattern: [Max and min state, Right/down DP]
source: LeetCode 1594
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Non Negative Product in a Matrix

> [!TIP]
> **🧠 Memory hook**
> A negative cell flips the order, so keep **both the largest and the smallest** product into each cell.
> **Mantra: new max/min = best/worst of (hi, lo) × cell from both neighbours**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=13) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Find the right/down path with the maximum non-negative product. Return it modulo 10⁹ + 7, or −1 if every product is negative.

## Key insight
The best product into a cell may come from the smallest (most negative) product above it times a negative value. So hi and lo are both carried, and the answer is hi at the end unless it is negative.

## Approach: hi / lo tables
```java
// Keep the largest and smallest product reaching each cell; a negative cell swaps their roles
public int maxProductPath(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    long[][] hi = new long[m][n], lo = new long[m][n];
    hi[0][0] = lo[0][0] = grid[0][0];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            long mx = Long.MIN_VALUE, mn = Long.MAX_VALUE;
            if (i > 0) {
                mx = Math.max(mx, Math.max(hi[i - 1][j] * grid[i][j], lo[i - 1][j] * grid[i][j]));
                mn = Math.min(mn, Math.min(hi[i - 1][j] * grid[i][j], lo[i - 1][j] * grid[i][j]));
            }
            if (j > 0) {
                mx = Math.max(mx, Math.max(hi[i][j - 1] * grid[i][j], lo[i][j - 1] * grid[i][j]));
                mn = Math.min(mn, Math.min(hi[i][j - 1] * grid[i][j], lo[i][j - 1] * grid[i][j]));
            }
            hi[i][j] = mx;
            lo[i][j] = mn;
        }
    return hi[m - 1][n - 1] < 0 ? -1 : (int) (hi[m - 1][n - 1] % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| hi / lo tables | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Do not take % MOD while comparing; only reduce the final answer (up to 4²⁹ fits in long).

## Recall before you reveal
<details><summary>Why mod only at the end?</summary>

Comparing needs the exact values; the grid is small enough for long.

</details>


<details><summary>When −1?</summary>

hi at the end is negative: no non-negative product exists.

</details>


## Connected
- [Maximum Product Subarray](../Stock%20and%20Kadane%20States/Maximum%20Product%20Subarray.md)
- [Minimum Path Sum](Minimum%20Path%20Sum.md)
