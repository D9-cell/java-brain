---
topic: Knapsack Series
pattern: [Group knapsack, Prefix of each pile]
source: LeetCode 2218
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Value of K Coins From Piles

> [!TIP]
> **🧠 Memory hook**
> Each pile is a **group**: you take a prefix of length t from it, and the lengths add up to k.
> **Mantra: dp[j] = max(dp[j − t] + top(t)) OVER t, j DOWNWARD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=18) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Piles of coins are given top to bottom. Take exactly k coins, always from the top of some pile. Return the maximum total value.

## Key insight
From each pile you choose how many coins t to take (a prefix). That is a knapsack where every pile offers several mutually exclusive items (t = 1, 2, …) with weight t and value equal to the prefix sum.

## Approach: Group knapsack
```java
// Group knapsack: for each pile choose how many coins t to take from its top
public int maxValueOfCoins(List<List<Integer>> piles, int k) {
    int[] dp = new int[k + 1];
    for (List<Integer> pile : piles)
        for (int j = k; j >= 1; j--) {
            int top = 0;
            for (int t = 1; t <= Math.min(j, pile.size()); t++) {
                top += pile.get(t - 1);
                dp[j] = Math.max(dp[j], dp[j - t] + top);
            }
        }
    return dp[k];
}
```

| Approach | Time | Space |
|---|---|---|
| Group knapsack | O(k · total coins) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why a group, not separate items?</summary>

Taking the 2nd coin needs the 1st: options of one pile exclude each other.

</details>


<details><summary>Why j downward?</summary>

Each pile is used once.

</details>


## Connected
- [0-1 Knapsack](0-1%20Knapsack.md)
- [Coin Change II](Coin%20Change%20II.md)
