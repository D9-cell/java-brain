---
topic: Shortest Paths
pattern: [Dijkstra, Counting paths]
source: LeetCode 1976
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Number of Ways to Arrive at Destination

> [!TIP]
> **🧠 Memory hook**
> While you find the shortest distance, keep a tally of how many routes achieve it.
> **Mantra: SHORTER ⇒ COPY THE COUNT; EQUAL ⇒ ADD THE COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=7) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Count the shortest paths from 0 to n − 1 modulo 10⁹ + 7.

## Key insight
Extend Dijkstra with ways[v]: a strictly shorter distance replaces the count with the parent's, an equal distance adds the parent's count. This is valid because weights are positive, so a node is settled before any node that depends on it.

## Approach: Dijkstra with counts
```java
// Dijkstra that also counts: a strictly shorter distance resets the count, an equal one adds to it
public int countPaths(int n, int[][] roads) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] r : roads) { adj.get(r[0]).add(new int[]{r[1], r[2]}); adj.get(r[1]).add(new int[]{r[0], r[2]}); }
    long[] dist = new long[n];
    Arrays.fill(dist, Long.MAX_VALUE);
    int[] ways = new int[n];
    dist[0] = 0;
    ways[0] = 1;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
    pq.add(new long[]{0, 0});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] > dist[u]) continue;
        for (int[] e : adj.get(u)) {
            long nd = top[0] + e[1];
            if (nd < dist[e[0]]) {
                dist[e[0]] = nd;
                ways[e[0]] = ways[u];
                pq.add(new long[]{nd, e[0]});
            } else if (nd == dist[e[0]]) {
                ways[e[0]] = (ways[e[0]] + ways[u]) % MOD;
            }
        }
    }
    return ways[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with counts | O(E log V) | O(V + E) |

> [!WARNING]
> **Java gotcha**
> Use `long` for distances; counts are taken modulo 1e9 + 7.

## Recall before you reveal
<details><summary>Why positive weights matter?</summary>

With zero-weight edges a node could be updated after its count was used.

</details>


<details><summary>Why long for distances?</summary>

Sums reach 10⁹ · 200.

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
