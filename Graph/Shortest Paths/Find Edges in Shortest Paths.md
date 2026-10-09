---
topic: Shortest Paths
pattern: [Two-ended Dijkstra]
source: LeetCode 3123
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Find Edges in Shortest Paths

> [!TIP]
> **🧠 Memory hook**
> An edge is on a shortest route if getting to its start plus the edge plus getting from its end equals the shortest total.
> **Mantra: dist0[u] + w + distEnd[v] == shortest**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=16) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Return, for each edge, whether it lies on at least one shortest path from node 0 to node n − 1.

## Key insight
Run Dijkstra from 0 and from n − 1. Edge (u, v, w) is on a shortest path iff dist0[u] + w + distEnd[v] equals the shortest distance (either orientation).

## Approach: Dijkstra from both ends
```java
// Dijkstra from both ends: edge (u, v, w) is on a shortest path iff dist0[u] + w + distEnd[v] equals the shortest distance, in either direction
public boolean[] findAnswer(int n, int[][] edges) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(new int[]{e[1], e[2]}); adj.get(e[1]).add(new int[]{e[0], e[2]}); }
    long[] fromStart = dijkstra(n, adj, 0), fromEnd = dijkstra(n, adj, n - 1);
    long shortest = fromStart[n - 1];
    boolean[] answer = new boolean[edges.length];
    if (shortest == Long.MAX_VALUE) return answer;
    for (int i = 0; i < edges.length; i++) {
        int u = edges[i][0], v = edges[i][1], w = edges[i][2];
        boolean forward = fromStart[u] != Long.MAX_VALUE && fromEnd[v] != Long.MAX_VALUE && fromStart[u] + w + fromEnd[v] == shortest;
        boolean backward = fromStart[v] != Long.MAX_VALUE && fromEnd[u] != Long.MAX_VALUE && fromStart[v] + w + fromEnd[u] == shortest;
        answer[i] = forward || backward;
    }
    return answer;
}

// Standard heap Dijkstra returning long distances
private long[] dijkstra(int n, List<List<int[]>> adj, int source) {
    long[] dist = new long[n];
    Arrays.fill(dist, Long.MAX_VALUE);
    dist[source] = 0;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
    pq.add(new long[]{0, source});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] > dist[u]) continue;
        for (int[] e : adj.get(u)) {
            if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new long[]{dist[e[0]], e[0]}); }
        }
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra from both ends | O(E log V) | O(V + E) |

## Recall before you reveal
<details><summary>Why both orientations?</summary>

The graph is undirected; the path may use the edge either way.

</details>


<details><summary>Why long?</summary>

Distances can exceed int.

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
