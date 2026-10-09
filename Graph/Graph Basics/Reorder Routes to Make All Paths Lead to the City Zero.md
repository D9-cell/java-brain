---
topic: Graph Basics
pattern: [Tree DFS, Edge direction]
source: LeetCode 1466
difficulty: Medium
companies: [Meta]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Reorder Routes to Make All Paths Lead to the City Zero

> [!TIP]
> **🧠 Memory hook**
> A tree of one-way roads: walk out from city 0, and every road you walk the wrong way (along its arrow) must be turned around.
> **Mantra: EDGE POINTS AWAY FROM 0 ⇒ FLIP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=27) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
n cities form a tree of one-way roads. Find the minimum roads to reverse so every city reaches city 0.

## Key insight
Treat the roads as undirected and DFS/BFS from 0. An edge crossed in its original direction points away from 0 and must be reversed; an edge crossed against its direction already points toward 0.

## Approach 1: DFS (parent instead of visited)
```java
// DFS over the undirected tree: an edge walked in its original direction points away from 0 and must flip
public int minReorderDfs(int n, int[][] connections) {
    List<List<int[]>> adj = build(n, connections);
    return dfs(0, -1, adj);
}

// Counts flips below node, skipping the parent instead of keeping a visited array because it is a tree
private int dfs(int node, int parent, List<List<int[]>> adj) {
    int flips = 0;
    for (int[] next : adj.get(node)) {
        if (next[0] != parent) flips += next[1] + dfs(next[0], node, adj);
    }
    return flips;
}
```

## Approach 2: BFS
```java
// BFS from city 0 with the same rule
public int minReorderBfs(int n, int[][] connections) {
    List<List<int[]>> adj = build(n, connections);
    boolean[] visited = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>();
    que.add(0);
    visited[0] = true;
    int flips = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int[] next : adj.get(u)) {
            if (!visited[next[0]]) {
                visited[next[0]] = true;
                flips += next[1];
                que.add(next[0]);
            }
        }
    }
    return flips;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS (parent instead of visited) | O(n) | O(n) |
| BFS | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why store weight 1 and 0?</summary>

1 marks the real direction (needs a flip), 0 the reverse copy.

</details>


<details><summary>Why no visited array in DFS?</summary>

It is a tree: skipping the parent is enough.

</details>


## Connected
- [Minimum Time to Collect All Apples in a Tree](../Trees%20and%20Advanced%20Graphs/Minimum%20Time%20to%20Collect%20All%20Apples%20in%20a%20Tree.md)
