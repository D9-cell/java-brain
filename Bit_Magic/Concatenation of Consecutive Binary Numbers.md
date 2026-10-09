---
topic: Bit Magic
pattern: [Shifts, Modulo]
source: LeetCode 1680
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Concatenation of Consecutive Binary Numbers

> [!TIP]
> **🧠 Memory hook**
> The bit length grows exactly at powers of two.
> **Mantra: res = (res << bits) | i, bits++ WHEN i & (i−1) == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=4) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Value of "1" + "10" + "11" + … + bin(n), mod 1e9+7.

## Key insight
Appending i shifts the result left by bitLength(i); bitLength increases only when i is a power of two.

## Approach 1: log2 bit length
```java
// Approach 1: bit length from log2: result = (result << bits(i)) + i, mod 1e9+7
public int concatenatedBinaryLog(int n) {
    final long MOD = 1_000_000_007;
    long res = 0;
    for (int i = 1; i <= n; i++) {
        int bits = 32 - Integer.numberOfLeadingZeros(i);
        res = ((res << bits) + i) % MOD;
    }
    return (int) res;
}
```

## Approach 2: Power-of-two check
```java
// Approach 2: the bit length grows by one exactly when i is a power of two (i & (i−1)) == 0
public int concatenatedBinary(int n) {
    final long MOD = 1_000_000_007;
    long res = 0;
    int bits = 0;
    for (int i = 1; i <= n; i++) {
        if ((i & (i - 1)) == 0) bits++;
        res = ((res << bits) | i) % MOD;
    }
    return (int) res;
}
```

| Approach | Time | Space |
|---|---|---|
| log2 bit length | O(n) | O(1) |
| Power-of-two check | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger for n ≤ 200.

## Recall before you reveal
<details><summary>Overflow?</summary>

long and mod after every step.

</details>

