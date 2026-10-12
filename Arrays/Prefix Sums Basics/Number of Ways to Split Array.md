---
topic: Prefix Sums Basics
pattern: [Left vs right]
source: LeetCode 2270
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Number of Ways to Split Array

> [!TIP]
> **🧠 Memory hook**
> For each split after i, compare the **left prefix** with **total − left**. Use long.
> **Mantra: left += a[i] · left ≥ total − left → ways++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=1) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
A split after index i (with a non-empty right part) is valid if the left sum is at least the right sum. Count valid splits.

## Key insight
The right sum is derived from the total, so one pass suffices. Sums reach 10¹⁰, beyond int.

## Approach: Running sum
```java
// Count split points where the left prefix is at least the remaining suffix
public int waysToSplitArray(int[] nums) {
    long total = 0, left = 0;
    for (int x : nums) total += x;
    int ways = 0;
    for (int i = 0; i + 1 < nums.length; i++) {
        left += nums[i];
        if (left >= total - left) ways++;
    }
    return ways;
}
```

| Approach | Time | Space |
|---|---|---|
| Running sum | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop at n − 2?</summary>

The right part must be non-empty.

</details>


<details><summary>Why long?</summary>

10⁵ values of 10⁵ each.

</details>


## Connected
- [Find Pivot Index](Find%20Pivot%20Index.md)
- [Minimum Average Difference](Minimum%20Average%20Difference.md)
