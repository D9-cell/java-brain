---
topic: Bit Magic
pattern: [Bit by bit]
source: LeetCode 190
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Reverse Bits

> [!TIP]
> **🧠 Memory hook**
> Pour bits from one pipe into another.
> **Mantra: res = (res << 1) | (n & 1), n >>>= 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=21) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Reverse the 32 bits of an unsigned integer.

## Key insight
Take the lowest bit of n and append it to res, 32 times.

## Approach: Bit by bit
```java
// Take bits from n's right end and push them into res from the right, 32 times
public int reverseBits(int n) {
    int res = 0;
    for (int i = 0; i < 32; i++) {
        res = (res << 1) | (n & 1);
        n >>>= 1;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Bit by bit | O(32) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against Integer.reverse.

## Recall before you reveal
<details><summary>Why >>>?</summary>

Unsigned shift, so negative inputs work.

</details>

