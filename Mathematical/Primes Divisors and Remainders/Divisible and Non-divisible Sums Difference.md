---
topic: Primes Divisors and Remainders
pattern: [Arithmetic series]
source: LeetCode 2894
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Divisible and Non-divisible Sums Difference

> [!TIP]
> **🧠 Memory hook**
> num1 − num2 = **total − 2 · (sum of multiples of m)**, and multiples of m are m·(1 + 2 + … + ⌊n/m⌋).
> **Mantra: total = n(n+1)/2 · k = n/m · RETURN total − 2·m·k(k+1)/2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=12) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
num1 is the sum of integers in [1, n] not divisible by m, num2 the sum of those divisible by m. Return num1 − num2.

## Key insight
num1 = total − num2, so num1 − num2 = total − 2 · num2. The multiples m, 2m, …, km sum to m · k(k + 1)/2.

## Approach: Formula
```java
// Total sum minus twice the sum of multiples of m
public int differenceOfSums(int n, int m) {
    int total = n * (n + 1) / 2;
    int k = n / m;
    int divisible = m * k * (k + 1) / 2;
    return total - 2 * divisible;
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>How many multiples of m up to n?</summary>

⌊n / m⌋.

</details>


<details><summary>Overflow?</summary>

n ≤ 1000, so ints are fine.

</details>


## Connected
- [GCD of Odd and Even Sums](GCD%20of%20Odd%20and%20Even%20Sums.md)
