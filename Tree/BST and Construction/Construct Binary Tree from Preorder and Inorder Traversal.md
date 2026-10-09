---
topic: BST and Construction
pattern: [Root from preorder, Split by inorder]
source: LeetCode 105
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Construct Binary Tree from Preorder and Inorder Traversal

> [!TIP]
> **🧠 Memory hook**
> Preorder names the **root**, inorder tells how many nodes lie **left** of it.
> **Mantra: PREORDER = ROOT, INORDER = SPLIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=14) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Rebuild a binary tree from its preorder and inorder traversals (distinct values).

## Key insight
The next unread preorder value is the root of the current range. Its index in inorder (from a hash map) splits the range; build left first, because preorder lists the left subtree next.

## Approach 1: Hash map + shared counter
```java
// The first preorder value is the root; its position in inorder splits the left and right subtrees
public TreeNode buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> pos = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) pos.put(inorder[i], i);
    return build(preorder, new int[]{0}, 0, inorder.length - 1, pos);
}

// Builds the subtree for inorder[lo..hi], consuming preorder values through the shared counter
private TreeNode build(int[] preorder, int[] next, int lo, int hi, Map<Integer, Integer> pos) {
    if (lo > hi) return null;
    TreeNode n = new TreeNode(preorder[next[0]++]);
    int mid = pos.get(n.val);
    n.left = build(preorder, next, lo, mid - 1, pos);
    n.right = build(preorder, next, mid + 1, hi, pos);
    return n;
}
```

## Approach 2: Copying slices
```java
// Slow version that searches the root in inorder every time: O(n^2)
public TreeNode buildTreeSlow(int[] preorder, int[] inorder) {
    if (preorder.length == 0) return null;
    int k = 0;
    while (inorder[k] != preorder[0]) k++;
    TreeNode n = new TreeNode(preorder[0]);
    n.left = buildTreeSlow(Arrays.copyOfRange(preorder, 1, 1 + k), Arrays.copyOfRange(inorder, 0, k));
    n.right = buildTreeSlow(Arrays.copyOfRange(preorder, 1 + k, preorder.length), Arrays.copyOfRange(inorder, k + 1, inorder.length));
    return n;
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
<details><summary>Why build left before right?</summary>

The preorder pointer advances through the left subtree first.

</details>


## Connected
- [Construct Binary Tree from Inorder and Postorder Traversal](Construct%20Binary%20Tree%20from%20Inorder%20and%20Postorder%20Traversal.md)
- [Construct Binary Tree from Preorder and Postorder Traversal](Construct%20Binary%20Tree%20from%20Preorder%20and%20Postorder%20Traversal.md)
