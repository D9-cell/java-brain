---
topic: Counting and Modular Combinatorics
pattern: [Product rule, Fast power]
source: LeetCode 1922
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Good Numbers

> [!TIP]
> **🧠 Memory hook**
> Even indexes take **5 even digits**, odd indexes **4 primes**: answer **5^⌈n/2⌉ · 4^⌊n/2⌋** with fast power.
> **Mantra: power(5, (n+1)/2) · power(4, n/2) % MOD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=0) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
A digit string is good if digits at even indexes are even and digits at odd indexes are prime (2, 3, 5, 7). Return the number of good strings of length n (up to 10¹⁵) mod 1e9+7.

## Key insight
Each position is independent, so multiply the choices. There are ⌈n/2⌉ even indexes and ⌊n/2⌋ odd ones. n is huge, so the powers need binary exponentiation.

## Approach: Product + fast power
```java
// Even positions take 5 digits, odd positions 4 primes: 5^ceil(n/2) · 4^floor(n/2)
public int countGoodNumbers(long n) {
    return (int) (power(5, (n + 1) / 2) * power(4, n / 2) % MOD);
}

// Binary exponentiation under the modulus
long power(long b, long e) {
    long r = 1;
    b %= MOD;
    while (e > 0) {
        if ((e & 1) == 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Product + fast power | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>How many even indexes in length n?</summary>

(n + 1) / 2.

</details>


<details><summary>Why reduce the base first?</summary>

It keeps every product below 2⁶³.

</details>


## Connected
- [Pow(x, n)](../Digits%20and%20Powers/Pow%28x%2C%20n%29.md)
- [Count the Number of Arrays with K Matching Adjacent Elements](Count%20the%20Number%20of%20Arrays%20with%20K%20Matching%20Adjacent%20Elements.md)
