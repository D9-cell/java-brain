---
topic: Strings and Digits
pattern: [Longest prefix, Factor into digits]
source: LeetCode 3348
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Smallest Divisible Digit Product II

> [!TIP]
> **🧠 Memory hook**
> Keep the **longest possible prefix** of `num`, raise one digit, then fill the tail with the smallest digits that supply the missing factors.
> **Mantra: LONGEST PREFIX, SMALLER TAIL, FACTORS AS DIGITS 9..2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=21) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the smallest zero-free number ≥ `num` whose digit product is divisible by t (or "-1").

## Key insight
If `t` has a prime factor above 7 it is impossible. Otherwise track the factor still needed after each prefix. From the longest zero-free prefix downwards, try a larger digit at that position; the remaining requirement must be coverable by the remaining positions (fewest digits by taking 9, 8, … 2). If nothing works, use a longer number.

## Approach: Prefix search
```java
// Smallest zero-free number >= num whose digit product is divisible by t. Keep the longest possible prefix of num, raise one digit, fill the tail minimally
public String smallestNumber(String num, long t) {
    long rest = t;
    for (int p : new int[]{2, 3, 5, 7}) while (rest % p == 0) rest /= p;
    if (rest != 1) return "-1";
    int n = num.length();
    long[] need = new long[n + 1];
    need[0] = t;
    int zeroFree = 0;
    for (int i = 0; i < n && num.charAt(i) != '0'; i++) {
        need[i + 1] = need[i] / gcd(need[i], num.charAt(i) - '0');
        zeroFree = i + 1;
    }
    if (zeroFree == n && need[n] == 1) return num;
    for (int pos = Math.min(zeroFree, n - 1); pos >= 0; pos--) {
        for (int d = num.charAt(pos) - '0' + 1; d <= 9; d++) {
            long r = need[pos] / gcd(need[pos], d);
            if (digitsNeeded(r) <= n - pos - 1) return num.substring(0, pos) + d + fill(r, n - pos - 1);
        }
    }
    return fill(t, Math.max(n + 1, digitsNeeded(t)));
}

// Fewest digits whose product is a multiple of r (greedy from 9 down to 2)
private int digitsNeeded(long r) {
    int cnt = 0;
    for (int d = 9; d >= 2; d--) while (r % d == 0) { r /= d; cnt++; }
    return cnt;
}

// Smallest string of the given length with product a multiple of r: ones first, then the factor digits in increasing order
private String fill(long r, int len) {
    StringBuilder sb = new StringBuilder();
    for (int d = 9; d >= 2; d--) while (r % d == 0) { sb.append((char) ('0' + d)); r /= d; }
    while (sb.length() < len) sb.append('1');
    return sb.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix search | O(n · 9) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against an upward scan for t ≤ 120. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why break at the first `0`?</summary>

A zero digit kills the product, so prefixes after it are invalid.

</details>


<details><summary>Why do longer numbers appear at the end?</summary>

When no same-length number works, the first longer number is the smallest candidate.

</details>


## Connected
- [Lexicographically Smallest Permutation Greater Than Target](Lexicographically%20Smallest%20Permutation%20Greater%20Than%20Target.md)
