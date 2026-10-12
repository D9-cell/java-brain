---
topic: LIS and Variants
pattern: [Residue DP, Keyed state]
source: LeetCode 3202
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find the Maximum Length of Valid Subsequence II

> [!TIP]
> **🧠 Memory hook**
> Fix the **target residue s** of adjacent sums; then each element only needs its **previous residue**.
> **Mantra: dp[r][s] = 1 + dp[(s − r) mod k][s]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=11) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the longest subsequence where (sub[i] + sub[i+1]) % k is identical for all adjacent pairs.

## Key insight
dp[r][s] is the longest valid subsequence ending in residue r with common sum residue s. The previous element must have residue (s − r) mod k, so each number updates k cells in O(k).

## Approach: Residue table
```java
// dp[r][s] = longest valid subsequence ending in residue r whose adjacent sums are all s mod k
public int maximumLength(int[] nums, int k) {
    int[][] dp = new int[k][k];
    int ans = 0;
    for (int x : nums) {
        int r = x % k;
        for (int s = 0; s < k; s++) {
            int prev = ((s - r) % k + k) % k;
            dp[r][s] = Math.max(dp[r][s], dp[prev][s] + 1);
            ans = Math.max(ans, dp[r][s]);
        }
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Residue table | O(n · k) | O(k²) |

> [!WARNING]
> **Java gotcha**
> ((s − r) % k + k) % k avoids a negative index in Java.

## Recall before you reveal
<details><summary>Why track s?</summary>

It is the invariant of the whole subsequence.

</details>


<details><summary>Why not O(n²)?</summary>

Residues compress all earlier choices into k buckets.

</details>


## Connected
- [Find the Maximum Length of Valid Subsequence I](Find%20the%20Maximum%20Length%20of%20Valid%20Subsequence%20I.md)
- [Longest Ideal Subsequence](Longest%20Ideal%20Subsequence.md)
