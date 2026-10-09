---
topic: Topological Sort
pattern: [Kahn, DFS]
source: LeetCode 210
difficulty: Medium
companies: [Accolite, Amazon, Flipkart, Microsoft, Moonfrog Labs, OYO Rooms]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Course Schedule II

> [!TIP]
> **🧠 Memory hook**
> Not just "can you finish" but "in which order": the order courses leave the queue is the study plan.
> **Mantra: REMOVAL ORDER = STUDY ORDER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=2) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Return a valid order of the courses, or an empty array if impossible.

## Key insight
Same as Course Schedule, but keep the removal order from Kahn (or reverse the DFS finish order). An empty array signals a cycle.

## Approach 1: Kahn's algorithm
```java
// Kahn's algorithm: the removal order is the study order
public int[] findOrderKahn(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indegree[p[0]]++; }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) que.add(i);
    int[] order = new int[numCourses];
    int count = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        order[count++] = u;
        for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
    }
    return count == numCourses ? order : new int[0];
}
```

## Approach 2: DFS finish order
```java
// DFS: a course is written after all courses that depend on it, so reverse the finish order
public int[] findOrderDfs(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) adj.get(p[1]).add(p[0]);
    int[] state = new int[numCourses];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < numCourses; i++) if (state[i] == 0 && !visit(adj, i, state, stack)) return new int[0];
    int[] order = new int[numCourses];
    for (int i = 0; i < numCourses; i++) order[i] = stack.pop();
    return order;
}

// Returns false on a cycle (state 1 = on the path, 2 = done)
private boolean visit(List<List<Integer>> adj, int u, int[] state, Deque<Integer> stack) {
    state[u] = 1;
    for (int v : adj.get(u)) {
        if (state[v] == 1) return false;
        if (state[v] == 0 && !visit(adj, v, state, stack)) return false;
    }
    state[u] = 2;
    stack.push(u);
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn's algorithm | O(V + E) | O(V + E) |
| DFS finish order | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>Why reverse the DFS finish order?</summary>

A course finishes after everything that depends on it, so the last finisher goes first.

</details>


<details><summary>Many valid answers?</summary>

Yes, any valid order is accepted.

</details>


## Connected
- [Course Schedule](Course%20Schedule.md)
