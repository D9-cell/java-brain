---
topic: Stock and Kadane States
pattern: [State machine, Prefix + suffix best]
source: LeetCode 123
difficulty: Hard
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Best Time to Buy and Sell Stock III

> [!TIP]
> **🧠 Memory hook**
> Four checkpoints in a row: **buy1 → sell1 → buy2 → sell2**; each price can improve every checkpoint.
> **Mantra: buy1 = max(buy1, −p) · sell1 = max(sell1, buy1 + p) · buy2 = max(buy2, sell1 − p) · sell2 = max(sell2, buy2 + p)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=0) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Find the maximum profit with at most two transactions (you must sell before you buy again).

## Key insight
Each state is the best balance after reaching that checkpoint. Updating them in order on the same day is safe: using the same price twice only produces a zero-profit trade. The split view gives the same answer: best one-trade profit in the prefix plus best one-trade profit in the suffix.

## Approach 1: Four states
```java
// Four running states: after first buy, first sell, second buy, second sell
public int maxProfit(int[] prices) {
    int buy1 = Integer.MIN_VALUE, sell1 = 0, buy2 = Integer.MIN_VALUE, sell2 = 0;
    for (int p : prices) {
        buy1 = Math.max(buy1, -p);
        sell1 = Math.max(sell1, buy1 + p);
        buy2 = Math.max(buy2, sell1 - p);
        sell2 = Math.max(sell2, buy2 + p);
    }
    return sell2;
}
```

## Approach 2: Prefix + suffix
```java
// Split view: best single trade in the prefix plus best single trade in the suffix
public int maxProfitSplit(int[] prices) {
    int n = prices.length;
    int[] left = new int[n], right = new int[n + 1];
    for (int i = 1, low = prices[0]; i < n; i++) { low = Math.min(low, prices[i]); left[i] = Math.max(left[i - 1], prices[i] - low); }
    for (int i = n - 1, high = prices[n - 1]; i >= 0; i--) { high = Math.max(high, prices[i]); right[i] = Math.max(right[i + 1], high - prices[i]); }
    int best = 0;
    for (int i = 0; i < n; i++) best = Math.max(best, left[i] + right[i]);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Four states | O(n) | O(1) |
| Prefix + suffix | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can the states be updated in place?</summary>

Reusing today's price inside one day adds a trade worth 0, which never beats the truth.

</details>


<details><summary>What does buy2 mean?</summary>

Best cash after the first sale minus the second purchase.

</details>


## Connected
- [Best Time to Buy and Sell Stock IV](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20IV.md)
- [Maximum Sum of 3 Non-Overlapping Subarrays](Maximum%20Sum%20of%203%20Non-Overlapping%20Subarrays.md)
