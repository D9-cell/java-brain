---
topic: Trees and Advanced Graphs
pattern: [Tree diameter, Centres]
source: LeetCode 3203
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Find Minimum Diameter After Merging Two Trees

> [!TIP]
> **🧠 Memory hook**
> Plug the two trees together at their middles so that the longest reach on each side is as short as possible.
> **Mantra: JOIN THE CENTRES: max(d1, d2, ⌈d1/2⌉ + ⌈d2/2⌉ + 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=1) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Connect one node of each of two trees with a new edge. Return the minimum possible diameter of the result.

## Key insight
A path crossing the new edge costs (distance to the far end on each side) + 1. Each tree's centre minimises its farthest distance, which is ⌈d / 2⌉, so join the centres. The answer is the larger of d1, d2 and that crossing path.

## Approach: Diameters and a formula
```java
// Joining the two centres is best: the new diameter is max(d1, d2, ceil(d1 / 2) + ceil(d2 / 2) + 1)
public int minimumDiameterAfterMerge(int[][] edges1, int[][] edges2) {
    int d1 = diameter(edges1), d2 = diameter(edges2);
    return Math.max(Math.max(d1, d2), (d1 + 1) / 2 + (d2 + 1) / 2 + 1);
}

// Diameter of a tree by two BFS passes
private int diameter(int[][] edges) {
    int n = edges.length + 1;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] a = bfs(adj, 0);
    return bfs(adj, a[0])[1];
}

// Returns {farthest node, distance} from the start
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

| Approach | Time | Space |
|---|---|---|
| Diameters and a formula | O(n + m) | O(n + m) |

## Recall before you reveal
<details><summary>Why join the centres?</summary>

The centre has the smallest eccentricity, ⌈d / 2⌉.

</details>


<details><summary>Why also compare with d1 and d2?</summary>

The longest path may stay inside one tree.

</details>


## Connected
- [Tree Diameter](Tree%20Diameter.md)
