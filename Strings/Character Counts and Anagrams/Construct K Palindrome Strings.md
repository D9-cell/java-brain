---
topic: Character Counts and Anagrams
pattern: [Parity of counts]
source: LeetCode 1400
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Construct K Palindrome Strings

> [!TIP]
> **🧠 Memory hook**
> Each palindrome can absorb **one odd letter**. Possible iff **odd count ≤ k ≤ length**.
> **Mantra: k > n → false · odd ≤ k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=11) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return true if all characters of s can be used to build exactly k non-empty palindromes.

## Key insight
Every odd-count letter needs its own palindrome centre, so at least that many palindromes. Extra palindromes can be split off from pairs or single letters, up to n.

## Approach: Count odds
```java
// Each palindrome holds at most one odd letter, so need odd count <= k <= length
public boolean canConstruct(String s, int k) {
    if (k > s.length()) return false;
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    int odd = 0;
    for (int c : cnt) odd += c % 2;
    return odd <= k;
}
```

| Approach | Time | Space |
|---|---|---|
| Count odds | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is odd ≤ k enough?</summary>

Put one odd letter in each of the first palindromes, split pairs to create more.

</details>


<details><summary>Why k ≤ n?</summary>

Each palindrome needs at least one character.

</details>


## Connected
- [Longest Palindrome](Longest%20Palindrome.md)
