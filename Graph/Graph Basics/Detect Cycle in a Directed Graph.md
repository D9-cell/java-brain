---
topic: Graph Basics
pattern: [DFS, Kahn, Colouring]
source: GfG
difficulty: Medium
companies: [Flipkart, Amazon, Microsoft, Samsung, MakeMyTrip, Oracle, Adobe]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Detect Cycle in a Directed Graph

> [!TIP]
> **🧠 Memory hook**
> A hiker leaves a trail of breadcrumbs; meeting a breadcrumb from the *current* trail means walking in circles.
> **Mantra: BACK EDGE = NODE ON CURRENT PATH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=19) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Does a directed graph contain a cycle?

## Key insight
In a directed graph a visited node is only a problem if it is still on the current DFS path (a back edge). Kahn's algorithm sees the same thing from the other side: a cycle keeps its nodes' indegrees above zero, so they can never be peeled off.

## Approach 1: DFS with in-path flags
```java
// DFS with an on-the-current-path flag: reaching a node that is on the path closes a cycle
public boolean isCyclicDfs(List<List<Integer>> adj) {
    int n = adj.size();
    boolean[] visited = new boolean[n], inPath = new boolean[n];
    for (int i = 0; i < n; i++) if (!visited[i] && dfs(adj, i, visited, inPath)) return true;
    return false;
}

// Returns true when a cycle is found below u
private boolean dfs(List<List<Integer>> adj, int u, boolean[] visited, boolean[] inPath) {
    visited[u] = inPath[u] = true;
    for (int v : adj.get(u)) {
        if (!visited[v] && dfs(adj, v, visited, inPath)) return true;
        if (inPath[v]) return true;
    }
    inPath[u] = false;
    return false;
}
```

## Approach 2: Kahn (indegree peeling)
```java
// Kahn's algorithm: if peeling zero-indegree nodes cannot remove every node, a cycle is left
public boolean isCyclicKahn(List<List<Integer>> adj) {
    int n = adj.size(), removed = 0;
    int[] indegree = new int[n];
    for (List<Integer> out : adj) for (int v : out) indegree[v]++;
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) que.add(i);
    while (!que.isEmpty()) {
        int u = que.poll();
        removed++;
        for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
    }
    return removed != n;
}
```

## Approach 3: Three colours
White = unseen, gray = on the path, black = finished. Meeting gray means a cycle.

```java
// Three-colour DFS: white unseen, gray on the path, black finished
public boolean isCyclicColors(List<List<Integer>> adj) {
    int[] color = new int[adj.size()];
    for (int i = 0; i < adj.size(); i++) if (color[i] == 0 && colorDfs(adj, i, color)) return true;
    return false;
}

// Returns true when a gray node is met again
private boolean colorDfs(List<List<Integer>> adj, int u, int[] color) {
    color[u] = 1;
    for (int v : adj.get(u)) {
        if (color[v] == 1) return true;
        if (color[v] == 0 && colorDfs(adj, v, color)) return true;
    }
    color[u] = 2;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with in-path flags | O(V + E) | O(V) |
| Kahn (indegree peeling) | O(V + E) | O(V) |
| Three colours | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why is "already visited" not enough?</summary>

A cross edge to a finished node (black) is not a cycle in a directed graph.

</details>


<details><summary>How does Kahn detect it?</summary>

If fewer than n nodes can be removed, the rest lie on or behind a cycle.

</details>


## Connected
- [Detect Cycle in an Undirected Graph](Detect%20Cycle%20in%20an%20Undirected%20Graph.md)
- [Find Eventual Safe States](Find%20Eventual%20Safe%20States.md)
- [Course Schedule](../Topological%20Sort/Course%20Schedule.md)
