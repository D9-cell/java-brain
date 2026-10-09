---
topic: DFS and Recursion
pattern: [Top-down state, Left flag]
source: LeetCode 404
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Sum of Left Leaves

> [!TIP]
> **🧠 Memory hook**
> Tell every node **whether it is a left child**.
> **Mantra: PASS isLeft, COUNT LEAVES WITH IT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=35) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return the sum of all leaves that are left children.

## Key insight
Pass a boolean saying whether the node is a left child. At a leaf return its value when the flag is set.

## Approach 1: Flag DFS
```java
// Pass a flag saying whether the node is a left child; count only leaves that carry it
public int sumOfLeftLeaves(TreeNode root) { return dfs(root, false); }

// Sum of left leaves inside the subtree of n
private int dfs(TreeNode n, boolean isLeft) {
    if (n == null) return 0;
    if (n.left == null && n.right == null) return isLeft ? n.val : 0;
    return dfs(n.left, true) + dfs(n.right, false);
}
```

## Approach 2: Peek at the left child
```java
// Iterative: look one step ahead at the left child
public int sumOfLeftLeavesIterative(TreeNode root) {
    if (root == null) return 0;
    int sum = 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        TreeNode n = q.poll();
        if (n.left != null) {
            if (n.left.left == null && n.left.right == null) sum += n.left.val; else q.add(n.left);
        }
        if (n.right != null) q.add(n.right);
    }
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Flag DFS | O(n) | O(h) |
| Peek at the left child | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Is a root-only tree a left leaf?</summary>

No, the root is not a left child.

</details>


## Connected
- [Sum of Root To Leaf Binary Numbers](Sum%20of%20Root%20To%20Leaf%20Binary%20Numbers.md)
