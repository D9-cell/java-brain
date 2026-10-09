---
topic: Shortest Paths
pattern: [Minimax Dijkstra, Binary search, Union-Find]
source: LeetCode 778
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Swim in Rising Water

> [!TIP]
> **🧠 Memory hook**
> Water rises; you can wade through anything at or below the water level, so the best route minimises the highest cell crossed.
> **Mantra: TIME = HIGHEST CELL ON THE PATH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=5) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
At time t the water depth is t everywhere and you may enter a cell of elevation ≤ t. Find the earliest time to reach the bottom-right.

## Key insight
Waiting is free, so the answer is the minimum over paths of the highest cell on the path: minimax. Dijkstra with `max`, a binary search on t with DFS, or Union-Find activating cells in increasing height until the corners connect.

## Approach 1: Dijkstra with max
```java
// Dijkstra where a path costs its highest cell: pop the lowest "highest so far" first
public int swimInWaterDijkstra(int[][] grid) {
    int n = grid.length;
    int[][] best = new int[n][n];
    for (int[] row : best) Arrays.fill(row, Integer.MAX_VALUE);
    best[0][0] = grid[0][0];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{grid[0][0], 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[1] == n - 1 && top[2] == n - 1) return top[0];
        if (top[0] > best[top[1]][top[2]]) continue;
        for (int[] d : DIRS) {
            int x = top[1] + d[0], y = top[2] + d[1];
            if (x < 0 || x >= n || y < 0 || y >= n) continue;
            int t = Math.max(top[0], grid[x][y]);
            if (t < best[x][y]) { best[x][y] = t; pq.add(new int[]{t, x, y}); }
        }
    }
    return -1;
}
```

## Approach 2: Binary search + DFS
```java
// Binary search the time T; a DFS checks whether a path of cells with height at most T exists
public int swimInWaterBinarySearch(int[][] grid) {
    int n = grid.length, low = Math.max(grid[0][0], grid[n - 1][n - 1]), high = n * n - 1;
    while (low < high) {
        int mid = (low + high) / 2;
        if (canSwim(grid, 0, 0, mid, new boolean[n][n])) high = mid;
        else low = mid + 1;
    }
    return low;
}

// DFS through cells no higher than t
private boolean canSwim(int[][] g, int i, int j, int t, boolean[][] seen) {
    if (i < 0 || i >= g.length || j < 0 || j >= g.length || seen[i][j] || g[i][j] > t) return false;
    if (i == g.length - 1 && j == g.length - 1) return true;
    seen[i][j] = true;
    for (int[] d : DIRS) if (canSwim(g, i + d[0], j + d[1], t, seen)) return true;
    return false;
}
```

## Approach 3: Union-Find by height
```java
// Union-Find: activate cells in increasing height order and stop when the two corners join
public int swimInWaterDsu(int[][] grid) {
    int n = grid.length;
    int[] where = new int[n * n], parent = new int[n * n];
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) where[grid[i][j]] = i * n + j;
    for (int i = 0; i < n * n; i++) parent[i] = i;
    boolean[] open = new boolean[n * n];
    for (int t = 0; t < n * n; t++) {
        int cell = where[t], i = cell / n, j = cell % n;
        open[cell] = true;
        for (int[] d : DIRS) {
            int x = i + d[0], y = j + d[1];
            if (x >= 0 && x < n && y >= 0 && y < n && open[x * n + y]) parent[find(parent, cell)] = find(parent, x * n + y);
        }
        if (open[0] && open[n * n - 1] && find(parent, 0) == find(parent, n * n - 1)) return t;
    }
    return n * n - 1;
}

// Root with path halving
private int find(int[] p, int x) {
    while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }
    return x;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with max | O(n² log n) | O(n²) |
| Binary search + DFS | O(n² log n) | O(n²) |
| Union-Find by height | O(n² α) | O(n²) |

## Recall before you reveal
<details><summary>Why is Union-Find enough?</summary>

Activating cells by height and asking "are the corners connected yet" is a connectivity question.

</details>


<details><summary>Why start the binary search at max(start, end)?</summary>

You cannot be there before both corners are submerged.

</details>


## Connected
- [Path With Minimum Effort](Path%20With%20Minimum%20Effort.md)
