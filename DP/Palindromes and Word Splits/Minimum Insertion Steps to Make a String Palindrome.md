---
topic: Palindromes and Word Splits
pattern: [Range DP, n − LPS]
source: LeetCode 1312
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum Insertion Steps to Make a String Palindrome

> [!TIP]
> **🧠 Memory hook**
> Every letter outside the longest palindromic subsequence **needs a partner** inserted.
> **Mantra: ENDS EQUAL → INNER · ELSE 1 + min(DROP LEFT, DROP RIGHT)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=5) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of characters to insert anywhere in s to make it a palindrome.

## Key insight
Range DP: equal ends cost nothing; otherwise insert a copy of one end next to the other side and solve the rest. The answer equals n − LPS(s).

## Approach: Range DP
```java
// Interval DP: equal ends cost nothing, otherwise insert a partner for one end
public int minInsertions(String s) {
    int n = s.length();
    int[][] dp = new int[n][n];
    for (int i = n - 1; i >= 0; i--)
        for (int j = i + 1; j < n; j++)
            dp[i][j] = s.charAt(i) == s.charAt(j) ? dp[i + 1][j - 1] : 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
    return n == 0 ? 0 : dp[0][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Range DP | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why n − LPS?</summary>

Letters in the LPS already pair up; each other letter needs one inserted twin.

</details>


<details><summary>Deletions instead?</summary>

Same number.

</details>


## Connected
- [Longest Palindromic Subsequence](Longest%20Palindromic%20Subsequence.md)
- [Shortest Common Supersequence](../Strings%20and%20Subsequences/Shortest%20Common%20Supersequence.md)
