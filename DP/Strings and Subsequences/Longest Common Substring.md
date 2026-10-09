---
topic: Strings and Subsequences
pattern: [Contiguous match, Reset on mismatch]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Longest Common Substring

> [!TIP]
> **🧠 Memory hook**
> Like LCS, but a mismatch **breaks the chain**: the cell becomes 0.
> **Mantra: MATCH → ↖ + 1 · ELSE 0; ANSWER = MAX CELL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=2) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest common substring (contiguous) of two strings, and print one.

## Key insight
dp[i][j] is the length of the longest common suffix of a[0..i) and b[0..j). It extends the diagonal on a match and resets to 0 otherwise. The answer is the maximum anywhere; remember where it ends to print it.

## Approach 1: Suffix table
```java
// dp[i][j] = length of the common suffix of a[0..i) and b[0..j); a mismatch resets to 0
public int longestCommonSubstr(String a, String b) {
    int best = 0;
    int[][] dp = new int[a.length() + 1][b.length() + 1];
    for (int i = 1; i <= a.length(); i++)
        for (int j = 1; j <= b.length(); j++)
            if (a.charAt(i - 1) == b.charAt(j - 1)) best = Math.max(best, dp[i][j] = dp[i - 1][j - 1] + 1);
    return best;
}
```

## Approach 2: Print the substring
```java
// Same table, remembering where the best suffix ends so it can be printed
public String printLongestCommonSubstr(String a, String b) {
    int best = 0, end = 0;
    int[][] dp = new int[a.length() + 1][b.length() + 1];
    for (int i = 1; i <= a.length(); i++)
        for (int j = 1; j <= b.length(); j++)
            if (a.charAt(i - 1) == b.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > best) { best = dp[i][j]; end = i; }
            }
    return a.substring(end - best, end);
}
```

| Approach | Time | Space |
|---|---|---|
| Suffix table | O(m · n) | O(m · n) |
| Print the substring | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the answer not dp[m][n]?</summary>

The common substring can end anywhere.

</details>


<details><summary>Faster for long strings?</summary>

Suffix automaton or binary search + hashing.

</details>


## Connected
- [Maximum Length of Repeated Subarray](Maximum%20Length%20of%20Repeated%20Subarray.md)
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
