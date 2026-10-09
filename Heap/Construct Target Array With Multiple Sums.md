---
topic: Heap
pattern: [Reverse simulation, Max-heap]
source: LeetCode 1354
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Construct Target Array With Multiple Sums

> [!TIP]
> **🧠 Memory hook**
> Rewind the film: the biggest number was written last.
> **Mantra: MAX-HEAP, prev = max % rest**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=8) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Starting from all ones, replace an element by the array sum repeatedly; can you reach target?

## Key insight
Backwards: the max must equal the sum at that time → previous value = max − rest. Use % to skip repeated subtractions.

## Approach: Max-heap backwards
```java
// Work backwards: the largest element was the last one written; its previous value = max - (sum of the rest), jumped with %
public boolean isPossible(int[] target) {
    PriorityQueue<Long> pq = new PriorityQueue<>(Collections.reverseOrder());
    long sum = 0;
    for (int x : target) { pq.offer((long) x); sum += x; }
    while (pq.peek() > 1) {
        long mx = pq.poll(), rest = sum - mx;
        if (rest == 1) return true;
        if (rest == 0 || mx <= rest) return false;
        long prev = mx % rest;
        if (prev == 0) return false;
        pq.offer(prev);
        sum = rest + prev;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap backwards | O(n log n · log max) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a forward BFS on small targets.

## Recall before you reveal
<details><summary>Special cases?</summary>

rest == 1 → true; rest == 0 or max ≤ rest → false.

</details>

