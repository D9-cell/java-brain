---
topic: Grid and BFS
pattern: [Multi-source BFS]
source: LeetCode 994
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Rotting Oranges

> [!TIP]
> **🧠 Memory hook**
> All rotten oranges rot their neighbours at the same moment, like several drops of ink spreading together.
> **Mantra: ALL ROTTEN START IN THE QUEUE; LAYER = MINUTE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=6) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Each minute fresh oranges next to rotten ones rot. Return the minutes until none is fresh, or −1.

## Key insight
Put every rotten orange in the queue at time 0 and run BFS: one layer per minute. If fresh oranges remain at the end, they were unreachable: −1.

## Approach: Multi-source BFS by layers
```java
// Every rotten orange is a source at minute 0; each BFS layer is one minute
public int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length, fresh = 0, minutes = 0;
    Queue<int[]> que = new ArrayDeque<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) que.add(new int[]{i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    while (!que.isEmpty() && fresh > 0) {
        minutes++;
        for (int size = que.size(); size > 0; size--) {
            int[] c = que.poll();
            for (int[] d : DIRS) {
                int x = c[0] + d[0], y = c[1] + d[1];
                if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] == 1) {
                    grid[x][y] = 2;
                    fresh--;
                    que.add(new int[]{x, y});
                }
            }
        }
    }
    return fresh == 0 ? minutes : -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Multi-source BFS by layers | O(m · n) | O(m · n) |

## Recall before you reveal
<details><summary>Why one BFS and not one per rotten orange?</summary>

Rot spreads from all sources simultaneously; the first to arrive wins, which is exactly multi-source BFS.

</details>


<details><summary>What if there are no fresh oranges?</summary>

The answer is 0.

</details>


## Connected
- [Map of Highest Peak](Map%20of%20Highest%20Peak.md)
