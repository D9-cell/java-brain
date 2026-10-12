---
topic: Binary Search Basics
pattern: [Derived predicate]
source: LeetCode 1539
difficulty: Easy
companies: [Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Kth Missing Positive Number

> [!TIP]
> **🧠 Memory hook**
> Before index i, **arr[i] − (i + 1)** numbers are missing. Find the first index with at least k missing; the answer is **lo + k**.
> **Mantra: first i: arr[i] − i − 1 ≥ k · RETURN lo + k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=5) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
arr is strictly increasing positive integers. Return the k-th positive integer missing from it.

## Key insight
The missing count grows with i, so it can be binary searched. With lo known elements before the answer, the answer is k + lo.

## Approach: Binary search on missing count
```java
// arr[i] - (i + 1) numbers are missing before index i; find the first index with at least k missing
public int findKthPositive(int[] arr, int k) {
    int lo = 0, hi = arr.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] - mid - 1 < k) lo = mid + 1;
        else hi = mid;
    }
    return lo + k;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on missing count | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why lo + k?</summary>

lo array elements and k missing numbers lie at or below the answer.

</details>


<details><summary>Linear version?</summary>

Walk and count gaps, O(n).

</details>


## Connected
- [Missing Number In Arithmetic Progression](Missing%20Number%20In%20Arithmetic%20Progression.md)
- [Missing Number](../../Mathematical/Digits%20and%20Powers/Missing%20Number.md)
