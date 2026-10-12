---
topic: Words Parsing and Formatting
pattern: [Prefix reverse]
source: LeetCode 2000
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Reverse Prefix of Word

> [!TIP]
> **🧠 Memory hook**
> Find the **first ch**; reverse word[0..j] and keep the rest.
> **Mantra: j = indexOf(ch) · j < 0 → word · reverse(0..j) + rest**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=4) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Reverse the segment of word from index 0 to the first occurrence of ch (inclusive). If ch is absent return word.

## Key insight
indexOf finds the end of the prefix; StringBuilder.reverse does the rest.

## Approach: indexOf + reverse
```java
// Reverse word[0..first ch] if ch occurs
public String reversePrefix(String word, char ch) {
    int j = word.indexOf(ch);
    if (j == -1) return word;
    return new StringBuilder(word.substring(0, j + 1)).reverse() + word.substring(j + 1);
}
```

| Approach | Time | Space |
|---|---|---|
| indexOf + reverse | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Missing ch?</summary>

Return word unchanged.

</details>


<details><summary>Inclusive?</summary>

Yes, ch itself moves to the front.

</details>


## Connected
- [Reverse Words in a String III](Reverse%20Words%20in%20a%20String%20III.md)
