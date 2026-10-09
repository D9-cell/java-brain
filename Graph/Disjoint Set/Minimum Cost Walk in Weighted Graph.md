---
topic: Disjoint Set
pattern: [Union-Find with AND, Bit tricks]
source: LeetCode 3108
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Minimum Cost Walk in Weighted Graph

> [!TIP]
> **🧠 Memory hook**
> AND only clears bits, and you may reuse edges, so a walk can collect every edge of its component.
> **Mantra: ANSWER = AND OF ALL EDGES IN THE COMPONENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=8) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
The cost of a walk is the bitwise AND of its edge weights (edges may repeat). For each query (s, t) return the minimum cost, or −1.

## Key insight
A longer walk can only clear more bits, and a walk may traverse every edge of a component, so the minimum cost between two nodes of a component is the AND of all its edges. Union-Find keeps an AND value per component. s = t gives 0; different components give −1.

## Approach: Union-Find with AND per root
```java
// Walking an edge can only clear bits, and a walk may use every edge of the component: the best cost is the AND of the whole component
public int[] minimumCost(int n, int[][] edges, int[][] query) {
    int[] parent = new int[n], cost = new int[n];
    for (int i = 0; i < n; i++) { parent[i] = i; cost[i] = -1; }
    for (int[] e : edges) {
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a != b) {
            parent[b] = a;
            cost[a] &= cost[b];
        }
        cost[a] &= e[2];
    }
    int[] answer = new int[query.length];
    for (int i = 0; i < query.length; i++) {
        int s = query[i][0], t = query[i][1];
        if (s == t) answer[i] = 0;
        else if (find(parent, s) != find(parent, t)) answer[i] = -1;
        else answer[i] = cost[find(parent, s)];
    }
    return answer;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find with AND per root | O((n + E + Q) α) | O(n) |

## Recall before you reveal
<details><summary>Why can we reuse every edge?</summary>

Walk to the edge, cross it back and forth, return: the AND does not increase.

</details>


<details><summary>Why is s = t special?</summary>

The empty walk costs 0 by the problem statement.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
