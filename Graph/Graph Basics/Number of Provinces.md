---
topic: Graph Basics
pattern: [DFS, BFS, Components]
source: LeetCode 547
difficulty: Medium
companies: [Google, Microsoft, Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Number of Provinces

> [!TIP]
> **🧠 Memory hook**
> Friend circles at a party: every unvisited person starts a new circle, and the search pulls in the whole circle.
> **Mantra: NEW START ⇒ COUNT++, FLOOD THE REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=7) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
An n × n matrix says which cities are directly connected. Count the provinces (connected groups).

## Key insight
The matrix is already an adjacency matrix: run one DFS/BFS per unvisited city and count the starts.

## Approach 1: DFS on the matrix
```java
// DFS straight on the adjacency matrix
public int findCircleNumDfs(int[][] isConnected) {
    int n = isConnected.length, count = 0;
    boolean[] visited = new boolean[n];
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            dfs(isConnected, i, visited);
        }
    }
    return count;
}

// Visits every city connected to u
private void dfs(int[][] g, int u, boolean[] visited) {
    visited[u] = true;
    for (int v = 0; v < g.length; v++) if (g[u][v] == 1 && !visited[v]) dfs(g, v, visited);
}
```

## Approach 2: BFS on the matrix
```java
// BFS straight on the adjacency matrix
public int findCircleNumBfs(int[][] isConnected) {
    int n = isConnected.length, count = 0;
    boolean[] visited = new boolean[n];
    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;
        count++;
        Queue<Integer> que = new ArrayDeque<>();
        que.add(i);
        visited[i] = true;
        while (!que.isEmpty()) {
            int u = que.poll();
            for (int v = 0; v < n; v++) {
                if (isConnected[u][v] == 1 && !visited[v]) {
                    visited[v] = true;
                    que.add(v);
                }
            }
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS on the matrix | O(n²) | O(n) |
| BFS on the matrix | O(n²) | O(n) |

## Recall before you reveal
<details><summary>Why O(n²)?</summary>

Scanning one row of the matrix costs n, and every city is expanded once.

</details>


<details><summary>Could you use Union-Find?</summary>

Yes: union i and j whenever the matrix has a 1.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
