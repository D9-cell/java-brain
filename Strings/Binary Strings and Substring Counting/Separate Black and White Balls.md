---
topic: Binary Strings and Substring Counting
pattern: [Running count]
source: LeetCode 2938
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Separate Black and White Balls

> [!TIP]
> **🧠 Memory hook**
> Each **0** must pass every **1 to its left**. Add the ones seen so far at each 0.
> **Mantra: c == '1' → ones++ · c == '0' → steps += ones**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=8) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
1 is black, 0 is white. Swapping two adjacent balls is one step. Return the minimum steps to put all black balls on the right.

## Key insight
Each adjacent swap fixes exactly one (1, 0) inversion, so the answer is the number of such inversions.

## Approach: Count inversions
```java
// Every 0 must pass every 1 to its left: add the count of ones seen so far
public long minimumSteps(String s) {
    long steps = 0, ones = 0;
    for (char c : s.toCharArray()) {
        if (c == '1') ones++;
        else steps += ones;
    }
    return steps;
}
```

| Approach | Time | Space |
|---|---|---|
| Count inversions | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why inversions?</summary>

Each swap removes exactly one 1-before-0 pair.

</details>


<details><summary>Why long?</summary>

Up to 2.5·10⁹ steps.

</details>


## Connected
- [Maximum Score After Splitting a String](Maximum%20Score%20After%20Splitting%20a%20String.md)
- [Minimum Number of Operations to Move All Balls to Each Box](Minimum%20Number%20of%20Operations%20to%20Move%20All%20Balls%20to%20Each%20Box.md)
