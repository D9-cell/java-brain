---
topic: Graph Basics
pattern: [Components, DFS, Union-Find]
source: LeetCode 2492
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Minimum Score of a Path Between Two Cities

> [!TIP]
> **🧠 Memory hook**
> Roads can be driven twice, so the weakest bridge anywhere in your region sets your score.
> **Mantra: MIN ROAD IN CITY 1'S COMPONENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=29) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Score of a path = its minimum road. Walks may reuse roads. Return the minimum score from city 1 to city n.

## Key insight
Because a path may revisit nodes and edges, any road in the same component as city 1 can be detoured through. The answer is the lightest road of that component.

## Approach 1: DFS
```java
// The answer is the lightest road in the component that contains city 1, since a path may reuse roads
public int minScoreDfs(int n, int[][] roads) {
    List<List<int[]>> adj = build(n, roads);
    int[] best = {Integer.MAX_VALUE};
    dfs(adj, 1, new boolean[n + 1], best);
    return best[0];
}

// Visits the component and tracks the smallest road weight seen
private void dfs(List<List<int[]>> adj, int u, boolean[] visited, int[] best) {
    visited[u] = true;
    for (int[] e : adj.get(u)) {
        best[0] = Math.min(best[0], e[1]);
        if (!visited[e[0]]) dfs(adj, e[0], visited, best);
    }
}
```

## Approach 2: Union-Find
```java
// Union-Find: join every road, then take the lightest road whose end shares city 1's root
public int minScoreDsu(int n, int[][] roads) {
    int[] parent = new int[n + 1];
    for (int i = 0; i <= n; i++) parent[i] = i;
    for (int[] r : roads) parent[find(parent, r[0])] = find(parent, r[1]);
    int best = Integer.MAX_VALUE;
    for (int[] r : roads) if (find(parent, r[0]) == find(parent, 1)) best = Math.min(best, r[2]);
    return best;
}

// Finds the root with path compression
private int find(int[] parent, int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n + E) | O(n + E) |
| Union-Find | O(E · α(n)) | O(n) |

## Recall before you reveal
<details><summary>Why can every road in the component be used?</summary>

You may go there and come back along the same roads.

</details>


<details><summary>Is Dijkstra needed?</summary>

No: it is a component question.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
