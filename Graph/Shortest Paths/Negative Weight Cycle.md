---
topic: Shortest Paths
pattern: [Bellman-Ford, Cycle detection]
source: GfG
difficulty: Medium
companies: [Amazon, Microsoft, Cisco]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Negative Weight Cycle

> [!TIP]
> **🧠 Memory hook**
> Going round a loop makes you shorter each lap: distances never settle.
> **Mantra: STILL IMPROVING IN ROUND n ⇒ NEGATIVE CYCLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=26) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Does the weighted directed graph contain a cycle of negative total weight?

## Key insight
Start every node at 0 (a hidden source) and relax all edges n times. If round n still improves something, a negative cycle exists. Floyd-Warshall gives it too: a negative d[i][i].

## Approach 1: Bellman-Ford from every node
```java
// Bellman-Ford with every node starting at 0 (a virtual source): if round n still improves something, a negative cycle exists
public int isNegativeWeightCycle(int n, int[][] edges) {
    int[] dist = new int[n];
    for (int round = 1; round <= n; round++) {
        for (int[] e : edges) {
            if (dist[e[0]] + e[2] < dist[e[1]]) {
                if (round == n) return 1;
                dist[e[1]] = dist[e[0]] + e[2];
            }
        }
    }
    return 0;
}
```

## Approach 2: Floyd-Warshall
```java
// Floyd-Warshall: a node whose distance to itself becomes negative lies on a negative cycle
public int isNegativeWeightCycleFloyd(int n, int[][] edges) {
    long INF = Long.MAX_VALUE / 4;
    long[][] d = new long[n][n];
    for (long[] row : d) Arrays.fill(row, INF);
    for (int i = 0; i < n; i++) d[i][i] = 0;
    for (int[] e : edges) d[e[0]][e[1]] = Math.min(d[e[0]][e[1]], e[2]);
    for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (d[i][k] < INF && d[k][j] < INF) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    for (int i = 0; i < n; i++) if (d[i][i] < 0) return 1;
    return 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Bellman-Ford from every node | O(V · E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |

## Recall before you reveal
<details><summary>Why start every node at 0?</summary>

The cycle may not be reachable from any single source.

</details>


<details><summary>What does Floyd show?</summary>

d[i][i] < 0 for nodes on a negative cycle.

</details>


## Connected
- [Distance from the Source (Bellman-Ford Algorithm)](Distance%20from%20the%20Source%20%28Bellman-Ford%20Algorithm%29.md)
