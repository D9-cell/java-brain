---
topic: Shortest Paths
pattern: [Dijkstra with a max-heap, Bellman-Ford]
source: LeetCode 1514
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Path with Maximum Probability

> [!TIP]
> **🧠 Memory hook**
> Success chances multiply and only shrink, so the most likely route is settled first, like the shortest.
> **Mantra: MAX-HEAP; MULTIPLY INSTEAD OF ADD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=6) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Undirected graph with edge success probabilities. Return the maximum probability of a path from start to end.

## Key insight
Multiplying numbers ≤ 1 never increases the value, so Dijkstra applies with a max-heap and multiplication. Bellman-Ford with the same relaxation also works.

## Approach 1: Dijkstra with a max-heap
```java
// Dijkstra with a max-heap: multiplying probabilities (all at most 1) never increases, so the greedy settle order is valid
public double maxProbabilityDijkstra(int n, int[][] edges, double[] succProb, int start, int end) {
    List<List<double[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int i = 0; i < edges.length; i++) {
        adj.get(edges[i][0]).add(new double[]{edges[i][1], succProb[i]});
        adj.get(edges[i][1]).add(new double[]{edges[i][0], succProb[i]});
    }
    double[] best = new double[n];
    best[start] = 1.0;
    PriorityQueue<double[]> pq = new PriorityQueue<>((a, b) -> Double.compare(b[0], a[0]));
    pq.add(new double[]{1.0, start});
    while (!pq.isEmpty()) {
        double[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] < best[u]) continue;
        if (u == end) return top[0];
        for (double[] e : adj.get(u)) {
            double p = top[0] * e[1];
            if (p > best[(int) e[0]]) { best[(int) e[0]] = p; pq.add(new double[]{p, e[0]}); }
        }
    }
    return 0.0;
}
```

## Approach 2: Bellman-Ford
```java
// Bellman-Ford style: keep improving the best probability until nothing changes
public double maxProbabilityBellmanFord(int n, int[][] edges, double[] succProb, int start, int end) {
    double[] best = new double[n];
    best[start] = 1.0;
    for (int round = 0; round < n - 1; round++) {
        boolean changed = false;
        for (int i = 0; i < edges.length; i++) {
            int a = edges[i][0], b = edges[i][1];
            if (best[a] * succProb[i] > best[b]) { best[b] = best[a] * succProb[i]; changed = true; }
            if (best[b] * succProb[i] > best[a]) { best[a] = best[b] * succProb[i]; changed = true; }
        }
        if (!changed) break;
    }
    return best[end];
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with a max-heap | O(E log V) | O(V + E) |
| Bellman-Ford | O(V · E) | O(V) |

## Recall before you reveal
<details><summary>Why is it like shortest path?</summary>

Taking −log(p) turns products into sums of non-negative weights.

</details>


<details><summary>Unreachable?</summary>

Return 0.

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
