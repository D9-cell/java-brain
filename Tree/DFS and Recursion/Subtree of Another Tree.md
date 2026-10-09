---
topic: DFS and Recursion
pattern: [Two trees together, Try every start]
source: LeetCode 572
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Subtree of Another Tree

> [!TIP]
> **🧠 Memory hook**
> Slide the small tree over every node of the big one and test **an exact match**.
> **Mantra: EVERY NODE IS A CANDIDATE ROOT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=29) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Does the big tree contain a subtree identical to `subRoot` (it must include all descendants)?

## Key insight
For each node of the big tree run the Same Tree check. Alternatively serialize both trees (with delimiters and null markers) and test `contains`.

## Approach 1: Same Tree at every node
```java
// Try every node of root as the start of an exact match with subRoot
public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return subRoot == null;
    return same(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

// Exact structural match
private boolean same(TreeNode a, TreeNode b) {
    if (a == null || b == null) return a == b;
    return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);
}
```

## Approach 2: Serialization + contains
```java
// Serialize both trees with delimiters and null markers, then look for the small string inside the big one
public boolean isSubtreeSerialized(TreeNode root, TreeNode subRoot) {
    return ser(root).contains(ser(subRoot));
}

// Preorder with brackets around values, so 12 can never match 2
private String ser(TreeNode n) {
    if (n == null) return ",#";
    return ",[" + n.val + "]" + ser(n.left) + ser(n.right);
}
```

| Approach | Time | Space |
|---|---|---|
| Same Tree at every node | O(n · m) | O(h) |
| Serialization + contains | O(n + m) with KMP | O(n + m) |

> [!WARNING]
> **Java gotcha**
> `String.contains` is O(n · m) worst case; use KMP for a guaranteed linear bound. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why brackets around the values in the string?</summary>

Without them "12" would also match a node with value 2.

</details>


## Connected
- [Same Tree](Same%20Tree.md)
- [Find Duplicate Subtrees](Find%20Duplicate%20Subtrees.md)
