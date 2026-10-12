---
topic: Prefix Sums Basics
pattern: [Left vs right, Integer averages]
source: LeetCode 2256
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Average Difference

> [!TIP]
> **🧠 Memory hook**
> Average of the first i + 1 values vs average of the rest (**0 when the rest is empty**), both rounded down, from one running sum.
> **Mantra: a = left/(i+1) · b = rest/(n−i−1) or 0 · keep smallest |a − b|**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=2) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
For each index i, the average difference is |avg(first i + 1) − avg(last n − i − 1)| with integer division. Return the index with the minimum (smallest index on ties).

## Key insight
Strict < keeps the earliest index on ties. The last index divides by zero unless handled.

## Approach: Running sum
```java
// Average of the first i + 1 versus average of the rest (0 when empty), from one running sum
public int minimumAverageDifference(int[] nums) {
    int n = nums.length, best = 0;
    long total = 0, left = 0, bestDiff = Long.MAX_VALUE;
    for (int x : nums) total += x;
    for (int i = 0; i < n; i++) {
        left += nums[i];
        long a = left / (i + 1), b = i == n - 1 ? 0 : (total - left) / (n - i - 1);
        if (Math.abs(a - b) < bestDiff) {
            bestDiff = Math.abs(a - b);
            best = i;
        }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Running sum | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Last index?</summary>

The right part is empty, its average counts as 0.

</details>


<details><summary>Tie rule?</summary>

Strict < keeps the first index.

</details>


## Connected
- [Number of Ways to Split Array](Number%20of%20Ways%20to%20Split%20Array.md)
