---
topic: Strings and Digits
pattern: [Fill from the right, Left stays small]
source: LeetCode 1663
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Smallest String With A Given Numeric Value

> [!TIP]
> **🧠 Memory hook**
> Start with all `a` and push the remaining value onto the **rightmost** letters as `z`.
> **Mantra: k − n EXTRA, SPEND 25 AT A TIME FROM THE RIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=23) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the lexicographically smallest string of length n whose letters sum (a = 1 … z = 26) to k.

## Key insight
All letters start as `a`. The remaining `k - n` must be added; each position can take at most 25 extra. Adding to the rightmost positions first keeps the left letters small.

## Approach 1: Fill from the right
```java
// Start with all 'a'; then fill from the right with as many 'z' as possible so the left stays small
public String getSmallestString(int n, int k) {
    char[] c = new char[n];
    Arrays.fill(c, 'a');
    k -= n;
    for (int i = n - 1; i >= 0 && k > 0; i--) {
        int add = Math.min(25, k);
        c[i] += add;
        k -= add;
    }
    return new String(c);
}
```

## Approach 2: Left to right with room check
```java
// Left to right: take the smallest letter that still leaves enough room for the remaining positions (each at most 26)
public String getSmallestStringLeftToRight(int n, int k) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < n; i++) {
        int rest = n - i - 1;
        int v = Math.max(1, k - 26 * rest);
        sb.append((char) ('a' + v - 1));
        k -= v;
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Fill from the right | O(n) | O(n) |
| Left to right with room check | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>What does the left-to-right form compute?</summary>

The smallest letter at position i such that the rest (at most 26 each) can still reach k.

</details>


## Connected
- [Find the Most Competitive Subsequence](Find%20the%20Most%20Competitive%20Subsequence.md)
