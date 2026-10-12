---
topic: Binary Strings and Substring Counting
pattern: [Prefix cost]
source: LeetCode 1769
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Number of Operations to Move All Balls to Each Box

> [!TIP]
> **🧠 Memory hook**
> Sweep left to right: moving one box further costs **one more per ball already passed**. Do the same from the right and add.
> **Mantra: ans[i] += cost · balls += box · cost += balls (both directions)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=12) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
For each box i, return the total moves to bring every ball to box i (one move shifts one ball one box).

## Key insight
The cost of balls from the left grows by the number of balls on the left at every step. The right side is symmetric. Two passes replace the O(n²) double loop.

## Approach: Two sweeps
```java
// Left pass and right pass: cost grows by the number of balls already passed
public int[] minOperations(String boxes) {
    int n = boxes.length();
    int[] ans = new int[n];
    for (int pass = 0; pass < 2; pass++) {
        int balls = 0, cost = 0;
        for (int k = 0; k < n; k++) {
            int i = pass == 0 ? k : n - 1 - k;
            ans[i] += cost;
            if (boxes.charAt(i) == '1') balls++;
            cost += balls;
        }
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Two sweeps | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does cost grow by balls?</summary>

Every ball on the left is one step further away.

</details>


<details><summary>Brute force?</summary>

O(n²) sum of |i − j|.

</details>


## Connected
- [Separate Black and White Balls](Separate%20Black%20and%20White%20Balls.md)
