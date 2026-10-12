---
topic: Grid Paths
pattern: [Row by row, 3 neighbours]
source: LeetCode 931
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Falling Path Sum

> [!TIP]
> **🧠 Memory hook**
> Each cell reads the **three cells above it**: straight, left and right.
> **Mantra: dp[i][j] = a[i][j] + min(dp[i−1][j−1..j+1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=4) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
A falling path picks one element per row, each in a column differing by at most 1 from the one above. Return the minimum sum.

## Key insight
Row i only depends on row i − 1, so two rows suffice. Clamp the neighbour range at the edges.

## Approach: Two rows
```java
// Each cell adds the cheapest of the up-to-three cells above it
public int minFallingPathSum(int[][] matrix) {
    int n = matrix.length;
    int[] prev = matrix[0].clone();
    for (int i = 1; i < n; i++) {
        int[] cur = new int[n];
        for (int j = 0; j < n; j++) {
            int best = prev[j];
            if (j > 0) best = Math.min(best, prev[j - 1]);
            if (j < n - 1) best = Math.min(best, prev[j + 1]);
            cur[j] = matrix[i][j] + best;
        }
        prev = cur;
    }
    int ans = Integer.MAX_VALUE;
    for (int v : prev) ans = Math.min(ans, v);
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Two rows | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Answer where?</summary>

The minimum of the last row.

</details>


<details><summary>In place?</summary>

Yes, matrix[i][j] += min(...) works if mutating the input is allowed.

</details>


## Connected
- [Triangle](Triangle.md)
- [Minimum Falling Path Sum II](Minimum%20Falling%20Path%20Sum%20II.md)
