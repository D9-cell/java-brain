---
topic: Grid and BFS
pattern: [BFS layers]
source: LeetCode 1926
difficulty: Medium
companies: [Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Nearest Exit from Entrance in Maze

> [!TIP]
> **🧠 Memory hook**
> Ripples spread from the entrance; the first ripple to touch the wall opening is the nearest exit.
> **Mantra: BFS FROM ENTRANCE; FIRST BORDER CELL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=10) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Find the fewest steps from the entrance to any other empty cell on the border.

## Key insight
Unit steps, so BFS gives the shortest distance. The entrance itself does not count as an exit: stop at the first border cell that is not the entrance.

## Approach: BFS by layers
```java
// BFS from the entrance; the first border cell reached (other than the entrance) is the nearest exit
public int nearestExit(char[][] maze, int[] entrance) {
    int m = maze.length, n = maze[0].length, steps = 0;
    boolean[][] visited = new boolean[m][n];
    Queue<int[]> que = new ArrayDeque<>();
    que.add(entrance);
    visited[entrance[0]][entrance[1]] = true;
    while (!que.isEmpty()) {
        steps++;
        for (int size = que.size(); size > 0; size--) {
            int[] c = que.poll();
            for (int[] d : DIRS) {
                int x = c[0] + d[0], y = c[1] + d[1];
                if (x < 0 || x >= m || y < 0 || y >= n || maze[x][y] == '+' || visited[x][y]) continue;
                if (x == 0 || x == m - 1 || y == 0 || y == n - 1) return steps;
                visited[x][y] = true;
                que.add(new int[]{x, y});
            }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS by layers | O(m · n) | O(m · n) |

## Recall before you reveal
<details><summary>Why BFS?</summary>

Every step costs 1.

</details>


<details><summary>Why not count the entrance as an exit?</summary>

The problem says the exit must be a different cell.

</details>


## Connected
- [Shortest Path in Binary Matrix](Shortest%20Path%20in%20Binary%20Matrix.md)
