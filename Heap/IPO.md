---
topic: Heap
pattern: [Sort + heap]
source: LeetCode 502
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# IPO

> [!TIP]
> **🧠 Memory hook**
> A startup accelerator: as money grows, more projects unlock; do the most profitable.
> **Mantra: SORT BY CAPITAL, UNLOCK, TAKE MAX PROFIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=7) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Maximise capital after at most k projects (each needs capital, gives profit).

## Key insight
Sort by capital; a pointer unlocks affordable projects into a max-heap of profits.

## Approach: Sort + max-heap
```java
// Sort projects by capital; unlock every affordable project into a max-heap of profits; take the best k times
public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
    int n = profits.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Integer.compare(capital[a], capital[b]));
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    int i = 0;
    while (k-- > 0) {
        while (i < n && capital[idx[i]] <= w) pq.offer(profits[idx[i++]]);
        if (pq.isEmpty()) break;
        w += pq.poll();
    }
    return w;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + max-heap | O(n log n + k log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against exhaustive search.

## Recall before you reveal
<details><summary>Why is greedy right?</summary>

Profits are non-negative and only increase what you can afford.

</details>


## Connected
- [Furthest Building You Can Reach](Furthest%20Building%20You%20Can%20Reach.md)
