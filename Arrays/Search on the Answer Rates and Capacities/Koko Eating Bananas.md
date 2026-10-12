---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer]
source: LeetCode 875
difficulty: Medium
companies: [Amazon, Google, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Koko Eating Bananas

> [!TIP]
> **🧠 Memory hook**
> Hours at speed s = **Σ ⌈pile / s⌉**, which only falls as s grows. Find the smallest s with hours ≤ h.
> **Mantra: lo = 1, hi = max pile · hours(mid) ≤ h → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=1) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Koko eats up to k bananas from one pile per hour. Return the minimum k to finish all piles within h hours.

## Key insight
The answer lies between 1 and the biggest pile (one pile per hour). Use long for the hour total.

## Approach: Binary search on speed
```java
// Smallest speed whose total hours ceil(pile / speed) fit in h
public int minEatingSpeed(int[] piles, int h) {
    int lo = 1, hi = 0;
    for (int p : piles) hi = Math.max(hi, p);
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long hours = 0;
        for (int p : piles) hours += (p + mid - 1) / mid;
        if (hours <= h) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on speed | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why hi = max pile?</summary>

At that speed each pile takes exactly one hour.

</details>


<details><summary>Why long?</summary>

Hours can reach n · 10⁹ at speed 1.

</details>


## Connected
- [Capacity To Ship Packages Within D Days](Capacity%20To%20Ship%20Packages%20Within%20D%20Days.md)
- [Find the Smallest Divisor Given a Threshold](Find%20the%20Smallest%20Divisor%20Given%20a%20Threshold.md)
