---
topic: Simulation and Encoding
pattern: [Run-length]
source: LeetCode 3163
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# String Compression III

> [!TIP]
> **🧠 Memory hook**
> Same as compression but **runs are capped at 9**, so every count is one digit and the count comes **before** the letter.
> **Mantra: run up to 9 · append(len).append(c)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=4) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Compress word by repeatedly removing the longest prefix of one repeated character with length at most 9 and appending its length followed by the character.

## Key insight
Stopping the run at 9 splits long runs into several pieces, e.g. 11 a's → "9a2a".

## Approach: Capped runs
```java
// Runs are cut at 9 so every count is a single digit
public String compressedString(String word) {
    StringBuilder sb = new StringBuilder();
    int i = 0;
    while (i < word.length()) {
        int j = i;
        while (j < word.length() && j - i < 9 && word.charAt(j) == word.charAt(i)) j++;
        sb.append(j - i).append(word.charAt(i));
        i = j;
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Capped runs | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>11 a's?</summary>

"9a2a".

</details>


<details><summary>Why cap at 9?</summary>

The count must be a single digit.

</details>


## Connected
- [String Compression](String%20Compression.md)
