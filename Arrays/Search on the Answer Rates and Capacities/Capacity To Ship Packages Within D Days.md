---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Greedy check]
source: LeetCode 1011
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Capacity To Ship Packages Within D Days

> [!TIP]
> **🧠 Memory hook**
> Search capacity in **[max weight, total weight]**. Check by loading greedily: start a new day when the next package does not fit.
> **Mantra: lo = max w, hi = Σ w · daysNeeded(mid) ≤ days → hi = mid · ELSE lo = mid + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=0) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Packages must be shipped in order within days days. Return the least ship capacity that makes it possible.

## Key insight
More capacity never needs more days, so feasibility is monotonic. Below the heaviest package nothing works; the total ships in one day.

## Approach: Binary search on capacity
```java
// Smallest capacity in [max weight, total] that ships everything within days
public int shipWithinDays(int[] weights, int days) {
    int lo = 0, hi = 0;
    for (int w : weights) {
        lo = Math.max(lo, w);
        hi += w;
    }
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (daysNeeded(weights, mid) <= days) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Greedy loading: start a new day when the next package does not fit
int daysNeeded(int[] weights, int cap) {
    int d = 1, load = 0;
    for (int w : weights) {
        if (load + w > cap) {
            d++;
            load = 0;
        }
        load += w;
    }
    return d;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on capacity | O(n log Σw) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why lo = max weight?</summary>

Every package must fit on its own.

</details>


<details><summary>Why is the greedy check correct?</summary>

Filling each day as much as possible never uses more days.

</details>


## Connected
- [Koko Eating Bananas](Koko%20Eating%20Bananas.md)
- [Minimum Limit of Balls in a Bag](Minimum%20Limit%20of%20Balls%20in%20a%20Bag.md)
