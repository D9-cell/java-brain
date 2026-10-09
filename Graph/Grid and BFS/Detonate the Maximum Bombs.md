---
topic: Grid and BFS
pattern: [Directed graph, DFS, BFS]
source: LeetCode 2101
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Detonate the Maximum Bombs

> [!TIP]
> **🧠 Memory hook**
> A chain of firecrackers: a big one reaches a small one, but the small one may not reach back.
> **Mantra: EDGE i → j IF j IS INSIDE i'S CIRCLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=25) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Each bomb has a position and radius. Detonating one triggers all bombs in its range, recursively. Return the maximum bombs set off by detonating a single bomb.

## Key insight
Build a directed graph with an edge i → j when j lies within bomb i's radius (compare squared distances in `long`). Then the answer is the largest reachable set over all start bombs: a DFS or BFS from each node.

## Approach 1: DFS from each bomb
```java
// Build the directed "can trigger" graph, then DFS from every bomb and keep the biggest chain reaction
public int maximumDetonationDfs(int[][] bombs) {
    List<List<Integer>> adj = build(bombs);
    int best = 0;
    for (int i = 0; i < bombs.length; i++) best = Math.max(best, dfs(adj, i, new boolean[bombs.length]));
    return best;
}

// Counts the bombs set off starting from u
private int dfs(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    int count = 1;
    for (int v : adj.get(u)) if (!visited[v]) count += dfs(adj, v, visited);
    return count;
}

// Edge i -> j when the squared distance fits in i's squared radius (long, since coordinates reach 1e5)
private List<List<Integer>> build(int[][] b) {
    int n = b.length;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            long dx = b[i][0] - b[j][0], dy = b[i][1] - b[j][1], r = b[i][2];
            if (i != j && dx * dx + dy * dy <= r * r) adj.get(i).add(j);
        }
    }
    return adj;
}
```

## Approach 2: BFS from each bomb
```java
// Same graph, BFS from each bomb
public int maximumDetonationBfs(int[][] bombs) {
    List<List<Integer>> adj = build(bombs);
    int best = 0;
    for (int s = 0; s < bombs.length; s++) {
        boolean[] visited = new boolean[bombs.length];
        Queue<Integer> que = new ArrayDeque<>(List.of(s));
        visited[s] = true;
        int count = 0;
        while (!que.isEmpty()) {
            int u = que.poll();
            count++;
            for (int v : adj.get(u)) if (!visited[v]) { visited[v] = true; que.add(v); }
        }
        best = Math.max(best, count);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS from each bomb | O(n³) | O(n²) |
| BFS from each bomb | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Compare `dx*dx + dy*dy <= r*r` using `long`; with `int` it overflows.

## Recall before you reveal
<details><summary>Why directed?</summary>

A large bomb can reach a small one without the reverse.

</details>


<details><summary>Why long?</summary>

Squared distances reach 2·10¹⁰.

</details>


## Connected
- [Keys and Rooms](../Graph%20Basics/Keys%20and%20Rooms.md)
