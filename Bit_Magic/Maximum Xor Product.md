---
topic: Bit Magic
pattern: [One bit at a time, Balancing]
source: LeetCode 2939
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Maximum Xor Product

> [!TIP]
> **🧠 Memory hook**
> Equal bits: light both. Different bits: balance the two numbers.
> **Mantra: EQUAL → BOTH 1, DIFFERENT → GIVE TO SMALLER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=31) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Max (a ^ x)·(b ^ x) for 0 ≤ x < 2^n, mod 1e9+7.

## Key insight
Bits ≥ n are fixed. Where a and b agree, x can make both 1. Where they differ, exactly one gets the 1; with a fixed sum the product is largest when the two are close, so give it to the smaller.

## Approach: Bit by bit
```java
// Bit by bit: bits ≥ n are fixed; below n, equal bits → set both to 1; different bits → give the 1 to the smaller side
public int maximumXorProduct(long a, long b, int n) {
    final long MOD = 1_000_000_007;
    long xa = (a >> n) << n, xb = (b >> n) << n;
    for (int i = n - 1; i >= 0; i--) {
        boolean as = (a >> i & 1) == 1, bs = (b >> i & 1) == 1;
        if (as == bs) { xa |= 1L << i; xb |= 1L << i; }
        else if (xa > xb) xb |= 1L << i;
        else xa |= 1L << i;
    }
    return (int) ((xa % MOD) * (xb % MOD) % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Bit by bit | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against all x for a, b < 4096 and n ≤ 10.

## Recall before you reveal
<details><summary>Brute force?</summary>

O(2^n) and overflows.

</details>

