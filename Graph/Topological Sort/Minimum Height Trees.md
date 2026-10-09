---
topic: Topological Sort
pattern: [Leaf peeling, Tree centre]
source: LeetCode 310
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Minimum Height Trees

> [!TIP]
> **🧠 Memory hook**
> Peel the tree like an onion: the last one or two nodes in the middle are the best roots.
> **Mantra: REMOVE ALL LEAVES UNTIL ≤ 2 NODES REMAIN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=8) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Among all rootings of an undirected tree, return the roots that give the minimum height.

## Key insight
The best roots are the centres of the tree (the middle of its longest path), and there are one or two. Remove all leaves layer by layer until at most two nodes remain: this is Kahn applied to degrees instead of in-degrees.

## Approach: Peel leaves
```java
// Peel leaves layer by layer, like Kahn on degrees; the last one or two nodes left are the centres
public List<Integer> findMinHeightTrees(int n, int[][] edges) {
    if (n == 1) return List.of(0);
    List<Set<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new HashSet<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    List<Integer> leaves = new ArrayList<>();
    for (int i = 0; i < n; i++) if (adj.get(i).size() == 1) leaves.add(i);
    int remaining = n;
    while (remaining > 2) {
        remaining -= leaves.size();
        List<Integer> next = new ArrayList<>();
        for (int leaf : leaves) {
            int neighbour = adj.get(leaf).iterator().next();
            adj.get(neighbour).remove(leaf);
            if (adj.get(neighbour).size() == 1) next.add(neighbour);
        }
        leaves = next;
    }
    return leaves;
}
```

| Approach | Time | Space |
|---|---|---|
| Peel leaves | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why at most two answers?</summary>

A longest path has either one middle node or two.

</details>


<details><summary>Why stop at 2 nodes?</summary>

Peeling further would remove the answer.

</details>


## Connected
- [Tree Diameter](../Trees%20and%20Advanced%20Graphs/Tree%20Diameter.md)
