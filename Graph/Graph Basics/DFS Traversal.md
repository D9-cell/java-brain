---
topic: Graph Basics
pattern: [DFS]
source: GfG
difficulty: Easy
companies: [Amazon, Samsung, Accolite, Intuit]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# DFS Traversal

> [!TIP]
> **🧠 Memory hook**
> A rat in a maze: dive until a dead end, back up, take the next unexplored turn.
> **Mantra: MARK, RECORD, RECURSE ON UNVISITED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=1) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Print the nodes of a directed graph in DFS order, both recursively and with an explicit stack.

## Key insight
Iterative DFS only matches the recursive order if neighbours are pushed in **reverse**; pushing them forward is still a valid DFS but visits a different order.

## Approach 1: Recursive
```java
// Recursive DFS: go as deep as possible before backing up
public List<Integer> dfsRecursive(List<List<Integer>> adj, int start) {
    List<Integer> order = new ArrayList<>();
    dfs(adj, start, new boolean[adj.size()], order);
    return order;
}

// Recursive helper that marks and records a node, then visits its unvisited neighbours
private void dfs(List<List<Integer>> adj, int u, boolean[] visited, List<Integer> order) {
    visited[u] = true;
    order.add(u);
    for (int v : adj.get(u)) {
        if (!visited[v]) dfs(adj, v, visited, order);
    }
}
```

## Approach 2: Iterative with a stack (reverse push)
```java
// Iterative DFS with an explicit stack; neighbours are pushed in reverse so the order matches the recursive one
public List<Integer> dfsIterative(List<List<Integer>> adj, int start) {
    List<Integer> order = new ArrayList<>();
    boolean[] visited = new boolean[adj.size()];
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int curr = stack.pop();
        if (visited[curr]) continue;
        visited[curr] = true;
        order.add(curr);
        List<Integer> next = adj.get(curr);
        for (int i = next.size() - 1; i >= 0; i--) {
            if (!visited[next.get(i)]) stack.push(next.get(i));
        }
    }
    return order;
}
```

## Approach 3: Iterative as in the C++ original (forward push)
Visits 2 → 3 → 0 → 1 on the sample, while recursion visits 2 → 0 → 1 → 3.

```java
// Iterative DFS exactly as the C++ original pushes neighbours (a valid DFS, but a different order)
public List<Integer> dfsIterativeForward(List<List<Integer>> adj, int start) {
    List<Integer> order = new ArrayList<>();
    boolean[] visited = new boolean[adj.size()];
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int curr = stack.pop();
        if (visited[curr]) continue;
        visited[curr] = true;
        order.add(curr);
        for (int v : adj.get(curr)) {
            if (!visited[v]) stack.push(v);
        }
    }
    return order;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(V + E) | O(V) |
| Iterative with a stack (reverse push) | O(V + E) | O(V) |
| Iterative as in the C++ original (forward push) | O(V + E) | O(V) |

> [!WARNING]
> **Java gotcha**
> The C++ original pushes neighbours forward, so its "iterative" order differs from its recursive order.

## Recall before you reveal
<details><summary>Why push neighbours in reverse?</summary>

The stack pops the last pushed first, so reversing makes the first neighbour come out first.

</details>


<details><summary>When does recursion break?</summary>

On a 1e5-long chain the Java call stack overflows; use the iterative form.

</details>


## Connected
- [BFS Traversal](BFS%20Traversal.md)
- [Keys and Rooms](Keys%20and%20Rooms.md)
