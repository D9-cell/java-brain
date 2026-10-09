---
topic: Shortest Paths
pattern: [Floyd-Warshall, Dijkstra, DP over positions]
source: LeetCode 2977
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Minimum Cost to Convert String II

> [!TIP]
> **🧠 Memory hook**
> Rules now rewrite whole substrings: shortest paths between strings, then a DP on where to cut.
> **Mantra: DIST BETWEEN RULE STRINGS + dp[i] OVER POSITIONS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=22) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Rules rewrite substrings of equal length. Convert source to target by disjoint non-overlapping rewrites. Minimum cost or −1.

## Key insight
Nodes are the distinct strings in the rules; compute their pairwise shortest costs (Floyd-Warshall, or Dijkstra with memo). Then dp[i] = cheapest way to fix the first i characters: skip an equal character for free, or rewrite a substring starting at i whose source and target are both nodes.

## Approach 1: Floyd-Warshall on strings + DP
```java
// Floyd-Warshall over the distinct rule strings, then a DP over positions: skip equal characters, or convert one substring through the graph
public long minimumCost(String source, String target, String[] original, String[] changed, int[] cost) {
    Map<String, Integer> id = new HashMap<>();
    for (String s : original) id.putIfAbsent(s, id.size());
    for (String s : changed) id.putIfAbsent(s, id.size());
    int m = id.size();
    long[][] d = new long[m][m];
    for (long[] row : d) Arrays.fill(row, INF);
    for (int i = 0; i < m; i++) d[i][i] = 0;
    for (int i = 0; i < original.length; i++) {
        int a = id.get(original[i]), b = id.get(changed[i]);
        d[a][b] = Math.min(d[a][b], cost[i]);
    }
    for (int k = 0; k < m; k++) for (int i = 0; i < m; i++) for (int j = 0; j < m; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    Set<Integer> lengths = new TreeSet<>();
    for (String s : id.keySet()) lengths.add(s.length());
    int n = source.length();
    long[] dp = new long[n + 1];
    Arrays.fill(dp, INF);
    dp[0] = 0;
    for (int i = 0; i < n; i++) {
        if (dp[i] >= INF) continue;
        if (source.charAt(i) == target.charAt(i)) dp[i + 1] = Math.min(dp[i + 1], dp[i]);
        for (int len : lengths) {
            if (i + len > n) continue;
            Integer a = id.get(source.substring(i, i + len)), b = id.get(target.substring(i, i + len));
            if (a == null || b == null || d[a][b] >= INF) continue;
            dp[i + len] = Math.min(dp[i + len], dp[i] + d[a][b]);
        }
    }
    return dp[n] >= INF ? -1 : dp[n];
}
```

## Approach 2: Memoised Dijkstra + DP
```java
// Same DP but with Dijkstra from the needed source string instead of all pairs
public long minimumCostDijkstra(String source, String target, String[] original, String[] changed, int[] cost) {
    Map<String, List<Object[]>> adj = new HashMap<>();
    for (int i = 0; i < original.length; i++) adj.computeIfAbsent(original[i], k -> new ArrayList<>()).add(new Object[]{changed[i], cost[i]});
    Set<Integer> lengths = new TreeSet<>();
    for (String s : original) lengths.add(s.length());
    Map<String, Map<String, Long>> memo = new HashMap<>();
    int n = source.length();
    long[] dp = new long[n + 1];
    Arrays.fill(dp, INF);
    dp[0] = 0;
    for (int i = 0; i < n; i++) {
        if (dp[i] >= INF) continue;
        if (source.charAt(i) == target.charAt(i)) dp[i + 1] = Math.min(dp[i + 1], dp[i]);
        for (int len : lengths) {
            if (i + len > n) continue;
            String a = source.substring(i, i + len), b = target.substring(i, i + len);
            if (!adj.containsKey(a)) continue;
            long c = memo.computeIfAbsent(a, k -> from(k, adj)).getOrDefault(b, INF);
            if (c < INF) dp[i + len] = Math.min(dp[i + len], dp[i] + c);
        }
    }
    return dp[n] >= INF ? -1 : dp[n];
}

// Dijkstra from one string over the rule graph
private Map<String, Long> from(String start, Map<String, List<Object[]>> adj) {
    Map<String, Long> dist = new HashMap<>();
    dist.put(start, 0L);
    PriorityQueue<Object[]> pq = new PriorityQueue<>((x, y) -> Long.compare((Long) x[0], (Long) y[0]));
    pq.add(new Object[]{0L, start});
    while (!pq.isEmpty()) {
        Object[] top = pq.poll();
        String u = (String) top[1];
        long d = (Long) top[0];
        if (d > dist.get(u)) continue;
        for (Object[] e : adj.getOrDefault(u, List.of())) {
            String v = (String) e[0];
            long nd = d + (Integer) e[1];
            if (nd < dist.getOrDefault(v, INF)) { dist.put(v, nd); pq.add(new Object[]{nd, v}); }
        }
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Floyd-Warshall on strings + DP | O(m³ + n · L) | O(m²) |
| Memoised Dijkstra + DP | O(m · E log m + n · L) | O(m²) |

## Recall before you reveal
<details><summary>Why a DP?</summary>

Pieces must be disjoint, so you need the best split of the string.

</details>


<details><summary>Why is the number of lengths small?</summary>

Only the distinct rule lengths matter (at most about 100).

</details>


## Connected
- [Minimum Cost to Convert String I](Minimum%20Cost%20to%20Convert%20String%20I.md)
