---
topic: Binary Search Basics
pattern: [Binary search on window start]
source: LeetCode 658
difficulty: Medium
companies: [Meta, Amazon, Uber]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find K Closest Elements

> [!TIP]
> **🧠 Memory hook**
> Binary search the **start of the k-window** in [0, n − k]: if x is farther from arr[mid] than from arr[mid + k], shift right.
> **Mantra: x − arr[mid] > arr[mid + k] − x → lo = mid + 1 · ELSE hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=13) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Return the k integers of a sorted array closest to x (ties prefer the smaller value), in ascending order.

## Key insight
Comparing the window's left end with the element just past its right end decides which way to slide. The tie rule (prefer smaller) keeps the window on the left.

## Approach: Window start search
```java
// Binary search the window start: move right while x is closer to the element just past the window
public List<Integer> findClosestElements(int[] arr, int k, int x) {
    int lo = 0, hi = arr.length - k;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (x - arr[mid] > arr[mid + k] - x) lo = mid + 1;
        else hi = mid;
    }
    List<Integer> out = new ArrayList<>();
    for (int i = lo; i < lo + k; i++) out.add(arr[i]);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Window start search | O(log(n − k) + k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why compare arr[mid] and arr[mid + k]?</summary>

They are the two elements that can swap in or out.

</details>


<details><summary>Why no abs?</summary>

Signed differences handle x on either side correctly.

</details>


## Connected
- [Shortest Distance to Target Color](Shortest%20Distance%20to%20Target%20Color.md)
- [Binary Search](Binary%20Search.md)
