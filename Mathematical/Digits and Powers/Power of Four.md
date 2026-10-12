---
topic: Digits and Powers
pattern: [One set bit, Bit mask]
source: LeetCode 342
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Power of Four

> [!TIP]
> **🧠 Memory hook**
> A power of four is a power of two whose **single bit sits at an even position**: mask `0x55555555`.
> **Mantra: n > 0 && (n & (n−1)) == 0 && (n & 0x55555555) != 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=6) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Return true if n is a power of four.

## Key insight
`n & (n − 1)` clears the lowest set bit, so it is zero only for powers of two. The 0x55555555 mask (binary 0101…) keeps bits 0, 2, 4, …, which are exactly the powers of four. Equivalently, 4^k ≡ 1 (mod 3) while 2·4^k ≡ 2.

## Approach 1: Bit mask
```java
// One set bit, placed at an even position
public boolean isPowerOfFour(int n) {
    return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
}
```

## Approach 2: Mod 3
```java
// A power of two is a power of four exactly when it leaves 1 mod 3
public boolean isPowerOfFourMod(int n) {
    return n > 0 && (n & (n - 1)) == 0 && n % 3 == 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Bit mask | O(1) | O(1) |
| Mod 3 | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does 2^odd fail the mask?</summary>

Its bit is at an odd position, which 0x55555555 has cleared.

</details>


<details><summary>Why n % 3 == 1?</summary>

4 ≡ 1 mod 3, so every power of 4 is 1 mod 3; 2·4^k is 2 mod 3.

</details>


## Connected
- [Power of Three](Power%20of%20Three.md)
- [Power of Two](../../Bit_Magic/Power%20of%20Two.md)
