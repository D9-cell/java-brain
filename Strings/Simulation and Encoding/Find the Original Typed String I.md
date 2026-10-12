---
topic: Simulation and Encoding
pattern: [Run counting]
source: LeetCode 3330
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find the Original Typed String I

> [!TIP]
> **🧠 Memory hook**
> At most one key was held too long. Original = word itself, or one run shortened: **1 + Σ (run − 1)**, i.e. **1 + adjacent equal pairs**.
> **Mantra: 1 + count(word[i] == word[i−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=13) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Alice may have held a key too long at most once, producing extra copies of one character. Return how many original strings are possible.

## Key insight
If the long press happened in a run of length L, the original run had any length from 1 to L − 1, giving L − 1 originals. Summing L − 1 over all runs counts adjacent equal pairs.

## Approach: Count pairs
```java
// Either nothing was held, or one run of length L was held: L - 1 choices per run
public int possibleStringCount(String word) {
    int count = 1;
    for (int i = 1; i < word.length(); i++)
        if (word.charAt(i) == word.charAt(i - 1)) count++;
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Count pairs | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why +1?</summary>

Nothing may have been held too long.

</details>


<details><summary>"abbcccc"?</summary>

1 + 1 + 3 = 5.

</details>


## Connected
- [String Compression](String%20Compression.md)
