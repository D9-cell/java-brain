---
topic: Scans and Counting
pattern: [Carry best prefix, Best difference]
source: LeetCode 2873
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Value of an Ordered Triplet I

> [!TIP]
> **🧠 Memory hook**
> For each `k` you want the best **(nums[i] − nums[j])** before it, so carry that along.
> **Mantra: maxPrefix → maxDiff → value**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=16) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Return the maximum of `(nums[i] - nums[j]) * nums[k]` over i < j < k, or 0 if negative.

## Key insight
Scan once: before using `x` as `nums[k]` multiply it with the best difference so far; then update the best difference with `maxPrefix - x`, and finally the prefix maximum.

## Approach: Single pass
```java
// Scan k from the left keeping the best prefix maximum and the best (max - nums[j]) difference seen so far
public long maximumTripletValue(int[] nums) {
    long best = 0, maxDiff = 0, maxPrefix = 0;
    for (int x : nums) {
        best = Math.max(best, maxDiff * x);
        maxDiff = Math.max(maxDiff, maxPrefix - x);
        maxPrefix = Math.max(maxPrefix, x);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Single pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why update in this order?</summary>

Each value must be used as k before it becomes available as j or i.

</details>


## Connected
- [Maximum Distance in Arrays](Maximum%20Distance%20in%20Arrays.md)
