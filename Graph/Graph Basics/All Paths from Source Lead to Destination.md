---
topic: Graph Basics
pattern: [DFS, Cycle detection]
source: LeetCode 1059
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# All Paths from Source Lead to Destination

> [!TIP]
> **🧠 Memory hook**
> Every road out of town must end at the same harbour, and no road may loop forever.
> **Mantra: DEAD END = DEST; BACK EDGE ⇒ FALSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=10) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
In a directed graph, do all paths starting at source end at destination (finitely many paths, every dead end is the destination)?

## Key insight
Run a cycle-checking DFS from the source. A node on the current path means an infinite walk; a node with no outgoing edge must be the destination; the destination itself must have no outgoing edges.

## Approach: DFS with an in-stack set
```java
// DFS with an in-stack set: a back edge means an infinite walk, a dead end must be the destination
public boolean leadsToDestination(int n, int[][] edges, int source, int destination) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) adj.get(e[0]).add(e[1]);
    if (!adj.get(destination).isEmpty()) return false;
    return dfs(adj, source, destination, new boolean[n], new boolean[n]);
}

// Returns true when every walk from u ends at the destination
private boolean dfs(List<List<Integer>> adj, int u, int dest, boolean[] inStack, boolean[] visited) {
    if (adj.get(u).isEmpty()) return u == dest;
    inStack[u] = true;
    visited[u] = true;
    for (int v : adj.get(u)) {
        if (inStack[v]) return false;
        if (!visited[v] && !dfs(adj, v, dest, inStack, visited)) return false;
    }
    inStack[u] = false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with an in-stack set | O(V + E) | O(V + E) |

> [!WARNING]
> **Java gotcha**
> Checked on the five examples of the problem and 4000 random graphs against a bounded-length brute force.

## Recall before you reveal
<details><summary>Why must the destination have no outgoing edges?</summary>

Otherwise a path could continue past it and end somewhere else, or loop forever.

</details>


<details><summary>What marks an infinite path?</summary>

Reaching a node that is already on the current DFS path.

</details>


## Connected
- [Detect Cycle in a Directed Graph](Detect%20Cycle%20in%20a%20Directed%20Graph.md)
- [All Paths From Source to Target](All%20Paths%20From%20Source%20to%20Target.md)
