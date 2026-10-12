---
topic: Words Parsing and Formatting
pattern: [Word boundaries]
source: LeetCode 151
difficulty: Medium
companies: [Microsoft, Amazon, Bloomberg]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Reverse Words in a String

> [!TIP]
> **🧠 Memory hook**
> Walk **from the right**, find each word's start and end, append it with **one space** between words.
> **Mantra: skip spaces · end = i · move to word start · append s[i+1..end]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=1) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Reverse the order of words in s. Remove leading and trailing spaces and reduce multiple spaces to one.

## Key insight
Reading words right to left produces them in reversed order directly. Extra spaces are never copied, so cleaning is automatic.

## Approach: Right-to-left words
```java
// Walk words from the right and append them with single spaces
public String reverseWords(String s) {
    StringBuilder sb = new StringBuilder();
    int i = s.length() - 1;
    while (i >= 0) {
        while (i >= 0 && s.charAt(i) == ' ') i--;
        if (i < 0) break;
        int end = i;
        while (i >= 0 && s.charAt(i) != ' ') i--;
        if (sb.length() > 0) sb.append(' ');
        sb.append(s, i + 1, end + 1);
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Right-to-left words | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Library version?</summary>

trim, split on runs of spaces, reverse the list, join with one space.

</details>


<details><summary>In-place version?</summary>

See Reverse Words in a String II: reverse all, then each word.

</details>


## Connected
- [Reverse Words in a String II](Reverse%20Words%20in%20a%20String%20II.md)
- [Reverse Words in a String III](Reverse%20Words%20in%20a%20String%20III.md)
