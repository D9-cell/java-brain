---
topic: Counting Walks and Moves
pattern: [Probability DP, Layer per move]
source: LeetCode 688
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Knight Probability in Chessboard

> [!TIP]
> **🧠 Memory hook**
> Same ink spreading, but every move **splits the ink into eighths**.
> **Mantra: next[nb] += dp[cell] / 8; ANSWER = Σ dp AFTER k MOVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=21) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
A knight starts on (row, column) of an n × n board and makes k uniformly random moves (any of the 8, even off the board). Return the probability it is still on the board after k moves.

## Key insight
Probabilities instead of counts: each on-board square sends 1/8 of its probability to each on-board target. Off-board mass simply disappears. Sum the board after k layers.

## Approach 1: Probability layers
```java
// dp[r][c] = probability of standing on (r, c) after the current number of moves
public double knightProbability(int n, int k, int row, int column) {
    double[][] dp = new double[n][n];
    dp[row][column] = 1;
    for (int step = 0; step < k; step++) {
        double[][] next = new double[n][n];
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++) {
                if (dp[r][c] == 0) continue;
                for (int[] mv : MOVES) {
                    int nr = r + mv[0], nc = c + mv[1];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n) next[nr][nc] += dp[r][c] / 8;
                }
            }
        dp = next;
    }
    double total = 0;
    for (double[] line : dp) for (double p : line) total += p;
    return total;
}
```

## Approach 2: Top-down memo
```java
// Top-down: probability of surviving left moves from (r, c)
public double knightProbabilityMemo(int n, int k, int row, int column) {
    return stay(n, row, column, k, new Double[n][n][k + 1]);
}

// Average of the eight moves' survival probabilities
private double stay(int n, int r, int c, int left, Double[][][] memo) {
    if (r < 0 || r >= n || c < 0 || c >= n) return 0;
    if (left == 0) return 1;
    if (memo[r][c][left] != null) return memo[r][c][left];
    double s = 0;
    for (int[] mv : MOVES) s += stay(n, r + mv[0], c + mv[1], left - 1, memo);
    return memo[r][c][left] = s / 8;
}
```

| Approach | Time | Space |
|---|---|---|
| Probability layers | O(k · n²) | O(n²) |
| Top-down memo | O(k · n²) | O(k · n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not count paths and divide by 8^k?</summary>

The count overflows quickly; probabilities stay in [0, 1].

</details>


<details><summary>Once off the board?</summary>

The knight never comes back (the walk stops).

</details>


## Connected
- [Out of Boundary Paths](Out%20of%20Boundary%20Paths.md)
- [Soup Servings](Soup%20Servings.md)
- [Knight Dialer](Knight%20Dialer.md)
