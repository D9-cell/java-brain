---
topic: Grid Paths
pattern: [Right/down DP, Rolling row]
source: LeetCode 64
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Path Sum

> [!TIP]
> **🧠 Memory hook**
> Walk in from the **cheaper** of the two neighbours.
> **Mantra: dp[i][j] = grid[i][j] + min(up, left)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=2) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Find a right/down path from the top-left to the bottom-right with the smallest sum of cell values.

## Key insight
The cheapest way into (i, j) is its own cost plus the cheaper of the cheapest ways into the cell above and the cell to the left. The border cells have a single neighbour.

## Approach: Rolling row
```java
// dp[j] = cheapest cost to reach (i, j) from the top-left, updated in place row by row
public int minPathSum(int[][] grid) {
    int n = grid[0].length;
    int[] dp = new int[n];
    for (int i = 0; i < grid.length; i++)
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) dp[j] = grid[0][0];
            else if (i == 0) dp[j] = dp[j - 1] + grid[i][j];
            else if (j == 0) dp[j] = dp[j] + grid[i][j];
            else dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
        }
    return dp[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling row | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Border cells?</summary>

Only one neighbour exists, so there is no min to take.

</details>


<details><summary>Negative values?</summary>

Still correct; the DP does not assume non-negative costs.

</details>


## Connected
- [Unique Paths](Unique%20Paths.md)
- [Triangle](Triangle.md)
- [Dungeon Game](Dungeon%20Game.md)
