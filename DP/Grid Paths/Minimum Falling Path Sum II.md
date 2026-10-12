---
topic: Grid Paths
pattern: [Row by row, Two smallest]
source: LeetCode 1289
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Falling Path Sum II

> [!TIP]
> **🧠 Memory hook**
> Any column except the same one: use the **smallest** of the previous row, or the **second smallest** if it sits in your own column.
> **Mantra: cost = a[i][j] + (j == col1 ? min2 : min1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=5) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Choose one element per row so that no two adjacent rows use the same column. Return the minimum total.

## Key insight
Scanning the whole previous row for every cell is O(n³). The best compatible value is always min1 unless it is in the same column, in which case min2. So carry min1, min2 and the column of min1.

## Approach: Track two minima
```java
// Only the two smallest values of the previous row matter: use the first unless it is in the same column
public int minFallingPathSum(int[][] grid) {
    int n = grid.length, min1 = 0, min2 = 0, col1 = -1;
    for (int[] row : grid) {
        int nMin1 = Integer.MAX_VALUE, nMin2 = Integer.MAX_VALUE, nCol1 = -1;
        for (int j = 0; j < n; j++) {
            int cost = row[j] + (j == col1 ? min2 : min1);
            if (cost < nMin1) {
                nMin2 = nMin1;
                nMin1 = cost;
                nCol1 = j;
            } else if (cost < nMin2) nMin2 = cost;
        }
        min1 = nMin1;
        min2 = nMin2;
        col1 = nCol1;
    }
    return min1;
}
```

| Approach | Time | Space |
|---|---|---|
| Track two minima | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why is min2 enough?</summary>

Only one column is forbidden, and min2 is the best among the others.

</details>


<details><summary>Ties for the minimum?</summary>

min2 then equals min1 and is still correct.

</details>


## Connected
- [Minimum Falling Path Sum](Minimum%20Falling%20Path%20Sum.md)
- [Paint House](../Counting%20Walks%20and%20Moves/Paint%20House.md)
