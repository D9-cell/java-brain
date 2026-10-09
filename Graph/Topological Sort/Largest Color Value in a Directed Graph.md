---
topic: Topological Sort
pattern: [Kahn + DP, Cycle check]
source: LeetCode 1857
difficulty: Hard
companies: [Meta]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Largest Color Value in a Directed Graph

> [!TIP]
> **🧠 Memory hook**
> Walk the DAG in dependency order carrying a tally of colours: each node keeps the best tally over all paths ending there.
> **Mantra: count[v][c] = max over parents; ADD OWN COLOUR WHEN PROCESSED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=7) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Each node has a colour. Return the largest number of same-coloured nodes on any path, or −1 if the graph has a cycle.

## Key insight
In topological order, every parent is processed before its child, so count[v][c] can be filled as the maximum over incoming paths. A node adds its own colour when it is processed. If Kahn removes fewer than n nodes there is a cycle: −1.

## Approach 1: Kahn with per-node colour counts
```java
// Kahn's algorithm carrying, for every node, how many nodes of each colour the best path into it has seen
public int largestPathValue(String colors, int[][] edges) {
    int n = colors.length();
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[n];
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); indegree[e[1]]++; }
    int[][] count = new int[n][26];
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) que.add(i);
    int visited = 0, best = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        visited++;
        count[u][colors.charAt(u) - 'a']++;
        for (int c = 0; c < 26; c++) best = Math.max(best, count[u][c]);
        for (int v : adj.get(u)) {
            for (int c = 0; c < 26; c++) count[v][c] = Math.max(count[v][c], count[u][c]);
            if (--indegree[v] == 0) que.add(v);
        }
    }
    return visited == n ? best : -1;
}
```

## Approach 2: DFS with memo
```java
// DFS with memoisation over (node, colour): the best count of that colour on a path starting at the node
public int largestPathValueDfs(String colors, int[][] edges) {
    int n = colors.length();
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) adj.get(e[0]).add(e[1]);
    int[] state = new int[n];
    int[][] memo = new int[n][26];
    int best = 0;
    for (int i = 0; i < n; i++) {
        if (state[i] == 0 && !dfs(adj, i, colors, state, memo)) return -1;
        for (int c = 0; c < 26; c++) best = Math.max(best, memo[i][c]);
    }
    return best;
}

// Fills memo[u] and reports false on a cycle
private boolean dfs(List<List<Integer>> adj, int u, String colors, int[] state, int[][] memo) {
    state[u] = 1;
    for (int v : adj.get(u)) {
        if (state[v] == 1) return false;
        if (state[v] == 0 && !dfs(adj, v, colors, state, memo)) return false;
        for (int c = 0; c < 26; c++) memo[u][c] = Math.max(memo[u][c], memo[v][c]);
    }
    memo[u][colors.charAt(u) - 'a']++;
    state[u] = 2;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn with per-node colour counts | O(26 · (V + E)) | O(26 · V) |
| DFS with memo | O(26 · (V + E)) | O(26 · V) |

## Recall before you reveal
<details><summary>Why not enumerate paths?</summary>

There can be exponentially many; the DP shares work.

</details>


<details><summary>Why does Kahn also give the cycle test?</summary>

Nodes on a cycle are never processed.

</details>


## Connected
- [Parallel Courses III](Parallel%20Courses%20III.md)
- [Detect Cycle in a Directed Graph](../Graph%20Basics/Detect%20Cycle%20in%20a%20Directed%20Graph.md)
