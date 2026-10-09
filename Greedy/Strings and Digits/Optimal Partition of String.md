---
topic: Strings and Digits
pattern: [Cut when a letter repeats]
source: LeetCode 2405
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Optimal Partition of String

> [!TIP]
> **🧠 Memory hook**
> Keep extending the piece; **start a new one the moment a letter repeats**.
> **Mantra: EXTEND UNTIL A REPEAT, THEN CUT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=18) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Partition the string into the fewest substrings where every substring has unique letters.

## Key insight
Extending a piece as far as possible never hurts. A set (or bit mask) of the current letters tells when to cut.

## Approach 1: Boolean array
```java
// Extend the current substring until a letter repeats, then start a new substring with it
public int partitionString(String s) {
    boolean[] seen = new boolean[26];
    int parts = 1;
    for (char c : s.toCharArray()) {
        if (seen[c - 'a']) { parts++; Arrays.fill(seen, false); }
        seen[c - 'a'] = true;
    }
    return parts;
}
```

## Approach 2: Bit mask
```java
// Bit mask version: one int holds the letters of the current substring
public int partitionStringMask(String s) {
    int mask = 0, parts = 1;
    for (char c : s.toCharArray()) {
        int bit = 1 << (c - 'a');
        if ((mask & bit) != 0) { parts++; mask = 0; }
        mask |= bit;
    }
    return parts;
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean array | O(n) | O(26) |
| Bit mask | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the first repeat force a cut?</summary>

No piece containing both copies is valid, so a boundary must lie between them, as late as possible.

</details>


## Connected
- [Minimum Time to Make Rope Colorful](Minimum%20Time%20to%20Make%20Rope%20Colorful.md)
