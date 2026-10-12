---
topic: Search on the Answer Distances and K-th Values
pattern: [Minimise the maximum, Greedy skip]
source: LeetCode 2560
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# House Robber IV

> [!TIP]
> **🧠 Memory hook**
> Guess capability c. Rob greedily: take any house **≤ c** and skip its neighbour. Smallest c that robs ≥ k houses.
> **Mantra: take nums[i] ≤ c, then i++ · taken ≥ k → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=2) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
The robber never takes adjacent houses and must take at least k houses. The capability is the maximum amount taken. Return the minimum capability.

## Key insight
With a fixed cap, taking a house as early as possible maximises how many non-adjacent houses fit, like interval scheduling.

## Approach: Binary search + greedy
```java
// Smallest capability c such that at least k non-adjacent houses have value <= c (take greedily)
public int minCapability(int[] nums, int k) {
    int lo = Integer.MAX_VALUE, hi = 0;
    for (int x : nums) {
        lo = Math.min(lo, x);
        hi = Math.max(hi, x);
    }
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2, taken = 0;
        for (int i = 0; i < nums.length; i++)
            if (nums[i] <= mid) {
                taken++;
                i++;
            }
        if (taken >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + greedy | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why greedy taking?</summary>

Choosing the earliest allowed house leaves the most room.

</details>


<details><summary>Search range?</summary>

Between the min and max house values.

</details>


## Connected
- [House Robber](../../DP/Stairs%20and%20Robbers/House%20Robber.md)
- [Minimize the Maximum Difference of Pairs](Minimize%20the%20Maximum%20Difference%20of%20Pairs.md)
