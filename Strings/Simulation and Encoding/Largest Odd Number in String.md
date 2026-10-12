---
topic: Simulation and Encoding
pattern: [Scan from the end]
source: LeetCode 1903
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Largest Odd Number in String

> [!TIP]
> **🧠 Memory hook**
> A number is odd iff its **last digit** is odd. The best answer is the prefix ending at the **last odd digit**.
> **Mantra: FROM right: first odd digit i → num[0..i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=16) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Return the largest-valued odd integer that is a non-empty substring of num, or "".

## Key insight
Longer numbers without leading zeros are larger, and the prefix up to the last odd digit is the longest odd substring.

## Approach: Backward scan
```java
// The answer is the prefix ending at the last odd digit
public String largestOddNumber(String num) {
    for (int i = num.length() - 1; i >= 0; i--)
        if ((num.charAt(i) - '0') % 2 == 1) return num.substring(0, i + 1);
    return "";
}
```

| Approach | Time | Space |
|---|---|---|
| Backward scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why a prefix?</summary>

Starting earlier only adds leading digits, making it bigger.

</details>


<details><summary>No odd digit?</summary>

Return "".

</details>


## Connected
- [Largest 3-Same-Digit Number in String](Largest%203-Same-Digit%20Number%20in%20String.md)
