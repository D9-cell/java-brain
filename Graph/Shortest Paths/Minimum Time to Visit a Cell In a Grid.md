---
topic: Shortest Paths
pattern: [Dijkstra on time, Parity]
source: LeetCode 2577
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Minimum Time to Visit a Cell In a Grid

> [!TIP]
> **🧠 Memory hook**
> You cannot stand still, so early arrivals must burn time in pairs by stepping back and forth.
> **Mantra: ARRIVE EARLY ⇒ WAIT IN STEPS OF 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=11) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
You must move every second. A cell may only be entered at time ≥ grid[i][j]. Return the earliest time to reach the bottom-right, or −1.

## Key insight
Dijkstra on arrival time. If you reach a neighbour before it opens, you can oscillate between two cells, which delays you by an even amount, so the arrival is the opening time plus 0 or 1 to match parity. If both neighbours of the start are closed past time 1, it is −1.

## Approach: Dijkstra with parity wait
```java
// Dijkstra on arrival time. If we arrive too early, bounce between two cells to burn time in pairs, so the wait keeps its parity
public int minimumTime(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    if (grid[0][1] > 1 && grid[1][0] > 1) return -1;
    int[][] time = new int[m][n];
    for (int[] row : time) Arrays.fill(row, Integer.MAX_VALUE);
    time[0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int t = top[0], i = top[1], j = top[2];
        if (t > time[i][j]) continue;
        if (i == m - 1 && j == n - 1) return t;
        for (int[] d : DIRS) {
            int x = i + d[0], y = j + d[1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int arrive = t + 1;
            if (grid[x][y] > arrive) arrive = grid[x][y] + ((grid[x][y] - arrive) % 2);
            if (arrive < time[x][y]) {
                time[x][y] = arrive;
                pq.add(new int[]{arrive, x, y});
            }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with parity wait | O(mn log mn) | O(m · n) |

## Recall before you reveal
<details><summary>Why the parity adjustment?</summary>

Oscillating changes the time by 2 each round, so the arrival keeps the parity of the first possible time.

</details>


<details><summary>When is the answer −1?</summary>

When you cannot make the very first move (both neighbours need time > 1).

</details>


## Connected
- [Find Minimum Time to Reach Last Room I](Find%20Minimum%20Time%20to%20Reach%20Last%20Room%20I.md)
