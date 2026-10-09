---
topic: Topological Sort
pattern: [Reachability, Kahn, Floyd-Warshall]
source: LeetCode 1462
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Course Schedule IV

> [!TIP]
> **🧠 Memory hook**
> Is course A a hidden ancestor of course B? Let every course inherit the prerequisites of its parents.
> **Mantra: CHILD INHERITS PARENT + PARENT'S PREREQUISITES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=3) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Answer queries "is u a prerequisite (direct or indirect) of v?" for a prerequisite DAG.

## Key insight
The question is reachability. Precompute it once: DFS from every node, Floyd-Warshall on a boolean matrix, or Kahn where each course absorbs its parent and the parent's prerequisite set. Queries are then lookups.

## Approach 1: DFS from every node
```java
// DFS from every course once, recording everything reachable; each query becomes a table lookup
public List<Boolean> checkIfPrerequisiteDfs(int numCourses, int[][] prerequisites, int[][] queries) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) adj.get(p[0]).add(p[1]);
    boolean[][] reach = new boolean[numCourses][numCourses];
    for (int i = 0; i < numCourses; i++) mark(adj, i, reach[i]);
    List<Boolean> result = new ArrayList<>();
    for (int[] q : queries) result.add(reach[q[0]][q[1]]);
    return result;
}

// Marks everything reachable from u in row
private void mark(List<List<Integer>> adj, int u, boolean[] row) {
    for (int v : adj.get(u)) if (!row[v]) { row[v] = true; mark(adj, v, row); }
}
```

## Approach 2: Floyd-Warshall closure
```java
// Floyd-Warshall transitive closure
public List<Boolean> checkIfPrerequisiteFloyd(int numCourses, int[][] prerequisites, int[][] queries) {
    boolean[][] reach = new boolean[numCourses][numCourses];
    for (int[] p : prerequisites) reach[p[0]][p[1]] = true;
    for (int k = 0; k < numCourses; k++) for (int i = 0; i < numCourses; i++) for (int j = 0; j < numCourses; j++) reach[i][j] |= reach[i][k] && reach[k][j];
    List<Boolean> result = new ArrayList<>();
    for (int[] q : queries) result.add(reach[q[0]][q[1]]);
    return result;
}
```

## Approach 3: Kahn with inherited sets
```java
// Kahn's algorithm that hands each course's full prerequisite set to its children
public List<Boolean> checkIfPrerequisiteKahn(int numCourses, int[][] prerequisites, int[][] queries) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] p : prerequisites) { adj.get(p[0]).add(p[1]); indegree[p[1]]++; }
    List<Set<Integer>> before = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) before.add(new HashSet<>());
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) que.add(i);
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int v : adj.get(u)) {
            before.get(v).add(u);
            before.get(v).addAll(before.get(u));
            if (--indegree[v] == 0) que.add(v);
        }
    }
    List<Boolean> result = new ArrayList<>();
    for (int[] q : queries) result.add(before.get(q[1]).contains(q[0]));
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS from every node | O(n · (n + E)) | O(n²) |
| Floyd-Warshall closure | O(n³) | O(n²) |
| Kahn with inherited sets | O(n · (n + E)) | O(n²) |

## Recall before you reveal
<details><summary>Which is simplest for n ≤ 100?</summary>

Floyd-Warshall on booleans.

</details>


<details><summary>Why topological order helps?</summary>

A parent's set is final before it is passed to children.

</details>


## Connected
- [Course Schedule II](Course%20Schedule%20II.md)
- [All Ancestors of a Node in a Directed Acyclic Graph](../Graph%20Basics/All%20Ancestors%20of%20a%20Node%20in%20a%20Directed%20Acyclic%20Graph.md)
