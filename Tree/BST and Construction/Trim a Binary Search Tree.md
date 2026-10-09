---
topic: BST and Construction
pattern: [Prune by ordering, Return a node]
source: LeetCode 669
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Trim a Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> Cut away keys outside `[low, high]`: a bad node is **replaced by one of its subtrees**.
> **Mantra: TOO SMALL → RETURN TRIM(RIGHT), TOO BIG → TRIM(LEFT)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=13) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Remove all keys outside `[low, high]` while keeping the relative structure of the rest.

## Key insight
If `node.val < low` the node and its left subtree vanish, so return the trimmed right subtree. Symmetrically for `> high`. Otherwise trim both children.

## Approach 1: Recursive
```java
// Too small: the answer lives in the right subtree; too large: in the left subtree; otherwise trim both children
public TreeNode trimBST(TreeNode root, int low, int high) {
    if (root == null) return null;
    if (root.val < low) return trimBST(root.right, low, high);
    if (root.val > high) return trimBST(root.left, low, high);
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
}
```

## Approach 2: Iterative
```java
// Iterative: find a root in range, then trim the left spine and the right spine separately
public TreeNode trimBSTIterative(TreeNode root, int low, int high) {
    while (root != null && (root.val < low || root.val > high)) root = root.val < low ? root.right : root.left;
    if (root == null) return null;
    for (TreeNode n = root; n != null; n = n.left) while (n.left != null && n.left.val < low) n.left = n.left.right;
    for (TreeNode n = root; n != null; n = n.right) while (n.right != null && n.right.val > high) n.right = n.right.left;
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Iterative | O(h) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What is the new root if the old root is out of range?</summary>

The first node on the walk down that lies inside the range.

</details>


## Connected
- [Range Sum of BST](Range%20Sum%20of%20BST.md)
- [Delete Nodes And Return Forest](../DFS%20and%20Recursion/Delete%20Nodes%20And%20Return%20Forest.md)
