---
topic: Shortest Paths
pattern: [Dijkstra, Bellman-Ford]
source: LeetCode 743
difficulty: Medium
companies: [Google, Akuna Capital]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Network Delay Time

> [!TIP]
> **🧠 Memory hook**
> A rumour from one house: how long until the last house hears it?
> **Mantra: MAX OF THE SHORTEST DISTANCES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=2) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Directed weighted graph: a signal starts at node k. Return the time for all nodes to receive it, or −1.

## Key insight
Run Dijkstra from k; the answer is the largest finite distance, or −1 if any node is unreachable. n ≤ 100, so Bellman-Ford also passes.

## Approach 1: Dijkstra
```java
// Dijkstra from k; the answer is the largest finite distance
public int networkDelayTimeDijkstra(int[][] times, int n, int k) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] t : times) adj.get(t[0]).add(new int[]{t[1], t[2]});
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, k});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[0] > dist[top[1]]) continue;
        for (int[] e : adj.get(top[1])) {
            if (top[0] + e[1] < dist[e[0]]) {
                dist[e[0]] = top[0] + e[1];
                pq.add(new int[]{dist[e[0]], e[0]});
            }
        }
    }
    int worst = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        worst = Math.max(worst, dist[i]);
    }
    return worst;
}
```

## Approach 2: Bellman-Ford
```java
// Bellman-Ford: relax every edge n - 1 times (fine here because n is at most 100)
public int networkDelayTimeBellmanFord(int[][] times, int n, int k) {
    int INF = 1 << 28;
    int[] dist = new int[n + 1];
    Arrays.fill(dist, INF);
    dist[k] = 0;
    for (int round = 1; round < n; round++) {
        for (int[] t : times) if (dist[t[0]] != INF && dist[t[0]] + t[2] < dist[t[1]]) dist[t[1]] = dist[t[0]] + t[2];
    }
    int worst = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == INF) return -1;
        worst = Math.max(worst, dist[i]);
    }
    return worst;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra | O(E log V) | O(V + E) |
| Bellman-Ford | O(V · E) | O(V) |

> [!WARNING]
> **Java gotcha**
> Nodes are numbered from 1.

## Recall before you reveal
<details><summary>Why the maximum?</summary>

The signal reaches every node, and the last one defines the delay.

</details>


<details><summary>When −1?</summary>

When some node stays at infinity.

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
- [Find All People With Secret](../Trees%20and%20Advanced%20Graphs/Find%20All%20People%20With%20Secret.md)
