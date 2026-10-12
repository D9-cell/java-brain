---
topic: Grid Shapes and Colorings
pattern: [Four runs, Min of arms]
source: LeetCode 764
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Largest Plus Sign

> [!TIP]
> **🧠 Memory hook**
> A plus is limited by its **shortest arm**: sweep the four directions and keep the minimum.
> **Mantra: arm[i][j] = min(left, right, up, down) RUN OF 1s**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=2) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
An n × n grid is all 1s except the given mines (0). Return the order (arm length including the centre) of the largest axis-aligned plus of 1s.

## Key insight
For each cell the left, right, up and down runs of consecutive 1s come from running counters that reset on a mine. The plus order at that centre is the smallest of the four. The answer is the maximum over all cells.

## Approach: Four sweeps
```java
// arm[i][j] = shortest of the four runs of 1s from (i, j); two sweeps per axis build it
public int orderOfLargestPlusSign(int n, int[][] mines) {
    int[][] arm = new int[n][n];
    for (int[] row : arm) Arrays.fill(row, n);
    boolean[][] mine = new boolean[n][n];
    for (int[] p : mines) mine[p[0]][p[1]] = true;
    for (int i = 0; i < n; i++) {
        int left = 0, right = 0, up = 0, down = 0;
        for (int j = 0, k = n - 1; j < n; j++, k--) {
            left = mine[i][j] ? 0 : left + 1;
            arm[i][j] = Math.min(arm[i][j], left);
            right = mine[i][k] ? 0 : right + 1;
            arm[i][k] = Math.min(arm[i][k], right);
            up = mine[j][i] ? 0 : up + 1;
            arm[j][i] = Math.min(arm[j][i], up);
            down = mine[k][i] ? 0 : down + 1;
            arm[k][i] = Math.min(arm[k][i], down);
        }
    }
    int best = 0;
    for (int[] row : arm) for (int v : row) best = Math.max(best, v);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Four sweeps | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why min of four?</summary>

All arms must have the same length.

</details>


<details><summary>Order vs arm?</summary>

Order counts the centre, so a plus with arms of 1 has order 2.

</details>


## Connected
- [Maximal Square](Maximal%20Square.md)
