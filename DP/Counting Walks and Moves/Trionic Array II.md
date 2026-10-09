---
topic: Counting Walks and Moves
pattern: [Phase as state, Kadane-style extension]
source: LeetCode 3640
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Trionic Array II

> [!TIP]
> **🧠 Memory hook**
> A subarray shaped like a **lightning bolt**: up, down, up. Track which stroke you are in.
> **Mantra: up1 = max(a[i−1], up1) + x · down = max(up1, down) + x · up2 = max(down, up2) + x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=15) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
A subarray nums[l..r] is trionic if there are l < p < q < r with nums[l..p] strictly increasing, nums[p..q] strictly decreasing and nums[q..r] strictly increasing. Return the maximum sum of a trionic subarray.

## Key insight
For every end index keep the best sum of a subarray that is currently in the first rise (at least two elements), the fall, or the second rise. A rising step extends rise 1 (or starts it fresh with the previous element) and extends rise 2 from the fall or from rise 2. A falling step extends the fall from rise 1 or the fall. Sums go negative, so use a large negative sentinel.

## Approach 1: Three phase states
```java
// up1 / down / up2 = best sum of a subarray ending at i that is currently in that phase
public long maxSumTrionic(int[] nums) {
    long up1 = NEG, down = NEG, up2 = NEG, best = NEG;
    for (int i = 1; i < nums.length; i++) {
        long a = nums[i - 1], x = nums[i];
        long nUp1 = NEG, nDown = NEG, nUp2 = NEG;
        if (a < x) {
            nUp1 = Math.max(a, up1) + x;
            nUp2 = Math.max(down, up2) + x;
        } else if (a > x) {
            nDown = Math.max(up1, down) + x;
        }
        up1 = nUp1; down = nDown; up2 = nUp2;
        best = Math.max(best, up2);
    }
    return best;
}
```

## Approach 2: Top-down over (index, phase)
```java
// Top-down over (index, phase): 0 one element taken, 1 rising, 2 falling, 3 rising again
public long maxSumTrionicMemo(int[] nums) {
    Long[][] memo = new Long[nums.length][4];
    long best = NEG;
    for (int i = 0; i + 1 < nums.length; i++) best = Math.max(best, nums[i] + extend(nums, i, 0, memo));
    return best;
}

// Best sum still to add after taking nums[i] in the given phase
private long extend(int[] a, int i, int phase, Long[][] memo) {
    if (memo[i][phase] != null) return memo[i][phase];
    long res = phase == 3 ? 0 : NEG;
    if (i + 1 < a.length) {
        long x = a[i + 1];
        if (a[i] < x && phase <= 1) res = Math.max(res, x + extend(a, i + 1, 1, memo));
        if (a[i] > x && (phase == 1 || phase == 2)) res = Math.max(res, x + extend(a, i + 1, 2, memo));
        if (a[i] < x && phase >= 2) res = Math.max(res, x + extend(a, i + 1, 3, memo));
    }
    return memo[i][phase] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Three phase states | O(n) | O(1) |
| Top-down over (index, phase) | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can rise 1 restart at a[i − 1]?</summary>

A shorter start may be better when earlier values are negative, like Kadane.

</details>


<details><summary>What breaks every phase?</summary>

Equal neighbours: no state survives a flat step.

</details>


## Connected
- Maximum Subarray
- [Longest Turbulent Subarray](../Stock%20and%20Kadane%20States/Longest%20Turbulent%20Subarray.md)
