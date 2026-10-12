---
topic: Strings and Subsequences
pattern: [Boolean grid, Path in a grid]
source: LeetCode 97
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Interleaving String

> [!TIP]
> **🧠 Memory hook**
> A path in the grid: **down = take from s1, right = take from s2**; each step must match the next letter of s3.
> **Mantra: ok[i][j] = (ok[i−1][j] AND s1[i−1] == s3[i+j−1]) OR (ok[i][j−1] AND s2[j−1] == s3[i+j−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=13) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return true if s3 is formed by interleaving s1 and s2 (keeping each one's order).

## Key insight
After using i chars of s1 and j of s2 we have produced s3[0..i + j). The last one came from s1 or from s2. One boolean row is enough.

## Approach 1: Boolean grid
```java
// ok[i][j] = s3[0..i+j) is an interleaving of s1[0..i) and s2[0..j)
public boolean isInterleave(String s1, String s2, String s3) {
    int m = s1.length(), n = s2.length();
    if (m + n != s3.length()) return false;
    boolean[][] ok = new boolean[m + 1][n + 1];
    ok[0][0] = true;
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) {
            if (i > 0 && ok[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) ok[i][j] = true;
            if (j > 0 && ok[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1)) ok[i][j] = true;
        }
    return ok[m][n];
}
```

## Approach 2: One row
```java
// One boolean row
public boolean isInterleaveRow(String s1, String s2, String s3) {
    int m = s1.length(), n = s2.length();
    if (m + n != s3.length()) return false;
    boolean[] ok = new boolean[n + 1];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) {
            if (i == 0 && j == 0) ok[j] = true;
            else ok[j] = (i > 0 && ok[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) || (j > 0 && ok[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
        }
    return ok[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean grid | O(m · n) | O(m · n) |
| One row | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>First check?</summary>

Lengths must add up.

</details>


<details><summary>Why is greedy wrong?</summary>

When both strings offer the same letter, the wrong choice may fail later.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
- [Unique Paths](../Grid%20Paths/Unique%20Paths.md)
