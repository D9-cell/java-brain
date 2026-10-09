---
topic: Jumps and Reach
pattern: [Simulation by rows, Overflow flows down]
source: LeetCode 799
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Champagne Tower

> [!TIP]
> **🧠 Memory hook**
> Pour everything into the top glass and let **each glass keep 1 cup and split the rest** to its two children.
> **Mantra: extra = (amount − 1) / 2 → BOTH CHILDREN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=8) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Glasses form a pyramid (row i has i + 1 glasses). Pour `poured` cups into the top. A full glass overflows evenly to the two glasses below. How full is glass (queryRow, queryGlass)? (at most 1)

## Key insight
Track the total amount that flows into each glass (it can exceed 1). Row by row, every glass keeps one cup and splits its surplus. The answer is min(1, flow).

## Approach 1: Row simulation
```java
// Push the overflow of every glass half-and-half to the two glasses below
public double champagneTower(int poured, int queryRow, int queryGlass) {
    double[] row = {poured};
    for (int r = 0; r < queryRow; r++) {
        double[] next = new double[r + 2];
        for (int g = 0; g <= r; g++) {
            double extra = (row[g] - 1) / 2;
            if (extra > 0) { next[g] += extra; next[g + 1] += extra; }
        }
        row = next;
    }
    return Math.min(1, row[queryGlass]);
}
```

## Approach 2: Top-down flow
```java
// Top-down: amount flowing into a glass from its two parents
public double champagneTowerMemo(int poured, int queryRow, int queryGlass) {
    return Math.min(1, flow(poured, queryRow, queryGlass, new Double[queryRow + 1][queryRow + 1]));
}

// Total champagne that reaches glass (r, g) before it overflows
private double flow(int poured, int r, int g, Double[][] memo) {
    if (g < 0 || g > r) return 0;
    if (r == 0) return poured;
    if (memo[r][g] != null) return memo[r][g];
    double left = Math.max(0, flow(poured, r - 1, g - 1, memo) - 1) / 2, right = Math.max(0, flow(poured, r - 1, g, memo) - 1) / 2;
    return memo[r][g] = left + right;
}
```

| Approach | Time | Space |
|---|---|---|
| Row simulation | O(row²) | O(row) |
| Top-down flow | O(row²) | O(row²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why track flow above 1?</summary>

The surplus is what feeds the next row.

</details>


<details><summary>Final clamp?</summary>

A glass shows at most 1 cup.

</details>


## Connected
- Triangle
- Pascal's Triangle
