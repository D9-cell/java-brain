---
topic: Shortest Paths
pattern: [Dijkstra on an augmented graph]
source: LeetCode 3650
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Minimum Cost Path with Edge Reversals

> [!TIP]
> **🧠 Memory hook**
> A one-way street may be driven backwards at a double fare: give it a twin.
> **Mantra: ADD v → u WITH COST 2w, THEN DIJKSTRA**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=19) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Directed weighted graph; you may traverse an edge u → v backwards (v → u) at cost 2w. Minimum cost from 0 to n − 1.

## Key insight
Add a reverse edge of weight 2w for every edge and run ordinary Dijkstra.

## Approach: Dijkstra with twin edges
```java
// Dijkstra on a graph where every edge gets a second, reversed copy of double cost
public int minCost(int n, int[][] edges) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(new int[]{e[1], e[2]});
        adj.get(e[1]).add(new int[]{e[0], 2 * e[2]});
    }
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]]) continue;
        if (top[1] == n - 1) return top[0];
        for (int[] e : adj.get(top[1])) {
            if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new int[]{dist[e[0]], e[0]}); }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with twin edges | O(E log V) | O(V + E) |

## Recall before you reveal
<details><summary>Why 2w?</summary>

The problem says a reversed use costs twice the weight.

</details>


<details><summary>Why does Dijkstra still apply?</summary>

All weights stay positive.

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
