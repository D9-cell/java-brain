---
topic: Topological Sort
pattern: [Kahn, DFS finish order]
source: GfG
difficulty: Medium
companies: [Accolite, Amazon, Flipkart, Microsoft, Moonfrog Labs, OYO Rooms, Morgan Stanley]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Topological Sort (BFS - Kahn's Algorithm)

> [!TIP]
> **🧠 Memory hook**
> Getting dressed: put on socks before shoes; keep doing whatever has nothing left to wait for.
> **Mantra: INDEGREE 0 ⇒ GO; LOWER THE REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=0) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Given a directed acyclic graph, list the vertices so that every edge u → v has u before v.

## Key insight
Kahn: count incoming edges, queue the vertices with none, and as each is removed lower the counts of its successors. If fewer than V vertices come out, a cycle remains. DFS alternative: push a vertex after all its successors are finished; the stack, read from the top, is a topological order.

## Approach 1: Kahn's algorithm (BFS)
```java
// Kahn's algorithm: repeatedly remove a node with no remaining incoming edge; fewer than V removed means a cycle (empty list)
public List<Integer> topoKahn(int V, List<List<Integer>> adj) {
    int[] indegree = new int[V];
    for (List<Integer> out : adj) for (int v : out) indegree[v]++;
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < V; i++) if (indegree[i] == 0) que.add(i);
    List<Integer> order = new ArrayList<>();
    while (!que.isEmpty()) {
        int u = que.poll();
        order.add(u);
        for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
    }
    return order.size() == V ? order : new ArrayList<>();
}
```

## Approach 2: DFS finish order
```java
// DFS: push a node after everything it points to is finished, then read the stack top-down
public List<Integer> topoDfs(int V, List<List<Integer>> adj) {
    boolean[] visited = new boolean[V];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < V; i++) if (!visited[i]) finish(adj, i, visited, stack);
    return new ArrayList<>(stack);
}

// Pushes u once all its descendants have been pushed
private void finish(List<List<Integer>> adj, int u, boolean[] visited, Deque<Integer> stack) {
    visited[u] = true;
    for (int v : adj.get(u)) if (!visited[v]) finish(adj, v, visited, stack);
    stack.push(u);
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn's algorithm (BFS) | O(V + E) | O(V) |
| DFS finish order | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>How does Kahn detect a cycle?</summary>

Nodes on a cycle never reach in-degree 0, so fewer than V are removed.

</details>


<details><summary>Is the order unique?</summary>

No; any order that respects all edges is valid.

</details>


## Connected
- [Course Schedule](Course%20Schedule.md)
- [Detect Cycle in a Directed Graph](../Graph%20Basics/Detect%20Cycle%20in%20a%20Directed%20Graph.md)
