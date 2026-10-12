---
topic: Binary Strings and Substring Counting
pattern: [Runs]
source: LeetCode 3499
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Maximize Active Section with Trade I

> [!TIP]
> **🧠 Memory hook**
> Turning a 1-block (between zeros) to 0 merges the **two zero blocks around it**; then they all become 1. Gain = **best sum of two adjacent zero blocks**.
> **Mantra: ones + max over adjacent zero blocks (z₁ + z₂)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=16) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
s is treated as if it had a 1 on both ends. One trade turns a block of 1s surrounded by 0s into 0s, then a block of 0s surrounded by 1s into 1s. Return the maximum number of 1s after at most one trade.

## Key insight
The 1s removed in the first step come back in the second, since the merged zero block contains them. The net gain is the two zero blocks on either side of the chosen 1-block.

## Approach: Zero-block pairs
```java
// Removing a block of 1s merges its two neighbouring 0 blocks, which then all become 1s
public int maxActiveSectionsAfterTrade(String s) {
    int ones = 0, prevZeros = 0, bestPair = 0, i = 0, n = s.length();
    boolean seenZero = false;
    while (i < n) {
        int j = i;
        while (j < n && s.charAt(j) == s.charAt(i)) j++;
        if (s.charAt(i) == '1') ones += j - i;
        else {
            if (seenZero) bestPair = Math.max(bestPair, prevZeros + (j - i));
            prevZeros = j - i;
            seenZero = true;
        }
        i = j;
    }
    return ones + bestPair;
}
```

| Approach | Time | Space |
|---|---|---|
| Zero-block pairs | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute force that tries every trade.

## Recall before you reveal
<details><summary>Why adjacent zero blocks?</summary>

They sit on both sides of one 1-block.

</details>


<details><summary>No such pair?</summary>

No useful trade; the answer is the current count of 1s.

</details>


## Connected
- [Count Binary Substrings](Count%20Binary%20Substrings.md)
