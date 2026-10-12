---
topic: Grid Paths
pattern: [Right/down DP, Solve backwards]
source: LeetCode 174
difficulty: Hard
companies: [Amazon, Microsoft, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Dungeon Game

> [!TIP]
> **🧠 Memory hook**
> Forward DP fails (health must never drop to 0), so ask the **reverse question**: how much health do I need on entering this cell?
> **Mantra: need = max(1, min(need_right, need_down) − cell)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=7) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
A knight crosses a dungeon grid moving right or down, gaining or losing health in each room. Return the minimum initial health so it never reaches 0 or below.

## Key insight
need[i][j] is the minimum health on entering (i, j). The best continuation needs min(need below, need right); this room changes health by cell, so entering needs that minus cell, but at least 1.

## Approach: Backwards table
```java
// need[i][j] = minimum health on entering (i, j) to survive to the princess; solved from the end backwards
public int calculateMinimumHP(int[][] dungeon) {
    int m = dungeon.length, n = dungeon[0].length;
    int[][] need = new int[m + 1][n + 1];
    for (int[] row : need) java.util.Arrays.fill(row, Integer.MAX_VALUE);
    need[m][n - 1] = 1;
    need[m - 1][n] = 1;
    for (int i = m - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--)
            need[i][j] = Math.max(1, Math.min(need[i + 1][j], need[i][j + 1]) - dungeon[i][j]);
    return need[0][0];
}
```

| Approach | Time | Space |
|---|---|---|
| Backwards table | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force walk over every path on small random grids when it was written.

## Recall before you reveal
<details><summary>Why not forward?</summary>

Both the running sum and its minimum matter, which one number cannot track.

</details>


<details><summary>Why max with 1?</summary>

Health must stay positive, even in a healing room.

</details>


## Connected
- [Minimum Path Sum](Minimum%20Path%20Sum.md)
- [Reducing Dishes](../Counting%20Walks%20and%20Moves/Reducing%20Dishes.md)
