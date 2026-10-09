---
topic: DFS and Recursion
pattern: [Top-down state, Remaining target]
source: LeetCode 112
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Path Sum

> [!TIP]
> **🧠 Memory hook**
> Pay the toll at every node; at a **leaf** your wallet must be exactly empty.
> **Mantra: SUBTRACT AS YOU GO, ZERO AT A LEAF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=13) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Is there a root-to-leaf path whose values add up to the target?

## Key insight
Pass `target - node.val` down. At a leaf check `node.val == remaining`. An empty tree has no path.

## Approach 1: Recursive
```java
// Subtract the node value on the way down; at a leaf the remainder must be zero
public boolean hasPathSum(TreeNode root, int target) {
    if (root == null) return false;
    if (root.left == null && root.right == null) return root.val == target;
    return hasPathSum(root.left, target - root.val) || hasPathSum(root.right, target - root.val);
}
```

## Approach 2: Iterative stack
```java
// Iterative version with a stack of nodes and the sum collected so far
public boolean hasPathSumIterative(TreeNode root, int target) {
    if (root == null) return false;
    Deque<TreeNode> nodes = new ArrayDeque<>();
    Deque<Integer> sums = new ArrayDeque<>();
    nodes.push(root);
    sums.push(root.val);
    while (!nodes.isEmpty()) {
        TreeNode cur = nodes.pop();
        int s = sums.pop();
        if (cur.left == null && cur.right == null && s == target) return true;
        if (cur.right != null) { nodes.push(cur.right); sums.push(s + cur.right.val); }
        if (cur.left != null) { nodes.push(cur.left); sums.push(s + cur.left.val); }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Iterative stack | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why test for a leaf instead of a null child?</summary>

A path must end at a leaf; a node with one child is not a finished path.

</details>


## Connected
- [Path Sum II](Path%20Sum%20II.md)
- [Path Sum III](Path%20Sum%20III.md)
