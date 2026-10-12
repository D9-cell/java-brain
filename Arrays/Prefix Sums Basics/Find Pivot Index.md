---
topic: Prefix Sums Basics
pattern: [Left vs right]
source: LeetCode 724
difficulty: Easy
companies: [Amazon, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find Pivot Index

> [!TIP]
> **🧠 Memory hook**
> At index i the right sum is **total − left − nums[i]**. Return the first i where it equals left.
> **Mantra: total · FOR i: left == total − left − a[i] → i · left += a[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=0) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
Return the leftmost index where the sum of elements to its left equals the sum to its right, or -1.

## Key insight
One pass for the total, one pass with a running left sum. No prefix array is needed.

## Approach: Running left sum
```java
// Left sum equals total - left - nums[i] at the pivot
public int pivotIndex(int[] nums) {
    int total = 0, left = 0;
    for (int x : nums) total += x;
    for (int i = 0; i < nums.length; i++) {
        if (left == total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Running left sum | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why update left after the check?</summary>

nums[i] belongs to neither side.

</details>


<details><summary>Negative numbers?</summary>

Allowed; the identity still holds.

</details>


## Connected
- [Number of Ways to Split Array](Number%20of%20Ways%20to%20Split%20Array.md)
