---
topic: DFS and Recursion
pattern: [Bottom-up combine, Return height, record best]
source: LeetCode 543
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Diameter of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Every node asks: **how tall are my two arms?** The longest bent path through me is arm + arm.
> **Mantra: RETURN HEIGHT, RECORD LEFT + RIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=0) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return the length (in edges) of the longest path between any two nodes.

## Key insight
The answer is the maximum over nodes of `leftHeight + rightHeight`. Compute heights bottom-up and update a global best at every node.

## Approach 1: One pass
```java
// One pass: every node reports its height and updates the answer with leftHeight + rightHeight
public int diameterOfBinaryTree(TreeNode root) {
    int[] best = {0};
    height(root, best);
    return best[0];
}

// Height in nodes of the subtree; the longest path through this node is l + r edges
private int height(TreeNode n, int[] best) {
    if (n == null) return 0;
    int l = height(n.left, best), r = height(n.right, best);
    best[0] = Math.max(best[0], l + r);
    return 1 + Math.max(l, r);
}
```

## Approach 2: Recompute heights
```java
// Slow version: compute the height again at every node, O(n^2) on skewed trees
public int diameterSlow(TreeNode root) {
    if (root == null) return 0;
    int through = h(root.left) + h(root.right);
    return Math.max(through, Math.max(diameterSlow(root.left), diameterSlow(root.right)));
}

// Plain height
private int h(TreeNode n) { return n == null ? 0 : 1 + Math.max(h(n.left), h(n.right)); }
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(h) |
| Recompute heights | O(n²) worst | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why does the diameter not always pass through the root?</summary>

A deep bushy subtree can hold a longer path than any path through the root.

</details>


<details><summary>What does the helper return versus record?</summary>

Returns height for the parent, records `l + r` for the answer.

</details>


## Connected
- [Binary Tree Maximum Path Sum](Binary%20Tree%20Maximum%20Path%20Sum.md)
- [Longest ZigZag Path in a Binary Tree](Longest%20ZigZag%20Path%20in%20a%20Binary%20Tree.md)
- [Tree diameter in graphs](../../Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)
