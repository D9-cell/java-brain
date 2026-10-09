---
topic: Heap
pattern: [Sort + heap, Simulation]
source: LeetCode 1834
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Single-Threaded CPU

> [!TIP]
> **🧠 Memory hook**
> A clinic queue: among arrived patients the quickest appointment goes first.
> **Mantra: SORT BY ENQUEUE, HEAP (duration, index), JUMP WHEN IDLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=21) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Return the processing order of tasks on a single-threaded CPU.

## Key insight
Sort by enqueue time; push arrived tasks into a heap ordered by (processing time, index); jump the clock when idle.

## Approach: Sort + heap
```java
// Sort by enqueue time; at each moment push every arrived task into a heap (processing, index); jump time when idle
public int[] getOrder(int[][] tasks) {
    int n = tasks.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Integer.compare(tasks[a][0], tasks[b][0]));
    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> tasks[a][1] != tasks[b][1] ? Integer.compare(tasks[a][1], tasks[b][1]) : a - b);
    int[] order = new int[n];
    long time = 0;
    int i = 0, k = 0;
    while (k < n) {
        if (pq.isEmpty() && time < tasks[idx[i]][0]) time = tasks[idx[i]][0];
        while (i < n && tasks[idx[i]][0] <= time) pq.offer(idx[i++]);
        int t = pq.poll();
        time += tasks[t][1];
        order[k++] = t;
    }
    return order;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Clock type?</summary>

long.

</details>

