---
topic: Bit Magic
pattern: [One bit at a time]
source: LeetCode 2429
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Minimize XOR

> [!TIP]
> **🧠 Memory hook**
> Cancel num1's high bits; spend the extras on low bits.
> **Mantra: COPY HIGH BITS, FILL LOWEST FREE BITS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=32) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
x with popcount(num2) set bits minimising x ^ num1.

## Key insight
Matching num1's highest bits removes the most value from the XOR; leftover bits go to the lowest free positions.

## Approach 1: Adjust num1
```java
// Approach 1: start from num1; too many bits → clear the lowest set bits; too few → set the lowest unset bits
public int minimizeXorFromNum1(int num1, int num2) {
    int x = num1, have = Integer.bitCount(num1), need = Integer.bitCount(num2);
    for (int b = 0; b < 32 && have > need; b++) if ((x >> b & 1) == 1) { x ^= 1 << b; have--; }
    for (int b = 0; b < 32 && have < need; b++) if ((x >> b & 1) == 0) { x |= 1 << b; have++; }
    return x;
}
```

## Approach 2: Build directly
```java
// Approach 2: build directly: copy num1's highest set bits first, then fill the lowest unset bits
public int minimizeXor(int num1, int num2) {
    int need = Integer.bitCount(num2), x = 0;
    for (int b = 31; b >= 0 && need > 0; b--) if ((num1 >> b & 1) == 1) { x |= 1 << b; need--; }
    for (int b = 0; b < 32 && need > 0; b++) if ((x >> b & 1) == 0) { x |= 1 << b; need--; }
    return x;
}
```

| Approach | Time | Space |
|---|---|---|
| Adjust num1 | O(32) | O(1) |
| Build directly | O(32) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force for all pairs below 200.

## Recall before you reveal
<details><summary>Too many bits in num1?</summary>

Drop its lowest set bits.

</details>

