---
topic: LIS and Variants
pattern: [State DP, Counting]
source: LeetCode 1420
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Build Array Where You Can Find The Maximum Exactly K Comparisons

> [!TIP]
> **🧠 Memory hook**
> Track **(length, current max, search cost)**: a new maximum is a cost step, anything else is free.
> **Mantra: dp[len][mx][cost] = mx · dp[len−1][mx][cost] + Σ dp[len−1][p<mx][cost−1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=14) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Count arrays of length n with values in 1..m for which a left-to-right maximum search updates the maximum exactly k times. Return the count mod 10⁹ + 7.

## Key insight
Append one value to an array of length len − 1. If it is at most the current max (mx choices) the cost is unchanged. If it becomes the new maximum mx, the previous max was smaller and cost rose by one.

## Approach: 3-D DP
```java
// dp[len][max][cost] = arrays of length len with maximum max and cost updates of the running maximum
public int numOfArrays(int n, int m, int k) {
    if (k == 0) return 0;
    long[][][] dp = new long[n + 1][m + 1][k + 1];
    for (int v = 1; v <= m; v++) dp[1][v][1] = 1;
    for (int len = 2; len <= n; len++)
        for (int mx = 1; mx <= m; mx++)
            for (int cost = 1; cost <= k; cost++) {
                long ways = dp[len - 1][mx][cost] * mx % MOD;
                for (int prev = 1; prev < mx; prev++) ways += dp[len - 1][prev][cost - 1];
                dp[len][mx][cost] = ways % MOD;
            }
    long total = 0;
    for (int mx = 1; mx <= m; mx++) total += dp[n][mx][k];
    return (int) (total % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| 3-D DP | O(n · m² · k) | O(n · m · k) |

> [!WARNING]
> **Java gotcha**
> Multiply in long before % MOD; dp * mx overflows int.

## Recall before you reveal
<details><summary>Why return 0 for k = 0?</summary>

At least one comparison happens for any non-empty array.

</details>


<details><summary>Optimise?</summary>

Prefix sums over prev make it O(n · m · k).

</details>


## Connected
- [Number of Music Playlists](../Counting%20Walks%20and%20Moves/Number%20of%20Music%20Playlists.md)
- [K Inverse Pairs Array](../Counting%20Walks%20and%20Moves/K%20Inverse%20Pairs%20Array.md)
