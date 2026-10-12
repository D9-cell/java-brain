---
topic: Primes Divisors and Remainders
pattern: [Trial division]
source: GfG Prime Factors
difficulty: Easy
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Prime Factors

> [!TIP]
> **🧠 Memory hook**
> Try divisors only up to **√n**, dividing each out fully. If something **> 1 is left**, it is one last prime.
> **Mantra: FOR p·p ≤ n: IF p | n: add p, divide out · n > 1 → add n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=0) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Given n, return its distinct prime factors in increasing order.

## Key insight
When p is reached all smaller primes are already divided out, so any p that divides n is prime. A composite leftover would need a factor ≤ √(leftover), which would have been found, so a leftover above 1 is prime.

## Approach: Trial division
```java
// Trial division up to √n; whatever is left above 1 is one last prime
public List<Integer> primeFactors(int n) {
    List<Integer> out = new ArrayList<>();
    for (int p = 2; (long) p * p <= n; p++) {
        if (n % p != 0) continue;
        out.add(p);
        while (n % p == 0) n /= p;
    }
    if (n > 1) out.add(n);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Trial division | O(√n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop at √n?</summary>

A number with no factor up to its square root is prime.

</details>


<details><summary>Why long in p * p?</summary>

p * p can overflow an int when n is near 2³¹.

</details>


## Connected
- [Four Divisors](Four%20Divisors.md)
- [Ugly Number](../Digits%20and%20Powers/Ugly%20Number.md)
- [Techfest and the Queue](Techfest%20and%20the%20Queue.md)
