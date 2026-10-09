---
topic: DFS and Recursion
pattern: [Top-down state, Number built on the way down]
source: LeetCode 129
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Sum Root to Leaf Numbers

> [!TIP]
> **🧠 Memory hook**
> Each step down is **append a digit**: `cur * 10 + digit`.
> **Mantra: cur = cur·10 + digit, ADD AT LEAVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=17) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Each root-to-leaf path forms a decimal number. Return the sum of all of them.

## Key insight
Pass the number built so far; at a leaf return it; for an inner node return the sum of both children.

## Approach 1: Recursive
```java
// Push the number built so far down: next = cur * 10 + digit; add it up at the leaves
public int sumNumbers(TreeNode root) { return dfs(root, 0); }

// Returns the sum of all root-to-leaf numbers inside the subtree
private int dfs(TreeNode n, int cur) {
    if (n == null) return 0;
    cur = cur * 10 + n.val;
    if (n.left == null && n.right == null) return cur;
    return dfs(n.left, cur) + dfs(n.right, cur);
}
```

## Approach 2: Iterative
```java
// Iterative version with a stack of nodes and the numbers so far
public int sumNumbersIterative(TreeNode root) {
    if (root == null) return 0;
    int total = 0;
    Deque<TreeNode> nodes = new ArrayDeque<>();
    Deque<Integer> nums = new ArrayDeque<>();
    nodes.push(root);
    nums.push(root.val);
    while (!nodes.isEmpty()) {
        TreeNode n = nodes.pop();
        int cur = nums.pop();
        if (n.left == null && n.right == null) total += cur;
        if (n.right != null) { nodes.push(n.right); nums.push(cur * 10 + n.right.val); }
        if (n.left != null) { nodes.push(n.left); nums.push(cur * 10 + n.left.val); }
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Iterative | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why return the value at a leaf instead of at a null?</summary>

A null child of an inner node would count the same path twice.

</details>


## Connected
- [Sum of Root To Leaf Binary Numbers](Sum%20of%20Root%20To%20Leaf%20Binary%20Numbers.md)
