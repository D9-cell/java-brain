---
topic: Rotated Arrays and Sorted Queries
pattern: [Find the drop, Duplicates]
source: LeetCode 154
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find Minimum in Rotated Sorted Array II

> [!TIP]
> **🧠 Memory hook**
> Same rule, plus: when **nums[mid] == nums[hi]**, you cannot tell the side, so **drop hi** (a copy of it remains at mid).
> **Mantra: > → lo = mid + 1 · < → hi = mid · == → hi−−**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=3) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Rotated sorted array with duplicates. Return its minimum.

## Key insight
Removing hi when it equals nums[mid] keeps the minimum value in range, because mid holds the same value. This can degrade to O(n).

## Approach: Shrink on ties
```java
// With duplicates an equal mid and right end tells nothing, so drop the right end
public int findMin(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else if (nums[mid] < nums[hi]) hi = mid;
        else hi--;
    }
    return nums[lo];
}
```

| Approach | Time | Space |
|---|---|---|
| Shrink on ties | O(log n) average, O(n) worst | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is hi−− safe?</summary>

nums[mid] has the same value and stays in range.

</details>


<details><summary>Worst case?</summary>

[1,1,1,0,1,1] style inputs.

</details>


## Connected
- [Find Minimum in Rotated Sorted Array](Find%20Minimum%20in%20Rotated%20Sorted%20Array.md)
