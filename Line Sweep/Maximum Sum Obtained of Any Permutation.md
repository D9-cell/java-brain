---
topic: Line Sweep
pattern: [Difference array, Greedy sorting]
source: LeetCode 1589
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# Maximum Sum Obtained of Any Permutation

> [!TIP]
> **🧠 Memory hook**
> A busy street: put the biggest shops where the most people walk. Line sweep measures the foot traffic.
> **Mantra: COUNT COVERAGE, SORT BOTH, BIG×BIG**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=4) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
Permute `nums` to maximise the total of all `sum(nums[l..r])` for the given requests (mod 1e9+7).

## Key insight
Index i contributes `nums[i] × freq[i]`, where freq[i] = how many requests cover i. Get freq with a difference array, then pair sorted nums with sorted freq (rearrangement inequality).

## Approach: Difference array + greedy pairing
```java
// Count how many requests cover each index, then pair the biggest numbers with the busiest indices
public int maxSumRangeQuery(int[] nums, int[][] requests) {
    final int MOD = 1_000_000_007;
    int n = nums.length;
    int[] freq = new int[n + 1];
    for (int[] q : requests) {
        freq[q[0]]++;
        freq[q[1] + 1]--;
    }
    for (int i = 1; i < n; i++) freq[i] += freq[i - 1];
    int[] f = Arrays.copyOf(freq, n);
    Arrays.sort(f);
    Arrays.sort(nums);
    long res = 0;
    for (int i = n - 1; i >= 0; i--) res = (res + (long) nums[i] * f[i]) % MOD;
    return (int) res;
}
```

| Approach | Time | Space |
|---|---|---|
| Difference array + greedy pairing | O(n log n + q) | O(n) |

## Recall before you reveal
<details><summary>Why sort both ascending and multiply index by index?</summary>

The largest value should pair with the largest frequency.

</details>


<details><summary>Overflow?</summary>

Cast to long before multiplying, then take mod.

</details>


## Connected
- Diff array from [Corporate Flight Bookings](Corporate%20Flight%20Bookings.md)
