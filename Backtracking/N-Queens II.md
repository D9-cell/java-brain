---
topic: Backtracking
pattern: [Bitmask backtracking]
source: LeetCode 52
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# N-Queens II

> [!TIP]
> **🧠 Memory hook**
> The same board, counted with bit tricks.
> **Mantra: BITMASKS, free & −free, SHIFT DIAGONALS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=19) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Count the N-Queens solutions.

## Key insight
Columns and diagonals as bitmasks; diagonals shift by one per row.

## Approach: Bitmask
```java
// Same search as N-Queens but only counting; bitmasks for columns and diagonals
private int solve(int n, int row, int cols, int d1, int d2) {
    if (row == n) return 1;
    int count = 0, free = ~(cols | d1 | d2) & ((1 << n) - 1);
    while (free != 0) {
        int bit = free & -free;
        free -= bit;
        count += solve(n, row + 1, cols | bit, (d1 | bit) << 1, (d2 | bit) >> 1);
    }
    return count;
}

// Entry point
public int totalNQueens(int n) { return solve(n, 0, 0, 0, 0); }
```

| Approach | Time | Space |
|---|---|---|
| Bitmask | O(n!) | O(n) |

## Recall before you reveal
<details><summary>Lowest set bit?</summary>

x & −x.

</details>


## Connected
- [N-Queens](N-Queens.md)
