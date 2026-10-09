---
topic: Scans and Counting
pattern: [Reachable range, Doubling]
source: LeetCode 330
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Patching Array

> [!TIP]
> **🧠 Memory hook**
> Keep the **smallest sum you cannot form**; the next number either extends the range or you patch with that very number.
> **Mantra: miss = smallest unreachable sum; PATCH miss → DOUBLE THE RANGE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=13) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Add the fewest numbers to a sorted array so that every value in [1, n] is a subset sum.

## Key insight
If all of 1..miss−1 are formable and `nums[i] <= miss`, adding it extends the range to `miss + nums[i] - 1`. Otherwise patch with `miss` itself, which doubles the range. Repeat until `miss > n`.

## Approach: Range + patches
```java
// miss = smallest sum that cannot be formed yet. If the next number is at most miss it extends the range, otherwise patch miss itself (doubling the range)
public int minPatches(int[] nums, int n) {
    long miss = 1;
    int patches = 0, i = 0;
    while (miss <= n) {
        if (i < nums.length && nums[i] <= miss) miss += nums[i++];
        else { miss += miss; patches++; }
    }
    return patches;
}
```

| Approach | Time | Space |
|---|---|---|
| Range + patches | O(m + log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why patch with exactly `miss`?</summary>

Any larger patch leaves `miss` unreachable; any smaller one extends less.

</details>


<details><summary>Why `long miss`?</summary>

Doubling near 2³¹ overflows `int`.

</details>


## Connected
- [Gas Station](Gas%20Station.md)
