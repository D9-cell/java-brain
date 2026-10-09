---
topic: Stock and Kadane States
pattern: [Run length DP, Count ending here]
source: LeetCode 413
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Arithmetic Slices

> [!TIP]
> **🧠 Memory hook**
> Each new element that **keeps the same difference** adds one more slice for every earlier start in the run.
> **Mantra: SAME DIFF → run++ ELSE run = 0; total += run**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=7) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Count the contiguous subarrays of length at least 3 whose consecutive differences are all equal.

## Key insight
Let run be the number of arithmetic slices ending at i. If the difference repeats, every slice ending at i − 1 extends to i and one new slice of length 3 appears: run + 1. Otherwise run is 0.

## Approach: Run length
```java
// run = arithmetic slices ending at i; it grows by one while the difference repeats
public int numberOfArithmeticSlices(int[] nums) {
    int run = 0, total = 0;
    for (int i = 2; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) run++;
        else run = 0;
        total += run;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Run length | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Closed form for a run of length L?</summary>

(L − 1)(L − 2) / 2 slices.

</details>


<details><summary>Subsequence version?</summary>

Arithmetic Slices II uses a hashmap per index.

</details>


## Connected
- Arithmetic Slices II - Subsequence
- [Longest Turbulent Subarray](Longest%20Turbulent%20Subarray.md)
