---
topic: Strings and Subsequences
pattern: [Weighted deletions, Edit-style grid]
source: LeetCode 712
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum ASCII Delete Sum for Two Strings

> [!TIP]
> **🧠 Memory hook**
> Deletions now **cost the character code**: keep the common subsequence with the heaviest letters.
> **Mantra: MATCH → ↖ · ELSE min(↑ + a[i], ← + b[j])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=5) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the lowest ASCII sum of deleted characters to make the two strings equal.

## Key insight
dp[i][j] = cheapest cost for the prefixes. The first row and column delete everything. A match costs nothing more; otherwise delete the last char of a or of b, paying its code.

## Approach: Cost grid
```java
// dp[i][j] = cheapest deletions to make a[0..i) and b[0..j) equal
public int minimumDeleteSum(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) dp[i][0] = dp[i - 1][0] + a.charAt(i - 1);
    for (int j = 1; j <= n; j++) dp[0][j] = dp[0][j - 1] + b.charAt(j - 1);
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1]
                    : Math.min(dp[i - 1][j] + a.charAt(i - 1), dp[i][j - 1] + b.charAt(j - 1));
    return dp[m][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Cost grid | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is it LCS with weights?</summary>

Yes: total − 2 × heaviest common subsequence.

</details>


<details><summary>Base cases?</summary>

Prefix sums of codes.

</details>


## Connected
- [Delete Operation for Two Strings](Delete%20Operation%20for%20Two%20Strings.md)
- [Edit Distance](Edit%20Distance.md)
