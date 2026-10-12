---
topic: Primes Divisors and Remainders
pattern: [Sieve, Adjacent pairs]
source: LeetCode 2523
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Closest Prime Numbers in Range

> [!TIP]
> **🧠 Memory hook**
> Sieve up to right, then compare **consecutive primes**. A gap of **2 (twin primes)** cannot be beaten, so stop early.
> **Mantra: sieve(right) · prev, x: x − prev < gap → best · gap ≤ 2 → break**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=2) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Return the two primes num1 < num2 in [left, right] with the smallest difference (smallest num1 on ties), or [-1, -1] if fewer than two primes exist.

## Key insight
The closest pair is always two consecutive primes, so one pass over the sieve is enough. Strict `<` keeps the earliest pair. Apart from (2, 3), no gap is below 2.

## Approach: Sieve + scan
```java
// Sieve of Eratosthenes, then the closest pair of consecutive primes in range
public int[] closestPrimes(int left, int right) {
    boolean[] comp = new boolean[right + 1];
    comp[0] = true;
    if (right >= 1) comp[1] = true;
    for (int i = 2; (long) i * i <= right; i++)
        if (!comp[i])
            for (int j = i * i; j <= right; j += i) comp[j] = true;
    int[] best = {-1, -1};
    int prev = -1, gap = Integer.MAX_VALUE;
    for (int x = left; x <= right; x++) {
        if (comp[x]) continue;
        if (prev != -1 && x - prev < gap) {
            gap = x - prev;
            best = new int[]{prev, x};
            if (gap <= 2) break;
        }
        prev = x;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Sieve + scan | O(R log log R) | O(R) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only consecutive primes?</summary>

A prime between two others is closer to both.

</details>


<details><summary>Why break at gap ≤ 2?</summary>

Gap 1 only occurs for (2, 3) and gap 2 is the minimum for larger primes.

</details>


## Connected
- [Segmented Sieve](Segmented%20Sieve.md)
