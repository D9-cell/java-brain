---
topic: Prefix Sum and HashMap
pattern: [Prefix extremes]
source: LeetCode 1749
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Absolute Sum of Any Subarray

> [!TIP]
> **🧠 Memory hook**
> Every subarray sum is pre[j] − pre[i]. The largest absolute value is **max prefix − min prefix** (including the empty prefix 0).
> **Mantra: max = max(pre), min = min(pre) · RETURN max − min**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=10) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the maximum absolute value of the sum of any (possibly empty) subarray.

## Key insight
The order of the two prefixes does not matter for the absolute value, so the extreme pair is the answer. Kadane for max and min also works.

## Approach: Prefix extremes
```java
// Every subarray is a difference of two prefixes, so the answer is max prefix - min prefix
public int maxAbsoluteSum(int[] nums) {
    int prefix = 0, max = 0, min = 0;
    for (int x : nums) {
        prefix += x;
        max = Math.max(max, prefix);
        min = Math.min(min, prefix);
    }
    return max - min;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix extremes | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does order not matter?</summary>

|pre[j] − pre[i]| is symmetric.

</details>


<details><summary>Kadane version?</summary>

Run max-subarray and min-subarray, take the bigger absolute value.

</details>


## Connected
- [Maximum Subarray Sum With Length Divisible by K](Maximum%20Subarray%20Sum%20With%20Length%20Divisible%20by%20K.md)
