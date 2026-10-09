---
topic: Sliding Window
pattern: [At most: add j − i + 1]
source: LeetCode 713
difficulty: Medium
companies: [Yatra]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Subarray Product Less Than K

> [!TIP]
> **🧠 Memory hook**
> A balloon again, but multiplying.
> **Mantra: DIVIDE OUT WHILE prod ≥ k; ADD right − left + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=52) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count contiguous subarrays with product < k (positive numbers).

## Key insight
Products only grow when the window grows. Shrink until prod < k; then all subarrays ending at right count.

## Approach: Window
```java
// Positive numbers: divide out from the left while product >= k, then j - i + 1 subarrays end at j
public int numSubarrayProductLessThanK(int[] nums, int k) {
    if (k <= 1) return 0;
    int count = 0;
    long prod = 1;
    for (int left = 0, right = 0; right < nums.length; right++) {
        prod *= nums[right];
        while (prod >= k) prod /= nums[left++];
        count += right - left + 1;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>k ≤ 1?</summary>

Return 0: every product is ≥ 1.

</details>


## Connected
- [Count Subarrays With Score Less Than K](Count%20Subarrays%20With%20Score%20Less%20Than%20K.md)
