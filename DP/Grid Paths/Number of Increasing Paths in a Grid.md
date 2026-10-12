---
topic: Grid Paths
pattern: [Order by value, Counting]
source: LeetCode 2328
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Number of Increasing Paths in a Grid

> [!TIP]
> **🧠 Memory hook**
> Process cells from **small value to large**: every smaller neighbour is already final.
> **Mantra: ways[c] = 1 + Σ ways[smaller neighbour]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=15) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Count strictly increasing paths of any length (including single cells) in a grid, moving in 4 directions, mod 10⁹ + 7.

## Key insight
A path ends at some cell, so paths ending at c = 1 (the cell alone) plus the paths ending at each strictly smaller neighbour. Sorting by value gives a valid order without recursion, avoiding a deep call stack on a 1000 × 1000 grid.

## Approach: Sorted cells
```java
// Cells in increasing value order: paths ending at a cell = 1 + paths ending at each smaller neighbour
public int countPaths(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    long[] order = new long[m * n];
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) order[i * n + j] = ((long) grid[i][j] << 20) | (i * n + j);
    Arrays.sort(order);
    long[] ways = new long[m * n];
    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
    long total = 0;
    for (long code : order) {
        int id = (int) (code & ((1 << 20) - 1)), i = id / n, j = id % n;
        long w = 1;
        for (int d = 0; d < 4; d++) {
            int r = i + dr[d], c = j + dc[d];
            if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] < grid[i][j]) w += ways[r * n + c];
        }
        ways[id] = w % MOD;
        total += ways[id];
    }
    return (int) (total % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted cells | O(m · n log(m · n)) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Packing value << 20 | index needs index < 2²⁰; use a larger shift if m · n can exceed about a million.

## Recall before you reveal
<details><summary>Why sort instead of DFS?</summary>

DFS depth can reach m · n and overflow the Java stack.

</details>


<details><summary>Answer?</summary>

The sum of ways over all cells.

</details>


## Connected
- [Longest Increasing Subsequence](../LIS%20and%20Variants/Longest%20Increasing%20Subsequence.md)
- [01 Matrix](01%20Matrix.md)
