---
topic: Shortest Paths
pattern: [Dijkstra, Floyd-Warshall]
source: LeetCode 2976
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Minimum Cost to Convert String I

> [!TIP]
> **🧠 Memory hook**
> Currency exchange between 26 letters: use the cheapest chain of rules.
> **Mantra: 26-NODE GRAPH; SUM THE CHEAPEST CONVERSION PER POSITION**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=21) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Convert source to target using rules (original[i] → changed[i] at cost[i]) that may be chained. Return the minimum cost or −1.

## Key insight
Treat letters as 26 nodes and rules as directed edges. For each differing position add the shortest distance between the two letters. With 26 nodes, Floyd-Warshall or 26 Dijkstra runs are both trivial.

## Approach 1: Dijkstra from every letter
```java
// Dijkstra from every letter over the 26-node rule graph, then sum the cost of each differing position
public long minimumCostDijkstra(String source, String target, char[] original, char[] changed, int[] cost) {
    List<List<long[]>> adj = new ArrayList<>();
    for (int i = 0; i < 26; i++) adj.add(new ArrayList<>());
    for (int i = 0; i < original.length; i++) adj.get(original[i] - 'a').add(new long[]{changed[i] - 'a', cost[i]});
    long[][] d = new long[26][];
    for (int s = 0; s < 26; s++) d[s] = dijkstra(adj, s);
    return total(source, target, d);
}

// Single-source Dijkstra on the letter graph
private long[] dijkstra(List<List<long[]>> adj, int source) {
    long[] dist = new long[26];
    Arrays.fill(dist, INF);
    dist[source] = 0;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
    pq.add(new long[]{0, source});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] > dist[u]) continue;
        for (long[] e : adj.get(u)) {
            if (top[0] + e[1] < dist[(int) e[0]]) { dist[(int) e[0]] = top[0] + e[1]; pq.add(new long[]{dist[(int) e[0]], e[0]}); }
        }
    }
    return dist;
}

// Adds up the per-position cost, or -1 when some position cannot be converted
private long total(String source, String target, long[][] d) {
    long sum = 0;
    for (int i = 0; i < source.length(); i++) {
        long c = d[source.charAt(i) - 'a'][target.charAt(i) - 'a'];
        if (c >= INF) return -1;
        sum += c;
    }
    return sum;
}
```

## Approach 2: Floyd-Warshall
```java
// Floyd-Warshall over the 26 letters: all pairs at once
public long minimumCostFloyd(String source, String target, char[] original, char[] changed, int[] cost) {
    long[][] d = new long[26][26];
    for (long[] row : d) Arrays.fill(row, INF);
    for (int i = 0; i < 26; i++) d[i][i] = 0;
    for (int i = 0; i < original.length; i++) d[original[i] - 'a'][changed[i] - 'a'] = Math.min(d[original[i] - 'a'][changed[i] - 'a'], cost[i]);
    for (int k = 0; k < 26; k++) for (int i = 0; i < 26; i++) for (int j = 0; j < 26; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    return total(source, target, d);
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra from every letter | O(26 · E log 26) | O(26²) |
| Floyd-Warshall | O(26³) | O(26²) |

## Recall before you reveal
<details><summary>Why precompute all pairs?</summary>

The string can be long but there are only 26 × 26 letter pairs.

</details>


<details><summary>Why long?</summary>

Sum over 10⁵ positions of costs up to 10⁶.

</details>


## Connected
- [Minimum Cost to Convert String II](Minimum%20Cost%20to%20Convert%20String%20II.md)
- [Find the City With the Smallest Number of Neighbors at a Threshold Distance](Find%20the%20City%20With%20the%20Smallest%20Number%20of%20Neighbors%20at%20a%20Threshold%20Distance.md)
