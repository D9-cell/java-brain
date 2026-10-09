---
topic: BST and Construction
pattern: [Reverse inorder, Running sum]
source: LeetCode 538, 1038
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Convert BST to Greater Tree

> [!TIP]
> **🧠 Memory hook**
> Walk **largest to smallest** with a running total.
> **Mantra: RIGHT, NODE, LEFT; sum += val; val = sum**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=5) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Replace every key by itself plus the sum of all keys greater than it.

## Key insight
Reverse inorder (right, node, left) visits keys in descending order; a single running sum is the sum of all larger keys.

## Approach 1: Recursive
```java
// Reverse inorder (right, node, left) visits values from largest to smallest, so a running sum is the sum of all larger keys
public TreeNode convertBST(TreeNode root) {
    walk(root, new int[1]);
    return root;
}

// Adds the node to the running sum and writes the sum back
private void walk(TreeNode n, int[] sum) {
    if (n == null) return;
    walk(n.right, sum);
    sum[0] += n.val;
    n.val = sum[0];
    walk(n.left, sum);
}
```

## Approach 2: Iterative stack
```java
// Iterative reverse inorder with a stack
public TreeNode convertBSTIterative(TreeNode root) {
    Deque<TreeNode> st = new ArrayDeque<>();
    int sum = 0;
    for (TreeNode cur = root; cur != null || !st.isEmpty(); ) {
        while (cur != null) { st.push(cur); cur = cur.right; }
        cur = st.pop();
        sum += cur.val;
        cur.val = sum;
        cur = cur.left;
    }
    return root;
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
<details><summary>Same code for LeetCode 538 and 1038?</summary>

Yes. Both ask for each key plus the sum of all greater keys.

</details>


## Connected
- [Increasing Order Search Tree](Increasing%20Order%20Search%20Tree.md)
