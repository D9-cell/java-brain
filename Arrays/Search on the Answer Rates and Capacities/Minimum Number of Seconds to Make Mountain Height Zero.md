---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Triangular numbers]
source: LeetCode 3296
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Number of Seconds to Make Mountain Height Zero

> [!TIP]
> **🧠 Memory hook**
> Removing x units costs a worker **t · x(x + 1)/2** seconds. In T seconds that worker removes the largest x with x(x+1)/2 ≤ T / t.
> **Mantra: removed(mid) = Σ units(mid / t) ≥ height → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=13) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Workers reduce the mountain simultaneously; worker i needs t, 2t, …, x·t seconds for its x units. Return the minimum seconds to reach height 0.

## Key insight
units() solves the quadratic with sqrt and then fixes rounding with two small loops. Stop summing once the height is covered.

## Approach: Binary search on time
```java
// In T seconds a worker with time t removes the largest x with t * x(x+1)/2 <= T
public long minNumberOfSeconds(int mountainHeight, int[] workerTimes) {
    int fastest = Integer.MAX_VALUE;
    for (int t : workerTimes) fastest = Math.min(fastest, t);
    long lo = 1, hi = (long) fastest * mountainHeight * (mountainHeight + 1) / 2;
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2, removed = 0;
        for (int t : workerTimes) {
            removed += units(mid / t);
            if (removed >= mountainHeight) break;
        }
        if (removed >= mountainHeight) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Largest x with x(x+1)/2 <= budget
long units(long budget) {
    long x = (long) ((Math.sqrt(8.0 * budget + 1) - 1) / 2);
    while ((x + 1) * (x + 2) / 2 <= budget) x++;
    while (x * (x + 1) / 2 > budget) x--;
    return x;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on time | O(n log(t·h²)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why fix the sqrt result?</summary>

Double rounding can be off by one near perfect squares.

</details>


<details><summary>Upper bound?</summary>

The fastest worker alone: t · h(h + 1)/2.

</details>


## Connected
- [Minimum Time to Repair Cars](Minimum%20Time%20to%20Repair%20Cars.md)
