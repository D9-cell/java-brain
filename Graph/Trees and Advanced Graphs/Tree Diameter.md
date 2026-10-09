---
topic: Trees and Advanced Graphs
pattern: [Two BFS, Tree DP]
source: LeetCode 1245
difficulty: Medium
companies: [Google, Meta]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Tree Diameter

> [!TIP]
> **🧠 Memory hook**
> Hold the tree by any leaf, pull the farthest leaf, and that pair spans the tree.
> **Mantra: FARTHEST FROM ANYWHERE, THEN FARTHEST FROM THAT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=0) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return the number of edges on the longest path in an undirected tree.

## Key insight
The farthest node from any start is an end of some diameter, so two BFS passes give the answer. A one-pass DFS combines each node's two tallest child heights.

## Approach 1: Two BFS passes
```java
// Two BFS passes: the farthest node from any start is one end of a diameter, and the farthest from it gives the length
public int diameterTwoBfs(int[][] edges) {
    int n = edges.length + 1;
    List<List<Integer>> adj = build(n, edges);
    int[] first = bfs(adj, 0);
    int[] second = bfs(adj, first[0]);
    return second[1];
}

// Returns {farthest node, its distance} from the start
private int[] bfs(List<List<Integer>> adj, int start) {
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Queue<Integer> que = new ArrayDeque<>(List.of(start));
    dist[start] = 0;
    int far = start;
    while (!que.isEmpty()) {
        int u = que.poll();
        if (dist[u] > dist[far]) far = u;
        for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; que.add(v); }
    }
    return new int[]{far, dist[far]};
}
```

## Approach 2: One DFS with two tallest children
```java
// One DFS: at each node the best path through it is the sum of its two tallest child heights
public int diameterDfs(int[][] edges) {
    int n = edges.length + 1;
    int[] best = {0};
    height(build(n, edges), 0, -1, best);
    return best[0];
}

// Returns the height of u's subtree and updates the best path through u
private int height(List<List<Integer>> adj, int u, int parent, int[] best) {
    int top1 = 0, top2 = 0;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        int h = 1 + height(adj, v, u, best);
        if (h > top1) { top2 = top1; top1 = h; }
        else if (h > top2) top2 = h;
    }
    best[0] = Math.max(best[0], top1 + top2);
    return top1;
}
```

| Approach | Time | Space |
|---|---|---|
| Two BFS passes | O(n) | O(n) |
| One DFS with two tallest children | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why does the two-BFS trick work?</summary>

Any farthest node from any start is an endpoint of a longest path in a tree.

</details>


<details><summary>Does it work with negative weights or in general graphs?</summary>

No, only trees with non-negative weights.

</details>


## Connected
- [Find Minimum Diameter After Merging Two Trees](Find%20Minimum%20Diameter%20After%20Merging%20Two%20Trees.md)
- [Longest Path With Different Adjacent Characters](Longest%20Path%20With%20Different%20Adjacent%20Characters.md)
