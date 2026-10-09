---
topic: Bit Magic
pattern: [Greedy by bit weight]
source: LeetCode 861
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Score After Flipping Matrix

> [!TIP]
> **🧠 Memory hook**
> The leading bit beats all later bits: rows first, then columns.
> **Mantra: ROWS START WITH 1, COLUMNS MAJORITY 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=44) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Flip rows/columns to maximise the sum of rows read as binary numbers.

## Key insight
Make every row start with 1 (worth more than the rest), then flip any column with more 0s than 1s.

## Approach 1: Modify the grid
```java
// Approach 1 (modifying input): flip rows so the leading bit is 1, then flip columns with more 0s than 1s
public int matrixScoreModify(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    for (int[] row : grid) if (row[0] == 0) for (int j = 0; j < n; j++) row[j] ^= 1;
    int score = 0;
    for (int j = 0; j < n; j++) {
        int ones = 0;
        for (int[] row : grid) ones += row[j];
        score += Math.max(ones, m - ones) << (n - 1 - j);
    }
    return score;
}
```

## Approach 2: No modification
```java
// Approach 2 (no modification): a cell is effectively 1 if it equals its row's first cell
public int matrixScore(int[][] grid) {
    int m = grid.length, n = grid[0].length, score = m << (n - 1);
    for (int j = 1; j < n; j++) {
        int ones = 0;
        for (int[] row : grid) if (row[j] == row[0]) ones++;
        score += Math.max(ones, m - ones) << (n - 1 - j);
    }
    return score;
}
```

| Approach | Time | Space |
|---|---|---|
| Modify the grid | O(m·n) | O(1) |
| No modification | O(m·n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against all row/column flip sets.

## Recall before you reveal
<details><summary>No-modify trick?</summary>

A cell counts as 1 if it equals its row's first cell.

</details>

