---
topic: Backtracking
pattern: [Grid backtracking]
source: LeetCode 37
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Sudoku Solver

> [!TIP]
> **🧠 Memory hook**
> Pencil marks: write a guess, erase it if it leads nowhere.
> **Mantra: FIRST EMPTY, TRY 1..9 VALID, UNDO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=29) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Fill the Sudoku in place.

## Key insight
Find an empty cell, try digits valid in its row, column and box, recurse; if none works, return false.

## Approach: Backtracking
```java
// Can digit d go at (r, c)? Check the row, column and 3x3 box
private boolean valid(char[][] b, int r, int c, char d) {
    for (int i = 0; i < 9; i++) {
        if (b[r][i] == d || b[i][c] == d) return false;
        if (b[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == d) return false;
    }
    return true;
}

// Find the next empty cell, try 1..9, recurse, undo on failure
private boolean solve(char[][] b) {
    for (int r = 0; r < 9; r++)
        for (int c = 0; c < 9; c++) {
            if (b[r][c] != '.') continue;
            for (char d = '1'; d <= '9'; d++) {
                if (!valid(b, r, c, d)) continue;
                b[r][c] = d;
                if (solve(b)) return true;
                b[r][c] = '.';
            }
            return false;
        }
    return true;
}

// Entry point (solves in place)
public void solveSudoku(char[][] board) { solve(board); }
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(9^empty) worst | O(81) |

> [!WARNING]
> **Java gotcha**
> Solves the LeetCode puzzle; the result is validated.

## Recall before you reveal
<details><summary>Faster?</summary>

Bitmasks per row/col/box; pick the cell with the fewest candidates.

</details>

