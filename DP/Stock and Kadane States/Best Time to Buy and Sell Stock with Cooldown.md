---
topic: Stock and Kadane States
pattern: [State machine, Cooldown state]
source: LeetCode 309
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Best Time to Buy and Sell Stock with Cooldown

> [!TIP]
> **🧠 Memory hook**
> After selling, the trader must **rest one day**: add a "just sold" state.
> **Mantra: hold = max(hold, rest − p) · sold = hold + p · rest = max(rest, sold)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=3) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Unlimited transactions, but after selling you cannot buy on the next day. Return the maximum profit.

## Key insight
Three states: holding a share, just sold today (cooling), or resting free. A buy must come from rest, not from sold. In the memo view, selling on day i jumps to day i + 2.

## Approach 1: Three states
```java
// hold / sold (cooling today) / rest: three running states
public int maxProfit(int[] prices) {
    int hold = Integer.MIN_VALUE / 2, sold = 0, rest = 0;
    for (int p : prices) {
        int nHold = Math.max(hold, rest - p), nSold = hold + p, nRest = Math.max(rest, sold);
        hold = nHold; sold = nSold; rest = nRest;
    }
    return Math.max(sold, rest);
}
```

## Approach 2: Top-down memo
```java
// Top-down: selling on day i jumps to day i + 2
public int maxProfitMemo(int[] prices) {
    Integer[][] memo = new Integer[prices.length + 2][2];
    return go(prices, 0, 0, memo);
}

// Best profit from day i given whether a share is held
private int go(int[] p, int i, int holding, Integer[][] memo) {
    if (i >= p.length) return 0;
    if (memo[i][holding] != null) return memo[i][holding];
    int res = go(p, i + 1, holding, memo);
    if (holding == 0) res = Math.max(res, -p[i] + go(p, i + 1, 1, memo));
    else res = Math.max(res, p[i] + go(p, i + 2, 0, memo));
    return memo[i][holding] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Three states | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why compute all three before assigning?</summary>

Today's values must use yesterday's states.

</details>


<details><summary>Where is the cooldown?</summary>

Buying only from rest, which is yesterday's sold or rest.

</details>


## Connected
- [Best Time to Buy and Sell Stock with Transaction Fee](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Transaction%20Fee.md)
- [House Robber](../Stairs%20and%20Robbers/House%20Robber.md)
