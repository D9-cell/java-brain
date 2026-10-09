---
topic: Grid and BFS
pattern: [BFS layers, Dijkstra, 8 directions]
source: LeetCode 1091
difficulty: Medium
companies: [Google, Meta, Microsoft, Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Shortest Path in Binary Matrix

> [!TIP]
> **🧠 Memory hook**
> Unit steps on a 8-neighbour grid: BFS is already Dijkstra.
> **Mantra: BFS, 8 DIRECTIONS, COUNT CELLS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=11) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Shortest clear path (counted in cells, 8-directional) from the top-left to the bottom-right of an n × n binary matrix.

## Key insight
Every move costs 1 so BFS finds the shortest path the first time it reaches the corner. A priority-queue Dijkstra works too, but is only needed for unequal weights.

## Approach 1: BFS
```java
// BFS works because every step costs 1: the first time the corner is reached is the shortest
public int shortestPathBfs(int[][] grid) {
    int n = grid.length;
    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
    boolean[][] visited = new boolean[n][n];
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{0, 0});
    visited[0][0] = true;
    int length = 0;
    while (!que.isEmpty()) {
        length++;
        for (int size = que.size(); size > 0; size--) {
            int[] c = que.poll();
            if (c[0] == n - 1 && c[1] == n - 1) return length;
            for (int[] d : DIRS) {
                int x = c[0] + d[0], y = c[1] + d[1];
                if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] == 0 && !visited[x][y]) {
                    visited[x][y] = true;
                    que.add(new int[]{x, y});
                }
            }
        }
    }
    return -1;
}
```

## Approach 2: Dijkstra with a heap
```java
// Dijkstra with a min-heap: the same answer, but it also handles unequal edge weights
public int shortestPathDijkstra(int[][] grid) {
    int n = grid.length;
    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
    int[][] dist = new int[n][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    dist[0][0] = 1;
    pq.add(new int[]{1, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int d = top[0], i = top[1], j = top[2];
        if (d > dist[i][j]) continue;
        if (i == n - 1 && j == n - 1) return d;
        for (int[] dir : DIRS) {
            int x = i + dir[0], y = j + dir[1];
            if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] == 0 && d + 1 < dist[x][y]) {
                dist[x][y] = d + 1;
                pq.add(new int[]{d + 1, x, y});
            }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n²) | O(n²) |
| Dijkstra with a heap | O(n² log n) | O(n²) |

## Recall before you reveal
<details><summary>Why is BFS enough?</summary>

All edges have equal weight.

</details>


<details><summary>Why is the path length counted in cells?</summary>

The problem asks for the number of cells on the path, so the start counts as 1.

</details>


## Connected
- [Nearest Exit from Entrance in Maze](Nearest%20Exit%20from%20Entrance%20in%20Maze.md)
- [Network Delay Time](../Shortest%20Paths/Network%20Delay%20Time.md)
