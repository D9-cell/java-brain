---
topic: Topological Sort
pattern: [Two-level topological sort]
source: LeetCode 1203
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Sort Items by Groups Respecting Dependencies

> [!TIP]
> **🧠 Memory hook**
> Sort the teams first, then sort the people inside each team.
> **Mantra: TOPO THE GROUPS, TOPO THE ITEMS, GROUP BY GROUP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=11) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Items belong to groups (or none). Items of a group must be contiguous, and beforeItems[i] must come before item i. Return an order or an empty array.

## Key insight
Give each ungrouped item its own group. Build two graphs: item dependencies, and group dependencies (an edge between groups when an item depends on an item of another group). Topologically sort both; if either fails, return empty. Output the groups in group order and, inside each group, its items in item order.

## Approach: Two Kahn sorts
```java
// Two topological sorts: one over groups (dependencies between items in different groups), one over items inside each group
public int[] sortItems(int n, int m, int[] group, List<List<Integer>> beforeItems) {
    int[] g = group.clone();
    int groups = m;
    for (int i = 0; i < n; i++) if (g[i] == -1) g[i] = groups++;
    List<List<Integer>> itemAdj = new ArrayList<>(), groupAdj = new ArrayList<>();
    for (int i = 0; i < n; i++) itemAdj.add(new ArrayList<>());
    for (int i = 0; i < groups; i++) groupAdj.add(new ArrayList<>());
    int[] itemIn = new int[n], groupIn = new int[groups];
    for (int i = 0; i < n; i++) {
        for (int b : beforeItems.get(i)) {
            itemAdj.get(b).add(i);
            itemIn[i]++;
            if (g[b] != g[i]) { groupAdj.get(g[b]).add(g[i]); groupIn[g[i]]++; }
        }
    }
    List<Integer> itemOrder = topo(n, itemAdj, itemIn), groupOrder = topo(groups, groupAdj, groupIn);
    if (itemOrder.isEmpty() || groupOrder.isEmpty()) return new int[0];
    List<List<Integer>> byGroup = new ArrayList<>();
    for (int i = 0; i < groups; i++) byGroup.add(new ArrayList<>());
    for (int item : itemOrder) byGroup.get(g[item]).add(item);
    int[] result = new int[n];
    int k = 0;
    for (int grp : groupOrder) for (int item : byGroup.get(grp)) result[k++] = item;
    return result;
}

// Kahn's algorithm that returns an empty list on a cycle
private List<Integer> topo(int count, List<List<Integer>> adj, int[] indegree) {
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < count; i++) if (indegree[i] == 0) que.add(i);
    List<Integer> order = new ArrayList<>();
    while (!que.isEmpty()) {
        int u = que.poll();
        order.add(u);
        for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
    }
    return order.size() == count ? order : new ArrayList<>();
}
```

| Approach | Time | Space |
|---|---|---|
| Two Kahn sorts | O(n + edges) | O(n + edges) |

## Recall before you reveal
<details><summary>Why make ungrouped items singleton groups?</summary>

It lets every item live in the group graph.

</details>


<details><summary>Why is item order enough inside a group?</summary>

The item sort already respects all dependencies; restricting it to one group keeps the relative order.

</details>


## Connected
- [Course Schedule II](Course%20Schedule%20II.md)
- [Build a Matrix With Conditions](Build%20a%20Matrix%20With%20Conditions.md)
