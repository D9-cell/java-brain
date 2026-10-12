---
topic: Grid Shapes and Colorings
pattern: [Suffix 2D sums, Cuts DP]
source: LeetCode 1444
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Number of Ways of Cutting a Pizza

> [!TIP]
> **🧠 Memory hook**
> Each cut keeps the **bottom-right piece**, so the state is just its top-left corner plus the cuts left.
> **Mantra: dp[cuts][r][c] = Σ dp[cuts−1][next corner] FOR EACH CUT THAT GIVES AN APPLE TO THE PIECE CUT OFF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=4) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
Cut a pizza with apples into k pieces using k − 1 horizontal or vertical cuts, giving the top or left part away each time. Count the ways so every piece has at least one apple (mod 10⁹ + 7).

## Key insight
apples[r][c] counts apples in the rectangle from (r, c) to the bottom-right. A cut at row r hands away rows i..r−1, which has apples iff apples[i][j] − apples[r][j] > 0. The last piece must have an apple too, which is dp[0].

## Approach: Suffix sums + layered DP
```java
// apples[r][c] counts apples in the bottom-right rectangle; dp[cuts][r][c] = ways to split that rectangle with cuts more cuts
public int ways(String[] pizza, int k) {
    int m = pizza.length, n = pizza[0].length();
    int[][] apples = new int[m + 1][n + 1];
    for (int i = m - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--)
            apples[i][j] = (pizza[i].charAt(j) == 'A' ? 1 : 0) + apples[i + 1][j] + apples[i][j + 1] - apples[i + 1][j + 1];
    int[][][] dp = new int[k][m][n];
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) dp[0][i][j] = apples[i][j] > 0 ? 1 : 0;
    for (int cuts = 1; cuts < k; cuts++)
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                long total = 0;
                for (int r = i + 1; r < m; r++) if (apples[i][j] - apples[r][j] > 0) total += dp[cuts - 1][r][j];
                for (int c = j + 1; c < n; c++) if (apples[i][j] - apples[i][c] > 0) total += dp[cuts - 1][i][c];
                dp[cuts][i][j] = (int) (total % MOD);
            }
    return dp[k - 1][0][0];
}
```

| Approach | Time | Space |
|---|---|---|
| Suffix sums + layered DP | O(k · m · n · (m + n)) | O(k · m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why only the bottom-right?</summary>

The piece you keep is always a bottom-right rectangle.

</details>


<details><summary>Base layer?</summary>

One piece left: ways = 1 if the rectangle has an apple.

</details>


## Connected
- [Range Sum Query 2D - Immutable](Range%20Sum%20Query%202D%20-%20Immutable.md)
- [Palindrome Partitioning II](../Palindromes%20and%20Word%20Splits/Palindrome%20Partitioning%20II.md)
