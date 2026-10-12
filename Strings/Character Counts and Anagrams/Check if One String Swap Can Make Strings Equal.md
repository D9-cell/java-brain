---
topic: Character Counts and Anagrams
pattern: [Mismatch positions]
source: LeetCode 1790
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Check if One String Swap Can Make Strings Equal

> [!TIP]
> **🧠 Memory hook**
> At most one swap: **0 mismatches**, or **2 that cross**.
> **Mantra: mismatches = 0 → true · 2 crossing → true · ELSE false**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=14) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return true if at most one swap of two characters in one string makes s1 and s2 equal.

## Key insight
Unlike Buddy Strings, doing nothing is allowed, so equal strings pass directly.

## Approach: Mismatch scan
```java
// Zero mismatches, or exactly two that cross over
public boolean areAlmostEqual(String s1, String s2) {
    int first = -1, second = -1;
    for (int i = 0; i < s1.length(); i++) {
        if (s1.charAt(i) == s2.charAt(i)) continue;
        if (first == -1) first = i;
        else if (second == -1) second = i;
        else return false;
    }
    if (first == -1) return true;
    return second != -1 && s1.charAt(first) == s2.charAt(second) && s1.charAt(second) == s2.charAt(first);
}
```

| Approach | Time | Space |
|---|---|---|
| Mismatch scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Difference from Buddy Strings?</summary>

Here zero swaps is allowed.

</details>


<details><summary>Exactly one mismatch?</summary>

Impossible to fix with a swap.

</details>


## Connected
- [Buddy Strings](Buddy%20Strings.md)
