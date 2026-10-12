---
topic: Grid Shapes and Colorings
pattern: [Square ending here, Rolling row]
source: LeetCode 221
difficulty: Medium
companies: [Amazon, Google, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximal Square

> [!TIP]
> **🧠 Memory hook**
> A square of side s ending at a cell needs squares of side s − 1 ending at its **three neighbours**.
> **Mantra: dp[i][j] = 1 + min(dp[i−1][j], dp[i][j−1], dp[i−1][j−1]) IF cell = 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=0) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
Find the largest square containing only 1s in a binary matrix and return its area.

## Key insight
dp[i][j] is the side of the largest all-1 square whose bottom-right corner is (i, j). The three neighbours limit it: the smallest of the squares above, to the left and diagonal. One row of dp plus a saved diagonal value is enough.

## Approach: Rolling row
```java
// dp[j] = side of the largest all-1 square whose bottom-right corner is the current cell; diag keeps the old up-left value
public int maximalSquare(char[][] matrix) {
    int n = matrix[0].length, best = 0;
    int[] dp = new int[n + 1];
    for (char[] row : matrix) {
        int diag = 0;
        for (int j = 1; j <= n; j++) {
            int up = dp[j];
            dp[j] = row[j - 1] == '1' ? 1 + Math.min(diag, Math.min(dp[j - 1], up)) : 0;
            best = Math.max(best, dp[j]);
            diag = up;
        }
    }
    return best * best;
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling row | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why min of three?</summary>

Any shorter arm breaks the square.

</details>


<details><summary>Return?</summary>

The area: best × best.

</details>


## Connected
- [Count Square Submatrices with All Ones](Count%20Square%20Submatrices%20with%20All%20Ones.md)
- [Largest Plus Sign](Largest%20Plus%20Sign.md)
