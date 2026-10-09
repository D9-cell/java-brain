---
topic: Bit Magic
pattern: [XOR trick]
source: LeetCode 693
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Binary Number with Alternating Bits

> [!TIP]
> **🧠 Memory hook**
> Shift by one and XOR: alternating becomes all ones.
> **Mantra: x = n ^ (n >> 1), x & (x+1) == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=13) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Do neighbouring bits of n always differ?

## Key insight
If bits alternate, n ^ (n >> 1) is a block of ones; a block of ones plus 1 is a power of two.

## Approach 1: Compare neighbours
```java
// Approach 1: compare each bit with the previous one while shifting
public boolean hasAlternatingBitsLoop(int n) {
    int prev = n & 1;
    for (n >>= 1; n > 0; n >>= 1) {
        if ((n & 1) == prev) return false;
        prev = n & 1;
    }
    return true;
}
```

## Approach 2: XOR + all-ones test
```java
// Approach 3: n ^ (n >> 1) is all ones exactly when bits alternate; all ones ⇔ x & (x + 1) == 0
public boolean hasAlternatingBits(int n) {
    long x = n ^ (n >> 1);
    return (x & (x + 1)) == 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Compare neighbours | O(log n) | O(1) |
| XOR + all-ones test | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified for n < 100000.

## Recall before you reveal
<details><summary>All-ones test?</summary>

x & (x + 1) == 0.

</details>

