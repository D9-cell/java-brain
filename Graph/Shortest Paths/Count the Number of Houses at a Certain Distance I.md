---
topic: Shortest Paths
pattern: [Floyd-Warshall, BFS]
source: LeetCode 3015
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Count the Number of Houses at a Certain Distance I

> [!TIP]
> **🧠 Memory hook**
> A line of houses with one shortcut street: some pairs get closer.
> **Mantra: LINE + ONE EXTRA EDGE, THEN ALL PAIRS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=28) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Houses 1..n on a line plus one street x–y. For each k count ordered pairs at shortest distance k.

## Key insight
Build the graph, run Floyd-Warshall (or BFS from every house since weights are 1) and histogram the distances. A formula also works: min(|i−j|, |i−x| + 1 + |j−y|, |i−y| + 1 + |j−x|).

## Approach 1: Floyd-Warshall
```java
// Floyd-Warshall on the line plus the extra edge; result[k - 1] counts ordered pairs at distance exactly k
public int[] countOfPairsFloyd(int n, int x, int y) {
    int INF = 1 << 20;
    int[][] d = new int[n + 1][n + 1];
    for (int[] row : d) Arrays.fill(row, INF);
    for (int i = 1; i <= n; i++) d[i][i] = 0;
    for (int i = 1; i < n; i++) { d[i][i + 1] = 1; d[i + 1][i] = 1; }
    d[x][y] = Math.min(d[x][y], 1);
    d[y][x] = Math.min(d[y][x], 1);
    for (int k = 1; k <= n; k++) for (int i = 1; i <= n; i++) for (int j = 1; j <= n; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    int[] result = new int[n];
    for (int i = 1; i <= n; i++) for (int j = 1; j <= n; j++) if (i != j) result[d[i][j] - 1]++;
    return result;
}
```

## Approach 2: BFS from every house
```java
// BFS from every house, which is faster because every edge costs 1
public int[] countOfPairsBfs(int n, int x, int y) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int i = 1; i < n; i++) { adj.get(i).add(i + 1); adj.get(i + 1).add(i); }
    if (x != y) { adj.get(x).add(y); adj.get(y).add(x); }
    int[] result = new int[n];
    for (int s = 1; s <= n; s++) {
        int[] dist = new int[n + 1];
        Arrays.fill(dist, -1);
        dist[s] = 0;
        Queue<Integer> que = new ArrayDeque<>(List.of(s));
        while (!que.isEmpty()) {
            int u = que.poll();
            if (u != s) result[dist[u] - 1]++;
            for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; que.add(v); }
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Floyd-Warshall | O(n³) | O(n²) |
| BFS from every house | O(n²) | O(n) |

## Recall before you reveal
<details><summary>Why BFS is faster?</summary>

Every edge has weight 1.

</details>


<details><summary>Ordered pairs?</summary>

Both (i, j) and (j, i) are counted.

</details>


## Connected
- [Floyd Warshall](Floyd%20Warshall.md)
