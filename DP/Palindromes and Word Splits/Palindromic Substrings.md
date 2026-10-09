---
topic: Palindromes and Word Splits
pattern: [Expand around centre, Count while growing]
source: LeetCode 647
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Palindromic Substrings

> [!TIP]
> **🧠 Memory hook**
> Each successful expansion step **is** one more palindrome: count the steps.
> **Mantra: FOR EACH CENTRE: WHILE ENDS MATCH → count++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=2) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Count the substrings of s that are palindromes (same text at different positions counts separately).

## Key insight
Same centres as the longest palindrome; every radius that still matches adds one palindrome. The table version counts true cells.

## Approach 1: Expand and count
```java
// Expand around every centre and count each successful step
public int countSubstrings(String s) {
    int count = 0;
    for (int c = 0; c < 2 * s.length() - 1; c++)
        for (int l = c / 2, r = l + c % 2; l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r); l--, r++) count++;
    return count;
}
```

## Approach 2: Palindrome table
```java
// Table of palindromic ranges
public int countSubstringsDp(String s) {
    int n = s.length(), count = 0;
    boolean[][] pal = new boolean[n][n];
    for (int i = n - 1; i >= 0; i--)
        for (int j = i; j < n; j++)
            if (s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1])) { pal[i][j] = true; count++; }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Expand and count | O(n²) | O(1) |
| Palindrome table | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Minimum answer?</summary>

n: every single letter.

</details>


<details><summary>Why is the table filled with i descending?</summary>

pal[i][j] reads pal[i + 1][j − 1].

</details>


## Connected
- [Longest Palindromic Substring](Longest%20Palindromic%20Substring.md)
- [Palindrome Partitioning II](Palindrome%20Partitioning%20II.md)
