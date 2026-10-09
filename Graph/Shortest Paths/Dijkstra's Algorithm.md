---
topic: Shortest Paths
pattern: [Dijkstra, Min-heap]
source: GfG
difficulty: Medium
companies: [Flipkart, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Dijkstra's Algorithm

> [!TIP]
> **🧠 Memory hook**
> A tide rising from the source: the first time it touches a node is that node's final distance.
> **Mantra: SETTLE THE CLOSEST; RELAX ITS EDGES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=0) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Shortest distance from a source to every node of a graph with non-negative weights.

## Key insight
Keep a min-heap of (distance, node). Pop the smallest; since no weight is negative, nothing later can beat it, so it is final. Relax its edges and push improvements. Skip heap entries that are out of date. An ordered-set version erases the old entry before inserting the improved one.

## Approach 1: Min-heap Dijkstra
```java
// Min-heap Dijkstra: always settle the closest unsettled node; skip entries that are out of date
public int[] dijkstraHeap(int n, List<List<int[]>> adj, int source) {
    int[] dist = new int[n];
    Arrays.fill(dist, INF);
    dist[source] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, source});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int d = top[0], u = top[1];
        if (d > dist[u]) continue;
        for (int[] e : adj.get(u)) {
            if (d + e[1] < dist[e[0]]) {
                dist[e[0]] = d + e[1];
                pq.add(new int[]{dist[e[0]], e[0]});
            }
        }
    }
    return dist;
}
```

## Approach 2: Ordered-set Dijkstra
```java
// Ordered-set Dijkstra: keep at most one entry per node by erasing the old (distance, node) pair before inserting the better one
public int[] dijkstraSet(int n, List<List<int[]>> adj, int source) {
    int[] dist = new int[n];
    Arrays.fill(dist, INF);
    dist[source] = 0;
    TreeSet<long[]> set = new TreeSet<>((a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
    set.add(new long[]{0, source});
    while (!set.isEmpty()) {
        long[] first = set.pollFirst();
        int u = (int) first[1];
        int d = (int) first[0];
        for (int[] e : adj.get(u)) {
            if (d + e[1] < dist[e[0]]) {
                if (dist[e[0]] != INF) set.remove(new long[]{dist[e[0]], e[0]});
                dist[e[0]] = d + e[1];
                set.add(new long[]{dist[e[0]], e[0]});
            }
        }
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap Dijkstra | O(E log V) | O(V + E) |
| Ordered-set Dijkstra | O(E log V) | O(V) |

## Recall before you reveal
<details><summary>Why does it fail with negative edges?</summary>

A settled node could later be improved through a negative edge, breaking "closest is final".

</details>


<details><summary>Why skip stale entries?</summary>

The heap may hold several entries per node; only the one matching dist[u] is current.

</details>


## Connected
- [Network Delay Time](Network%20Delay%20Time.md)
- [Distance from the Source (Bellman-Ford Algorithm)](Distance%20from%20the%20Source%20%28Bellman-Ford%20Algorithm%29.md)
