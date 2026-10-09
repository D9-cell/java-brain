---
topic: Strings and Subsequences
pattern: [LCS reduction, Direct grid]
source: LeetCode 583
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Delete Operation for Two Strings

> [!TIP]
> **🧠 Memory hook**
> Whatever survives the deletions is a **common subsequence**; keep the longest.
> **Mantra: ANSWER = m + n − 2 · LCS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=4) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of deletions (one character from either string per step) to make the strings equal.

## Key insight
Deleting until equal leaves a common subsequence; the fewer deletions, the longer it is. The direct table gives the same: match → diagonal, else 1 + min(up, left).

## Approach 1: Via LCS
```java
// What survives is a common subsequence, so keep the longest one
public int minDistance(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return m + n - 2 * dp[m][n];
}
```

## Approach 2: Direct deletions
```java
// Direct DP: dp[i][j] = deletions to make the two prefixes equal
public int minDistanceDirect(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = i + j;
            else if (a.charAt(i - 1) == b.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    return dp[m][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Via LCS | O(m · n) | O(m · n) |
| Direct deletions | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Base row?</summary>

dp[i][0] = i: delete everything.

</details>


<details><summary>Weighted version?</summary>

Minimum ASCII Delete Sum.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
- [Minimum ASCII Delete Sum for Two Strings](Minimum%20ASCII%20Delete%20Sum%20for%20Two%20Strings.md)
- [Edit Distance](Edit%20Distance.md)
