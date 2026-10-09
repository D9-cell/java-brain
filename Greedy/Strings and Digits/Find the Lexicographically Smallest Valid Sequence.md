---
topic: Strings and Digits
pattern: [Suffix match table, One allowed mismatch]
source: LeetCode 3302
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Find the Lexicographically Smallest Valid Sequence

> [!TIP]
> **🧠 Memory hook**
> Take the smallest index whenever it matches; **spend the single mismatch as early as it is safe**.
> **Mantra: MATCH GREEDILY, SPEND THE CHANGE WHEN suffix[i+1] STILL FITS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=2) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Choose ascending indices of `word1` so that the picked letters are almost equal to `word2` (at most one letter differs). Return the lexicographically smallest index array, or an empty array.

## Key insight
Precompute `suffix[i]` = how many trailing letters of word2 can be matched inside `word1[i..]`. Scan left to right: if letters match take the index; otherwise, if the change is unused and `suffix[i+1]` covers the remaining word2 letters, take the index and consume the change.

## Approach: Greedy with suffix table
```java
// Take index i when it matches; spend the single allowed mismatch at the first index where the suffix after it can still match the rest of word2
public int[] validSequence(String word1, String word2) {
    int n = word1.length(), m = word2.length();
    int[] suffix = new int[n + 1];
    for (int i = n - 1, j = m - 1, matched = 0; i >= 0; i--) {
        if (j >= 0 && word1.charAt(i) == word2.charAt(j)) { matched++; j--; }
        suffix[i] = matched;
    }
    int[] seq = new int[m];
    int idx = 0;
    boolean canChange = true;
    for (int i = 0, j = 0; i < n && j < m; i++) {
        if (word1.charAt(i) == word2.charAt(j)) { seq[idx++] = i; j++; }
        else if (canChange && i + 1 <= n && suffix[i + 1] >= m - j - 1) { seq[idx++] = i; j++; canChange = false; }
    }
    return idx == m ? seq : new int[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy with suffix table | O(n + m) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can the mismatch be spent as early as possible?</summary>

An earlier index is lexicographically smaller, and the suffix table guarantees the rest can still be matched.

</details>


## Connected
- [Lexicographically Smallest Generated String](Lexicographically%20Smallest%20Generated%20String.md)
