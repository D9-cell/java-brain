---
topic: Grid Paths
pattern: [Two-pass sweep, Multi-source BFS]
source: LeetCode 542
difficulty: Medium
companies: [Amazon, Google, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# 01 Matrix

> [!TIP]
> **🧠 Memory hook**
> A distance only comes from **four directions**; sweep from the top-left and then from the bottom-right to cover all of them.
> **Mantra: PASS 1: min(up, left) + 1 · PASS 2: min(down, right) + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=16) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
For every cell find the distance to the nearest 0 (4-directional moves).

## Key insight
The nearest zero is above-left, above-right, below-left or below-right. The first sweep handles zeros to the top and left, the second sweep fixes the rest. BFS from all zeros at once is the alternative.

## Approach 1: Two passes
```java
// Two passes: best from the top-left neighbours, then fix with the bottom-right neighbours
public int[][] updateMatrix(int[][] mat) {
    int m = mat.length, n = mat[0].length, INF = m + n;
    int[][] dist = new int[m][n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (mat[i][j] == 0) continue;
            dist[i][j] = INF;
            if (i > 0) dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
            if (j > 0) dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
        }
    for (int i = m - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--) {
            if (i < m - 1) dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
            if (j < n - 1) dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
        }
    return dist;
}
```

## Approach 2: Multi-source BFS
```java
// Multi-source BFS from every zero at once
public int[][] updateMatrixBfs(int[][] mat) {
    int m = mat.length, n = mat[0].length;
    int[][] dist = new int[m][n];
    Deque<int[]> queue = new ArrayDeque<>();
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (mat[i][j] == 0) queue.add(new int[]{i, j});
            else dist[i][j] = -1;
        }
    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
    while (!queue.isEmpty()) {
        int[] cur = queue.poll();
        for (int d = 0; d < 4; d++) {
            int r = cur[0] + dr[d], c = cur[1] + dc[d];
            if (r >= 0 && r < m && c >= 0 && c < n && dist[r][c] == -1) {
                dist[r][c] = dist[cur[0]][cur[1]] + 1;
                queue.add(new int[]{r, c});
            }
        }
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes | O(m · n) | O(1) extra |
| Multi-source BFS | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why INF = m + n?</summary>

No distance in the grid is larger.

</details>


<details><summary>Why does BFS work?</summary>

All sources start at distance 0, so cells are reached in distance order.

</details>


## Connected
- [Number of Increasing Paths in a Grid](Number%20of%20Increasing%20Paths%20in%20a%20Grid.md)
- [Minimum Path Sum](Minimum%20Path%20Sum.md)
