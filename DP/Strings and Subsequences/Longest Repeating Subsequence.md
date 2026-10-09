---
topic: Strings and Subsequences
pattern: [LCS of a string with itself, i ≠ j]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Longest Repeating Subsequence

> [!TIP]
> **🧠 Memory hook**
> Compare the string **with itself**, but a letter may not match its own copy.
> **Mantra: LCS(s, s) WITH MATCH ONLY IF i ≠ j**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=10) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Find the longest subsequence that occurs twice in s such that the two occurrences never use the same index at the same position. Return its length (and print one).

## Key insight
Two occurrences are two index sequences into the same string. That is LCS of s with s, except a character cannot be matched with itself (i == j).

## Approach 1: Self-LCS
```java
// LCS of s with itself where equal characters only match at different indexes
public int longestRepeatingSubsequence(String s) {
    int n = s.length();
    int[][] dp = new int[n + 1][n + 1];
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = s.charAt(i - 1) == s.charAt(j - 1) && i != j ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp[n][n];
}
```

## Approach 2: Print one
```java
// Same table, walked back to print one repeating subsequence
public String printLongestRepeatingSubsequence(String s) {
    int n = s.length();
    int[][] dp = new int[n + 1][n + 1];
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = s.charAt(i - 1) == s.charAt(j - 1) && i != j ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    StringBuilder sb = new StringBuilder();
    for (int i = n, j = n; i > 0 && j > 0; ) {
        if (s.charAt(i - 1) == s.charAt(j - 1) && i != j) { sb.append(s.charAt(i - 1)); i--; j--; }
        else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
        else j--;
    }
    return sb.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Self-LCS | O(n²) | O(n²) |
| Print one | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why forbid i == j?</summary>

That would match a character with itself, giving the whole string.

</details>


<details><summary>Can the two occurrences overlap?</summary>

Yes, as long as positions differ index by index.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
- [Longest Palindromic Subsequence](../Palindromes%20and%20Word%20Splits/Longest%20Palindromic%20Subsequence.md)
