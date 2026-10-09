---
topic: Strings and Subsequences
pattern: [Counting, Column frequencies]
source: LeetCode 1639
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Number of Ways to Form a Target String Given a Dictionary

> [!TIP]
> **🧠 Memory hook**
> Only **the column and the letter** matter, not which word: count letters per column first.
> **Mantra: ways[i] += ways[i − 1] · freq[col][target[i − 1]] (i DOWN)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=14) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Words have equal length. Build target left to right; each letter is taken from some word at column k, and later letters must use columns strictly to the right. Count the ways modulo 1e9+7.

## Key insight
Precompute freq[col][c]. Process columns left to right; column col can provide target[i − 1] after any way that built target[0..i − 1) in earlier columns. Scanning i downward uses each column once.

## Approach: Counting row over columns
```java
// freq[col][c] counts words with letter c in column col; ways[i] = ways to have built target[0..i)
public int numWays(String[] words, String target) {
    int L = words[0].length(), m = target.length();
    long[][] freq = new long[L][26];
    for (String w : words) for (int c = 0; c < L; c++) freq[c][w.charAt(c) - 'a']++;
    long[] ways = new long[m + 1];
    ways[0] = 1;
    for (int col = 0; col < L; col++)
        for (int i = Math.min(m, col + 1); i >= 1; i--)
            ways[i] = (ways[i] + ways[i - 1] * freq[col][target.charAt(i - 1) - 'a']) % MOD;
    return (int) ways[m];
}
```

| Approach | Time | Space |
|---|---|---|
| Counting row over columns | O(L · (m + 26) + words · L) | O(L · 26 + m) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why frequencies?</summary>

Any word with that letter in that column gives a distinct way.

</details>


<details><summary>Why i downward?</summary>

A column provides at most one letter.

</details>


## Connected
- [Distinct Subsequences](Distinct%20Subsequences.md)
