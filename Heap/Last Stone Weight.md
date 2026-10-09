---
topic: Heap
pattern: [Repeat on the extreme]
source: LeetCode 1046
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Last Stone Weight

> [!TIP]
> **🧠 Memory hook**
> A sumo tournament: the two heaviest always fight.
> **Mantra: MAX-HEAP, SMASH TOP TWO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=2) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Smash the two heaviest stones; return the last weight or 0.

## Key insight
Max-heap gives the two heaviest each round.

## Approach 1: Re-sort each round
```java
// Approach 1: re-sort a list every round
public int lastStoneWeightSort(int[] stones) {
    List<Integer> l = new ArrayList<>();
    for (int s : stones) l.add(s);
    while (l.size() > 1) {
        Collections.sort(l);
        int y = l.remove(l.size() - 1), x = l.remove(l.size() - 1);
        if (y != x) l.add(y - x);
    }
    return l.isEmpty() ? 0 : l.get(0);
}
```

## Approach 2: Max-heap
```java
// Max-heap: smash the two heaviest, push back the difference if any
public int lastStoneWeight(int[] stones) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    for (int s : stones) pq.offer(s);
    while (pq.size() > 1) {
        int y = pq.poll(), x = pq.poll();
        if (y != x) pq.offer(y - x);
    }
    return pq.isEmpty() ? 0 : pq.peek();
}
```

| Approach | Time | Space |
|---|---|---|
| Re-sort each round | O(n² log n) | O(n) |
| Max-heap | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Equal stones?</summary>

Both vanish.

</details>

