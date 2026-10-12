---
topic: Grid Paths
pattern: [Bottom-up, Rolling row]
source: LeetCode 120
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Triangle

> [!TIP]
> **🧠 Memory hook**
> Start at the **bottom row** and fold upwards: each cell adds the smaller child.
> **Mantra: dp[j] = tri[i][j] + min(dp[j], dp[j+1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=3) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
In a triangle you may move to the adjacent number in the row below. Return the minimum top-to-bottom sum.

## Key insight
Going bottom-up every cell already knows the best sum from each of its two children. One array of length n + 1 is reused for every row, shrinking as we climb.

## Approach: Bottom-up, O(n) space
```java
// Bottom-up: each cell adds the smaller of the two cells below it
public int minimumTotal(List<List<Integer>> triangle) {
    int n = triangle.size();
    int[] dp = new int[n + 1];
    for (int i = n - 1; i >= 0; i--)
        for (int j = 0; j <= i; j++) dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
    return dp[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up, O(n) space | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why bottom-up?</summary>

It ends at one cell, dp[0], and needs no boundary checks.

</details>


<details><summary>Why n + 1 cells?</summary>

dp[n] and the bottom row stay 0 as the virtual row below.

</details>


## Connected
- [Minimum Path Sum](Minimum%20Path%20Sum.md)
- [Minimum Falling Path Sum](Minimum%20Falling%20Path%20Sum.md)
