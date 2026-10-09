---
topic: BST and Construction
pattern: [Inorder, Middle as root]
source: LeetCode 1382
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Balance a Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> Sorted list → **pick the middle as the root**, recurse on both halves.
> **Mantra: INORDER LIST, MIDDLE IS THE ROOT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=9) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return a balanced BST (subtree heights differ by at most 1) with the same keys.

## Key insight
Flatten to a sorted list and rebuild by recursively choosing the middle element. The Day-Stout-Warren variant first rotates the tree into a right vine and then compresses it in O(1) extra space.

## Approach 1: Sorted list + middle
```java
// Flatten to a sorted list, then rebuild by always taking the middle element as the root
public TreeNode balanceBST(TreeNode root) {
    List<Integer> v = TreeNode.inorder(root);
    return build(v, 0, v.size() - 1);
}

// Middle of [lo, hi] becomes the root
private TreeNode build(List<Integer> v, int lo, int hi) {
    if (lo > hi) return null;
    int mid = (lo + hi) >>> 1;
    return new TreeNode(v.get(mid), build(v, lo, mid - 1), build(v, mid + 1, hi));
}
```

## Approach 2: Vine + rotations (DSW)
```java
// Day-Stout-Warren style: flatten into a right-only vine, then rotate it into a balanced tree
public TreeNode balanceBSTVine(TreeNode root) {
    TreeNode dummy = new TreeNode(0);
    dummy.right = root;
    int n = 0;
    for (TreeNode t = dummy; t.right != null; ) {
        if (t.right.left != null) {
            TreeNode l = t.right.left;
            t.right.left = l.right;
            l.right = t.right;
            t.right = l;
        } else { t = t.right; n++; }
    }
    int leaves = n + 1 - Integer.highestOneBit(n + 1);
    compress(dummy, leaves);
    for (n -= leaves; n > 1; n /= 2) compress(dummy, n / 2);
    return dummy.right;
}

// Performs count left rotations along the vine
private void compress(TreeNode dummy, int count) {
    TreeNode t = dummy;
    for (int i = 0; i < count; i++) {
        TreeNode child = t.right;
        t.right = child.right;
        child.right = t.right.left;
        t.right.left = child;
        t = t.right;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted list + middle | O(n) | O(n) |
| Vine + rotations (DSW) | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Is the result unique?</summary>

No; with an even count either middle works.

</details>


## Connected
- [Increasing Order Search Tree](Increasing%20Order%20Search%20Tree.md)
