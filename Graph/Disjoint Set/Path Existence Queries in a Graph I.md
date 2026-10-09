---
topic: Disjoint Set
pattern: [Components, Sorted array]
source: LeetCode 3532
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Path Existence Queries in a Graph I

> [!TIP]
> **🧠 Memory hook**
> On a sorted line only big gaps break the chain.
> **Mantra: NEW COMPONENT WHEN nums[i] − nums[i − 1] > maxDiff**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=17) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Nodes with values nums (sorted); nodes i, j are connected when |nums[i] − nums[j]| ≤ maxDiff. Answer queries about whether a path exists.

## Key insight
Because the array is sorted, i and j are connected exactly when every consecutive gap between them is ≤ maxDiff. Label positions with a running component id (increment at a big gap); a query compares two ids in O(1). DFS per query or per component is correct but slower.

## Approach 1: Component ids by scanning gaps
```java
// Because nums is sorted, a gap larger than maxDiff between neighbours cuts the line; label every position with its piece
public boolean[] pathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {
    int[] component = new int[n];
    for (int i = 1; i < n; i++) component[i] = component[i - 1] + (nums[i] - nums[i - 1] > maxDiff ? 1 : 0);
    boolean[] answer = new boolean[queries.length];
    for (int q = 0; q < queries.length; q++) answer[q] = component[queries[q][0]] == component[queries[q][1]];
    return answer;
}
```

## Approach 2: DFS components
```java
// Generic version: DFS once over the neighbour graph and label components
public boolean[] pathExistenceQueriesDfs(int n, int[] nums, int maxDiff, int[][] queries) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int i = 0; i + 1 < n; i++) if (nums[i + 1] - nums[i] <= maxDiff) { adj.get(i).add(i + 1); adj.get(i + 1).add(i); }
    int[] comp = new int[n];
    Arrays.fill(comp, -1);
    int id = 0;
    for (int i = 0; i < n; i++) if (comp[i] == -1) label(adj, i, id++, comp);
    boolean[] answer = new boolean[queries.length];
    for (int q = 0; q < queries.length; q++) answer[q] = comp[queries[q][0]] == comp[queries[q][1]];
    return answer;
}

// Labels one component
private void label(List<List<Integer>> adj, int u, int id, int[] comp) {
    comp[u] = id;
    for (int v : adj.get(u)) if (comp[v] == -1) label(adj, v, id, comp);
}
```

| Approach | Time | Space |
|---|---|---|
| Component ids by scanning gaps | O(n + q) | O(n) |
| DFS components | O(n + q) | O(n) |

## Recall before you reveal
<details><summary>Why does sortedness help?</summary>

Connectivity depends only on consecutive gaps.

</details>


<details><summary>Why is per-query DFS too slow?</summary>

q × (n + e) can reach 10¹⁰.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
