---
topic: Sliding Window
pattern: [Counting]
source: LeetCode 795
difficulty: Medium
companies: [Adobe]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Number of Subarrays with Bounded Maximum

> [!TIP]
> **🧠 Memory hook**
> Small numbers ride along with the last in-range element.
> **Mantra: IN RANGE: prev = j − i + 1; SMALL: + prev; BIG: RESET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=44) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays whose maximum lies in [left, right].

## Key insight
Elements > right split the array. An in-range element makes every start in [i..j] valid; a small one has the same valid starts as the previous position.

## Approach: Single pass
```java
// In range: prevCount = j - i + 1; too small: reuse prevCount; too big: restart after j
public int numSubarrayBoundedMax(int[] nums, int left, int right) {
    int count = 0, prev = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        if (nums[j] >= left && nums[j] <= right) {
            prev = j - i + 1;
            count += prev;
        } else if (nums[j] < left) {
            count += prev;
        } else {
            i = j + 1;
            prev = 0;
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Single pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Other way?</summary>

count(max ≤ right) − count(max ≤ left − 1).

</details>

