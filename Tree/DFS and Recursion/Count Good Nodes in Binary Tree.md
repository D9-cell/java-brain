---
topic: DFS and Recursion
pattern: [Top-down state, Path maximum]
source: LeetCode 1448
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Count Good Nodes in Binary Tree

> [!TIP]
> **🧠 Memory hook**
> A good node is the **tallest person on the walk from the root**.
> **Mantra: CARRY MAX SO FAR, NODE >= MAX → GOOD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=9) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
A node is good if no node on the path from the root to it has a larger value. Count the good nodes.

## Key insight
Pass the maximum seen so far. A node whose value is at least that maximum is good; the maximum becomes `max(max, val)`.

## Approach: Top-down max
```java
// A node is good when no ancestor on the path from the root is larger; carry the path maximum down
public int goodNodes(TreeNode root) { return dfs(root, Integer.MIN_VALUE); }

// Counts good nodes in the subtree given the maximum seen above it
private int dfs(TreeNode n, int max) {
    if (n == null) return 0;
    int here = n.val >= max ? 1 : 0;
    max = Math.max(max, n.val);
    return here + dfs(n.left, max) + dfs(n.right, max);
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down max | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Is the root always good?</summary>

Yes, the path has only itself.

</details>


## Connected
- [Maximum Difference Between Node and Ancestor](Maximum%20Difference%20Between%20Node%20and%20Ancestor.md)
