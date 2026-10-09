---
topic: Graph Basics
pattern: [DFS, BFS, Connectivity]
source: LeetCode 1971
difficulty: Easy
companies: [Microsoft, Adobe, Amazon, Morgan Stanley, Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find if Path Exists in Graph

> [!TIP]
> **🧠 Memory hook**
> Two cities are connected exactly when you can walk from one to the other: just walk.
> **Mantra: WALK FROM SOURCE; TOUCH TARGET ⇒ TRUE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=2) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Undirected graph with n nodes. Is there a path from source to destination?

## Key insight
It is a reachability question. Any traversal from the source answers it; stop early the moment the destination is touched.

## Approach 1: DFS
```java
// DFS from the source until the destination is touched
public boolean validPathDfs(int n, int[][] edges, int source, int destination) {
    return dfs(build(n, edges), source, destination, new boolean[n]);
}

// Recursive helper for validPathDfs
private boolean dfs(List<List<Integer>> adj, int u, int target, boolean[] visited) {
    if (u == target) return true;
    visited[u] = true;
    for (int v : adj.get(u)) {
        if (!visited[v] && dfs(adj, v, target, visited)) return true;
    }
    return false;
}
```

## Approach 2: BFS
```java
// BFS from the source, stopping as soon as the destination is reached
public boolean validPathBfs(int n, int[][] edges, int source, int destination) {
    List<List<Integer>> adj = build(n, edges);
    boolean[] visited = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>();
    que.add(source);
    visited[source] = true;
    while (!que.isEmpty()) {
        int u = que.poll();
        if (u == destination) return true;
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                visited[v] = true;
                que.add(v);
            }
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(V + E) | O(V) |
| BFS | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why return early?</summary>

Once the destination is reached the answer is final.

</details>


<details><summary>Alternative?</summary>

Union-Find: same root means a path exists.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
- [Find Whether Path Exist in a Grid](Find%20Whether%20Path%20Exist%20in%20a%20Grid.md)
