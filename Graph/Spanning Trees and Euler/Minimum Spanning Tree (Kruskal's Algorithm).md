---
topic: Spanning Trees and Euler
pattern: [Kruskal, Union-Find, Greedy]
source: GfG
difficulty: Medium
companies: [Amazon, Cisco, Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Minimum Spanning Tree (Kruskal's Algorithm)

> [!TIP]
> **🧠 Memory hook**
> Buy the cheapest road anywhere, as long as it links two towns that are not yet connected.
> **Mantra: SORT EDGES; TAKE IF find(a) != find(b)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=0) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Find the minimum total weight of edges that connect all vertices of a weighted undirected graph.

## Key insight
Greedy by edge: sort edges by weight and take each edge that joins two different components, using Union-Find to test it. It is correct by the cut property: the cheapest edge crossing any cut is in some MST. If fewer than V − 1 edges are taken the graph is disconnected.

## Approach: Kruskal with Union-Find
```java
// Sort edges by weight and take each one that joins two different components (Union-Find); -1 when the graph is disconnected
public int spanningTree(int V, int[][] edges) {
    int[][] sorted = edges.clone();
    Arrays.sort(sorted, (a, b) -> a[2] - b[2]);
    int[] parent = new int[V], rank = new int[V];
    for (int i = 0; i < V; i++) parent[i] = i;
    int sum = 0, used = 0;
    for (int[] e : sorted) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a == b) continue;
        if (rank[a] < rank[b]) parent[a] = b;
        else if (rank[a] > rank[b]) parent[b] = a;
        else { parent[b] = a; rank[a]++; }
        sum += e[2];
        used++;
    }
    return used == V - 1 ? sum : -1;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Kruskal with Union-Find | O(E log E) | O(V) |

## Recall before you reveal
<details><summary>How do you know the graph has no MST?</summary>

Fewer than V − 1 edges were taken: it is disconnected.

</details>


<details><summary>Why does skipping cycle edges stay optimal?</summary>

An edge inside one component is never the cheapest crossing edge of a cut.

</details>


## Connected
- [Minimum Spanning Tree (Prim's Algorithm)](Minimum%20Spanning%20Tree%20%28Prim%27s%20Algorithm%29.md)
- [Redundant Connection](../Disjoint%20Set/Redundant%20Connection.md)
