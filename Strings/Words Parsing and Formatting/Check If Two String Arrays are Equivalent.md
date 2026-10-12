---
topic: Words Parsing and Formatting
pattern: [Pointers across pieces]
source: LeetCode 1662
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Check If Two String Arrays are Equivalent

> [!TIP]
> **🧠 Memory hook**
> Compare without concatenating: **(word, char) pointers** on both sides advance one character at a time.
> **Mantra: compare chars · advance c, wrap to next word · both must end together**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=7) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Return true if the concatenation of word1 equals the concatenation of word2.

## Key insight
Each side keeps a word index and a character index. When a character index reaches the end of its word, move to the next word. Both sides must finish at the same time.

## Approach: Four pointers
```java
// Four pointers walk both arrays character by character without building strings
public boolean arrayStringsAreEqual(String[] word1, String[] word2) {
    int w1 = 0, c1 = 0, w2 = 0, c2 = 0;
    while (w1 < word1.length && w2 < word2.length) {
        if (word1[w1].charAt(c1) != word2[w2].charAt(c2)) return false;
        if (++c1 == word1[w1].length()) {
            w1++;
            c1 = 0;
        }
        if (++c2 == word2[w2].length()) {
            w2++;
            c2 = 0;
        }
    }
    return w1 == word1.length && w2 == word2.length;
}
```

| Approach | Time | Space |
|---|---|---|
| Four pointers | O(total) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Simpler version?</summary>

String.join both and compare, using O(total) memory.

</details>


<details><summary>Empty words?</summary>

Constraints guarantee non-empty words.

</details>


## Connected
- [Sentence Similarity III](Sentence%20Similarity%20III.md)
