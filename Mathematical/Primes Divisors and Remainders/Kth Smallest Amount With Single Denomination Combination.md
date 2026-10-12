---
topic: Primes Divisors and Remainders
pattern: [Binary search on answer, Inclusion-exclusion]
source: LeetCode 3116
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Kth Smallest Amount With Single Denomination Combination

> [!TIP]
> **🧠 Memory hook**
> Count amounts ≤ x that are a multiple of **some** coin by inclusion-exclusion over coin subsets (lcm), then **binary search x**.
> **Mantra: count(x) = Σ (−1)^(|S|+1) · x / lcm(S) · smallest x with count ≥ k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=9) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Each amount uses one coin denomination any number of times (so amounts are multiples of a single coin). Given up to 15 coins of value ≤ 25, return the k-th smallest amount.

## Key insight
The amounts are the union of the multiples of each coin. The size of a union is the alternating sum over subsets of multiples of their lcm. count(x) grows with x, so binary search finds the first x with count ≥ k. Precompute every subset lcm once.

## Approach: Binary search + inclusion-exclusion
```java
// Binary search on the amount; inclusion-exclusion over coin subsets counts multiples up to x
public long findKthSmallest(int[] coins, int k) {
    int n = coins.length;
    long[] lcm = new long[1 << n];
    int[] bits = new int[1 << n];
    lcm[0] = 1;
    for (int m = 1; m < (1 << n); m++) {
        int low = Integer.numberOfTrailingZeros(m);
        long prev = lcm[m & (m - 1)], c = coins[low];
        lcm[m] = Math.min(prev / gcd(prev, c) * c, Long.MAX_VALUE / 4);
        bits[m] = Integer.bitCount(m);
    }
    long lo = 1, hi = (long) k * 25;
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2, count = 0;
        for (int m = 1; m < (1 << n); m++)
            count += (bits[m] % 2 == 1 ? 1 : -1) * (mid / lcm[m]);
        if (count >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Euclid's algorithm
long gcd(long a, long b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + inclusion-exclusion | O(2ⁿ · log(k · 25)) | O(2ⁿ) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why lcm and not product?</summary>

Multiples of both 4 and 6 are multiples of 12, not 24.

</details>


<details><summary>Upper bound?</summary>

k · (smallest coin) ≤ k · 25 always has at least k amounts.

</details>


## Connected
- [Sorted GCD Pair Queries](Sorted%20GCD%20Pair%20Queries.md)
- [Ugly Number](../Digits%20and%20Powers/Ugly%20Number.md)
