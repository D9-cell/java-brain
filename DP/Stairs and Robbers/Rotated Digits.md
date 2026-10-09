---
topic: Stairs and Robbers
pattern: [Digit classification, DP over prefixes]
source: LeetCode 788
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Rotated Digits

> [!TIP]
> **🧠 Memory hook**
> A number is good if every digit survives a 180° rotation and **at least one digit changes**.
> **Mantra: dp[i] FROM dp[i / 10] AND dp[i % 10]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=20) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Digits 0, 1, 8 rotate to themselves; 2↔5 and 6↔9; 3, 4, 7 are invalid. Count the numbers in [1, n] that rotate to a different valid number.

## Key insight
Classify each number as invalid (0), same (1) or good (2). A number combines the class of its prefix `i / 10` and its last digit: invalid if either is invalid, same only if both are same, otherwise good.

## Approach 1: DP over prefixes
```java
// A number is good if all digits survive rotation (no 3, 4, 7) and at least one digit changes (2, 5, 6, 9). dp[i]: 0 invalid, 1 same, 2 good
public int rotatedDigits(int n) {
    int[] dp = new int[n + 1];
    int count = 0;
    for (int i = 0; i <= n; i++) {
        if (i < 10) dp[i] = (i == 0 || i == 1 || i == 8) ? 1 : (i == 2 || i == 5 || i == 6 || i == 9) ? 2 : 0;
        else {
            int a = dp[i / 10], b = dp[i % 10];
            dp[i] = (a == 0 || b == 0) ? 0 : (a == 1 && b == 1) ? 1 : 2;
        }
        if (dp[i] == 2) count++;
    }
    return count;
}
```

## Approach 2: Direct digit check
```java
// Direct digit check for every number
public int rotatedDigitsDirect(int n) {
    int count = 0;
    for (int x = 1; x <= n; x++) {
        boolean valid = true, changes = false;
        for (int y = x; y > 0; y /= 10) {
            int d = y % 10;
            if (d == 3 || d == 4 || d == 7) { valid = false; break; }
            if (d == 2 || d == 5 || d == 6 || d == 9) changes = true;
        }
        if (valid && changes) count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| DP over prefixes | O(n) | O(n) |
| Direct digit check | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why can 0 be "same"?</summary>

It rotates to itself and is only used as a digit; the number 0 itself is not counted.

</details>


## Connected
- [Fibonacci Number](Fibonacci%20Number.md)
