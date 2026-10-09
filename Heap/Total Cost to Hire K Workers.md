---
topic: Heap
pattern: [Two heaps]
source: LeetCode 2462
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Total Cost to Hire K Workers

> [!TIP]
> **🧠 Memory hook**
> Hire from the two ends of a line, each end with its own heap.
> **Mantra: TWO MIN-HEAPS, REFILL FROM THE MIDDLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=29) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
k sessions: hire the cheapest among the first and last `candidates` workers (ties: smaller index).

## Key insight
Two min-heaps for the front and back windows with pointers i, j that never cross.

## Approach: Two heaps
```java
// Two min-heaps: the first `candidates` and the last `candidates` workers; refill from the middle pointers
public long totalCost(int[] costs, int k, int candidates) {
    PriorityQueue<Integer> left = new PriorityQueue<>(), right = new PriorityQueue<>();
    int i = 0, j = costs.length - 1;
    long total = 0;
    while (k-- > 0) {
        while (left.size() < candidates && i <= j) left.offer(costs[i++]);
        while (right.size() < candidates && i <= j) right.offer(costs[j--]);
        int a = left.isEmpty() ? Integer.MAX_VALUE : left.peek(), b = right.isEmpty() ? Integer.MAX_VALUE : right.peek();
        if (a <= b) total += left.poll(); else total += right.poll();
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Two heaps | O((k + c) log c) | O(c) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Tie between heaps?</summary>

Prefer the left one.

</details>

