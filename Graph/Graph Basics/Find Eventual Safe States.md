---
topic: Graph Basics
pattern: [DFS, Kahn on reverse graph]
source: LeetCode 802
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find Eventual Safe States

> [!TIP]
> **🧠 Memory hook**
> A node is safe if every road from it eventually runs out; any road into a cycle is a trap.
> **Mantra: REVERSE GRAPH, PEEL OUTDEGREE 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=24) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
A node is safe if every path from it ends at a terminal node. Return all safe nodes in order.

## Key insight
Safe nodes are those that cannot reach a cycle. Run Kahn on the reversed graph starting from terminal nodes: a node becomes safe once all its successors are safe.

## Approach 1: DFS cycle check
```java
// DFS cycle check: a node is safe unless it is still on the recursion path when the DFS ends, i.e. it can reach a cycle
public List<Integer> eventualSafeNodesDfs(int[][] graph) {
    int n = graph.length;
    boolean[] visited = new boolean[n], inPath = new boolean[n];
    for (int i = 0; i < n; i++) if (!visited[i]) dfs(graph, i, visited, inPath);
    List<Integer> safe = new ArrayList<>();
    for (int i = 0; i < n; i++) if (!inPath[i]) safe.add(i);
    return safe;
}

// Returns true when a cycle is reachable from u; leaves inPath set for every node that can reach a cycle
private boolean dfs(int[][] graph, int u, boolean[] visited, boolean[] inPath) {
    visited[u] = inPath[u] = true;
    for (int v : graph[u]) {
        if (!visited[v] && dfs(graph, v, visited, inPath)) return true;
        if (inPath[v]) return true;
    }
    inPath[u] = false;
    return false;
}
```

## Approach 2: Kahn on the reversed graph
```java
// Kahn on the reversed graph: terminal nodes are safe, and a node turns safe once all its successors are
public List<Integer> eventualSafeNodesKahn(int[][] graph) {
    int n = graph.length;
    List<List<Integer>> reverse = new ArrayList<>();
    for (int i = 0; i < n; i++) reverse.add(new ArrayList<>());
    int[] outdegree = new int[n];
    for (int u = 0; u < n; u++) {
        for (int v : graph[u]) {
            reverse.get(v).add(u);
            outdegree[u]++;
        }
    }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (outdegree[i] == 0) que.add(i);
    boolean[] safe = new boolean[n];
    while (!que.isEmpty()) {
        int u = que.poll();
        safe[u] = true;
        for (int p : reverse.get(u)) if (--outdegree[p] == 0) que.add(p);
    }
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < n; i++) if (safe[i]) result.add(i);
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS cycle check | O(V + E) | O(V) |
| Kahn on the reversed graph | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>Why reverse the graph?</summary>

Safety flows backwards from terminals to their predecessors.

</details>


<details><summary>Which nodes are unsafe?</summary>

Nodes on a cycle and nodes that can reach one.

</details>


## Connected
- [Detect Cycle in a Directed Graph](Detect%20Cycle%20in%20a%20Directed%20Graph.md)
- [Course Schedule](../Topological%20Sort/Course%20Schedule.md)
