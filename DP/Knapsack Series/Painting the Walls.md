---
topic: Knapsack Series
pattern: [0-1 knapsack, Coverage as capacity]
source: LeetCode 2742
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Painting the Walls

> [!TIP]
> **🧠 Memory hook**
> Paying for a wall buys **time[i] + 1 walls**: itself plus time[i] walls the free painter paints meanwhile.
> **Mantra: dp[j] = min(dp[j], dp[max(0, j − time − 1)] + cost)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=15) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
A paid painter paints wall i in time[i] for cost[i]. A free painter paints any wall in 1 unit of time, but only while the paid painter is busy. Return the minimum cost to paint all n walls.

## Key insight
Choose the set of paid walls: it works if the total time[i] + 1 over them reaches n. Minimise cost subject to coverage ≥ n: a 0-1 knapsack where coverage is clamped at n.

## Approach: Coverage knapsack
```java
// Paying for wall i covers time[i] + 1 walls; dp[j] = cheapest cost to cover j walls (capped at n)
public int paintWalls(int[] cost, int[] time) {
    int n = cost.length;
    int[] dp = new int[n + 1];
    Arrays.fill(dp, Integer.MAX_VALUE / 2);
    dp[0] = 0;
    for (int i = 0; i < n; i++)
        for (int j = n; j > 0; j--) dp[j] = Math.min(dp[j], dp[Math.max(0, j - time[i] - 1)] + cost[i]);
    return dp[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Coverage knapsack | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why + 1?</summary>

The paid wall itself is also painted.

</details>


<details><summary>Why clamp at n?</summary>

Covering more than n walls is still just "done".

</details>


## Connected
- [Profitable Schemes](Profitable%20Schemes.md)
- [0-1 Knapsack](0-1%20Knapsack.md)
