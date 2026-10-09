---
topic: Grid and BFS
pattern: [Flood fill, Island ids, Union-Find]
source: LeetCode 827
difficulty: Hard
companies: [Google, Uber]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Making A Large Island

> [!TIP]
> **🧠 Memory hook**
> Build a bridge: measure every island once, then for each water cell add the sizes of the distinct islands around it.
> **Mantra: LABEL ONCE; 1 + DISTINCT NEIGHBOUR SIZES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=9) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
You may flip one 0 to 1. Return the largest island possible.

## Key insight
Brute force flips every 0 and re-measures: O(n⁴). Instead label each island with an id and size once. A 0 cell then gets `1 + sum of sizes of the distinct island ids among its four neighbours`. A set avoids counting one island twice.

## Approach 1: Brute force (flip each 0)
```java
// Brute force: flip each 0, run a full DFS to measure the biggest island, flip back
public int largestIslandBrute(int[][] grid) {
    int n = grid.length, best = 0;
    boolean anyZero = false;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] != 0) continue;
            anyZero = true;
            grid[i][j] = 1;
            best = Math.max(best, maxIsland(grid));
            grid[i][j] = 0;
        }
    }
    return anyZero ? best : n * n;
}

// Largest island of the grid as it is, measured on a copy
private int maxIsland(int[][] g) {
    int[][] c = new int[g.length][];
    for (int i = 0; i < g.length; i++) c[i] = g[i].clone();
    int best = 0;
    for (int i = 0; i < c.length; i++) for (int j = 0; j < c.length; j++) best = Math.max(best, fill(c, i, j));
    return best;
}

// Counts and sinks the island containing (i, j)
private int fill(int[][] g, int i, int j) {
    if (i < 0 || i >= g.length || j < 0 || j >= g.length || g[i][j] != 1) return 0;
    g[i][j] = 2;
    int size = 1;
    for (int[] d : DIRS) size += fill(g, i + d[0], j + d[1]);
    return size;
}
```

## Approach 2: Label islands, then each 0
```java
// Optimal: label every island with an id and size once, then each 0 sums the distinct neighbouring islands plus itself
public int largestIsland(int[][] grid) {
    int n = grid.length, id = 2;
    Map<Integer, Integer> size = new HashMap<>();
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (grid[i][j] == 1) size.put(id, label(grid, i, j, id++));
    int best = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] != 0) continue;
            Set<Integer> seen = new HashSet<>();
            int total = 1;
            for (int[] d : DIRS) {
                int x = i + d[0], y = j + d[1];
                if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] > 1 && seen.add(grid[x][y])) total += size.get(grid[x][y]);
            }
            best = Math.max(best, total);
        }
    }
    return best == 0 ? n * n : best;
}

// Paints an island with its id and returns its size
private int label(int[][] g, int i, int j, int id) {
    if (i < 0 || i >= g.length || j < 0 || j >= g.length || g[i][j] != 1) return 0;
    g[i][j] = id;
    int size = 1;
    for (int[] d : DIRS) size += label(g, i + d[0], j + d[1], id);
    return size;
}
```

## Approach 3: Union-Find
```java
// Union-Find with sizes: join land cells, then try every 0 by merging the distinct roots around it
public int largestIslandDsu(int[][] g) {
    int n = g.length;
    int[] parent = new int[n * n], size = new int[n * n];
    for (int i = 0; i < n * n; i++) { parent[i] = i; size[i] = 1; }
    int best = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] == 0) continue;
            for (int[] d : DIRS) {
                int x = i + d[0], y = j + d[1];
                if (x < 0 || x >= n || y < 0 || y >= n || g[x][y] == 0) continue;
                int a = find(parent, i * n + j), b = find(parent, x * n + y);
                if (a != b) { parent[a] = b; size[b] += size[a]; }
            }
        }
    }
    for (int i = 0; i < n * n; i++) if (g[i / n][i % n] == 1) best = Math.max(best, size[find(parent, i)]);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] != 0) continue;
            Set<Integer> roots = new HashSet<>();
            int total = 1;
            for (int[] d : DIRS) {
                int x = i + d[0], y = j + d[1];
                if (x >= 0 && x < n && y >= 0 && y < n && g[x][y] == 1 && roots.add(find(parent, x * n + y))) total += size[find(parent, x * n + y)];
            }
            best = Math.max(best, total);
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
| Brute force (flip each 0) | O(n⁴) | O(n²) |
| Label islands, then each 0 | O(n²) | O(n²) |
| Union-Find | O(n² · α) | O(n²) |

## Recall before you reveal
<details><summary>Why a set of ids?</summary>

The same island can touch the zero from two sides and must be counted once.

</details>


<details><summary>What if there is no 0?</summary>

The answer is n × n.

</details>


## Connected
- [Number of Islands](Number%20of%20Islands.md)
- [Max Area of Island](Max%20Area%20of%20Island.md)
