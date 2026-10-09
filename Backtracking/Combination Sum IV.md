---
topic: Backtracking
pattern: [Backtracking + memo, Counting DP]
source: LeetCode 377
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Combination Sum IV

> [!TIP]
> **🧠 Memory hook**
> Order matters: a staircase count.
> **Mantra: MEMO f(t)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=5) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Number of ordered sequences from nums summing to target.

## Key insight
f(t) = Σ f(t − x). The count depends only on t, so memoise (or bottom-up DP).

## Approach 1: Memoised recursion
```java
// Ordered sequences: f(t) = Σ f(t - x) over all x <= t; memoised
private int f(int[] nums, int t, Integer[] memo) {
    if (t == 0) return 1;
    if (memo[t] != null) return memo[t];
    int ways = 0;
    for (int x : nums) if (x <= t) ways += f(nums, t - x, memo);
    return memo[t] = ways;
}

// Memoised recursion
public int combinationSum4(int[] nums, int target) { return f(nums, target, new Integer[target + 1]); }
```

## Approach 2: Bottom-up DP
```java
// Bottom-up version of the same recurrence
public int combinationSum4Dp(int[] nums, int target) {
    int[] dp = new int[target + 1];
    dp[0] = 1;
    for (int t = 1; t <= target; t++) for (int x : nums) if (x <= t) dp[t] += dp[t - x];
    return dp[target];
}
```

| Approach | Time | Space |
|---|---|---|
| Memoised recursion | O(n·target) | O(target) |
| Bottom-up DP | O(n·target) | O(target) |

> [!WARNING]
> **Java gotcha**
> Verified against plain enumeration.

## Recall before you reveal
<details><summary>Order matters → which loop outside in DP?</summary>

Target outside, nums inside (unlike coin change combinations).

</details>


## Connected
- DP folder: Coin Change II
