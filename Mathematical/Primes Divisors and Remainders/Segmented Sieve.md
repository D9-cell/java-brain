---
topic: Primes Divisors and Remainders
pattern: [Sieve, Window]
source: GfG Segmented Sieve
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Segmented Sieve

> [!TIP]
> **🧠 Memory hook**
> Sieve the **base primes up to √R** once, then cross out their multiples **inside the window [L, R]** only.
> **Mantra: base = sieve(√R) · start = max(p², ⌈L/p⌉·p) · mark j − L**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=1) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Return all primes in [L, R], where R can be about 10¹² but R − L is small (up to about 10⁶).

## Key insight
A full sieve to R is too big. Every composite in [L, R] has a prime factor ≤ √R, so crossing out multiples of those base primes in a boolean array of size R − L + 1 is enough. Start at p² (smaller multiples have a smaller factor) or the first multiple ≥ L.

## Approach: Base primes + window
```java
// Sieves [L, R] using only the base primes up to √R
public List<Long> primesInRange(long L, long R) {
    int lim = (int) Math.sqrt(R);
    boolean[] comp = new boolean[lim + 1];
    List<Integer> base = new ArrayList<>();
    for (int i = 2; i <= lim; i++) {
        if (comp[i]) continue;
        base.add(i);
        for (long j = (long) i * i; j <= lim; j += i) comp[(int) j] = true;
    }
    boolean[] seg = new boolean[(int) (R - L + 1)];
    for (int p : base) {
        long start = Math.max((long) p * p, (L + p - 1) / p * p);
        for (long j = start; j <= R; j += p) seg[(int) (j - L)] = true;
    }
    List<Long> out = new ArrayList<>();
    for (long x = Math.max(L, 2); x <= R; x++)
        if (!seg[(int) (x - L)]) out.add(x);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Base primes + window | O(√R log log R + (R − L) log log R) | O(√R + R − L) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why start at max(p², …)?</summary>

Starting below p² could cross out p itself when p is in the window.

</details>


<details><summary>Why handle L = 1?</summary>

1 is not prime, so the scan starts from max(L, 2).

</details>


## Connected
- [Closest Prime Numbers in Range](Closest%20Prime%20Numbers%20in%20Range.md)
- [Prime Factors](Prime%20Factors.md)
