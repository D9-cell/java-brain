---
topic: Sorting and Matching
pattern: [Case analysis, Minimum sums]
source: LeetCode 2918
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Equal Sum of Two Arrays After Replacing Zeros

> [!TIP]
> **🧠 Memory hook**
> Zeros are **free rubber bands**: they can stretch a sum but never shrink it below the all-ones minimum.
> **Mantra: ZEROS → 1 FOR MINIMUM, SMALLER SIDE MUST HAVE A ZERO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=16) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Replace every 0 with a positive integer so that both arrays have equal sums. Return the minimum equal sum, or −1.

## Key insight
Compute each array's minimum sum with zeros as 1. If equal, done. Otherwise the array with the smaller minimum needs a zero to grow; if it has none the answer is −1, else the answer is the larger minimum.

## Approach: Minimum sums
```java
// Replace every zero by 1 to get the smallest possible sums; the smaller side can then only grow if it has a zero to stretch
public long minSum(int[] nums1, int[] nums2) {
    long s1 = 0, s2 = 0;
    boolean z1 = false, z2 = false;
    for (int x : nums1) { s1 += Math.max(x, 1); z1 |= x == 0; }
    for (int x : nums2) { s2 += Math.max(x, 1); z2 |= x == 0; }
    if (s1 == s2) return s1;
    if (s1 < s2) return z1 ? s2 : -1;
    return z2 ? s1 : -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Minimum sums | O(n + m) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the larger minimum enough?</summary>

The smaller array can raise any of its zeros by the missing amount.

</details>


## Connected
- [Maximum Element After Decreasing and Rearranging](Maximum%20Element%20After%20Decreasing%20and%20Rearranging.md)
