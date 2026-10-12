---
topic: Character Counts and Anagrams
pattern: [First and last index]
source: LeetCode 1930
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Unique Length-3 Palindromic Subsequences

> [!TIP]
> **🧠 Memory hook**
> A palindrome a?a is fixed by its **outer letter** and **middle letter**. Use the **first and last** a, count distinct letters between.
> **Mantra: FOR c: distinct letters in (first[c], last[c])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=17) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return the number of unique palindromes of length 3 that are subsequences of s.

## Key insight
For outer letter c, taking its first and last occurrence gives the widest middle range, so every possible middle letter lies there. At most 26 × n work.

## Approach: Outer letter scan
```java
// For each outer letter take its first and last index; distinct letters between them are the middles
public int countPalindromicSubsequence(String s) {
    int[] first = new int[26], last = new int[26];
    Arrays.fill(first, -1);
    for (int i = 0; i < s.length(); i++) {
        int c = s.charAt(i) - 'a';
        if (first[c] == -1) first[c] = i;
        last[c] = i;
    }
    int count = 0;
    for (int c = 0; c < 26; c++) {
        if (first[c] == -1 || last[c] - first[c] < 2) continue;
        boolean[] seen = new boolean[26];
        for (int i = first[c] + 1; i < last[c]; i++) seen[s.charAt(i) - 'a'] = true;
        for (boolean b : seen) if (b) count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Outer letter scan | O(26 · n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why first and last only?</summary>

Any other pair has a smaller middle range.

</details>


<details><summary>Why distinct middles?</summary>

Each unique palindrome is counted once.

</details>


## Connected
- [Largest Substring Between Two Equal Characters](Largest%20Substring%20Between%20Two%20Equal%20Characters.md)
