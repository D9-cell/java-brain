---
topic: Graph Basics
pattern: [Degree trick]
source: LeetCode 1791
difficulty: Easy
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find Center of Star Graph

> [!TIP]
> **🧠 Memory hook**
> The hub of a wheel appears in every spoke.
> **Mantra: SHARED ENDPOINT OF ANY TWO EDGES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=13) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
An n-node star has one centre joined to every other node. Given its edges, find the centre.

## Key insight
The centre is in every edge, so it is the endpoint shared by the first two edges. No counting is required.

## Approach 1: Degree map
```java
// Counts degrees; the centre touches every edge
public int findCenterDegrees(int[][] edges) {
    Map<Integer, Integer> degree = new HashMap<>();
    for (int[] e : edges) {
        degree.merge(e[0], 1, Integer::sum);
        degree.merge(e[1], 1, Integer::sum);
    }
    for (Map.Entry<Integer, Integer> en : degree.entrySet()) if (en.getValue() == edges.length) return en.getKey();
    return -1;
}
```

## Approach 2: First two edges
```java
// Any two edges already share the centre, so compare just the first two
public int findCenter(int[][] edges) {
    return edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1] ? edges[0][0] : edges[0][1];
}
```

| Approach | Time | Space |
|---|---|---|
| Degree map | O(n) | O(n) |
| First two edges | O(1) | O(1) |

## Recall before you reveal
<details><summary>Why do two edges suffice?</summary>

Both contain the centre, and they share only the centre.

</details>


<details><summary>Complexity?</summary>

O(1).

</details>


## Connected
- [Maximal Network Rank](Maximal%20Network%20Rank.md)
