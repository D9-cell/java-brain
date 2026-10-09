---
topic: BST and Construction
pattern: [Walk down remembering the last left turn]
source: LeetCode 285
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Inorder Successor in BST

> [!TIP]
> **🧠 Memory hook**
> The next larger key is either the **leftmost of the right subtree** or the nearest ancestor you passed while going left.
> **Mantra: GO LEFT → REMEMBER, GO RIGHT → FORGET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=2) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the node with the smallest key greater than `p.val`, or null.

## Key insight
Search for `p` from the root. Every time you go left the current node is a candidate; the last candidate before reaching `p` is the answer unless `p` has a right subtree.

## Approach 1: One loop
```java
// Walk down from the root; every time we go left the current node is a candidate successor
public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
    TreeNode succ = null;
    while (root != null) {
        if (p.val < root.val) { succ = root; root = root.left; }
        else root = root.right;
    }
    return succ;
}
```

## Approach 2: Two cases
```java
// Case split: with a right subtree take its leftmost node, otherwise the nearest ancestor that we reached by going left
public TreeNode inorderSuccessorCases(TreeNode root, TreeNode p) {
    if (p.right != null) {
        TreeNode n = p.right;
        while (n.left != null) n = n.left;
        return n;
    }
    TreeNode succ = null;
    for (TreeNode cur = root; cur != p; ) {
        if (p.val < cur.val) { succ = cur; cur = cur.left; } else cur = cur.right;
    }
    return succ;
}
```

| Approach | Time | Space |
|---|---|---|
| One loop | O(h) | O(1) |
| Two cases | O(h) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why does this also handle `p` with a right child?</summary>

Going right never updates the candidate, but we compare keys instead of stopping at p, so the leftmost node of the right subtree is reached as a left-turn candidate.

</details>


## Connected
- [Binary Search Tree Iterator](Binary%20Search%20Tree%20Iterator.md)
- [Find the Closest Element in BST](Find%20the%20Closest%20Element%20in%20BST.md)
