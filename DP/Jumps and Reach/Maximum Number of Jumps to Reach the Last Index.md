---
topic: Jumps and Reach
pattern: [Longest path in a DAG, O(n²) DP]
source: LeetCode 2770
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Number of Jumps to Reach the Last Index

> [!TIP]
> **🧠 Memory hook**
> Forward jumps make a **DAG**; the longest path is a simple left-to-right DP.
> **Mantra: dp[j] = max(dp[i] + 1) OVER REACHABLE i < j WITH |Δ| ≤ target**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=6) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
From i you may jump to any j > i with |nums[j] − nums[i]| ≤ target. Return the maximum number of jumps to go from index 0 to n − 1, or −1 if impossible.

## Key insight
Like LIS: dp[j] is the most jumps that land on j (−1 if unreachable). Every j looks back at all earlier i.

## Approach: Look-back DP
```java
// dp[j] = most jumps that land on j, or -1 if unreachable
public int maximumJumps(int[] nums, int target) {
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, -1);
    dp[0] = 0;
    for (int j = 1; j < n; j++)
        for (int i = 0; i < j; i++)
            if (dp[i] >= 0 && Math.abs((long) nums[j] - nums[i]) <= target) dp[j] = Math.max(dp[j], dp[i] + 1);
    return dp[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Look-back DP | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why −1 as a marker?</summary>

Unreachable indexes must not be extended.

</details>


<details><summary>Overflow?</summary>

Differences of two ints can overflow: compute with long.

</details>


## Connected
- Longest Increasing Subsequence
- [Jump Game II](Jump%20Game%20II.md)
