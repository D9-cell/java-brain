---
topic: Bit Magic
pattern: [x & (x−1), Common prefix]
source: LeetCode 201
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Bitwise AND of Numbers Range

> [!TIP]
> **🧠 Memory hook**
> Any lamp that flickers inside the range goes dark; only the common prefix stays lit.
> **Mantra: right &= right − 1 WHILE right > left**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=0) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
AND of all integers in [left, right].

## Key insight
A bit survives only if it never changes across the range, i.e. the common binary prefix of left and right.

## Approach 1: Shift to common prefix
```java
// Approach 1: the answer is the common binary prefix: shift both right until equal, then shift back
public int rangeBitwiseAndShift(int left, int right) {
    int shift = 0;
    while (left != right) { left >>= 1; right >>= 1; shift++; }
    return left << shift;
}
```

## Approach 2: Drop lowest set bits
```java
// Approach 2: right & (right − 1) drops the lowest set bit; repeat while right > left
public int rangeBitwiseAnd(int left, int right) {
    while (right > left) right &= right - 1;
    return right;
}
```

| Approach | Time | Space |
|---|---|---|
| Shift to common prefix | O(log n) | O(1) |
| Drop lowest set bits | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a direct AND on random ranges.

## Recall before you reveal
<details><summary>Why not loop over the range?</summary>

Up to 2^31 numbers.

</details>


## Connected
- [Power of Two](Power%20of%20Two.md)
