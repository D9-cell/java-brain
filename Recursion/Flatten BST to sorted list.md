---
topic: Recursion
pattern: [In-order recursion, prev pointer]
source: GFG
difficulty: Medium
companies: [Amazon, Adobe]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Flatten BST to sorted list

> [!TIP]
> **🧠 Memory hook**
> Read the bookshelf left to right (in-order) and chain each book to the previous one.
> **Mantra: IN-ORDER + prev POINTER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=16) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Flatten a BST into a sorted list using right pointers; left pointers become null.

## Key insight
In-order visits nodes in sorted order. Keep `prev` and link `prev.right = root`.

## Approach 1: Walk to the tail
```java
// Approach 1: flatten left, flatten right, then walk to the tail of the left list to attach root
static Node flattenWalk(Node root) {
    if (root == null) return null;
    Node head = flattenWalk(root.left);
    root.left = null;
    root.right = flattenWalk(root.right);
    if (head == null) return root;
    Node t = head;
    while (t.right != null) t = t.right;
    t.right = root;
    return head;
}
```

## Approach 2: In-order with prev
```java
// Approach 2: in-order with a prev pointer, so each node is linked in O(1)
Node flattenBST(Node root) {
    if (root == null) return null;
    Node head = flattenBST(root.left);
    root.left = null;
    if (prev != null) prev.right = root;
    prev = root;
    root.right = flattenBST(root.right);
    return head == null ? root : head;
}
```

| Approach | Time | Space |
|---|---|---|
| Walk to the tail | O(n²) | O(h) |
| In-order with prev | O(n) | O(h) |

## Recall before you reveal
<details><summary>Return value?</summary>

The head = the leftmost node.

</details>


## Connected
- Tree folder: Flatten Binary Tree to Linked List
