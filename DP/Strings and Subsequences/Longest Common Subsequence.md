---
topic: Strings and Subsequences
pattern: [LCS grid, Print by walking back]
source: LeetCode 1143
difficulty: Medium
companies: [Amazon, Google, Microsoft]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Longest Common Subsequence

> [!TIP]
> **🧠 Memory hook**
> Two people read their strings left to right and **shout when they see the same letter**; they may skip letters but never go back.
> **Mantra: MATCH → ↖ + 1 · ELSE max(↑, ←)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=0) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest subsequence common to both strings (and, as a bonus, one such subsequence).

## Key insight
dp[i][j] is the LCS of the first i chars of a and the first j of b. If the last chars match, they can end the LCS: diagonal + 1. Otherwise one of them is not used: drop it (up or left). To print, start at (m, n) and follow the choice that produced each cell.

## Approach 1: Table
```java
// dp[i][j] = LCS of the first i chars of a and the first j chars of b
public int longestCommonSubsequence(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp[m][n];
}
```

## Approach 2: Top-down memo
```java
// Top-down over (i, j) from the front of both strings
public int lcsMemo(String a, String b) {
    Integer[][] memo = new Integer[a.length()][b.length()];
    return go(a, b, 0, 0, memo);
}

// LCS of a[i..] and b[j..]
private int go(String a, String b, int i, int j, Integer[][] memo) {
    if (i == a.length() || j == b.length()) return 0;
    if (memo[i][j] != null) return memo[i][j];
    if (a.charAt(i) == b.charAt(j)) return memo[i][j] = 1 + go(a, b, i + 1, j + 1, memo);
    return memo[i][j] = Math.max(go(a, b, i + 1, j, memo), go(a, b, i, j + 1, memo));
}
```

## Approach 3: Two rows
```java
// Two rolling rows
public int lcsRows(String a, String b) {
    int[] prev = new int[b.length() + 1], cur = new int[b.length() + 1];
    for (int i = 1; i <= a.length(); i++) {
        for (int j = 1; j <= b.length(); j++)
            cur[j] = a.charAt(i - 1) == b.charAt(j - 1) ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
        int[] t = prev; prev = cur; cur = t;
    }
    return prev[b.length()];
}
```

## Approach 4: Print one LCS
```java
// Walk back through the full table to print one LCS
public String printLcs(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    StringBuilder sb = new StringBuilder();
    for (int i = m, j = n; i > 0 && j > 0; ) {
        if (a.charAt(i - 1) == b.charAt(j - 1)) { sb.append(a.charAt(i - 1)); i--; j--; }
        else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
        else j--;
    }
    return sb.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Table | O(m · n) | O(m · n) |
| Top-down memo | O(m · n) | O(m · n) |
| Two rows | O(m · n) | O(n) |
| Print one LCS | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is a match always safe to take?</summary>

Any LCS that skips one of the two equal last chars can be shifted to use them.

</details>


<details><summary>Why cannot two rows print the LCS?</summary>

Walking back needs the whole table.

</details>


## Connected
- [Uncrossed Lines](Uncrossed%20Lines.md)
- [Edit Distance](Edit%20Distance.md)
- [Shortest Common Supersequence](Shortest%20Common%20Supersequence.md)
