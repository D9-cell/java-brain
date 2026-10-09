---
topic: Stock and Kadane States
pattern: [Kadane with max and min, Sign flip]
source: LeetCode 152
difficulty: Medium
companies: [Amazon, Microsoft, LinkedIn]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Product Subarray

> [!TIP]
> **🧠 Memory hook**
> A negative number turns the **worst product into the best**: keep both.
> **Mantra: x < 0 → SWAP hi, lo; hi = max(x, hi·x); lo = min(x, lo·x)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=5) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Return the largest product of a non-empty contiguous subarray.

## Key insight
Kadane for sums keeps one value; for products a very negative value may become the best after one more negative. Track the largest and smallest product ending here; a zero restarts both. Alternative: the best product is a prefix or a suffix of a zero-free block, so two scans suffice.

## Approach 1: Max and min Kadane
```java
// Track both the largest and the smallest product ending here; a negative swaps them
public int maxProduct(int[] nums) {
    int hi = nums[0], lo = nums[0], best = nums[0];
    for (int i = 1; i < nums.length; i++) {
        int x = nums[i];
        if (x < 0) { int t = hi; hi = lo; lo = t; }
        hi = Math.max(x, hi * x);
        lo = Math.min(x, lo * x);
        best = Math.max(best, hi);
    }
    return best;
}
```

## Approach 2: Prefix and suffix scans
```java
// Prefix and suffix products, restarting after zeros
public int maxProductTwoScans(int[] nums) {
    int n = nums.length, best = Integer.MIN_VALUE, pre = 1, suf = 1;
    for (int i = 0; i < n; i++) {
        pre = (pre == 0 ? 1 : pre) * nums[i];
        suf = (suf == 0 ? 1 : suf) * nums[n - 1 - i];
        best = Math.max(best, Math.max(pre, suf));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Max and min Kadane | O(n) | O(1) |
| Prefix and suffix scans | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why swap on a negative?</summary>

Multiplying by a negative turns the max into the min and vice versa.

</details>


<details><summary>Why do scans from both ends work?</summary>

With an odd number of negatives, the best drops either the first or the last negative.

</details>


## Connected
- Maximum Subarray
- [Longest Turbulent Subarray](Longest%20Turbulent%20Subarray.md)
