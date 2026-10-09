---
topic: DFS and Recursion
pattern: [Two trees together, Mirror walk]
source: LeetCode 101
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Symmetric Tree

> [!TIP]
> **🧠 Memory hook**
> Fold the tree down the middle: **outer meets outer, inner meets inner**.
> **Mantra: LEFT.LEFT ↔ RIGHT.RIGHT, LEFT.RIGHT ↔ RIGHT.LEFT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=28) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Is the tree a mirror of itself around its center?

## Key insight
Check that the left and right subtrees mirror each other: equal values, `a.left` with `b.right` and `a.right` with `b.left`.

## Approach 1: Recursive mirror
```java
// Two mirror pointers: outer with outer, inner with inner
public boolean isSymmetric(TreeNode root) { return root == null || mirror(root.left, root.right); }

// Equal values, and left.left mirrors right.right, left.right mirrors right.left
private boolean mirror(TreeNode a, TreeNode b) {
    if (a == null || b == null) return a == b;
    return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
}
```

## Approach 2: Queue of mirror pairs
```java
// Iterative: a queue that always holds mirror pairs next to each other
public boolean isSymmetricIterative(TreeNode root) {
    if (root == null) return true;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root.left);
    q.add(root.right);
    while (!q.isEmpty()) {
        TreeNode a = q.poll(), b = q.poll();
        if (a == null && b == null) continue;
        if (a == null || b == null || a.val != b.val) return false;
        q.add(a.left);
        q.add(b.right);
        q.add(a.right);
        q.add(b.left);
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive mirror | O(n) | O(h) |
| Queue of mirror pairs | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Difference from Same Tree?</summary>

Only the pairing of children is crossed.

</details>


## Connected
- [Same Tree](Same%20Tree.md)
- [Foldable Binary Tree](Foldable%20Binary%20Tree.md)
