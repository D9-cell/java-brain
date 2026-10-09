---
topic: Backtracking
pattern: [Grid DFS backtracking]
source: LeetCode 1219
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Path with Maximum Gold

> [!TIP]
> **🧠 Memory hook**
> A miner who never revisits a cell.
> **Mantra: DFS FROM EVERY GOLD, ZERO → RESTORE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=22) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Maximum gold on a path that never revisits a cell or steps on 0.

## Key insight
DFS from every gold cell, temporarily zeroing the current cell.

## Approach: DFS
```java
// DFS from a cell: take its gold, zero it (visited), try 4 directions, restore it
private int dfs(int[][] g, int i, int j) {
    if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] == 0) return 0;
    int gold = g[i][j];
    g[i][j] = 0;
    int best = Math.max(Math.max(dfs(g, i + 1, j), dfs(g, i - 1, j)), Math.max(dfs(g, i, j + 1), dfs(g, i, j - 1)));
    g[i][j] = gold;
    return gold + best;
}

// Start from every gold cell
public int getMaximumGold(int[][] grid) {
    int best = 0;
    for (int i = 0; i < grid.length; i++) for (int j = 0; j < grid[0].length; j++) best = Math.max(best, dfs(grid, i, j));
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(cells · 4^gold) | O(gold) |

## Recall before you reveal
<details><summary>Visited?</summary>

Set to 0 and restore.

</details>


## Connected
- [Word Search](Word%20Search.md)
