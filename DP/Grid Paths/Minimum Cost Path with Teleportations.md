---
topic: Grid Paths
pattern: [Layers by teleports, Prefix minimum by value]
source: LeetCode 3651
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Cost Path with Teleportations

> [!TIP]
> **🧠 Memory hook**
> Do the DP **once per teleport** and replace "try every landing cell" by a **prefix minimum over cell values**.
> **Mantra: f_t = min(walk, min f_(t−1) over cells with value ≤ grid[i][j])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=17) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Move right or down paying the destination cell's value, or teleport for free to any cell whose value is at most the current cell's, at most k times. Return the minimum cost to the bottom-right.

## Key insight
Layer t is solved from the end backwards. The teleport option for a cell needs the best layer t − 1 value over all cells with a smaller or equal value. Bucket the layer by value, take a prefix minimum, and each cell reads it in O(1).

## Approach: Layered DP + prefix min
```java
// f[t] = cost to the end with t teleports left; a teleport lands on any cell whose value is not larger, found with a prefix minimum by value
public int minCost(int[][] grid, int k) {
    int m = grid.length, n = grid[0].length, INF = Integer.MAX_VALUE / 2, maxV = 0;
    for (int[] row : grid) for (int v : row) maxV = Math.max(maxV, v);
    int[][] f = new int[m][n];
    for (int t = 0; t <= k; t++) {
        int[] pm = new int[maxV + 1];
        Arrays.fill(pm, INF);
        if (t > 0)
            for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) pm[grid[i][j]] = Math.min(pm[grid[i][j]], f[i][j]);
        for (int v = 1; v <= maxV; v++) pm[v] = Math.min(pm[v], pm[v - 1]);
        int[][] g = new int[m][n];
        for (int i = m - 1; i >= 0; i--)
            for (int j = n - 1; j >= 0; j--) {
                if (i == m - 1 && j == n - 1) {
                    g[i][j] = 0;
                    continue;
                }
                int best = t > 0 ? pm[grid[i][j]] : INF;
                if (i + 1 < m) best = Math.min(best, g[i + 1][j] + grid[i + 1][j]);
                if (j + 1 < n) best = Math.min(best, g[i][j + 1] + grid[i][j + 1]);
                g[i][j] = best;
            }
        f = g;
    }
    return f[0][0];
}
```

| Approach | Time | Space |
|---|---|---|
| Layered DP + prefix min | O(k · (m · n + V)) | O(m · n + V) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why does teleporting use layer t − 1?</summary>

One teleport is consumed, so the remaining path has t − 1 left.

</details>


<details><summary>Why not brute force the landing cell?</summary>

It is O((m · n)²) per layer.

</details>


## Connected
- [Out of Boundary Paths](../Counting%20Walks%20and%20Moves/Out%20of%20Boundary%20Paths.md)
- [Number of Increasing Paths in a Grid](Number%20of%20Increasing%20Paths%20in%20a%20Grid.md)
