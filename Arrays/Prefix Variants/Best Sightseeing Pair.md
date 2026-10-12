---
topic: Prefix Variants
pattern: [Best so far]
source: LeetCode 1014
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Best Sightseeing Pair

> [!TIP]
> **🧠 Memory hook**
> Split the score: **(values[i] + i) + (values[j] − j)**. Keep the best left part seen so far.
> **Mantra: best = max(bestLeft + v[j] − j) · bestLeft = max(bestLeft, v[j] + j)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=11) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
The score of i < j is values[i] + values[j] + i − j. Return the maximum score.

## Key insight
Separating the terms by index makes the left part independent of j, so a running maximum replaces the inner loop.

## Approach: Running best
```java
// Score = (values[i] + i) + (values[j] - j); keep the best left part seen so far
public int maxScoreSightseeingPair(int[] values) {
    int bestLeft = values[0], best = Integer.MIN_VALUE;
    for (int j = 1; j < values.length; j++) {
        best = Math.max(best, bestLeft + values[j] - j);
        bestLeft = Math.max(bestLeft, values[j] + j);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Running best | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why split the expression?</summary>

Each half depends on one index only.

</details>


<details><summary>Similar problems?</summary>

Max j − i style problems, stock buy and sell.

</details>


## Connected
- [Maximum Sum of Two Non-Overlapping Subarrays](Maximum%20Sum%20of%20Two%20Non-Overlapping%20Subarrays.md)
- [Best Time to Buy and Sell Stock III](../../DP/Stock%20and%20Kadane%20States/Best%20Time%20to%20Buy%20and%20Sell%20Stock%20III.md)
