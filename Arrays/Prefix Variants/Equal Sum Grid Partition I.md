---
topic: Prefix Variants
pattern: [Row and column prefixes]
source: LeetCode 3546
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Equal Sum Grid Partition I

> [!TIP]
> **🧠 Memory hook**
> A cut works when a **prefix of rows** or a **prefix of columns** sums to exactly **half the total**.
> **Mantra: row sums, column sums · running prefix · 2·prefix == total → true**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=5) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Return true if one horizontal or vertical cut splits the grid into two non-empty parts with equal sums.

## Key insight
Row and column sums reduce the grid to two 1-D arrays; then it is Find Pivot without the pivot.

## Approach: Row and column prefixes
```java
// A horizontal or vertical cut works when a prefix of rows or columns sums to exactly half
public boolean canPartitionGrid(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    long total = 0;
    long[] rows = new long[m], cols = new long[n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            rows[i] += grid[i][j];
            cols[j] += grid[i][j];
            total += grid[i][j];
        }
    long run = 0;
    for (int i = 0; i + 1 < m; i++)
        if ((run += rows[i]) * 2 == total) return true;
    run = 0;
    for (int j = 0; j + 1 < n; j++)
        if ((run += cols[j]) * 2 == total) return true;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Row and column prefixes | O(m · n) | O(m + n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why 2·prefix == total?</summary>

Avoids rounding when total is odd.

</details>


<details><summary>Why stop before the last row?</summary>

Both parts must be non-empty.

</details>


## Connected
- [Equal Sum Grid Partition II](Equal%20Sum%20Grid%20Partition%20II.md)
- [Find Pivot Index](../Prefix%20Sums%20Basics/Find%20Pivot%20Index.md)
