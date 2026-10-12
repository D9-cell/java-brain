---
topic: Formulas and Observations
pattern: [Prefix count]
source: LeetCode 1523
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Odd Numbers in an Interval Range

> [!TIP]
> **🧠 Memory hook**
> Odd numbers in **[0, x]** are **(x + 1)/2**. Answer: odds up to high minus odds below low.
> **Mantra: (high + 1)/2 − low/2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=5) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Return the count of odd numbers between low and high inclusive.

## Key insight
Odds in [0, low − 1] equal low/2. Subtracting two prefix counts gives the range count, the same idea as prefix sums.

## Approach: Prefix counts
```java
// Odd numbers in [0, x] are (x + 1) / 2; subtract the ones below low
public int countOdds(int low, int high) {
    return (high + 1) / 2 - low / 2;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix counts | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why low / 2 for the lower prefix?</summary>

Odds in [0, low − 1] = ((low − 1) + 1)/2 = low/2.

</details>


<details><summary>Check low = high = 3?</summary>

2 − 1 = 1.

</details>


## Connected
- [Find the Pivot Integer](Find%20the%20Pivot%20Integer.md)
