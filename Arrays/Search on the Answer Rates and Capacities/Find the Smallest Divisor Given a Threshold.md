---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer]
source: LeetCode 1283
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find the Smallest Divisor Given a Threshold

> [!TIP]
> **🧠 Memory hook**
> Koko in disguise: **Σ ⌈x / d⌉** falls as d grows. Find the smallest d with sum ≤ threshold.
> **Mantra: sum(mid) ≤ threshold → hi = mid · ELSE lo = mid + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=2) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Return the smallest positive divisor such that the sum of every element divided by it (rounded up) is at most threshold.

## Key insight
Same monotonic sum as Koko Eating Bananas.

## Approach: Binary search on divisor
```java
// Smallest divisor whose sum of rounded-up quotients is within threshold
public int smallestDivisor(int[] nums, int threshold) {
    int lo = 1, hi = 0;
    for (int x : nums) hi = Math.max(hi, x);
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        long sum = 0;
        for (int x : nums) sum += (x + mid - 1) / mid;
        if (sum <= threshold) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on divisor | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Same as which problem?</summary>

Koko Eating Bananas with threshold as hours.

</details>


<details><summary>Upper bound?</summary>

max(nums): every quotient is then 1.

</details>


## Connected
- [Koko Eating Bananas](Koko%20Eating%20Bananas.md)
