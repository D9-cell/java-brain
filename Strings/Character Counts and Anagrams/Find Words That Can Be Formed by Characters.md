---
topic: Character Counts and Anagrams
pattern: [Budget counts]
source: LeetCode 1160
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Words That Can Be Formed by Characters

> [!TIP]
> **🧠 Memory hook**
> chars is a **budget** of letters. A word fits if it never needs more of a letter than the budget has.
> **Mantra: have = counts(chars) · per word: ++need > have → reject**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=3) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
A word is good if it can be formed from the characters in chars (each used once). Return the sum of the lengths of good words.

## Key insight
Each word gets fresh need counts. Stopping as soon as one letter goes over the budget keeps it fast.

## Approach: Counts per word
```java
// A word fits if no letter is needed more often than chars provides
public int countCharacters(String[] words, String chars) {
    int[] have = new int[26];
    for (char c : chars.toCharArray()) have[c - 'a']++;
    int total = 0;
    for (String w : words) {
        int[] need = new int[26];
        boolean ok = true;
        for (char c : w.toCharArray())
            if (++need[c - 'a'] > have[c - 'a']) {
                ok = false;
                break;
            }
        if (ok) total += w.length();
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Counts per word | O(total length) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why fresh counts per word?</summary>

Words are checked independently; chars is not used up between them.

</details>


<details><summary>Early exit?</summary>

The first over-budget letter decides.

</details>


## Connected
- [Maximum Number of Balloons](../../Mathematical/Digits%20and%20Powers/Maximum%20Number%20of%20Balloons.md)
- [Word Subsets](Word%20Subsets.md)
