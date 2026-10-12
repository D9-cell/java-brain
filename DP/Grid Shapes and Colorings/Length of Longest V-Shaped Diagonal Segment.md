---
topic: Grid Shapes and Colorings
pattern: [Direction + turn state, Memo]
source: LeetCode 3459
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Length of Longest V-Shaped Diagonal Segment

> [!TIP]
> **🧠 Memory hook**
> State = **(cell, direction, turn still available?)**. The required value is forced by the cell: 1 → 2 → 0 → 2 → 0.
> **Mantra: KEEP GOING · OR TURN CLOCKWISE ONCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=7) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
A V-shaped segment starts at a 1, follows 2, 0, 2, 0, ... along a diagonal and may make one clockwise 90° turn to another diagonal. Return the longest length (0 if no 1).

## Key insight
From each 1 try the four diagonals. At each step either keep the direction or, if the turn is unused, turn clockwise. The next required value alternates 2, 0, 2, 0 and is known from the cell, so a memo on (r, c, direction, canTurn) is enough.

## Approach: Memoised walk
```java
public class LengthOfLongestVShapedDiagonalSegment {
    private static final int[][] DIRS = {{1, 1}, {1, -1}, {-1, -1}, {-1, 1}};
    private int m, n;
    private int[][] grid;
    private int[][][][] memo;

    // Start at every 1, try the 4 diagonals; the sequence is 1, 2, 0, 2, 0, ... with at most one clockwise turn
    public int lenOfVDiagonal(int[][] grid) {
        this.grid = grid;
        m = grid.length;
        n = grid[0].length;
        memo = new int[m][n][4][2];
        int best = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1)
                    for (int d = 0; d < 4; d++) best = Math.max(best, 1 + walk(i, j, d, 1, 2));
        return best;
    }

    // Longest continuation from (i, j) heading d; canTurn = 1 while the single turn is still unused; want is the next required value
    private int walk(int i, int j, int d, int canTurn, int want) {
        int r = i + DIRS[d][0], c = j + DIRS[d][1];
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != want) return 0;
        if (memo[r][c][d][canTurn] != 0) return memo[r][c][d][canTurn] - 1;
        int next = want == 2 ? 0 : 2;
        int best = 1 + walk(r, c, d, canTurn, next);
        if (canTurn == 1) best = Math.max(best, 1 + walk(r, c, (d + 1) % 4, 0, next));
        memo[r][c][d][canTurn] = best + 1;
        return best;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Memoised walk | O(m · n · 8) | O(m · n · 8) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why memo shared across starts?</summary>

The future depends only on the cell, direction and turn flag.

</details>


<details><summary>Why (d + 1) % 4?</summary>

DIRS are listed in clockwise order.

</details>


## Connected
- [Maximal Square](Maximal%20Square.md)
