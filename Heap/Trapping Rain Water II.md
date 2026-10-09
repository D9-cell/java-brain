---
topic: Heap
pattern: [Min-heap BFS from the boundary]
source: LeetCode 407
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Trapping Rain Water II

> [!TIP]
> **🧠 Memory hook**
> Water leaks over the lowest point of the surrounding wall.
> **Mantra: BORDER IN MIN-HEAP, EXPAND LOWEST, FILL TO WALL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=30) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Volume of water trapped by a 2-D elevation map.

## Key insight
Start with the border as the wall. Always expand from the lowest wall cell; a lower neighbour holds water up to that wall, and the frontier height becomes max(wall, neighbour).

## Approach: Priority-queue flood
```java
// Start from the border; always expand from the LOWEST wall (min-heap); a lower neighbour fills up to that wall
public int trapRainWater(int[][] h) {
    int m = h.length, n = h[0].length;
    boolean[][] seen = new boolean[m][n];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++)
        if (i == 0 || j == 0 || i == m - 1 || j == n - 1) { pq.offer(new int[]{h[i][j], i, j}); seen[i][j] = true; }
    int water = 0;
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!pq.isEmpty()) {
        int[] c = pq.poll();
        for (int[] d : dirs) {
            int x = c[1] + d[0], y = c[2] + d[1];
            if (x < 0 || y < 0 || x >= m || y >= n || seen[x][y]) continue;
            seen[x][y] = true;
            water += Math.max(0, c[0] - h[x][y]);
            pq.offer(new int[]{Math.max(c[0], h[x][y]), x, y});
        }
    }
    return water;
}
```

| Approach | Time | Space |
|---|---|---|
| Priority-queue flood | O(mn log mn) | O(mn) |

> [!WARNING]
> **Java gotcha**
> Verified against an iterative water-level relaxation.

## Recall before you reveal
<details><summary>Why the lowest wall?</summary>

Water at a cell is limited by the lowest escape route.

</details>


## Connected
- 1-D version: the Stack folder
