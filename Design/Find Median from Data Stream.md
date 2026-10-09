---
topic: Design
pattern: [Two heaps]
source: LeetCode 295
difficulty: Hard
companies: [Amazon, Google, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Find Median from Data Stream

> [!TIP]
> **🧠 Memory hook**
> Two piles of cards: smaller half (max on top) and larger half (min on top).
> **Mantra: MAX-HEAP LEFT, MIN-HEAP RIGHT, BALANCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=18) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
addNum and findMedian.

## Key insight
Every left element ≤ every right element, and sizes differ by at most one; the median is at the tops.

## Approach: Two heaps
```java
// Max-heap for the smaller half, min-heap for the larger half; left may hold one extra
static class MedianFinder {
    private final PriorityQueue<Integer> left = new PriorityQueue<>(Collections.reverseOrder()), right = new PriorityQueue<>();

    // Push through left into right, then rebalance so left.size >= right.size
    public void addNum(int num) {
        left.offer(num);
        right.offer(left.poll());
        if (right.size() > left.size()) left.offer(right.poll());
    }

    // Odd count → top of left; even → average of both tops
    public double findMedian() {
        return left.size() > right.size() ? left.peek() : (left.peek() + (double) right.peek()) / 2.0;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two heaps | add O(log n), median O(1) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against sorting after every insert.

## Recall before you reveal
<details><summary>Integer overflow?</summary>

Add as double: (a + (double) b) / 2.

</details>


## Connected
- [Heap - Pattern Map](../Heap/Heap%20-%20Pattern%20Map.md)
