---
topic: Primes Divisors and Remainders
pattern: [Popcount bounds, Try k]
source: LeetCode 2749
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Minimum Operations to Make the Integer Zero

> [!TIP]
> **🧠 Memory hook**
> With k operations the rest **x = num1 − k·num2** must be a sum of **exactly k powers of two**: possible iff **popcount(x) ≤ k ≤ x**.
> **Mantra: FOR k = 1..60: x = num1 − k·num2 · bitCount(x) ≤ k ≤ x → k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=13) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
In one operation pick i in [0, 60] and subtract 2^i + num2 from num1. Return the minimum operations to reach 0, or -1.

## Key insight
k operations subtract k·num2 plus k powers of two. A number x is a sum of exactly k powers of two when its popcount is at most k (powers can be split in halves to increase the count) and k ≤ x (each power is at least 1). Trying k up to 60 is enough.

## Approach: Try each k
```java
// After k operations the rest x = num1 - k·num2 must be a sum of exactly k powers of two
public int makeTheIntegerZero(int num1, int num2) {
    for (int k = 1; k <= 60; k++) {
        long x = num1 - (long) k * num2;
        if (x < k) continue;
        if (Long.bitCount(x) <= k) return k;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Try each k | O(60) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why can the count go up from popcount?</summary>

2^i = 2^(i−1) + 2^(i−1), one more term each split, down to all 1s.

</details>


<details><summary>Why long?</summary>

k · num2 can reach 6·10¹⁰.

</details>


## Connected
- [Number of 1 Bits](../../Bit_Magic/Number%20of%201%20Bits.md)
