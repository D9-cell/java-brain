---
topic: LCA Distance and Tree Graphs
pattern: [Parent array, Create on demand]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Construct Binary Tree from Parent Array

> [!TIP]
> **🧠 Memory hook**
> Node `i` hangs under node `parent[i]`: **create the parent first** if it does not exist yet.
> **Mantra: NODE i UNDER parent[i], CREATE PARENTS FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=12) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Given `parent[i]` for each node (−1 for the root), build the binary tree.

## Key insight
Recursive creation makes sure the parent exists before attaching the child to its first free slot (left, then right). With all nodes pre-created a single loop is enough.

## Approach 1: Create on demand
```java
// parent[i] is the parent of node i (-1 for the root); create nodes on demand and attach to the first free child slot
public TreeNode createTree(int[] parent) {
    TreeNode[] made = new TreeNode[parent.length];
    TreeNode[] root = {null};
    for (int i = 0; i < parent.length; i++) create(i, parent, made, root);
    return root[0];
}

// Creates node i (and its ancestors first) and links it under its parent
private void create(int i, int[] parent, TreeNode[] made, TreeNode[] root) {
    if (made[i] != null) return;
    made[i] = new TreeNode(i);
    if (parent[i] == -1) { root[0] = made[i]; return; }
    create(parent[i], parent, made, root);
    TreeNode p = made[parent[i]];
    if (p.left == null) p.left = made[i]; else p.right = made[i];
}
```

## Approach 2: Pre-create, then link
```java
// Iterative: create all nodes first, then link in index order
public TreeNode createTreeIterative(int[] parent) {
    TreeNode[] made = new TreeNode[parent.length];
    for (int i = 0; i < parent.length; i++) made[i] = new TreeNode(i);
    TreeNode root = null;
    for (int i = 0; i < parent.length; i++) {
        if (parent[i] == -1) { root = made[i]; continue; }
        TreeNode p = made[parent[i]];
        if (p.left == null) p.left = made[i]; else p.right = made[i];
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Create on demand | O(n) | O(n) |
| Pre-create, then link | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why can the child come before its parent in the array?</summary>

The array is in node order, not level order.

</details>


## Connected
- [Create Binary Tree From Descriptions](Create%20Binary%20Tree%20From%20Descriptions.md)
