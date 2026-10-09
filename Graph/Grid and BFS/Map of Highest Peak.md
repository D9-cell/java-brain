---
topic: Grid and BFS
pattern: [Multi-source BFS]
source: LeetCode 1765
difficulty: Medium
companies: [Google, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Map of Highest Peak

> [!TIP]
> **🧠 Memory hook**
> Water is sea level; every step inland may rise by one, and the highest peak is as far from the sea as possible.
> **Mantra: HEIGHT = DISTANCE TO NEAREST WATER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=7) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Assign heights so water is 0, neighbours differ by at most 1, and the maximum height is as large as possible.

## Key insight
The tallest legal map gives each cell exactly its distance to the nearest water, which a multi-source BFS from all water cells computes.

## Approach: Multi-source BFS
```java
// Water cells are height 0 and the BFS layers give every land cell its distance to the nearest water
public int[][] highestPeak(int[][] isWater) {
    int m = isWater.length, n = isWater[0].length;
    int[][] height = new int[m][n];
    Queue<int[]> que = new ArrayDeque<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (isWater[i][j] == 1) que.add(new int[]{i, j});
            else height[i][j] = -1;
        }
    }
    while (!que.isEmpty()) {
        int[] c = que.poll();
        for (int[] d : DIRS) {
            int x = c[0] + d[0], y = c[1] + d[1];
            if (x >= 0 && x < m && y >= 0 && y < n && height[x][y] == -1) {
                height[x][y] = height[c[0]][c[1]] + 1;
                que.add(new int[]{x, y});
            }
        }
    }
    return height;
}
```

| Approach | Time | Space |
|---|---|---|
| Multi-source BFS | O(m · n) | O(m · n) |

## Recall before you reveal
<details><summary>Why is distance the right height?</summary>

It is the largest value that still keeps neighbours within 1 of a value that reaches 0 at water.

</details>


<details><summary>Why a single queue?</summary>

All water cells start at distance 0.

</details>


## Connected
- [Rotting Oranges](Rotting%20Oranges.md)
