---
topic: Stock and Kadane States
pattern: [Two thresholds, LIS of length 3]
source: LeetCode 334
difficulty: Medium
companies: [Meta, Amazon]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Increasing Triplet Subsequence

> [!TIP]
> **🧠 Memory hook**
> Keep the smallest **first** and the smallest **second** you have seen; any number above both finishes the triplet.
> **Mantra: x ≤ first → first = x · x ≤ second → second = x · ELSE TRUE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=9) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Return true if there are indices i < j < k with nums[i] < nums[j] < nums[k].

## Key insight
This is patience sorting for LIS with only two piles: first is the best tail of length 1, second the best tail of length 2. A value larger than second extends to length 3. The array version checks, for each middle, the smallest value on its left and the largest on its right.

## Approach 1: Two thresholds
```java
// first = smallest value seen, second = smallest value that has something smaller before it
public boolean increasingTriplet(int[] nums) {
    int first = Integer.MAX_VALUE, second = Integer.MAX_VALUE;
    for (int x : nums) {
        if (x <= first) first = x;
        else if (x <= second) second = x;
        else return true;
    }
    return false;
}
```

## Approach 2: Left min, right max
```java
// Prefix minimum and suffix maximum around every middle element
public boolean increasingTripletArrays(int[] nums) {
    int n = nums.length;
    if (n < 3) return false;
    int[] leftMin = new int[n], rightMax = new int[n];
    leftMin[0] = nums[0];
    for (int i = 1; i < n; i++) leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
    rightMax[n - 1] = nums[n - 1];
    for (int i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], nums[i]);
    for (int j = 1; j < n - 1; j++) if (leftMin[j - 1] < nums[j] && nums[j] < rightMax[j + 1]) return true;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Two thresholds | O(n) | O(1) |
| Left min, right max | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is it a problem that first may sit after second?</summary>

No: second still had a smaller value before it at the time it was set.

</details>


<details><summary>Generalisation?</summary>

LIS with binary search on tails.

</details>


## Connected
- Longest Increasing Subsequence
- [Count Good Triplets in an Array](../../Segment%20Tree/Count%20Good%20Triplets%20in%20an%20Array.md)
