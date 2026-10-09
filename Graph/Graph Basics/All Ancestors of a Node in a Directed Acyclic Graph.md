---
topic: Graph Basics
pattern: [Topological order, DFS]
source: LeetCode 2192
difficulty: Medium
companies: [Google, Oracle, Palantir]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# All Ancestors of a Node in a Directed Acyclic Graph

> [!TIP]
> **🧠 Memory hook**
> Family trees: you inherit your parents and everything they inherited.
> **Mantra: CHILD GETS PARENT + PARENT'S ANCESTORS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=25) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
For every node of a DAG, return the sorted list of all its ancestors.

## Key insight
Process nodes in topological order: when edge u → v is handled, ancestors(u) is already final, so ancestors(v) absorbs u and ancestors(u). The DFS versions simply repeat a search from every node.

## Approach 1: Push from every node
```java
// DFS from every node pushing itself as an ancestor onto everything it can reach
public List<List<Integer>> getAncestorsForward(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>(), result = new ArrayList<>();
    for (int i = 0; i < n; i++) { adj.add(new ArrayList<>()); result.add(new ArrayList<>()); }
    for (int[] e : edges) adj.get(e[0]).add(e[1]);
    for (int i = 0; i < n; i++) push(i, i, adj, result);
    return result;
}

// Adds ancestor to every descendant of u once; the last-entry check stops repeated visits in this round
private void push(int ancestor, int u, List<List<Integer>> adj, List<List<Integer>> result) {
    for (int v : adj.get(u)) {
        List<Integer> list = result.get(v);
        if (list.isEmpty() || list.get(list.size() - 1) != ancestor) {
            list.add(ancestor);
            push(ancestor, v, adj, result);
        }
    }
}
```

## Approach 2: Reverse graph, DFS per node
```java
// Reverse the graph and DFS from each node: everything reached is an ancestor
public List<List<Integer>> getAncestorsReverse(int n, int[][] edges) {
    List<List<Integer>> rev = new ArrayList<>(), result = new ArrayList<>();
    for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
    for (int[] e : edges) rev.get(e[1]).add(e[0]);
    for (int u = 0; u < n; u++) {
        boolean[] visited = new boolean[n];
        dfs(rev, u, visited);
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) if (i != u && visited[i]) list.add(i);
        result.add(list);
    }
    return result;
}

// Marks everything reachable in the reversed graph
private void dfs(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) if (!visited[v]) dfs(adj, v, visited);
}
```

## Approach 3: Topological order merge
```java
// Topological order, then each node hands itself and its own ancestors to its children
public List<List<Integer>> getAncestorsTopo(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[n];
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); indegree[e[1]]++; }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) que.add(i);
    List<TreeSet<Integer>> anc = new ArrayList<>();
    for (int i = 0; i < n; i++) anc.add(new TreeSet<>());
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int v : adj.get(u)) {
            anc.get(v).add(u);
            anc.get(v).addAll(anc.get(u));
            if (--indegree[v] == 0) que.add(v);
        }
    }
    List<List<Integer>> result = new ArrayList<>();
    for (TreeSet<Integer> t : anc) result.add(new ArrayList<>(t));
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Push from every node | O(n · (n + E)) | O(n²) |
| Reverse graph, DFS per node | O(n · (n + E)) | O(n²) |
| Topological order merge | O(n² + E) | O(n²) |

## Recall before you reveal
<details><summary>Why topological order?</summary>

It guarantees a parent's ancestor set is complete before it is copied to children.

</details>


<details><summary>Why a TreeSet?</summary>

It deduplicates and returns the ancestors sorted.

</details>


## Connected
- [Topological Sort (BFS - Kahn's Algorithm)](../Topological%20Sort/Topological%20Sort%20%28BFS%20-%20Kahn%27s%20Algorithm%29.md)
