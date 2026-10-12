---
topic: Interval DP
pattern: [Prefix of operations, Two ends]
source: LeetCode 1770
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Score from Performing Multiplication Operations

> [!TIP]
> **🧠 Memory hook**
> After i operations you took **left from the front** and the rest from the back: the state is just (i, left).
> **Mantra: dp[i][left] = max(nums[left]·m[i] + dp[i+1][left+1], nums[right]·m[i] + dp[i+1][left])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=10) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
On each of m operations take the leftmost or rightmost number x of nums, gain x · multipliers[i] and remove x. Return the maximum score.

## Key insight
The right index is determined by i and left: right = n − 1 − (i − left). So there are only m² states, not n². Fill backwards with one array.

## Approach: 2-D DP rolled into 1-D
```java
// dp[left] = best score after i operations having taken left numbers from the front (the rest came from the back)
public int maximumScore(int[] nums, int[] multipliers) {
    int n = nums.length, m = multipliers.length;
    int[] dp = new int[m + 1];
    for (int i = m - 1; i >= 0; i--)
        for (int left = 0; left <= i; left++) {
            int right = n - 1 - (i - left);
            dp[left] = Math.max(nums[left] * multipliers[i] + dp[left + 1], nums[right] * multipliers[i] + dp[left]);
        }
    return dp[0];
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D DP rolled into 1-D | O(m²) | O(m) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why m² states?</summary>

The pair (i, left) fixes both ends of the remaining array.

</details>


<details><summary>Why iterate i downwards?</summary>

The recurrence reads the next operation.

</details>


## Connected
- [Burst Balloons](Burst%20Balloons.md)
- [Stone Game](../Game%20DP/Stone%20Game.md)
