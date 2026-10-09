---
topic: Shortest Paths
pattern: [Dijkstra on time]
source: LeetCode 3341
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Find Minimum Time to Reach Last Room I

> [!TIP]
> **🧠 Memory hook**
> Rooms open at set times; waiting is allowed, and each step takes one second.
> **Mantra: finish = max(now, opening) + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=12) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
moveTime[i][j] is the earliest time you may start moving into (i, j); a move takes 1 second. Return the minimum time to reach the last room.

## Key insight
Dijkstra on time. Entering room (x, y) from time t finishes at max(t, moveTime) + 1; waiting is free, and times never decrease along a path.

## Approach: Dijkstra
```java
// Dijkstra on time: entering a room finishes at max(now, its opening time) + 1
public int minTimeToReach(int[][] moveTime) {
    int m = moveTime.length, n = moveTime[0].length;
    int[][] best = new int[m][n];
    for (int[] row : best) Arrays.fill(row, Integer.MAX_VALUE);
    best[0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > best[top[1]][top[2]]) continue;
        if (top[1] == m - 1 && top[2] == n - 1) return top[0];
        for (int[] d : DIRS) {
            int x = top[1] + d[0], y = top[2] + d[1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int arrive = Math.max(top[0], moveTime[x][y]) + 1;
            if (arrive < best[x][y]) { best[x][y] = arrive; pq.add(new int[]{arrive, x, y}); }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra | O(mn log mn) | O(m · n) |

## Recall before you reveal
<details><summary>Why not BFS?</summary>

Waiting makes edge costs unequal.

</details>


<details><summary>Why max(t, moveTime)?</summary>

You must wait until the room opens.

</details>


## Connected
- [Find Minimum Time to Reach Last Room II](Find%20Minimum%20Time%20to%20Reach%20Last%20Room%20II.md)
- [Minimum Time to Visit a Cell In a Grid](Minimum%20Time%20to%20Visit%20a%20Cell%20In%20a%20Grid.md)
