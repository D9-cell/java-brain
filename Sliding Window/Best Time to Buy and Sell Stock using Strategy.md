---
topic: Sliding Window
pattern: [Fixed window]
source: LeetCode 3652
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Best Time to Buy and Sell Stock using Strategy

> [!TIP]
> **🧠 Memory hook**
> A half-price coupon window: first half you hold, second half you sell. Slide the coupon and measure its gain.
> **Mantra: GAIN = MODIFIED − ORIGINAL IN A k WINDOW**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=1) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
strategy[i] ∈ {−1, 0, 1}. You may pick one block of k days (k even) and set its first half to 0 and second half to 1. Maximise Σ strategy[i]·prices[i].

## Key insight
Profit = base + gain of the chosen block. Inside a block, the original part is Σ profit and the modified part is the price sum of the second half. Both slide in O(1).

## Approach: Fixed window
```java
// Fixed window of k: track the original profit inside it and the modified profit (second half sells)
public long maxProfit(int[] prices, int[] strategy, int k) {
    int n = prices.length;
    long[] profit = new long[n];
    long actual = 0, original = 0, modified = 0, maxGain = 0;
    for (int d = 0; d < n; d++) {
        profit[d] = (long) strategy[d] * prices[d];
        actual += profit[d];
    }
    for (int i = 0, j = 0; j < n; j++) {
        original += profit[j];
        if (j - i + 1 > k / 2) modified += prices[j];
        if (j - i + 1 > k) {
            original -= profit[i];
            modified -= prices[i + k / 2];
            i++;
        }
        if (j - i + 1 == k) maxGain = Math.max(maxGain, modified - original);
    }
    return actual + maxGain;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Use `long`: profits reach 1e5 · 1e5. Verified against trying every block.

## Recall before you reveal
<details><summary>Which price leaves the modified sum when the window slides?</summary>

`prices[i + k/2]`: that day moves into the first half.

</details>


<details><summary>Why start maxGain at 0?</summary>

Not modifying anything is allowed.

</details>

