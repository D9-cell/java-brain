---
topic: Jumps and Reach
pattern: [Money in the state, Take or skip]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Grinding Geek

> [!TIP]
> **🧠 Memory hook**
> Every course is bought in order and gives a **90% refund**: buying is cheap but needs the full price upfront.
> **Mantra: best(i, money) = max(skip, 1 + best(i + 1, money − c + 9c/10))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=10) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
You have `total` coins and n courses in order with costs cost[i]. Buying course i needs at least cost[i] coins and gives back floor(90% of cost[i]). Return the maximum number of courses you can buy.

## Key insight
State: course index and money left (never exceeds the start). Skip the course, or buy it when affordable and continue with the reduced money.

## Approach 1: Memo over (i, money)
```java
// Top-down over (course index, money left)
public int maxCourses(int n, int total, int[] cost) {
    int[][] memo = new int[n][total + 1];
    for (int[] row : memo) Arrays.fill(row, -1);
    return best(cost, 0, total, memo);
}

// Most courses from i onward with money left
private int best(int[] cost, int i, int money, int[][] memo) {
    if (i == cost.length || money <= 0) return 0;
    if (memo[i][money] >= 0) return memo[i][money];
    int res = best(cost, i + 1, money, memo);
    if (money >= cost[i]) res = Math.max(res, 1 + best(cost, i + 1, money - cost[i] + cost[i] * 9 / 10, memo));
    return memo[i][money] = res;
}
```

## Approach 2: Bottom-up table
```java
// Bottom-up: dp[i][m] filled from the last course backwards
public int maxCoursesTable(int n, int total, int[] cost) {
    int[][] dp = new int[n + 1][total + 1];
    for (int i = n - 1; i >= 0; i--)
        for (int m = 0; m <= total; m++) {
            dp[i][m] = dp[i + 1][m];
            if (m >= cost[i]) dp[i][m] = Math.max(dp[i][m], 1 + dp[i + 1][m - cost[i] + cost[i] * 9 / 10]);
        }
    return dp[0][total];
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over (i, money) | O(n · total) | O(n · total) |
| Bottom-up table | O(n · total) | O(n · total) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not buy every affordable course?</summary>

Each purchase lowers your money a little, which can make a later course unaffordable; the DP compares both choices instead of guessing.

</details>


<details><summary>Why is money bounded?</summary>

It only decreases from total.

</details>


## Connected
- [Minimum Number of Refueling Stops](Minimum%20Number%20of%20Refueling%20Stops.md)
- [0-1 Knapsack](../Knapsack%20Series/0-1%20Knapsack.md)
