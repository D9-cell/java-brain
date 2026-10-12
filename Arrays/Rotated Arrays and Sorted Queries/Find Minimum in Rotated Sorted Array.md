---
topic: Rotated Arrays and Sorted Queries
pattern: [Find the drop]
source: LeetCode 153
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find Minimum in Rotated Sorted Array

> [!TIP]
> **🧠 Memory hook**
> Compare mid with the **right end**: if nums[mid] > nums[hi] the drop (and minimum) is to the right; otherwise mid could be the minimum.
> **Mantra: nums[mid] > nums[hi] → lo = mid + 1 · ELSE hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=2) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Return the minimum of a rotated sorted array of distinct values in O(log n).

## Key insight
The right end is always in the lower run (or the whole array is sorted), which makes it the right reference. Comparing with nums[lo] fails on unrotated arrays.

## Approach: Compare with the right end
```java
// Compare mid with the right end: bigger means the drop is to the right of mid
public int findMin(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else hi = mid;
    }
    return nums[lo];
}
```

| Approach | Time | Space |
|---|---|---|
| Compare with the right end | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not compare with nums[lo]?</summary>

An unrotated array would send the search the wrong way.

</details>


<details><summary>Why hi = mid, not mid − 1?</summary>

mid may itself be the minimum.

</details>


## Connected
- [Find Minimum in Rotated Sorted Array II](Find%20Minimum%20in%20Rotated%20Sorted%20Array%20II.md)
- [Find the Rotation Count in Rotated Sorted array](Find%20the%20Rotation%20Count%20in%20Rotated%20Sorted%20array.md)
