---
topic: Rotated Arrays and Sorted Queries
pattern: [Sort, Median cost, Sliding window]
source: LeetCode 2968
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Apply Operations to Maximize Frequency Score

> [!TIP]
> **🧠 Memory hook**
> Sort. The cheapest way to make a window equal is to move everything to its **median**; the cost comes from **prefix sums**. Grow the window while cost ≤ k.
> **Mantra: sort · prefix sums · cost(l, r) to median · shrink l while > k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=12) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
With at most k total +1/−1 operations, return the largest possible frequency of the most frequent element.

## Key insight
The elements made equal should be consecutive in sorted order. Cost to the median = (median·left count − left sum) + (right sum − median·right count). Since cost grows with the window, a two-pointer window works.

## Approach: Window + median cost
```java
// Sort; a window can be made equal at its median for a cost from prefix sums; grow while cost <= k
public int maxFrequencyScore(int[] nums, long k) {
    Arrays.sort(nums);
    int n = nums.length;
    long[] pre = new long[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    int best = 0;
    for (int l = 0, r = 0; r < n; r++) {
        while (cost(nums, pre, l, r) > k) l++;
        best = Math.max(best, r - l + 1);
    }
    return best;
}

// Cost to move nums[l..r] to its median
long cost(int[] nums, long[] pre, int l, int r) {
    int m = (l + r) / 2;
    long med = nums[m];
    long left = med * (m - l) - (pre[m] - pre[l]);
    long right = (pre[r + 1] - pre[m + 1]) - med * (r - m);
    return left + right;
}
```

| Approach | Time | Space |
|---|---|---|
| Window + median cost | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the median?</summary>

It minimises the sum of absolute differences.

</details>


<details><summary>Why consecutive in sorted order?</summary>

Swapping in a farther element only costs more.

</details>


## Connected
- [Minimum Operations to Make a Uni-Value Grid](../../Mathematical/Primes%20Divisors%20and%20Remainders/Minimum%20Operations%20to%20Make%20a%20Uni-Value%20Grid.md)
