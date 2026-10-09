---
topic: Heap
pattern: [k sorted lists]
source: LeetCode 373
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Find K Pairs with Smallest Sums

> [!TIP]
> **🧠 Memory hook**
> Merging k sorted rows of a sum table.
> **Mantra: SEED COLUMN 0, POP → PUSH RIGHT NEIGHBOUR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=4) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Return the k pairs (u, v) with the smallest sums from two sorted arrays.

## Key insight
Row i of the sum table (a[i] + b[j]) is sorted. Seed (i, 0) for i < k; each pop pushes (i, j+1).

## Approach: Heap over rows
```java
// Seed (i, 0) for each i; popping (i, j) pushes its right neighbour (i, j+1). Like merging k sorted lists
public List<List<Integer>> kSmallestPairs(int[] a, int[] b, int k) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Integer.compare(a[x[0]] + b[x[1]], a[y[0]] + b[y[1]]));
    for (int i = 0; i < Math.min(a.length, k); i++) pq.offer(new int[]{i, 0});
    List<List<Integer>> res = new ArrayList<>();
    while (res.size() < k && !pq.isEmpty()) {
        int[] p = pq.poll();
        res.add(List.of(a[p[0]], b[p[1]]));
        if (p[1] + 1 < b.length) pq.offer(new int[]{p[0], p[1] + 1});
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Heap over rows | O(k log k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Why seed only min(n, k) rows?</summary>

Later rows cannot contribute to the first k.

</details>


## Connected
- [K-th Smallest Prime Fraction](K-th%20Smallest%20Prime%20Fraction.md)
- [Smallest Range Covering Elements from K Lists](Smallest%20Range%20Covering%20Elements%20from%20K%20Lists.md)
