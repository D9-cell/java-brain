---
topic: Grid and BFS
pattern: [State BFS]
source: LeetCode 1293
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Shortest Path in a Grid with Obstacles Elimination

> [!TIP]
> **🧠 Memory hook**
> A cell is not enough to describe where you are: you also need to know how many walls you may still break.
> **Mantra: STATE = (ROW, COL, REMOVALS USED)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=12) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
You may break up to k obstacles. Return the fewest steps from the top-left to the bottom-right.

## Key insight
The same cell can be reached with different numbers of removals used, and fewer used is strictly better later. So BFS over the state (row, col, removals). A shortcut keeps just the best remaining removals per cell.

## Approach 1: BFS over (row, col, used)
```java
// BFS over states (row, col, obstacles removed so far)
public int shortestPath(int[][] grid, int k) {
    int m = grid.length, n = grid[0].length;
    if (m == 1 && n == 1) return 0;
    boolean[][][] visited = new boolean[m][n][k + 1];
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{0, 0, 0});
    visited[0][0][0] = true;
    int steps = 0;
    while (!que.isEmpty()) {
        steps++;
        for (int size = que.size(); size > 0; size--) {
            int[] c = que.poll();
            for (int[] d : DIRS) {
                int x = c[0] + d[0], y = c[1] + d[1];
                if (x < 0 || x >= m || y < 0 || y >= n) continue;
                int used = c[2] + grid[x][y];
                if (used > k || visited[x][y][used]) continue;
                if (x == m - 1 && y == n - 1) return steps;
                visited[x][y][used] = true;
                que.add(new int[]{x, y, used});
            }
        }
    }
    return -1;
}
```

## Approach 2: Best remaining per cell
```java
// Simplified BFS: one number per cell, the most removals still available when we last arrived there
public int shortestPathBestRemaining(int[][] grid, int k) {
    int m = grid.length, n = grid[0].length;
    int[][] bestLeft = new int[m][n];
    for (int[] row : bestLeft) Arrays.fill(row, -1);
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{0, 0, k});
    bestLeft[0][0] = k;
    int steps = 0;
    while (!que.isEmpty()) {
        for (int size = que.size(); size > 0; size--) {
            int[] c = que.poll();
            if (c[0] == m - 1 && c[1] == n - 1) return steps;
            for (int[] d : DIRS) {
                int x = c[0] + d[0], y = c[1] + d[1];
                if (x < 0 || x >= m || y < 0 || y >= n) continue;
                int left = c[2] - grid[x][y];
                if (left < 0 || left <= bestLeft[x][y]) continue;
                bestLeft[x][y] = left;
                que.add(new int[]{x, y, left});
            }
        }
        steps++;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS over (row, col, used) | O(m · n · k) | O(m · n · k) |
| Best remaining per cell | O(m · n · k) | O(m · n) |

## Recall before you reveal
<details><summary>Why is visited three-dimensional?</summary>

Arriving with fewer removals used is a different, better state.

</details>


<details><summary>Easy shortcut?</summary>

If k ≥ m + n − 2 the answer is the Manhattan distance m + n − 2.

</details>


## Connected
- [Shortest Path in Binary Matrix](Shortest%20Path%20in%20Binary%20Matrix.md)
- [Shortest Path Visiting All Nodes](Shortest%20Path%20Visiting%20All%20Nodes.md)
