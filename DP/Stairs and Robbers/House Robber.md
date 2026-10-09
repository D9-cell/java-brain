---
topic: Stairs and Robbers
pattern: [Take or skip, No adjacent choices]
source: LeetCode 198
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# House Robber

> [!TIP]
> **🧠 Memory hook**
> For each house decide: **rob it** (then skip the neighbour) **or skip it**.
> **Mantra: best(i) = max(best(i−1), best(i−2) + a[i])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=4) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Adjacent houses have alarms. Return the maximum money you can rob.

## Key insight
Let `best[i]` be the maximum for the first i houses. Either house i is skipped (`best[i-1]`) or robbed with the house before it skipped (`best[i-2] + a[i]`). Two variables suffice.

## Approach 1: Skip / take variables
```java
// best(i) = max(best(i-1), best(i-2) + nums[i]): skip this house or rob it
public int rob(int[] nums) {
    int skip = 0, take = 0;
    for (int x : nums) { int newTake = skip + x; skip = Math.max(skip, take); take = newTake; }
    return Math.max(skip, take);
}
```

## Approach 2: Table
```java
// Table version
public int robTable(int[] nums) {
    int n = nums.length;
    if (n == 0) return 0;
    int[] dp = new int[n + 1];
    dp[1] = nums[0];
    for (int i = 2; i <= n; i++) dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    return dp[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Skip / take variables | O(n) | O(1) |
| Table | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why is greedy (take every other house) wrong?</summary>

The best pattern can skip two houses in a row, e.g. [2, 1, 1, 2].

</details>


## Connected
- [House Robber II](House%20Robber%20II.md)
- [House Robber III](House%20Robber%20III.md)
- [Min Cost Climbing Stairs](Min%20Cost%20Climbing%20Stairs.md)
