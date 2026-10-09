---
topic: Grid and BFS
pattern: [Flood fill, DFS, BFS, Union-Find]
source: LeetCode 2658
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Maximum Number of Fish in a Grid

> [!TIP]
> **🧠 Memory hook**
> Each pond is a group of connected water cells; add up the fish in the richest pond.
> **Mantra: DFS RETURNS THE SUM OF THE POND**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=8) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Cells hold a fish count (0 = land). Return the most fish you can catch in one connected pond.

## Key insight
It is Max Area of Island with each cell worth its fish count instead of 1.

## Approach 1: DFS
```java
// DFS returns the fish count of the pond it drains
public int findMaxFishDfs(int[][] grid) {
    int best = 0;
    for (int i = 0; i < grid.length; i++) for (int j = 0; j < grid[0].length; j++) best = Math.max(best, fish(grid, i, j));
    return best;
}

// Collects the fish of the pond containing (i, j) and zeroes it so it is not counted twice
private int fish(int[][] g, int i, int j) {
    if (i < 0 || i >= g.length || j < 0 || j >= g[0].length || g[i][j] == 0) return 0;
    int here = g[i][j];
    g[i][j] = 0;
    for (int[] d : DIRS) here += fish(g, i + d[0], j + d[1]);
    return here;
}
```

## Approach 2: BFS
```java
// BFS sums the fish as cells are dequeued
public int findMaxFishBfs(int[][] g) {
    int m = g.length, n = g[0].length, best = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] == 0) continue;
            int sum = 0;
            Queue<int[]> que = new ArrayDeque<>();
            que.add(new int[]{i, j});
            sum += g[i][j];
            g[i][j] = 0;
            while (!que.isEmpty()) {
                int[] c = que.poll();
                for (int[] d : DIRS) {
                    int x = c[0] + d[0], y = c[1] + d[1];
                    if (x >= 0 && x < m && y >= 0 && y < n && g[x][y] > 0) {
                        sum += g[x][y];
                        g[x][y] = 0;
                        que.add(new int[]{x, y});
                    }
                }
            }
            best = Math.max(best, sum);
        }
    }
    return best;
}
```

## Approach 3: Union-Find with sums
```java
// Union-Find keeping the fish total per root
public int findMaxFishDsu(int[][] g) {
    int m = g.length, n = g[0].length;
    int[] parent = new int[m * n];
    int[] total = new int[m * n];
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) { parent[i * n + j] = i * n + j; total[i * n + j] = g[i][j]; }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] == 0) continue;
            for (int[] d : new int[][]{{1, 0}, {0, 1}}) {
                int x = i + d[0], y = j + d[1];
                if (x >= m || y >= n || g[x][y] == 0) continue;
                int a = find(parent, i * n + j), b = find(parent, x * n + y);
                if (a != b) {
                    parent[a] = b;
                    total[b] += total[a];
                }
            }
        }
    }
    int best = 0;
    for (int i = 0; i < m * n; i++) if (find(parent, i) == i) best = Math.max(best, total[i]);
    return best;
}

// Finds the root with path halving
private int find(int[] p, int x) {
    while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }
    return x;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(m · n) | O(m · n) |
| BFS | O(m · n) | O(m · n) |
| Union-Find with sums | O(m · n · α) | O(m · n) |

## Recall before you reveal
<details><summary>What changes from Max Area?</summary>

Only what each cell contributes.

</details>


<details><summary>Why zero the cell after reading it?</summary>

So it is never counted twice.

</details>


## Connected
- [Max Area of Island](Max%20Area%20of%20Island.md)
