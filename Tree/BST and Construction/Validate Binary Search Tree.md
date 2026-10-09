---
topic: BST and Construction
pattern: [Bounds, Inorder strictly increasing]
source: LeetCode 98
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Validate Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> Every node lives inside a **window** inherited from all its ancestors, not only its parent.
> **Mantra: WINDOW (lo, hi) SHRINKS GOING DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=0) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return true if the tree is a valid BST: left keys smaller, right keys larger, for the whole subtree.

## Key insight
Pass `(lo, hi)` down: the left child gets `(lo, node)`, the right child `(node, hi)`. Equivalent check: the inorder sequence is strictly increasing.

## Approach 1: Bounds
```java
// Every node must lie strictly between the bounds inherited from its ancestors
public boolean isValidBST(TreeNode root) { return check(root, Long.MIN_VALUE, Long.MAX_VALUE); }

// Bounds shrink as we go down: left child < node, right child > node
private boolean check(TreeNode n, long lo, long hi) {
    if (n == null) return true;
    if (n.val <= lo || n.val >= hi) return false;
    return check(n.left, lo, n.val) && check(n.right, n.val, hi);
}
```

## Approach 2: Inorder with previous key
```java
// Inorder traversal must be strictly increasing; an explicit stack avoids deep recursion
public boolean isValidBSTInorder(TreeNode root) {
    Deque<TreeNode> st = new ArrayDeque<>();
    long prev = Long.MIN_VALUE;
    for (TreeNode cur = root; cur != null || !st.isEmpty(); ) {
        while (cur != null) { st.push(cur); cur = cur.left; }
        cur = st.pop();
        if (cur.val <= prev) return false;
        prev = cur.val;
        cur = cur.right;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Bounds | O(n) | O(h) |
| Inorder with previous key | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Equal keys are invalid here (strict inequalities). Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is comparing a node with its children not enough?</summary>

A grandchild in the right subtree can still be smaller than the root.

</details>


<details><summary>Why `long` bounds?</summary>

A node may hold `Integer.MIN_VALUE` or `MAX_VALUE`.

</details>


## Connected
- [Recover Binary Search Tree](Recover%20Binary%20Search%20Tree.md)
- [Minimum Absolute Difference in BST](Minimum%20Absolute%20Difference%20in%20BST.md)
