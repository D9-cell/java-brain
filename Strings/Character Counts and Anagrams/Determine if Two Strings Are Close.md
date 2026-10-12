---
topic: Character Counts and Anagrams
pattern: [Shape of counts]
source: LeetCode 1657
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Determine if Two Strings Are Close

> [!TIP]
> **🧠 Memory hook**
> Swaps fix the order, relabeling two letters swaps their counts. So: **same set of letters** and **same sorted counts**.
> **Mantra: same letter set · sort(countsA) == sort(countsB)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=5) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Operation 1 swaps any two characters. Operation 2 turns every a into b and every b into a for two existing letters. Return true if word1 can become word2.

## Key insight
Swaps make order irrelevant. Relabeling permutes counts among letters that exist, but never introduces a new letter. These two conditions are also enough.

## Approach: Set + sorted counts
```java
// Same set of letters and the same multiset of frequencies
public boolean closeStrings(String word1, String word2) {
    if (word1.length() != word2.length()) return false;
    int[] a = new int[26], b = new int[26];
    for (char c : word1.toCharArray()) a[c - 'a']++;
    for (char c : word2.toCharArray()) b[c - 'a']++;
    for (int i = 0; i < 26; i++)
        if ((a[i] == 0) != (b[i] == 0)) return false;
    Arrays.sort(a);
    Arrays.sort(b);
    return Arrays.equals(a, b);
}
```

| Approach | Time | Space |
|---|---|---|
| Set + sorted counts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why must the letter sets match?</summary>

Relabeling only works between letters both present.

</details>


<details><summary>Why sort the counts?</summary>

Any permutation of counts is reachable.

</details>


## Connected
- [Valid Anagram](Valid%20Anagram.md)
- [Word Subsets](Word%20Subsets.md)
