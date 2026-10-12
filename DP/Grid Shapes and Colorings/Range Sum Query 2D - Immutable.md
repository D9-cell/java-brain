---
topic: Grid Shapes and Colorings
pattern: [2D prefix sum, Inclusion-exclusion]
source: LeetCode 304
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Range Sum Query 2D - Immutable

> [!TIP]
> **🧠 Memory hook**
> pre[i][j] stores the sum of everything **above and to the left**; any rectangle is four corners.
> **Mantra: sum = D − B − C + A**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=3) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
Preprocess a matrix so that sumRegion(r1, c1, r2, c2) returns the sum of the rectangle in O(1).

## Key insight
Build pre with one extra row and column of zeros. A rectangle equals the big corner at (r2, c2) minus the strips above and to the left, plus the doubly subtracted corner.

## Approach: Prefix table
```java
public class RangeSumQuery2DImmutable {
    private final int[][] pre;

    // pre[i][j] = sum of the rectangle from (0, 0) up to but not including (i, j)
    public RangeSumQuery2DImmutable(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        pre = new int[m + 1][n + 1];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) pre[i + 1][j + 1] = matrix[i][j] + pre[i][j + 1] + pre[i + 1][j] - pre[i][j];
    }

    // Inclusion-exclusion on four prefix corners
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1];
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix table | O(m · n) build, O(1) query | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why add pre[r1][c1]?</summary>

The corner was subtracted twice.

</details>


<details><summary>Why a padded row and column?</summary>

It removes the edge cases for r1 = 0 or c1 = 0.

</details>


## Connected
- [Number of Ways of Cutting a Pizza](Number%20of%20Ways%20of%20Cutting%20a%20Pizza.md)
- [Maximum Sum Rectangle](../Stock%20and%20Kadane%20States/Maximum%20Sum%20Rectangle.md)
