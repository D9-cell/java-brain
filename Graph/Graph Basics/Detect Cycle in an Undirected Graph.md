---
topic: Graph Basics
pattern: [DFS, BFS, Union-Find]
source: GfG
difficulty: Medium
companies: [Flipkart, Amazon, Samsung, MakeMyTrip, Oracle, Adobe]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Detect Cycle in an Undirected Graph

> [!TIP]
> **🧠 Memory hook**
> In a two-way street network, meeting a visited junction you did not just come from means you found a loop.
> **Mantra: VISITED AND NOT MY PARENT ⇒ CYCLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=20) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Does an undirected graph contain a cycle?

## Key insight
Every undirected edge is seen twice, so ignore the edge back to the parent. Any other visited neighbour closes a loop. With an edge list, Union-Find is simpler: an edge whose ends already share a root is the cycle edge.

## Approach 1: DFS with parent
```java
// DFS remembering the parent: meeting a visited node that is not the parent closes a cycle
public boolean isCycleDfs(int n, int[][] edges) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    for (int i = 0; i < n; i++) if (!visited[i] && dfs(adj, i, -1, visited)) return true;
    return false;
}

// Returns true when a cycle is found below u
private boolean dfs(List<List<Integer>> adj, int u, int parent, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        if (visited[v] || dfs(adj, v, u, visited)) return true;
    }
    return false;
}
```

## Approach 2: BFS with parent
```java
// BFS with (node, parent) pairs, same rule as the DFS
public boolean isCycleBfs(int n, int[][] edges) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    for (int s = 0; s < n; s++) {
        if (visited[s]) continue;
        Queue<int[]> que = new ArrayDeque<>();
        que.add(new int[]{s, -1});
        visited[s] = true;
        while (!que.isEmpty()) {
            int[] cur = que.poll();
            for (int v : adj.get(cur[0])) {
                if (!visited[v]) {
                    visited[v] = true;
                    que.add(new int[]{v, cur[0]});
                } else if (v != cur[1]) return true;
            }
        }
    }
    return false;
}
```

## Approach 3: Union-Find
```java
// Union-Find over the edge list: an edge whose ends already share a root closes a cycle
public boolean isCycleDsu(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a == b) return true;
        parent[a] = b;
    }
    return false;
}

// Finds the root with path compression
private int find(int[] parent, int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
```

## Approach 4: Union-Find with rank
```java
// Union-Find with union by rank and path compression
public boolean isCycleDsuRank(int n, int[][] edges) {
    int[] parent = new int[n], rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a == b) return true;
        if (rank[a] < rank[b]) parent[a] = b;
        else if (rank[a] > rank[b]) parent[b] = a;
        else { parent[b] = a; rank[a]++; }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with parent | O(V + E) | O(V) |
| BFS with parent | O(V + E) | O(V) |
| Union-Find | O(E · α(V)) | O(V) |
| Union-Find with rank | O(E · α(V)) | O(V) |

> [!WARNING]
> **Java gotcha**
> Self-loops and parallel edges need extra care: the parent check would hide a parallel edge.

## Recall before you reveal
<details><summary>Why track the parent?</summary>

The edge you came along leads to a visited node but is not a cycle.

</details>


<details><summary>Fast edge-count test?</summary>

A graph has a cycle iff edges > nodes − components.

</details>


## Connected
- [Detect Cycle in a Directed Graph](Detect%20Cycle%20in%20a%20Directed%20Graph.md)
- [Redundant Connection](../Disjoint%20Set/Redundant%20Connection.md)
