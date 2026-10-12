---
topic: Grid Paths
pattern: [Best + count, 3 directions]
source: LeetCode 1301
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Number of Paths with Max Score

> [!TIP]
> **🧠 Memory hook**
> Carry **two numbers per cell**: the best score and how many paths reach it.
> **Mantra: LONGER → copy count · EQUAL → add counts**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=14) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Start at S (bottom-right), reach E (top-left) moving up, left or diagonally; digits add to the score and X blocks. Return the max score and the number of paths achieving it mod 10⁹ + 7 (or [0, 0]).

## Key insight
For each cell look at its three predecessor cells. The best score is the largest among reachable ones; the count sums the counts of those tied at that best.

## Approach: Score + ways
```java
// From 'S' (bottom-right) to 'E' (top-left) moving up, left or diagonally up-left; track best score and path count
public int[] pathsWithMaxScore(List<String> board) {
    int n = board.size();
    int[][] score = new int[n][n], ways = new int[n][n];
    for (int[] r : score) Arrays.fill(r, -1);
    score[n - 1][n - 1] = 0;
    ways[n - 1][n - 1] = 1;
    int[][] moves = {{1, 0}, {0, 1}, {1, 1}};
    for (int i = n - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--) {
            char c = board.get(i).charAt(j);
            if (c == 'X' || (i == n - 1 && j == n - 1)) continue;
            int best = -1, cnt = 0;
            for (int[] mv : moves) {
                int pi = i + mv[0], pj = j + mv[1];
                if (pi >= n || pj >= n || score[pi][pj] < 0) continue;
                if (score[pi][pj] > best) {
                    best = score[pi][pj];
                    cnt = ways[pi][pj];
                } else if (score[pi][pj] == best) cnt = (cnt + ways[pi][pj]) % MOD;
            }
            if (best < 0) continue;
            score[i][j] = best + (c == 'E' ? 0 : c - '0');
            ways[i][j] = cnt;
        }
    return score[0][0] < 0 ? new int[]{0, 0} : new int[]{score[0][0], ways[0][0]};
}
```

| Approach | Time | Space |
|---|---|---|
| Score + ways | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why score −1 for blocked?</summary>

It marks unreachable, since reachable scores are ≥ 0.

</details>


<details><summary>Where does E count?</summary>

E adds 0.

</details>


## Connected
- [Number of Longest Increasing Subsequence](../LIS%20and%20Variants/Number%20of%20Longest%20Increasing%20Subsequence.md)
- [Unique Paths II](Unique%20Paths%20II.md)
