---
topic: Grid Paths
pattern: [Three walkers, Triangle DP]
source: LeetCode 3363
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find the Maximum Number of Fruits Collected

> [!TIP]
> **🧠 Memory hook**
> Child 1 has **no choice**: n − 1 moves force the main diagonal. The other two walk in separate triangles.
> **Mantra: DIAGONAL FIRST; THEN TRIANGLE DP FOR CHILD 2, TRANSPOSE FOR CHILD 3**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=18) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Three children start at (0,0), (0,n−1) and (n−1,0) and must reach (n−1,n−1) in exactly n − 1 moves. A room's fruits are collected once. Return the maximum total.

## Key insight
Child 1 can only take the diagonal, so those fruits are fixed and the diagonal is zeroed. Child 2 moves down one row per step and stays in the upper-right triangle; child 3 is the same problem on the transposed grid. The triangles meet only on the zeroed diagonal, so there is no double counting.

## Approach: Diagonal + two triangles
```java
// Child 1 must walk the main diagonal; children 2 and 3 are the same triangle DP on the grid and its transpose
public int maxCollectedFruits(int[][] fruits) {
    int n = fruits.length, total = 0;
    int[][] f = new int[n][], t = new int[n][n];
    for (int i = 0; i < n; i++) {
        f[i] = fruits[i].clone();
        total += f[i][i];
        f[i][i] = 0;
    }
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) t[j][i] = f[i][j];
    return total + upperChild(f) + upperChild(t);
}

// Best fruits for a child that starts at the top-right, moves down one row per step and must end at the bottom-right
private int upperChild(int[][] f) {
    int n = f.length, NEG = Integer.MIN_VALUE;
    int[] prev = new int[n];
    Arrays.fill(prev, NEG);
    prev[n - 1] = f[0][n - 1];
    for (int i = 1; i < n; i++) {
        int[] cur = new int[n];
        Arrays.fill(cur, NEG);
        for (int j = Math.max(i, n - 1 - i); j < n; j++) {
            int best = prev[j];
            if (j > 0) best = Math.max(best, prev[j - 1]);
            if (j + 1 < n) best = Math.max(best, prev[j + 1]);
            if (best != NEG) cur[j] = best + f[i][j];
        }
        prev = cur;
    }
    return prev[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Diagonal + two triangles | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why can child 1 only use the diagonal?</summary>

It needs n − 1 moves to cover n − 1 rows and columns, so every move is diagonal.

</details>


<details><summary>Why a transpose?</summary>

Child 3 moving right is child 2 moving down with rows and columns swapped.

</details>


## Connected
- [Cherry Pickup II](Cherry%20Pickup%20II.md)
- [Minimum Falling Path Sum](Minimum%20Falling%20Path%20Sum.md)
