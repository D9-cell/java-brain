---
topic: Recursion
pattern: [Backtracking on grid]
source: GFG
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Rat in a Maze Problem - I

> [!TIP]
> **🧠 Memory hook**
> A mouse with chalk: mark the floor, try every direction, wipe the chalk when leaving.
> **Mantra: BLOCK, TRY D L R U, UNBLOCK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=14) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Find all paths from (0,0) to (n−1,n−1) moving U/D/L/R through cells with 1, in sorted order.

## Key insight
DFS with a visited mark that is restored on return. Exploring D, L, R, U in that (alphabetical) order produces sorted output directly.

## Approach: Backtracking
```java
// Block the cell, try D/L/R/U, unblock on the way back (backtracking)
private void solve(int[][] m, int i, int j, StringBuilder path) {
    int n = m.length;
    if (i < 0 || j < 0 || i >= n || j >= n || m[i][j] == 0) return;
    if (i == n - 1 && j == n - 1) { result.add(path.toString()); return; }
    m[i][j] = 0;
    for (int d = 0; d < 4; d++) {
        path.append(NAMES[d]);
        solve(m, i + DIRS[d][0], j + DIRS[d][1], path);
        path.deleteCharAt(path.length() - 1);
    }
    m[i][j] = 1;
}

// Exploring in alphabetical order (D, L, R, U) yields the paths already sorted
public List<String> findPath(int[][] m) {
    solve(m, 0, 0, new StringBuilder());
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(4^(n²)) | O(n²) |

> [!WARNING]
> **Java gotcha**
> The C++ explores D, R, U, L. This version explores D, L, R, U (alphabetical) so GFG's "sorted" requirement is met without sorting.

## Recall before you reveal
<details><summary>Why restore the cell?</summary>

Other paths may pass through it.

</details>


## Connected
- [Word Search II](../Trie/Word%20Search%20II.md) (grid DFS + trie)
