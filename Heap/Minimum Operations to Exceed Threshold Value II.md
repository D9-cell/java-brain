---
topic: Heap
pattern: [Repeat on the extreme]
source: LeetCode 3066
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Minimum Operations to Exceed Threshold Value II

> [!TIP]
> **🧠 Memory hook**
> Merge the two smallest pebbles until all are big enough.
> **Mantra: MIN-HEAP OF LONG, 2·min + max**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=18) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Combine the two smallest x, y into min·2 + max until every element ≥ k.

## Key insight
Min-heap; use long to avoid overflow.

## Approach: Min-heap
```java
// Min-heap of longs: combine the two smallest x, y into 2·min + max until the smallest is >= k
public int minOperations(int[] nums, int k) {
    PriorityQueue<Long> pq = new PriorityQueue<>();
    for (int x : nums) pq.offer((long) x);
    int ops = 0;
    while (pq.size() > 1 && pq.peek() < k) {
        long x = pq.poll(), y = pq.poll();
        pq.offer(Math.min(x, y) * 2 + Math.max(x, y));
        ops++;
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why long?</summary>

Values up to 1e9 → 3e9.

</details>

