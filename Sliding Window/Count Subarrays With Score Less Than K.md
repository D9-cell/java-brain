---
topic: Sliding Window
pattern: [At most: add j − i + 1]
source: LeetCode 2302
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Subarrays With Score Less Than K

> [!TIP]
> **🧠 Memory hook**
> Score = sum × length: a balloon that only inflates as you grow.
> **Mantra: SHRINK WHILE sum·len ≥ k; ADD j − i + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=10) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays with (sum × length) < k (positive numbers).

## Key insight
Score grows when the window grows, so "score < k" is monotone: shrink until it holds, then all j − i + 1 windows ending at j count.

## Approach: Window
```java
// Score grows with the window, so shrink until sum * length < k and count all windows ending at j
public long countSubarrays(int[] nums, long k) {
    long result = 0, sum = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        sum += nums[j];
        while (i <= j && sum * (j - i + 1) >= k) sum -= nums[i++];
        result += j - i + 1;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Overflow?</summary>

sum × length needs long.

</details>


## Connected
- [Subarray Product Less Than K](Subarray%20Product%20Less%20Than%20K.md)
