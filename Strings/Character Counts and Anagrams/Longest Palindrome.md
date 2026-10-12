---
topic: Character Counts and Anagrams
pattern: [Parity of counts]
source: LeetCode 409
difficulty: Easy
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Longest Palindrome

> [!TIP]
> **🧠 Memory hook**
> Use **every pair** of each letter; if any letter has a leftover, **one** can sit in the middle.
> **Mantra: Σ (c / 2 · 2) + (any odd ? 1 : 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=10) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest palindrome that can be built from the letters of s (case-sensitive).

## Key insight
A palindrome mirrors pairs around a centre. Only one letter can appear an odd number of times.

## Approach: Count pairs
```java
// Use every pair; one leftover odd letter can sit in the middle
public int longestPalindrome(String s) {
    int[] cnt = new int[128];
    for (char c : s.toCharArray()) cnt[c]++;
    int len = 0;
    boolean odd = false;
    for (int c : cnt) {
        len += c / 2 * 2;
        if (c % 2 == 1) odd = true;
    }
    return odd ? len + 1 : len;
}
```

| Approach | Time | Space |
|---|---|---|
| Count pairs | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why add only one for odds?</summary>

There is only one centre.

</details>


<details><summary>Case-sensitive?</summary>

Yes, A and a are different, hence the 128 array.

</details>


## Connected
- [Construct K Palindrome Strings](Construct%20K%20Palindrome%20Strings.md)
- [Longest Palindrome by Concatenating Two Letter Words](../../HashMap/Longest%20Palindrome%20by%20Concatenating%20Two%20Letter%20Words.md)
