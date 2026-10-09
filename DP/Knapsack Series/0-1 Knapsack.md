---
topic: Knapsack Series
pattern: [0-1 knapsack, Take or skip]
source: GfG
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# 0-1 Knapsack

> [!TIP]
> **🧠 Memory hook**
> A thief with one **bag of capacity W**: for every item, take it (if it fits) or leave it.
> **Mantra: dp[c] = max(dp[c], val + dp[c − wt]); c FROM W DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=0) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Given values val[i] and weights wt[i] of n items and a capacity W, return the maximum total value of items whose total weight is at most W. Each item can be taken at most once.

## Key insight
State (item i, capacity left). Skipping keeps the capacity; taking adds the value and uses the weight. The 2-D table reads row i − 1 only, so one row is enough if the capacity is scanned from high to low: the cell dp[c − wt] still holds the previous row.

## Approach 1: Top-down memo
```java
// Top-down: take item i or skip it
public int knapsackMemo(int W, int[] val, int[] wt) {
    int[][] memo = new int[val.length][W + 1];
    for (int[] row : memo) Arrays.fill(row, -1);
    return best(W, val, wt, 0, memo);
}

// Best value from items i.. with capacity cap left
private int best(int cap, int[] val, int[] wt, int i, int[][] memo) {
    if (i == val.length) return 0;
    if (memo[i][cap] >= 0) return memo[i][cap];
    int res = best(cap, val, wt, i + 1, memo);
    if (wt[i] <= cap) res = Math.max(res, val[i] + best(cap - wt[i], val, wt, i + 1, memo));
    return memo[i][cap] = res;
}
```

## Approach 2: 2-D table
```java
// Bottom-up table: dp[i][c] = best value using the first i items with capacity c
public int knapsackTable(int W, int[] val, int[] wt) {
    int n = val.length;
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++)
        for (int c = 0; c <= W; c++) {
            dp[i][c] = dp[i - 1][c];
            if (wt[i - 1] <= c) dp[i][c] = Math.max(dp[i][c], val[i - 1] + dp[i - 1][c - wt[i - 1]]);
        }
    return dp[n][W];
}
```

## Approach 3: One row, downward
```java
// One row, capacity scanned downward so each item is used once
public int knapsack(int W, int[] val, int[] wt) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < val.length; i++)
        for (int c = W; c >= wt[i]; c--) dp[c] = Math.max(dp[c], val[i] + dp[c - wt[i]]);
    return dp[W];
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down memo | O(n · W) | O(n · W) |
| 2-D table | O(n · W) | O(n · W) |
| One row, downward | O(n · W) | O(W) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why scan the capacity downward?</summary>

Upward would let the same item be added twice (that is the unbounded version).

</details>


<details><summary>What does dp[c] mean in the 1-row version?</summary>

Best value with capacity c using the items processed so far.

</details>


## Connected
- [Subset Sum Problem](Subset%20Sum%20Problem.md)
- [Coin Change](Coin%20Change.md)
- [Fractional Knapsack](../../Greedy/Sorting%20and%20Matching/Fractional%20Knapsack.md)
