---
topic: Knapsack Series
pattern: [Unbounded knapsack, Combinations not permutations]
source: LeetCode 518
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Coin Change II

> [!TIP]
> **🧠 Memory hook**
> Put the **coins in the outer loop**: each combination is built in a fixed coin order, so it is counted once.
> **Mantra: FOR coin: FOR a = coin..amount: ways[a] += ways[a − coin]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=9) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Count the combinations of coins (unlimited supply) that make up the amount.

## Key insight
If amounts were the outer loop, 1+2 and 2+1 would both be counted (that is Combination Sum IV). With coins outside, coin c is only ever added after all smaller-index coins are decided.

## Approach 1: Coins outer loop
```java
// Coins in the outer loop so each combination is counted once (coins in a fixed order)
public int change(int amount, int[] coins) {
    int[] ways = new int[amount + 1];
    ways[0] = 1;
    for (int c : coins)
        for (int a = c; a <= amount; a++) ways[a] += ways[a - c];
    return ways[amount];
}
```

## Approach 2: Memo over (coin, amount)
```java
// Top-down over (coin index, amount left): use coin i again or move to the next coin
public int changeMemo(int amount, int[] coins) {
    Integer[][] memo = new Integer[coins.length][amount + 1];
    return go(coins, 0, amount, memo);
}

// Combinations of coins[i..] that make left
private int go(int[] coins, int i, int left, Integer[][] memo) {
    if (left == 0) return 1;
    if (i == coins.length) return 0;
    if (memo[i][left] != null) return memo[i][left];
    int r = go(coins, i + 1, left, memo);
    if (coins[i] <= left) r += go(coins, i, left - coins[i], memo);
    return memo[i][left] = r;
}
```

| Approach | Time | Space |
|---|---|---|
| Coins outer loop | O(amount · coins) | O(amount) |
| Memo over (coin, amount) | O(amount · coins) | O(amount · coins) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Swap the loops?</summary>

You count ordered sequences (permutations).

</details>


<details><summary>Why upward?</summary>

The same coin may be used again.

</details>


## Connected
- [Coin Change](Coin%20Change.md)
- [Combination Sum IV](../../Backtracking/Combination%20Sum%20IV.md)
