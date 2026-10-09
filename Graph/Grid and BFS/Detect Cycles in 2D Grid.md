---
topic: Grid and BFS
pattern: [Undirected cycle, DFS, BFS]
source: LeetCode 1559
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Detect Cycles in 2D Grid

> [!TIP]
> **🧠 Memory hook**
> Same letters form a ring around a different letter: you walk round and arrive back where you started.
> **Mantra: VISITED SAME LETTER THAT IS NOT MY PARENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=4) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Is there a cycle (length ≥ 4, same letter, no step straight back) in the grid?

## Key insight
A grid is an undirected graph, so use the undirected cycle rule: reaching a visited same-letter cell that is not the one we came from means a cycle. Any grid cycle automatically has length ≥ 4.

## Approach 1: DFS with parent
```java
// DFS remembering the cell we came from: a visited same-letter neighbour that is not the parent closes a cycle
public boolean containsCycleDfs(char[][] grid) {
    boolean[][] visited = new boolean[grid.length][grid[0].length];
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) if (!visited[i][j] && dfs(grid, i, j, -1, -1, visited)) return true;
    }
    return false;
}

// Returns true when a cycle is found below (i, j)
private boolean dfs(char[][] g, int i, int j, int pi, int pj, boolean[][] visited) {
    visited[i][j] = true;
    for (int[] d : DIRS) {
        int x = i + d[0], y = j + d[1];
        if (x < 0 || x >= g.length || y < 0 || y >= g[0].length || g[x][y] != g[i][j] || (x == pi && y == pj)) continue;
        if (visited[x][y] || dfs(g, x, y, i, j, visited)) return true;
    }
    return false;
}
```

## Approach 2: BFS with parent
```java
// BFS with (cell, parent) in the queue
public boolean containsCycleBfs(char[][] g) {
    int m = g.length, n = g[0].length;
    boolean[][] visited = new boolean[m][n];
    for (int si = 0; si < m; si++) {
        for (int sj = 0; sj < n; sj++) {
            if (visited[si][sj]) continue;
            Queue<int[]> que = new ArrayDeque<>();
            que.add(new int[]{si, sj, -1, -1});
            visited[si][sj] = true;
            while (!que.isEmpty()) {
                int[] c = que.poll();
                for (int[] d : DIRS) {
                    int x = c[0] + d[0], y = c[1] + d[1];
                    if (x < 0 || x >= m || y < 0 || y >= n || g[x][y] != g[c[0]][c[1]] || (x == c[2] && y == c[3])) continue;
                    if (visited[x][y]) return true;
                    visited[x][y] = true;
                    que.add(new int[]{x, y, c[0], c[1]});
                }
            }
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with parent | O(m · n) | O(m · n) |
| BFS with parent | O(m · n) | O(m · n) |

## Recall before you reveal
<details><summary>Why is length ≥ 4 automatic?</summary>

In a 4-connected grid the shortest cycle is a 2 × 2 square.

</details>


<details><summary>Why track the parent?</summary>

The cell we just came from is a visited neighbour but not a cycle.

</details>


## Connected
- [Detect Cycle in an Undirected Graph](../Graph%20Basics/Detect%20Cycle%20in%20an%20Undirected%20Graph.md)
