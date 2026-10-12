---
topic: Character Counts and Anagrams
pattern: [Parity of counts]
source: LeetCode 3223
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Length of String After Operations

> [!TIP]
> **🧠 Memory hook**
> An operation removes **two copies** of a letter while one stays. A count shrinks to **1 if odd, 2 if even**.
> **Mantra: Σ over letters: c odd → 1 · c even > 0 → 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=16) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Choose index i with an equal character on its left and on its right, and delete the closest equal character on each side. Return the minimum final length.

## Key insight
Any letter with at least 3 copies has a middle copy, and each operation removes 2 copies, keeping parity. It stops at 1 or 2 copies.

## Approach: Counts
```java
// Each operation removes two copies of a letter while one stays; a count ends at 1 if odd, 2 if even
public int minimumLength(String s) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    int len = 0;
    for (int c : cnt)
        if (c > 0) len += c % 2 == 1 ? 1 : 2;
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| Counts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why parity?</summary>

Each operation removes exactly two of one letter.

</details>


<details><summary>Why can 2 copies not shrink?</summary>

Neither copy has the letter on both sides.

</details>


## Connected
- [Construct K Palindrome Strings](Construct%20K%20Palindrome%20Strings.md)
