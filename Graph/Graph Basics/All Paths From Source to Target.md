---
topic: Graph Basics
pattern: [DFS backtracking, DAG]
source: LeetCode 797
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# All Paths From Source to Target

> [!TIP]
> **🧠 Memory hook**
> Retracing every hiking trail from camp to summit: step, recurse, step back.
> **Mantra: ADD, RECURSE, REMOVE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=9) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
In a DAG of n nodes, list every path from node 0 to node n − 1.

## Key insight
A DAG has no cycles, so no visited array is needed: backtracking (add, recurse, remove) visits each path exactly once.

## Approach 1: DFS backtracking
```java
// DFS with backtracking: push a node, recurse, pop it
public List<List<Integer>> allPathsDfs(int[][] graph) {
    List<List<Integer>> result = new ArrayList<>();
    List<Integer> path = new ArrayList<>(List.of(0));
    dfs(graph, 0, path, result);
    return result;
}

// Records the path on reaching the last node, otherwise tries every outgoing edge
private void dfs(int[][] graph, int u, List<Integer> path, List<List<Integer>> result) {
    if (u == graph.length - 1) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int v : graph[u]) {
        path.add(v);
        dfs(graph, v, path, result);
        path.remove(path.size() - 1);
    }
}
```

## Approach 2: BFS over partial paths
```java
// BFS over partial paths: each queue entry is a whole path so far
public List<List<Integer>> allPathsBfs(int[][] graph) {
    List<List<Integer>> result = new ArrayList<>();
    Queue<List<Integer>> que = new ArrayDeque<>();
    que.add(List.of(0));
    while (!que.isEmpty()) {
        List<Integer> path = que.poll();
        int last = path.get(path.size() - 1);
        if (last == graph.length - 1) {
            result.add(path);
            continue;
        }
        for (int v : graph[last]) {
            List<Integer> next = new ArrayList<>(path);
            next.add(v);
            que.add(next);
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS backtracking | O(2^n · n) | O(n) |
| BFS over partial paths | O(2^n · n) | O(2^n · n) |

## Recall before you reveal
<details><summary>Why no visited array?</summary>

Acyclic: you can never loop, and the same node may legitimately appear on different paths.

</details>


<details><summary>Worst case?</summary>

A graph where every node points to all later nodes: 2^(n−2) paths.

</details>


## Connected
- [All Paths from Source Lead to Destination](All%20Paths%20from%20Source%20Lead%20to%20Destination.md)
