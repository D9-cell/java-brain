---
topic: DFS and Recursion
pattern: [Two trees together, Overlay]
source: LeetCode 617
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Merge Two Binary Trees

> [!TIP]
> **🧠 Memory hook**
> Lay one tree over the other and **add where they overlap**; where one is empty, keep the other.
> **Mantra: NULL → TAKE THE OTHER, ELSE ADD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=32) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Merge two trees: overlapping nodes are summed, otherwise the existing node is used.

## Key insight
If one side is null return the other (no copying needed). Otherwise add the values and merge children.

## Approach 1: In place
```java
// Overlapping nodes are added, a missing node is replaced by the other subtree
public TreeNode mergeTrees(TreeNode a, TreeNode b) {
    if (a == null) return b;
    if (b == null) return a;
    a.val += b.val;
    a.left = mergeTrees(a.left, b.left);
    a.right = mergeTrees(a.right, b.right);
    return a;
}
```

## Approach 2: New nodes
```java
// Non-destructive version that builds new nodes
public TreeNode mergeTreesNew(TreeNode a, TreeNode b) {
    if (a == null && b == null) return null;
    TreeNode n = new TreeNode((a == null ? 0 : a.val) + (b == null ? 0 : b.val));
    n.left = mergeTreesNew(a == null ? null : a.left, b == null ? null : b.left);
    n.right = mergeTreesNew(a == null ? null : a.right, b == null ? null : b.right);
    return n;
}
```

| Approach | Time | Space |
|---|---|---|
| In place | O(min(n, m)) | O(h) |
| New nodes | O(n + m) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What is the complexity of the in-place version?</summary>

It only visits positions present in both trees.

</details>


## Connected
- [Same Tree](Same%20Tree.md)
