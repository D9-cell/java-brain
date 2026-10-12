---
topic: Character Counts and Anagrams
pattern: [First index]
source: LeetCode 1624
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Largest Substring Between Two Equal Characters

> [!TIP]
> **🧠 Memory hook**
> For each letter keep its **first index**; every later copy gives a gap of **i − first − 1**.
> **Mantra: first[c] == −1 → set · ELSE best = max(i − first − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=15) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest substring between two equal characters (excluding them), or -1.

## Key insight
The widest gap for a letter is between its first and last copy, and the scan meets the last copy last.

## Approach: First index
```java
// Remember each letter's first index; the gap to a later copy is i - first - 1
public int maxLengthBetweenEqualCharacters(String s) {
    int[] first = new int[26];
    Arrays.fill(first, -1);
    int best = -1;
    for (int i = 0; i < s.length(); i++) {
        int c = s.charAt(i) - 'a';
        if (first[c] == -1) first[c] = i;
        else best = Math.max(best, i - first[c] - 1);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| First index | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why never update first?</summary>

The earliest copy gives the widest gap.

</details>


<details><summary>Adjacent equal letters?</summary>

Gap 0, which beats −1.

</details>


## Connected
- [Unique Length-3 Palindromic Subsequences](Unique%20Length-3%20Palindromic%20Subsequences.md)
