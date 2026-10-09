---
topic: Shortest Paths
pattern: [0-1 BFS, Dijkstra]
source: LeetCode 3286
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Find a Safe Walk Through a Grid

> [!TIP]
> **🧠 Memory hook**
> Every 1 cell bites a point of health: minimise the bites on the way.
> **Mantra: LEAST DAMAGE, THEN health − damage ≥ 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=10) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Grid of 0 (safe) and 1 (unsafe, costs 1 health). Can you reach the bottom-right with health at least 1?

## Key insight
The total damage along a path is the sum of the 1s entered (including the start). So compute the minimum damage with 0-1 BFS or Dijkstra and compare with health − 1.

## Approach 1: 0-1 BFS
```java
// 0-1 BFS for the least damage taken on the way to the corner
public boolean findSafeWalk(List<List<Integer>> grid, int health) {
    int m = grid.size(), n = grid.get(0).size();
    int[][] damage = new int[m][n];
    for (int[] row : damage) Arrays.fill(row, Integer.MAX_VALUE);
    damage[0][0] = grid.get(0).get(0);
    Deque<int[]> dq = new ArrayDeque<>();
    dq.add(new int[]{0, 0});
    while (!dq.isEmpty()) {
        int[] c = dq.pollFirst();
        for (int[] d : DIRS) {
            int x = c[0] + d[0], y = c[1] + d[1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int cost = grid.get(x).get(y);
            if (damage[c[0]][c[1]] + cost < damage[x][y]) {
                damage[x][y] = damage[c[0]][c[1]] + cost;
                if (cost == 0) dq.addFirst(new int[]{x, y});
                else dq.addLast(new int[]{x, y});
            }
        }
    }
    return health - damage[m - 1][n - 1] >= 1;
}
```

## Approach 2: Dijkstra
```java
// Dijkstra over damage with a heap
public boolean findSafeWalkDijkstra(List<List<Integer>> grid, int health) {
    int m = grid.size(), n = grid.get(0).size();
    int[][] damage = new int[m][n];
    for (int[] row : damage) Arrays.fill(row, Integer.MAX_VALUE);
    damage[0][0] = grid.get(0).get(0);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{damage[0][0], 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > damage[top[1]][top[2]]) continue;
        for (int[] d : DIRS) {
            int x = top[1] + d[0], y = top[2] + d[1];
            if (x >= 0 && x < m && y >= 0 && y < n && top[0] + grid.get(x).get(y) < damage[x][y]) {
                damage[x][y] = top[0] + grid.get(x).get(y);
                pq.add(new int[]{damage[x][y], x, y});
            }
        }
    }
    return health - damage[m - 1][n - 1] >= 1;
}
```

| Approach | Time | Space |
|---|---|---|
| 0-1 BFS | O(m · n) | O(m · n) |
| Dijkstra | O(mn log mn) | O(m · n) |

## Recall before you reveal
<details><summary>Does the start cell count?</summary>

Yes, if grid[0][0] is 1 the first cell already costs health.

</details>


<details><summary>Why is it a shortest-path problem?</summary>

Total damage = sum of cell costs along the path.

</details>


## Connected
- [Minimum Obstacle Removal to Reach Corner](Minimum%20Obstacle%20Removal%20to%20Reach%20Corner.md)
