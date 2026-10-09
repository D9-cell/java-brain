---
topic: Shortest Paths
pattern: [Bellman-Ford rounds, Level BFS, State Dijkstra]
source: LeetCode 787
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Cheapest Flights Within K Stops

> [!TIP]
> **🧠 Memory hook**
> The cheapest route may need more stops than you are allowed, so cost alone is not enough.
> **Mantra: ONE ROUND = ONE FLIGHT; RELAX FROM A COPY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=4) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Cheapest price from src to dst using at most k stops (k + 1 flights), or −1.

## Key insight
Plain Dijkstra can return a cheap path with too many stops. Bellman-Ford limited to k + 1 rounds does exactly one extra flight per round (relax from a copy of last round). A BFS by flight count, or a Dijkstra on (price, city, flights used), also work.

## Approach 1: Bellman-Ford, k + 1 rounds
```java
// Bellman-Ford limited to k + 1 rounds, relaxing from a copy so one round adds exactly one flight
public int findCheapestPriceBellmanFord(int n, int[][] flights, int src, int dst, int k) {
    int INF = Integer.MAX_VALUE;
    int[] cost = new int[n];
    Arrays.fill(cost, INF);
    cost[src] = 0;
    for (int round = 0; round <= k; round++) {
        int[] next = cost.clone();
        for (int[] f : flights) if (cost[f[0]] != INF && cost[f[0]] + f[2] < next[f[1]]) next[f[1]] = cost[f[0]] + f[2];
        cost = next;
    }
    return cost[dst] == INF ? -1 : cost[dst];
}
```

## Approach 2: BFS by number of flights
```java
// BFS by number of flights, keeping the best price per city and only continuing when it improves
public int findCheapestPriceBfs(int n, int[][] flights, int src, int dst, int k) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] f : flights) adj.get(f[0]).add(new int[]{f[1], f[2]});
    int[] best = new int[n];
    Arrays.fill(best, Integer.MAX_VALUE);
    best[src] = 0;
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{src, 0});
    for (int level = 0; level <= k && !que.isEmpty(); level++) {
        for (int size = que.size(); size > 0; size--) {
            int[] cur = que.poll();
            for (int[] e : adj.get(cur[0])) {
                if (cur[1] + e[1] < best[e[0]]) {
                    best[e[0]] = cur[1] + e[1];
                    que.add(new int[]{e[0], best[e[0]]});
                }
            }
        }
    }
    return best[dst] == Integer.MAX_VALUE ? -1 : best[dst];
}
```

## Approach 3: Dijkstra on (price, city, flights)
```java
// Dijkstra on states (price, city, flights used), which tolerates "cheap but many stops" versus "dear but few stops"
public int findCheapestPriceDijkstra(int n, int[][] flights, int src, int dst, int k) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] f : flights) adj.get(f[0]).add(new int[]{f[1], f[2]});
    int[] fewestFlights = new int[n];
    Arrays.fill(fewestFlights, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, src, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int price = top[0], city = top[1], used = top[2];
        if (city == dst) return price;
        if (used > k || used >= fewestFlights[city]) continue;
        fewestFlights[city] = used;
        for (int[] e : adj.get(city)) pq.add(new int[]{price + e[1], e[0], used + 1});
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Bellman-Ford, k + 1 rounds | O(k · E) | O(n) |
| BFS by number of flights | O(k · E) | O(n + E) |
| Dijkstra on (price, city, flights) | O(E log E) | O(n + E) |

## Recall before you reveal
<details><summary>Why relax from a copy?</summary>

Otherwise one round could chain several flights.

</details>


<details><summary>Why not plain Dijkstra?</summary>

The cheapest path may use too many stops; the constraint is not captured by distance alone.

</details>


## Connected
- [Distance from the Source (Bellman-Ford Algorithm)](Distance%20from%20the%20Source%20%28Bellman-Ford%20Algorithm%29.md)
