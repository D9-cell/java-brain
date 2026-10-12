---
topic: Digits and Powers
pattern: [Sum identity, XOR cancel]
source: LeetCode 268
difficulty: Easy
companies: [Amazon, Microsoft, Apple]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Missing Number

> [!TIP]
> **🧠 Memory hook**
> Expected **0 + 1 + … + n** minus the actual sum is the missing one. XOR of all indexes and values works too.
> **Mantra: n(n+1)/2 − sum · OR x = n ^ i ^ nums[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=19) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
nums holds n distinct numbers from 0..n. Return the one that is missing.

## Key insight
The sum formula needs only one pass. The XOR version pairs each value with its equal index, which cancels, and never overflows.

## Approach 1: Sum formula
```java
// Expected sum 0..n minus the actual sum
public int missingNumber(int[] nums) {
    int n = nums.length, sum = n * (n + 1) / 2;
    for (int x : nums) sum -= x;
    return sum;
}
```

## Approach 2: XOR
```java
// XOR every index and value; pairs cancel and the missing number stays
public int missingNumberXor(int[] nums) {
    int x = nums.length;
    for (int i = 0; i < nums.length; i++) x ^= i ^ nums[i];
    return x;
}
```

| Approach | Time | Space |
|---|---|---|
| Sum formula | O(n) | O(1) |
| XOR | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why start the XOR at n?</summary>

Indexes are 0..n−1; n is the extra value to include.

</details>


<details><summary>Overflow?</summary>

n ≤ 10⁴ so the int sum is safe; XOR is always safe.

</details>


## Connected
- [Find Missing and Repeated Values](Find%20Missing%20and%20Repeated%20Values.md)
