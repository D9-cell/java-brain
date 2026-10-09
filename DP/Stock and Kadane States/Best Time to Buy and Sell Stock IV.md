---
topic: Stock and Kadane States
pattern: [State machine with a counter, Memo over (day, k, holding)]
source: LeetCode 188
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Best Time to Buy and Sell Stock IV

> [!TIP]
> **🧠 Memory hook**
> Stock III with **k pairs of checkpoints** instead of two.
> **Mantra: buy[t] = max(buy[t], sell[t − 1] − p) · sell[t] = max(sell[t], buy[t] + p)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=1) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Find the maximum profit with at most k transactions.

## Key insight
Generalise the four states to arrays: buy[t] is the best balance while holding the t-th share, sell[t] after the t-th sale. The memo version spells out the choice each day: hold, buy (if flat), or sell (if holding, using up a transaction).

## Approach 1: k pairs of states
```java
// buy[t] / sell[t] = best balance after the t-th buy / sell
public int maxProfit(int k, int[] prices) {
    int[] buy = new int[k + 1], sell = new int[k + 1];
    Arrays.fill(buy, Integer.MIN_VALUE / 2);
    for (int p : prices)
        for (int t = 1; t <= k; t++) {
            buy[t] = Math.max(buy[t], sell[t - 1] - p);
            sell[t] = Math.max(sell[t], buy[t] + p);
        }
    return sell[k];
}
```

## Approach 2: Top-down memo
```java
// Top-down over (day, transactions left, holding)
public int maxProfitMemo(int k, int[] prices) {
    Integer[][][] memo = new Integer[prices.length][k + 1][2];
    return go(prices, 0, k, 0, memo);
}

// Best profit from day i with left trades remaining
private int go(int[] p, int i, int left, int holding, Integer[][][] memo) {
    if (i == p.length || left == 0) return 0;
    if (memo[i][left][holding] != null) return memo[i][left][holding];
    int res = go(p, i + 1, left, holding, memo);
    if (holding == 0) res = Math.max(res, -p[i] + go(p, i + 1, left, 1, memo));
    else res = Math.max(res, p[i] + go(p, i + 1, left - 1, 0, memo));
    return memo[i][left][holding] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| k pairs of states | O(n · k) | O(k) |
| Top-down memo | O(n · k) | O(n · k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>When k ≥ n / 2?</summary>

The limit no longer binds: sum every positive day-to-day rise.

</details>


<details><summary>When does a transaction count?</summary>

At the sale (or the buy), consistently.

</details>


## Connected
- [Best Time to Buy and Sell Stock III](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20III.md)
- [Best Time to Buy and Sell Stock V](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20V.md)
