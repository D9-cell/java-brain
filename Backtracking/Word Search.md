---
topic: Backtracking
pattern: [Grid DFS backtracking]
source: LeetCode 79
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Word Search

> [!TIP]
> **🧠 Memory hook**
> A maze walk that marks tiles and wipes the marks when leaving.
> **Mantra: MATCH, MARK $, 4 DIRS, UNMARK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=35) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Does the word exist in the grid (adjacent cells, no reuse)?

## Key insight
DFS from every cell; mark visited by overwriting, restore on return.

## Approach: DFS
```java
// Match word[k] at (i, j), mark the cell, try 4 neighbours, unmark
private boolean dfs(char[][] b, String w, int k, int i, int j) {
    if (k == w.length()) return true;
    if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] != w.charAt(k)) return false;
    char saved = b[i][j];
    b[i][j] = '$';
    boolean found = dfs(b, w, k + 1, i + 1, j) || dfs(b, w, k + 1, i - 1, j) || dfs(b, w, k + 1, i, j + 1) || dfs(b, w, k + 1, i, j - 1);
    b[i][j] = saved;
    return found;
}

// Try every starting cell
public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) for (int j = 0; j < board[0].length; j++) if (dfs(board, word, 0, i, j)) return true;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(cells · 3^L) | O(L) |

## Recall before you reveal
<details><summary>Many words?</summary>

Trie-guided DFS: Word Search II.

</details>


## Connected
- [Word Search II](../Trie/Word%20Search%20II.md)
- [Path with Maximum Gold](Path%20with%20Maximum%20Gold.md)
