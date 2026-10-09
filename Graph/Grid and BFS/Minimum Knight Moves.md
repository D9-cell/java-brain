---
topic: Grid and BFS
pattern: [BFS layers, Symmetry]
source: LeetCode 1197
difficulty: Medium
companies: [MathWorks, DoorDash, Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Minimum Knight Moves

> [!TIP]
> **🧠 Memory hook**
> The knight's moves ripple outwards on an endless board; use symmetry to explore only a quarter.
> **Mantra: FOLD TO FIRST QUADRANT, ALLOW −2 MARGIN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=15) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
A knight starts at (0, 0) on an infinite board. Return the fewest moves to reach (x, y).

## Key insight
The board is symmetric, so replace (x, y) by (|x|, |y|). BFS then only needs coordinates ≥ −2: going further out never helps. A memoised recursion on (max, min) with base cases also works.

## Approach 1: BFS with symmetry
```java
// BFS using symmetry: only the first quadrant matters, but the path may dip to -2 on each axis
public int minKnightMovesBfs(int x, int y) {
    x = Math.abs(x);
    y = Math.abs(y);
    Set<Long> visited = new HashSet<>();
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{0, 0});
    visited.add(key(0, 0));
    int level = 0;
    while (!que.isEmpty()) {
        for (int size = que.size(); size > 0; size--) {
            int[] c = que.poll();
            if (c[0] == x && c[1] == y) return level;
            for (int[] d : DIRS) {
                int nx = c[0] + d[0], ny = c[1] + d[1];
                if (nx >= -2 && ny >= -2 && visited.add(key(nx, ny))) que.add(new int[]{nx, ny});
            }
        }
        level++;
    }
    return -1;
}

// Packs a coordinate pair into one long for the visited set
private long key(int x, int y) {
    return ((long) x << 32) ^ (y & 0xffffffffL);
}
```

## Approach 2: Memoised recursion
```java
// Memoised recursion on the folded target (|x| >= |y|): the knight's last move came from (x-2, y-1) or (x-1, y-2)
public int minKnightMovesDfs(int x, int y) {
    Map<Long, Integer> memo = new HashMap<>();
    memo.put(key(0, 0), 0);
    memo.put(key(1, 0), 3);
    memo.put(key(2, 0), 2);
    memo.put(key(1, 1), 2);
    return dfs(x, y, memo);
}

// Shortest distance to (i, j) by symmetry and memoisation
private int dfs(int i, int j, Map<Long, Integer> memo) {
    i = Math.abs(i);
    j = Math.abs(j);
    if (i < j) { int t = i; i = j; j = t; }
    Integer known = memo.get(key(i, j));
    if (known != null) return known;
    int best = 1 + Math.min(dfs(i - 2, j - 1, memo), dfs(i - 1, j - 2, memo));
    memo.put(key(i, j), best);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS with symmetry | O(|x| · |y|) | O(|x| · |y|) |
| Memoised recursion | O(|x| · |y|) | O(|x| · |y|) |

## Recall before you reveal
<details><summary>Why allow coordinates down to −2?</summary>

The shortest path to (1, 1) uses (−1, 2).

</details>


<details><summary>Why fold by symmetry?</summary>

It cuts the search space by a factor of 8.

</details>


## Connected
- [Shortest Path in Binary Matrix](Shortest%20Path%20in%20Binary%20Matrix.md)
