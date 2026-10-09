---
topic: Disjoint Set
pattern: [Union-Find, Cycle edge]
source: LeetCode 684
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Redundant Connection

> [!TIP]
> **🧠 Memory hook**
> Add roads one at a time; the first road between two towns already connected is the redundant one.
> **Mantra: EDGE WHOSE ENDS ALREADY SHARE A ROOT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=1) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
A tree with one extra edge is given. Return the extra edge (the last one in the input that can be removed).

## Key insight
Process edges in order with Union-Find. The first edge whose endpoints are already connected closes the cycle, and since the input has exactly one cycle it is the answer. A DFS reachability check before each insertion works too but is O(n²).

## Approach 1: Union-Find
```java
// Union-Find: the first edge, in input order, whose ends are already connected closes the cycle
public int[] findRedundantConnectionDsu(int[][] edges) {
    int[] parent = new int[edges.length + 1];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a == b) return e;
        parent[a] = b;
    }
    return new int[0];
}

// Finds the root with path compression
private int find(int[] parent, int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
```

## Approach 2: DFS before each insertion
```java
// DFS: before adding an edge check whether its ends are already connected through the graph built so far
public int[] findRedundantConnectionDfs(int[][] edges) {
    int n = edges.length;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        if (reach(adj, e[0], e[1], new boolean[n + 1])) return e;
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    return new int[0];
}

// Is v reachable from u?
private boolean reach(List<List<Integer>> adj, int u, int v, boolean[] seen) {
    if (u == v) return true;
    seen[u] = true;
    for (int w : adj.get(u)) if (!seen[w] && reach(adj, w, v, seen)) return true;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find | O(n α(n)) | O(n) |
| DFS before each insertion | O(n²) | O(n) |

## Recall before you reveal
<details><summary>Why the last such edge?</summary>

The first edge that closes a cycle in input order is the last edge of that cycle to appear.

</details>


<details><summary>Directed version?</summary>

Redundant Connection II needs in-degree handling too.

</details>


## Connected
- [Detect Cycle in an Undirected Graph](../Graph%20Basics/Detect%20Cycle%20in%20an%20Undirected%20Graph.md)
- [Number of Operations to Make Network Connected](Number%20of%20Operations%20to%20Make%20Network%20Connected.md)
