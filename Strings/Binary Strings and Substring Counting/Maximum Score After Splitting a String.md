---
topic: Binary Strings and Substring Counting
pattern: [Prefix balance]
source: LeetCode 1422
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Maximum Score After Splitting a String

> [!TIP]
> **🧠 Memory hook**
> Score = zeros left + ones right = **totalOnes + (zeros − ones) on the left**. Maximise the left balance over split points.
> **Mantra: ones total · balance += (0 → +1, 1 → −1) · ones + max balance**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=7) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Split s into two non-empty parts. Score = zeros in the left part + ones in the right part. Return the maximum score.

## Key insight
Ones on the right = totalOnes − ones on the left, so a single pass over split points with a balance counter works. The split must leave the right part non-empty.

## Approach: One pass
```java
// Score = zeros on the left + ones on the right = totalOnes + (zeros - ones) on the left
public int maxScore(String s) {
    int ones = 0;
    for (char c : s.toCharArray()) if (c == '1') ones++;
    int best = Integer.MIN_VALUE, balance = 0;
    for (int i = 0; i + 1 < s.length(); i++) {
        balance += s.charAt(i) == '0' ? 1 : -1;
        best = Math.max(best, balance);
    }
    return ones + best;
}
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop at n − 2?</summary>

The right part needs at least one character.

</details>


<details><summary>Two-pass version?</summary>

Count ones first, then sweep: also O(n).

</details>


## Connected
- [Separate Black and White Balls](Separate%20Black%20and%20White%20Balls.md)
