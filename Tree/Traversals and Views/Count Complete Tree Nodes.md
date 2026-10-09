---
topic: Traversals and Views
pattern: [Perfect subtree shortcut, Binary search on last level]
source: LeetCode 222
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Count Complete Tree Nodes

> [!TIP]
> **🧠 Memory hook**
> If the left edge and the right edge are equally tall, the subtree is a **full pyramid**: just compute `2^h - 1`.
> **Mantra: EDGE HEIGHTS EQUAL → 2^h − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=18) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Count the nodes of a complete binary tree faster than O(n).

## Key insight
In a complete tree at least one child subtree is perfect, so the recursion only descends one side each time: O(log² n).

## Approach 1: Equal edge heights
```java
// If the left and right edges have equal height the subtree is perfect (2^h - 1); otherwise recurse
public int countNodes(TreeNode root) {
    if (root == null) return 0;
    int l = 0, r = 0;
    for (TreeNode n = root; n != null; n = n.left) l++;
    for (TreeNode n = root; n != null; n = n.right) r++;
    if (l == r) return (1 << l) - 1;
    return 1 + countNodes(root.left) + countNodes(root.right);
}
```

## Approach 2: Binary search on the last level
```java
// Binary search on the last level: check whether the node at a given position exists by following bits of the index
public int countNodesBinarySearch(TreeNode root) {
    if (root == null) return 0;
    int h = 0;
    for (TreeNode n = root; n.left != null; n = n.left) h++;
    if (h == 0) return 1;
    int lo = 0, hi = (1 << h) - 1;
    while (lo <= hi) {
        int mid = (lo + hi) >>> 1;
        if (exists(root, h, mid)) lo = mid + 1; else hi = mid - 1;
    }
    return (1 << h) - 1 + lo;
}

// Walks from the root to position idx on the last level using the bits of idx from the top
private boolean exists(TreeNode root, int h, int idx) {
    TreeNode n = root;
    for (int bit = h - 1; bit >= 0 && n != null; bit--) n = ((idx >> bit) & 1) == 0 ? n.left : n.right;
    return n != null;
}
```

| Approach | Time | Space |
|---|---|---|
| Equal edge heights | O(log² n) | O(log n) |
| Binary search on the last level | O(log² n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is it O(log² n)?</summary>

log n levels of recursion, each measuring two edges of length up to log n.

</details>


## Connected
- [Check Completeness of a Binary Tree](Check%20Completeness%20of%20a%20Binary%20Tree.md)
