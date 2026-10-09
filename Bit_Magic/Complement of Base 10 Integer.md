---
topic: Bit Magic
pattern: [Masks]
source: LeetCode 1009
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Complement of Base 10 Integer

> [!TIP]
> **🧠 Memory hook**
> XOR with an all-ones mask as wide as n.
> **Mantra: n ^ ((1 << bits) − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=16) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Flip every bit of n (no leading zeros).

## Key insight
Build a mask of ones of n's bit length and XOR.

## Approach 1: Bit by bit
```java
// Approach 1: flip bit by bit, rebuilding the number
public int bitwiseComplementLoop(int n) {
    if (n == 0) return 1;
    int res = 0;
    for (int i = 0; n > 0; i++, n >>= 1) if ((n & 1) == 0) res |= 1 << i;
    return res;
}
```

## Approach 2: Mask
```java
// Approach 3: mask of all ones as wide as n, then XOR
public int bitwiseComplement(int n) {
    if (n == 0) return 1;
    int bits = 32 - Integer.numberOfLeadingZeros(n);
    int mask = (int) ((1L << bits) - 1);
    return n ^ mask;
}
```

| Approach | Time | Space |
|---|---|---|
| Bit by bit | O(log n) | O(1) |
| Mask | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified for n < 100000.

## Recall before you reveal
<details><summary>n = 0?</summary>

1.

</details>


## Connected
- [Number Complement](Number%20Complement.md)
