---
topic: Search on the Answer Distances and K-th Values
pattern: [Search on the answer, Grid BFS]
source: LeetCode 1970
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Last Day Where You Can Still Cross

> [!TIP]
> **🧠 Memory hook**
> More flooded cells only block paths, so crossing is possible up to some day. Binary search the day; **BFS from the top row** through land.
> **Mantra: canCross(day): flood first day cells · BFS top → bottom · ok → lo = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=11) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Each day one cell floods. Return the last day on which you can still walk from the top row to the bottom row on land (4 directions).

## Key insight
Each check rebuilds the grid and runs BFS in O(row · col). Union-find in reverse (adding land back day by day) is the alternative.

## Approach: Binary search + BFS
```java
// Largest day d where land still connects the top row to the bottom row (BFS check)
public int latestDayToCross(int row, int col, int[][] cells) {
    int lo = 0, hi = cells.length;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (canCross(row, col, cells, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Floods the first day cells, then BFS from every land cell in the top row
boolean canCross(int row, int col, int[][] cells, int day) {
    boolean[][] water = new boolean[row][col];
    for (int i = 0; i < day; i++) water[cells[i][0] - 1][cells[i][1] - 1] = true;
    Deque<int[]> q = new ArrayDeque<>();
    boolean[][] seen = new boolean[row][col];
    for (int c = 0; c < col; c++)
        if (!water[0][c]) {
            seen[0][c] = true;
            q.add(new int[]{0, c});
        }
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        if (cur[0] == row - 1) return true;
        for (int[] d : dirs) {
            int r = cur[0] + d[0], c = cur[1] + d[1];
            if (r < 0 || c < 0 || r >= row || c >= col || water[r][c] || seen[r][c]) continue;
            seen[r][c] = true;
            q.add(new int[]{r, c});
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + BFS | O(rc log rc) | O(rc) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why monotonic?</summary>

Flooding never opens a path.

</details>


<details><summary>Reverse union-find?</summary>

Add cells back from the last day and stop when top and bottom join.

</details>


## Connected
- [Find the Safest Path in a Grid](Find%20the%20Safest%20Path%20in%20a%20Grid.md)
- [Number of Islands](../../Graph/Grid%20and%20BFS/Number%20of%20Islands.md)
