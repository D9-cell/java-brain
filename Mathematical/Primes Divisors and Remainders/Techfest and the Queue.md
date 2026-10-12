---
topic: Primes Divisors and Remainders
pattern: [Smallest prime factor sieve, DP on x / spf]
source: GfG Techfest and the Queue
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Techfest and the Queue

> [!TIP]
> **🧠 Memory hook**
> Store the **smallest prime factor** of every number. Then `count[x] = 1 + count[x / spf[x]]`.
> **Mantra: spf sieve · cnt[x] = 1 + cnt[x / spf[x]] · sum over [a, b]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=4) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
For every x in [a, b] add up the exponents in its prime factorisation (12 = 2²·3 gives 3). Return the total.

## Key insight
Dividing x by its smallest prime factor removes exactly one prime from the factorisation, and x / spf[x] is smaller, so its count is already known. One sieve and one pass replace trial division per number.

## Approach: SPF sieve + DP
```java
// Smallest-prime-factor sieve; the exponent sum of x is 1 + that of x / spf(x)
public int sumOfPowers(int a, int b) {
    int[] spf = new int[b + 1];
    for (int i = 2; i <= b; i++)
        if (spf[i] == 0)
            for (int j = i; j <= b; j += i)
                if (spf[j] == 0) spf[j] = i;
    int[] cnt = new int[b + 1];
    int total = 0;
    for (int x = 2; x <= b; x++) {
        cnt[x] = 1 + cnt[x / spf[x]];
        if (x >= a) total += cnt[x];
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| SPF sieve + DP | O(b log log b) | O(b) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does dividing by spf reduce the count by one?</summary>

It removes one copy of one prime factor.

</details>


<details><summary>Trial division instead?</summary>

O((b − a)·√b), too slow for wide ranges.

</details>


## Connected
- [Prime Factors](Prime%20Factors.md)
- [Closest Prime Numbers in Range](Closest%20Prime%20Numbers%20in%20Range.md)
