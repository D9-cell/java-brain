---
topic: Formulas and Observations
pattern: [Invariant]
source: LeetCode 775
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Global and Local Inversions

> [!TIP]
> **🧠 Memory hook**
> Every local inversion is also global. They are equal iff **no inversion skips a position**, i.e. **|nums[i] − i| ≤ 1** for all i.
> **Mantra: ANY |nums[i] − i| > 1 → false**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=14) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
nums is a permutation of 0..n−1. Return true if the number of global inversions (i < j, nums[i] > nums[j]) equals the number of local inversions (nums[i] > nums[i + 1]).

## Key insight
If some value is two or more places from its sorted position, it forms an inversion with a non-neighbour. Conversely, values off by at most one only swap with neighbours.

## Approach: Distance check
```java
// Every local inversion is global, so equality means no non-adjacent inversion: |nums[i] - i| <= 1
public boolean isIdealPermutation(int[] nums) {
    for (int i = 0; i < nums.length; i++)
        if (Math.abs(nums[i] - i) > 1) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Distance check | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not count inversions?</summary>

Counting takes O(n log n); only equality matters.

</details>


<details><summary>Alternative check?</summary>

nums[i] > min(nums[i + 2..]) for any i means false.

</details>


## Connected
- [Beautiful Array](Beautiful%20Array.md)
