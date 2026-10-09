---
topic: DFS and Recursion
pattern: [Two trees together, Mirror shape]
source: GeeksforGeeks
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Foldable Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Symmetric Tree **with the values ignored**: only the shape has to fold.
> **Mantra: SHAPE MIRRORS, VALUES DO NOT MATTER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=30) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
A tree is foldable if its left subtree is the mirror image of its right subtree in shape. Check it.

## Key insight
Same mirror walk as Symmetric Tree but without comparing values.

## Approach: Mirror shape
```java
// Foldable means the left subtree is a mirror image of the right subtree in shape (values are ignored)
public boolean isFoldable(TreeNode root) { return root == null || mirror(root.left, root.right); }

// Same shape when one tree is flipped
private boolean mirror(TreeNode a, TreeNode b) {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
}
```

| Approach | Time | Space |
|---|---|---|
| Mirror shape | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Is every symmetric tree foldable?</summary>

Yes. The reverse is not true.

</details>


## Connected
- [Symmetric Tree](Symmetric%20Tree.md)
