---
topic: Interval DP
pattern: [Last action, Sorted cut points]
source: LeetCode 1547
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Cost to Cut a Stick

> [!TIP]
> **🧠 Memory hook**
> Pick the **first cut** on a stick segment: it costs the segment length and leaves two independent segments.
> **Mantra: dp[i][j] = (pts[j] − pts[i]) + min over k of dp[i][k] + dp[k][j]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=3) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Cut a stick of length n at the given positions in any order; each cut costs the length of the piece being cut. Return the minimum total cost.

## Key insight
Sort the cut points and add 0 and n at the ends. The first cut k on the piece between points i and j costs its length and splits it into (i, k) and (k, j), each solved on its own.

## Approach: Interval DP
```java
// Sorted cut points with both ends; dp[i][j] = cheapest way to make every cut strictly between points i and j
public int minCost(int n, int[] cuts) {
    int m = cuts.length;
    int[] pts = new int[m + 2];
    System.arraycopy(cuts, 0, pts, 1, m);
    pts[m + 1] = n;
    Arrays.sort(pts);
    int[][] dp = new int[m + 2][m + 2];
    for (int len = 2; len <= m + 1; len++)
        for (int i = 0; i + len <= m + 1; i++) {
            int j = i + len, best = Integer.MAX_VALUE;
            for (int k = i + 1; k < j; k++) best = Math.min(best, dp[i][k] + dp[k][j]);
            dp[i][j] = best + pts[j] - pts[i];
        }
    return dp[0][m + 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Interval DP | O(c³) | O(c²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why sort?</summary>

A piece is then a contiguous range of cut indices.

</details>


<details><summary>Compare to Burst Balloons?</summary>

Same shape, with "first cut" instead of "last burst".

</details>


## Connected
- [Burst Balloons](Burst%20Balloons.md)
- [Matrix Chain Multiplication](Matrix%20Chain%20Multiplication.md)
