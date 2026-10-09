---
topic: DFS and Recursion
pattern: [Rebuild by returning a node, Reverse preorder]
source: LeetCode 114
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Flatten Binary Tree to Linked List

> [!TIP]
> **🧠 Memory hook**
> Chain the nodes in **preorder**, using only right pointers.
> **Mantra: RIGHT, LEFT, THEN LINK TO PREV**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=38) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Flatten the tree in place so it becomes a right-only chain in preorder.

## Key insight
Process right, then left, then the node, linking `node.right = prev`. The O(1) space version moves each right subtree under the rightmost node of the left subtree.

## Approach 1: Reverse preorder
```java
// Reverse preorder (right, left, node): each node links to the node visited just before it
public void flatten(TreeNode root) {
    reverse(root, new TreeNode[1]);
}

// Visits right, then left, then the node, and rewires it to the previously visited one
private void reverse(TreeNode n, TreeNode[] prev) {
    if (n == null) return;
    reverse(n.right, prev);
    reverse(n.left, prev);
    n.right = prev[0];
    n.left = null;
    prev[0] = n;
}
```

## Approach 2: Splice, O(1) space
```java
// O(1) space: for each node move its right subtree under the rightmost node of its left subtree
public void flattenMorris(TreeNode root) {
    for (TreeNode cur = root; cur != null; cur = cur.right) {
        if (cur.left == null) continue;
        TreeNode tail = cur.left;
        while (tail.right != null) tail = tail.right;
        tail.right = cur.right;
        cur.right = cur.left;
        cur.left = null;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse preorder | O(n) | O(h) |
| Splice, O(1) space | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why visit the right child first?</summary>

The previous node in this order is exactly the next node in preorder.

</details>


## Connected
- [Modify Tree for Preorder Using Only Right Pointers](Modify%20Tree%20for%20Preorder%20Using%20Only%20Right%20Pointers.md)
- [Morris Traversal](../Traversals%20and%20Views/Morris%20Traversal.md)
