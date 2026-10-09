---
topic: Shortest Paths
pattern: [Minimax Dijkstra, Binary search]
source: LeetCode 1631
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Path With Minimum Effort

> [!TIP]
> **🧠 Memory hook**
> A hiker who cares only about the steepest single step.
> **Mantra: COST = max(previous, this step)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=3) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Find the path from top-left to bottom-right minimising the largest absolute height difference between consecutive cells.

## Key insight
The cost of a path is its maximum edge, not its sum, but it still never decreases along a path, so Dijkstra works with `max` in place of `+`. Alternatively binary search the limit and check reachability with DFS.

## Approach 1: Dijkstra with max
```java
// Dijkstra where the "distance" of a cell is the smallest possible maximum step on any path to it
public int minimumEffortPath(int[][] h) {
    int m = h.length, n = h[0].length;
    int[][] effort = new int[m][n];
    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);
    effort[0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int e = top[0], i = top[1], j = top[2];
        if (e > effort[i][j]) continue;
        if (i == m - 1 && j == n - 1) return e;
        for (int[] d : DIRS) {
            int x = i + d[0], y = j + d[1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int next = Math.max(e, Math.abs(h[x][y] - h[i][j]));
            if (next < effort[x][y]) {
                effort[x][y] = next;
                pq.add(new int[]{next, x, y});
            }
        }
    }
    return 0;
}
```

## Approach 2: Binary search + DFS
```java
// Binary search the effort limit; for each limit a DFS checks whether the corner is reachable using steps no bigger than it
public int minimumEffortPathBinarySearch(int[][] h) {
    int low = 0, high = 1_000_000, answer = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (reachable(h, 0, 0, mid, new boolean[h.length][h[0].length])) { answer = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return answer;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with max | O(mn log mn) | O(mn) |
| Binary search + DFS | O(mn log H) | O(mn) |

## Recall before you reveal
<details><summary>Why does Dijkstra still work?</summary>

The path cost is monotone non-decreasing as the path grows.

</details>


<details><summary>Why is binary search valid?</summary>

If a path exists with effort ≤ e, it exists for any larger e.

</details>


## Connected
- [Swim in Rising Water](Swim%20in%20Rising%20Water.md)
- [Minimize the Maximum Edge Weight of Graph](../Trees%20and%20Advanced%20Graphs/Minimize%20the%20Maximum%20Edge%20Weight%20of%20Graph.md)
