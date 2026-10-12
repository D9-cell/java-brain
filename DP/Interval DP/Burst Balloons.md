---
topic: Interval DP
pattern: [Last action, Padded ends]
source: LeetCode 312
difficulty: Hard
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Burst Balloons

> [!TIP]
> **🧠 Memory hook**
> Think backwards: pick the **last balloon to burst** in a range. Its neighbours are then the range ends.
> **Mantra: dp[l][r] = max over k of dp[l][k] + a[l]·a[k]·a[r] + dp[k][r]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=2) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Bursting balloon i gives nums[i−1]·nums[i]·nums[i+1] coins (outside is 1). Return the maximum coins for bursting all balloons.

## Key insight
If k is the first burst, the left and right parts affect each other. If k is the LAST balloon in the open interval (l, r), its neighbours at that moment are exactly a[l] and a[r], and the two sides are independent subproblems.

## Approach: Interval DP
```java
// dp[l][r] = best coins for the balloons strictly between l and r; k is the LAST one burst there
public int maxCoins(int[] nums) {
    int n = nums.length;
    int[] a = new int[n + 2];
    a[0] = a[n + 1] = 1;
    for (int i = 0; i < n; i++) a[i + 1] = nums[i];
    int[][] dp = new int[n + 2][n + 2];
    for (int len = 2; len <= n + 1; len++)
        for (int l = 0; l + len <= n + 1; l++) {
            int r = l + len;
            for (int k = l + 1; k < r; k++) dp[l][r] = Math.max(dp[l][r], dp[l][k] + a[l] * a[k] * a[r] + dp[k][r]);
        }
    return dp[0][n + 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Interval DP | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why last and not first?</summary>

The last burst has fixed neighbours; the first one does not.

</details>


<details><summary>Why pad with 1s?</summary>

It handles the boundary rule without special cases.

</details>


## Connected
- [Matrix Chain Multiplication](Matrix%20Chain%20Multiplication.md)
- [Remove Boxes](Remove%20Boxes.md)
- [Minimum Cost to Cut a Stick](Minimum%20Cost%20to%20Cut%20a%20Stick.md)
