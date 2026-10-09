---
topic: Meet In The Middle
pattern: [Meet in the middle, Lower bound + neighbour]
source: LeetCode 1755
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, mitm]
---
# Closest Subsequence Sum

> [!TIP]
> **🧠 Memory hook**
> The tunnel ends may not line up exactly. Check just past the target and just before it, and take the closer one.
> **Mantra: LOWER BOUND + ITS LEFT NEIGHBOUR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Meet%20In%20The%20Middle/Meet%20In%20The%20Middle%20Animations.html#p=1) · **Pattern hub:** [Meet In The Middle - Pattern Map](Meet%20In%20The%20Middle%20-%20Pattern%20Map.md)

## Problem
Pick a subsequence of `nums` (n ≤ 40) to minimise `|sum − goal|`.

## Key insight
Fix a left sum s. The best right sum is the one closest to `goal − s`. In a sorted array that is the first element ≥ need (`idx`) or the one right before it (`idx − 1`).

## Approach: MITM + two-neighbour check
```java
// All 2^len subset sums of a[from .. from+len)
static int[] subsetSums(int[] a, int from, int len) {
    int[] sums = new int[1 << len];
    for (int mask = 1; mask < (1 << len); mask++)
        sums[mask] = sums[mask & (mask - 1)] + a[from + Integer.numberOfTrailingZeros(mask)];
    return sums;
}

// For each left sum, check the right sums just at/above and just below goal - left
public int minAbsDifference(int[] nums, int goal) {
    int n1 = nums.length / 2, n2 = nums.length - n1;
    int[] left = subsetSums(nums, 0, n1), right = subsetSums(nums, n1, n2);
    Arrays.sort(right);
    int best = Integer.MAX_VALUE;
    for (int s : left) {
        int idx = lowerBound(right, goal - s);
        if (idx < right.length) best = Math.min(best, Math.abs(s + right[idx] - goal));
        if (idx > 0) best = Math.min(best, Math.abs(s + right[idx - 1] - goal));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| MITM + two-neighbour check | O(2^(n/2) · n) | O(2^(n/2)) |

## Recall before you reveal
<details><summary>Why are exactly two candidates enough?</summary>

Everything left of idx−1 is smaller and further away; everything right of idx is bigger and further away.

</details>


<details><summary>Can sums overflow int here?</summary>

No: |nums[i]| ≤ 1e7 and n ≤ 40 gives at most 4e8, which fits.

</details>


## Connected
- Exact version: [CSES 1628 - Meet In The Middle](CSES%201628%20-%20Meet%20In%20The%20Middle.md)
- Same check with size buckets: [Partition Array Into Two Arrays to Minimize Sum Difference](Partition%20Array%20Into%20Two%20Arrays%20to%20Minimize%20Sum%20Difference.md)
