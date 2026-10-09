---
topic: Sorting and Matching
pattern: [Sort by efficiency, Min-heap of speeds]
source: LeetCode 1383
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Performance of a Team

> [!TIP]
> **🧠 Memory hook**
> Fix the **weakest link** (efficiency) and take the k fastest engineers at least that efficient.
> **Mantra: EFFICIENCY DESC, HEAP KEEPS THE K FASTEST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=13) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Pick at most k engineers; performance = (sum of speeds) × (minimum efficiency). Maximise it modulo 1e9+7.

## Key insight
Sort by efficiency descending. When engineer e is added, the current minimum efficiency is e's. Keep the k largest speeds seen so far in a min-heap and update the best product.

## Approach: Sort + min-heap
```java
// Sort engineers by efficiency descending; the current efficiency is the team minimum, so keep the k fastest speeds in a min-heap
public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {
    int[][] eng = new int[n][];
    for (int i = 0; i < n; i++) eng[i] = new int[]{speed[i], efficiency[i]};
    Arrays.sort(eng, (a, b) -> b[1] - a[1]);
    PriorityQueue<Integer> speeds = new PriorityQueue<>();
    long sum = 0, best = 0;
    for (int[] e : eng) {
        speeds.add(e[0]);
        sum += e[0];
        if (speeds.size() > k) sum -= speeds.poll();
        best = Math.max(best, sum * e[1]);
    }
    return (int) (best % 1_000_000_007);
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + min-heap | O(n log n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why a min-heap?</summary>

It lets you drop the slowest speed when there are more than k.

</details>


<details><summary>Why take the modulo only at the end?</summary>

Comparing modded values would give wrong maxima.

</details>


## Connected
- [Maximum Average Pass Ratio](Maximum%20Average%20Pass%20Ratio.md)
