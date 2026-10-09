---
topic: Graph Basics
pattern: [Components, DFS, BFS, Union-Find]
source: LeetCode 2316
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Count Unreachable Pairs of Nodes in an Undirected Graph

> [!TIP]
> **🧠 Memory hook**
> Each island can pair with every person on the islands you have not counted yet.
> **Mantra: size × REMAINING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=28) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Count pairs of nodes that cannot reach each other.

## Key insight
Nodes in different components are exactly the unreachable pairs. Walk the components one by one: each component of size s pairs with the nodes still left, so add s × remaining and subtract s.

## Approach 1: DFS sizes
```java
// DFS component sizes; each component pairs with all nodes not yet counted ("remaining nodes")
public long countPairsDfs(int n, int[][] edges) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    long result = 0, remaining = n;
    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;
        long size = dfs(adj, i, visited);
        remaining -= size;
        result += size * remaining;
    }
    return result;
}

// Returns the size of the component containing u
private int dfs(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    int size = 1;
    for (int v : adj.get(u)) if (!visited[v]) size += dfs(adj, v, visited);
    return size;
}
```

## Approach 2: BFS sizes
```java
// BFS component sizes with the same pairing rule
public long countPairsBfs(int n, int[][] edges) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    long result = 0, remaining = n;
    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;
        long size = 0;
        Queue<Integer> que = new ArrayDeque<>();
        que.add(i);
        visited[i] = true;
        while (!que.isEmpty()) {
            int u = que.poll();
            size++;
            for (int v : adj.get(u)) if (!visited[v]) { visited[v] = true; que.add(v); }
        }
        remaining -= size;
        result += size * remaining;
    }
    return result;
}
```

## Approach 3: Union-Find sizes
```java
// Union-Find with component sizes
public long countPairsDsu(int n, int[][] edges) {
    int[] parent = new int[n], size = new int[n];
    for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a == b) continue;
        if (size[a] < size[b]) { int t = a; a = b; b = t; }
        parent[b] = a;
        size[a] += size[b];
    }
    long result = 0, remaining = n;
    for (int i = 0; i < n; i++) {
        if (find(parent, i) != i) continue;
        remaining -= size[i];
        result += (long) size[i] * remaining;
    }
    return result;
}

// Finds the root with path compression
private int find(int[] parent, int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| DFS sizes | O(n + E) | O(n) |
| BFS sizes | O(n + E) | O(n) |
| Union-Find sizes | O(E · α(n)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Return `long`.

## Recall before you reveal
<details><summary>Why "remaining" and not n − size?</summary>

It avoids counting each pair from both sides.

</details>


<details><summary>Why long?</summary>

n = 10^5 gives up to 5·10^9 pairs.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
