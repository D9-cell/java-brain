---
topic: Grid Paths
pattern: [Cost dimension, Right/down DP]
source: LeetCode 3742
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Path Score in a Grid

> [!TIP]
> **🧠 Memory hook**
> Add a third axis for the **budget spent so far**: best[i][j][c].
> **Mantra: best[i][j][c] = cell + max(best[up][c − cost], best[left][c − cost])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=10) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Cells hold 0, 1 or 2. Each non-zero cell adds its value to the score and costs 1. Return the highest score of a right/down path with total cost at most k, or −1.

## Key insight
The cost of the path is the number of non-zero cells, at most m + n − 1. The state (cell, cost) keeps the best score, and −1 marks unreachable states.

## Approach: 3-D table
```java
// best[i][j][c] = top score reaching (i, j) after spending cost c (every non-zero cell costs 1); -1 means unreachable
public int maxPathScore(int[][] grid, int k) {
    int m = grid.length, n = grid[0].length;
    int[][][] best = new int[m][n][k + 1];
    for (int[][] plane : best) for (int[] row : plane) java.util.Arrays.fill(row, -1);
    int startCost = grid[0][0] > 0 ? 1 : 0;
    if (startCost <= k) best[0][0][startCost] = grid[0][0];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            int cell = grid[i][j], add = cell > 0 ? 1 : 0;
            for (int c = add; c <= k; c++) {
                int from = -1;
                if (i > 0) from = Math.max(from, best[i - 1][j][c - add]);
                if (j > 0) from = Math.max(from, best[i][j - 1][c - add]);
                if (from >= 0) best[i][j][c] = from + cell;
            }
        }
    int ans = -1;
    for (int v : best[m - 1][n - 1]) ans = Math.max(ans, v);
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| 3-D table | O(m · n · k) | O(m · n · k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why −1 for unreachable?</summary>

Scores are never negative, so −1 is safe.

</details>


<details><summary>Cap k?</summary>

k above m + n − 1 can be lowered to that.

</details>


## Connected
- [Maximum Amount of Money Robot Can Earn](Maximum%20Amount%20of%20Money%20Robot%20Can%20Earn.md)
- [Paths in Matrix Whose Sum Is Divisible by K](Paths%20in%20Matrix%20Whose%20Sum%20Is%20Divisible%20by%20K.md)
