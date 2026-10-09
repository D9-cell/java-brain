---
topic: Trees and Advanced Graphs
pattern: [DFS, BFS, In-degree]
source: LeetCode 3310
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Remove Methods From Project

> [!TIP]
> **🧠 Memory hook**
> Deleting a buggy method is safe only if no healthy method calls anything in the doomed group.
> **Mantra: MARK DOOMED GROUP, THEN CHECK EXTERNAL CALLERS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=18) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Method k is buggy; remove it and every method only it can reach. If any remaining method calls a removed one, remove nothing. Return the remaining methods.

## Key insight
Mark everything reachable from k as suspicious while lowering the in-degree of what they call (internal calls). A suspicious method that still has in-degree > 0 is called from outside the group, so nothing can be removed.

## Approach 1: BFS marking
```java
// BFS marks every method reachable from k as suspicious and lowers the in-degree counts of what they call
public List<Integer> remainingMethodsBfs(int n, int k, int[][] invocations) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[n];
    for (int[] e : invocations) { adj.get(e[0]).add(e[1]); indegree[e[1]]++; }
    boolean[] suspicious = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>(List.of(k));
    suspicious[k] = true;
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int v : adj.get(u)) {
            indegree[v]--;
            if (!suspicious[v]) { suspicious[v] = true; que.add(v); }
        }
    }
    return decide(n, indegree, suspicious);
}

// A suspicious method with a remaining in-degree is called from outside, so nothing can be removed
private List<Integer> decide(int n, int[] indegree, boolean[] suspicious) {
    List<Integer> keep = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        if (suspicious[i] && indegree[i] > 0) {
            List<Integer> all = new ArrayList<>();
            for (int j = 0; j < n; j++) all.add(j);
            return all;
        }
        if (!suspicious[i]) keep.add(i);
    }
    return keep;
}
```

## Approach 2: DFS marking
```java
// DFS marks the same set
public List<Integer> remainingMethodsDfs(int n, int k, int[][] invocations) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[n];
    for (int[] e : invocations) { adj.get(e[0]).add(e[1]); indegree[e[1]]++; }
    boolean[] suspicious = new boolean[n];
    mark(adj, k, indegree, suspicious);
    return decide(n, indegree, suspicious);
}

// Marks u and everything it can call, counting each internal call off the in-degree
private void mark(List<List<Integer>> adj, int u, int[] indegree, boolean[] suspicious) {
    suspicious[u] = true;
    for (int v : adj.get(u)) {
        indegree[v]--;
        if (!suspicious[v]) mark(adj, v, indegree, suspicious);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| BFS marking | O(V + E) | O(V + E) |
| DFS marking | O(V + E) | O(V + E) |

> [!WARNING]
> **Java gotcha**
> Build the "return all" list only when the conflict is detected; filling it while scanning returns a truncated list.

## Recall before you reveal
<details><summary>What does leftover in-degree mean?</summary>

An edge from a non-suspicious method into a suspicious one.

</details>


<details><summary>Why return everything in that case?</summary>

Removing would leave a dangling call.

</details>


## Connected
- [Minimum Number of Vertices to Reach All Nodes](../Graph%20Basics/Minimum%20Number%20of%20Vertices%20to%20Reach%20All%20Nodes.md)
