---
topic: Graph Basics
pattern: [Union-Find, DFS, Components]
source: LeetCode 323
difficulty: Medium
companies: [Amazon, Facebook]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Number of Connected Components in an Undirected Graph

> [!TIP]
> **🧠 Memory hook**
> Start with n separate islands; every bridge you build merges two, unless they were already one.
> **Mantra: n − SUCCESSFUL UNIONS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=6) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
n nodes and a list of undirected edges. Count connected components.

## Key insight
Union-Find starts with n components and loses one for every edge that joins two different roots. DFS instead counts how many times a new search has to start.

## Approach 1: Union-Find
```java
// Union-Find: every successful union removes one component
public int countComponentsDsu(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int components = n;
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a != b) {
            parent[a] = b;
            components--;
        }
    }
    return components;
}

// Finds the representative with path compression
private int find(int[] parent, int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
```

## Approach 2: DFS
```java
// DFS: start a new search at every unvisited node and count the starts
public int countComponentsDfs(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    boolean[] visited = new boolean[n];
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            dfs(adj, i, visited);
        }
    }
    return count;
}

// Marks one whole component
private void dfs(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) if (!visited[v]) dfs(adj, v, visited);
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find | O(E · α(n)) | O(n) |
| DFS | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>Why n − unions?</summary>

Each union that merges two different sets reduces the count by exactly one.

</details>


<details><summary>Union-Find or DFS?</summary>

Union-Find when edges arrive as a list or stream; DFS when you already have an adjacency list.

</details>


## Connected
- [Number of Provinces](Number%20of%20Provinces.md)
- [Redundant Connection](../Disjoint%20Set/Redundant%20Connection.md)
