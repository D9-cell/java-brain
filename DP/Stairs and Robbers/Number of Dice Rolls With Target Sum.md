---
topic: Stairs and Robbers
pattern: [Last-die argument, Sum DP]
source: LeetCode 1155
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Number of Dice Rolls With Target Sum

> [!TIP]
> **🧠 Memory hook**
> The last die shows a face `f`; the earlier dice must sum to `target − f`.
> **Mantra: dp[d][t] = Σ dp[d−1][t − f]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=16) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Roll n dice with k faces. Return the number of ways the faces sum to target, modulo 1e9+7.

## Key insight
Two-dimensional DP over (dice used, sum). Each cell adds the ≤ k cells of the previous row; one rolling row is enough.

## Approach 1: Table
```java
// dp[d][t] = ways to reach sum t with d dice = sum of dp[d-1][t-face] over faces
public int numRollsToTarget(int n, int k, int target) {
    int[][] dp = new int[n + 1][target + 1];
    dp[0][0] = 1;
    for (int d = 1; d <= n; d++) for (int t = 1; t <= target; t++) for (int f = 1; f <= k && f <= t; f++) dp[d][t] = (dp[d][t] + dp[d - 1][t - f]) % MOD;
    return dp[n][target];
}
```

## Approach 2: Rolling row
```java
// One rolling row
public int numRollsToTargetRolling(int n, int k, int target) {
    int[] dp = new int[target + 1];
    dp[0] = 1;
    for (int d = 1; d <= n; d++) {
        int[] next = new int[target + 1];
        for (int t = 1; t <= target; t++) for (int f = 1; f <= k && f <= t; f++) next[t] = (next[t] + dp[t - f]) % MOD;
        dp = next;
    }
    return dp[target];
}
```

## Approach 3: Top-down memo
```java
// Top-down recursion with memo
public int numRollsToTargetMemo(int n, int k, int target) { return go(n, k, target, new int[n + 1][target + 1]); }

// Ways with d dice left to reach sum t
private int go(int d, int k, int t, int[][] memo) {
    if (d == 0) return t == 0 ? 1 : 0;
    if (t <= 0) return 0;
    if (memo[d][t] != 0) return memo[d][t] - 1;
    int res = 0;
    for (int f = 1; f <= k; f++) res = (res + go(d - 1, k, t - f, memo)) % MOD;
    memo[d][t] = res + 1;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Table | O(n · k · target) | O(n · target) |
| Rolling row | O(n · k · target) | O(target) |
| Top-down memo | O(n · k · target) | O(n · target) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>How to speed it up?</summary>

Use prefix sums over the previous row to make each cell O(1).

</details>


## Connected
- [Coin Change II](../Knapsack%20Series/Coin%20Change%20II.md)
