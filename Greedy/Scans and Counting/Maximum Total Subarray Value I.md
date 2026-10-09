---
topic: Scans and Counting
pattern: [Whole array is best]
source: LeetCode 3689
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Total Subarray Value I

> [!TIP]
> **🧠 Memory hook**
> The value `max − min` can only **grow** with the subarray, so take the whole array k times.
> **Mantra: (MAX − MIN) × k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=15) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Choose k subarrays (the same one may be chosen again); the value of a subarray is `max - min`. Return the maximum total value.

## Key insight
Extending a subarray never decreases `max - min`, so the whole array is optimal and may be reused k times.

## Approach: Max and min
```java
// The best subarray is the whole array (max - min can only grow), and it may be chosen k times
public long maxTotalValue(int[] nums, int k) {
    int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;
    for (int x : nums) { max = Math.max(max, x); min = Math.min(min, x); }
    return (long) (max - min) * k;
}
```

| Approach | Time | Space |
|---|---|---|
| Max and min | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `long`?</summary>

`(max - min) * k` can reach 10⁹ · 10⁵.

</details>


## Connected
- [Maximum Distance in Arrays](Maximum%20Distance%20in%20Arrays.md)
