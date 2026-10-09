---
topic: LCA Distance and Tree Graphs
pattern: [LCA by recursion, Return depth and node]
source: LeetCode 1123
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Lowest Common Ancestor of Deepest Leaves

> [!TIP]
> **🧠 Memory hook**
> The meeting point of the **deepest** leaves: the taller side wins, a tie means "me".
> **Mantra: DEEPER SIDE WINS, TIE → THIS NODE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=2) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return the LCA of all deepest leaves.

## Key insight
Each call returns the deepest depth below and the LCA of the leaves at that depth. If one side is deeper, take its answer; if both are equally deep, this node is the LCA.

## Approach 1: Depth + node
```java
// Each node returns {depth of deepest leaf below, lca of those leaves}; the taller side wins and a tie makes this node the answer
public TreeNode lcaDeepestLeaves(TreeNode root) { return dfs(root, 0).node; }

// Returns the deepest depth reached in the subtree and the LCA of its deepest leaves
private Result dfs(TreeNode n, int d) {
    if (n == null) return new Result(d, null);
    Result l = dfs(n.left, d + 1), r = dfs(n.right, d + 1);
    if (l.depth > r.depth) return l;
    if (r.depth > l.depth) return r;
    return new Result(l.depth, n);
}
```

## Approach 2: Compare heights top-down
```java
// Height-based version: the subtree with the larger height contains the deepest leaves
public TreeNode lcaDeepestLeavesHeight(TreeNode n) {
    int l = height(n.left), r = height(n.right);
    if (l == r) return n;
    return lcaDeepestLeavesHeight(l > r ? n.left : n.right);
}

// Height in nodes
private int height(TreeNode n) { return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right)); }
```

| Approach | Time | Space |
|---|---|---|
| Depth + node | O(n) | O(h) |
| Compare heights top-down | O(n²) worst | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What does a tie mean?</summary>

Deepest leaves exist on both sides, so only this node contains them all.

</details>


## Connected
- [Lowest Common Ancestor of a Binary Tree](Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree.md)
- [Diameter of Binary Tree](../DFS%20and%20Recursion/Diameter%20of%20Binary%20Tree.md)
