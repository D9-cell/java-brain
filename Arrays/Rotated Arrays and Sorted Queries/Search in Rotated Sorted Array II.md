---
topic: Rotated Arrays and Sorted Queries
pattern: [Sorted half, Duplicates]
source: LeetCode 81
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Search in Rotated Sorted Array II

> [!TIP]
> **🧠 Memory hook**
> Duplicates can hide which half is sorted. When **nums[lo] == nums[mid] == nums[hi]**, shrink both ends by one and try again.
> **Mantra: all three equal → lo++, hi−− · ELSE sorted-half rule**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=1) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Same as Search in Rotated Sorted Array, but values may repeat. Return whether target is present.

## Key insight
With [1,0,1,1,1] the ends and middle are equal, so neither half can be trusted. Dropping an equal end never loses the target (mid already checked it). Worst case becomes O(n).

## Approach: Sorted half + shrink
```java
// Same as without duplicates, but when lo, mid and hi are equal shrink both ends by one
public boolean search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (nums[mid] == target) return true;
        if (nums[lo] == nums[mid] && nums[mid] == nums[hi]) {
            lo++;
            hi--;
        } else if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted half + shrink | O(log n) average, O(n) worst | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why can we drop lo and hi?</summary>

They equal nums[mid], which is not the target.

</details>


<details><summary>Worst case input?</summary>

All equal except one element.

</details>


## Connected
- [Search in Rotated Sorted Array](Search%20in%20Rotated%20Sorted%20Array.md)
- [Find Minimum in Rotated Sorted Array II](Find%20Minimum%20in%20Rotated%20Sorted%20Array%20II.md)
