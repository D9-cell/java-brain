---
topic: Traversals and Views
pattern: [Level scan, Leaf test]
source: LeetCode 111
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Minimum Depth of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Stop at the **first leaf**, not at the first missing child.
> **Mantra: FIRST LEAF IN BFS, ONE CHILD → FOLLOW IT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=26) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the number of nodes on the shortest path from the root to a leaf.

## Key insight
BFS ends at the first leaf. In recursion a node with one null child must follow the other child, since a null is not a leaf.

## Approach 1: BFS
```java
// Level-order scan that stops at the first leaf
public int minDepth(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    for (int depth = 1; ; depth++) {
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            if (cur.left == null && cur.right == null) return depth;
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
    }
}
```

## Approach 2: DFS
```java
// Recursion where a node with one child must follow that child, since the null side is not a leaf
public int minDepthDfs(TreeNode root) {
    if (root == null) return 0;
    if (root.left == null) return 1 + minDepthDfs(root.right);
    if (root.right == null) return 1 + minDepthDfs(root.left);
    return 1 + Math.min(minDepthDfs(root.left), minDepthDfs(root.right));
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n) | O(w) |
| DFS | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why not `1 + min(left, right)` blindly?</summary>

A null side returns 0 and would claim a leaf exists there.

</details>


## Connected
- [Maximum Depth of N-ary Tree](../BST%20and%20Construction/Maximum%20Depth%20of%20N-ary%20Tree.md)
