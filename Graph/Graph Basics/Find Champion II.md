---
topic: Graph Basics
pattern: [In-degree, DAG]
source: LeetCode 2924
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find Champion II

> [!TIP]
> **🧠 Memory hook**
> A tournament ladder: the champion is the only team nobody has beaten.
> **Mantra: EXACTLY ONE INDEGREE-0 NODE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=12) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Edges mean u is stronger than v. Return the team that no one is stronger than, or −1 if it is not unique.

## Key insight
With a DAG of "beats" edges, a champion must reach everyone, so it has indegree 0. If two nodes have indegree 0 they are incomparable, so there is no champion.

## Approach: Indegree count
```java
// The champion is the only team nobody beats: exactly one node with indegree 0
public int findChampion(int n, int[][] edges) {
    int[] indegree = new int[n];
    for (int[] e : edges) indegree[e[1]]++;
    int champ = -1, count = 0;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) {
            champ = i;
            if (++count > 1) return -1;
        }
    }
    return champ;
}
```

| Approach | Time | Space |
|---|---|---|
| Indegree count | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why −1 for two unbeaten teams?</summary>

Neither is known to be stronger than the other.

</details>


<details><summary>Why not DFS?</summary>

Indegree answers it directly.

</details>


## Connected
- [Minimum Number of Vertices to Reach All Nodes](Minimum%20Number%20of%20Vertices%20to%20Reach%20All%20Nodes.md)
