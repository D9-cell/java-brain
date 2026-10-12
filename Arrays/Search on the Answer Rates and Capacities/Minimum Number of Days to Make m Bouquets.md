---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Runs]
source: LeetCode 1482
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Number of Days to Make m Bouquets

> [!TIP]
> **🧠 Memory hook**
> By day d, bloomed flowers form runs; each run of length L gives **L / k** bouquets. Find the smallest day with ≥ m.
> **Mantra: m·k > n → −1 · bouquets(day) ≥ m → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=3) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
bloomDay[i] is when flower i blooms. A bouquet uses k adjacent bloomed flowers. Return the minimum day to make m bouquets, or -1.

## Key insight
Later days only add bloomed flowers. If m·k exceeds the number of flowers it is impossible regardless of the day.

## Approach: Binary search on day
```java
// Smallest day by which m runs of k adjacent bloomed flowers exist
public int minDays(int[] bloomDay, int m, int k) {
    if ((long) m * k > bloomDay.length) return -1;
    int lo = Integer.MAX_VALUE, hi = 0;
    for (int d : bloomDay) {
        lo = Math.min(lo, d);
        hi = Math.max(hi, d);
    }
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (bouquets(bloomDay, mid, k) >= m) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Count bouquets on a given day by cutting runs of bloomed flowers into groups of k
int bouquets(int[] bloomDay, int day, int k) {
    int count = 0, run = 0;
    for (int d : bloomDay) {
        run = d <= day ? run + 1 : 0;
        if (run == k) {
            count++;
            run = 0;
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on day | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why check m·k first?</summary>

Not enough flowers in total.

</details>


<details><summary>Why long for m·k?</summary>

Both can be 10⁶.

</details>


## Connected
- [Capacity To Ship Packages Within D Days](Capacity%20To%20Ship%20Packages%20Within%20D%20Days.md)
