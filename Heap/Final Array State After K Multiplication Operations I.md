---
topic: Heap
pattern: [Repeat on the extreme]
source: LeetCode 3264
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Final Array State After K Multiplication Operations I

> [!TIP]
> **🧠 Memory hook**
> Always boost the weakest (first on ties).
> **Mantra: MIN-HEAP (value, index)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=32) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
k times multiply the minimum (first occurrence) by multiplier.

## Key insight
Min-heap ordered by (value, index).

## Approach 1: Scan
```java
// Approach 1: scan for the first minimum each time
public int[] getFinalStateBrute(int[] nums, int k, int multiplier) {
    int[] a = nums.clone();
    while (k-- > 0) {
        int m = 0;
        for (int i = 1; i < a.length; i++) if (a[i] < a[m]) m = i;
        a[m] *= multiplier;
    }
    return a;
}
```

## Approach 2: Min-heap
```java
// Approach 2: min-heap of (value, index) so ties pick the smaller index
public int[] getFinalState(int[] nums, int k, int multiplier) {
    int[] a = nums.clone();
    PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> x[0] != y[0] ? x[0] - y[0] : x[1] - y[1]);
    for (int i = 0; i < a.length; i++) pq.offer(new int[]{a[i], i});
    while (k-- > 0) {
        int[] p = pq.poll();
        a[p[1]] *= multiplier;
        pq.offer(new int[]{a[p[1]], p[1]});
    }
    return a;
}
```

| Approach | Time | Space |
|---|---|---|
| Scan | O(n·k) | O(1) |
| Min-heap | O((n + k) log n) | O(n) |

## Recall before you reveal
<details><summary>Tie rule?</summary>

Smaller index.

</details>

