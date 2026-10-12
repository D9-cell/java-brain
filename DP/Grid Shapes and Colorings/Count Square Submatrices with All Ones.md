---
topic: Grid Shapes and Colorings
pattern: [Square ending here, Sum of dp]
source: LeetCode 1277
difficulty: Medium
companies: [Amazon, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Count Square Submatrices with All Ones

> [!TIP]
> **🧠 Memory hook**
> The side of the largest square ending at a cell **is also the number of squares ending there**.
> **Mantra: ANSWER = Σ dp[i][j]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=1) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
Count all square submatrices that contain only 1s.

## Key insight
A cell with dp = s is the corner of exactly s squares, of sides 1 to s. Add every dp value.

## Approach: Table + sum
```java
// dp[i][j] = side of the largest square ending at (i, j) = number of squares ending there
public int countSquares(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length, total = 0;
    int[][] dp = new int[m][n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 0) continue;
            dp[i][j] = (i == 0 || j == 0) ? 1 : 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            total += dp[i][j];
        }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Table + sum | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why is the side the count?</summary>

If a side-s square fits, so do squares of side 1..s − 1 at the same corner.

</details>


<details><summary>Border cells?</summary>

dp is 1 for any 1 on the first row or column.

</details>


## Connected
- [Maximal Square](Maximal%20Square.md)
