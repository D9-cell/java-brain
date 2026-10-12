---
topic: Binary Strings and Substring Counting
pattern: [Compare with a pattern]
source: LeetCode 1758
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Changes To Make Alternating Binary String

> [!TIP]
> **🧠 Memory hook**
> Count mismatches against **"0101…"**; the other pattern "1010…" mismatches exactly the **other positions**: **min(d, n − d)**.
> **Mantra: d = #(s[i] != i % 2) · min(d, n − d)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=5) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of flips to make the binary string alternate.

## Key insight
Every position mismatches exactly one of the two alternating patterns, so their mismatch counts add up to n.

## Approach: One pass
```java
// Count mismatches against "0101..."; the other pattern needs n minus that
public int minOperations(String s) {
    int diff = 0;
    for (int i = 0; i < s.length(); i++)
        if (s.charAt(i) - '0' != i % 2) diff++;
    return Math.min(diff, s.length() - diff);
}
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why n − d?</summary>

Each position mismatches exactly one of the two patterns.

</details>


<details><summary>Why only two targets?</summary>

An alternating string is fixed by its first character.

</details>


## Connected
- [Minimum Number of Changes to Make Binary String Beautiful](Minimum%20Number%20of%20Changes%20to%20Make%20Binary%20String%20Beautiful.md)
