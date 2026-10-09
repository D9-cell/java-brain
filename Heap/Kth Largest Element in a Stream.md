---
topic: Heap
pattern: [Top-k heap]
source: LeetCode 703
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Kth Largest Element in a Stream

> [!TIP]
> **🧠 Memory hook**
> The same VIP lounge, open forever.
> **Mantra: MIN-HEAP SIZE k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=1) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
add(val) returns the k-th largest so far.

## Key insight
Keep only the k largest in a min-heap.

## Approach: Min-heap
```java
// Min-heap holding only the k largest values seen
static class KthLargest {
    private final int k;
    private final PriorityQueue<Integer> pq = new PriorityQueue<>();

    KthLargest(int k, int[] nums) {
        this.k = k;
        for (int x : nums) add(x);
    }

    // Add, trim to k, the top is the answer
    public int add(int val) {
        pq.offer(val);
        if (pq.size() > k) pq.poll();
        return pq.peek();
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap | O(log k) per add | O(k) |

## Recall before you reveal
<details><summary>Initial array?</summary>

Feed it through add.

</details>


## Connected
- [Kth Largest Element in an Array](Kth%20Largest%20Element%20in%20an%20Array.md)
