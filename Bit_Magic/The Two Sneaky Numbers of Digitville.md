---
topic: Bit Magic
pattern: [XOR cancels, Lowest set bit]
source: LeetCode 3289
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# The Two Sneaky Numbers of Digitville

> [!TIP]
> **🧠 Memory hook**
> Everything cancels except the two extras; a differing bit splits them.
> **Mantra: XOR WITH 0..n−1, SPLIT BY LOWEST BIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=24) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
nums holds 0..n−1 plus two duplicates; find them.

## Key insight
XOR of nums and 0..n−1 is a ^ b; x & −x picks a bit where they differ; XOR each group separately.

## Approach 1: Count array
```java
// Approach 1: a map (or array) of counts; report values seen twice
public int[] getSneakyNumbersMap(int[] nums) {
    int[] cnt = new int[nums.length];
    int[] res = new int[2];
    int k = 0;
    for (int x : nums) if (++cnt[x] == 2) res[k++] = x;
    return res;
}
```

## Approach 2: XOR split
```java
// Approach 2: XOR nums with 0..n−1 leaves a ^ b; split by its lowest set bit like Single Number III
public int[] getSneakyNumbers(int[] nums) {
    int n = nums.length - 2, xor = 0;
    for (int x : nums) xor ^= x;
    for (int i = 0; i < n; i++) xor ^= i;
    int low = xor & -xor, a = 0, b = 0;
    for (int x : nums) if ((x & low) != 0) a ^= x; else b ^= x;
    for (int i = 0; i < n; i++) if ((i & low) != 0) a ^= i; else b ^= i;
    return new int[]{a, b};
}
```

| Approach | Time | Space |
|---|---|---|
| Count array | O(n) | O(n) |
| XOR split | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified on random shuffled inputs.

## Recall before you reveal
<details><summary>Same as?</summary>

Single Number III.

</details>


## Connected
- [Single Number III](Single%20Number%20III.md)
