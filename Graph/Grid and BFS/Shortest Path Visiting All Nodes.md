---
topic: Grid and BFS
pattern: [State BFS, Bitmask]
source: LeetCode 847
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Shortest Path Visiting All Nodes

> [!TIP]
> **🧠 Memory hook**
> A delivery tour where you may pass a town twice: your position is the town plus the set of towns already seen.
> **Mantra: STATE = (NODE, MASK OF VISITED)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=21) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
In a connected undirected graph, find the shortest walk (nodes and edges may repeat, any start) that visits every node.

## Key insight
A node alone is not a state: you also need which nodes were already seen. BFS over (node, bitmask) from every node at once; the first state whose mask is full is the answer. n ≤ 12 makes 2ⁿ · n states fine.

## Approach: BFS over (node, mask)
```java
// BFS over states (node, set of visited nodes as a bitmask); every node is a possible start
public int shortestPathLength(int[][] graph) {
    int n = graph.length, full = (1 << n) - 1;
    if (n == 1) return 0;
    boolean[][] visited = new boolean[n][1 << n];
    Queue<int[]> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        que.add(new int[]{i, 1 << i});
        visited[i][1 << i] = true;
    }
    int steps = 0;
    while (!que.isEmpty()) {
        steps++;
        for (int size = que.size(); size > 0; size--) {
            int[] cur = que.poll();
            for (int next : graph[cur[0]]) {
                int mask = cur[1] | (1 << next);
                if (mask == full) return steps;
                if (!visited[next][mask]) {
                    visited[next][mask] = true;
                    que.add(new int[]{next, mask});
                }
            }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS over (node, mask) | O(2ⁿ · n · deg) | O(2ⁿ · n) |

## Recall before you reveal
<details><summary>Why seed all nodes?</summary>

The walk may start anywhere.

</details>


<details><summary>Why not DP over permutations?</summary>

The walk can revisit nodes, so shortest paths between nodes matter, which the BFS handles automatically.

</details>


## Connected
- [Shortest Path in a Grid with Obstacles Elimination](Shortest%20Path%20in%20a%20Grid%20with%20Obstacles%20Elimination.md)
