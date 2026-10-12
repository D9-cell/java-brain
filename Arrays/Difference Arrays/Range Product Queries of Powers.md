---
topic: Difference Arrays
pattern: [Exponent prefix]
source: LeetCode 2438
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Range Product Queries of Powers

> [!TIP]
> **🧠 Memory hook**
> powers are the **set bits of n**. A range product is **2^(sum of exponents)**: prefix-sum the exponents and use fast power.
> **Mantra: exps = set bit positions · pre of exps · 2^(pre[r+1] − pre[l]) mod**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=12) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
powers is the sorted list of powers of two that sum to n. For each query [l, r] return the product powers[l..r] mod 1e9+7.

## Key insight
Multiplying powers of two adds exponents, so products become sums. There are at most 31 powers.

## Approach: Exponent prefix + fast power
```java
// powers are the set bits of n; a range product is 2 raised to the sum of their exponents
public int[] productQueries(int n, int[][] queries) {
    int[] exps = new int[32];
    int m = 0;
    for (int b = 0; b < 31; b++)
        if ((n >> b & 1) == 1) exps[m++] = b;
    int[] pre = new int[m + 1];
    for (int i = 0; i < m; i++) pre[i + 1] = pre[i] + exps[i];
    int[] out = new int[queries.length];
    for (int q = 0; q < queries.length; q++) out[q] = (int) power(2, pre[queries[q][1] + 1] - pre[queries[q][0]]);
    return out;
}

// Binary exponentiation under the modulus
long power(long b, long e) {
    long r = 1;
    while (e > 0) {
        if ((e & 1) == 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Exponent prefix + fast power | O(31 + q log 31) | O(31) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why exponents?</summary>

2^a · 2^b = 2^(a + b).

</details>


<details><summary>Is the list sorted?</summary>

Bits are read from low to high.

</details>


## Connected
- [Power of Two](../../Bit_Magic/Power%20of%20Two.md)
- [Pow(x, n)](../../Mathematical/Digits%20and%20Powers/Pow%28x%2C%20n%29.md)
