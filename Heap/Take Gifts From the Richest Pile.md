---
topic: Heap
pattern: [Repeat on the extreme]
source: LeetCode 2558
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Take Gifts From the Richest Pile

> [!TIP]
> **🧠 Memory hook**
> Always rob the richest pile, leaving √pile.
> **Mantra: MAX-HEAP, PUSH floor(√x)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=34) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
After k seconds of taking from the richest pile (leaving floor(√pile)), return the gifts left.

## Key insight
Max-heap.

## Approach: Max-heap
```java
// Max-heap: k times replace the richest pile by floor(sqrt(pile))
public long pickGifts(int[] gifts, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    for (int g : gifts) pq.offer(g);
    while (k-- > 0) pq.offer((int) Math.sqrt(pq.poll()));
    long sum = 0;
    for (int g : pq) sum += g;
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap | O(n + k log n) | O(n) |

## Recall before you reveal
<details><summary>Sum type?</summary>

long.

</details>

