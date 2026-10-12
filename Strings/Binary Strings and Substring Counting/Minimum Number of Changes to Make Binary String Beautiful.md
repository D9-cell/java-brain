---
topic: Binary Strings and Substring Counting
pattern: [Fixed pairs]
source: LeetCode 2914
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Number of Changes to Make Binary String Beautiful

> [!TIP]
> **🧠 Memory hook**
> Any even-length all-same partition can be cut into **pairs**. So just fix every **unequal pair** (one change each).
> **Mantra: FOR i += 2: s[i] != s[i+1] → changes++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=6) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
A string is beautiful if it can be split into substrings of even length, each all 0s or all 1s. Return the minimum number of flips.

## Key insight
An even block of one digit splits into pairs of that digit, so splitting into pairs never loses. A pair needs a change exactly when its two characters differ.

## Approach: Pair scan
```java
// Cutting into pairs is always optimal; every unequal pair costs one change
public int minChanges(String s) {
    int changes = 0;
    for (int i = 0; i < s.length(); i += 2)
        if (s.charAt(i) != s.charAt(i + 1)) changes++;
    return changes;
}
```

| Approach | Time | Space |
|---|---|---|
| Pair scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why are pairs enough?</summary>

Every valid block is a union of equal pairs.

</details>


<details><summary>Cost of a mixed pair?</summary>

One flip.

</details>


## Connected
- [Minimum Changes To Make Alternating Binary String](Minimum%20Changes%20To%20Make%20Alternating%20Binary%20String.md)
