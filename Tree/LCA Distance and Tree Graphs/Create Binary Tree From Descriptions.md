---
topic: LCA Distance and Tree Graphs
pattern: [Root of an edge list, Map of nodes]
source: LeetCode 2196
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Create Binary Tree From Descriptions

> [!TIP]
> **🧠 Memory hook**
> Edges in any order: make each node once and **wire them up**.
> **Mantra: MAP VALUE → NODE, ROOT IS NEVER A CHILD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=11) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Descriptions `[parent, child, isLeft]` define a binary tree. Build it and return the root.

## Key insight
Create each node the first time its value appears, set `left` or `right` from `isLeft`, and remember which values were children. The root is the parent that is not in that set.

## Approach 1: Children set
```java
// One node per value, wire children by the description, and the root is the value that is never a child
public TreeNode createBinaryTree(int[][] descriptions) {
    Map<Integer, TreeNode> nodes = new HashMap<>();
    Set<Integer> children = new HashSet<>();
    for (int[] d : descriptions) {
        TreeNode parent = nodes.computeIfAbsent(d[0], TreeNode::new), child = nodes.computeIfAbsent(d[1], TreeNode::new);
        if (d[2] == 1) parent.left = child; else parent.right = child;
        children.add(d[1]);
    }
    for (int[] d : descriptions) if (!children.contains(d[0])) return nodes.get(d[0]);
    return null;
}
```

## Approach 2: In-degree count
```java
// Root found by counting in-degree instead of a set of children
public TreeNode createBinaryTreeInDegree(int[][] descriptions) {
    Map<Integer, TreeNode> nodes = new HashMap<>();
    Map<Integer, Integer> indeg = new HashMap<>();
    for (int[] d : descriptions) {
        indeg.putIfAbsent(d[0], 0);
        indeg.merge(d[1], 1, Integer::sum);
        TreeNode p = nodes.computeIfAbsent(d[0], TreeNode::new), c = nodes.computeIfAbsent(d[1], TreeNode::new);
        if (d[2] == 1) p.left = c; else p.right = c;
    }
    for (Map.Entry<Integer, Integer> e : indeg.entrySet()) if (e.getValue() == 0) return nodes.get(e.getKey());
    return null;
}
```

| Approach | Time | Space |
|---|---|---|
| Children set | O(n) | O(n) |
| In-degree count | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `computeIfAbsent`?</summary>

The same value can appear in several descriptions and must map to one node.

</details>


## Connected
- [Find Root of N-Ary Tree](Find%20Root%20of%20N-Ary%20Tree.md)
- [Construct Binary Tree from Parent Array](Construct%20Binary%20Tree%20from%20Parent%20Array.md)
