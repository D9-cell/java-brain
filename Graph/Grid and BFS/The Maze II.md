---
topic: Grid and BFS
pattern: [Dijkstra on stopping points, DFS]
source: LeetCode 505
difficulty: Medium
companies: [Google, NetEase]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# The Maze II

> [!TIP]
> **🧠 Memory hook**
> Same rolling ball, but now the roll length matters, so shortest means shortest distance, not fewest rolls.
> **Mantra: DIJKSTRA ON STOPS, WEIGHT = ROLL LENGTH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=14) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Return the shortest distance (cells travelled) for the ball to stop at the destination.

## Key insight
Edge weights are the roll lengths, so use Dijkstra over stopping points. The simple DFS/relaxation also works: revisit a stopping point only if you found a strictly shorter way to it.

## Approach 1: DFS with distance relaxation
```java
// DFS that revisits a stopping point only when it finds a strictly shorter way to it
public int shortestDistanceDfs(int[][] maze, int[] start, int[] dest) {
    int[][] dist = new int[maze.length][maze[0].length];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[start[0]][start[1]] = 0;
    dfs(maze, start[0], start[1], dist);
    int d = dist[dest[0]][dest[1]];
    return d == Integer.MAX_VALUE ? -1 : d;
}

// Rolls in each direction and recurses only when the new distance improves
private void dfs(int[][] maze, int x, int y, int[][] dist) {
    for (int[] d : DIRS) {
        int nx = x, ny = y, steps = 0;
        while (nx + d[0] >= 0 && nx + d[0] < maze.length && ny + d[1] >= 0 && ny + d[1] < maze[0].length && maze[nx + d[0]][ny + d[1]] == 0) {
            nx += d[0];
            ny += d[1];
            steps++;
        }
        if (dist[x][y] + steps < dist[nx][ny]) {
            dist[nx][ny] = dist[x][y] + steps;
            dfs(maze, nx, ny, dist);
        }
    }
}
```

## Approach 2: Dijkstra
```java
// Dijkstra over stopping points: the edge weight is the roll length
public int shortestDistanceDijkstra(int[][] maze, int[] start, int[] dest) {
    int m = maze.length, n = maze[0].length;
    int[][] dist = new int[m][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[start[0]][start[1]] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, start[0], start[1]});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]][top[2]]) continue;
        for (int[] d : DIRS) {
            int nx = top[1], ny = top[2], steps = 0;
            while (nx + d[0] >= 0 && nx + d[0] < m && ny + d[1] >= 0 && ny + d[1] < n && maze[nx + d[0]][ny + d[1]] == 0) {
                nx += d[0];
                ny += d[1];
                steps++;
            }
            if (top[0] + steps < dist[nx][ny]) {
                dist[nx][ny] = top[0] + steps;
                pq.add(new int[]{dist[nx][ny], nx, ny});
            }
        }
    }
    int d = dist[dest[0]][dest[1]];
    return d == Integer.MAX_VALUE ? -1 : d;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with distance relaxation | O(m · n · (m + n)) typical | O(m · n) |
| Dijkstra | O(m · n · (m + n) · log) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> The C++ BFS function has no return statement (undefined behaviour); only its side effect on `t[][]` is used.

## Recall before you reveal
<details><summary>Why not plain BFS?</summary>

Fewer rolls can still be a longer total distance.

</details>


<details><summary>Why does DFS need no visited array?</summary>

It only recurses when it improves a distance.

</details>


## Connected
- [The Maze](The%20Maze.md)
- [Network Delay Time](../Shortest%20Paths/Network%20Delay%20Time.md)
