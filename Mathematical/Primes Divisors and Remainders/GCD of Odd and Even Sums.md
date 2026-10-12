---
topic: Primes Divisors and Remainders
pattern: [Closed form, gcd]
source: LeetCode 3658
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# GCD of Odd and Even Sums

> [!TIP]
> **🧠 Memory hook**
> First n odd numbers sum to **n²**, first n even to **n(n + 1)**. gcd(n², n(n+1)) = n·gcd(n, n+1) = **n**.
> **Mantra: RETURN n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=6) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Let sumOdd be the sum of the first n odd numbers and sumEven the sum of the first n even numbers. Return gcd(sumOdd, sumEven).

## Key insight
Factor out n from both sums. Consecutive integers n and n + 1 are coprime, so the gcd is exactly n.

## Approach 1: Formula
```java
// Sum of the first n odd numbers is n², of the first n even numbers n(n + 1); their gcd is n
public int gcdOfOddEvenSums(int n) {
    return n;
}
```

## Approach 2: Direct sums + Euclid
```java
// Direct version: build both sums and run Euclid
public int gcdOfOddEvenSumsEuclid(int n) {
    int odd = 0, even = 0;
    for (int i = 1; i <= n; i++) {
        odd += 2 * i - 1;
        even += 2 * i;
    }
    return gcd(odd, even);
}

// Euclid's algorithm
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(1) | O(1) |
| Direct sums + Euclid | O(n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why are n and n + 1 coprime?</summary>

Any common divisor divides their difference, 1.

</details>


<details><summary>Euclid step?</summary>

gcd(a, b) = gcd(b, a mod b).

</details>


## Connected
- [Divisible and Non-divisible Sums Difference](Divisible%20and%20Non-divisible%20Sums%20Difference.md)
