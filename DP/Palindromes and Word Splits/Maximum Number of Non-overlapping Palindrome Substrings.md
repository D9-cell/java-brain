---
topic: Palindromes and Word Splits
pattern: [Prefix + last piece, Shortest pieces suffice]
source: LeetCode 2472
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Number of Non-overlapping Palindrome Substrings

> [!TIP]
> **🧠 Memory hook**
> A long palindrome contains a **shorter one of length k or k + 1** at its centre that ends earlier: only those two lengths matter.
> **Mantra: dp[i] = max(dp[i − 1], dp[i − k] + 1, dp[i − k − 1] + 1) IF PALINDROMES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=4) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Choose non-overlapping substrings of s, each a palindrome of length at least k. Return the maximum number.

## Key insight
dp[i] is the answer for s[0..i). Either s[i − 1] is unused, or a palindrome ends at i. Trimming one letter from both ends of a palindrome keeps it a palindrome, so a palindrome of length ≥ k + 2 can be replaced by its central part of length k or k + 1, which leaves more room.

## Approach: Two lengths per end
```java
// dp[i] = best for s[0..i); only palindromes of length k or k + 1 need to be tried
public int maxPalindromes(String s, int k) {
    int n = s.length();
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i - 1];
        for (int len = k; len <= k + 1; len++)
            if (i - len >= 0 && isPal(s, i - len, i - 1)) dp[i] = Math.max(dp[i], dp[i - len] + 1);
    }
    return dp[n];
}

// Whether s[i..j] reads the same both ways
private boolean isPal(String s, int i, int j) {
    while (i < j) if (s.charAt(i++) != s.charAt(j--)) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Two lengths per end | O(n · k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why k and k + 1?</summary>

Trimming 2 letters keeps parity, so both parities need a base length.

</details>


<details><summary>Greedy view?</summary>

Take the palindrome that ends earliest, like interval scheduling.

</details>


## Connected
- [Palindrome Partitioning II](Palindrome%20Partitioning%20II.md)
- [Non-overlapping Intervals](../../Greedy/Intervals%20and%20Scheduling/Non-overlapping%20Intervals.md)
