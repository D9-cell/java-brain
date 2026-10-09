---
topic: Recursion
pattern: [Divide and conquer]
source: GFG
difficulty: Medium
companies: [Amazon, Microsoft, Paytm]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Merge Sort

> [!TIP]
> **🧠 Memory hook**
> Split the class into halves until everyone stands alone, then zip sorted pairs back together.
> **Mantra: SPLIT, SORT LEFT, SORT RIGHT, MERGE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=4) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Sort an array using merge sort.

## Key insight
Trust mergeSort on each half; the only real work is merging two sorted halves with two pointers.

## Approach: Top-down merge sort
```java
// Merges sorted arr[l..m] and arr[m+1..r] using temporary copies
static void merge(int[] arr, int l, int m, int r) {
    int[] L = Arrays.copyOfRange(arr, l, m + 1), R = Arrays.copyOfRange(arr, m + 1, r + 1);
    int i = 0, j = 0, k = l;
    while (i < L.length && j < R.length) arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
}

// Sort left half, sort right half, merge
static void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down merge sort | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Stable?</summary>

Yes, because ties take from the left (`<=`).

</details>


## Connected
- [Quick Sort](Quick%20Sort.md)
- Count inversions (Arrays folder)
