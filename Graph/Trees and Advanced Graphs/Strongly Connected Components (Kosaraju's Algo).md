---
topic: Trees and Advanced Graphs
pattern: [SCC, Two-pass DFS, Tarjan]
source: GfG
difficulty: Hard
companies: [Amazon, Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Strongly Connected Components (Kosaraju's Algo)

> [!TIP]
> **🧠 Memory hook**
> Reverse every road: a DFS started in the last-finished node then stays inside its own district.
> **Mantra: FINISH ORDER, REVERSE EDGES, DFS IN REVERSE ORDER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=12) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Count the strongly connected components (maximal groups where every node reaches every other) of a directed graph.

## Key insight
Pass 1: DFS pushing nodes by finish time. Pass 2: reverse all edges and DFS in decreasing finish time; each DFS tree is one SCC, because the first node (latest finisher) lives in a source component of the original graph and its reversed DFS cannot leave the component.

## Approach 1: Kosaraju (two passes)
```java
// Pass 1: DFS on the graph and push nodes by finish time. Pass 2: DFS on the reversed graph in reverse finish order; each tree is one SCC
public int kosaraju(List<List<Integer>> adj) {
    int n = adj.size();
    boolean[] visited = new boolean[n];
    Deque<Integer> order = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (!visited[i]) finish(adj, i, visited, order);
    List<List<Integer>> rev = new ArrayList<>();
    for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
    for (int u = 0; u < n; u++) for (int v : adj.get(u)) rev.get(v).add(u);
    Arrays.fill(visited, false);
    int count = 0;
    while (!order.isEmpty()) {
        int u = order.pop();
        if (!visited[u]) {
            count++;
            mark(rev, u, visited);
        }
    }
    return count;
}

// Pushes u after all nodes reachable from it have been pushed
private void finish(List<List<Integer>> adj, int u, boolean[] visited, Deque<Integer> order) {
    visited[u] = true;
    for (int v : adj.get(u)) if (!visited[v]) finish(adj, v, visited, order);
    order.push(u);
}

// Marks everything reachable in the reversed graph
private void mark(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) if (!visited[v]) mark(adj, v, visited);
}
```

## Approach 2: Tarjan (one pass, low-link)
```java
// Tarjan's single-pass version using low-link values, for cross-checking
public int tarjan(List<List<Integer>> adj) {
    int n = adj.size();
    int[] tin = new int[n], low = new int[n];
    Arrays.fill(tin, -1);
    boolean[] onStack = new boolean[n];
    Deque<Integer> stack = new ArrayDeque<>();
    int[] state = {0, 0};
    for (int i = 0; i < n; i++) if (tin[i] == -1) strong(adj, i, tin, low, onStack, stack, state);
    return state[1];
}

// Pops a whole SCC when a node's low value equals its discovery time
private void strong(List<List<Integer>> adj, int u, int[] tin, int[] low, boolean[] onStack, Deque<Integer> stack, int[] state) {
    tin[u] = low[u] = state[0]++;
    stack.push(u);
    onStack[u] = true;
    for (int v : adj.get(u)) {
        if (tin[v] == -1) { strong(adj, v, tin, low, onStack, stack, state); low[u] = Math.min(low[u], low[v]); }
        else if (onStack[v]) low[u] = Math.min(low[u], tin[v]);
    }
    if (low[u] == tin[u]) {
        state[1]++;
        while (true) { int x = stack.pop(); onStack[x] = false; if (x == u) break; }
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Kosaraju (two passes) | O(V + E) | O(V + E) |
| Tarjan (one pass, low-link) | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why reverse the edges?</summary>

It turns the condensation DAG around so the DFS cannot escape to another component.

</details>


<details><summary>Does Kosaraju work for undirected graphs?</summary>

It gives plain connected components, but a simple DFS or Union-Find is enough.

</details>


## Connected
- [Critical Connections in a Network](Critical%20Connections%20in%20a%20Network.md)
- [Find Mother Vertex in Directed Graph](../Graph%20Basics/Find%20Mother%20Vertex%20in%20Directed%20Graph.md)
