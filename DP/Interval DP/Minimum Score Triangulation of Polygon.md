---
topic: Interval DP
pattern: [Third corner, Interval by length]
source: LeetCode 1039
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Score Triangulation of Polygon

> [!TIP]
> **🧠 Memory hook**
> The edge (i, j) belongs to exactly one triangle: choose its **third corner k**.
> **Mantra: dp[i][j] = min over k of dp[i][k] + dp[k][j] + v[i]·v[k]·v[j]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=4) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Triangulate a convex polygon with the given vertex values; a triangle scores the product of its vertices. Return the minimum total score.

## Key insight
In any triangulation of vertices i..j, the edge (i, j) lies in one triangle (i, k, j). That cuts the polygon into i..k and k..j, which are triangulated independently.

## Approach: Interval DP
```java
// dp[i][j] = cheapest triangulation of the polygon i..j; k is the third corner of the triangle on edge (i, j)
public int minScoreTriangulation(int[] values) {
    int n = values.length;
    int[][] dp = new int[n][n];
    for (int len = 2; len < n; len++)
        for (int i = 0; i + len < n; i++) {
            int j = i + len;
            dp[i][j] = Integer.MAX_VALUE;
            for (int k = i + 1; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]);
        }
    return dp[0][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Interval DP | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is it Matrix Chain in disguise?</summary>

The same split structure and cost shape.

</details>


<details><summary>Base case?</summary>

A range of two vertices has no triangle.

</details>


## Connected
- [Matrix Chain Multiplication](Matrix%20Chain%20Multiplication.md)
