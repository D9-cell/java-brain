---
topic: Trees and Advanced Graphs
pattern: [Tree DFS]
source: LeetCode 1443
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Minimum Time to Collect All Apples in a Tree

> [!TIP]
> **🧠 Memory hook**
> Only walk down a branch that has fruit, and pay for the road twice: there and back.
> **Mantra: EDGE COSTS 2 IF ITS SUBTREE HAS AN APPLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=6) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Starting at 0, collect all apples in a tree and return to 0. Each edge takes one second. Return the minimum time.

## Key insight
An edge into a child subtree must be walked twice exactly when that subtree contains an apple. So DFS returns the time below a node, and a child contributes `child + 2` if it has an apple somewhere below.

## Approach: DFS
```java
// DFS: an edge into a subtree is walked twice (down and back) only if that subtree has an apple
public int minTime(int n, int[][] edges, List<Boolean> hasApple) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    return dfs(adj, 0, -1, hasApple);
}

// Returns the time to collect every apple under u and come back to u's parent edge (0 if there is none)
private int dfs(List<List<Integer>> adj, int u, int parent, List<Boolean> hasApple) {
    int time = 0;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        int child = dfs(adj, v, u, hasApple);
        if (child > 0 || hasApple.get(v)) time += child + 2;
    }
    return time;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why times 2?</summary>

You must come back to the parent.

</details>


<details><summary>How do you know a child needs a visit?</summary>

It has an apple itself or its subtree time is non-zero.

</details>


## Connected
- [Maximum Number of K-Divisible Components](Maximum%20Number%20of%20K-Divisible%20Components.md)
