---
topic: Rotated Arrays and Sorted Queries
pattern: [Sorted half]
source: LeetCode 33
difficulty: Medium
companies: [Meta, Amazon, Microsoft, LinkedIn]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Search in Rotated Sorted Array

> [!TIP]
> **🧠 Memory hook**
> One side of mid is always sorted. If the target lies **inside the sorted side**, go there; otherwise go to the other side.
> **Mantra: nums[lo] ≤ nums[mid] → left sorted: target in [lo, mid) ? left : right · ELSE mirror**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=0) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
A sorted array of distinct values was rotated at an unknown pivot. Return the index of target or -1 in O(log n).

## Key insight
The rotation point lies in only one half, so the other half is a normal sorted range where "is target inside" is a simple bounds check.

## Approach: Sorted-half search
```java
// One half around mid is always sorted; check whether the target lies inside that half
public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted-half search | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ≤ in nums[lo] <= nums[mid]?</summary>

When lo == mid the left half has one element and is sorted.

</details>


<details><summary>Two-step alternative?</summary>

Find the minimum index, then search the correct side.

</details>


## Connected
- [Search in Rotated Sorted Array II](Search%20in%20Rotated%20Sorted%20Array%20II.md)
- [Find Minimum in Rotated Sorted Array](Find%20Minimum%20in%20Rotated%20Sorted%20Array.md)
