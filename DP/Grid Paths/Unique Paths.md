---
topic: Grid Paths
pattern: [Right/down DP, Rolling row]
source: LeetCode 62
difficulty: Medium
companies: [Amazon, Google, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Unique Paths

> [!TIP]
> **🧠 Memory hook**
> Every cell is reached from **above or from the left**, so its count is the sum of those two.
> **Mantra: ways[i][j] = ways[i−1][j] + ways[i][j−1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=0) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
A robot starts at the top-left of an m × n grid and moves only right or down. Count the paths to the bottom-right.

## Key insight
The first row and column have exactly one path. Every other cell adds the cell above and the cell to its left. One row is enough: ways[j] still holds the value from the row above until it is updated. Combinatorially it is choosing which m − 1 of the m + n − 2 moves go down.

## Approach 1: Rolling row
```java
// One rolling row: ways[j] += ways[j - 1] (from above plus from the left)
public int uniquePaths(int m, int n) {
    int[] ways = new int[n];
    java.util.Arrays.fill(ways, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++) ways[j] += ways[j - 1];
    return ways[n - 1];
}
```

## Approach 2: Binomial formula
```java
// Choose which of the m + n - 2 moves go down: C(m + n - 2, m - 1)
public int uniquePathsMath(int m, int n) {
    long res = 1;
    int small = Math.min(m, n) - 1, total = m + n - 2;
    for (int i = 1; i <= small; i++) res = res * (total - small + i) / i;
    return (int) res;
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling row | O(m · n) | O(n) |
| Binomial formula | O(min(m, n)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why fill with 1?</summary>

The first row (and, via ways[0] staying 1, the first column) has one path.

</details>


<details><summary>Why divide inside the loop?</summary>

res * (total − small + i) / i stays an exact integer at every step.

</details>


## Connected
- [Unique Paths II](Unique%20Paths%20II.md)
- [Minimum Path Sum](Minimum%20Path%20Sum.md)
