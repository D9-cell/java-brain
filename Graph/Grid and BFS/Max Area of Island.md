---
topic: Grid and BFS
pattern: [Flood fill, DFS, Union-Find]
source: LeetCode 695
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Max Area of Island

> [!TIP]
> **🧠 Memory hook**
> The flood fill reports how much paint it used.
> **Mantra: DFS RETURNS THE SIZE: 1 + SUM OF NEIGHBOURS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=1) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Return the area of the largest island (0 if none).

## Key insight
Same scan as Number of Islands, but the DFS returns `1 + sum of the four neighbours`. A Union-Find version tracks component sizes while merging.

## Approach 1: DFS returning sizes
```java
// DFS returns the size of the island it floods
public int maxAreaDfs(int[][] grid) {
    int best = 0;
    for (int i = 0; i < grid.length; i++) for (int j = 0; j < grid[0].length; j++) best = Math.max(best, area(grid, i, j));
    return best;
}

// Sinks the island at (i, j) and returns its cell count
private int area(int[][] g, int i, int j) {
    if (i < 0 || i >= g.length || j < 0 || j >= g[0].length || g[i][j] != 1) return 0;
    g[i][j] = 2;
    int size = 1;
    for (int[] d : DIRS) size += area(g, i + d[0], j + d[1]);
    return size;
}
```

## Approach 2: BFS counting
```java
// BFS counts cells as they are queued
public int maxAreaBfs(int[][] g) {
    int m = g.length, n = g[0].length, best = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] != 1) continue;
            int size = 1;
            g[i][j] = 2;
            Queue<int[]> que = new ArrayDeque<>();
            que.add(new int[]{i, j});
            while (!que.isEmpty()) {
                int[] c = que.poll();
                for (int[] d : DIRS) {
                    int x = c[0] + d[0], y = c[1] + d[1];
                    if (x >= 0 && x < m && y >= 0 && y < n && g[x][y] == 1) {
                        g[x][y] = 2;
                        size++;
                        que.add(new int[]{x, y});
                    }
                }
            }
            best = Math.max(best, size);
        }
    }
    return best;
}
```

## Approach 3: Union-Find with sizes
```java
// Union-Find with component sizes: union each land cell with its land neighbours
public int maxAreaDsu(int[][] g) {
    int m = g.length, n = g[0].length;
    int[] parent = new int[m * n], size = new int[m * n];
    for (int i = 0; i < m * n; i++) { parent[i] = i; size[i] = 1; }
    int best = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] != 1) continue;
            best = Math.max(best, 1);
            for (int[] d : DIRS) {
                int x = i + d[0], y = j + d[1];
                if (x < 0 || x >= m || y < 0 || y >= n || g[x][y] != 1) continue;
                int a = find(parent, i * n + j), b = find(parent, x * n + y);
                if (a == b) continue;
                parent[a] = b;
                size[b] += size[a];
                best = Math.max(best, size[b]);
            }
        }
    }
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
| DFS returning sizes | O(m · n) | O(m · n) |
| BFS counting | O(m · n) | O(min(m, n)) |
| Union-Find with sizes | O(m · n · α) | O(m · n) |

## Recall before you reveal
<details><summary>What does the DFS return?</summary>

The number of cells it sank, including itself.

</details>


<details><summary>Why is Union-Find useful here?</summary>

It lets you add land cells one by one and ask for the biggest component at any time.

</details>


## Connected
- [Number of Islands](Number%20of%20Islands.md)
- [Maximum Number of Fish in a Grid](Maximum%20Number%20of%20Fish%20in%20a%20Grid.md)
