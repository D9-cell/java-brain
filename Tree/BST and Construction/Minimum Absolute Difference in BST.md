---
topic: BST and Construction
pattern: [Inorder, Adjacent keys]
source: LeetCode 530
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Minimum Absolute Difference in BST

> [!TIP]
> **🧠 Memory hook**
> The closest pair of numbers in a sorted list is always **side by side**.
> **Mantra: INORDER, DIFF WITH PREVIOUS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=11) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the smallest absolute difference between any two keys.

## Key insight
Take the minimum of `cur - prev` over an inorder traversal.

## Approach 1: Recursive
```java
// The closest pair is always adjacent in inorder, so compare each key with the previous one
public int getMinimumDifference(TreeNode root) {
    int[] st = {Integer.MAX_VALUE, Integer.MIN_VALUE};
    walk(root, st);
    return st[0];
}

// st = {best difference, previous key}
private void walk(TreeNode n, int[] st) {
    if (n == null) return;
    walk(n.left, st);
    if (st[1] != Integer.MIN_VALUE) st[0] = Math.min(st[0], n.val - st[1]);
    st[1] = n.val;
    walk(n.right, st);
}
```

## Approach 2: Iterative
```java
// Iterative inorder with a stack
public int getMinimumDifferenceIterative(TreeNode root) {
    Deque<TreeNode> st = new ArrayDeque<>();
    Integer prev = null;
    int best = Integer.MAX_VALUE;
    for (TreeNode cur = root; cur != null || !st.isEmpty(); ) {
        while (cur != null) { st.push(cur); cur = cur.left; }
        cur = st.pop();
        if (prev != null) best = Math.min(best, cur.val - prev);
        prev = cur.val;
        cur = cur.right;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Iterative | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why compare only neighbours?</summary>

If a gap between non-neighbours were smaller, the keys between them would produce smaller gaps.

</details>


## Connected
- [Validate Binary Search Tree](Validate%20Binary%20Search%20Tree.md)
- [Find Mode in Binary Search Tree](Find%20Mode%20in%20Binary%20Search%20Tree.md)
