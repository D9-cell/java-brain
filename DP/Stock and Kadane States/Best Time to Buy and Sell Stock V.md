---
topic: Stock and Kadane States
pattern: [Three positions, Long or short]
source: LeetCode 3573
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Best Time to Buy and Sell Stock V

> [!TIP]
> **🧠 Memory hook**
> Now a trade can also be a **short**: sell first, buy back later. Three positions: flat, long, short.
> **Mantra: flat → long (−p) or short (+p); long → flat (+p); short → flat (−p); k CLOSES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=2) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
At most k transactions; each is either normal (buy then sell later) or a short sale (sell then buy back later). Transactions cannot overlap and a new one cannot start on the day the previous one closed. Return the maximum profit.

## Key insight
State: day, transactions left, and position (0 flat, 1 long open, 2 short open). Opening a short earns the price now and pays it back at closing. An open position at the end is invalid.

## Approach 1: Rolling arrays per trade count
```java
// free[t] = no position after t trades; longPos[t] / shortPos[t] = holding a long / short in trade t + 1
public long maximumProfit(int[] prices, int k) {
    long[] free = new long[k + 1], longPos = new long[k + 1], shortPos = new long[k + 1];
    Arrays.fill(free, NEG);
    Arrays.fill(longPos, NEG);
    Arrays.fill(shortPos, NEG);
    free[0] = 0;
    for (int p : prices) {
        long[] nf = free.clone(), nl = longPos.clone(), ns = shortPos.clone();
        for (int t = 0; t < k; t++) {
            if (longPos[t] > NEG) nf[t + 1] = Math.max(nf[t + 1], longPos[t] + p);
            if (shortPos[t] > NEG) nf[t + 1] = Math.max(nf[t + 1], shortPos[t] - p);
            if (free[t] > NEG) { nl[t] = Math.max(nl[t], free[t] - p); ns[t] = Math.max(ns[t], free[t] + p); }
        }
        free = nf; longPos = nl; shortPos = ns;
    }
    return Arrays.stream(free).max().getAsLong();
}
```

## Approach 2: Top-down memo
```java
// Top-down over (day, trades left, case): 0 flat, 1 long open, 2 short open
public long maximumProfitMemo(int[] prices, int k) {
    Long[][][] memo = new Long[prices.length][k + 1][3];
    return go(prices, 0, k, 0, memo);
}

// Best profit from day i; an open position at the end is invalid
private long go(int[] p, int i, int left, int c, Long[][][] memo) {
    if (i == p.length) return c == 0 ? 0 : NEG;
    if (memo[i][left][c] != null) return memo[i][left][c];
    long res = go(p, i + 1, left, c, memo);
    if (left > 0) {
        if (c == 1) res = Math.max(res, p[i] + go(p, i + 1, left - 1, 0, memo));
        else if (c == 2) res = Math.max(res, -p[i] + go(p, i + 1, left - 1, 0, memo));
        else res = Math.max(res, Math.max(-p[i] + go(p, i + 1, left, 1, memo), p[i] + go(p, i + 1, left, 2, memo)));
    }
    return memo[i][left][c] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling arrays per trade count | O(n · k) | O(k) |
| Top-down memo | O(n · k) | O(n · k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why forbid a position at the end?</summary>

An unclosed trade has no defined profit.

</details>


<details><summary>How is a short scored?</summary>

+price when opening, −price when closing.

</details>


## Connected
- [Best Time to Buy and Sell Stock IV](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20IV.md)
