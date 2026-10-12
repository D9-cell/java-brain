---
topic: Digits and Powers
pattern: [Divide out, Largest power trick]
source: LeetCode 326
difficulty: Easy
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Power of Three

> [!TIP]
> **🧠 Memory hook**
> 3 is prime, so the divisors of **3¹⁹ = 1162261467** are exactly the powers of 3 that fit in an int.
> **Mantra: n > 0 && 1162261467 % n == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=5) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Return true if n is a power of three.

## Key insight
The loop divides by 3 while possible and checks for 1. The trick avoids the loop: any divisor of a prime power is a smaller power of the same prime.

## Approach 1: Divide by 3
```java
// Divides by 3 while it divides evenly
public boolean isPowerOfThreeLoop(int n) {
    if (n <= 0) return false;
    while (n % 3 == 0) n /= 3;
    return n == 1;
}
```

## Approach 2: Divisor of 3^19
```java
// 3^19 is the largest power of 3 in an int, and 3 is prime, so only powers of 3 divide it
public boolean isPowerOfThree(int n) {
    return n > 0 && 1162261467 % n == 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Divide by 3 | O(log n) | O(1) |
| Divisor of 3^19 | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not the same trick for 6?</summary>

6 is not prime: 2 divides 6¹⁰ but is not a power of 6.

</details>


<details><summary>Why not log10(n)/log10(3)?</summary>

Floating point error makes it fail on some inputs.

</details>


## Connected
- [Power of Four](Power%20of%20Four.md)
- [Power of Two](../../Bit_Magic/Power%20of%20Two.md)
- [Check if Number is a Sum of Powers of Three](Check%20if%20Number%20is%20a%20Sum%20of%20Powers%20of%20Three.md)
