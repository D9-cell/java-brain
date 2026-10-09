---
topic: HashMap
pattern: [Value → extremes]
source: LeetCode 3531
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Count Covered Buildings

> [!TIP]
> **🧠 Memory hook**
> Only each row's and column's extremes matter.
> **Mantra: ROW MIN/MAX, COLUMN MIN/MAX, STRICTLY INSIDE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=6) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count buildings with another building in all four directions.

## Key insight
A building has a left and right neighbour ⇔ its column is strictly between the row's min and max; same for columns.

## Approach: Row/column extremes
```java
// Per row keep min/max column, per column min/max row; covered ⇔ strictly inside both ranges
public int countCoveredBuildings(int n, int[][] buildings) {
    Map<Integer, int[]> row = new HashMap<>(), col = new HashMap<>();
    for (int[] b : buildings) {
        row.merge(b[0], new int[]{b[1], b[1]}, (o, x) -> new int[]{Math.min(o[0], x[0]), Math.max(o[1], x[1])});
        col.merge(b[1], new int[]{b[0], b[0]}, (o, x) -> new int[]{Math.min(o[0], x[0]), Math.max(o[1], x[1])});
    }
    int cnt = 0;
    for (int[] b : buildings) {
        int[] r = row.get(b[0]), c = col.get(b[1]);
        if (r[0] < b[1] && b[1] < r[1] && c[0] < b[0] && b[0] < c[1]) cnt++;
    }
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| Row/column extremes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against checking four directions directly.

## Recall before you reveal
<details><summary>Why strict?</summary>

A building cannot cover itself.

</details>

