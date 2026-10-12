---
topic: Character Counts and Anagrams
pattern: [Character classes]
source: LeetCode 3136
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Valid Word

> [!TIP]
> **🧠 Memory hook**
> Four rules: **length ≥ 3**, only **letters and digits**, at least one **vowel**, at least one **consonant**.
> **Mantra: len ≥ 3 · no symbol · vowel && consonant**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=19) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
A word is valid if it has at least 3 characters, contains only digits and English letters, and includes at least one vowel and one consonant. Return whether word is valid.

## Key insight
One pass records the two flags and rejects any other character immediately.

## Approach: One pass
```java
// At least 3 characters, only letters and digits, at least one vowel and one consonant
public boolean isValid(String word) {
    if (word.length() < 3) return false;
    boolean vowel = false, consonant = false;
    for (char c : word.toCharArray()) {
        if (Character.isDigit(c)) continue;
        if (!Character.isLetter(c)) return false;
        if ("aeiouAEIOU".indexOf(c) >= 0) vowel = true;
        else consonant = true;
    }
    return vowel && consonant;
}
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Is a digit a consonant?</summary>

No, digits count toward neither.

</details>


<details><summary>Why early return on a symbol?</summary>

The word is invalid regardless of the rest.

</details>


## Connected
- [Detect Capital](../Words%20Parsing%20and%20Formatting/Detect%20Capital.md)
