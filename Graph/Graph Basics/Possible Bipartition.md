---
topic: Graph Basics
pattern: [2-colouring, BFS]
source: LeetCode 886
difficulty: Medium
companies: [Microsoft, Flipkart, Samsung]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Possible Bipartition

> [!TIP]
> **🧠 Memory hook**
> Seat arrangements at a wedding: people who dislike each other go at different tables.
> **Mantra: DISLIKE EDGE ⇒ DIFFERENT GROUP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=22) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
n people, some pairs dislike each other. Can everyone be split into two groups with no disliking pair inside a group?

## Key insight
Build a graph with an edge per dislike. A valid split is a 2-colouring, so this is exactly "is the graph bipartite" with people numbered from 1.

## Approach 1: BFS colouring
```java
// BFS colouring over the dislike graph (people are 1..n)
public boolean possibleBipartitionBfs(int n, int[][] dislikes) {
    List<List<Integer>> adj = build(n, dislikes);
    int[] color = new int[n + 1];
    Arrays.fill(color, -1);
    for (int s = 1; s <= n; s++) {
        if (color[s] != -1) continue;
        color[s] = 0;
        Queue<Integer> que = new ArrayDeque<>();
        que.add(s);
        while (!que.isEmpty()) {
            int u = que.poll();
            for (int v : adj.get(u)) {
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

## Approach 2: DFS colouring
```java
// DFS colouring over the same graph
public boolean possibleBipartitionDfs(int n, int[][] dislikes) {
    List<List<Integer>> adj = build(n, dislikes);
    int[] color = new int[n + 1];
    Arrays.fill(color, -1);
    for (int s = 1; s <= n; s++) if (color[s] == -1 && !dfs(adj, s, 0, color)) return false;
    return true;
}

// Colours u and forces the opposite colour on everyone it dislikes
private boolean dfs(List<List<Integer>> adj, int u, int c, int[] color) {
    color[u] = c;
    for (int v : adj.get(u)) {
        if (color[v] == c) return false;
        if (color[v] == -1 && !dfs(adj, v, 1 - c, color)) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS colouring | O(n + E) | O(n + E) |
| DFS colouring | O(n + E) | O(n + E) |

## Recall before you reveal
<details><summary>How is it different from Is Graph Bipartite?</summary>

Input is an edge list and nodes are 1-indexed.

</details>


<details><summary>Why a colour array of size n + 1?</summary>

People are numbered 1..n.

</details>


## Connected
- [Is Graph Bipartite](Is%20Graph%20Bipartite.md)
