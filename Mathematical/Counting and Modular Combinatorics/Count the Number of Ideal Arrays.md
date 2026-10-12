---
topic: Counting and Modular Combinatorics
pattern: [Prime exponents, Stars and bars]
source: LeetCode 2338
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count the Number of Ideal Arrays

> [!TIP]
> **🧠 Memory hook**
> Fix the last value v = Π pᵉ. Each prime's exponent rises from 0 to e over n slots independently: **Π C(n − 1 + e, e)**.
> **Mantra: FOR v: Π over primes C(n−1+e, e) · sum**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=4) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
An array of length n is ideal if every element is in [1, maxValue] and arr[i] is divisible by arr[i − 1]. Count ideal arrays mod 1e9+7.

## Key insight
Along the array the exponent of each prime is non-decreasing and ends at e. Distributing e increments over n positions (stars and bars) gives C(n − 1 + e, e), and different primes are independent. Exponents are at most 13 for values ≤ 10⁴, so a narrow Pascal table is enough.

## Approach: Factorise each last value
```java
// For a last value p1^e1·p2^e2…, each prime's exponent climbs independently: Π C(n - 1 + e, e)
public int idealArrays(int n, int maxValue) {
    int maxE = 14;
    long[][] C = new long[n + maxE][maxE + 1];
    for (int i = 0; i < n + maxE; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= Math.min(i, maxE); j++) C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
    long total = 0;
    for (int v = 1; v <= maxValue; v++) {
        long ways = 1;
        int x = v;
        for (int p = 2; p * p <= x; p++) {
            int e = 0;
            while (x % p == 0) {
                x /= p;
                e++;
            }
            ways = ways * C[n - 1 + e][e] % MOD;
        }
        if (x > 1) ways = ways * C[n][1] % MOD;
        total = (total + ways) % MOD;
    }
    return (int) total;
}
```

| Approach | Time | Space |
|---|---|---|
| Factorise each last value | O(maxValue · √maxValue + n · 14) | O(n · 14) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why at most 14 columns?</summary>

2¹⁴ > 10⁴, so no exponent exceeds 13.

</details>


<details><summary>What does C(n − 1 + e, e) count?</summary>

Non-decreasing exponent sequences of length n ending at e and starting ≥ 0.

</details>


## Connected
- [Distribute Candies Among Children II](Distribute%20Candies%20Among%20Children%20II.md)
- [Prime Factors](../Primes%20Divisors%20and%20Remainders/Prime%20Factors.md)
