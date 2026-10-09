---
topic: BST and Construction
pattern: [Root from postorder, Split by inorder]
source: LeetCode 106
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Construct Binary Tree from Inorder and Postorder Traversal

> [!TIP]
> **🧠 Memory hook**
> Postorder ends with the **root**; read it backwards, so the right subtree comes first.
> **Mantra: POSTORDER FROM THE END, BUILD RIGHT FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=15) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Rebuild a binary tree from its inorder and postorder traversals (distinct values).

## Key insight
Same as the preorder version with the pointer starting at the end of postorder and moving left. Because the last value before the root belongs to the right subtree, build the right child first.

## Approach 1: Hash map + shared counter
```java
// The last postorder value is the root; build the right subtree before the left one because postorder is read backwards
public TreeNode buildTree(int[] inorder, int[] postorder) {
    Map<Integer, Integer> pos = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) pos.put(inorder[i], i);
    return build(postorder, new int[]{postorder.length - 1}, 0, inorder.length - 1, pos);
}

// Builds the subtree for inorder[lo..hi], consuming postorder from the end
private TreeNode build(int[] post, int[] next, int lo, int hi, Map<Integer, Integer> pos) {
    if (lo > hi) return null;
    TreeNode n = new TreeNode(post[next[0]--]);
    int mid = pos.get(n.val);
    n.right = build(post, next, mid + 1, hi, pos);
    n.left = build(post, next, lo, mid - 1, pos);
    return n;
}
```

## Approach 2: Copying slices
```java
// Slice-copying version: O(n^2)
public TreeNode buildTreeSlow(int[] inorder, int[] postorder) {
    int n = postorder.length;
    if (n == 0) return null;
    int k = 0;
    while (inorder[k] != postorder[n - 1]) k++;
    TreeNode root = new TreeNode(postorder[n - 1]);
    root.left = buildTreeSlow(Arrays.copyOfRange(inorder, 0, k), Arrays.copyOfRange(postorder, 0, k));
    root.right = buildTreeSlow(Arrays.copyOfRange(inorder, k + 1, n), Arrays.copyOfRange(postorder, k, n - 1));
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Hash map + shared counter | O(n) | O(n) |
| Copying slices | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What breaks if you build left first?</summary>

The pointer would hand the right subtree's values to the left subtree.

</details>


## Connected
- [Construct Binary Tree from Preorder and Inorder Traversal](Construct%20Binary%20Tree%20from%20Preorder%20and%20Inorder%20Traversal.md)
