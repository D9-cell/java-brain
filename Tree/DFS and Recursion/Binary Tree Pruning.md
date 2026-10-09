---
topic: DFS and Recursion
pattern: [Rebuild by returning a node, Post-order]
source: LeetCode 814
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Pruning

> [!TIP]
> **🧠 Memory hook**
> Prune every branch that **never reaches a 1**.
> **Mantra: KEEP IF SUBTREE HAS A 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=22) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Remove every subtree that does not contain a 1.

## Key insight
Prune the children first; a node with value 0 and no children left is removed.

## Approach: Post-order
```java
// Post-order: a subtree without a 1 is removed completely
public TreeNode pruneTree(TreeNode root) {
    if (root == null) return null;
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    return root.left == null && root.right == null && root.val == 0 ? null : root;
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why return the node from the recursion?</summary>

The parent needs to know whether to keep or null out its pointer.

</details>


## Connected
- [Delete Leaves With a Given Value](Delete%20Leaves%20With%20a%20Given%20Value.md)
