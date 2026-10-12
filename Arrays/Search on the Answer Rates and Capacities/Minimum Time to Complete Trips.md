---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer]
source: LeetCode 2187
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Time to Complete Trips

> [!TIP]
> **🧠 Memory hook**
> In time T the buses finish **Σ T / time[i]** trips. Find the smallest T reaching totalTrips.
> **Mantra: hi = fastest · totalTrips · trips(mid) ≥ total → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=5) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Bus i needs time[i] per trip and buses run independently. Return the minimum time for at least totalTrips trips in total.

## Key insight
The fastest bus alone finishes in fastest · totalTrips, a safe upper bound. Stop summing once the count is enough to avoid overflow.

## Approach: Binary search on time
```java
// Smallest time T with sum of T / time[i] >= totalTrips
public long minimumTime(int[] time, int totalTrips) {
    int fastest = Integer.MAX_VALUE;
    for (int t : time) fastest = Math.min(fastest, t);
    long lo = 1, hi = (long) fastest * totalTrips;
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2, trips = 0;
        for (int t : time) {
            trips += mid / t;
            if (trips >= totalTrips) break;
        }
        if (trips >= totalTrips) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on time | O(n log(min · total)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Upper bound?</summary>

Fastest bus doing every trip.

</details>


<details><summary>Why break early?</summary>

The sum can overflow and is already enough.

</details>


## Connected
- [Minimum Time to Repair Cars](Minimum%20Time%20to%20Repair%20Cars.md)
