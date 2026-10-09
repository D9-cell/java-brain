---
topic: Grid and BFS
pattern: [Grid graph, DFS, BFS]
source: LeetCode 1391
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Check if There is a Valid Path in a Grid

> [!TIP]
> **🧠 Memory hook**
> Pipe pieces: two neighbouring pipes only join if each has an opening toward the other.
> **Mantra: MOVE ONLY IF THE NEIGHBOUR POINTS BACK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=5) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Each cell is one of 6 street pieces. Is there a valid path from the top-left to the bottom-right?

## Key insight
Each piece lists two directions it connects. From a cell you may step to a neighbour in one of those directions **and** only if the neighbour's piece also connects back. Then it is plain DFS/BFS.

## Approach 1: DFS
```java
// DFS: step into a neighbour only if its street also points back at the current cell
public boolean hasValidPathDfs(int[][] grid) {
    return dfs(grid, 0, 0, new boolean[grid.length][grid[0].length]);
}

// Walks mutually connected streets until the bottom-right cell
private boolean dfs(int[][] g, int i, int j, boolean[][] visited) {
    if (i == g.length - 1 && j == g[0].length - 1) return true;
    visited[i][j] = true;
    for (int[] d : STREET[g[i][j]]) {
        int x = i + d[0], y = j + d[1];
        if (x < 0 || x >= g.length || y < 0 || y >= g[0].length || visited[x][y] || !pointsBack(g, x, y, i, j)) continue;
        if (dfs(g, x, y, visited)) return true;
    }
    return false;
}

// Does the street at (x, y) have an exit onto (i, j)?
private boolean pointsBack(int[][] g, int x, int y, int i, int j) {
    for (int[] b : STREET[g[x][y]]) if (x + b[0] == i && y + b[1] == j) return true;
    return false;
}
```

## Approach 2: BFS
```java
// BFS with the same two-way check
public boolean hasValidPathBfs(int[][] g) {
    int m = g.length, n = g[0].length;
    boolean[][] visited = new boolean[m][n];
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{0, 0});
    visited[0][0] = true;
    while (!que.isEmpty()) {
        int[] c = que.poll();
        if (c[0] == m - 1 && c[1] == n - 1) return true;
        for (int[] d : STREET[g[c[0]][c[1]]]) {
            int x = c[0] + d[0], y = c[1] + d[1];
            if (x >= 0 && x < m && y >= 0 && y < n && !visited[x][y] && pointsBack(g, x, y, c[0], c[1])) {
                visited[x][y] = true;
                que.add(new int[]{x, y});
            }
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(m · n) | O(m · n) |
| BFS | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> The C++ original is a DFS only; a BFS and a Union-Find cross-check were added to verify it.

## Recall before you reveal
<details><summary>Why check the neighbour points back?</summary>

A road only exists if both pieces have an opening onto it.

</details>


<details><summary>How do you store the pieces?</summary>

A table from piece number to its two direction vectors.

</details>


## Connected
- [Number of Islands](Number%20of%20Islands.md)
