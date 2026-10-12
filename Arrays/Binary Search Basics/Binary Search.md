---
topic: Binary Search Basics
pattern: [Exact match]
source: LeetCode 704
difficulty: Easy
companies: [Amazon, Microsoft, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Binary Search

> [!TIP]
> **🧠 Memory hook**
> Keep a **closed range [lo, hi]**: compare the middle, throw away the half that cannot hold the target.
> **Mantra: lo ≤ hi · mid = lo + (hi − lo)/2 · == → mid · < → lo = mid + 1 · > → hi = mid − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=0) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Given a sorted array of distinct integers and a target, return its index or -1, in O(log n).

## Key insight
Each comparison halves the candidates. lo + (hi − lo) / 2 avoids int overflow for huge indexes.

## Approach: Closed range
```java
// Closed range [lo, hi]; halve until the target is found or the range is empty
public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Closed range | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why lo ≤ hi?</summary>

With a closed range a single element (lo == hi) still needs checking.

</details>


<details><summary>Why not (lo + hi) / 2?</summary>

lo + hi can overflow when both are near 2³¹.

</details>


## Connected
- [Find First and Last Position of Element in Sorted Array](Find%20First%20and%20Last%20Position%20of%20Element%20in%20Sorted%20Array.md)
- [Guess Number Higher or Lower](Guess%20Number%20Higher%20or%20Lower.md)
