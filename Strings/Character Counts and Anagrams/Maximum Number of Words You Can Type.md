---
topic: Character Counts and Anagrams
pattern: [Lookup set]
source: LeetCode 1935
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Maximum Number of Words You Can Type

> [!TIP]
> **🧠 Memory hook**
> Mark broken letters. A word counts if **none** of its letters is marked.
> **Mantra: broken[] · word has no broken letter → count++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=9) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Some keyboard letters are broken. Return how many words in text can be typed fully.

## Key insight
A boolean array of 26 gives O(1) checks per character.

## Approach: Lookup table
```java
// A word is typeable when none of its letters is broken
public int canBeTypedWords(String text, String brokenLetters) {
    boolean[] broken = new boolean[26];
    for (char c : brokenLetters.toCharArray()) broken[c - 'a'] = true;
    int count = 0;
    for (String w : text.split(" ")) {
        boolean ok = true;
        for (char c : w.toCharArray())
            if (broken[c - 'a']) {
                ok = false;
                break;
            }
        if (ok) count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Lookup table | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why break early?</summary>

One broken letter is enough to skip the word.

</details>


<details><summary>Spaces?</summary>

Words are separated by single spaces, so split(" ") is safe.

</details>


## Connected
- [Check if the Sentence Is Pangram](Check%20if%20the%20Sentence%20Is%20Pangram.md)
