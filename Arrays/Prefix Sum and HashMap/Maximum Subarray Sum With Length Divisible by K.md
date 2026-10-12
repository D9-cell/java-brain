---
topic: Prefix Sum and HashMap
pattern: [Index classes, Minimum prefix]
source: LeetCode 3381
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Subarray Sum With Length Divisible by K

> [!TIP]
> **🧠 Memory hook**
> A length divisible by k means both prefix **indexes are equal mod k**. Keep the **minimum prefix** per class and subtract.
> **Mantra: cls = (i + 1) % k · best = max(pre − minPre[cls]) · minPre[cls] = min(…)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=9) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the maximum sum of a subarray whose length is divisible by k.

## Key insight
Like Kadane via prefixes, but the subtraction is limited to prefixes in the same index class. minPre[0] = 0 is the empty prefix.

## Approach: Min prefix per class
```java
// Length divisible by k means both prefix indexes share the same value mod k; keep the minimum prefix per class
public long maxSubarraySum(int[] nums, int k) {
    long[] minPrefix = new long[k];
    java.util.Arrays.fill(minPrefix, Long.MAX_VALUE / 2);
    minPrefix[0] = 0;
    long prefix = 0, best = Long.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        prefix += nums[i];
        int cls = (i + 1) % k;
        best = Math.max(best, prefix - minPrefix[cls]);
        minPrefix[cls] = Math.min(minPrefix[cls], prefix);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Min prefix per class | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why index classes, not value remainders?</summary>

The condition is on the length, i.e. index difference.

</details>


<details><summary>Why initialise to a large value?</summary>

Classes without a prefix yet must not be used.

</details>


## Connected
- [Maximum Absolute Sum of Any Subarray](Maximum%20Absolute%20Sum%20of%20Any%20Subarray.md)
- [Maximum Product Subarray](../../DP/Stock%20and%20Kadane%20States/Maximum%20Product%20Subarray.md)
