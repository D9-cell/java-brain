---
topic: Topological Sort
pattern: [Kahn, Cycle check]
source: LeetCode 207
difficulty: Medium
companies: [Apple, Twitter, Meta, Accolite, Amazon, Flipkart, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Course Schedule

> [!TIP]
> **🧠 Memory hook**
> Can you finish every course, or are two courses each waiting for the other?
> **Mantra: ALL COURSES REMOVED ⇔ NO CYCLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=1) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Prerequisites [a, b] mean b before a. Can all courses be finished?

## Key insight
It is cycle detection in a directed graph. Kahn: if all courses can be removed in order, there is no cycle. A DFS with an on-path flag gives the same answer.

## Approach 1: Kahn's algorithm
```java
// Kahn's algorithm: if every course can be removed in order, there is no cycle
public boolean canFinishKahn(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indegree[p[0]]++; }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) que.add(i);
    int taken = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        taken++;
        for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
    }
    return taken == numCourses;
}
```

## Approach 2: DFS with path flags
```java
// DFS cycle check with an "on the current path" flag
public boolean canFinishDfs(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) adj.get(p[1]).add(p[0]);
    boolean[] visited = new boolean[numCourses], inPath = new boolean[numCourses];
    for (int i = 0; i < numCourses; i++) if (!visited[i] && hasCycle(adj, i, visited, inPath)) return false;
    return true;
}

// True when a cycle is reachable from u
private boolean hasCycle(List<List<Integer>> adj, int u, boolean[] visited, boolean[] inPath) {
    visited[u] = inPath[u] = true;
    for (int v : adj.get(u)) {
        if (!visited[v] && hasCycle(adj, v, visited, inPath)) return true;
        if (inPath[v]) return true;
    }
    inPath[u] = false;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn's algorithm | O(V + E) | O(V + E) |
| DFS with path flags | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>Why does a leftover course mean impossible?</summary>

It waits for something that waits (eventually) for it.

</details>


<details><summary>Edge direction?</summary>

b → a for the pair [a, b].

</details>


## Connected
- [Course Schedule II](Course%20Schedule%20II.md)
- [Detect Cycle in a Directed Graph](../Graph%20Basics/Detect%20Cycle%20in%20a%20Directed%20Graph.md)
