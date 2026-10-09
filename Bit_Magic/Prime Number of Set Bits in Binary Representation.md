---
topic: Bit Magic
pattern: [Lookup mask]
source: LeetCode 762
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Prime Number of Set Bits in Binary Representation

> [!TIP]
> **🧠 Memory hook**
> A mask of primes as a lookup table.
> **Mantra: primes >> bitCount(x) & 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=20) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Count numbers in [left, right] whose popcount is prime.

## Key insight
Popcounts are at most 20, so a single int with bits 2, 3, 5, 7, 11, 13, 17, 19 answers "prime?".

## Approach: Popcount + mask
```java
// Set-bit counts are at most 20, so the prime test is a fixed set
public int countPrimeSetBits(int left, int right) {
    int primes = (1 << 2) | (1 << 3) | (1 << 5) | (1 << 7) | (1 << 11) | (1 << 13) | (1 << 17) | (1 << 19);
    int cnt = 0;
    for (int x = left; x <= right; x++) if ((primes >> Integer.bitCount(x) & 1) == 1) cnt++;
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| Popcount + mask | O(right − left) | O(1) |

## Recall before you reveal
<details><summary>Mask value?</summary>

665772.

</details>

