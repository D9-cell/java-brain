---
topic: Shortest Paths
pattern: [Two-pass Dijkstra]
source: LeetCode 2699
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Modify Graph Edge Weights

> [!TIP]
> **🧠 Memory hook**
> Spend the whole extra slack on the first adjustable edge the shortest path meets.
> **Mantra: PASS 1 WITH -1 AS 1; PASS 2 RAISES EACH -1 JUST ENOUGH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=17) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Replace each −1 edge weight with a positive value so that the shortest path from source to destination equals target. Return the graph or an empty list.

## Key insight
Pass 1 treats −1 as 1 to get the smallest possible distances. If that already exceeds the target it is impossible. Otherwise delta = target − that distance. Pass 2 runs Dijkstra again; the first time a −1 edge u → v is relaxed it gets w = max(1, delta + minimum[v] − dist[u]), spending the slack there. If the resulting shortest distance is exactly the target, return the modified edges.

## Approach: Two Dijkstra passes
```java
// First Dijkstra (every -1 edge counts as 1) gives the smallest possible distances; the second raises each -1 edge only as far as needed
public int[][] modifiedGraphEdges(int n, int[][] edges, int source, int destination, int target) {
    long[] minimum = dijkstra(n, edges, source, null);
    long delta = target - minimum[destination];
    if (delta < 0) return new int[0][];
    int[][] fixed = new int[edges.length][];
    for (int i = 0; i < edges.length; i++) fixed[i] = edges[i].clone();
    long[] second = dijkstra(n, fixed, source, new Object[]{minimum, delta});
    if (second[destination] != target) return new int[0][];
    for (int[] e : fixed) if (e[2] == -1) e[2] = 2_000_000_000;
    return fixed;
}

// a -1 edge u -> v is fixed on first use at max(1, delta + minimum[v] - dist[u]) so the path through it lands exactly on target
private long[] dijkstra(int n, int[][] edges, int source, Object[] plan) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int i = 0; i < edges.length; i++) { adj.get(edges[i][0]).add(i); adj.get(edges[i][1]).add(i); }
    long[] dist = new long[n];
    Arrays.fill(dist, INF);
    dist[source] = 0;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
    pq.add(new long[]{0, source});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] > dist[u]) continue;
        for (int idx : adj.get(u)) {
            int v = edges[idx][0] == u ? edges[idx][1] : edges[idx][0];
            long w = edges[idx][2];
            if (w == -1) {
                w = 1;
                if (plan != null) {
                    long[] minimum = (long[]) plan[0];
                    long delta = (Long) plan[1];
                    if (minimum[v] < INF) w = Math.max(1, delta + minimum[v] - dist[u]);
                    edges[idx][2] = (int) Math.min(w, 2_000_000_000L);
                }
            }
            if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.add(new long[]{dist[v], v}); }
        }
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Two Dijkstra passes | O(E log V) | O(V + E) |

> [!WARNING]
> **Java gotcha**
> Checked against brute-force enumeration of small weight assignments.

## Recall before you reveal
<details><summary>Why can we not just set every −1 to a large value?</summary>

The shortest path might then be too long or use fixed edges only.

</details>


<details><summary>What if a fixed route is shorter than target?</summary>

No assignment can raise the shortest path to target: return [].

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
