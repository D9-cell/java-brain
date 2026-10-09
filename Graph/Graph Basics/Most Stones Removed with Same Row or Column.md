---
topic: Graph Basics
pattern: [Union-Find, DFS, Components]
source: LeetCode 947
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Most Stones Removed with Same Row or Column

> [!TIP]
> **🧠 Memory hook**
> Stones sharing a row or column are one family; a family can be removed down to its last stone.
> **Mantra: n − COMPONENTS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=30) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
You may remove a stone if another stone shares its row or column. How many stones can you remove?

## Key insight
Stones linked by a shared row or column form a component, and every component can be reduced to one stone. So the answer is n minus the number of components. Union-Find joins "row x" with "column y" for each stone.

## Approach 1: DFS over stones
```java
// DFS over stones that share a row or a column: each component leaves exactly one stone behind
public int removeStonesDfs(int[][] stones) {
    int n = stones.length, components = 0;
    boolean[] visited = new boolean[n];
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            components++;
            dfs(stones, i, visited);
        }
    }
    return n - components;
}

// Visits every stone sharing a row or column with stone u
private void dfs(int[][] stones, int u, boolean[] visited) {
    visited[u] = true;
    for (int v = 0; v < stones.length; v++) {
        if (!visited[v] && (stones[v][0] == stones[u][0] || stones[v][1] == stones[u][1])) dfs(stones, v, visited);
    }
}
```

## Approach 2: Union-Find on rows and columns
```java
// Union-Find where each stone unions its row with its column (columns are offset to avoid clashing)
public int removeStonesDsu(int[][] stones) {
    Map<Integer, Integer> parent = new HashMap<>();
    for (int[] s : stones) union(parent, s[0], s[1] + 100001);
    Set<Integer> roots = new HashSet<>();
    for (int key : new ArrayList<>(parent.keySet())) roots.add(find(parent, key));
    return stones.length - roots.size();
}

// Finds a key's root, creating the key on first sight
private int find(Map<Integer, Integer> parent, int x) {
    parent.putIfAbsent(x, x);
    if (parent.get(x) != x) parent.put(x, find(parent, parent.get(x)));
    return parent.get(x);
}

// Joins two keys
private void union(Map<Integer, Integer> parent, int a, int b) {
    parent.put(find(parent, a), find(parent, b));
}
```

| Approach | Time | Space |
|---|---|---|
| DFS over stones | O(n²) | O(n) |
| Union-Find on rows and columns | O(n · α(n)) | O(n) |

## Recall before you reveal
<details><summary>Why offset the column ids?</summary>

Row 5 and column 5 must be different nodes.

</details>


<details><summary>Why does one stone always remain?</summary>

The last stone of a component has no neighbour left to justify removing it.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
- [Number of Provinces](Number%20of%20Provinces.md)
