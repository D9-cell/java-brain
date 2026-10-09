---
topic: Sliding Window
pattern: [Shortest window]
source: LeetCode 209
difficulty: Medium
companies: [Google, Accolite, Amazon, Facebook, Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Minimum Size Subarray Sum

> [!TIP]
> **🧠 Memory hook**
> Grow until it is enough, then trim while still enough.
> **Mantra: WHILE sum ≥ target: RECORD, SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=40) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Shortest subarray with sum ≥ target (positive numbers), 0 if none.

## Key insight
Positive numbers make sum monotone in both directions: shrink while valid and record.

## Approach: Window
```java
// Positive numbers: grow until sum >= target, then shrink as far as possible while recording the length
public int minSubArrayLen(int target, int[] nums) {
    int n = nums.length, sum = 0, minL = n + 1;
    for (int i = 0, j = 0; j < n; j++) {
        sum += nums[j];
        while (sum >= target) {
            minL = Math.min(minL, j - i + 1);
            sum -= nums[i++];
        }
    }
    return minL == n + 1 ? 0 : minL;
}
```

| Approach | Time | Space |
|---|---|---|
| Window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Negatives?</summary>

Use the monotonic deque version (LeetCode 862).

</details>


## Connected
- [Shortest Subarray with Sum at Least K](Shortest%20Subarray%20with%20Sum%20at%20Least%20K.md)
