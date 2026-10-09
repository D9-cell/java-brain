---
topic: BST and Construction
pattern: [Controlled inorder, Stack of the left spine]
source: LeetCode 173
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Search Tree Iterator

> [!TIP]
> **🧠 Memory hook**
> An inorder walk that you can **pause after every key**.
> **Mantra: PUSH LEFT SPINE, POP, PUSH LEFT SPINE OF RIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=7) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Implement an iterator with `next()` and `hasNext()` over a BST in sorted order, using O(h) memory.

## Key insight
Keep a stack of nodes whose left subtrees are being explored. `next()` pops the top, then pushes the left spine of its right child.

## Approach 1: Stack of the left spine
```java
// Controlled inorder: the stack holds the left spine of the unvisited part, so memory is O(h)
static class BSTIterator {
    private final Deque<TreeNode> st = new ArrayDeque<>();

    BSTIterator(TreeNode root) { pushLeft(root); }

    // Returns the next smallest key
    int next() {
        TreeNode n = st.pop();
        pushLeft(n.right);
        return n.val;
    }

    // True while keys remain
    boolean hasNext() { return !st.isEmpty(); }

    // Pushes the left spine of n
    private void pushLeft(TreeNode n) { for (; n != null; n = n.left) st.push(n); }
}
```

## Approach 2: Flatten first
```java
// Simple version: flatten the whole inorder into a list first (O(n) memory)
static class FlatIterator {
    private final List<Integer> vals;
    private int i = 0;

    FlatIterator(TreeNode root) { vals = TreeNode.inorder(root); }

    // Returns the next smallest key
    int next() { return vals.get(i++); }

    // True while keys remain
    boolean hasNext() { return i < vals.size(); }
}
```

| Approach | Time | Space |
|---|---|---|
| Stack of the left spine | O(1) amortised per next | O(h) |
| Flatten first | O(1) per next | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is `next()` amortised O(1)?</summary>

Every node is pushed and popped exactly once overall.

</details>


## Connected
- [All Elements in Two Binary Search Trees](All%20Elements%20in%20Two%20Binary%20Search%20Trees.md)
- [Inorder Successor in BST](Inorder%20Successor%20in%20BST.md)
