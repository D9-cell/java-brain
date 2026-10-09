---
topic: DFS and Recursion
pattern: [Bottom-up combine, Early exit with -1]
source: LeetCode 110
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Balanced Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Return the height, or an **alarm value (−1)** the moment something is off.
> **Mantra: HEIGHT OR −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=33) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
A tree is balanced if for every node the heights of its subtrees differ by at most one. Check it.

## Key insight
A single bottom-up pass returns the height, or −1 as soon as a subtree is unbalanced; the −1 propagates all the way up.

## Approach 1: Bottom-up, O(n)
```java
// Bottom-up: a subtree returns its height or -1 as soon as something below is unbalanced
public boolean isBalanced(TreeNode root) { return height(root) != -1; }

// Height of the subtree, or -1 when it is not balanced
private int height(TreeNode n) {
    if (n == null) return 0;
    int l = height(n.left);
    if (l == -1) return -1;
    int r = height(n.right);
    if (r == -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
}
```

## Approach 2: Top-down, recomputes heights
```java
// Top-down: recompute heights at every node, O(n^2) on skewed trees
public boolean isBalancedTopDown(TreeNode root) {
    if (root == null) return true;
    return Math.abs(h(root.left) - h(root.right)) <= 1 && isBalancedTopDown(root.left) && isBalancedTopDown(root.right);
}

// Plain height
private int h(TreeNode n) { return n == null ? 0 : 1 + Math.max(h(n.left), h(n.right)); }
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up, O(n) | O(n) | O(h) |
| Top-down, recomputes heights | O(n²) worst | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is the top-down version quadratic?</summary>

It recomputes the height of each subtree at every ancestor.

</details>


## Connected
- [Diameter of Binary Tree](Diameter%20of%20Binary%20Tree.md)
