---
topic: Heap
pattern: [Repeat on the extreme]
source: LeetCode 1962
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Remove Stones to Minimize the Total

> [!TIP]
> **🧠 Memory hook**
> Always halve the tallest pile.
> **Mantra: MAX-HEAP, REMOVE floor(x/2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=20) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
k times remove floor(pile/2) from a pile; minimise the total.

## Key insight
Greedy on the largest pile.

## Approach: Max-heap
```java
// Always halve the largest pile: remove floor(x / 2) from it
public int minStoneSum(int[] piles, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    int total = 0;
    for (int p : piles) { pq.offer(p); total += p; }
    while (k-- > 0) {
        int x = pq.poll();
        total -= x / 2;
        pq.offer(x - x / 2);
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap | O(n + k log n) | O(n) |

## Recall before you reveal
<details><summary>What remains?</summary>

x − x/2.

</details>


## Connected
- [Maximal Score After Applying K Operations](Maximal%20Score%20After%20Applying%20K%20Operations.md)
