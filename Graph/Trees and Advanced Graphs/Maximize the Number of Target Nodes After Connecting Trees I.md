---
topic: Trees and Advanced Graphs
pattern: [BFS within distance k, Two trees]
source: LeetCode 3372
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Maximize the Number of Target Nodes After Connecting Trees I

> [!TIP]
> **🧠 Memory hook**
> A bridge to the second island costs one step, so only k − 1 steps remain over there; and the best landing spot is the same for every start.
> **Mantra: OWN TREE WITHIN k + BEST OF OTHER TREE WITHIN k − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=2) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Two trees. For each node i of the first, connect it to one node of the second so that the most nodes lie within distance k of i. Return the count per i.

## Key insight
The other tree does not depend on i: its contribution is the best "nodes within k − 1 of some node" over all its nodes, computed once. Add each i's own count within k.

## Approach 1: BFS count within distance
```java
// For each node of tree 1: nodes within k in tree 1, plus the best node of tree 2 reached through the new edge (so within k - 1 there)
public int[] maxTargetNodes(int[][] edges1, int[][] edges2, int k) {
    int n = edges1.length + 1, m = edges2.length + 1;
    List<List<Integer>> a = build(n, edges1), b = build(m, edges2);
    int bestSecond = 0;
    if (k > 0) for (int j = 0; j < m; j++) bestSecond = Math.max(bestSecond, countWithin(b, j, k - 1));
    int[] result = new int[n];
    for (int i = 0; i < n; i++) result[i] = countWithin(a, i, k) + bestSecond;
    return result;
}

// BFS counting nodes within distance d of start (the start itself counts)
private int countWithin(List<List<Integer>> adj, int start, int d) {
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Queue<Integer> que = new ArrayDeque<>(List.of(start));
    dist[start] = 0;
    int count = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        if (dist[u] > d) continue;
        count++;
        for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; que.add(v); }
    }
    return count;
}
```

## Approach 2: DFS with a depth budget
```java
// Same count using a recursive DFS with a depth budget
public int[] maxTargetNodesDfs(int[][] edges1, int[][] edges2, int k) {
    int n = edges1.length + 1, m = edges2.length + 1;
    List<List<Integer>> a = build(n, edges1), b = build(m, edges2);
    int bestSecond = 0;
    if (k > 0) for (int j = 0; j < m; j++) bestSecond = Math.max(bestSecond, dfs(b, j, -1, k - 1));
    int[] result = new int[n];
    for (int i = 0; i < n; i++) result[i] = dfs(a, i, -1, k) + bestSecond;
    return result;
}

// Counts nodes reachable within the remaining depth
private int dfs(List<List<Integer>> adj, int u, int parent, int depth) {
    if (depth < 0) return 0;
    int count = 1;
    for (int v : adj.get(u)) if (v != parent) count += dfs(adj, v, u, depth - 1);
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS count within distance | O(n² + m²) | O(n + m) |
| DFS with a depth budget | O(n² + m²) | O(n + m) |

## Recall before you reveal
<details><summary>Why k − 1 for the second tree?</summary>

The connecting edge uses one step.

</details>


<details><summary>What if k = 0?</summary>

Only i itself counts; the second tree adds nothing.

</details>


## Connected
- [Maximize the Number of Target Nodes After Connecting Trees II](Maximize%20the%20Number%20of%20Target%20Nodes%20After%20Connecting%20Trees%20II.md)
