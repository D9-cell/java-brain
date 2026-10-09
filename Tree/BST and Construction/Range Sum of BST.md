---
topic: BST and Construction
pattern: [Prune by ordering]
source: LeetCode 938
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Range Sum of BST

> [!TIP]
> **🧠 Memory hook**
> Do not enter a subtree that **cannot** contain keys in the range.
> **Mantra: TOO SMALL → RIGHT, TOO BIG → LEFT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=12) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Sum all keys in `[low, high]`.

## Key insight
If the node is below `low`, only its right subtree can matter; if above `high`, only its left. Otherwise add it and visit both.

## Approach 1: Recursive
```java
// Skip subtrees that cannot contain keys inside [low, high]
public int rangeSumBST(TreeNode root, int low, int high) {
    if (root == null) return 0;
    if (root.val < low) return rangeSumBST(root.right, low, high);
    if (root.val > high) return rangeSumBST(root.left, low, high);
    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}
```

## Approach 2: Iterative
```java
// Iterative with a stack and the same pruning
public int rangeSumBSTIterative(TreeNode root, int low, int high) {
    int sum = 0;
    Deque<TreeNode> st = new ArrayDeque<>();
    if (root != null) st.push(root);
    while (!st.isEmpty()) {
        TreeNode n = st.pop();
        if (n.val >= low && n.val <= high) sum += n.val;
        if (n.val > low && n.left != null) st.push(n.left);
        if (n.val < high && n.right != null) st.push(n.right);
    }
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) worst | O(h) |
| Iterative | O(n) worst | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why O(n) worst case?</summary>

When the range covers every key, every node is visited anyway.

</details>


## Connected
- [Trim a Binary Search Tree](Trim%20a%20Binary%20Search%20Tree.md)
