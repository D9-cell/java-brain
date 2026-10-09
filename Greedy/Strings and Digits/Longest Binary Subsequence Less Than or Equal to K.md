---
topic: Strings and Digits
pattern: [Zeros are free, Ones from the right]
source: LeetCode 2311
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Longest Binary Subsequence Less Than or Equal to K

> [!TIP]
> **🧠 Memory hook**
> Leading zeros cost nothing, and a `1` costs its **place value**, which is smallest on the right.
> **Mantra: KEEP ALL ZEROS, ADD ONES FROM THE RIGHT WHILE value ≤ k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=6) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest subsequence of the binary string whose value is at most k.

## Key insight
Take every `0`. Then scan from the right: a `1` at weight `2^len` can be added if the value so far plus that weight stays ≤ k. Ones further left have larger weights and would be added only if it fits.

## Approach 1: Right-to-left scan
```java
// All zeros are free. From the right, add a 1 only while the value it contributes still keeps the number at most k
public int longestSubsequence(String s, int k) {
    int zeros = 0, ones = 0;
    long value = 0, power = 1;
    for (int i = s.length() - 1; i >= 0; i--) {
        if (s.charAt(i) == '0') { zeros++; if (power <= k) power <<= 1; continue; }
        if (power <= k && value + power <= k) { value += power; ones++; }
        if (power <= k) power <<= 1;
    }
    return zeros + ones;
}
```

## Approach 2: Track the current length
```java
// Same idea built on a running length: keep the current length of the chosen suffix and its value
public int longestSubsequenceLength(String s, int k) {
    int len = 0;
    long value = 0;
    for (int i = s.length() - 1; i >= 0; i--) {
        if (s.charAt(i) == '0') len++;
        else if (len < 31 && value + (1L << len) <= k) { value += 1L << len; len++; }
    }
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| Right-to-left scan | O(n) | O(1) |
| Track the current length | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why scan from the right?</summary>

Right-most characters have the smallest weights, so taking them first wastes the least budget.

</details>


## Connected
- [Longest Palindrome by Concatenating Two Letter Words](Longest%20Palindrome%20by%20Concatenating%20Two%20Letter%20Words.md)
