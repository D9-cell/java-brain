---
topic: BST and Construction
pattern: [Preorder, Value bounds]
source: LeetCode 449
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Serialize and Deserialize BST

> [!TIP]
> **🧠 Memory hook**
> The BST ordering is the missing information: **no null markers needed**.
> **Mantra: PREORDER OUT, BOUNDS IN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=8) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Encode a BST to a compact string and decode it back to the same tree.

## Key insight
Write the preorder keys. To decode, build the node for the next value if it fits the window `(lo, hi)`; the left subtree gets `(lo, v)` and the right `(v, hi)`. Inserting the values one by one also works but is O(n·h).

## Approach 1: Preorder + bounds
```java
// Preorder values joined by commas: the BST property makes the shape recoverable without null markers
public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    pre(root, sb);
    return sb.toString();
}

// Appends preorder values
private void pre(TreeNode n, StringBuilder sb) {
    if (n == null) return;
    if (sb.length() > 0) sb.append(',');
    sb.append(n.val);
    pre(n.left, sb);
    pre(n.right, sb);
}

// Rebuild with value bounds: the next preorder value belongs to the current subtree only if it fits (lo, hi)
public TreeNode deserialize(String data) {
    if (data.isEmpty()) return null;
    Deque<Integer> q = new ArrayDeque<>();
    for (String s : data.split(",")) q.add(Integer.parseInt(s));
    return build(q, Long.MIN_VALUE, Long.MAX_VALUE);
}

// Consumes values from the queue while they stay inside the bounds
private TreeNode build(Deque<Integer> q, long lo, long hi) {
    if (q.isEmpty() || q.peek() <= lo || q.peek() >= hi) return null;
    int v = q.poll();
    TreeNode n = new TreeNode(v);
    n.left = build(q, lo, v);
    n.right = build(q, v, hi);
    return n;
}
```

## Approach 2: Preorder + insert
```java
// Preorder values joined by commas: the BST property makes the shape recoverable without null markers
public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    pre(root, sb);
    return sb.toString();
}

// Appends preorder values
private void pre(TreeNode n, StringBuilder sb) {
    if (n == null) return;
    if (sb.length() > 0) sb.append(',');
    sb.append(n.val);
    pre(n.left, sb);
    pre(n.right, sb);
}

// Alternative rebuild: insert the preorder values one by one
public TreeNode deserializeInsert(String data) {
    TreeNode root = null;
    if (data.isEmpty()) return null;
    for (String s : data.split(",")) root = TreeNode.insert(root, Integer.parseInt(s));
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Preorder + bounds | O(n) | O(n) |
| Preorder + insert | O(n · h) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why would a general binary tree need null markers?</summary>

Preorder alone does not determine its shape; a BST's ordering does.

</details>


## Connected
- [Construct Binary Tree from Preorder and Inorder Traversal](Construct%20Binary%20Tree%20from%20Preorder%20and%20Inorder%20Traversal.md)
