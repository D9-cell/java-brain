---
topic: Search on the Answer Distances and K-th Values
pattern: [Multi-source BFS, Search on the answer]
source: LeetCode 2812
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find the Safest Path in a Grid

> [!TIP]
> **🧠 Memory hook**
> Multi-source BFS from every thief gives each cell's **safeness**. Then binary search s: is there a path using only cells with safeness **≥ s**?
> **Mantra: dist = BFS from thieves · pathExists(s) → lo = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=12) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
A path's safeness is the minimum Manhattan distance from any cell on it to any thief. Return the maximum safeness from (0, 0) to (n − 1, n − 1).

## Key insight
Requiring a higher s removes cells, so feasibility is monotonic. A max-bottleneck Dijkstra on dist also works.

## Approach: BFS + binary search
```java
// Distance to the nearest thief by multi-source BFS, then the largest s with a path using cells >= s
public int maximumSafenessFactor(List<List<Integer>> grid) {
    int n = grid.size();
    int[][] dist = new int[n][n];
    for (int[] row : dist) Arrays.fill(row, -1);
    Deque<int[]> q = new ArrayDeque<>();
    for (int r = 0; r < n; r++)
        for (int c = 0; c < n; c++)
            if (grid.get(r).get(c) == 1) {
                dist[r][c] = 0;
                q.add(new int[]{r, c});
            }
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        for (int[] d : dirs) {
            int r = cur[0] + d[0], c = cur[1] + d[1];
            if (r < 0 || c < 0 || r >= n || c >= n || dist[r][c] != -1) continue;
            dist[r][c] = dist[cur[0]][cur[1]] + 1;
            q.add(new int[]{r, c});
        }
    }
    int lo = 0, hi = Math.min(dist[0][0], dist[n - 1][n - 1]);
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (pathExists(dist, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// BFS from the top-left corner through cells at distance >= s
boolean pathExists(int[][] dist, int s) {
    int n = dist.length;
    boolean[][] seen = new boolean[n][n];
    Deque<int[]> q = new ArrayDeque<>(List.of(new int[]{0, 0}));
    seen[0][0] = true;
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        if (cur[0] == n - 1 && cur[1] == n - 1) return true;
        for (int[] d : dirs) {
            int r = cur[0] + d[0], c = cur[1] + d[1];
            if (r < 0 || c < 0 || r >= n || c >= n || seen[r][c] || dist[r][c] < s) continue;
            seen[r][c] = true;
            q.add(new int[]{r, c});
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS + binary search | O(n² log n) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why multi-source BFS?</summary>

It gives every cell its nearest-thief distance in one pass.

</details>


<details><summary>Upper bound?</summary>

min(dist at start, dist at end).

</details>


## Connected
- [Last Day Where You Can Still Cross](Last%20Day%20Where%20You%20Can%20Still%20Cross.md)
- [01 Matrix](../../DP/Grid%20Paths/01%20Matrix.md)
