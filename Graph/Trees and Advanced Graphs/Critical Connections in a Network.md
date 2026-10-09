---
topic: Trees and Advanced Graphs
pattern: [Bridges, Tarjan low-link]
source: LeetCode 1192
difficulty: Hard
companies: [Google, Amazon, Uber]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Critical Connections in a Network

> [!TIP]
> **🧠 Memory hook**
> If a subtree has no road leading back above its entry point, that entry road is a bridge.
> **Mantra: low[v] > tin[u] ⇒ u–v IS A BRIDGE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=11) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Find all edges whose removal disconnects the network.

## Key insight
Run a DFS stamping discovery time tin and low (the earliest tin reachable from the subtree using at most one back edge). A tree edge u–v is a bridge exactly when low[v] > tin[u]: nothing below v can reach u or above.

## Approach: Tarjan's bridge DFS
```java
// Tarjan: low[u] is the earliest discovery time reachable from u's subtree using at most one back edge; tin[u] < low[v] marks a bridge
public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (List<Integer> c : connections) { adj.get(c.get(0)).add(c.get(1)); adj.get(c.get(1)).add(c.get(0)); }
    int[] tin = new int[n], low = new int[n];
    Arrays.fill(tin, -1);
    List<List<Integer>> bridges = new ArrayList<>();
    int[] timer = {0};
    for (int i = 0; i < n; i++) if (tin[i] == -1) dfs(adj, i, -1, tin, low, timer, bridges);
    return bridges;
}

// Records discovery and low times, and reports tree edges whose far side cannot climb back above u
private void dfs(List<List<Integer>> adj, int u, int parent, int[] tin, int[] low, int[] timer, List<List<Integer>> bridges) {
    tin[u] = low[u] = timer[0]++;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        if (tin[v] != -1) {
            low[u] = Math.min(low[u], tin[v]);
        } else {
            dfs(adj, v, u, tin, low, timer, bridges);
            low[u] = Math.min(low[u], low[v]);
            if (low[v] > tin[u]) bridges.add(List.of(u, v));
        }
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Tarjan's bridge DFS | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>What is low[u]?</summary>

The smallest discovery time reachable from u's subtree via one back edge.

</details>


<details><summary>Why skip the parent?</summary>

The tree edge back to the parent is not an alternative route.

</details>


## Connected
- [Strongly Connected Components (Kosaraju's Algo)](Strongly%20Connected%20Components%20%28Kosaraju%27s%20Algo%29.md)
- [Detect Cycle in an Undirected Graph](../Graph%20Basics/Detect%20Cycle%20in%20an%20Undirected%20Graph.md)
