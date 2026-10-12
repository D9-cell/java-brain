---
topic: Prefix Sums Basics
pattern: [Prefix and suffix products]
source: LeetCode 238
difficulty: Medium
companies: [Amazon, Meta, Microsoft, Apple]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Product of Array Except Self

> [!TIP]
> **🧠 Memory hook**
> **Prefix products** into the answer from the left, then multiply in **suffix products** from the right. No division.
> **Mantra: ans[i] = product before i · ans[i] *= product after i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=7) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
Return an array where answer[i] is the product of all elements except nums[i], in O(n) without division.

## Key insight
Storing prefix products in the output and carrying the suffix product in one variable gives O(1) extra space. Division would fail with zeros.

## Approach: Two sweeps
```java
// Prefix products left to right into the answer, then multiply by suffix products right to left
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] ans = new int[n];
    ans[0] = 1;
    for (int i = 1; i < n; i++) ans[i] = ans[i - 1] * nums[i - 1];
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        ans[i] *= suffix;
        suffix *= nums[i];
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Two sweeps | O(n) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why no division?</summary>

Zeros break it, and the problem forbids it.

</details>


<details><summary>Where is the suffix stored?</summary>

In one running variable.

</details>


## Connected
- [Product of the Last K Numbers](Product%20of%20the%20Last%20K%20Numbers.md)
