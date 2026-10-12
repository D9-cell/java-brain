---
topic: Binary Strings and Substring Counting
pattern: [Pair counting]
source: LeetCode 3084
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Substrings Starting and Ending with Given Character

> [!TIP]
> **🧠 Memory hook**
> With **k copies of c**, pick a start copy and an end copy (possibly the same): **k(k + 1)/2**.
> **Mantra: k = count(c) · k(k+1)/2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=3) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Count substrings of s that start and end with character c.

## Key insight
Every pair of positions i ≤ j holding c defines one such substring, and vice versa.

## Approach: Count and formula
```java
// With k copies of c, choose start and end among them (possibly equal): k(k + 1) / 2
public long countSubstrings(String s, char c) {
    long k = 0;
    for (char ch : s.toCharArray())
        if (ch == c) k++;
    return k * (k + 1) / 2;
}
```

| Approach | Time | Space |
|---|---|---|
| Count and formula | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why k + 1 and not k − 1?</summary>

A single character c counts as a substring too.

</details>


<details><summary>Why long?</summary>

k up to 10⁵ squared.

</details>


## Connected
- [Count Number of Homogenous Substrings](Count%20Number%20of%20Homogenous%20Substrings.md)
