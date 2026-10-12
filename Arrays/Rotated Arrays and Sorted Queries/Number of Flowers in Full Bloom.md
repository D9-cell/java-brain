---
topic: Rotated Arrays and Sorted Queries
pattern: [Two sorted lists, Count ≤]
source: LeetCode 2251
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Number of Flowers in Full Bloom

> [!TIP]
> **🧠 Memory hook**
> Blooming at time t = **flowers started by t − flowers ended before t**. Sort starts and ends separately and count with bounds.
> **Mantra: count(start ≤ t) − count(end ≤ t − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=10) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
flowers[i] = [start, end] (inclusive). For each person arriving at time t, return how many flowers are in bloom.

## Key insight
A flower blooms at t iff it started by t and has not ended before t. Separate sorted lists answer each part with one binary search.

## Approach: Sorted starts and ends
```java
// Blooming at t = flowers started by t minus flowers that ended before t
public int[] fullBloomFlowers(int[][] flowers, int[] people) {
    int n = flowers.length;
    int[] start = new int[n], end = new int[n];
    for (int i = 0; i < n; i++) {
        start[i] = flowers[i][0];
        end[i] = flowers[i][1];
    }
    Arrays.sort(start);
    Arrays.sort(end);
    int[] out = new int[people.length];
    for (int i = 0; i < people.length; i++) out[i] = countAtMost(start, people[i]) - countAtMost(end, people[i] - 1);
    return out;
}

// Number of values <= x in a sorted array
int countAtMost(int[] a, int x) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] <= x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted starts and ends | O((n + q) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why end ≤ t − 1?</summary>

A flower ending exactly at t still blooms (inclusive).

</details>


<details><summary>Line sweep alternative?</summary>

Difference events sorted with the queries.

</details>


## Connected
- [Most Beautiful Item for Each Query](Most%20Beautiful%20Item%20for%20Each%20Query.md)
- [Car Pooling](../../Line%20Sweep/Car%20Pooling.md)
