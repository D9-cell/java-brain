---
topic: DFS and Recursion
pattern: [Subtree sums, Maximise s * (total - s)]
source: LeetCode 1339
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Product of Splitted Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Cut one edge: two pieces with sums `s` and `total - s`. The product is largest when they are **closest to equal**.
> **Mantra: SUBTREE SUM s, MAXIMISE s·(T − s)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=12) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Remove one edge so the tree splits into two trees; return the maximum product of their sums modulo 1e9+7.

## Key insight
Cutting above a node gives the subtree sum `s`. Collect all subtree sums, then maximise `s * (total - s)` using `long`, and apply the modulo only to the final maximum.

## Approach 1: Store subtree sums
```java
// Cutting above a node splits the tree into subtree sum s and total - s; maximise s * (total - s) before the modulo
public int maxProduct(TreeNode root) {
    List<Long> sums = new ArrayList<>();
    long total = sum(root, sums);
    long best = 0;
    for (long s : sums) best = Math.max(best, s * (total - s));
    return (int) (best % 1_000_000_007);
}

// Subtree sums stored in post-order
private long sum(TreeNode n, List<Long> sums) {
    if (n == null) return 0;
    long s = n.val + sum(n.left, sums) + sum(n.right, sums);
    sums.add(s);
    return s;
}
```

## Approach 2: Two passes, no storage
```java
// Two-pass version: first the total, then a second walk that tries every cut without storing sums
public int maxProductTwoPass(TreeNode root) {
    long total = total(root);
    long[] best = {0};
    cut(root, total, best);
    return (int) (best[0] % 1_000_000_007);
}

// Sum of all values
private long total(TreeNode n) { return n == null ? 0 : n.val + total(n.left) + total(n.right); }

// Returns the subtree sum and updates the best product for the edge above n
private long cut(TreeNode n, long total, long[] best) {
    if (n == null) return 0;
    long s = n.val + cut(n.left, total, best) + cut(n.right, total, best);
    best[0] = Math.max(best[0], s * (total - s));
    return s;
}
```

| Approach | Time | Space |
|---|---|---|
| Store subtree sums | O(n) | O(n) |
| Two passes, no storage | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> The product reaches about 6e16 on the largest inputs: far above `int`, still inside `long`. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why not take the modulo before comparing?</summary>

Modded values no longer preserve the order of the true products.

</details>


## Connected
- [Binary Tree Tilt](Binary%20Tree%20Tilt.md)
