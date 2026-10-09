---
topic: Grid and BFS
pattern: [BFS on stopping points, DFS]
source: LeetCode 490
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# The Maze

> [!TIP]
> **🧠 Memory hook**
> A rolling ball: you only choose a direction when it stops, so only stopping points are nodes.
> **Mantra: NODE = STOPPING POINT, EDGE = ONE FULL ROLL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=13) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
The ball rolls until it hits a wall. Can it stop at the destination?

## Key insight
Passing over the destination does not count. Treat each stopping position as a node and each full roll in one of four directions as an edge; then DFS or BFS over the stopping points.

## Approach 1: DFS
```java
// DFS where a "neighbour" is a stopping point reached by a full roll
public boolean hasPathDfs(int[][] maze, int[] start, int[] dest) {
    return dfs(maze, start[0], start[1], dest, new boolean[maze.length][maze[0].length]);
}

// Tries all four rolls from a stopping point
private boolean dfs(int[][] maze, int x, int y, int[] dest, boolean[][] visited) {
    if (x == dest[0] && y == dest[1]) return true;
    if (visited[x][y]) return false;
    visited[x][y] = true;
    for (int[] d : DIRS) {
        int[] stop = roll(maze, x, y, d);
        if (!visited[stop[0]][stop[1]] && dfs(maze, stop[0], stop[1], dest, visited)) return true;
    }
    return false;
}

// Rolls from (x, y) in direction d and returns the cell where the ball stops
private int[] roll(int[][] maze, int x, int y, int[] d) {
    while (x + d[0] >= 0 && x + d[0] < maze.length && y + d[1] >= 0 && y + d[1] < maze[0].length && maze[x + d[0]][y + d[1]] == 0) {
        x += d[0];
        y += d[1];
    }
    return new int[]{x, y};
}
```

## Approach 2: BFS
```java
// BFS over the same stopping points
public boolean hasPathBfs(int[][] maze, int[] start, int[] dest) {
    boolean[][] visited = new boolean[maze.length][maze[0].length];
    Queue<int[]> que = new ArrayDeque<>();
    que.add(start);
    visited[start[0]][start[1]] = true;
    while (!que.isEmpty()) {
        int[] c = que.poll();
        if (c[0] == dest[0] && c[1] == dest[1]) return true;
        for (int[] d : DIRS) {
            int[] stop = roll(maze, c[0], c[1], d);
            if (!visited[stop[0]][stop[1]]) {
                visited[stop[0]][stop[1]] = true;
                que.add(stop);
            }
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(m · n · (m + n)) | O(m · n) |
| BFS | O(m · n · (m + n)) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> The C++ original runs the DFS only; its BFS is never called. Both are ported and cross-checked.

## Recall before you reveal
<details><summary>Why is passing through not enough?</summary>

The ball must stop exactly at the destination.

</details>


<details><summary>Cost of one roll?</summary>

Up to max(m, n) cells, which is why total time carries the (m + n) factor.

</details>


## Connected
- [The Maze II](The%20Maze%20II.md)
- [Nearest Exit from Entrance in Maze](Nearest%20Exit%20from%20Entrance%20in%20Maze.md)
