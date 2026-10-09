---
topic: Sliding Window
pattern: [Fixed window, Circular]
source: LeetCode 2134
difficulty: Medium
companies: [Microsoft, Adobe]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Minimum Swaps to Group All 1's Together II

> [!TIP]
> **🧠 Memory hook**
> The final block of ones can wrap around the circle.
> **Mantra: WINDOW OF total-ones OVER 2n; ANSWER ones − best**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=41) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Minimum swaps to group all 1s in a circular binary array.

## Key insight
The block size is the number of ones. Swaps = zeros inside the chosen block = ones − ones already inside.

## Approach: Circular fixed window
```java
// Circular window of size = total ones over 2n steps (index j % n); swaps = ones - most ones in a window
public int minSwaps(int[] nums) {
    int n = nums.length, ones = Arrays.stream(nums).sum(), cur = 0, best = 0;
    for (int i = 0, j = 0; j < 2 * n; j++) {
        cur += nums[j % n];
        if (j - i + 1 > ones) cur -= nums[i++ % n];
        best = Math.max(best, cur);
    }
    return ones - best;
}
```

| Approach | Time | Space |
|---|---|---|
| Circular fixed window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against every circular block.

## Recall before you reveal
<details><summary>Why 2n?</summary>

Blocks may wrap.

</details>


## Connected
- [Minimum Swaps to Group All 1's Together](Minimum%20Swaps%20to%20Group%20All%201%27s%20Together.md)
