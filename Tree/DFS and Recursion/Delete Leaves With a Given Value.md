---
topic: DFS and Recursion
pattern: [Rebuild by returning a node, Post-order]
source: LeetCode 1325
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Delete Leaves With a Given Value

> [!TIP]
> **🧠 Memory hook**
> Delete leaves, and a parent that **becomes a leaf** goes next.
> **Mantra: CLEAN CHILDREN FIRST, THEN DROP MYSELF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=21) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Delete all leaves with the target value; repeat while newly created leaves have it.

## Key insight
Post-order: attach `root.left = remove(root.left)` first. Afterwards the node is a leaf with the target value iff it should disappear, so return `null` for it.

## Approach: Post-order
```java
// Post-order: clean the children first, then drop the node if it became a leaf with the target value
public TreeNode removeLeafNodes(TreeNode root, int target) {
    if (root == null) return null;
    root.left = removeLeafNodes(root.left, target);
    root.right = removeLeafNodes(root.right, target);
    return root.left == null && root.right == null && root.val == target ? null : root;
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why must the children be cleaned before testing the node?</summary>

The node can only be seen as a leaf after its children vanished.

</details>


## Connected
- [Binary Tree Pruning](Binary%20Tree%20Pruning.md)
- [Find Leaves Of Binary Tree](Find%20Leaves%20Of%20Binary%20Tree.md)
