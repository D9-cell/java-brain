---
topic: Graph Basics
pattern: [DFS, Tree, Euler times]
source: GfG
difficulty: Medium
companies: [Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Check If Two Nodes Are On Same Path In A Graph

> [!TIP]
> **🧠 Memory hook**
> Stamp each node with the clock time you enter and leave it; an ancestor's visit window contains its descendants' windows.
> **Mantra: NESTED TIN/TOUT ⇒ SAME PATH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=23) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
In a rooted tree, answer queries: do nodes u and v lie on the same root-to-leaf path?

## Key insight
Run one DFS recording entry (tin) and exit (tout) times. u is an ancestor of v exactly when tin[u] < tin[v] and tout[u] > tout[v]. Each query is then O(1).

## Approach: tin/tout intervals
```java
// One DFS stamps every node with entry and exit times
public void preprocess(List<List<Integer>> adj, int root) {
    tin = new int[adj.size()];
    tout = new int[adj.size()];
    timer = 0;
    dfs(adj, root, new boolean[adj.size()]);
}

// Stamps entry on the way down and exit on the way back up
private void dfs(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    tin[u] = ++timer;
    for (int v : adj.get(u)) if (!visited[v]) dfs(adj, v, visited);
    tout[u] = ++timer;
}

// One interval must sit strictly inside the other: then one node is an ancestor of the other
public boolean onSamePath(int u, int v) {
    return (tin[u] < tin[v] && tout[u] > tout[v]) || (tin[v] < tin[u] && tout[v] > tout[u]);
}
```

| Approach | Time | Space |
|---|---|---|
| tin/tout intervals | O(n) + O(1) per query | O(n) |

## Recall before you reveal
<details><summary>Why is it O(1) per query?</summary>

Two integer comparisons on precomputed times.

</details>


<details><summary>What do nested intervals mean?</summary>

The inner node was visited while the outer one was still open, so it is in its subtree.

</details>


## Connected
- [Number of Nodes in the Sub-Tree With the Same Label](../Trees%20and%20Advanced%20Graphs/Number%20of%20Nodes%20in%20the%20Sub-Tree%20With%20the%20Same%20Label.md)
