---
topic: Shortest Paths
pattern: [Floyd-Warshall, All pairs]
source: GfG
difficulty: Medium
companies: [Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Floyd Warshall

> [!TIP]
> **🧠 Memory hook**
> Try every city as a possible stop-over for every pair.
> **Mantra: via OUTERMOST: d[i][j] = min(d[i][j], d[i][via] + d[via][j])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=27) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
All-pairs shortest paths from an adjacency matrix where −1 means no edge.

## Key insight
Dynamic programming over the set of allowed intermediate nodes: after round k, d[i][j] is the best path using only nodes 0..k as stop-overs. The intermediate loop must be outermost.

## Approach: Floyd-Warshall
```java
// Turn "no edge" into a big number, then let each node k act as a stop-over for every pair (i, j)
public void shortestDistance(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (matrix[i][j] == -1) matrix[i][j] = INF;
    for (int via = 0; via < n; via++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) matrix[i][j] = Math.min(matrix[i][j], matrix[i][via] + matrix[via][j]);
        }
    }
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (matrix[i][j] >= INF) matrix[i][j] = -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Floyd-Warshall | O(n³) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Use a big number that cannot overflow when added to itself.

## Recall before you reveal
<details><summary>Why is `via` the outer loop?</summary>

The recurrence needs the table for the previous set of intermediates.

</details>


<details><summary>Why replace −1 by a big number?</summary>

So the min and the sum behave.

</details>


## Connected
- [Find the City With the Smallest Number of Neighbors at a Threshold Distance](Find%20the%20City%20With%20the%20Smallest%20Number%20of%20Neighbors%20at%20a%20Threshold%20Distance.md)
