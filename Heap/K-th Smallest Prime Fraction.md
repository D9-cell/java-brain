---
topic: Heap
pattern: [k sorted lists]
source: LeetCode 786
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# K-th Smallest Prime Fraction

> [!TIP]
> **🧠 Memory hook**
> Numerator i gives a sorted list arr[i]/arr[j] as j decreases.
> **Mantra: SEED arr[i]/arr[n−1], POP k−1 TIMES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=5) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Return the k-th smallest fraction arr[i]/arr[j] (i < j).

## Key insight
Seed every numerator with its smallest fraction; popping (i, j) pushes (i, j−1).

## Approach: Heap
```java
// Each numerator i starts with its smallest fraction arr[i]/arr[n-1]; popping (i, j) pushes (i, j-1)
public int[] kthSmallestPrimeFraction(int[] arr, int k) {
    int n = arr.length;
    PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Long.compare((long) arr[x[0]] * arr[y[1]], (long) arr[y[0]] * arr[x[1]]));
    for (int i = 0; i < n - 1; i++) pq.offer(new int[]{i, n - 1});
    while (--k > 0) {
        int[] p = pq.poll();
        if (p[1] - 1 > p[0]) pq.offer(new int[]{p[0], p[1] - 1});
    }
    int[] p = pq.peek();
    return new int[]{arr[p[0]], arr[p[1]]};
}
```

| Approach | Time | Space |
|---|---|---|
| Heap | O((n + k) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Compare fractions exactly?</summary>

Cross-multiply with long.

</details>


## Connected
- [Find K Pairs with Smallest Sums](Find%20K%20Pairs%20with%20Smallest%20Sums.md)
