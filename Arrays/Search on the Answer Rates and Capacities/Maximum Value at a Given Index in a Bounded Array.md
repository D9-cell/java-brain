---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Arithmetic series]
source: LeetCode 1802
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Value at a Given Index in a Bounded Array

> [!TIP]
> **🧠 Memory hook**
> Search the peak v. The cheapest array falls by 1 per step away from the index, never below 1. Its sum is two **arithmetic series** plus 1s.
> **Mantra: sum = side(v, left) + side(v, right) + v ≤ maxSum → lo = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=10) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Build an array of n positive integers with neighbours differing by at most 1 and sum ≤ maxSum. Return the maximum value at index.

## Key insight
For a side of len cells: if v − 1 ≥ len the values are v − 1 down to v − len; otherwise 1..v − 1 then (len − v + 1) ones. Use longs.

## Approach: Binary search on peak
```java
// Largest peak v whose minimal array (values fall by 1 each step, never below 1) fits in maxSum
public int maxValue(int n, int index, int maxSum) {
    int lo = 1, hi = maxSum;
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;
        if (side(mid, index) + side(mid, n - 1 - index) + mid <= maxSum) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Smallest sum of len cells next to a peak v: v-1, v-2, ... down to 1, then 1s
long side(long v, long len) {
    if (len == 0) return 0;
    if (v - 1 >= len) return (v - 1 + v - len) * len / 2;
    return (v - 1) * v / 2 + (len - (v - 1));
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on peak | O(log maxSum) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why fall by exactly 1?</summary>

It is the smallest sum allowed by the neighbour rule.

</details>


<details><summary>Why longs?</summary>

Sums can reach about 10¹⁸.

</details>


## Connected
- [Maximum Candies Allocated to K Children](Maximum%20Candies%20Allocated%20to%20K%20Children.md)
