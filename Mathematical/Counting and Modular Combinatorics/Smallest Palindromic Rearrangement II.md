---
topic: Counting and Modular Combinatorics
pattern: [Greedy by block size, Capped multinomial]
source: LeetCode 3518
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Smallest Palindromic Rearrangement II

> [!TIP]
> **🧠 Memory hook**
> A palindrome is fixed by its **left half**. Pick its letters left to right: if the block starting with letter c has **fewer than k** arrangements, skip it and subtract.
> **Mantra: FOR pos: FOR c: ways = arrangements(rest) · ways ≥ k → take c · ELSE k −= ways**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=15) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
s is a palindrome. Return the k-th lexicographically smallest palindromic permutation of s, or "" if there are fewer than k.

## Key insight
The middle letter (odd length) is forced. The left half is any arrangement of half the counts. Counting arrangements is a multinomial, which can be astronomically large, so cap it at k: as soon as the running product reaches k nothing more is needed.

## Approach: Greedy with capped counts
```java
// Builds the left half greedily: try letters a..z and skip a letter while k exceeds its block size
public String smallestPalindrome(String s, int k) {
    int n = s.length();
    int[] cnt = new int[26];
    for (int i = 0; i < n / 2; i++) cnt[s.charAt(i) - 'a']++;
    int half = n / 2;
    if (arrangements(cnt, half, k) < k) return "";
    StringBuilder left = new StringBuilder();
    for (int pos = 0; pos < half; pos++) {
        for (int c = 0; c < 26; c++) {
            if (cnt[c] == 0) continue;
            cnt[c]--;
            long ways = arrangements(cnt, half - pos - 1, k);
            if (ways >= k) {
                left.append((char) ('a' + c));
                break;
            }
            k -= ways;
            cnt[c]++;
        }
    }
    String l = left.toString();
    String mid = n % 2 == 1 ? String.valueOf(s.charAt(n / 2)) : "";
    return l + mid + new StringBuilder(l).reverse();
}

// Multinomial count of arrangements, capped at cap so it never overflows
long arrangements(int[] cnt, int total, long cap) {
    long ways = 1;
    int placed = 0;
    for (int c = 0; c < 26; c++)
        for (int j = 1; j <= cnt[c]; j++) {
            placed++;
            ways = ways * placed / j;
            if (ways >= cap) return cap;
        }
    return ways;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy with capped counts | O(n · 26 · n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why cap the count?</summary>

Values beyond k change no decision and would overflow.

</details>


<details><summary>Is ways · placed / j exact?</summary>

Yes: the running product is a binomial coefficient at every step.

</details>


## Connected
- [Smallest Palindromic Rearrangement I](../../Greedy/Strings%20and%20Digits/Smallest%20Palindromic%20Rearrangement%20I.md)
- [Find the Count of Good Integers](Find%20the%20Count%20of%20Good%20Integers.md)
