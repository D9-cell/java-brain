---
topic: Graph Basics
pattern: [BFS]
source: GfG
difficulty: Easy
companies: [Samsung, Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# BFS Traversal

> [!TIP]
> **🧠 Memory hook**
> A ripple on a pond: the stone is the start, each ring is one more edge away.
> **Mantra: MARK WHEN QUEUED, VISIT WHEN POLLED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=0) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Print the nodes of a directed graph in BFS order from a start node.

## Key insight
Marking a node visited when you **queue** it (not when you poll it) guarantees each node enters the queue once, so the work is O(V + E).

## Approach 1: Queue BFS
```java
// Level-by-level order; a node is marked visited the moment it is queued
public List<Integer> bfs(List<List<Integer>> adj, int start) {
    List<Integer> order = new ArrayList<>();
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> que = new ArrayDeque<>();
    que.add(start);
    visited[start] = true;
    while (!que.isEmpty()) {
        int curr = que.poll();
        order.add(curr);
        for (int next : adj.get(curr)) {
            if (!visited[next]) {
                visited[next] = true;
                que.add(next);
            }
        }
    }
    return order;
}
```

## Approach 2: BFS with distances
`dist[]` doubles as the visited array: −1 means unseen.

```java
// BFS that also returns the number of edges from the start to each node (-1 if unreachable)
public int[] bfsDistance(List<List<Integer>> adj, int start) {
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Queue<Integer> que = new ArrayDeque<>();
    que.add(start);
    dist[start] = 0;
    while (!que.isEmpty()) {
        int curr = que.poll();
        for (int next : adj.get(curr)) {
            if (dist[next] == -1) {
                dist[next] = dist[curr] + 1;
                que.add(next);
            }
        }
    }
    return dist;
}
```

| Approach | Time | Space |
|---|---|---|
| Queue BFS | O(V + E) | O(V) |
| BFS with distances | O(V + E) | O(V) |

> [!WARNING]
> **Java gotcha**
> Use `ArrayDeque`, not `java.util.Stack` or `LinkedList`, for the queue.

## Recall before you reveal
<details><summary>When do you mark visited?</summary>

When the node is added to the queue, otherwise it can be queued many times.

</details>


<details><summary>What does BFS give for free?</summary>

The fewest edges from the start to every reachable node.

</details>


## Connected
- [Find if Path Exists in Graph](Find%20if%20Path%20Exists%20in%20Graph.md)
- [Is Graph Bipartite](Is%20Graph%20Bipartite.md)
