---
topic: Binary Search Basics
pattern: [Pair parity]
source: LeetCode 540
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Single Element in a Sorted Array

> [!TIP]
> **🧠 Memory hook**
> Before the single element, pairs start at **even** indexes. Snap mid to even: if nums[mid] == nums[mid + 1] the single is to the right.
> **Mantra: mid even · pair intact → lo = mid + 2 · ELSE hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=6) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Every element appears twice except one, in a sorted array. Find it in O(log n).

## Key insight
The single element shifts every later pair to start at an odd index. Comparing the even index with its neighbour tells which side of the break mid is on.

## Approach: Even-index search
```java
// Before the single element pairs start at even indexes; after it they start at odd ones
public int singleNonDuplicate(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (mid % 2 == 1) mid--;
        if (nums[mid] == nums[mid + 1]) lo = mid + 2;
        else hi = mid;
    }
    return nums[lo];
}
```

| Approach | Time | Space |
|---|---|---|
| Even-index search | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why snap mid to even?</summary>

Pairs before the single start at even indexes.

</details>


<details><summary>XOR version?</summary>

O(n), ignores sortedness.

</details>


## Connected
- [Peak Index in a Mountain Array](Peak%20Index%20in%20a%20Mountain%20Array.md)
