---
topic: Character Counts and Anagrams
pattern: [Balance counter]
source: LeetCode 1704
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Determine if String Halves Are Alike

> [!TIP]
> **🧠 Memory hook**
> One counter: **+1 for a vowel on the left, −1 on the right**. Alike iff it ends at **0**.
> **Mantra: left vowel +1 · right vowel −1 · diff == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=12) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
s has even length. Return true if both halves contain the same number of vowels (either case).

## Key insight
Walking both halves together in one loop avoids two separate counts.

## Approach: Balance
```java
// Vowels in the left half add one, vowels in the right half subtract one
public boolean halvesAreAlike(String s) {
    int n = s.length(), diff = 0;
    for (int i = 0; i < n / 2; i++) {
        if (isVowel(s.charAt(i))) diff++;
        if (isVowel(s.charAt(n / 2 + i))) diff--;
    }
    return diff == 0;
}

// Upper or lower case vowel
boolean isVowel(char c) {
    return "aeiouAEIOU".indexOf(c) >= 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Balance | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why one counter?</summary>

Only the difference matters.

</details>


<details><summary>Upper case?</summary>

The vowel set includes both cases.

</details>


## Connected
- [Sort Vowels in a String](Sort%20Vowels%20in%20a%20String.md)
