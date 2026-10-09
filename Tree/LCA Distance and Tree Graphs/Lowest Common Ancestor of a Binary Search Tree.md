---
topic: LCA Distance and Tree Graphs
pattern: [LCA with ordering, Walk down]
source: LeetCode 235
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Lowest Common Ancestor of a Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> In a BST the **values tell you which way to go**: stop at the node that splits p and q.
> **Mantra: BOTH SMALLER ← , BOTH BIGGER → , ELSE STOP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=1) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Find the lowest common ancestor of two nodes of a binary search tree.

## Key insight
If both values are smaller than the current node go left, if both are larger go right; otherwise the current node lies between them (or equals one) and is the LCA.

## Approach 1: Iterative walk
```java
// Walk down: both values smaller go left, both larger go right, otherwise this node splits them
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}
```

## Approach 2: Recursive
```java
// Recursive form of the same idea
public TreeNode lowestCommonAncestorRecursive(TreeNode root, TreeNode p, TreeNode q) {
    if (p.val < root.val && q.val < root.val) return lowestCommonAncestorRecursive(root.left, p, q);
    if (p.val > root.val && q.val > root.val) return lowestCommonAncestorRecursive(root.right, p, q);
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative walk | O(h) | O(1) |
| Recursive | O(h) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is no recursion into both children needed?</summary>

The ordering guarantees the answer lies on a single path.

</details>


## Connected
- [Lowest Common Ancestor of a Binary Tree](Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree.md)
