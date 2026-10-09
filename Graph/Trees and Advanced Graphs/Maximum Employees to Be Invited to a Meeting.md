---
topic: Trees and Advanced Graphs
pattern: [Functional graph, Kahn, Cycles]
source: LeetCode 2127
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Maximum Employees to Be Invited to a Meeting

> [!TIP]
> **🧠 Memory hook**
> Everyone points at their favourite; the table is a cycle, or a mutual pair with queues of fans behind each.
> **Mantra: MAX(LONGEST CYCLE, SUM OF 2-CYCLES + THEIR CHAINS)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=15) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Each employee has one favourite. At a round table each person must sit next to their favourite. Return the maximum number of employees that can be invited.

## Key insight
The graph i → favorite[i] has one cycle per component. A cycle of length ≥ 3 can be seated by itself. A 2-cycle (mutual favourites) can also seat the longest chain of fans in front of each person, and several 2-cycles combine. Peel the non-cycle nodes with Kahn while recording the longest incoming chain.

## Approach: Kahn peeling + cycle scan
```java
// Functional graph i -> favorite[i]: the answer is the longest cycle, or the sum over 2-cycles of both people plus their longest incoming chains
public int maximumInvitations(int[] favorite) {
    int n = favorite.length;
    int[] indegree = new int[n], chain = new int[n];
    for (int f : favorite) indegree[f]++;
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) que.add(i);
    boolean[] removed = new boolean[n];
    while (!que.isEmpty()) {
        int u = que.poll();
        removed[u] = true;
        int v = favorite[u];
        chain[v] = Math.max(chain[v], chain[u] + 1);
        if (--indegree[v] == 0) que.add(v);
    }
    int longestCycle = 0, pairs = 0;
    boolean[] seen = new boolean[n];
    for (int i = 0; i < n; i++) {
        if (removed[i] || seen[i]) continue;
        int len = 0, x = i;
        while (!seen[x]) { seen[x] = true; x = favorite[x]; len++; }
        if (len == 2) pairs += 2 + chain[i] + chain[favorite[i]];
        else longestCycle = Math.max(longestCycle, len);
    }
    return Math.max(longestCycle, pairs);
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn peeling + cycle scan | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why can 2-cycles be combined but long cycles cannot?</summary>

A long cycle fills the whole table; independent 2-cycles with their chains can sit at different spots.

</details>


<details><summary>What do the chains hold?</summary>

People who like someone in the pair, in a line.

</details>


## Connected
- [Find Closest Node to Given Two Nodes](Find%20Closest%20Node%20to%20Given%20Two%20Nodes.md)
- [Longest Cycle in a Graph](../Graph%20Basics/Longest%20Cycle%20in%20a%20Graph.md)
