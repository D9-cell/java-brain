---
topic: Spanning Trees and Euler
pattern: [Prim, Min-heap]
source: GfG
difficulty: Medium
companies: [Amazon, Cisco, Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Minimum Spanning Tree (Prim's Algorithm)

> [!TIP]
> **🧠 Memory hook**
> Grow one region: always buy the cheapest road that leaves it.
> **Mantra: CHEAPEST EDGE LEAVING THE TREE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=1) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Same problem as Kruskal, solved by growing a single tree from vertex 0.

## Key insight
Keep a min-heap of candidate edges leaving the tree. Pop the cheapest one that reaches a new vertex, add the vertex and push its edges. On a dense graph an array of "cheapest edge to each outside vertex" scanned in O(V) per round is simpler and O(V²) overall.

## Approach 1: Prim with a heap
```java
// Heap version: push the edges of each newly added vertex and pop the cheapest one that reaches a new vertex
public int primHeap(int V, List<List<int[]>> adj) {
    boolean[] inTree = new boolean[V];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0});
    int sum = 0, added = 0;
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (inTree[top[1]]) continue;
        inTree[top[1]] = true;
        sum += top[0];
        added++;
        for (int[] e : adj.get(top[1])) if (!inTree[e[0]]) pq.add(new int[]{e[1], e[0]});
    }
    return added == V ? sum : -1;
}
```

## Approach 2: Prim with an array (dense graphs)
```java
// Array version for dense graphs: key[v] = cheapest edge from the tree to v, pick the smallest key each round
public int primArray(int V, int[][] weight) {
    int INF = Integer.MAX_VALUE;
    int[] key = new int[V];
    Arrays.fill(key, INF);
    boolean[] inTree = new boolean[V];
    key[0] = 0;
    int sum = 0;
    for (int round = 0; round < V; round++) {
        int u = -1;
        for (int v = 0; v < V; v++) if (!inTree[v] && (u == -1 || key[v] < key[u])) u = v;
        if (key[u] == INF) return -1;
        inTree[u] = true;
        sum += key[u];
        for (int v = 0; v < V; v++) if (!inTree[v] && weight[u][v] > 0 && weight[u][v] < key[v]) key[v] = weight[u][v];
    }
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Prim with a heap | O(E log V) | O(V + E) |
| Prim with an array (dense graphs) | O(V²) | O(V) |

## Recall before you reveal
<details><summary>Prim or Kruskal?</summary>

Prim for dense graphs (array version), Kruskal when edges come as a sorted list or the graph is sparse.

</details>


<details><summary>How does Prim differ from Dijkstra?</summary>

It compares a single edge weight, not a path length from the source.

</details>


## Connected
- [Minimum Spanning Tree (Kruskal's Algorithm)](Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
- [Dijkstra's Algorithm](../Shortest%20Paths/Dijkstra%27s%20Algorithm.md)
