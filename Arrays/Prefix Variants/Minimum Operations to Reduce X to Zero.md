---
topic: Prefix Variants
pattern: [Complement window]
source: LeetCode 1658
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Operations to Reduce X to Zero

> [!TIP]
> **🧠 Memory hook**
> Removing from both ends leaves a **middle block with sum total − x**. Find the **longest** such block with a sliding window (all values positive).
> **Mantra: target = total − x · window sum == target → best length · answer n − best**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=0) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Each operation removes the leftmost or rightmost element and subtracts it from x. Return the minimum operations to make x exactly 0, or -1.

## Key insight
Thinking about what stays instead of what is removed turns two ends into one contiguous window. Positive values make the window sum monotonic.

## Approach: Sliding window on the complement
```java
// Removing from both ends leaves a middle block summing to total - x; find the longest one
public int minOperations(int[] nums, int x) {
    int target = -x, n = nums.length;
    for (int v : nums) target += v;
    if (target < 0) return -1;
    int best = -1, sum = 0;
    for (int l = 0, r = 0; r < n; r++) {
        sum += nums[r];
        while (sum > target) sum -= nums[l++];
        if (sum == target) best = Math.max(best, r - l + 1);
    }
    return best == -1 ? -1 : n - best;
}
```

| Approach | Time | Space |
|---|---|---|
| Sliding window on the complement | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the longest middle block?</summary>

It leaves the fewest removals.

</details>


<details><summary>target = 0?</summary>

The empty block works, so remove everything.

</details>


## Connected
- [Make Sum Divisible by P](../Prefix%20Sum%20and%20HashMap/Make%20Sum%20Divisible%20by%20P.md)
