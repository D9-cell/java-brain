---
topic: Bit Magic
pattern: [Lowest set bit, XOR cancels]
source: LeetCode 260
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Single Number III

> [!TIP]
> **🧠 Memory hook**
> XOR gives a ^ b; any set bit separates them.
> **Mantra: xor & −xor SPLITS INTO TWO GROUPS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=47) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Two elements appear once and the rest twice; find the two.

## Key insight
XOR of everything is a ^ b ≠ 0. Its lowest set bit differs between a and b, so XOR the two groups separately.

## Approach: XOR split
```java
// XOR all → a ^ b; its lowest set bit splits the numbers into two groups, each holding one single
public int[] singleNumber(int[] nums) {
    int xor = 0;
    for (int x : nums) xor ^= x;
    int low = xor & -xor, a = 0, b = 0;
    for (int x : nums) if ((x & low) != 0) a ^= x; else b ^= x;
    return new int[]{a, b};
}
```

| Approach | Time | Space |
|---|---|---|
| XOR split | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified on random arrays with negatives.

## Recall before you reveal
<details><summary>Isolate the lowest bit?</summary>

x & −x.

</details>


## Connected
- [The Two Sneaky Numbers of Digitville](The%20Two%20Sneaky%20Numbers%20of%20Digitville.md)
- [Single Number II](Single%20Number%20II.md)
