---
topic: Shortest Paths
pattern: [Design, Dijkstra, Floyd-Warshall]
source: LeetCode 2642
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Design Graph With Shortest Path Calculator

> [!TIP]
> **🧠 Memory hook**
> Either keep the map and look up routes on demand, or keep every route precomputed and patch it when a road opens.
> **Mantra: DIJKSTRA PER QUERY OR FLOYD TABLE PATCHED IN O(n²)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=23) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
A directed weighted graph that supports addEdge and shortestPath(a, b).

## Key insight
Dijkstra per query is simple. Floyd-Warshall precomputes all pairs once; adding an edge u → v updates the table with d[i][j] = min(d[i][j], d[i][u] + w + d[v][j]) in O(n²), and queries are O(1).

## Approach 1: Dijkstra per query
```java
// Dijkstra version: store an adjacency list and run Dijkstra for every query
static class GraphDijkstra {
    private final List<List<int[]>> adj = new ArrayList<>();

    // Builds the starting graph from edges {from, to, cost}
    GraphDijkstra(int n, int[][] edges) {
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) addEdge(e);
    }

    // Adds one directed edge
    void addEdge(int[] e) {
        adj.get(e[0]).add(new int[]{e[1], e[2]});
    }

    // Shortest distance from node1 to node2, or -1
    int shortestPath(int node1, int node2) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[node1] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, node1});
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            if (top[0] > dist[top[1]]) continue;
            if (top[1] == node2) return top[0];
            for (int[] e : adj.get(top[1])) if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new int[]{dist[e[0]], e[0]}); }
        }
        return -1;
    }
}

// Adds one directed edge
void addEdge(int[] e) {
    adj.get(e[0]).add(new int[]{e[1], e[2]});
}

// Shortest distance from node1 to node2, or -1
int shortestPath(int node1, int node2) {
    int n = adj.size();
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[node1] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, node1});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]]) continue;
        if (top[1] == node2) return top[0];
        for (int[] e : adj.get(top[1])) if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new int[]{dist[e[0]], e[0]}); }
    }
    return -1;
}
```

## Approach 2: Floyd table with incremental patch
```java
// Floyd-Warshall version: keep all-pairs distances and patch them in O(n²) when an edge arrives, so a query is O(1)
static class GraphFloyd {
    private final long[][] d;
    private static final long INF = Long.MAX_VALUE / 4;

    // Builds the all-pairs table with one full Floyd-Warshall pass
    GraphFloyd(int n, int[][] edges) {
        d = new long[n][n];
        for (long[] row : d) Arrays.fill(row, INF);
        for (int i = 0; i < n; i++) d[i][i] = 0;
        for (int[] e : edges) d[e[0]][e[1]] = Math.min(d[e[0]][e[1]], e[2]);
        for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    }

    // New edge u -> v: any pair can now go i -> u -> v -> j
    void addEdge(int[] e) {
        int n = d.length;
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) d[i][j] = Math.min(d[i][j], d[i][e[0]] + e[2] + d[e[1]][j]);
    }

    // Looks the answer up
    int shortestPath(int node1, int node2) {
        return d[node1][node2] >= INF ? -1 : (int) d[node1][node2];
    }
}

// Adds one directed edge
void addEdge(int[] e) {
    adj.get(e[0]).add(new int[]{e[1], e[2]});
}

// Shortest distance from node1 to node2, or -1
int shortestPath(int node1, int node2) {
    int n = adj.size();
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[node1] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, node1});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]]) continue;
        if (top[1] == node2) return top[0];
        for (int[] e : adj.get(top[1])) if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new int[]{dist[e[0]], e[0]}); }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra per query | O(E log n) per query | O(n + E) |
| Floyd table with incremental patch | O(n²) per addEdge, O(1) query | O(n²) |

## Recall before you reveal
<details><summary>Why does the patch suffice?</summary>

A new edge can only help paths that use it exactly once.

</details>


<details><summary>When is Dijkstra better?</summary>

Few queries and a sparse graph.

</details>


## Connected
- [Design](../../Design/Design%20-%20Pattern%20Map.md)
- [Floyd Warshall](Floyd%20Warshall.md)
