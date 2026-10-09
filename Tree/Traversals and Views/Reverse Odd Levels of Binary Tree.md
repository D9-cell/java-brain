---
topic: Traversals and Views
pattern: [Mirror swap, Level scan]
source: LeetCode 2415
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Reverse Odd Levels of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> On odd rows the tree looks into a **mirror**: swap values of mirrored nodes.
> **Mantra: MIRROR PAIRS SWAP ON ODD LEVELS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=21) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Reverse the node values at every odd level of a perfect binary tree.

## Key insight
Walk two nodes together, `a.left` with `b.right` and `a.right` with `b.left`. On odd levels swap their values.

## Approach 1: Mirror DFS
```java
// Perfect tree: swap values of mirrored nodes (a.left with b.right, a.right with b.left) on every odd level
public TreeNode reverseOddLevels(TreeNode root) {
    dfs(root.left, root.right, 1);
    return root;
}

// Walks two mirror nodes down together and swaps their values on odd levels
private void dfs(TreeNode a, TreeNode b, int level) {
    if (a == null) return;
    if (level % 2 == 1) { int t = a.val; a.val = b.val; b.val = t; }
    dfs(a.left, b.right, level + 1);
    dfs(a.right, b.left, level + 1);
}
```

## Approach 2: BFS, reverse each odd row
```java
// Level-order scan that collects each odd level and rewrites its values reversed
public TreeNode reverseOddLevelsBfs(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    for (int level = 0; !q.isEmpty(); level++) {
        List<TreeNode> row = new ArrayList<>(q);
        if (level % 2 == 1) for (int i = 0, j = row.size() - 1; i < j; i++, j--) { int t = row.get(i).val; row.get(i).val = row.get(j).val; row.get(j).val = t; }
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            if (cur.left != null) { q.add(cur.left); q.add(cur.right); }
        }
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Mirror DFS | O(n) | O(h) |
| BFS, reverse each odd row | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Swap values or nodes?</summary>

Values. Swapping nodes would also move their subtrees.

</details>


## Connected
- [Perfect Binary Tree Specific Level Order Traversal](Perfect%20Binary%20Tree%20Specific%20Level%20Order%20Traversal.md)
- [Binary Tree Zigzag Level Order Traversal](Binary%20Tree%20Zigzag%20Level%20Order%20Traversal.md)
