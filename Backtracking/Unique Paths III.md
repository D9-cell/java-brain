---
topic: Backtracking
pattern: [Grid DFS backtracking]
source: LeetCode 980
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Unique Paths III

> [!TIP]
> **🧠 Memory hook**
> A lawn mower that must mow every free square exactly once.
> **Mantra: COUNT FREE CELLS, DFS, STEPS == FREE AT END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=33) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Number of 4-directional paths from start to end that visit every non-obstacle square once.

## Key insight
Count cells to cover; DFS marking visited; count arrivals at the end with all cells covered.

## Approach: DFS
```java
// Walk 4 ways, marking cells visited; count arrivals at the end that used every non-obstacle cell
private void dfs(int[][] g, int i, int j, int steps) {
    if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] == -1) return;
    if (g[i][j] == 2) { if (steps == empty) paths++; return; }
    g[i][j] = -1;
    dfs(g, i + 1, j, steps + 1);
    dfs(g, i - 1, j, steps + 1);
    dfs(g, i, j + 1, steps + 1);
    dfs(g, i, j - 1, steps + 1);
    g[i][j] = 0;
}

// Count cells to cover (empty + start), then DFS from the start
public int uniquePathsIII(int[][] grid) {
    empty = 0;
    paths = 0;
    int si = 0, sj = 0;
    for (int i = 0; i < grid.length; i++) for (int j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == 0) empty++;
        if (grid[i][j] == 1) { si = i; sj = j; }
    }
    empty++;
    dfs(grid, si, sj, 0);
    return paths;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(4^cells) | O(cells) |

## Recall before you reveal
<details><summary>What counts as covered?</summary>

empty cells + the start.

</details>

