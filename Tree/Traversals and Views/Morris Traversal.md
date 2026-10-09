---
topic: Traversals and Views
pattern: [Threaded tree, O(1) space traversal]
source: LeetCode 94
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Morris Traversal

> [!TIP]
> **🧠 Memory hook**
> Leave a **thread** (a bread crumb) from the rightmost node of the left subtree back to the current node.
> **Mantra: THREAD, VISIT, UNTHREAD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=10) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Inorder traversal using O(1) extra space and without changing the tree at the end.

## Key insight
The inorder predecessor of `cur` is the rightmost node of its left subtree. Point its null `right` to `cur`; the second time you see that thread you know the left side is done, so cut it and visit.

## Approach 1: Inorder
```java
// Inorder walk in O(1) extra space: thread the rightmost node of the left subtree back to the current node, then remove the thread
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    TreeNode cur = root;
    while (cur != null) {
        if (cur.left == null) {
            res.add(cur.val);
            cur = cur.right;
            continue;
        }
        TreeNode pre = cur.left;
        while (pre.right != null && pre.right != cur) pre = pre.right;
        if (pre.right == null) {
            pre.right = cur;
            cur = cur.left;
        } else {
            pre.right = null;
            res.add(cur.val);
            cur = cur.right;
        }
    }
    return res;
}
```

## Approach 2: Preorder
```java
// Morris preorder: same threading but the value is taken the first time we arrive
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    TreeNode cur = root;
    while (cur != null) {
        if (cur.left == null) {
            res.add(cur.val);
            cur = cur.right;
            continue;
        }
        TreeNode pre = cur.left;
        while (pre.right != null && pre.right != cur) pre = pre.right;
        if (pre.right == null) {
            res.add(cur.val);
            pre.right = cur;
            cur = cur.left;
        } else {
            pre.right = null;
            cur = cur.right;
        }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Inorder | O(n) | O(1) |
| Preorder | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Removing the thread is what restores the tree; skip it and the tree stays corrupted. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>How do you know a thread already exists?</summary>

`pre.right == cur`.

</details>


<details><summary>Difference between Morris inorder and preorder?</summary>

Inorder visits when the thread is removed, preorder visits when it is created.

</details>


## Connected
- [Binary Search Tree Iterator](../BST%20and%20Construction/Binary%20Search%20Tree%20Iterator.md)
- [Recover Binary Search Tree](../BST%20and%20Construction/Recover%20Binary%20Search%20Tree.md)
