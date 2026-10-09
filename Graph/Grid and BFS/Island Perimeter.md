---
topic: Grid and BFS
pattern: [Counting, DFS, BFS]
source: LeetCode 463
difficulty: Easy
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Island Perimeter

> [!TIP]
> **🧠 Memory hook**
> Wrap a ribbon round the island: every land side that meets water or the edge needs ribbon.
> **Mantra: 4 × LAND − 2 × SHARED EDGES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=2) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
The grid has exactly one island. Return its perimeter.

## Key insight
Each land cell contributes 4 sides and every pair of touching land cells hides 2 of them. So you can skip the search: count land cells and shared edges.

## Approach 1: DFS counting borders
```java
// DFS: each step off the island or into water adds one unit of border
public int perimeterDfs(int[][] grid) {
    for (int i = 0; i < grid.length; i++) for (int j = 0; j < grid[0].length; j++) if (grid[i][j] == 1) return dfs(grid, i, j);
    return 0;
}

// Counts the border edges around the island reachable from (i, j)
private int dfs(int[][] g, int i, int j) {
    if (i < 0 || i >= g.length || j < 0 || j >= g[0].length || g[i][j] == 0) return 1;
    if (g[i][j] == -1) return 0;
    g[i][j] = -1;
    int edges = 0;
    for (int[] d : DIRS) edges += dfs(g, i + d[0], j + d[1]);
    return edges;
}
```

## Approach 2: BFS counting borders
```java
// BFS: the same counting while walking the island with a queue
public int perimeterBfs(int[][] g) {
    int m = g.length, n = g[0].length;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] != 1) continue;
            int perimeter = 0;
            Queue<int[]> que = new ArrayDeque<>();
            que.add(new int[]{i, j});
            g[i][j] = -1;
            while (!que.isEmpty()) {
                int[] c = que.poll();
                for (int[] d : DIRS) {
                    int x = c[0] + d[0], y = c[1] + d[1];
                    if (x < 0 || x >= m || y < 0 || y >= n || g[x][y] == 0) perimeter++;
                    else if (g[x][y] == 1) {
                        g[x][y] = -1;
                        que.add(new int[]{x, y});
                    }
                }
            }
            return perimeter;
        }
    }
    return 0;
}
```

## Approach 3: Cell formula
```java
// No search at all: every land cell has 4 sides, minus 2 for each land-land neighbour pair
public int perimeterCount(int[][] g) {
    int land = 0, shared = 0;
    for (int i = 0; i < g.length; i++) {
        for (int j = 0; j < g[0].length; j++) {
            if (g[i][j] == 0) continue;
            land++;
            if (i > 0 && g[i - 1][j] == 1) shared++;
            if (j > 0 && g[i][j - 1] == 1) shared++;
        }
    }
    return 4 * land - 2 * shared;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS counting borders | O(m · n) | O(m · n) |
| BFS counting borders | O(m · n) | O(m · n) |
| Cell formula | O(m · n) | O(1) |

## Recall before you reveal
<details><summary>Why count shared edges only up and left?</summary>

Each touching pair is seen once if you only look at the earlier neighbours.

</details>


<details><summary>What is DFS counting?</summary>

Each step into water or off the grid is one unit of perimeter.

</details>


## Connected
- [Number of Islands](Number%20of%20Islands.md)
