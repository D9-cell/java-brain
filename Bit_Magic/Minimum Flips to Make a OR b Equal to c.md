---
topic: Bit Magic
pattern: [One bit at a time]
source: LeetCode 1318
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Minimum Flips to Make a OR b Equal to c

> [!TIP]
> **🧠 Memory hook**
> c says 1 → need one lit lamp; c says 0 → put out every lamp.
> **Mantra: BIT BY BIT, OR POPCOUNT FORMULA**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=34) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Minimum bit flips in a and b so that a | b == c.

## Key insight
Bits are independent. c=1: one flip if a and b are both 0. c=0: one flip per 1 in a and b.

## Approach 1: Bit loop
```java
// Approach 1: bit by bit: c's bit 1 needs one flip if both are 0; c's bit 0 needs a flip for each 1
public int minFlips(int a, int b, int c) {
    int flips = 0;
    for (int i = 0; i < 31; i++) {
        int x = a >> i & 1, y = b >> i & 1, z = c >> i & 1;
        if (z == 1) flips += (x | y) == 1 ? 0 : 1;
        else flips += x + y;
    }
    return flips;
}
```

## Approach 2: Popcount formula
```java
// Approach 2: popcount: wrong bits of (a|b)^c, plus bits where c is 0 and both a and b are 1
public int minFlipsBuiltin(int a, int b, int c) {
    return Integer.bitCount((a | b) ^ c) + Integer.bitCount(a & b & ~c);
}
```

| Approach | Time | Space |
|---|---|---|
| Bit loop | O(31) | O(1) |
| Popcount formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both agree on 10000 random triples.

## Recall before you reveal
<details><summary>Formula?</summary>

bitCount((a|b)^c) + bitCount(a & b & ~c).

</details>

