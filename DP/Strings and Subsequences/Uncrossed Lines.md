---
topic: Strings and Subsequences
pattern: [LCS in disguise]
source: LeetCode 1035
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Uncrossed Lines

> [!TIP]
> **🧠 Memory hook**
> Lines between equal numbers that **never cross** must keep the order on both sides: that is a common subsequence.
> **Mantra: SAME TABLE AS LCS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=6) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Two rows of numbers; draw lines between equal numbers (each number in at most one line) so that no two lines cross. Return the maximum number of lines.

## Key insight
Non-crossing means if line (i1, j1) is left of (i2, j2) then i1 < i2 and j1 < j2: exactly a common subsequence.

## Approach: LCS with two rows
```java
// Non-crossing lines between equal values are exactly a common subsequence
public int maxUncrossedLines(int[] a, int[] b) {
    int[] prev = new int[b.length + 1], cur = new int[b.length + 1];
    for (int i = 1; i <= a.length; i++) {
        for (int j = 1; j <= b.length; j++) cur[j] = a[i - 1] == b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
        int[] t = prev; prev = cur; cur = t;
    }
    return prev[b.length];
}
```

| Approach | Time | Space |
|---|---|---|
| LCS with two rows | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why exactly LCS?</summary>

Increasing in both rows = subsequence of both.

</details>


<details><summary>Space?</summary>

Two rows of the LCS table.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
