---
topic: Bit Magic
pattern: [XOR property]
source: LeetCode 2997
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Minimum Number of Operations to Make Array XOR Equal to K

> [!TIP]
> **🧠 Memory hook**
> Every wrong bit costs exactly one flip.
> **Mantra: bitCount(XOR ^ k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=35) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Minimum single-bit flips (in any elements) to make the XOR of the array equal k.

## Key insight
Flipping any bit of any element flips that bit of the total XOR.

## Approach: Popcount of the difference
```java
// Flipping any bit of any element flips that bit of the total XOR: answer = popcount(XOR ^ k)
public int minOperations(int[] nums, int k) {
    int xor = 0;
    for (int x : nums) xor ^= x;
    return Integer.bitCount(xor ^ k);
}
```

| Approach | Time | Space |
|---|---|---|
| Popcount of the difference | O(n) | O(1) |

## Recall before you reveal
<details><summary>Which element?</summary>

Any.

</details>

