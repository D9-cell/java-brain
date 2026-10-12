---
topic: Prefix Variants
pattern: [Prefix + set, Symmetry]
source: LeetCode 3548
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Equal Sum Grid Partition II

> [!TIP]
> **🧠 Memory hook**
> Like part I, but one part may **drop a single cell worth (its sum − the other's)**, if that part stays connected. Check the **top part** for every horizontal cut; rotate and flip the grid to cover the other three cases.
> **Mantra: diff = top − bottom · 0 or a removable cell value → true · removable: any seen cell if top is ≥ 2 rows and ≥ 2 columns, else only its ends**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=6) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Same as part I, but you may discount at most one cell from one of the two parts, as long as that part remains connected. Return whether an equal split exists.

## Key insight
Removing a cell from a part with at least two rows and two columns never disconnects it, so any value seen so far can be dropped. A single row or single column can only lose an end cell. The bottom part and vertical cuts are the same check on the flipped and transposed grids.

## Approach: Prefix + set, four orientations
```java
// Check top parts of the grid, its upside-down copy, its transpose and that copy upside down
public boolean canPartitionGrid(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    long total = 0;
    for (int[] row : grid) for (int v : row) total += v;
    int[][] flipped = new int[m][], t = new int[n][m], tFlipped = new int[n][];
    for (int i = 0; i < m; i++) flipped[i] = grid[m - 1 - i];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) t[j][i] = grid[i][j];
    for (int j = 0; j < n; j++) tFlipped[j] = t[n - 1 - j];
    return topCuts(grid, total) || topCuts(flipped, total) || topCuts(t, total) || topCuts(tFlipped, total);
}

// After each horizontal cut, the top part may drop one removable cell worth top - bottom
boolean topCuts(int[][] g, long total) {
    int m = g.length, n = g[0].length;
    Set<Long> seen = new HashSet<>();
    long top = 0;
    for (int i = 0; i + 1 < m; i++) {
        for (int j = 0; j < n; j++) {
            seen.add((long) g[i][j]);
            top += g[i][j];
        }
        long diff = top - (total - top);
        if (diff == 0 || diff == g[0][0] || diff == g[0][n - 1] || diff == g[i][0]) return true;
        if (i > 0 && n > 1 && seen.contains(diff)) return true;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix + set, four orientations | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute force that tries every cut, every removed cell and a connectivity test.

## Recall before you reveal
<details><summary>Why only end cells in a single row?</summary>

Removing a middle cell splits the row in two.

</details>


<details><summary>Why four orientations?</summary>

Top part, bottom part, left part, right part.

</details>


## Connected
- [Equal Sum Grid Partition I](Equal%20Sum%20Grid%20Partition%20I.md)
