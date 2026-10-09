---
topic: Design
pattern: [Min-heap, Counter]
source: LeetCode 1845
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Seat Reservation Manager

> [!TIP]
> **🧠 Memory hook**
> A ticket roll plus a tray of returned tickets.
> **Mantra: COUNTER + MIN-HEAP OF RETURNS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=28) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
reserve() the smallest unreserved seat; unreserve(seat).

## Key insight
Seats ≥ next were never touched. Only returned seats need a heap, and they are always < next.

## Approach 1: Preloaded heap
```java
// Approach 2: min-heap preloaded with every seat
static class SeatManagerHeap {
    private final PriorityQueue<Integer> free = new PriorityQueue<>();

    SeatManagerHeap(int n) { for (int i = 1; i <= n; i++) free.offer(i); }

    // Smallest free seat
    public int reserve() { return free.poll(); }

    // Back into the heap
    public void unreserve(int seat) { free.offer(seat); }
}
```

## Approach 2: Counter + heap of returns
```java
// Approach 3: a counter for never-used seats + a heap only for returned seats
static class SeatManager {
    private int next = 1;
    private final PriorityQueue<Integer> returned = new PriorityQueue<>();

    SeatManager(int n) { }

    // Returned seats are always smaller than next, so serve them first
    public int reserve() { return returned.isEmpty() ? next++ : returned.poll(); }

    // Remember the returned seat
    public void unreserve(int seat) { returned.offer(seat); }
}
```

| Approach | Time | Space |
|---|---|---|
| Preloaded heap | O(log n) | O(n) |
| Counter + heap of returns | O(log r) | O(r) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why serve returns first?</summary>

They are always smaller than next.

</details>

