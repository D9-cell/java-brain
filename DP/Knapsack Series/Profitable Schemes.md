---
topic: Knapsack Series
pattern: [0-1 knapsack counting, Capped dimension]
source: LeetCode 879
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Profitable Schemes

> [!TIP]
> **🧠 Memory hook**
> Two dimensions: **members used** (a capacity) and **profit** (a goal). Cap profit at minProfit: "enough" is one bucket.
> **Mantra: dp[m][min(P, p + profit)] += dp[m − group][p]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=13) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Crime i needs group[i] members and yields profit[i]. Count subsets of crimes using at most n members with total profit at least minProfit (mod 1e9+7).

## Key insight
Count subsets in a 2-D table over (members, profit). Profit above minProfit does not matter, so it is clamped. The answer sums dp[m][minProfit] over all m ≤ n.

## Approach: 2-D counting
```java
// dp[members][profit] with profit capped at minProfit ("enough" is one bucket)
public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
    long[][] dp = new long[n + 1][minProfit + 1];
    dp[0][0] = 1;
    for (int k = 0; k < group.length; k++)
        for (int m = n; m >= group[k]; m--)
            for (int p = minProfit; p >= 0; p--) {
                int np = Math.min(minProfit, p + profit[k]);
                dp[m][np] = (dp[m][np] + dp[m - group[k]][p]) % MOD;
            }
    long total = 0;
    for (int m = 0; m <= n; m++) total += dp[m][minProfit];
    return (int) (total % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D counting | O(k · n · minProfit) | O(n · minProfit) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why clamp the profit?</summary>

Otherwise the table would need the total profit as a dimension.

</details>


<details><summary>Why loop profit downward too?</summary>

When the clamped profit equals p, the same row cell is read and written.

</details>


## Connected
- [Ones and Zeroes](Ones%20and%20Zeroes.md)
- [Count Subsets with Sum](Count%20Subsets%20with%20Sum.md)
