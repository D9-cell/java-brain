---
topic: Numbers as Strings
pattern: [Palindrome candidates]
source: LeetCode 564
difficulty: Hard
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find the Closest Palindrome

> [!TIP]
> **🧠 Memory hook**
> Mirror the **left half with −1, 0, +1**, plus **99…9** (one digit shorter) and **10…01** (one longer). Pick the nearest, smaller on ties, never n itself.
> **Mantra: cands: 10^(L−1) − 1, 10^L + 1, mirror(half ± 0/1) · min distance, tie → smaller**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=7) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Return the closest palindrome integer to n (not n itself), choosing the smaller one on a tie. n has up to 18 digits.

## Key insight
A nearby palindrome shares n's left half, or has it nudged by one. Nudging can change the length (e.g. 1000 → 999, 99 → 101), which the two extra candidates cover. A half that rolls over to more digits is skipped, since 10…01 covers that case.

## Approach: Five candidates
```java
// Candidates: mirror the left half with middle -1, 0, +1, plus 99..9 and 10..01 for length changes
public String nearestPalindromic(String n) {
    int len = n.length();
    long num = Long.parseLong(n);
    List<Long> cand = new ArrayList<>();
    cand.add((long) Math.pow(10, len - 1) - 1);
    cand.add((long) Math.pow(10, len) + 1);
    long half = Long.parseLong(n.substring(0, (len + 1) / 2));
    for (long h = half - 1; h <= half + 1; h++)
        if (String.valueOf(h).length() == String.valueOf(half).length()) cand.add(mirror(h, len % 2 == 1));
    long best = -1;
    for (long c : cand) {
        if (c == num || c < 0) continue;
        if (best == -1 || Math.abs(c - num) < Math.abs(best - num) || (Math.abs(c - num) == Math.abs(best - num) && c < best)) best = c;
    }
    return String.valueOf(best);
}

// Builds a palindrome from its left half
long mirror(long half, boolean odd) {
    String s = String.valueOf(half);
    StringBuilder rev = new StringBuilder(odd ? s.substring(0, s.length() - 1) : s).reverse();
    return Long.parseLong(s + rev);
}
```

| Approach | Time | Space |
|---|---|---|
| Five candidates | O(L) | O(L) |

> [!WARNING]
> **Java gotcha**
> Mirroring 999999999 + 1 overflows a long, so halves that grow a digit are skipped. Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why exclude n?</summary>

The answer must differ from n even if n is a palindrome.

</details>


<details><summary>Why the 9…9 candidate?</summary>

100 → 99 is closer than 101.

</details>


## Connected
- [Shortest Palindrome](../Pattern%20Matching/Shortest%20Palindrome.md)
- [Super Palindromes](../../Mathematical/Counting%20and%20Modular%20Combinatorics/Super%20Palindromes.md)
