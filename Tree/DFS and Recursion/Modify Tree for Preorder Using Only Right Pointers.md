---
topic: DFS and Recursion
pattern: [Rebuild by returning a node, Reverse preorder]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Modify Tree for Preorder Using Only Right Pointers

> [!TIP]
> **🧠 Memory hook**
> Same task as Flatten, asked as a **flatten story**: let the recursion do the rest.
> **Mantra: FLATTEN CHILDREN, SPLICE LEFT IN THE MIDDLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=39) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Rewire the tree so that following only right pointers gives the preorder traversal, with every left pointer cleared.

## Key insight
Either link nodes in reverse preorder through a shared `next`, or flatten both children and splice the left chain between the node and its right chain.

## Approach 1: Reverse preorder with next
```java
// Reverse preorder with a shared "next" pointer: process right, left, then link the node to the node that follows it in preorder
public TreeNode modifyTree(TreeNode root) {
    dfs(root, new TreeNode[1]);
    return root;
}

// Links node.right to the next node in preorder and clears the left pointer
private void dfs(TreeNode n, TreeNode[] next) {
    if (n == null) return;
    dfs(n.right, next);
    dfs(n.left, next);
    n.right = next[0];
    n.left = null;
    next[0] = n;
}
```

## Approach 2: Post-order splice
```java
// Post-order splice: after flattening both children, put the flat left chain between the node and its flat right chain
public TreeNode modifyTreeSplice(TreeNode root) {
    if (root == null) return null;
    modifyTreeSplice(root.left);
    modifyTreeSplice(root.right);
    TreeNode oldRight = root.right;
    root.right = root.left;
    root.left = null;
    TreeNode t = root;
    while (t.right != null) t = t.right;
    t.right = oldRight;
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse preorder with next | O(n) | O(h) |
| Post-order splice | O(n · h) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is the splice version slower?</summary>

It walks to the end of the left chain at each node.

</details>


## Connected
- [Flatten Binary Tree to Linked List](Flatten%20Binary%20Tree%20to%20Linked%20List.md)
