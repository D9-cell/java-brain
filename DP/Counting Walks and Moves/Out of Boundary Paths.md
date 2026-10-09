---
topic: Counting Walks and Moves
pattern: [Layer per move, Grid walks]
source: LeetCode 576
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Out of Boundary Paths

> [!TIP]
> **🧠 Memory hook**
> Spread the ball like **ink**: each move pushes every count to its four neighbours, and whatever falls off is counted.
> **Mantra: next[nb] += dp[cell]; OFF THE GRID → out += dp[cell]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=20) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
A ball starts at (startRow, startColumn) in an m × n grid. Each move goes up, down, left or right. Count the paths that move the ball out of the grid using at most maxMove moves, modulo 1e9+7.

## Key insight
Layer DP: dp holds how many paths stand on each cell after t moves. Each move pushes counts to neighbours; moves that leave the grid add to the answer instead of a cell.

## Approach 1: Layers over the grid
```java
// dp[r][c] = ways to stand on (r, c) after the current number of moves; count every exit
public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
    long[][] dp = new long[m][n];
    dp[startRow][startColumn] = 1;
    long out = 0;
    for (int move = 0; move < maxMove; move++) {
        long[][] next = new long[m][n];
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++) {
                if (dp[r][c] == 0) continue;
                for (int[] d : DIRS) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr < 0 || nr >= m || nc < 0 || nc >= n) out = (out + dp[r][c]) % MOD;
                    else next[nr][nc] = (next[nr][nc] + dp[r][c]) % MOD;
                }
            }
        dp = next;
    }
    return (int) out;
}
```

## Approach 2: Top-down memo
```java
// Top-down over (row, column, moves left)
public int findPathsMemo(int m, int n, int maxMove, int startRow, int startColumn) {
    long[][][] memo = new long[m][n][maxMove + 1];
    for (long[][] a : memo) for (long[] b : a) Arrays.fill(b, -1);
    return (int) exits(m, n, startRow, startColumn, maxMove, memo);
}

// Exits reachable from (r, c) with left moves
private long exits(int m, int n, int r, int c, int left, long[][][] memo) {
    if (r < 0 || r >= m || c < 0 || c >= n) return 1;
    if (left == 0) return 0;
    if (memo[r][c][left] >= 0) return memo[r][c][left];
    long res = 0;
    for (int[] d : DIRS) res += exits(m, n, r + d[0], c + d[1], left - 1, memo);
    return memo[r][c][left] = res % MOD;
}
```

| Approach | Time | Space |
|---|---|---|
| Layers over the grid | O(maxMove · m · n) | O(m · n) |
| Top-down memo | O(maxMove · m · n) | O(maxMove · m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is "at most" free here?</summary>

Each exit is counted at the move it happens, so shorter paths are included automatically.

</details>


<details><summary>Base case in the memo?</summary>

Off the grid counts 1; out of moves on the grid counts 0.

</details>


## Connected
- [Knight Probability in Chessboard](Knight%20Probability%20in%20Chessboard.md)
- [Number of Ways to Stay in the Same Place After Some Steps](Number%20of%20Ways%20to%20Stay%20in%20the%20Same%20Place%20After%20Some%20Steps.md)
