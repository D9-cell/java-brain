---
topic: Design
pattern: [Counters]
source: LeetCode 348
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Tic-Tac-Toe

> [!TIP]
> **🧠 Memory hook**
> A scoreboard per line: +1 for X, −1 for O.
> **Mantra: ROW/COL/DIAG COUNTERS ±1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=15) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
move(row, col, player) returns the winner (or 0) on an n × n board.

## Key insight
Each row, column and the two diagonals keep a sum; reaching ±n means one player filled it.

## Approach 1: Board scan
```java
// Approach 1: keep the board and check the move's row, column and diagonals
static class TicTacToeBoard {
    private final int[][] b;
    private final int n;

    TicTacToeBoard(int n) { this.n = n; b = new int[n][n]; }

    // Place and check the four lines through (row, col)
    public int move(int row, int col, int player) {
        b[row][col] = player;
        boolean r = true, c = true, d = true, a = true;
        for (int i = 0; i < n; i++) {
            r &= b[row][i] == player;
            c &= b[i][col] == player;
            d &= b[i][i] == player;
            a &= b[i][n - 1 - i] == player;
        }
        return r || c || (row == col && d) || (row + col == n - 1 && a) ? player : 0;
    }
}
```

## Approach 2: Counters
```java
// Approach 2: player 1 adds +1, player 2 adds −1 to row/col/diag counters; |counter| == n wins
static class TicTacToe {
    private final int[] rows, cols;
    private int diag, anti;
    private final int n;

    TicTacToe(int n) { this.n = n; rows = new int[n]; cols = new int[n]; }

    // O(1) per move
    public int move(int row, int col, int player) {
        int v = player == 1 ? 1 : -1;
        rows[row] += v;
        cols[col] += v;
        if (row == col) diag += v;
        if (row + col == n - 1) anti += v;
        return Math.abs(rows[row]) == n || Math.abs(cols[col]) == n || Math.abs(diag) == n || Math.abs(anti) == n ? player : 0;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Board scan | O(n) per move | O(n²) |
| Counters | O(1) per move | O(n) |

> [!WARNING]
> **Java gotcha**
> Both versions agree on every move of 500 random games.

## Recall before you reveal
<details><summary>Anti-diagonal condition?</summary>

row + col == n − 1.

</details>

