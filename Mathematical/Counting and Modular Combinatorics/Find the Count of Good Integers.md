---
topic: Counting and Modular Combinatorics
pattern: [Generate palindromes, Multiset permutations]
source: LeetCode 3272
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Find the Count of Good Integers

> [!TIP]
> **🧠 Memory hook**
> Generate the n-digit **palindromes divisible by k** from their left half, keep each **digit multiset once**, then count its arrangements without a leading zero.
> **Mantra: FOR half: pal % k == 0 · new multiset → (n − c0)·(n−1)! / Π c!**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=14) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
An integer is k-palindromic if it is a palindrome divisible by k. A number is good if its digits can be rearranged into a k-palindromic integer (no leading zeros). Count good n-digit integers (n ≤ 10).

## Key insight
There are at most 10⁵ palindromes of length 10. Two good numbers with the same digit multiset are both good, so dedupe by sorted digits. Arrangements of a multiset with no leading zero: choose the first digit among the n − c0 non-zeros, then permute the rest.

## Approach: Palindromes + multisets
```java
// Enumerate n-digit palindromes divisible by k, dedupe by digit multiset, count arrangements
public long countGoodIntegers(int n, int k) {
    long[] fact = new long[n + 1];
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i;
    Set<String> seen = new HashSet<>();
    int half = (n + 1) / 2;
    int start = (int) Math.pow(10, half - 1), end = (int) Math.pow(10, half);
    long total = 0;
    for (int h = start; h < end; h++) {
        String left = String.valueOf(h);
        String right = new StringBuilder(left.substring(0, n / 2)).reverse().toString();
        String pal = left + right;
        if (Long.parseLong(pal) % k != 0) continue;
        char[] key = pal.toCharArray();
        Arrays.sort(key);
        if (!seen.add(new String(key))) continue;
        int[] cnt = new int[10];
        for (char c : key) cnt[c - '0']++;
        long ways = (n - cnt[0]) * fact[n - 1];
        for (int c : cnt) ways /= fact[c];
        total += ways;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Palindromes + multisets | O(10^(n/2) · n log n) | O(10^(n/2)) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why (n − c0) · (n − 1)!?</summary>

Place any non-zero digit first (with its copies counted later by the division), then the rest freely.

</details>


<details><summary>Why dedupe?</summary>

Several palindromes can share a multiset; each good number should count once.

</details>


## Connected
- [Smallest Palindromic Rearrangement II](Smallest%20Palindromic%20Rearrangement%20II.md)
- [Super Palindromes](Super%20Palindromes.md)
