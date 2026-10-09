---
topic: Stairs and Robbers
pattern: [Min over the last step, Rolling variables]
source: LeetCode 746
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Min Cost Climbing Stairs

> [!TIP]
> **🧠 Memory hook**
> Every step has a **toll**; the top is one step past the last stair.
> **Mantra: cost(i) = min(cost(i−1) + c[i−1], cost(i−2) + c[i−2])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=3) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Paying `cost[i]` lets you climb one or two steps from step i. You may start at step 0 or 1. Return the minimum cost to reach the top (beyond the last index).

## Key insight
Let `best[i]` be the minimum cost to stand on step i (before paying its toll). You arrive from step i−1 or i−2 after paying their tolls. The answer is `best[n]`.

## Approach 1: Rolling variables
```java
// Cost to reach step i = min(cost to reach i-1 plus cost[i-1], cost to reach i-2 plus cost[i-2]); the top is step n
public int minCostClimbingStairs(int[] cost) {
    int a = 0, b = 0;
    for (int i = 2; i <= cost.length; i++) { int c = Math.min(b + cost[i - 1], a + cost[i - 2]); a = b; b = c; }
    return b;
}
```

## Approach 2: Top-down memo
```java
// Top-down: cheapest way to finish starting on step i
public int minCostClimbingStairsMemo(int[] cost) {
    int[] memo = new int[cost.length];
    Arrays.fill(memo, -1);
    return Math.min(go(cost, 0, memo), go(cost, 1, memo));
}

// Paying cost[i] and moving on by 1 or 2 steps
private int go(int[] cost, int i, int[] memo) {
    if (i >= cost.length) return 0;
    if (memo[i] != -1) return memo[i];
    return memo[i] = cost[i] + Math.min(go(cost, i + 1, memo), go(cost, i + 2, memo));
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling variables | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why is the top at index n?</summary>

You must pass the last stair, i.e. step past it.

</details>


## Connected
- [Climbing Stairs](Climbing%20Stairs.md)
- [House Robber](House%20Robber.md)
