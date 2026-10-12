---
topic: LIS and Variants
pattern: [LIS from both ends, Chain DP]
source: LeetCode 1671
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Number of Removals to Make Mountain Array

> [!TIP]
> **🧠 Memory hook**
> A mountain is an **LIS ending at the peak** glued to an **LDS starting at the peak**.
> **Mantra: KEEP = max (inc[i] + dec[i] − 1) WITH inc, dec > 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=8) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of elements to remove so nums becomes a mountain array (strictly up to a peak, then strictly down, both sides non-empty).

## Key insight
inc[i] is the LIS ending at i; dec[i] is the longest decreasing run starting at i. A peak needs both greater than 1. Keeping the longest mountain removes the fewest elements.

## Approach: Two LIS passes
```java
// Keep the longest mountain: best peak i joins an increasing run ending at i and a decreasing run starting at i
public int minimumMountainRemovals(int[] nums) {
    int n = nums.length;
    int[] inc = new int[n], dec = new int[n];
    for (int i = 0; i < n; i++) {
        inc[i] = 1;
        for (int j = 0; j < i; j++) if (nums[j] < nums[i]) inc[i] = Math.max(inc[i], inc[j] + 1);
    }
    for (int i = n - 1; i >= 0; i--) {
        dec[i] = 1;
        for (int j = n - 1; j > i; j--) if (nums[j] < nums[i]) dec[i] = Math.max(dec[i], dec[j] + 1);
    }
    int keep = 0;
    for (int i = 1; i < n - 1; i++) if (inc[i] > 1 && dec[i] > 1) keep = Math.max(keep, inc[i] + dec[i] - 1);
    return n - keep;
}
```

| Approach | Time | Space |
|---|---|---|
| Two LIS passes | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why require both sides greater than 1?</summary>

A mountain needs a rise and a fall.

</details>


<details><summary>Faster?</summary>

Replace both loops with the tails array: O(n log n).

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Longest Turbulent Subarray](../Stock%20and%20Kadane%20States/Longest%20Turbulent%20Subarray.md)
