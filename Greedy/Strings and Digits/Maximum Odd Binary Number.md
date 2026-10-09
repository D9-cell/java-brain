---
topic: Strings and Digits
pattern: [Reserve the last bit]
source: LeetCode 2864
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Odd Binary Number

> [!TIP]
> **🧠 Memory hook**
> Reserve **one `1` for the last bit** (so it is odd) and put all the others first.
> **Mantra: ONES − 1 FIRST, ZEROS, THEN A 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=25) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Rearrange the bits so the binary number is odd and as large as possible.

## Key insight
The number is odd only if the last bit is 1. To maximise, place the other ones at the front, then the zeros.

## Approach 1: Counting
```java
// One '1' must be last to make the number odd; all other ones go to the front
public String maximumOddBinaryNumber(String s) {
    int ones = 0;
    for (char c : s.toCharArray()) if (c == '1') ones++;
    return "1".repeat(ones - 1) + "0".repeat(s.length() - ones) + "1";
}
```

## Approach 2: Two pointers
```java
// Two pointers that place ones from the left and the last one at the end
public String maximumOddBinaryNumberTwoPointers(String s) {
    char[] c = s.toCharArray();
    int left = 0;
    for (int i = 0; i < c.length; i++) if (c[i] == '1') { char t = c[left]; c[left] = c[i]; c[i] = t; left++; }
    char t = c[left - 1]; c[left - 1] = c[c.length - 1]; c[c.length - 1] = t;
    return new String(c);
}
```

| Approach | Time | Space |
|---|---|---|
| Counting | O(n) | O(n) |
| Two pointers | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the string always contain a 1?</summary>

The problem guarantees at least one `1`.

</details>


## Connected
- [Maximum 69 Number](Maximum%2069%20Number.md)
