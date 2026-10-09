---
topic: Palindromes and Word Splits
pattern: [Expand around centre, Palindrome table]
source: LeetCode 5
difficulty: Medium
companies: [Amazon, Microsoft, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Longest Palindromic Substring

> [!TIP]
> **🧠 Memory hook**
> Every palindrome has a **centre** (a letter or a gap). Grow outwards while the ends match.
> **Mantra: 2n − 1 CENTRES; EXPAND WHILE s[l] == s[r]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=1) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Return the longest palindromic substring of s.

## Key insight
A palindrome is fixed by its centre and radius, so trying every centre and expanding finds them all in O(n²) time and O(1) space. The table version marks pal[i][j] from the inside out.

## Approach 1: Expand around centres
```java
// Expand around each of the 2n - 1 centres
public String longestPalindrome(String s) {
    int start = 0, len = 0;
    for (int c = 0; c < 2 * s.length() - 1; c++) {
        int l = c / 2, r = l + c % 2;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        if (r - l - 1 > len) { len = r - l - 1; start = l + 1; }
    }
    return s.substring(start, start + len);
}
```

## Approach 2: Palindrome table
```java
// Table: pal[i][j] = s[i] == s[j] and pal[i + 1][j - 1]
public String longestPalindromeDp(String s) {
    int n = s.length(), start = 0, len = 1;
    boolean[][] pal = new boolean[n][n];
    for (int i = n - 1; i >= 0; i--)
        for (int j = i; j < n; j++) {
            pal[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1]);
            if (pal[i][j] && j - i + 1 > len) { len = j - i + 1; start = i; }
        }
    return s.substring(start, start + len);
}
```

| Approach | Time | Space |
|---|---|---|
| Expand around centres | O(n²) | O(1) |
| Palindrome table | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why 2n − 1 centres?</summary>

n letters for odd lengths, n − 1 gaps for even lengths.

</details>


<details><summary>Linear time?</summary>

Manacher's algorithm.

</details>


## Connected
- [Palindromic Substrings](Palindromic%20Substrings.md)
- [Longest Palindromic Subsequence](Longest%20Palindromic%20Subsequence.md)
