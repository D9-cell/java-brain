---
topic: Design
pattern: [Ring buffer]
source: LeetCode 622
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Circular Queue

> [!TIP]
> **🧠 Memory hook**
> A round table: seats wrap around, and the head moves instead of people shifting.
> **Mantra: front + size, INDEX % k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=8) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
A fixed-capacity FIFO queue with enQueue, deQueue, Front, Rear, isEmpty, isFull.

## Key insight
Store front and size; the write position is (front + size) % k and the rear is (front + size − 1) % k.

## Approach: Array ring buffer
```java
// Fixed array with front index and size; rear = (front + size - 1) % k
static class MyCircularQueue {
    private final int[] a;
    private int front = 0, size = 0;

    MyCircularQueue(int k) { a = new int[k]; }

    // Write at (front + size) % k
    public boolean enQueue(int v) {
        if (isFull()) return false;
        a[(front + size) % a.length] = v;
        size++;
        return true;
    }

    // Advance front
    public boolean deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % a.length;
        size--;
        return true;
    }

    // Value at front or -1
    public int Front() { return isEmpty() ? -1 : a[front]; }

    // Value at rear or -1
    public int Rear() { return isEmpty() ? -1 : a[(front + size - 1) % a.length]; }

    // Size checks
    public boolean isEmpty() { return size == 0; }

    // Size checks
    public boolean isFull() { return size == a.length; }
}
```

| Approach | Time | Space |
|---|---|---|
| Array ring buffer | O(1) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why keep size?</summary>

front alone cannot tell full from empty.

</details>


## Connected
- [Implement Stack using Queues](Implement%20Stack%20using%20Queues.md)
