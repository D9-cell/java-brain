---
topic: Search on the Answer Rates and Capacities
pattern: [Convex cost, Weighted median]
source: LeetCode 2448
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Cost to Make Array Equal

> [!TIP]
> **🧠 Memory hook**
> Total cost Σ |x − t|·cost is **convex** in t. Binary search on the slope: if f(mid) ≤ f(mid + 1) the minimum is at mid or left.
> **Mantra: f(mid) ≤ f(mid + 1) → hi = mid · ELSE lo = mid + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=12) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Changing nums[i] by 1 costs cost[i]. Return the minimum total cost to make all elements equal.

## Key insight
A sum of convex functions is convex, so its slope changes sign once. Equivalently, the optimum is the weighted median of nums.

## Approach: Binary search on slope
```java
// The cost is convex in the target, so binary search on the slope f(x) vs f(x + 1)
public long minCost(int[] nums, int[] cost) {
    int lo = Integer.MAX_VALUE, hi = 0;
    for (int x : nums) {
        lo = Math.min(lo, x);
        hi = Math.max(hi, x);
    }
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (total(nums, cost, mid) <= total(nums, cost, mid + 1)) hi = mid;
        else lo = mid + 1;
    }
    return total(nums, cost, lo);
}

// Cost of moving every element to target
long total(int[] nums, int[] cost, int target) {
    long t = 0;
    for (int i = 0; i < nums.length; i++) t += (long) Math.abs(nums[i] - target) * cost[i];
    return t;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on slope | O(n log range) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Weighted median version?</summary>

Sort by value and stop where the cumulative cost passes half.

</details>


<details><summary>Why stay inside [min, max]?</summary>

Moving outside only adds cost.

</details>


## Connected
- [Minimum Operations to Make a Uni-Value Grid](../../Mathematical/Primes%20Divisors%20and%20Remainders/Minimum%20Operations%20to%20Make%20a%20Uni-Value%20Grid.md)
- [Apply Operations to Maximize Frequency Score](../Rotated%20Arrays%20and%20Sorted%20Queries/Apply%20Operations%20to%20Maximize%20Frequency%20Score.md)
