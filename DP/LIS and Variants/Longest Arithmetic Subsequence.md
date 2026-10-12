---
topic: LIS and Variants
pattern: [Keyed by difference, Chain DP]
source: LeetCode 1027
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Longest Arithmetic Subsequence

> [!TIP]
> **🧠 Memory hook**
> State needs the **last index and the difference**: dp[i][d].
> **Mantra: dp[i][d] = dp[j][d] + 1 WITH d = a[i] − a[j]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=16) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest arithmetic subsequence of nums (any common difference).

## Key insight
For every pair j < i the difference d is fixed. A chain ending at j with difference d extends to i, otherwise the pair itself has length 2. Values are small, so an array indexed by d + 500 replaces a map.

## Approach: dp[i][diff]
```java
// dp[i][d] = longest arithmetic subsequence ending at i with difference d - 500 (values are 0..500)
public int longestArithSeqLength(int[] nums) {
    int n = nums.length, ans = 2;
    int[][] dp = new int[n][1001];
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++) {
            int d = nums[i] - nums[j] + 500;
            dp[i][d] = Math.max(dp[i][d], dp[j][d] > 0 ? dp[j][d] + 1 : 2);
            ans = Math.max(ans, dp[i][d]);
        }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| dp[i][diff] | O(n² ) | O(n · V) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why start at 2?</summary>

Any two elements form an arithmetic subsequence.

</details>


<details><summary>Why + 500?</summary>

Differences are in −500..500.

</details>


## Connected
- [Longest Arithmetic Subsequence of Given Difference](Longest%20Arithmetic%20Subsequence%20of%20Given%20Difference.md)
- [Arithmetic Slices II - Subsequence](Arithmetic%20Slices%20II%20-%20Subsequence.md)
