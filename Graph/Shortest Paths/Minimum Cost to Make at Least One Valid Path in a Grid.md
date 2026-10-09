---
topic: Shortest Paths
pattern: [0-1 BFS, Dijkstra]
source: LeetCode 1368
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Minimum Cost to Make at Least One Valid Path in a Grid

> [!TIP]
> **🧠 Memory hook**
> Follow the signposts for free; changing a signpost costs 1.
> **Mantra: FOLLOW THE ARROW = 0, ANY OTHER DIRECTION = 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=9) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Each cell has an arrow. You may change an arrow at cost 1 (once per cell). Return the minimum total cost for the top-left to reach the bottom-right by following arrows.

## Key insight
From a cell, the move along its arrow costs 0 and the other three directions cost 1 (they require changing that cell). That is a graph with 0/1 weights: 0-1 BFS or Dijkstra.

## Approach 1: 0-1 BFS
```java
// 0-1 BFS: following a cell's arrow is free, turning it costs 1
public int minCost01Bfs(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[][] dist = new int[m][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[0][0] = 0;
    Deque<int[]> dq = new ArrayDeque<>();
    dq.add(new int[]{0, 0});
    while (!dq.isEmpty()) {
        int[] c = dq.pollFirst();
        for (int k = 0; k < 4; k++) {
            int x = c[0] + DIRS[k][0], y = c[1] + DIRS[k][1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int cost = grid[c[0]][c[1]] == k + 1 ? 0 : 1;
            if (dist[c[0]][c[1]] + cost < dist[x][y]) {
                dist[x][y] = dist[c[0]][c[1]] + cost;
                if (cost == 0) dq.addFirst(new int[]{x, y});
                else dq.addLast(new int[]{x, y});
            }
        }
    }
    return dist[m - 1][n - 1];
}
```

## Approach 2: Dijkstra
```java
// Dijkstra with a heap and the same edge costs
public int minCostDijkstra(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[][] dist = new int[m][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]][top[2]]) continue;
        for (int k = 0; k < 4; k++) {
            int x = top[1] + DIRS[k][0], y = top[2] + DIRS[k][1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int nd = top[0] + (grid[top[1]][top[2]] == k + 1 ? 0 : 1);
            if (nd < dist[x][y]) { dist[x][y] = nd; pq.add(new int[]{nd, x, y}); }
        }
    }
    return dist[m - 1][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| 0-1 BFS | O(m · n) | O(m · n) |
| Dijkstra | O(mn log mn) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> The C++ original also lists a backtracking DFS that is exponential and times out; only the shortest-path versions are ported.

## Recall before you reveal
<details><summary>Why 0/1 weights?</summary>

Following the arrow is free; every other move needs one change.

</details>


<details><summary>Why is it never worth changing a cell twice?</summary>

A cell is left only once in a shortest path.

</details>


## Connected
- [Minimum Obstacle Removal to Reach Corner](Minimum%20Obstacle%20Removal%20to%20Reach%20Corner.md)
