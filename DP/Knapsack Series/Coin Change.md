---
topic: Knapsack Series
pattern: [Unbounded knapsack, BFS over amounts]
source: LeetCode 322
difficulty: Medium
companies: [Amazon, Google, Meta]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Coin Change

> [!TIP]
> **🧠 Memory hook**
> Every coin can be **reused**: the amount table scans upward and each cell tries every coin as the last coin.
> **Mantra: dp[a] = min(dp[a − c] + 1) OVER COINS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=8) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Return the fewest coins needed to make the amount (unlimited coins of each denomination), or −1.

## Key insight
dp[a] is the fewest coins for amount a. The last coin used is some c, leaving a − c. BFS sees the same thing as shortest path where amounts are nodes and coins are edges.

## Approach 1: Bottom-up
```java
// dp[a] = fewest coins for amount a; every coin may be reused, so scan amounts upward
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++)
        for (int c : coins)
            if (c <= a && dp[a - c] != Integer.MAX_VALUE) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
}
```

## Approach 2: Top-down memo
```java
// Top-down over the remaining amount
public int coinChangeMemo(int[] coins, int amount) {
    int[] memo = new int[amount + 1];
    Arrays.fill(memo, -2);
    return fewest(coins, amount, memo);
}

// Fewest coins for left, or -1
private int fewest(int[] coins, int left, int[] memo) {
    if (left == 0) return 0;
    if (memo[left] != -2) return memo[left];
    int best = Integer.MAX_VALUE;
    for (int c : coins)
        if (c <= left) { int r = fewest(coins, left - c, memo); if (r >= 0) best = Math.min(best, r + 1); }
    return memo[left] = best == Integer.MAX_VALUE ? -1 : best;
}
```

## Approach 3: BFS
```java
// BFS: amounts are nodes, each coin is an edge; the first time we reach 0 is the answer
public int coinChangeBfs(int[] coins, int amount) {
    boolean[] seen = new boolean[amount + 1];
    Deque<Integer> q = new ArrayDeque<>(List.of(amount));
    seen[amount] = true;
    for (int steps = 0; !q.isEmpty(); steps++)
        for (int size = q.size(); size > 0; size--) {
            int a = q.poll();
            if (a == 0) return steps;
            for (int c : coins) if (a - c >= 0 && !seen[a - c]) { seen[a - c] = true; q.add(a - c); }
        }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up | O(amount · coins) | O(amount) |
| Top-down memo | O(amount · coins) | O(amount) |
| BFS | O(amount · coins) | O(amount) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is greedy wrong?</summary>

Coins [1, 3, 4], amount 6: greedy 4+1+1 (3 coins), best 3+3 (2).

</details>


<details><summary>Unreachable cells?</summary>

Keep them at infinity and skip them.

</details>


## Connected
- [Coin Change II](Coin%20Change%20II.md)
- [Perfect Squares](../Stairs%20and%20Robbers/Perfect%20Squares.md)
- [Minimum Cost For Tickets](../Counting%20Walks%20and%20Moves/Minimum%20Cost%20For%20Tickets.md)
