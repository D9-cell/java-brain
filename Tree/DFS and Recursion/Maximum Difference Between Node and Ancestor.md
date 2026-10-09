---
topic: DFS and Recursion
pattern: [Top-down state, Path min and max]
source: LeetCode 1026
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Difference Between Node and Ancestor

> [!TIP]
> **🧠 Memory hook**
> The best partner for a node is the **smallest or largest** value above it.
> **Mantra: CARRY MIN AND MAX, SPREAD AT THE LEAF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=11) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return the maximum |a.val − b.val| over all pairs where a is an ancestor of b.

## Key insight
Carry the minimum and maximum of the path. At a leaf the spread `max - min` of that path is a candidate. Bottom-up alternative: each node returns its subtree min and max.

## Approach 1: Top-down min / max
```java
// Top-down: carry the smallest and largest ancestor value; at a leaf the spread of the path is the candidate
public int maxAncestorDiff(TreeNode root) { return down(root, root.val, root.val); }

// Returns the best |node - ancestor| found at or below n
private int down(TreeNode n, int min, int max) {
    if (n == null) return max - min;
    min = Math.min(min, n.val);
    max = Math.max(max, n.val);
    return Math.max(down(n.left, min, max), down(n.right, min, max));
}
```

## Approach 2: Bottom-up min / max
```java
// Bottom-up: each node returns the min and max of its subtree and compares itself with both
public int maxAncestorDiffBottomUp(TreeNode root) {
    int[] best = {0};
    up(root, best);
    return best[0];
}

// Returns {min, max} of the subtree and records |val - min| and |val - max|
private int[] up(TreeNode n, int[] best) {
    int min = n.val, max = n.val;
    for (TreeNode c : new TreeNode[]{n.left, n.right}) {
        if (c == null) continue;
        int[] r = up(c, best);
        min = Math.min(min, r[0]);
        max = Math.max(max, r[1]);
    }
    best[0] = Math.max(best[0], Math.max(Math.abs(n.val - min), Math.abs(n.val - max)));
    return new int[]{min, max};
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down min / max | O(n) | O(h) |
| Bottom-up min / max | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is the leaf spread enough?</summary>

Every ancestor-descendant pair lies on some root-to-leaf path.

</details>


## Connected
- [Count Good Nodes in Binary Tree](Count%20Good%20Nodes%20in%20Binary%20Tree.md)
