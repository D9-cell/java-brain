---
topic: Sliding Window
pattern: [Longest window, Bitmask]
source: LeetCode 2401
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Longest Nice Subarray

> [!TIP]
> **🧠 Memory hook**
> Each number is a set of lit lamps; nice means no lamp is lit twice.
> **Mantra: mask & x ≠ 0 ⇒ mask ^= nums[i++]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=31) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest subarray where every pair has bitwise AND 0.

## Key insight
Pairwise-disjoint bits ⇔ the new number shares no bit with the OR of the window. Bits never overlap, so XOR removes a number exactly.

## Approach 1: Quadratic
```java
// From each start, extend while no bit is shared with the OR so far
public int longestNiceSubarrayQuadratic(int[] nums) {
    int result = 0;
    for (int i = 0; i < nums.length; i++) {
        int mask = 0;
        for (int j = i; j < nums.length && (mask & nums[j]) == 0; j++) {
            result = Math.max(result, j - i + 1);
            mask |= nums[j];
        }
    }
    return result;
}
```

## Approach 2: Window with a mask
```java
// Bits in a nice window never overlap, so XOR removes nums[i] from the mask exactly
public int longestNiceSubarray(int[] nums) {
    int result = 1, mask = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        while ((mask & nums[j]) != 0) mask ^= nums[i++];
        result = Math.max(result, j - i + 1);
        mask |= nums[j];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Quadratic | O(n²) | O(1) |
| Window with a mask | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a pairwise check.

## Recall before you reveal
<details><summary>Max length?</summary>

≤ 30: each number uses at least one of 30 bits.

</details>


## Connected
- [Find Subarray With Bitwise AND Closest to K](Find%20Subarray%20With%20Bitwise%20AND%20Closest%20to%20K.md)
