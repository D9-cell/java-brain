---
topic: Character Counts and Anagrams
pattern: [XOR cancel]
source: LeetCode 389
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find the Difference

> [!TIP]
> **🧠 Memory hook**
> t is s shuffled plus one letter. **XOR every character** of both: pairs cancel, the extra letter remains.
> **Mantra: x ^= every char of s and t · RETURN (char) x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=1) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
t is built by shuffling s and adding one more letter. Return that letter.

## Key insight
XOR is its own inverse and order does not matter, so all letters of s cancel with their copies in t. Summing codes and subtracting works too.

## Approach: XOR
```java
// XOR all letters of both strings; every paired letter cancels
public char findTheDifference(String s, String t) {
    int x = 0;
    for (char c : s.toCharArray()) x ^= c;
    for (char c : t.toCharArray()) x ^= c;
    return (char) x;
}
```

| Approach | Time | Space |
|---|---|---|
| XOR | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Sum version?</summary>

sum(t) − sum(s) is the extra letter's code.

</details>


<details><summary>Same trick elsewhere?</summary>

Missing Number pairs indexes with values.

</details>


## Connected
- [Valid Anagram](Valid%20Anagram.md)
- [Missing Number](../../Mathematical/Digits%20and%20Powers/Missing%20Number.md)
