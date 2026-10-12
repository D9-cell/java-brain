---
topic: Grid Paths
pattern: [Balance state, Boolean DP]
source: LeetCode 2267
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Check if There Is a Valid Parentheses String Path

> [!TIP]
> **🧠 Memory hook**
> Track which **open-bracket balances** can exist at each cell.
> **Mantra: ok[i][j][b] → ok[next][b ± 1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=12) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
A grid holds ( and ). Is there a right/down path from the top-left to the bottom-right whose characters form a valid parentheses string?

## Key insight
A valid string has even length m + n − 1 and never dips below balance 0, ending at 0. ok[i][j][b] says some path reaches (i, j) with balance b; step pushes b up for ( and down for ).

## Approach: Balance table
```java
// ok[i][j][b] = some path reaches (i, j) with open-bracket balance b
public boolean hasValidPath(char[][] grid) {
    int m = grid.length, n = grid[0].length, len = m + n - 1;
    if (len % 2 == 1 || grid[0][0] == ')' || grid[m - 1][n - 1] == '(') return false;
    boolean[][][] ok = new boolean[m][n][len + 2];
    ok[0][0][1] = true;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            for (int b = 0; b <= len; b++) {
                if (!ok[i][j][b]) continue;
                if (i + 1 < m) step(ok[i + 1][j], b, grid[i + 1][j]);
                if (j + 1 < n) step(ok[i][j + 1], b, grid[i][j + 1]);
            }
    return ok[m - 1][n - 1][0];
}

// Marks the balance reached after reading one more bracket
private void step(boolean[] target, int b, char c) {
    int nb = c == '(' ? b + 1 : b - 1;
    if (nb >= 0 && nb < target.length) target[nb] = true;
}
```

| Approach | Time | Space |
|---|---|---|
| Balance table | O(m · n · (m + n)) | O(m · n · (m + n)) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Quick rejects?</summary>

Odd length, a start of ) or an end of (.

</details>


<details><summary>Why balance ≤ m + n?</summary>

A path has only m + n − 1 characters.

</details>


## Connected
- [Valid Parenthesis String](../Jumps%20and%20Reach/Valid%20Parenthesis%20String.md)
- [Paths in Matrix Whose Sum Is Divisible by K](Paths%20in%20Matrix%20Whose%20Sum%20Is%20Divisible%20by%20K.md)
