---
topic: Heap
pattern: [Top-k heap, Quickselect]
source: LeetCode 215
difficulty: Medium
companies: [Amazon, Facebook, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Kth Largest Element in an Array

> [!TIP]
> **🧠 Memory hook**
> A VIP lounge with k seats: the weakest VIP stands at the door.
> **Mantra: MIN-HEAP SIZE k, TOP = ANSWER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=0) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Find the k-th largest element without fully sorting.

## Key insight
A min-heap holding the k largest elements has the answer on top. Quickselect partitions around a pivot and recurses into one side only.

## Approach 1: Min-heap of size k
```java
// Approach 1: min-heap of size k; its top is the k-th largest
public int findKthLargestHeap(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int x : nums) {
        pq.offer(x);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}
```

## Approach 2: Sort
```java
// Approach 2: sort
public int findKthLargestSort(int[] nums, int k) {
    int[] a = nums.clone();
    Arrays.sort(a);
    return a[a.length - k];
}
```

## Approach 3: Quickselect
```java
// Approach 3: Quickselect with a random pivot; partition so larger values go left
public int findKthLargest(int[] nums, int k) {
    int[] a = nums.clone();
    Random rnd = new Random(42);
    int lo = 0, hi = a.length - 1, target = k - 1;
    while (true) {
        int p = lo + rnd.nextInt(hi - lo + 1);
        int t = a[p]; a[p] = a[hi]; a[hi] = t;
        int pivot = a[hi], store = lo;
        for (int i = lo; i < hi; i++)
            if (a[i] > pivot) { t = a[i]; a[i] = a[store]; a[store] = t; store++; }
        t = a[store]; a[store] = a[hi]; a[hi] = t;
        if (store == target) return a[store];
        if (store < target) lo = store + 1; else hi = store - 1;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap of size k | O(n log k) | O(k) |
| Sort | O(n log n) | O(n) |
| Quickselect | O(n) average | O(1) extra |

> [!WARNING]
> **Java gotcha**
> The three approaches agree on 500 random arrays.

## Recall before you reveal
<details><summary>Why random pivot?</summary>

Avoids O(n²) on sorted input.

</details>


<details><summary>Which heap for k largest?</summary>

MIN-heap (evict the smallest).

</details>


## Connected
- [Kth Largest Element in a Stream](Kth%20Largest%20Element%20in%20a%20Stream.md)
