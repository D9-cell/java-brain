---
topic: Digits and Powers
pattern: [Binary exponentiation, Modulo]
source: GfG Power of Numbers
difficulty: Easy
companies: [Amazon, Walmart]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Power of Numbers

> [!TIP]
> **🧠 Memory hook**
> Reverse the digits for the exponent, then **fast power mod 1e9+7**.
> **Mantra: rev = reverse(n) · power(n, rev) % MOD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=8) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given n, compute n raised to the power of its reverse (digits read backwards), modulo 10⁹ + 7.

## Key insight
The exponent can be huge, so multiply by squaring and reduce mod after every multiplication. Each product of two values below MOD fits in a long.

## Approach: Reverse + modular fast power
```java
// Returns n raised to the power of its own reverse, mod 1e9+7
public long nthPowerOfReverse(long n) {
    long rev = 0;
    for (long x = n; x > 0; x /= 10) rev = rev * 10 + x % 10;
    return power(n % MOD, rev);
}

// Binary exponentiation under the modulus
long power(long base, long exp) {
    long result = 1;
    while (exp > 0) {
        if ((exp & 1) == 1) result = result * base % MOD;
        base = base * base % MOD;
        exp >>= 1;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse + modular fast power | O(log rev) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why reduce after each multiply?</summary>

Two numbers below 1e9+7 multiply to under 1.0e18, which fits in a long; three would not.

</details>


<details><summary>Can the exponent be reduced mod (MOD − 1)?</summary>

Yes by Fermat when n is not a multiple of MOD, but it is not needed here.

</details>


## Connected
- [Pow(x, n)](Pow%28x%2C%20n%29.md)
- [Reverse Integer](Reverse%20Integer.md)
