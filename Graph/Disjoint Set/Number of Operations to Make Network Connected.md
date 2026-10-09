---
topic: Disjoint Set
pattern: [Union-Find, Components]
source: LeetCode 1319
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Number of Operations to Make Network Connected

> [!TIP]
> **🧠 Memory hook**
> Spare cables (those that close a loop) can be unplugged and used to join separate islands.
> **Mantra: cables ≥ n − 1; ANSWER = components − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=10) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Move cables to connect all n computers. Return the fewest moves, or −1.

## Key insight
You need at least n − 1 cables. If so, each spare cable can join two components, so the answer is components − 1. Count components by Union-Find or DFS.

## Approach 1: Union-Find
```java
// Need at least n - 1 cables; the answer is components - 1, because each spare cable can join one more component
public int makeConnectedDsu(int n, int[][] connections) {
    if (connections.length < n - 1) return -1;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int components = n;
    for (int[] c : connections) {
        int a = find(parent, c[0]), b = find(parent, c[1]);
        if (a != b) { parent[a] = b; components--; }
    }
    return components - 1;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

## Approach 2: DFS
```java
// Same count with DFS over the adjacency list
public int makeConnectedDfs(int n, int[][] connections) {
    if (connections.length < n - 1) return -1;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] c : connections) { adj.get(c[0]).add(c[1]); adj.get(c[1]).add(c[0]); }
    boolean[] seen = new boolean[n];
    int components = 0;
    for (int i = 0; i < n; i++) if (!seen[i]) { components++; mark(adj, i, seen); }
    return components - 1;
}

// Marks one component
private void mark(List<List<Integer>> adj, int u, boolean[] seen) {
    seen[u] = true;
    for (int v : adj.get(u)) if (!seen[v]) mark(adj, v, seen);
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find | O(E α) | O(n) |
| DFS | O(n + E) | O(n + E) |

## Recall before you reveal
<details><summary>Why n − 1 cables suffice?</summary>

They can form a spanning tree once rearranged.

</details>


<details><summary>Why components − 1 moves?</summary>

Each move merges two components.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
- [Redundant Connection](Redundant%20Connection.md)
