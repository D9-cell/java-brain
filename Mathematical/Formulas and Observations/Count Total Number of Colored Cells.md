---
topic: Formulas and Observations
pattern: [Rings, Series]
source: LeetCode 2579
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Total Number of Colored Cells

> [!TIP]
> **🧠 Memory hook**
> Minute k adds a diamond ring of **4(k − 1)** cells: **1 + 4(1 + … + (n − 1)) = 1 + 2n(n − 1)**.
> **Mantra: 1 + 2·n·(n − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=7) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Start with one colored cell. Each minute, color every uncolored cell that touches a colored cell. Return the count after n minutes.

## Key insight
The shape after n minutes is a diamond of radius n − 1. Its new outer ring at minute k has 4(k − 1) cells. Use long: n up to 10⁵ gives about 2·10¹⁰.

## Approach: Series
```java
// Minute k adds a ring of 4(k - 1) cells: 1 + 4(1 + 2 + ... + (n - 1))
public long coloredCells(int n) {
    return 1 + 2L * n * (n - 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Series | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why 4(k − 1)?</summary>

The ring has four sides of k − 1 cells each.

</details>


<details><summary>Why 2L?</summary>

It forces long arithmetic before the product overflows.

</details>


## Connected
- [Calculate Money in Leetcode Bank](Calculate%20Money%20in%20Leetcode%20Bank.md)
