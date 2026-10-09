---
topic: BST and Construction
pattern: [Inorder relinking]
source: LeetCode 897
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Increasing Order Search Tree

> [!TIP]
> **🧠 Memory hook**
> Visit in sorted order and **stitch each node to the previous one**.
> **Mantra: INORDER, left = null, tail.right = node**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=4) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Rearrange the BST so the smallest node is the root, no node has a left child, and every node has one right child.

## Key insight
In an inorder walk keep a `tail` pointer. For each node clear `left`, set `tail.right = node` and move the tail.

## Approach 1: Relink in place
```java
// Inorder walk that relinks each node to the previous one's right pointer, clearing left pointers
public TreeNode increasingBST(TreeNode root) {
    TreeNode dummy = new TreeNode(0);
    TreeNode[] tail = {dummy};
    walk(root, tail);
    return dummy.right;
}

// Appends nodes in sorted order
private void walk(TreeNode n, TreeNode[] tail) {
    if (n == null) return;
    walk(n.left, tail);
    n.left = null;
    tail[0].right = n;
    tail[0] = n;
    walk(n.right, tail);
}
```

## Approach 2: Rebuild from values
```java
// Collect values first, then build a fresh right-only chain
public TreeNode increasingBSTRebuild(TreeNode root) {
    TreeNode dummy = new TreeNode(0), t = dummy;
    for (int v : TreeNode.inorder(root)) t = t.right = new TreeNode(v);
    return dummy.right;
}
```

| Approach | Time | Space |
|---|---|---|
| Relink in place | O(n) | O(h) |
| Rebuild from values | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why clear `left` after visiting the left subtree?</summary>

The left subtree has already been consumed; keeping the pointer would create a cycle or a wrong shape.

</details>


## Connected
- [Flatten Binary Tree to Linked List](../DFS%20and%20Recursion/Flatten%20Binary%20Tree%20to%20Linked%20List.md)
- [Balance a Binary Search Tree](Balance%20a%20Binary%20Search%20Tree.md)
