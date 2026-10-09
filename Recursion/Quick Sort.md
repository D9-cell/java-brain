---
topic: Recursion
pattern: [Divide and conquer, Partition]
source: GFG
difficulty: Medium
companies: [Amazon, Microsoft, Adobe]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Quick Sort

> [!TIP]
> **🧠 Memory hook**
> A height line-up: the last kid is the pivot; shorter kids move left; the pivot's spot is final.
> **Mantra: PARTITION (≤ PIVOT LEFT), PIVOT FINAL, RECURSE BOTH SIDES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=5) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Sort an array using quick sort.

## Key insight
Lomuto partition puts the pivot in its final position, then recurse on both sides.

## Approach: Lomuto quick sort
```java
// Lomuto partition: everything <= pivot moves left of pivotIndex, then the pivot lands there
static int partition(int[] arr, int low, int high) {
    int pivot = arr[high], p = low;
    for (int i = low; i < high; i++) {
        if (arr[i] <= pivot) {
            int t = arr[i]; arr[i] = arr[p]; arr[p] = t;
            p++;
        }
    }
    int t = arr[p]; arr[p] = arr[high]; arr[high] = t;
    return p;
}

// Place one pivot correctly, then sort both sides
static void quickSort(int[] arr, int low, int high) {
    if (low >= high) return;
    int p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
}
```

| Approach | Time | Space |
|---|---|---|
| Lomuto quick sort | avg O(n log n), worst O(n²) | O(log n) avg stack |

## Recall before you reveal
<details><summary>Avoid the worst case?</summary>

Random pivot (swap a random index to high first).

</details>


## Connected
- [Merge Sort](Merge%20Sort.md)
- Kth largest (Quickselect, Heap folder)
