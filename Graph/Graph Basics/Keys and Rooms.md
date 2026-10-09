---
topic: Graph Basics
pattern: [DFS, BFS, Reachability]
source: LeetCode 841
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Keys and Rooms

> [!TIP]
> **🧠 Memory hook**
> A treasure hunt: every room hides keys to other rooms; can you eventually open every door?
> **Mantra: START AT 0, FOLLOW KEYS, COUNT ROOMS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=5) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Room 0 is open; each room contains keys. Can you visit all rooms?

## Key insight
Rooms are nodes and keys are directed edges. The question is whether everything is reachable from node 0.

## Approach 1: DFS
```java
// DFS from room 0 following the keys found, then check every room was entered
public boolean canVisitAllRoomsDfs(List<List<Integer>> rooms) {
    boolean[] visited = new boolean[rooms.size()];
    dfs(rooms, 0, visited);
    for (boolean v : visited) if (!v) return false;
    return true;
}

// Recursive helper for canVisitAllRoomsDfs
private void dfs(List<List<Integer>> rooms, int u, boolean[] visited) {
    visited[u] = true;
    for (int key : rooms.get(u)) if (!visited[key]) dfs(rooms, key, visited);
}
```

## Approach 2: BFS
```java
// BFS version that counts rooms as they are entered
public boolean canVisitAllRoomsBfs(List<List<Integer>> rooms) {
    int n = rooms.size(), count = 1;
    boolean[] visited = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>();
    que.add(0);
    visited[0] = true;
    while (!que.isEmpty()) {
        for (int key : rooms.get(que.poll())) {
            if (!visited[key]) {
                visited[key] = true;
                count++;
                que.add(key);
            }
        }
    }
    return count == n;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(V + E) | O(V) |
| BFS | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Directed or undirected?</summary>

Directed: a key opens a room one way only.

</details>


<details><summary>What is the answer test?</summary>

Every room is visited.

</details>


## Connected
- [Find if Path Exists in Graph](Find%20if%20Path%20Exists%20in%20Graph.md)
