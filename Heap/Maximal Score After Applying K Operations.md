---
topic: Heap
pattern: [Repeat on the extreme]
source: LeetCode 2530
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Maximal Score After Applying K Operations

> [!TIP]
> **🧠 Memory hook**
> Always eat the biggest cake; it shrinks to a third.
> **Mantra: MAX-HEAP, ADD x, PUSH ceil(x/3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=13) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
k times: add the largest element to the score, replace it by ceil(x/3).

## Key insight
Max-heap.

## Approach: Max-heap
```java
// Max-heap: take the largest, add it, put back ceil(x / 3)
public long maxKelements(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    for (int x : nums) pq.offer(x);
    long score = 0;
    while (k-- > 0) {
        int x = pq.poll();
        score += x;
        pq.offer((x + 2) / 3);
    }
    return score;
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap | O(n + k log n) | O(n) |

## Recall before you reveal
<details><summary>ceil(x/3) in ints?</summary>

(x + 2) / 3.

</details>


## Connected
- [Remove Stones to Minimize the Total](Remove%20Stones%20to%20Minimize%20the%20Total.md)
