---
topic: Prefix Sums Basics
pattern: [Distance sums]
source: LeetCode 1685
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Sum of Absolute Differences in a Sorted Array

> [!TIP]
> **🧠 Memory hook**
> Sorted, so elements on the left are smaller: they contribute **x·i − leftSum**; the right contributes **rightSum − x·(n−1−i)**.
> **Mantra: out[i] = x·i − left + right − x·(n−1−i)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=10) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
nums is sorted. Return result[i] = Σ |nums[i] − nums[j]| over all j.

## Key insight
Sorting removes the absolute values. One running sum and the total give both sides.

## Approach: Prefix sums
```java
// Left side contributes x*i - leftSum, right side rightSum - x*(n - 1 - i)
public int[] getSumAbsoluteDifferences(int[] nums) {
    int n = nums.length, total = 0, left = 0;
    for (int x : nums) total += x;
    int[] out = new int[n];
    for (int i = 0; i < n; i++) {
        int right = total - left - nums[i];
        out[i] = nums[i] * i - left + right - nums[i] * (n - 1 - i);
        left += nums[i];
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix sums | O(n) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does sorted matter?</summary>

It fixes the sign of every difference.

</details>


<details><summary>Unsorted input?</summary>

Sort indexes first, as in Sum of Distances.

</details>


## Connected
- [Sum of Distances](Sum%20of%20Distances.md)
- [Minimum Number of Operations to Move All Balls to Each Box](../../Strings/Binary%20Strings%20and%20Substring%20Counting/Minimum%20Number%20of%20Operations%20to%20Move%20All%20Balls%20to%20Each%20Box.md)
