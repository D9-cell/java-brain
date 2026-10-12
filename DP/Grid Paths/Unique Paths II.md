---
topic: Grid Paths
pattern: [Right/down DP, Blocked cells]
source: LeetCode 63
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Unique Paths II

> [!TIP]
> **🧠 Memory hook**
> Same recurrence, but a cell with an **obstacle gets 0** ways.
> **Mantra: ways[j] = 0 IF BLOCKED ELSE ways[j] + ways[j−1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=1) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Some cells are obstacles (1). Count right/down paths from the top-left to the bottom-right that avoid them.

## Key insight
Reset the cell to 0 when it holds an obstacle; otherwise add the left neighbour. If the start is blocked, ways[0] is reset to 0 and everything stays 0.

## Approach: Rolling row
```java
// Same rolling row, but an obstacle cell resets its ways to 0
public int uniquePathsWithObstacles(int[][] grid) {
    int n = grid[0].length;
    int[] ways = new int[n];
    ways[0] = 1;
    for (int[] row : grid)
        for (int j = 0; j < n; j++) {
            if (row[j] == 1) ways[j] = 0;
            else if (j > 0) ways[j] += ways[j - 1];
        }
    return ways[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling row | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why not touch ways[0] otherwise?</summary>

The first column only inherits from above, which is already in ways[0].

</details>


<details><summary>Blocked start?</summary>

ways[0] = 0 at once, so the answer is 0.

</details>


## Connected
- [Unique Paths](Unique%20Paths.md)
- [Minimum Path Sum](Minimum%20Path%20Sum.md)
