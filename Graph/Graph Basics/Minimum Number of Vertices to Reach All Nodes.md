---
topic: Graph Basics
pattern: [In-degree]
source: LeetCode 1557
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Minimum Number of Vertices to Reach All Nodes

> [!TIP]
> **🧠 Memory hook**
> In a river system the springs are the places no water flows into.
> **Mantra: INDEGREE 0 ⇒ MUST START THERE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=11) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
In a DAG, find the smallest set of vertices from which all nodes are reachable.

## Key insight
A node with no incoming edge can only be reached by starting at it, so it must be in the set. And in a DAG, those nodes reach everything else, so nothing more is needed.

## Approach: Mark nodes with incoming edges
```java
// Nodes with no incoming edge can only be reached by starting there, and they reach everything else
public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
    boolean[] hasIncoming = new boolean[n];
    for (List<Integer> e : edges) hasIncoming[e.get(1)] = true;
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < n; i++) if (!hasIncoming[i]) result.add(i);
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Mark nodes with incoming edges | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why does it fail with cycles?</summary>

A cycle with no outside edge would have no indegree-0 node but still needs a start.

</details>


<details><summary>Is the answer unique?</summary>

Yes for a DAG.

</details>


## Connected
- [Find Champion II](Find%20Champion%20II.md)
- [Find Eventual Safe States](Find%20Eventual%20Safe%20States.md)
