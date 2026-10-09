---
topic: DFS and Recursion
pattern: [Bottom-up combine, Two-children nodes only]
source: GeeksforGeeks
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Path Sum between 2 Leaf Nodes

> [!TIP]
> **🧠 Memory hook**
> Same arms, but the ends must be **leaves**, so negatives cannot be dropped.
> **Mantra: ONLY A NODE WITH TWO KIDS CLOSES A PATH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=2) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Find the maximum path sum between any two leaves.

## Key insight
A node with exactly two children records `left + val + right`. A node with one child just passes its child's value up. If the tree has a single leaf, fall back to the root-to-leaf sum.

## Approach: Post-order
```java
// Returns the best leaf-to-leaf sum; with a single leaf it falls back to the root-to-leaf sum
public int maxPathSum(TreeNode root) {
    int[] best = {Integer.MIN_VALUE};
    int fromRoot = down(root, best);
    return best[0] == Integer.MIN_VALUE ? fromRoot : best[0];
}

// Best root-to-leaf sum below n; a node with two children closes a leaf-to-leaf candidate
private int down(TreeNode n, int[] best) {
    if (n == null) return 0;
    if (n.left == null && n.right == null) return n.val;
    if (n.left == null) return n.val + down(n.right, best);
    if (n.right == null) return n.val + down(n.left, best);
    int l = down(n.left, best), r = down(n.right, best);
    best[0] = Math.max(best[0], l + r + n.val);
    return n.val + Math.max(l, r);
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why not clamp to zero here?</summary>

The path is forced to end at leaves, so every node on the way counts.

</details>


<details><summary>Why handle one-child nodes separately?</summary>

There is no second leaf below to close a path.

</details>


## Connected
- [Binary Tree Maximum Path Sum](Binary%20Tree%20Maximum%20Path%20Sum.md)
