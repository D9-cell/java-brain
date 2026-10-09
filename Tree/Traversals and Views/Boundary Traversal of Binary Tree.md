---
topic: Traversals and Views
pattern: [Edge walk, Leaves left to right]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Boundary Traversal of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Walk around the **outline**: down the left edge, along the leaves, up the right edge.
> **Mantra: LEFT EDGE, LEAVES, RIGHT EDGE REVERSED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=8) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Print the boundary anticlockwise starting at the root.

## Key insight
Three parts, none repeated: the left edge without its leaf, all leaves, the right edge without its leaf (reversed). Handle a root that is a leaf.

## Approach 1: Recursive leaves
```java
// Root, then the left edge, then every leaf, then the right edge bottom-up
public List<Integer> boundaryRecursive(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    if (!isLeaf(root)) res.add(root.val);
    for (TreeNode n = root.left; n != null && !isLeaf(n); n = n.left != null ? n.left : n.right) res.add(n.val);
    leaves(root, res);
    List<Integer> right = new ArrayList<>();
    for (TreeNode n = root.right; n != null && !isLeaf(n); n = n.right != null ? n.right : n.left) right.add(n.val);
    Collections.reverse(right);
    res.addAll(right);
    return res;
}

// True when the node has no children
private boolean isLeaf(TreeNode n) { return n.left == null && n.right == null; }

// Appends the leaves from left to right
private void leaves(TreeNode n, List<Integer> res) {
    if (n == null) return;
    if (isLeaf(n)) { res.add(n.val); return; }
    leaves(n.left, res);
    leaves(n.right, res);
}
```

## Approach 2: Iterative leaves
```java
// Iterative version: the leaves come from an explicit stack walk instead of recursion
public List<Integer> boundaryIterative(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    if (!isLeaf(root)) res.add(root.val);
    for (TreeNode n = root.left; n != null && !isLeaf(n); n = n.left != null ? n.left : n.right) res.add(n.val);
    Deque<TreeNode> st = new ArrayDeque<>();
    st.push(root);
    while (!st.isEmpty()) {
        TreeNode cur = st.pop();
        if (isLeaf(cur)) { res.add(cur.val); continue; }
        if (cur.right != null) st.push(cur.right);
        if (cur.left != null) st.push(cur.left);
    }
    Deque<Integer> right = new ArrayDeque<>();
    for (TreeNode n = root.right; n != null && !isLeaf(n); n = n.right != null ? n.right : n.left) right.push(n.val);
    res.addAll(right);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive leaves | O(n) | O(h) |
| Iterative leaves | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why exclude leaves from the edges?</summary>

The leaf pass already prints them, so including them would duplicate nodes.

</details>


<details><summary>Left edge when a node has only a right child?</summary>

Keep going down the right child; it is still on the edge.

</details>


## Connected
- [Boundary Root to Leaf Path Traversal](Boundary%20Root%20to%20Leaf%20Path%20Traversal.md)
- [Left View of Binary Tree](Left%20View%20of%20Binary%20Tree.md)
