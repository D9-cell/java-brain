---
topic: Scheduling and Partitions
pattern: [Bounded last block, Prefix DP]
source: LeetCode 1043
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Partition Array for Maximum Sum

> [!TIP]
> **🧠 Memory hook**
> Look at the **last block** (length up to k): it turns into len copies of its maximum.
> **Mantra: dp[i] = max over len ≤ k of dp[i − len] + len · max(last len)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=0) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Partition arr into contiguous subarrays of length at most k, then replace every value by its subarray's maximum. Return the largest possible sum.

## Key insight
dp[i] is the best for the first i numbers. For each i try every block length, growing the maximum as the block extends left.

## Approach: Prefix DP
```java
// dp[i] = best sum for the first i numbers; the last block of length len (up to k) becomes len copies of its maximum
public int maxSumAfterPartitioning(int[] arr, int k) {
    int n = arr.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        int mx = 0;
        for (int len = 1; len <= k && len <= i; len++) {
            mx = Math.max(mx, arr[i - len]);
            dp[i] = Math.max(dp[i], dp[i - len] + mx * len);
        }
    }
    return dp[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix DP | O(n · k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why track the maximum while extending?</summary>

The block value depends on its maximum, which only grows as the block grows.

</details>


<details><summary>Base?</summary>

dp[0] = 0.

</details>


## Connected
- [Filling Bookcase Shelves](Filling%20Bookcase%20Shelves.md)
- [Minimum Difficulty of a Job Schedule](Minimum%20Difficulty%20of%20a%20Job%20Schedule.md)
