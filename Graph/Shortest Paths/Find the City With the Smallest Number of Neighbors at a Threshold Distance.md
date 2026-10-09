---
topic: Shortest Paths
pattern: [Floyd-Warshall, Dijkstra, Bellman-Ford]
source: LeetCode 1334
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Find the City With the Smallest Number of Neighbors at a Threshold Distance

> [!TIP]
> **🧠 Memory hook**
> Count each city's neighbours within reach; the loneliest city wins (ties: the biggest index).
> **Mantra: ALL PAIRS, THEN COUNT d ≤ threshold**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=24) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Return the city with the fewest cities reachable within distanceThreshold (largest index on ties).

## Key insight
The same answer from three algorithms: Dijkstra from every city, Bellman-Ford from every city, or Floyd-Warshall for all pairs. Then count, per city, the others within the threshold and pick the smallest count (use ≤ so later indices win ties).

## Approach 1: Dijkstra from each city
```java
// Dijkstra from every city, count the cities within the threshold
public int findTheCityDijkstra(int n, int[][] edges, int threshold) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(new int[]{e[1], e[2]}); adj.get(e[1]).add(new int[]{e[0], e[2]}); }
    int best = -1, bestCount = Integer.MAX_VALUE;
    for (int s = 0; s < n; s++) {
        int[] dist = new int[n];
        Arrays.fill(dist, INF);
        dist[s] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, s});
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            if (top[0] > dist[top[1]]) continue;
            for (int[] e : adj.get(top[1])) if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new int[]{dist[e[0]], e[0]}); }
        }
        int count = 0;
        for (int v = 0; v < n; v++) if (v != s && dist[v] <= threshold) count++;
        if (count <= bestCount) { bestCount = count; best = s; }
    }
    return best;
}
```

## Approach 2: Bellman-Ford from each city
```java
// Bellman-Ford from every city
public int findTheCityBellmanFord(int n, int[][] edges, int threshold) {
    int best = -1, bestCount = Integer.MAX_VALUE;
    for (int s = 0; s < n; s++) {
        int[] dist = new int[n];
        Arrays.fill(dist, INF);
        dist[s] = 0;
        for (int round = 1; round < n; round++) {
            for (int[] e : edges) {
                if (dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];
                if (dist[e[1]] + e[2] < dist[e[0]]) dist[e[0]] = dist[e[1]] + e[2];
            }
        }
        int count = 0;
        for (int v = 0; v < n; v++) if (v != s && dist[v] <= threshold) count++;
        if (count <= bestCount) { bestCount = count; best = s; }
    }
    return best;
}
```

## Approach 3: Floyd-Warshall
```java
// Floyd-Warshall: all pairs in one go
public int findTheCityFloyd(int n, int[][] edges, int threshold) {
    int[][] d = new int[n][n];
    for (int[] row : d) Arrays.fill(row, INF);
    for (int i = 0; i < n; i++) d[i][i] = 0;
    for (int[] e : edges) { d[e[0]][e[1]] = Math.min(d[e[0]][e[1]], e[2]); d[e[1]][e[0]] = Math.min(d[e[1]][e[0]], e[2]); }
    for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    int best = -1, bestCount = Integer.MAX_VALUE;
    for (int i = 0; i < n; i++) {
        int count = 0;
        for (int j = 0; j < n; j++) if (i != j && d[i][j] <= threshold) count++;
        if (count <= bestCount) { bestCount = count; best = i; }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra from each city | O(V · E log V) | O(V + E) |
| Bellman-Ford from each city | O(V² · E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |

## Recall before you reveal
<details><summary>Which is best for n ≤ 100?</summary>

Floyd-Warshall: shortest code, 10⁶ operations.

</details>


<details><summary>Why <= when comparing counts?</summary>

The tie-break wants the city with the greatest number.

</details>


## Connected
- [Floyd Warshall](Floyd%20Warshall.md)
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
