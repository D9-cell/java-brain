---
topic: Words Parsing and Formatting
pattern: [Count capitals]
source: LeetCode 520
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Detect Capital

> [!TIP]
> **🧠 Memory hook**
> Count capitals: **0**, **all**, or **exactly one at the start**.
> **Mantra: caps == 0 || caps == n || (caps == 1 && first upper)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=14) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Capital usage is right if all letters are capitals, none are, or only the first letter is. Return whether word uses capitals correctly.

## Key insight
The three cases are all about the number of capitals and, in one case, its position.

## Approach: Count capitals
```java
// Valid when capitals are 0, all letters, or just the first letter
public boolean detectCapitalUse(String word) {
    int caps = 0;
    for (char c : word.toCharArray())
        if (Character.isUpperCase(c)) caps++;
    return caps == 0 || caps == word.length() || (caps == 1 && Character.isUpperCase(word.charAt(0)));
}
```

| Approach | Time | Space |
|---|---|---|
| Count capitals | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>"G"?</summary>

One capital at the start: valid.

</details>


<details><summary>"fLAG"?</summary>

Three capitals, not at the start: invalid.

</details>


## Connected
- [Valid Word](../Character%20Counts%20and%20Anagrams/Valid%20Word.md)
