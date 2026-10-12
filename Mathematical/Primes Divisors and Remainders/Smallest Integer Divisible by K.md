---
topic: Primes Divisors and Remainders
pattern: [Remainder state, Pigeonhole]
source: LeetCode 1015
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Smallest Integer Divisible by K

> [!TIP]
> **🧠 Memory hook**
> Track only **1, 11, 111, … mod k**. There are k remainders, so within **k steps** one is 0 or they cycle.
> **Mantra: k even or ×5 → −1 · rem = (rem·10 + 1) % k · rem == 0 → len**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=5) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Return the length of the smallest positive integer made only of the digit 1 that is divisible by k, or -1 if none exists.

## Key insight
The number itself can be huge, but (r · 10 + 1) mod k only needs the previous remainder. Multiples of 2 or 5 can never divide a number ending in 1. Otherwise the first k remainders contain 0 (pigeonhole plus 10 being invertible mod k).

## Approach: Remainder walk
```java
// Tracks 11...1 mod k; if no zero shows up within k steps a remainder has repeated
public int smallestRepunitDivByK(int k) {
    if (k % 2 == 0 || k % 5 == 0) return -1;
    int rem = 0;
    for (int len = 1; len <= k; len++) {
        rem = (rem * 10 + 1) % k;
        if (rem == 0) return len;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder walk | O(k) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop after k steps?</summary>

Only k remainders exist, so a repeat starts a cycle that never reaches 0.

</details>


<details><summary>Why reject 2 and 5?</summary>

Numbers ending in 1 are odd and not multiples of 5.

</details>


## Connected
- [Fraction to Recurring Decimal](Fraction%20to%20Recurring%20Decimal.md)
