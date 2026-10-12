---
topic: Search on the Answer Distances and K-th Values
pattern: [Minimise the maximum, Greedy adjacent pairs]
source: LeetCode 2616
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimize the Maximum Difference of Pairs

> [!TIP]
> **🧠 Memory hook**
> Sort. For a guess d, **pair adjacent elements greedily** whenever their gap ≤ d, skipping both. Smallest d giving p pairs.
> **Mantra: sort · scan: nums[i] − nums[i−1] ≤ d → pair, i++ · pairs ≥ p → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=1) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Choose p disjoint index pairs to minimise the maximum absolute difference among them. Return that minimum maximum.

## Key insight
In sorted order an optimal pairing uses adjacent elements. Taking a valid adjacent pair as early as possible never reduces the number of pairs.

## Approach: Binary search + greedy
```java
// Smallest d such that p disjoint adjacent pairs with gap <= d exist; pair greedily after sorting
public int minimizeMax(int[] nums, int p) {
    Arrays.sort(nums);
    int lo = 0, hi = nums[nums.length - 1] - nums[0];
    while (lo < hi) {
        int mid = (lo + hi) / 2, pairs = 0;
        for (int i = 1; i < nums.length && pairs < p; i++)
            if (nums[i] - nums[i - 1] <= mid) {
                pairs++;
                i++;
            }
        if (pairs >= p) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + greedy | O(n log n + n log range) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why adjacent pairs only?</summary>

Swapping partners to adjacent ones never increases a difference.

</details>


<details><summary>p = 0?</summary>

Answer 0.

</details>


## Connected
- [House Robber IV](House%20Robber%20IV.md)
