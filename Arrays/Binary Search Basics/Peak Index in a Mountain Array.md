---
topic: Binary Search Basics
pattern: [Slope predicate]
source: LeetCode 852
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Peak Index in a Mountain Array

> [!TIP]
> **🧠 Memory hook**
> On the rising side **arr[mid] < arr[mid + 1]**. The peak is the first index where that is false.
> **Mantra: rising → lo = mid + 1 · ELSE hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=7) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
arr strictly increases then strictly decreases. Return the index of the peak in O(log n).

## Key insight
The slope test flips exactly once, at the peak, so binary search finds the flip.

## Approach: Slope search
```java
// On the rising slope arr[mid] < arr[mid + 1]; the peak is the first index where that fails
public int peakIndexInMountainArray(int[] arr) {
    int lo = 0, hi = arr.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] < arr[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Slope search | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why compare with mid + 1?</summary>

It tells which slope mid is on.

</details>


<details><summary>Find Peak Element?</summary>

The same test works on any array with local peaks.

</details>


## Connected
- [Find in Mountain Array](Find%20in%20Mountain%20Array.md)
- [Single Element in a Sorted Array](Single%20Element%20in%20a%20Sorted%20Array.md)
