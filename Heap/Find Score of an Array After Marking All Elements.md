---
topic: Heap
pattern: [Repeat on the extreme, Lazy skip]
source: LeetCode 2593
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Find Score of an Array After Marking All Elements

> [!TIP]
> **🧠 Memory hook**
> Take the cheapest unmarked item; it and its neighbours leave.
> **Mantra: MIN-HEAP (value, index), SKIP MARKED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=9) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Repeatedly add the smallest unmarked element (ties: smaller index) and mark it and its neighbours.

## Key insight
Pop (value, index) in order; marked entries are simply skipped.

## Approach: Min-heap
```java
// Min-heap of (value, index); skip marked entries; take the value and mark it and its neighbours
public long findScore(int[] nums) {
    int n = nums.length;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
    for (int i = 0; i < n; i++) pq.offer(new int[]{nums[i], i});
    boolean[] marked = new boolean[n];
    long score = 0;
    while (!pq.isEmpty()) {
        int[] p = pq.poll();
        if (marked[p[1]]) continue;
        score += p[0];
        marked[p[1]] = true;
        if (p[1] > 0) marked[p[1] - 1] = true;
        if (p[1] + 1 < n) marked[p[1] + 1] = true;
    }
    return score;
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Sorting alternative?</summary>

Sort indices by (value, index) once; same skipping.

</details>

