---
topic: Trees and Advanced Graphs
pattern: [Functional graph, BFS]
source: LeetCode 2359
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Find Closest Node to Given Two Nodes

> [!TIP]
> **🧠 Memory hook**
> Two walkers follow one-way arrows; the best meeting place minimises whoever has to walk farther.
> **Mantra: MIN OF MAX(d1, d2); TIES → SMALLER INDEX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=20) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Each node has at most one outgoing edge. Return the node reachable from both node1 and node2 that minimises max(dist1, dist2), smallest index on ties, or −1.

## Key insight
With one outgoing edge each, a BFS is a single walk. Compute the two distance arrays and scan nodes by index, keeping the strictly smaller maximum.

## Approach 1: Walk both sources
```java
// Walks each source along its single outgoing edges to get distances, then picks the node minimising the larger of the two (ties: smaller index)
public int closestMeetingNode(int[] edges, int node1, int node2) {
    int n = edges.length;
    int[] d1 = distances(edges, node1), d2 = distances(edges, node2);
    int best = -1, bestDist = Integer.MAX_VALUE;
    for (int i = 0; i < n; i++) {
        if (d1[i] == -1 || d2[i] == -1) continue;
        int worst = Math.max(d1[i], d2[i]);
        if (worst < bestDist) { bestDist = worst; best = i; }
    }
    return best;
}

// BFS distances from a source (each node has at most one successor, so the queue holds one node)
private int[] distances(int[] edges, int start) {
    int[] dist = new int[edges.length];
    Arrays.fill(dist, -1);
    Queue<Integer> que = new ArrayDeque<>(List.of(start));
    dist[start] = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        int v = edges[u];
        if (v != -1 && dist[v] == -1) { dist[v] = dist[u] + 1; que.add(v); }
    }
    return dist;
}
```

## Approach 2: DFS distances
```java
// DFS version of the same distance computation
public int closestMeetingNodeDfs(int[] edges, int node1, int node2) {
    int n = edges.length;
    int[] d1 = new int[n], d2 = new int[n];
    Arrays.fill(d1, -1);
    Arrays.fill(d2, -1);
    dfs(edges, node1, 0, d1);
    dfs(edges, node2, 0, d2);
    int best = -1, bestDist = Integer.MAX_VALUE;
    for (int i = 0; i < n; i++) {
        if (d1[i] == -1 || d2[i] == -1) continue;
        if (Math.max(d1[i], d2[i]) < bestDist) { bestDist = Math.max(d1[i], d2[i]); best = i; }
    }
    return best;
}

// Stamps distances along the single path from u
private void dfs(int[] edges, int u, int d, int[] dist) {
    if (u == -1 || dist[u] != -1) return;
    dist[u] = d;
    dfs(edges, edges[u], d + 1, dist);
}
```

| Approach | Time | Space |
|---|---|---|
| Walk both sources | O(n) | O(n) |
| DFS distances | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why strict < in the scan?</summary>

It keeps the smallest index among equal answers.

</details>


<details><summary>What if a node is reachable from one source only?</summary>

It is skipped.

</details>


## Connected
- [Longest Cycle in a Graph](../Graph%20Basics/Longest%20Cycle%20in%20a%20Graph.md)
- [Maximum Employees to Be Invited to a Meeting](Maximum%20Employees%20to%20Be%20Invited%20to%20a%20Meeting.md)
