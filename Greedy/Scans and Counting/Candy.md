---
topic: Scans and Counting
pattern: [Two passes, Slopes]
source: LeetCode 135
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Candy

> [!TIP]
> **🧠 Memory hook**
> Every child looks left, then right: **satisfy one neighbour per pass**.
> **Mantra: LEFT PASS +1, RIGHT PASS max(c, next + 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=0) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Each child gets at least one candy and a child with a higher rating than a neighbour gets more candy than that neighbour. Return the minimum total candies.

## Key insight
Pass left to right so every child with a higher rating than the left neighbour gets one more candy than it. Pass right to left and take the maximum with the requirement from the right neighbour. A one-pass slope version counts rising and falling runs.

## Approach 1: Two passes
```java
// Two passes: left-to-right enforces "higher than the left neighbour", right-to-left enforces the right neighbour
public int candy(int[] ratings) {
    int n = ratings.length;
    int[] c = new int[n];
    Arrays.fill(c, 1);
    for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
    for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
    int sum = 0;
    for (int x : c) sum += x;
    return sum;
}
```

## Approach 2: Slopes, O(1) space
```java
// One pass over slopes: an upward run adds 1, 2, 3.. and a downward run adds 1, 2, 3..; the peak is raised only when the descent is longer than the climb
public int candySlopes(int[] ratings) {
    int total = 1, up = 0, down = 0, peak = 0;
    for (int i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) { up++; down = 0; peak = up; total += 1 + up; }
        else if (ratings[i] == ratings[i - 1]) { up = down = peak = 0; total += 1; }
        else { up = 0; down++; total += down + (down > peak ? 1 : 0); }
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes | O(n) | O(n) |
| Slopes, O(1) space | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `Math.max` in the second pass?</summary>

The left pass may already have given the child more than the right pass requires.

</details>


<details><summary>Equal ratings?</summary>

No constraint between equal neighbours; both can have 1.

</details>


## Connected
- [Gas Station](Gas%20Station.md)
