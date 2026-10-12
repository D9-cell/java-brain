---
topic: Strings and Subsequences
pattern: [Print by walking back, LCS reduction]
source: LeetCode 1092
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Shortest Common Supersequence

> [!TIP]
> **🧠 Memory hook**
> Write both strings together but **share the LCS letters** once.
> **Mantra: LENGTH = m + n − LCS; WALK BACK: MATCH ONCE, ELSE EMIT THE DROPPED CHAR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=9) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the shortest string that has both str1 and str2 as subsequences (any one if several). The GfG version asks only for the length.

## Key insight
Every char of both strings appears; the shared LCS chars can be written once. Walk back through the LCS table: on a match emit it once; otherwise emit the char of the side you step away from; at the end flush what remains.

## Approach 1: Build from the LCS table
```java
// Walk back through the LCS table: shared chars once, other chars from whichever side the table came from
public String shortestCommonSupersequence(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    StringBuilder sb = new StringBuilder();
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (a.charAt(i - 1) == b.charAt(j - 1)) { sb.append(a.charAt(i - 1)); i--; j--; }
        else if (dp[i - 1][j] >= dp[i][j - 1]) sb.append(a.charAt(--i));
        else sb.append(b.charAt(--j));
    }
    while (i > 0) sb.append(a.charAt(--i));
    while (j > 0) sb.append(b.charAt(--j));
    return sb.reverse().toString();
}
```

## Approach 2: Length only
```java
// Length only: m + n - LCS
public int scsLength(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return m + n - dp[m][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Build from the LCS table | O(m · n) | O(m · n) |
| Length only | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why m + n − LCS?</summary>

Only the LCS letters can be shared.

</details>


<details><summary>Why flush at the end?</summary>

One string may still have unmatched prefix letters.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
- [Find the Shortest Superstring](../Bitmask%20Digit%20and%20Tree%20DP/Find%20the%20Shortest%20Superstring.md)
