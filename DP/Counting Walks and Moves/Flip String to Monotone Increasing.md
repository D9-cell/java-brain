---
topic: Counting Walks and Moves
pattern: [Two-state DP, Prefix split]
source: LeetCode 926
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Flip String to Monotone Increasing

> [!TIP]
> **🧠 Memory hook**
> Pick the **wall** between the zeros and the ones; fix everything on the wrong side.
> **Mantra: '1' → ones++ · '0' → flips = min(flips + 1, ones)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=9) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
A binary string is monotone increasing if it is some 0s followed by some 1s. Return the minimum number of flips to make s monotone increasing.

## Key insight
Every answer has a split point: ones left of it are flipped to 0, zeros right of it to 1. Scanning once: a new 0 is either flipped (flips + 1) or forces every earlier 1 to flip (ones).

## Approach 1: One pass DP
```java
// One pass: a '0' after some '1's is either flipped or all earlier '1's are
public int minFlipsMonoIncr(String s) {
    int ones = 0, flips = 0;
    for (char c : s.toCharArray()) {
        if (c == '1') ones++;
        else flips = Math.min(flips + 1, ones);
    }
    return flips;
}
```

## Approach 2: Try every split
```java
// Try every split: ones on the left plus zeros on the right
public int minFlipsSplit(String s) {
    int zerosRight = 0;
    for (char c : s.toCharArray()) if (c == '0') zerosRight++;
    int best = zerosRight, onesLeft = 0;
    for (char c : s.toCharArray()) {
        if (c == '1') onesLeft++; else zerosRight--;
        best = Math.min(best, onesLeft + zerosRight);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| One pass DP | O(n) | O(1) |
| Try every split | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>What does `ones` mean in the DP?</summary>

The cost if every character so far must become 0.

</details>


<details><summary>Related?</summary>

Minimum Deletions to Make String Balanced is the same problem with a and b.

</details>


## Connected
- [Minimum Deletions to Make String Balanced](../../Stack/Minimum%20Deletions%20to%20Make%20String%20Balanced.md)
- [Maximum Alternating Subsequence Sum](Maximum%20Alternating%20Subsequence%20Sum.md)
