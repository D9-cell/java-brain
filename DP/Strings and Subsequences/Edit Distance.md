---
topic: Strings and Subsequences
pattern: [Edit-style grid, One row + diagonal]
source: LeetCode 72
difficulty: Medium
companies: [Google, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Edit Distance

> [!TIP]
> **🧠 Memory hook**
> Three tools: **replace ↖, delete ↑, insert ←**, each costing 1; a match is free.
> **Mantra: MATCH → ↖ · ELSE 1 + min(↖, ↑, ←)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=8) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of insertions, deletions and replacements to convert word1 into word2.

## Key insight
dp[i][j] turns a[0..i) into b[0..j). If the last chars match, nothing to do. Otherwise replace the last char (diagonal), delete it (up), or insert b's last char (left). One row works if the old diagonal is saved before it is overwritten.

## Approach 1: Grid
```java
// dp[i][j] = edits to turn a[0..i) into b[0..j)
public int minDistance(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1]
                    : 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
    return dp[m][n];
}
```

## Approach 2: One row + diagonal
```java
// One row plus the saved diagonal
public int minDistanceRow(String a, String b) {
    int n = b.length();
    int[] dp = new int[n + 1];
    for (int j = 0; j <= n; j++) dp[j] = j;
    for (int i = 1; i <= a.length(); i++) {
        int diag = dp[0];
        dp[0] = i;
        for (int j = 1; j <= n; j++) {
            int up = dp[j];
            dp[j] = a.charAt(i - 1) == b.charAt(j - 1) ? diag : 1 + Math.min(diag, Math.min(up, dp[j - 1]));
            diag = up;
        }
    }
    return dp[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Grid | O(m · n) | O(m · n) |
| One row + diagonal | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Base cases?</summary>

dp[i][0] = i deletions, dp[0][j] = j insertions.

</details>


<details><summary>Which cell is "insert"?</summary>

Left: b gained a character that a did not have.

</details>


## Connected
- [Delete Operation for Two Strings](Delete%20Operation%20for%20Two%20Strings.md)
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
- [One Edit Distance](../../Strings/Subsequences%20Stacks%20and%20Greedy/One%20Edit%20Distance.md)
