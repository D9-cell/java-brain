---
topic: Heap
pattern: [Sort + heap]
source: LeetCode 857
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Minimum Cost to Hire K Workers

> [!TIP]
> **🧠 Memory hook**
> Everyone is paid at the greediest worker's rate.
> **Mantra: SORT BY RATIO, MAX-HEAP DROPS BIGGEST QUALITY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=16) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Hire exactly k workers: each paid proportional to quality and at least their wage. Minimise total pay.

## Key insight
Group cost = max(wage/quality) × sum(quality). Sort by ratio; for the current max-ratio worker keep the k smallest qualities.

## Approach: Sort + max-heap
```java
// Sort by wage/quality ratio; the group's ratio is the current worker's; keep the k smallest qualities (max-heap)
public double mincostToHireWorkers(int[] quality, int[] wage, int k) {
    int n = quality.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Double.compare((double) wage[a] / quality[a], (double) wage[b] / quality[b]));
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    long qsum = 0;
    double best = Double.MAX_VALUE;
    for (int i : idx) {
        pq.offer(quality[i]);
        qsum += quality[i];
        if (pq.size() > k) qsum -= pq.poll();
        if (pq.size() == k) best = Math.min(best, qsum * ((double) wage[i] / quality[i]));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + max-heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Why drop the largest quality?</summary>

It raises the sum the most.

</details>


## Connected
- [Maximum Subsequence Score](Maximum%20Subsequence%20Score.md)
