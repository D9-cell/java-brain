---
topic: Prefix Variants
pattern: [Several prefix arrays, Modular concatenation]
source: LeetCode 3756
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Concatenate Non-Zero Digits and Multiply by Sum II

> [!TIP]
> **🧠 Memory hook**
> Prefix arrays for **count of non-zero digits**, **number formed by them (mod)** and **digit sum**. A query strips the earlier prefix: **number[r] − number[l] · 10^len**.
> **Mantra: x = number[r] − number[l]·10^(count[r] − count[l]) · answer x · (digitSum[r] − digitSum[l])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=8) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
For each query [l, r], form x from the non-zero digits of s[l..r] in order (0 if none) and the digit sum of s[l..r]. Return x · sum mod 1e9+7.

## Key insight
Like a rolling hash: the concatenation of a prefix shifted by the number of later non-zero digits must be subtracted. All arithmetic stays mod 1e9+7.

## Approach: Prefix arrays
```java
// Prefix number of non-zero digits, prefix concatenation value and prefix digit sum answer each query
public int[] sumAndMultiply(String s, int[][] queries) {
    int n = s.length();
    int[] count = new int[n + 1];
    long[] number = new long[n + 1], digitSum = new long[n + 1], pow10 = new long[n + 1];
    pow10[0] = 1;
    for (int i = 0; i < n; i++) {
        int d = s.charAt(i) - '0';
        pow10[i + 1] = pow10[i] * 10 % MOD;
        count[i + 1] = count[i] + (d != 0 ? 1 : 0);
        number[i + 1] = d != 0 ? (number[i] * 10 + d) % MOD : number[i];
        digitSum[i + 1] = digitSum[i] + d;
    }
    int[] out = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int l = queries[q][0], r = queries[q][1] + 1, len = count[r] - count[l];
        long x = ((number[r] - number[l] * pow10[len]) % MOD + MOD) % MOD;
        out[q] = (int) (x * ((digitSum[r] - digitSum[l]) % MOD) % MOD);
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix arrays | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why shift by count[r] − count[l]?</summary>

Only non-zero digits extend the number.

</details>


<details><summary>Why add MOD before taking %?</summary>

The subtraction can go negative.

</details>


## Connected
- [Count Vowel Strings in Ranges](../Prefix%20Sums%20Basics/Count%20Vowel%20Strings%20in%20Ranges.md)
