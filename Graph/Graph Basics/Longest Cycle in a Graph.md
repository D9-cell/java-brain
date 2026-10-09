---
topic: Graph Basics
pattern: [Functional graph, DFS]
source: LeetCode 2360
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Longest Cycle in a Graph

> [!TIP]
> **🧠 Memory hook**
> Follow the arrows and leave a numbered pebble on each stop; stepping on a pebble from this very walk closes a loop whose length is the pebble gap.
> **Mantra: STAMP WALK + STEP; LENGTH = t − walk[u]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=26) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Each node has at most one outgoing edge. Return the length of the longest cycle, or −1.

## Key insight
With one outgoing edge per node, each walk either ends or enters a cycle exactly once. Stamp nodes with the walk number and the step; meeting a node stamped in the same walk gives the cycle length as the step difference.

## Approach 1: Stamped walks
```java
// Walks the single outgoing edges stamping each node with its step number; hitting a node from the same walk closes a cycle
public int longestCycleWalk(int[] edges) {
    int n = edges.length, best = -1;
    int[] stamp = new int[n], walk = new int[n];
    int step = 0;
    for (int start = 0; start < n; start++) {
        if (stamp[start] != 0) continue;
        int u = start;
        step++;
        int t = 0;
        while (u != -1 && stamp[u] == 0) {
            stamp[u] = step;
            walk[u] = t++;
            u = edges[u];
        }
        if (u != -1 && stamp[u] == step) best = Math.max(best, t - walk[u]);
    }
    return best;
}
```

## Approach 2: DFS with distances
```java
// DFS with distances and an in-path flag, the directed cycle check extended to measure the loop
public int longestCycleDfs(int[] edges) {
    int n = edges.length;
    boolean[] visited = new boolean[n], inPath = new boolean[n];
    int[] dist = new int[n];
    int[] best = {-1};
    for (int i = 0; i < n; i++) if (!visited[i]) dfs(i, edges, visited, inPath, dist, best);
    return best[0];
}

// Follows the one outgoing edge; reaching a node still on the path gives the cycle length
private void dfs(int u, int[] edges, boolean[] visited, boolean[] inPath, int[] dist, int[] best) {
    visited[u] = inPath[u] = true;
    int v = edges[u];
    if (v != -1) {
        if (!visited[v]) {
            dist[v] = dist[u] + 1;
            dfs(v, edges, visited, inPath, dist, best);
        } else if (inPath[v]) {
            best[0] = Math.max(best[0], dist[u] - dist[v] + 1);
        }
    }
    inPath[u] = false;
}
```

| Approach | Time | Space |
|---|---|---|
| Stamped walks | O(n) | O(n) |
| DFS with distances | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why does each node get visited once?</summary>

A node already stamped by an earlier walk cannot start a new cycle.

</details>


<details><summary>Why compare stamps?</summary>

Meeting an older walk's node means the cycle (if any) was already counted.

</details>


## Connected
- [Detect Cycle in a Directed Graph](Detect%20Cycle%20in%20a%20Directed%20Graph.md)
