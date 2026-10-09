---
topic: Disjoint Set
pattern: [Components, Clique check, Union-Find]
source: LeetCode 2685
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Count the Number of Complete Components

> [!TIP]
> **🧠 Memory hook**
> A complete component is a group where everybody knows everybody: edges = k(k − 1)/2.
> **Mantra: EDGES == nodes × (nodes − 1) / 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=3) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Count the connected components that are cliques.

## Key insight
For each component count nodes k and edges: it is complete exactly when edges = k(k − 1)/2 (equivalently, the degree sum is k(k − 1)). Compute with DFS, BFS or Union-Find with per-root counts.

## Approach 1: DFS
```java
// DFS collects each component's nodes and the sum of their degrees; complete means edges = k(k - 1) / 2, i.e. degree sum = k(k - 1)
public int countCompleteComponentsDfs(int n, int[][] edges) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;
        long[] stats = new long[2];
        dfs(adj, i, visited, stats);
        if (stats[1] == stats[0] * (stats[0] - 1)) count++;
    }
    return count;
}

// stats[0] = nodes, stats[1] = degree sum
private void dfs(List<List<Integer>> adj, int u, boolean[] visited, long[] stats) {
    visited[u] = true;
    stats[0]++;
    stats[1] += adj.get(u).size();
    for (int v : adj.get(u)) if (!visited[v]) dfs(adj, v, visited, stats);
}
```

## Approach 2: BFS
```java
// BFS with the same node and degree counting
public int countCompleteComponentsBfs(int n, int[][] edges) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;
        Queue<Integer> que = new ArrayDeque<>(List.of(i));
        visited[i] = true;
        long nodes = 0, degrees = 0;
        while (!que.isEmpty()) {
            int u = que.poll();
            nodes++;
            degrees += adj.get(u).size();
            for (int v : adj.get(u)) if (!visited[v]) { visited[v] = true; que.add(v); }
        }
        if (degrees == nodes * (nodes - 1)) count++;
    }
    return count;
}
```

## Approach 3: Union-Find
```java
// Union-Find with node and edge counts per root
public int countCompleteComponentsDsu(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] e : edges) parent[find(parent, e[0])] = find(parent, e[1]);
    int[] nodes = new int[n], edgeCount = new int[n];
    for (int i = 0; i < n; i++) nodes[find(parent, i)]++;
    for (int[] e : edges) edgeCount[find(parent, e[0])]++;
    int count = 0;
    for (int i = 0; i < n; i++) if (find(parent, i) == i && edgeCount[i] == nodes[i] * (nodes[i] - 1) / 2) count++;
    return count;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n + E) | O(n + E) |
| BFS | O(n + E) | O(n + E) |
| Union-Find | O(E α) | O(n) |

## Recall before you reveal
<details><summary>Why is degree sum k(k − 1) the same test?</summary>

Each edge adds 2 to the degree sum, so the sum is 2 × edges.

</details>


<details><summary>Is a single node complete?</summary>

Yes: 0 = 0 edges.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
