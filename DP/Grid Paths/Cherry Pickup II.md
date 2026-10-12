---
topic: Grid Paths
pattern: [Two walkers, Row by row]
source: LeetCode 1463
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Cherry Pickup II

> [!TIP]
> **🧠 Memory hook**
> Move both robots **one row at a time together**, so the state is just their two columns.
> **Mantra: dp[r][c1][c2] = grid[r][c1] + grid[r][c2] + best of the 9 previous column pairs**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=8) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Two robots start at the top-left and top-right of a grid and move down one row per step, shifting column by −1, 0 or +1. Return the maximum cherries collected (a shared cell counts once).

## Key insight
Because both robots advance a row each step, (row, c1, c2) is enough. Each state reads 9 previous states. If both land in one column, count the cell once.

## Approach: Row layers
```java
// dp[c1][c2] = most cherries with robots in columns c1 and c2 of the current row
public int cherryPickup(int[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int[][] dp = new int[cols][cols];
    for (int[] r : dp) java.util.Arrays.fill(r, Integer.MIN_VALUE);
    dp[0][cols - 1] = grid[0][0] + (cols > 1 ? grid[0][cols - 1] : 0);
    for (int row = 1; row < rows; row++) {
        int[][] next = new int[cols][cols];
        for (int[] r : next) java.util.Arrays.fill(r, Integer.MIN_VALUE);
        for (int a = 0; a < cols; a++)
            for (int b = 0; b < cols; b++) {
                int best = Integer.MIN_VALUE;
                for (int da = -1; da <= 1; da++)
                    for (int db = -1; db <= 1; db++) {
                        int pa = a + da, pb = b + db;
                        if (pa >= 0 && pa < cols && pb >= 0 && pb < cols) best = Math.max(best, dp[pa][pb]);
                    }
                if (best == Integer.MIN_VALUE) continue;
                next[a][b] = best + grid[row][a] + (a == b ? 0 : grid[row][b]);
            }
        dp = next;
    }
    int ans = 0;
    for (int[] r : dp) for (int v : r) ans = Math.max(ans, v);
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Row layers | O(rows · cols² · 9) | O(cols²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why simultaneous?</summary>

Different time offsets would need the position of both along the path; same row means same time.

</details>


<details><summary>Same cell?</summary>

Add the value once when c1 == c2.

</details>


## Connected
- [Minimum Falling Path Sum](Minimum%20Falling%20Path%20Sum.md)
- [Find the Maximum Number of Fruits Collected](Find%20the%20Maximum%20Number%20of%20Fruits%20Collected.md)
