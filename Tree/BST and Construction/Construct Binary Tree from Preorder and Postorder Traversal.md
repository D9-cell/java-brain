---
topic: BST and Construction
pattern: [Left subtree size from postorder]
source: LeetCode 889
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Construct Binary Tree from Preorder and Postorder Traversal

> [!TIP]
> **🧠 Memory hook**
> No inorder, so find the **left child** in postorder to learn how big the left part is.
> **Mantra: pre[1] IS THE LEFT ROOT; ITS POST INDEX GIVES THE SIZE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=16) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Rebuild a binary tree from preorder and postorder (any valid answer; unique when every node has 0 or 2 children).

## Key insight
For a range with root `pre[l]` the next preorder value is the left child's root. Its position in postorder shows how many nodes the left subtree has. A stack solution pushes nodes in preorder and pops while the top equals the next postorder value.

## Approach 1: Recursion + position map
```java
// preorder[1] is the root of the left subtree; find it in postorder to learn the left subtree size
public TreeNode constructFromPrePost(int[] preorder, int[] postorder) {
    Map<Integer, Integer> pos = new HashMap<>();
    for (int i = 0; i < postorder.length; i++) pos.put(postorder[i], i);
    return build(preorder, 0, preorder.length - 1, 0, pos);
}

// Builds from preorder[pl..pr] with the postorder slice starting at qs
private TreeNode build(int[] pre, int pl, int pr, int qs, Map<Integer, Integer> pos) {
    if (pl > pr) return null;
    TreeNode n = new TreeNode(pre[pl]);
    if (pl == pr) return n;
    int leftSize = pos.get(pre[pl + 1]) - qs + 1;
    n.left = build(pre, pl + 1, pl + leftSize, qs, pos);
    n.right = build(pre, pl + leftSize + 1, pr, qs + leftSize, pos);
    return n;
}
```

## Approach 2: Stack
```java
// Stack version: push nodes in preorder and pop whenever the top matches the next postorder value
public TreeNode constructFromPrePostStack(int[] preorder, int[] postorder) {
    Deque<TreeNode> st = new ArrayDeque<>();
    st.push(new TreeNode(preorder[0]));
    for (int i = 1, j = 0; i < preorder.length; i++) {
        TreeNode n = new TreeNode(preorder[i]);
        while (st.peek().val == postorder[j]) { st.pop(); j++; }
        if (st.peek().left == null) st.peek().left = n; else st.peek().right = n;
        st.push(n);
    }
    return st.peekLast();
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion + position map | O(n) | O(n) |
| Stack | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Checked by regenerating both orders from the result (and exact equality for full trees). Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is the answer not unique?</summary>

A node with a single child could be a left or a right child; both give the same pair of orders.

</details>


## Connected
- [Construct Binary Tree from Preorder and Inorder Traversal](Construct%20Binary%20Tree%20from%20Preorder%20and%20Inorder%20Traversal.md)
