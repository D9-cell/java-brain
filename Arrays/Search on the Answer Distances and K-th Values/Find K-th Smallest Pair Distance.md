---
topic: Search on the Answer Distances and K-th Values
pattern: [K-th value, Sliding window count]
source: LeetCode 719
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find K-th Smallest Pair Distance

> [!TIP]
> **🧠 Memory hook**
> Sort. The answer is the **smallest d with at least k pairs at distance ≤ d**. Count those pairs with a sliding window.
> **Mantra: count(d): for r, move l while a[r] − a[l] > d, add r − l · count ≥ k → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=3) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Return the k-th smallest distance |nums[i] − nums[j]| among all pairs i < j.

## Key insight
Listing all n² distances is too slow. Counting pairs within d is O(n) on a sorted array, and the count grows with d.

## Approach: Binary search + window count
```java
// Smallest d with at least k pairs at distance <= d; count pairs with a sliding window
public int smallestDistancePair(int[] nums, int k) {
    Arrays.sort(nums);
    int lo = 0, hi = nums[nums.length - 1] - nums[0];
    while (lo < hi) {
        int mid = (lo + hi) / 2, count = 0;
        for (int l = 0, r = 0; r < nums.length; r++) {
            while (nums[r] - nums[l] > mid) l++;
            count += r - l;
        }
        if (count >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + window count | O(n log n + n log range) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the result an actual distance?</summary>

The smallest d with count ≥ k must be achieved by some pair.

</details>


<details><summary>Why r − l?</summary>

Every l' in [l, r) pairs with r within d.

</details>


## Connected
- [Kth Smallest Product of Two Sorted Arrays](Kth%20Smallest%20Product%20of%20Two%20Sorted%20Arrays.md)
- [K-th Smallest Prime Fraction](../../Heap/K-th%20Smallest%20Prime%20Fraction.md)
