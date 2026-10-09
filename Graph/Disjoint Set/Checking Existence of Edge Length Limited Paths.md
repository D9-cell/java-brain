---
topic: Disjoint Set
pattern: [Offline queries, Union-Find]
source: LeetCode 1697
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Checking Existence of Edge Length Limited Paths

> [!TIP]
> **🧠 Memory hook**
> Open the gates in order of size; a visitor with limit L may use exactly the gates shorter than L.
> **Mantra: SORT EDGES AND QUERIES; UNION EDGES < LIMIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=2) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Each query (p, q, limit) asks: is there a path from p to q using only edges with length < limit?

## Key insight
Answer offline. Sort edges by length and queries by limit. For each query, union all edges shorter than its limit (the pointer only moves forward), then test connectivity.

## Approach: Offline sort + Union-Find
```java
// Offline: sort edges and queries by length, and before answering a query union every edge strictly shorter than its limit
public boolean[] distanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries) {
    int[][] edges = edgeList.clone();
    Arrays.sort(edges, (a, b) -> a[2] - b[2]);
    Integer[] order = new Integer[queries.length];
    for (int i = 0; i < order.length; i++) order[i] = i;
    Arrays.sort(order, (a, b) -> queries[a][2] - queries[b][2]);
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    boolean[] answer = new boolean[queries.length];
    int next = 0;
    for (int qi : order) {
        while (next < edges.length && edges[next][2] < queries[qi][2]) {
            parent[find(parent, edges[next][0])] = find(parent, edges[next][1]);
            next++;
        }
        answer[qi] = find(parent, queries[qi][0]) == find(parent, queries[qi][1]);
    }
    return answer;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Offline sort + Union-Find | O(E log E + Q log Q) | O(n + Q) |

## Recall before you reveal
<details><summary>Why offline?</summary>

The structure only grows; answering in limit order never needs deletions.

</details>


<details><summary>Why < and not ≤?</summary>

The problem says strictly less than the limit.

</details>


## Connected
- [Path With Minimum Effort](../Shortest%20Paths/Path%20With%20Minimum%20Effort.md)
- [Minimum Spanning Tree (Kruskal's Algorithm)](../Spanning%20Trees%20and%20Euler/Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
