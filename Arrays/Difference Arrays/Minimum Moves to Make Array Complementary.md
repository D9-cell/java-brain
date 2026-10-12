---
topic: Difference Arrays
pattern: [Answer-axis ranges]
source: LeetCode 1674
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Moves to Make Array Complementary

> [!TIP]
> **🧠 Memory hook**
> For each pair (a ≤ b) and target sum T: **0 moves** if T = a + b, **1 move** if T in [a + 1, b + limit], else **2**. Add these as ranges over T.
> **Mantra: diff[2] += 2 · [a+1, b+limit] −1 · [a+b] another −1 · min over T**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=6) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
In one move replace any element with a value in [1, limit]. Return the minimum moves so every pair nums[i] + nums[n − 1 − i] has the same sum.

## Key insight
Instead of trying each T against each pair, each pair paints its costs onto the T axis with five marks. The minimum of the prefix sum is the answer.

## Approach: Difference over target sums
```java
// Per pair the cost is 2, 1 inside [min + 1, max + limit], 0 at a + b; add these as ranges over target sums
public int minMoves(int[] nums, int limit) {
    int n = nums.length;
    int[] diff = new int[2 * limit + 2];
    for (int i = 0; i < n / 2; i++) {
        int a = Math.min(nums[i], nums[n - 1 - i]), b = Math.max(nums[i], nums[n - 1 - i]);
        diff[2] += 2;
        diff[a + 1] -= 1;
        diff[a + b] -= 1;
        diff[a + b + 1] += 1;
        diff[b + limit + 1] += 1;
    }
    int best = Integer.MAX_VALUE;
    for (int t = 2, run = 0; t <= 2 * limit; t++) {
        run += diff[t];
        best = Math.min(best, run);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Difference over target sums | O(n + limit) | O(limit) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why [a + 1, b + limit] for one move?</summary>

Changing b reaches a + 1..a + limit, changing a reaches 1 + b..limit + b.

</details>


<details><summary>Why start at 2?</summary>

Every pair costs at most 2.

</details>


## Connected
- [Range Addition](Range%20Addition.md)
