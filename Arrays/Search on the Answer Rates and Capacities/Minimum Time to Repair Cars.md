---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Square root]
source: LeetCode 2594
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Time to Repair Cars

> [!TIP]
> **🧠 Memory hook**
> A mechanic of rank r fixes n cars in **r·n²** minutes, so in T minutes **⌊√(T / r)⌋** cars. Find the smallest T with enough cars.
> **Mantra: fixed(mid) = Σ ⌊√(mid / r)⌋ ≥ cars → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=6) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Mechanics work simultaneously. Return the minimum time to repair all cars.

## Key insight
Each mechanic's output grows with T. The best mechanic alone gives the upper bound minRank · cars².

## Approach: Binary search on time
```java
// In time T a mechanic of rank r repairs floor(sqrt(T / r)) cars
public long repairCars(int[] ranks, int cars) {
    int minRank = Integer.MAX_VALUE;
    for (int r : ranks) minRank = Math.min(minRank, r);
    long lo = 1, hi = (long) minRank * cars * cars;
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2, fixed = 0;
        for (int r : ranks) fixed += (long) Math.sqrt((double) mid / r);
        if (fixed >= cars) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on time | O(n log(r · c²)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why r · n²?</summary>

The statement defines the time that way.

</details>


<details><summary>Precision of sqrt?</summary>

Doubles are exact enough below 10¹⁴ here.

</details>


## Connected
- [Minimum Time to Complete Trips](Minimum%20Time%20to%20Complete%20Trips.md)
