---
topic: Palindromes and Word Splits
pattern: [Range DP, LCS with the reverse]
source: LeetCode 516
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Longest Palindromic Subsequence

> [!TIP]
> **🧠 Memory hook**
> Peel the string from **both ends**: matching ends add 2, otherwise drop one end.
> **Mantra: dp[i][j] = s[i] == s[j] ? dp[i+1][j−1] + 2 : max(dp[i+1][j], dp[i][j−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=0) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest palindromic subsequence of s.

## Key insight
dp[i][j] covers s[i..j]. Equal ends can wrap the best inner palindrome; otherwise one end is unused. Fill i from right to left so inner ranges are ready. Equivalently, it is the LCS of s and reverse(s).

## Approach 1: Range DP
```java
// Interval DP: dp[i][j] for s[i..j], filled by increasing length (i from the right)
public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[][] dp = new int[n][n];
    for (int i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (int j = i + 1; j < n; j++)
            dp[i][j] = s.charAt(i) == s.charAt(j) ? dp[i + 1][j - 1] + 2 : Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
    return dp[0][n - 1];
}
```

## Approach 2: LCS with reverse
```java
// LCS of s and its reverse
public int longestPalindromeSubseqLcs(String s) {
    String r = new StringBuilder(s).reverse().toString();
    int n = s.length();
    int[][] dp = new int[n + 1][n + 1];
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = s.charAt(i - 1) == r.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp[n][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Range DP | O(n²) | O(n²) |
| LCS with reverse | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Fill order?</summary>

i from n − 1 down, j from i + 1 up.

</details>


<details><summary>Why does the LCS trick work?</summary>

A palindrome reads the same in s and in reverse(s).

</details>


## Connected
- [Longest Common Subsequence](../Strings%20and%20Subsequences/Longest%20Common%20Subsequence.md)
- [Minimum Insertion Steps to Make a String Palindrome](Minimum%20Insertion%20Steps%20to%20Make%20a%20String%20Palindrome.md)
- [Longest Palindromic Substring](Longest%20Palindromic%20Substring.md)
