---
topic: Prefix Variants
pattern: [Prefix max vs suffix min]
source: LeetCode 3660
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Jump Game IX

> [!TIP]
> **🧠 Memory hook**
> From i you can jump right to a smaller value or left to a bigger one. If **max(left part) > min(right part)**, positions i and i + 1 connect; otherwise the array splits there.
> **Mantra: maxLeft, minRight · ans[i] = maxLeft[i] > minRight[i+1] ? ans[i+1] : maxLeft[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=7) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
From index i you may jump to j > i with nums[j] < nums[i], or to j < i with nums[j] > nums[i]. For each i return the maximum value reachable.

## Key insight
If the prefix max is at most the suffix min, no jump crosses the boundary, so each side is closed. Otherwise the two sides merge and share their answer. Walking from the right propagates it.

## Approach: Prefix max + suffix min
```java
// If the max on the left exceeds the min on the right, i and i + 1 can reach each other
public int[] maxValue(int[] nums) {
    int n = nums.length;
    int[] maxLeft = new int[n], minRight = new int[n], ans = new int[n];
    maxLeft[0] = nums[0];
    for (int i = 1; i < n; i++) maxLeft[i] = Math.max(maxLeft[i - 1], nums[i]);
    minRight[n - 1] = nums[n - 1];
    for (int i = n - 2; i >= 0; i--) minRight[i] = Math.min(minRight[i + 1], nums[i]);
    ans[n - 1] = maxLeft[n - 1];
    for (int i = n - 2; i >= 0; i--) ans[i] = maxLeft[i] > minRight[i + 1] ? ans[i + 1] : maxLeft[i];
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix max + suffix min | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>When can nothing cross a boundary?</summary>

When everything on the left is ≤ everything on the right.

</details>


<details><summary>Why fill from the right?</summary>

Merged segments share the answer of the segment to their right.

</details>


## Connected
- [Max Chunks To Make Sorted II](Max%20Chunks%20To%20Make%20Sorted%20II.md)
