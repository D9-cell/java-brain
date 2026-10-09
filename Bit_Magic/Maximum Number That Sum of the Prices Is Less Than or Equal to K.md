---
topic: Bit Magic
pattern: [Bit counting formula, Binary search on answer]
source: LeetCode 3007
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Maximum Number That Sum of the Prices Is Less Than or Equal to K

> [!TIP]
> **🧠 Memory hook**
> Bits repeat in blocks: count with a formula, then binary-search.
> **Mantra: COUNT BIT b UP TO n BY FORMULA, BINARY SEARCH num**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=27) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Price of a number = its set bits at 1-indexed positions divisible by x. Largest num with total price of 1..num ≤ k.

## Key insight
Bit b over 0..n is 2^b zeros then 2^b ones repeating, so its count is a formula; the total price is monotone, so binary search.

## Approach 1: Linear scan (TLE)
```java
// Price of num: set bits at 1-indexed positions divisible by x
static long price(long num, int x) {
    long p = 0;
    for (int pos = x; pos <= 62; pos += x) if ((num >> (pos - 1) & 1) == 1) p++;
    return p;
}

// Approach 1 (TLE for big k): add prices of 1, 2, 3, … until the budget is exceeded
public long findMaximumNumberLinear(long k, int x) {
    long num = 0, sum = 0;
    while (sum + price(num + 1, x) <= k) sum += price(++num, x);
    return num;
}
```

## Approach 2: Formula + binary search
```java
// How many numbers in [1, n] have bit b set: full cycles of 2^(b+1) plus the partial tail
static long countBit(long n, int b) {
    long cycle = 1L << (b + 1), half = 1L << b;
    return (n + 1) / cycle * half + Math.max(0, (n + 1) % cycle - half);
}

// Approach 2: the total price is monotone in num, so binary-search the largest num with total ≤ k
public long findMaximumNumber(long k, int x) {
    long lo = 0, hi = 1L << 50;
    while (lo < hi) {
        long mid = (lo + hi + 1) >>> 1, total = 0;
        for (int b = x - 1; b < 51 && total <= k; b += x) total += countBit(mid, b);
        if (total <= k) lo = mid; else hi = mid - 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Linear scan (TLE) | O(answer · log) | O(1) |
| Formula + binary search | O(log² k) | O(1) |

> [!WARNING]
> **Java gotcha**
> Binary search agrees with the linear scan for k ≤ 300 and x ≤ 8. This version uses a closed-form bit count instead of the C++ recursive getBits.

## Recall before you reveal
<details><summary>Bit count formula?</summary>

(n+1)/2^(b+1) · 2^b + max(0, (n+1) % 2^(b+1) − 2^b).

</details>

