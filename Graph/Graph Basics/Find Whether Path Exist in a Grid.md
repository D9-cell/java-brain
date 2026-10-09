---
topic: Graph Basics
pattern: [Grid BFS, Grid DFS]
source: GfG
difficulty: Medium
companies: [Adobe, Amazon, Morgan Stanley, Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find Whether Path Exist in a Grid

> [!TIP]
> **🧠 Memory hook**
> A grid is a graph whose edges are the four neighbours; walls are missing nodes.
> **Mantra: MARK ON PUSH; NEVER UN-MARK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=3) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
n × n matrix: 1 source, 2 destination, 3 blank, 0 wall. Is the destination reachable moving up/down/left/right?

## Key insight
Mark a cell the moment it is queued (BFS) or entered (DFS) and never clear it. The C++ original clears the cell after the DFS, which turns a linear search into an exponential one.

## Approach 1: BFS
```java
// BFS that marks a cell visited when it is queued, so every cell is queued once
class Solution {
    public boolean hasValidPath(int[][] grid) {
        boolean[][] street = {
            // LEFT  RIGHT UP    DOWN
            {false, false, false, false}, // 0, unused
            {true,  true,  false, false}, // 1
            {false, false, true,  true }, // 2
            {true,  false, false, true }, // 3
            {false, true,  false, true }, // 4
            {true,  false, true,  false}, // 5
            {false, true,  true,  false}  // 6
        };

        int m = grid.length;
        int n = grid[0].length;

        int[] dr = {0, 0, -1, 1};
        int[] dc = {-1, 1, 0, 0};

        boolean[][] visited = new boolean[m][n];
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        visited[0][0] = true;

        while (!q.isEmpty()) {
            int[] curNode = q.poll();
            int curRow = curNode[0];
            int curCol = curNode[1];

            if (curRow == m - 1 && curCol == n - 1) return true;

            boolean[] permittedDirection = street[grid[curRow][curCol]];

            for (int i = 0; i < 4; i++) {
                if (!permittedDirection[i]) continue;

                int nextRow = curRow + dr[i];
                int nextCol = curCol + dc[i];

                if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) continue;
                if (visited[nextRow][nextCol]) continue;

                boolean[] nextStreet = street[grid[nextRow][nextCol]];
                int opposite = i ^ 1;

                if (nextStreet[opposite]) {
                    visited[nextRow][nextCol] = true;
                    q.offer(new int[]{nextRow, nextCol});
                }
            }
        }
        return false;
    }
}
```

## Approach 2: DFS without un-marking
```java
// DFS that never un-marks a cell, which keeps it linear
class Solution {
    private final boolean[][] street = {
        // LEFT  RIGHT UP    DOWN
        {false, false, false, false}, // 0, unused
        {true,  true,  false, false}, // 1
        {false, false, true,  true }, // 2
        {true,  false, false, true }, // 3
        {false, true,  false, true }, // 4
        {true,  false, true,  false}, // 5
        {false, true,  true,  false}  // 6
    };

    private final int[] dr = {0, 0, -1, 1};
    private final int[] dc = {-1, 1, 0, 0};

    private int m, n;
    private boolean[][] visited;

    public boolean hasValidPath(int[][] grid) {
        m = grid.length;
        n = grid[0].length;
        visited = new boolean[m][n];
        return dfs(grid, 0, 0);
    }

    private boolean dfs(int[][] grid, int curRow, int curCol) {
        if (curRow == m - 1 && curCol == n - 1) return true;

        visited[curRow][curCol] = true;

        boolean[] permittedDirection = street[grid[curRow][curCol]];

        for (int i = 0; i < 4; i++) {
            if (!permittedDirection[i]) continue;

            int nextRow = curRow + dr[i];
            int nextCol = curCol + dc[i];

            if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) continue;
            if (visited[nextRow][nextCol]) continue;

            boolean[] nextStreet = street[grid[nextRow][nextCol]];
            if (!nextStreet[i ^ 1]) continue;

            if (dfs(grid, nextRow, nextCol)) return true;
        }
        return false;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n²) | O(n²) |
| DFS without un-marking | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Both C++ originals never set `source_found`/`dest_found`, so they take the *last* 1 and 2 in the grid. Fine when each appears once, wrong otherwise.

## Recall before you reveal
<details><summary>Why not restore the cell in DFS?</summary>

Restoring lets the same cell be re-entered along many routes: exponential time.

</details>


<details><summary>What bug does the BFS original have?</summary>

It marks cells at poll time, so a cell can be queued many times.

</details>


## Connected
- [Find if Path Exists in Graph](Find%20if%20Path%20Exists%20in%20Graph.md)
- [Number of Islands](../Grid%20and%20BFS/Number%20of%20Islands.md)
