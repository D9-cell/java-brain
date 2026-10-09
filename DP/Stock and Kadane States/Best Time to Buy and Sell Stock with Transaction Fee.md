---
topic: Stock and Kadane States
pattern: [Two states, Unlimited trades]
source: LeetCode 714
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Best Time to Buy and Sell Stock with Transaction Fee

> [!TIP]
> **🧠 Memory hook**
> Two pockets: **cash** (no share) and **hold** (one share). Every sale pays a toll.
> **Mantra: cash = max(cash, hold + p − fee) · hold = max(hold, cash − p)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=4) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Unlimited transactions, each sale pays `fee`. Return the maximum profit.

## Key insight
The simplest stock machine: switching from hold to cash pays the fee. Small zig-zags are no longer worth trading, which the max() handles automatically.

## Approach 1: Two states
```java
// cash = best with no share, hold = best while holding one
public int maxProfit(int[] prices, int fee) {
    int cash = 0, hold = -prices[0];
    for (int i = 1; i < prices.length; i++) {
        cash = Math.max(cash, hold + prices[i] - fee);
        hold = Math.max(hold, cash - prices[i]);
    }
    return cash;
}
```

## Approach 2: Top-down memo
```java
// Top-down over (day, holding)
public int maxProfitMemo(int[] prices, int fee) {
    Integer[][] memo = new Integer[prices.length][2];
    return go(prices, fee, 0, 0, memo);
}

// Best profit from day i given whether a share is held
private int go(int[] p, int fee, int i, int holding, Integer[][] memo) {
    if (i == p.length) return 0;
    if (memo[i][holding] != null) return memo[i][holding];
    int res = go(p, fee, i + 1, holding, memo);
    if (holding == 0) res = Math.max(res, -p[i] + go(p, fee, i + 1, 1, memo));
    else res = Math.max(res, p[i] - fee + go(p, fee, i + 1, 0, memo));
    return memo[i][holding] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Two states | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Can you update hold with the new cash?</summary>

Yes: that is selling and rebuying the same day, which only loses the fee.

</details>


<details><summary>Without a fee?</summary>

It becomes Stock II: sum every rise.

</details>


## Connected
- [Best Time to Buy and Sell Stock with Cooldown](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Cooldown.md)
- [Maximum Alternating Subsequence Sum](../Counting%20Walks%20and%20Moves/Maximum%20Alternating%20Subsequence%20Sum.md)
