---
topic: Strings and Digits
pattern: [Sort the half]
source: LeetCode 3517
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Smallest Palindromic Rearrangement I

> [!TIP]
> **🧠 Memory hook**
> A palindrome is its **left half mirrored**; sort the half.
> **Mantra: SORT THE FIRST HALF, MIRROR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=22) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Given a palindrome `s`, return the lexicographically smallest palindromic permutation.

## Key insight
The left half decides the string. Sort it ascending and copy it reversed into the right half (the middle letter stays).

## Approach 1: Sort and mirror
```java
// The input is already a palindrome: sort its first half and mirror it
public String smallestPalindrome(String s) {
    int n = s.length(), mid = n / 2;
    char[] c = s.toCharArray();
    Arrays.sort(c, 0, mid);
    for (int i = 0; i < mid; i++) c[n - 1 - i] = c[i];
    return new String(c);
}
```

## Approach 2: Counting
```java
// Count letters and build the half directly from the counts
public String smallestPalindromeCounting(String s) {
    int[] cnt = new int[26];
    for (char ch : s.toCharArray()) cnt[ch - 'a']++;
    StringBuilder half = new StringBuilder();
    char mid = 0;
    for (int c = 0; c < 26; c++) {
        for (int i = 0; i < cnt[c] / 2; i++) half.append((char) ('a' + c));
        if (cnt[c] % 2 == 1) mid = (char) ('a' + c);
    }
    String right = new StringBuilder(half).reverse().toString();
    return half.toString() + (mid != 0 ? String.valueOf(mid) : "") + right;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort and mirror | O(n log n) | O(n) |
| Counting | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the middle letter stay?</summary>

It is the unique odd-count letter and has no mirror.

</details>


## Connected
- [Lexicographically Smallest Palindromic Permutation Greater Than Target](Lexicographically%20Smallest%20Palindromic%20Permutation%20Greater%20Than%20Target.md)
