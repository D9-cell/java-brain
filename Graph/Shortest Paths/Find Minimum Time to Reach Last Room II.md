---
topic: Shortest Paths
pattern: [Dijkstra with parity state]
source: LeetCode 3342
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Find Minimum Time to Reach Last Room II

> [!TIP]
> **🧠 Memory hook**
> The cost of the next step depends on how many steps you took: alternate 1 and 2 seconds.
> **Mantra: STATE = (CELL, MOVES MOD 2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=13) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Same as Room I but moves alternate between 1 and 2 seconds, starting with 1.

## Key insight
The next move's cost depends on the parity of moves made so far, so every cell has two states. Dijkstra over (cell, parity): each move flips the parity and costs 1 or 2.

## Approach: Dijkstra over (cell, parity)
```java
// Dijkstra on (time, cell, parity of moves made): odd-numbered moves cost 1, even-numbered moves cost 2
public int minTimeToReach(int[][] moveTime) {
    int m = moveTime.length, n = moveTime[0].length;
    int[][][] best = new int[m][n][2];
    for (int[][] a : best) for (int[] b : a) Arrays.fill(b, Integer.MAX_VALUE);
    best[0][0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int t = top[0], i = top[1], j = top[2], parity = top[3];
        if (t > best[i][j][parity]) continue;
        if (i == m - 1 && j == n - 1) return t;
        int cost = parity == 0 ? 1 : 2;
        for (int[] d : DIRS) {
            int x = i + d[0], y = j + d[1];
            if (x < 0 || x >= m || y < 0 || y >= n) continue;
            int arrive = Math.max(t, moveTime[x][y]) + cost;
            if (arrive < best[x][y][1 - parity]) {
                best[x][y][1 - parity] = arrive;
                pq.add(new int[]{arrive, x, y, 1 - parity});
            }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra over (cell, parity) | O(mn log mn) | O(m · n) |

## Recall before you reveal
<details><summary>Why two states per cell?</summary>

Arriving with different parities leads to different future costs.

</details>


<details><summary>Can parity be dropped?</summary>

No, it changes costs.

</details>


## Connected
- [Find Minimum Time to Reach Last Room I](Find%20Minimum%20Time%20to%20Reach%20Last%20Room%20I.md)
