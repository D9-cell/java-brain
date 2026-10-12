---
topic: Knapsack Series
pattern: [Unbounded knapsack, Try the first piece]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Rod Cutting

> [!TIP]
> **🧠 Memory hook**
> Cut off the **first piece** and solve the rest the same way.
> **Mantra: best[len] = max(price[piece − 1] + best[len − piece])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=10) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
price[i] is the price of a piece of length i + 1. Cut a rod of length n into pieces to maximise the total price.

## Key insight
Pieces of the same length can repeat, so this is unbounded knapsack with capacity n and items = piece lengths. best[len] tries every length for one piece.

## Approach 1: Bottom-up
```java
// Unbounded knapsack: best[len] = max over the first piece of price + best[len - piece]
public int cutRod(int[] price) {
    int n = price.length;
    int[] best = new int[n + 1];
    for (int len = 1; len <= n; len++)
        for (int piece = 1; piece <= len; piece++) best[len] = Math.max(best[len], price[piece - 1] + best[len - piece]);
    return best[n];
}
```

## Approach 2: Top-down memo
```java
// Top-down: the first cut length is tried in turn
public int cutRodMemo(int[] price) {
    int[] memo = new int[price.length + 1];
    Arrays.fill(memo, -1);
    return go(price, price.length, memo);
}

// Best value for a rod of length len
private int go(int[] price, int len, int[] memo) {
    if (len == 0) return 0;
    if (memo[len] >= 0) return memo[len];
    int best = 0;
    for (int piece = 1; piece <= len; piece++) best = Math.max(best, price[piece - 1] + go(price, len - piece, memo));
    return memo[len] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up | O(n²) | O(n) |
| Top-down memo | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is "no cut" covered?</summary>

Yes: the piece of length n.

</details>


<details><summary>Same shape as?</summary>

Integer Break and Coin Change.

</details>


## Connected
- [Maximize The Cut Segments](Maximize%20The%20Cut%20Segments.md)
- [Integer Break](../Stairs%20and%20Robbers/Integer%20Break.md)
- [Minimum Cost to Cut a Stick](../Interval%20DP/Minimum%20Cost%20to%20Cut%20a%20Stick.md)
