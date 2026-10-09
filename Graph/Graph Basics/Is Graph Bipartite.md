---
topic: Graph Basics
pattern: [2-colouring, DFS, BFS, Union-Find]
source: LeetCode 785
difficulty: Medium
companies: [Facebook, Samsung, Microsoft, Flipkart]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Is Graph Bipartite

> [!TIP]
> **🧠 Memory hook**
> Paint the nodes with two colours so every road joins different colours; a clash means an odd cycle.
> **Mantra: NEIGHBOUR = OPPOSITE COLOUR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=21) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Can the nodes be split into two sets with every edge between the sets?

## Key insight
Colour a start node, force the opposite colour on its neighbours, and fail on the first same-colour edge. A graph is bipartite exactly when it has no odd cycle. Disconnected graphs need a colouring started in every component.

## Approach 1: DFS colouring
```java
// DFS colouring: every neighbour must get the opposite colour
public boolean isBipartiteDfs(int[][] graph) {
    int[] color = new int[graph.length];
    Arrays.fill(color, -1);
    for (int i = 0; i < graph.length; i++) if (color[i] == -1 && !dfs(graph, i, 0, color)) return false;
    return true;
}

// Colours u, then forces the opposite colour on each neighbour
private boolean dfs(int[][] graph, int u, int c, int[] color) {
    color[u] = c;
    for (int v : graph[u]) {
        if (color[v] == c) return false;
        if (color[v] == -1 && !dfs(graph, v, 1 - c, color)) return false;
    }
    return true;
}
```

## Approach 2: BFS colouring
```java
// BFS colouring: the same rule one layer at a time
public boolean isBipartiteBfs(int[][] graph) {
    int[] color = new int[graph.length];
    Arrays.fill(color, -1);
    for (int s = 0; s < graph.length; s++) {
        if (color[s] != -1) continue;
        color[s] = 0;
        Queue<Integer> que = new ArrayDeque<>();
        que.add(s);
        while (!que.isEmpty()) {
            int u = que.poll();
            for (int v : graph[u]) {
                if (color[v] == color[u]) return false;
                if (color[v] == -1) {
                    color[v] = 1 - color[u];
                    que.add(v);
                }
            }
        }
    }
    return true;
}
```

## Approach 3: Union-Find (neighbours share a set)
```java
// Union-Find: all neighbours of a node join one set, which must never contain the node itself
public boolean isBipartiteDsu(int[][] graph) {
    int n = graph.length;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int u = 0; u < n; u++) {
        for (int v : graph[u]) {
            if (find(parent, u) == find(parent, v)) return false;
            parent[find(parent, v)] = find(parent, graph[u][0]);
        }
    }
    return true;
}

// Finds the root with path compression
private int find(int[] parent, int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| DFS colouring | O(V + E) | O(V) |
| BFS colouring | O(V + E) | O(V) |
| Union-Find (neighbours share a set) | O(E · α(V)) | O(V) |

## Recall before you reveal
<details><summary>Why loop over all start nodes?</summary>

The graph may be disconnected.

</details>


<details><summary>What does bipartite forbid?</summary>

Odd-length cycles.

</details>


## Connected
- [Possible Bipartition](Possible%20Bipartition.md)
