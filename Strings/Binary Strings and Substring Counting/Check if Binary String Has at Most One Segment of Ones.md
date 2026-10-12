---
topic: Binary Strings and Substring Counting
pattern: [Pattern check]
source: LeetCode 1784
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Check if Binary String Has at Most One Segment of Ones

> [!TIP]
> **🧠 Memory hook**
> s starts with 1, so a second block of ones must be preceded by **"01"**.
> **Mantra: RETURN !s.contains("01")**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=4) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
s has no leading zeros. Return true if its ones form at most one contiguous segment.

## Key insight
After the first block ends with a 0, any later 1 creates the pattern "01".

## Approach: Look for "01"
```java
// s starts with 1, so a second segment exists exactly when "01" appears
public boolean checkOnesSegment(String s) {
    return !s.contains("01");
}
```

| Approach | Time | Space |
|---|---|---|
| Look for "01" | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is "10" harmless?</summary>

It just ends the first block.

</details>


<details><summary>Without the leading 1 guarantee?</summary>

Count the "01" patterns plus whether s starts with 1.

</details>


## Connected
- [Count Binary Substrings](Count%20Binary%20Substrings.md)
