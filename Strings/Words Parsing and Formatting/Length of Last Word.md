---
topic: Words Parsing and Formatting
pattern: [Scan from the end]
source: LeetCode 58
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Length of Last Word

> [!TIP]
> **🧠 Memory hook**
> Start at the end, **skip trailing spaces**, then count letters until the next space.
> **Mantra: skip spaces from the right · count until space**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=0) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Return the length of the last word in s (words are separated by spaces; there may be trailing spaces).

## Key insight
Scanning from the right touches only the last word and the spaces after it.

## Approach: Backward scan
```java
// Skip trailing spaces from the end, then count letters until the next space
public int lengthOfLastWord(String s) {
    int i = s.length() - 1, len = 0;
    while (i >= 0 && s.charAt(i) == ' ') i--;
    while (i >= 0 && s.charAt(i) != ' ') {
        len++;
        i--;
    }
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| Backward scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not split?</summary>

split allocates every word; the scan touches only the end.

</details>


<details><summary>Trailing spaces?</summary>

The first loop skips them.

</details>


## Connected
- [Reverse Words in a String](Reverse%20Words%20in%20a%20String.md)
