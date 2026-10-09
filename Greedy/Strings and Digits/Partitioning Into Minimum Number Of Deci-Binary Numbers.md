---
topic: Strings and Digits
pattern: [Largest digit]
source: LeetCode 1689
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Partitioning Into Minimum Number Of Deci-Binary Numbers

> [!TIP]
> **🧠 Memory hook**
> Each deci-binary number adds **at most 1 to every digit**, so the biggest digit sets the count.
> **Mantra: ANSWER = MAX DIGIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=19) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
A deci-binary number has only digits 0 and 1. Return the minimum number of them that sum to n.

## Key insight
Every summand contributes 0 or 1 to each digit position, so at least `max digit` summands are needed, and `max digit` is enough.

## Approach 1: Max digit
```java
// Each deci-binary number adds at most 1 to every digit, so the largest digit decides
public int minPartitions(String n) {
    int max = 0;
    for (char c : n.toCharArray()) max = Math.max(max, c - '0');
    return max;
}
```

## Approach 2: Early exit from 9
```java
// Stream version stopping at 9
public int minPartitionsEarlyExit(String n) {
    for (int d = 9; d >= 1; d--) if (n.indexOf((char) ('0' + d)) >= 0) return d;
    return 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Max digit | O(d) | O(1) |
| Early exit from 9 | O(d) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `String`?</summary>

n can have 10⁵ digits.

</details>


## Connected
- [Optimal Partition of String](Optimal%20Partition%20of%20String.md)
