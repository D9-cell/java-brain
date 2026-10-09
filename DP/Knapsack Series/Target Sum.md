---
topic: Knapsack Series
pattern: [Reduce to subset sum, Memo with offset]
source: LeetCode 494
difficulty: Medium
companies: [Meta, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Target Sum

> [!TIP]
> **🧠 Memory hook**
> Signs split the numbers into a **plus group and a minus group**; only the minus group needs choosing.
> **Mantra: NEG = (total − target) / 2; COUNT SUBSETS WITH SUM NEG**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=5) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Put + or − before every number so the expression equals target. Count the ways.

## Key insight
With P the plus sum and N the minus sum: P − N = target and P + N = total, so N = (total − target) / 2. Count subsets with sum N. The memo version walks (index, running sum) with an offset to keep indexes non-negative.

## Approach 1: Count subsets
```java
// The minus group must sum to (total - target) / 2: count those subsets
public int findTargetSumWays(int[] nums, int target) {
    int total = Arrays.stream(nums).sum();
    if (Math.abs(target) > total || (total - target) % 2 != 0) return 0;
    int neg = (total - target) / 2;
    int[] ways = new int[neg + 1];
    ways[0] = 1;
    for (int x : nums)
        for (int s = neg; s >= x; s--) ways[s] += ways[s - x];
    return ways[neg];
}
```

## Approach 2: Memo over (i, sum)
```java
// Top-down over (index, running sum) with an offset
public int findTargetSumWaysMemo(int[] nums, int target) {
    int total = Arrays.stream(nums).sum();
    Integer[][] memo = new Integer[nums.length][2 * total + 1];
    return go(nums, 0, 0, target, total, memo);
}

// Ways to finish from index i with the running sum so far
private int go(int[] a, int i, int sum, int target, int off, Integer[][] memo) {
    if (i == a.length) return sum == target ? 1 : 0;
    if (memo[i][sum + off] != null) return memo[i][sum + off];
    return memo[i][sum + off] = go(a, i + 1, sum + a[i], target, off, memo) + go(a, i + 1, sum - a[i], target, off, memo);
}
```

| Approach | Time | Space |
|---|---|---|
| Count subsets | O(n · total) | O(total) |
| Memo over (i, sum) | O(n · total) | O(n · total) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Zeros?</summary>

Each 0 doubles the count (+0 and −0 are different expressions).

</details>


<details><summary>When is it impossible?</summary>

|target| > total or total − target is odd.

</details>


## Connected
- [Partitions with Given Difference](Partitions%20with%20Given%20Difference.md)
- [Count Subsets with Sum](Count%20Subsets%20with%20Sum.md)
