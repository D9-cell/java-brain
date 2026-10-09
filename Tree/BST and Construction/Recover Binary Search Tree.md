---
topic: BST and Construction
pattern: [Inorder with previous key, Morris traversal]
source: LeetCode 99
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Recover Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> Two keys swapped places: in the sorted inorder list you see **one or two dips**.
> **Mantra: FIRST BIG AT DIP 1, LAST SMALL AT DIP 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=1) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Exactly two nodes of a BST were swapped by mistake. Fix the tree without changing its structure.

## Key insight
Inorder must be increasing. The first time `prev > cur`, `prev` is the first wrong node; the last time, `cur` is the second one. Swap their values. If the swapped nodes are neighbours there is only one dip.

## Approach 1: Inorder recursion
```java
// Inorder of a BST is sorted; two swapped nodes create one or two descents. Swap the first "big" with the last "small"
public void recoverTree(TreeNode root) {
    TreeNode[] x = new TreeNode[3];
    inorder(root, x);
    int t = x[0].val;
    x[0].val = x[1].val;
    x[1].val = t;
}

// x[0] = first wrong node, x[1] = second wrong node, x[2] = previous node in the walk
private void inorder(TreeNode n, TreeNode[] x) {
    if (n == null) return;
    inorder(n.left, x);
    if (x[2] != null && x[2].val > n.val) {
        if (x[0] == null) x[0] = x[2];
        x[1] = n;
    }
    x[2] = n;
    inorder(n.right, x);
}
```

## Approach 2: Morris, O(1) space
```java
// Same detection with Morris traversal, so the extra space is O(1)
public void recoverTreeMorris(TreeNode root) {
    TreeNode first = null, second = null, prev = null, cur = root;
    while (cur != null) {
        if (cur.left == null) {
            if (prev != null && prev.val > cur.val) { if (first == null) first = prev; second = cur; }
            prev = cur;
            cur = cur.right;
            continue;
        }
        TreeNode pre = cur.left;
        while (pre.right != null && pre.right != cur) pre = pre.right;
        if (pre.right == null) { pre.right = cur; cur = cur.left; }
        else {
            pre.right = null;
            if (prev != null && prev.val > cur.val) { if (first == null) first = prev; second = cur; }
            prev = cur;
            cur = cur.right;
        }
    }
    int t = first.val;
    first.val = second.val;
    second.val = t;
}
```

| Approach | Time | Space |
|---|---|---|
| Inorder recursion | O(n) | O(h) |
| Morris, O(1) space | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why the first node of the first dip but the second node of the last dip?</summary>

The big value moved right (first dip, left element) and the small value moved left (last dip, right element).

</details>


## Connected
- [Validate Binary Search Tree](Validate%20Binary%20Search%20Tree.md)
- [Morris Traversal](../Traversals%20and%20Views/Morris%20Traversal.md)
