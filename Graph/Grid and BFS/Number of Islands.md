---
topic: Grid and BFS
pattern: [Flood fill, DFS, BFS]
source: LeetCode 200
difficulty: Medium
companies: [Paytm, Amazon, Microsoft, Samsung, Snapdeal, Citrix, D-E-Shaw, Ola Cabs, Visa, LinkedIn]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Number of Islands

> [!TIP]
> **🧠 Memory hook**
> Pour paint on a land cell: it spreads across the whole island. One bucket per island.
> **Mantra: NEW LAND ⇒ COUNT++, SINK THE ISLAND**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=0) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Count the groups of 4-connected 1s in a grid of 0s and 1s.

## Key insight
Scan the grid; each unsunk land cell starts a new island, and the DFS/BFS sinks every cell of it so it is never counted again. Time O(m·n).

## Approach 1: DFS flood fill
```java
// Flood fill with DFS: sink every land cell of an island, count one island per fill
public int numIslandsDfs(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '1') {
                sink(grid, i, j);
                count++;
            }
        }
    }
    return count;
}

// Marks the whole island containing (i, j) as visited
private void sink(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1') return;
    grid[i][j] = '$';
    for (int[] d : DIRS) sink(grid, i + d[0], j + d[1]);
}
```

## Approach 2: BFS flood fill
```java
// Flood fill with BFS: mark cells when they are queued
public int numIslandsBfs(char[][] grid) {
    int m = grid.length, n = grid[0].length, count = 0;
    Queue<int[]> que = new ArrayDeque<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] != '1') continue;
            count++;
            grid[i][j] = '$';
            que.add(new int[]{i, j});
            while (!que.isEmpty()) {
                int[] c = que.poll();
                for (int[] d : DIRS) {
                    int x = c[0] + d[0], y = c[1] + d[1];
                    if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] == '1') {
                        grid[x][y] = '$';
                        que.add(new int[]{x, y});
                    }
                }
            }
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS flood fill | O(m · n) | O(m · n) recursion |
| BFS flood fill | O(m · n) | O(min(m, n)) queue |

## Recall before you reveal
<details><summary>Why overwrite the grid?</summary>

It doubles as the visited marker and costs no extra array. Copy first if the input must stay intact.

</details>


<details><summary>When can DFS overflow the stack?</summary>

A 300 × 300 snake-shaped island recurses 90,000 deep; use BFS or an explicit stack.

</details>


## Connected
- [Max Area of Island](Max%20Area%20of%20Island.md)
- [Island Perimeter](Island%20Perimeter.md)
