---
topic: Shortest Paths
pattern: [Bellman-Ford, Negative edges]
source: GfG
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Distance from the Source (Bellman-Ford Algorithm)

> [!TIP]
> **🧠 Memory hook**
> Ask every road, again and again, "can you shorten somebody?"; after V − 1 rounds the answer is final.
> **Mantra: RELAX ALL EDGES V − 1 TIMES; ONE MORE IMPROVEMENT = NEGATIVE CYCLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=25) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Shortest distances from a source in a graph that may have negative edges, or {−1} if a negative cycle is reachable.

## Key insight
A shortest path has at most V − 1 edges, so V − 1 rounds of relaxing every edge suffice. If a further round still improves something, a negative cycle is reachable and distances are undefined.

## Approach 1: Bellman-Ford
```java
// Relax every edge V - 1 times; a further improving edge means a negative cycle is reachable, so the answer is {-1}
public int[] bellmanFord(int V, int[][] edges, int source) {
    int[] dist = new int[V];
    Arrays.fill(dist, INF);
    dist[source] = 0;
    for (int round = 1; round <= V - 1; round++) {
        for (int[] e : edges) if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];
    }
    for (int[] e : edges) if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]]) return new int[]{-1};
    return dist;
}
```

## Approach 2: With early exit
```java
// Early-exit version: stop as soon as a full round changes nothing (no negative cycle is possible then)
public int[] bellmanFordEarlyExit(int V, int[][] edges, int source) {
    int[] dist = new int[V];
    Arrays.fill(dist, INF);
    dist[source] = 0;
    for (int round = 1; round <= V; round++) {
        boolean changed = false;
        for (int[] e : edges) {
            if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]]) {
                dist[e[1]] = dist[e[0]] + e[2];
                changed = true;
            }
        }
        if (!changed) return dist;
        if (round == V) return new int[]{-1};
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Bellman-Ford | O(V · E) | O(V) |
| With early exit | O(V · E) worst | O(V) |

## Recall before you reveal
<details><summary>Why V − 1 rounds?</summary>

A simple path has at most V − 1 edges.

</details>


<details><summary>Why not Dijkstra?</summary>

Negative edges break "closest is final".

</details>


## Connected
- [Negative Weight Cycle](Negative%20Weight%20Cycle.md)
- [Cheapest Flights Within K Stops](Cheapest%20Flights%20Within%20K%20Stops.md)
