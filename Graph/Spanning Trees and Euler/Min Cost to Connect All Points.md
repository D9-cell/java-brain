---
topic: Spanning Trees and Euler
pattern: [Prim, Kruskal, Complete graph]
source: LeetCode 1584
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Min Cost to Connect All Points

> [!TIP]
> **🧠 Memory hook**
> Wire up every point; any two points can be joined, so use Prim without building the n² edges.
> **Mantra: PRIM WITH best[] ARRAY, O(n²)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=2) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Points on a plane; the cost to connect two is their Manhattan distance. Connect all points at minimum total cost.

## Key insight
The graph is complete, so the MST problem applies directly. Prim with an array of cheapest connections is O(n²) and needs no edge list; Kruskal over all pairs works too but sorts n² edges.

## Approach 1: Prim with an array
```java
// Prim on the complete graph with an array of cheapest connection costs, O(n²) and no edge list at all
public int minCostConnectPointsPrim(int[][] points) {
    int n = points.length;
    int[] best = new int[n];
    Arrays.fill(best, Integer.MAX_VALUE);
    boolean[] inTree = new boolean[n];
    best[0] = 0;
    int total = 0;
    for (int round = 0; round < n; round++) {
        int u = -1;
        for (int v = 0; v < n; v++) if (!inTree[v] && (u == -1 || best[v] < best[u])) u = v;
        inTree[u] = true;
        total += best[u];
        for (int v = 0; v < n; v++) if (!inTree[v]) best[v] = Math.min(best[v], dist(points[u], points[v]));
    }
    return total;
}

// Manhattan distance between two points
private int dist(int[] a, int[] b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
```

## Approach 2: Kruskal over all pairs
```java
// Kruskal over all n(n - 1)/2 pairs sorted by distance
public int minCostConnectPointsKruskal(int[][] points) {
    int n = points.length;
    List<int[]> edges = new ArrayList<>();
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) edges.add(new int[]{i, j, dist(points[i], points[j])});
    edges.sort((a, b) -> a[2] - b[2]);
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int total = 0;
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a != b) { parent[a] = b; total += e[2]; }
    }
    return total;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Prim with an array | O(n²) | O(n) |
| Kruskal over all pairs | O(n² log n) | O(n²) |

## Recall before you reveal
<details><summary>Why not Dijkstra?</summary>

We want a connecting tree of minimum total edge weight, not shortest paths.

</details>


<details><summary>Why is Prim O(n²) here?</summary>

Each round scans n points and updates n costs.

</details>


## Connected
- [Minimum Spanning Tree (Prim's Algorithm)](Minimum%20Spanning%20Tree%20%28Prim%27s%20Algorithm%29.md)
- [Minimum Spanning Tree (Kruskal's Algorithm)](Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
