---
topic: Binary Search Basics
pattern: [Lower bound]
source: LeetCode 34
difficulty: Medium
companies: [Meta, Amazon, LinkedIn]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find First and Last Position of Element in Sorted Array

> [!TIP]
> **🧠 Memory hook**
> One helper, **lowerBound(x)** = first index with value ≥ x. First = lowerBound(t), last = lowerBound(t + 1) − 1.
> **Mantra: first = lb(t) · missing → [−1, −1] · last = lb(t + 1) − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=3) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Return the first and last index of target in a sorted array (with duplicates), or [-1, -1], in O(log n).

## Key insight
lowerBound uses the half-open template, which never misses the boundary. Searching for t + 1 finds where the run of t ends.

## Approach: Two lower bounds
```java
// First index >= target and first index > target, minus one
public int[] searchRange(int[] nums, int target) {
    int first = lowerBound(nums, target);
    if (first == nums.length || nums[first] != target) return new int[]{-1, -1};
    return new int[]{first, lowerBound(nums, target + 1) - 1};
}

// Smallest index whose value is >= x (nums.length if none)
int lowerBound(int[] nums, int x) {
    int lo = 0, hi = nums.length;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Two lower bounds | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why t + 1?</summary>

The first value above t starts right after the last t (integers only).

</details>


<details><summary>Why check nums[first] == target?</summary>

lowerBound returns an insertion point even when t is absent.

</details>


## Connected
- [Binary Search](Binary%20Search.md)
- [Element Appearing More Than 25% In Sorted Array](Element%20Appearing%20More%20Than%2025%25%20In%20Sorted%20Array.md)
