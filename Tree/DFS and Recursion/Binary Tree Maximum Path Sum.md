---
topic: DFS and Recursion
pattern: [Bottom-up combine, Return one arm, record both]
source: LeetCode 124, GeeksforGeeks
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Maximum Path Sum

> [!TIP]
> **🧠 Memory hook**
> Diameter with **weights**: take an arm only if it adds value.
> **Mantra: RETURN ONE ARM, RECORD BOTH, DROP NEGATIVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=1) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return the maximum sum of any non-empty path (it may start and end anywhere, and turns at most once).

## Key insight
Each node returns the best downward gain `val + max(left, right, 0)`. The best bent path through the node is `val + max(left,0) + max(right,0)`.

## Approach: Post-order with global best
```java
// Each node returns the best downward path starting at it; the best bent path through it is left + node + right
public int maxPathSum(TreeNode root) {
    int[] best = {Integer.MIN_VALUE};
    down(root, best);
    return best[0];
}

// Best downward gain from this node; negative branches are dropped with max(0, ...)
private int down(TreeNode n, int[] best) {
    if (n == null) return 0;
    int l = Math.max(0, down(n.left, best)), r = Math.max(0, down(n.right, best));
    best[0] = Math.max(best[0], l + r + n.val);
    return n.val + Math.max(l, r);
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order with global best | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why initialise the best with `Integer.MIN_VALUE`?</summary>

All values can be negative and the path must contain at least one node.

</details>


<details><summary>Why can the returned value use only one arm?</summary>

A path going up to the parent cannot split into both children.

</details>


## Connected
- [Diameter of Binary Tree](Diameter%20of%20Binary%20Tree.md)
- [Maximum Path Sum between 2 Leaf Nodes](Maximum%20Path%20Sum%20between%202%20Leaf%20Nodes.md)
