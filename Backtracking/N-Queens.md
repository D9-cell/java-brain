---
topic: Backtracking
pattern: [Grid backtracking, O(1) safety]
source: LeetCode 51
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# N-Queens

> [!TIP]
> **🧠 Memory hook**
> A queen claims her column and both diagonals.
> **Mantra: ROW BY ROW, col/d1/d2 FLAGS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=18) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All placements of n non-attacking queens.

## Key insight
One queen per row; arrays for columns, r+c and r−c diagonals make checks O(1).

## Approach: Flags
```java
// One queen per row; boolean arrays for columns and both diagonals make the safety check O(1)
private void solve(int row, int n, char[][] board, boolean[] col, boolean[] d1, boolean[] d2, List<List<String>> res) {
    if (row == n) {
        List<String> b = new ArrayList<>();
        for (char[] r : board) b.add(new String(r));
        res.add(b);
        return;
    }
    for (int c = 0; c < n; c++) {
        if (col[c] || d1[row + c] || d2[row - c + n - 1]) continue;
        col[c] = d1[row + c] = d2[row - c + n - 1] = true;
        board[row][c] = 'Q';
        solve(row + 1, n, board, col, d1, d2, res);
        board[row][c] = '.';
        col[c] = d1[row + c] = d2[row - c + n - 1] = false;
    }
}

// Entry point
public List<List<String>> solveNQueens(int n) {
    char[][] board = new char[n][n];
    for (char[] r : board) Arrays.fill(r, '.');
    List<List<String>> res = new ArrayList<>();
    solve(0, n, board, new boolean[n], new boolean[2 * n - 1], new boolean[2 * n - 1], res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Flags | O(n!) | O(n) |

> [!WARNING]
> **Java gotcha**
> Solution counts 1..9 match the known sequence; every board validated.

## Recall before you reveal
<details><summary>Diagonal ids?</summary>

r + c and r − c + n − 1.

</details>


## Connected
- [N-Queens II](N-Queens%20II.md)
