---
topic: Palindromes and Word Splits
pattern: [Prefix + last piece, Palindrome table]
source: LeetCode 132
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Palindrome Partitioning II

> [!TIP]
> **🧠 Memory hook**
> The last piece of the cut must be a palindrome: **cuts[j] = cuts[i − 1] + 1** for every palindrome s[i..j].
> **Mantra: pal[i][j] → cuts[j] = i == 0 ? 0 : min(cuts[i − 1] + 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=3) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of cuts so every piece of s is a palindrome.

## Key insight
cuts[j] is the answer for s[0..j]. The last piece is some palindrome s[i..j]: no cut if it starts at 0, otherwise one cut after the best split of s[0..i − 1]. Building pal[][] in the same loops keeps it O(n²).

## Approach: Table + cuts
```java
// Palindrome table, then cuts[j] = min over palindromes s[i..j] of cuts[i - 1] + 1
public int minCut(String s) {
    int n = s.length();
    boolean[][] pal = new boolean[n][n];
    int[] cuts = new int[n];
    for (int j = 0; j < n; j++) {
        cuts[j] = j;
        for (int i = 0; i <= j; i++)
            if (s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1])) {
                pal[i][j] = true;
                cuts[j] = i == 0 ? 0 : Math.min(cuts[j], cuts[i - 1] + 1);
            }
    }
    return cuts[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Table + cuts | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why fill pal while scanning j?</summary>

pal[i + 1][j − 1] belongs to an earlier column, so it is ready.

</details>


<details><summary>Listing all partitions?</summary>

Palindrome Partitioning (backtracking).

</details>


## Connected
- [Palindromic Substrings](Palindromic%20Substrings.md)
- [Word Break](Word%20Break.md)
- [Maximum Number of Non-overlapping Palindrome Substrings](Maximum%20Number%20of%20Non-overlapping%20Palindrome%20Substrings.md)
