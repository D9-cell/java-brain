---
topic: Shortest Paths
pattern: [0-1 BFS, Dijkstra]
source: LeetCode 2290
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Minimum Obstacle Removal to Reach Corner

> [!TIP]
> **🧠 Memory hook**
> Two kinds of road: free ones go to the front of the queue, costly ones to the back.
> **Mantra: 0-1 BFS: weight 0 → addFirst, weight 1 → addLast**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=8) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Grid of 0 (empty) and 1 (obstacle). Minimum obstacles to remove to go from the top-left to the bottom-right.

## Key insight
Entering an obstacle costs 1, an empty cell 0. With only two weights a deque replaces the heap: free moves go to the front, costly ones to the back, and nodes still come out in distance order.

## Approach 1: 0-1 BFS
```java
// 0-1 BFS: a deque where free moves go to the front and costly moves to the back keeps nodes in distance order without a heap
public int minimumObstacles01Bfs(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[][] dist = new int[m][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[0][0] = 0;
    Deque<int[]> dq = new ArrayDeque<>();
    dq.add(new int[]{0, 0});
    while (!dq.isEmpty()) {
        int[] c = dq.pollFirst();
        for (int[] d : DIRS) {
            int x = c[0] + d[0], y = c[1] + d[1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int nd = dist[c[0]][c[1]] + grid[x][y];
            if (nd < dist[x][y]) {
                dist[x][y] = nd;
                if (grid[x][y] == 0) dq.addFirst(new int[]{x, y});
                else dq.addLast(new int[]{x, y});
            }
        }
    }
    return dist[m - 1][n - 1];
}
```

## Approach 2: Dijkstra
```java
// Plain Dijkstra with a heap, same costs
public int minimumObstaclesDijkstra(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[][] dist = new int[m][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]][top[2]]) continue;
        if (top[1] == m - 1 && top[2] == n - 1) return top[0];
        for (int[] d : DIRS) {
            int x = top[1] + d[0], y = top[2] + d[1];
            if (x >= 0 && x < m && y >= 0 && y < n && top[0] + grid[x][y] < dist[x][y]) {
                dist[x][y] = top[0] + grid[x][y];
                pq.add(new int[]{dist[x][y], x, y});
            }
        }
    }
    return dist[m - 1][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| 0-1 BFS | O(m · n) | O(m · n) |
| Dijkstra | O(mn log mn) | O(m · n) |

## Recall before you reveal
<details><summary>Why does the deque keep order?</summary>

Every queued node is within 1 of the front distance, and 0-edges stay in the same distance layer.

</details>


<details><summary>Why not plain BFS?</summary>

Weights are not all equal.

</details>


## Connected
- [Minimum Cost to Make at Least One Valid Path in a Grid](Minimum%20Cost%20to%20Make%20at%20Least%20One%20Valid%20Path%20in%20a%20Grid.md)
