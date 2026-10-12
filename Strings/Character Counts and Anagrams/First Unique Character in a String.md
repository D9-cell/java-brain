---
topic: Character Counts and Anagrams
pattern: [Count then scan]
source: LeetCode 387
difficulty: Easy
companies: [Amazon, Bloomberg, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# First Unique Character in a String

> [!TIP]
> **🧠 Memory hook**
> Pass 1 counts, pass 2 returns the **first index whose count is 1**.
> **Mantra: count · FOR i: cnt[s[i]] == 1 → i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=2) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return the index of the first non-repeating character in s, or -1.

## Key insight
The second pass walks s in order, so the first hit is the earliest unique letter.

## Approach: Two passes
```java
// Count every letter, then return the first index whose letter appears once
public int firstUniqChar(String s) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    for (int i = 0; i < s.length(); i++)
        if (cnt[s.charAt(i) - 'a'] == 1) return i;
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why two passes?</summary>

A letter's uniqueness is only known after seeing the whole string.

</details>


<details><summary>Stream version?</summary>

Keep a queue of candidates and pop those that repeat.

</details>


## Connected
- [Valid Anagram](Valid%20Anagram.md)
