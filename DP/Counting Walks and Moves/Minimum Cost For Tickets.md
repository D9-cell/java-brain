---
topic: Counting Walks and Moves
pattern: [Take and jump, Calendar DP]
source: LeetCode 983
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum Cost For Tickets

> [!TIP]
> **🧠 Memory hook**
> Each pass **covers a window** of days; buy the pass on the first uncovered day.
> **Mantra: dp[d] = min(dp[d−1]+c1, dp[d−7]+c7, dp[d−30]+c30)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=6) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
You travel on the given days of a year. Passes cost costs[0] (1 day), costs[1] (7 days) and costs[2] (30 days). Return the minimum cost to cover all travel days.

## Key insight
Calendar view: `dp[d]` is the cheapest cover of travel days up to d. A non-travel day costs nothing extra. On a travel day, the last pass bought ends at d and started 1, 7 or 30 days earlier. Array view: on days[i] buy a pass and jump to the first day it does not cover.

## Approach 1: Calendar DP
```java
// dp[d] = cheapest cover for all travel days up to calendar day d
public int mincostTickets(int[] days, int[] costs) {
    int last = days[days.length - 1];
    boolean[] travel = new boolean[last + 1];
    for (int d : days) travel[d] = true;
    int[] dp = new int[last + 1];
    for (int d = 1; d <= last; d++) {
        if (!travel[d]) { dp[d] = dp[d - 1]; continue; }
        dp[d] = Math.min(dp[d - 1] + costs[0], Math.min(dp[Math.max(0, d - 7)] + costs[1], dp[Math.max(0, d - 30)] + costs[2]));
    }
    return dp[last];
}
```

## Approach 2: Jump over days[]
```java
// Top-down over the days array: buy a pass on days[i] and jump past what it covers
public int mincostTicketsMemo(int[] days, int[] costs) {
    int[] memo = new int[days.length];
    Arrays.fill(memo, -1);
    return cover(days, costs, 0, memo);
}

// Cheapest way to cover days[i..]
private int cover(int[] days, int[] costs, int i, int[] memo) {
    if (i == days.length) return 0;
    if (memo[i] >= 0) return memo[i];
    int[] len = {1, 7, 30};
    int best = Integer.MAX_VALUE;
    for (int k = 0; k < 3; k++) {
        int j = i;
        while (j < days.length && days[j] < days[i] + len[k]) j++;
        best = Math.min(best, costs[k] + cover(days, costs, j, memo));
    }
    return memo[i] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Calendar DP | O(last day) | O(last day) |
| Jump over days[] | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is a 7-day pass bought "ending today" fine?</summary>

Any pass covering today can be shifted so its last day is today without uncovering an earlier travel day.

</details>


<details><summary>Which view scales with sparse days?</summary>

The jump view: O(n) instead of O(365).

</details>


## Connected
- [Solving Questions With Brainpower](Solving%20Questions%20With%20Brainpower.md)
- [Coin Change](../Knapsack%20Series/Coin%20Change.md)
