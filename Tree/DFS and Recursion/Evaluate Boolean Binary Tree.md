---
topic: DFS and Recursion
pattern: [Bottom-up combine, Expression tree]
source: LeetCode 2331
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Evaluate Boolean Binary Tree

> [!TIP]
> **🧠 Memory hook**
> An expression tree: leaves are operands, inner nodes are **operators**.
> **Mantra: LEAF = VALUE, INNER = OP(LEFT, RIGHT)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=34) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Leaves are 0 (false) or 1 (true); inner nodes are 2 (OR) or 3 (AND). Evaluate the tree.

## Key insight
Every inner node has exactly two children. Evaluate both and combine with the node's operator.

## Approach 1: Recursive
```java
// Leaves are 0 (false) and 1 (true); 2 means OR and 3 means AND; evaluate children first
public boolean evaluateTree(TreeNode root) {
    if (root.left == null) return root.val == 1;
    boolean l = evaluateTree(root.left), r = evaluateTree(root.right);
    return root.val == 2 ? l || r : l && r;
}
```

## Approach 2: Iterative post-order
```java
// Iterative post-order with a value stack
public boolean evaluateTreeIterative(TreeNode root) {
    Deque<TreeNode> todo = new ArrayDeque<>();
    List<TreeNode> order = new ArrayList<>();
    todo.push(root);
    while (!todo.isEmpty()) {
        TreeNode n = todo.pop();
        order.add(n);
        if (n.left != null) { todo.push(n.left); todo.push(n.right); }
    }
    Map<TreeNode, Boolean> val = new HashMap<>();
    for (int i = order.size() - 1; i >= 0; i--) {
        TreeNode n = order.get(i);
        if (n.left == null) val.put(n, n.val == 1);
        else val.put(n, n.val == 2 ? val.get(n.left) || val.get(n.right) : val.get(n.left) && val.get(n.right));
    }
    return val.get(root);
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Iterative post-order | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>How do you detect a leaf?</summary>

`left == null`, since inner nodes always have two children.

</details>


## Connected
- [Parsing A Boolean Expression](../../Stack/Parsing%20A%20Boolean%20Expression.md)
