---
topic: Traversals and Views
pattern: [Level splice, Stop at depth − 1]
source: LeetCode 623
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Add One Row to Tree

> [!TIP]
> **🧠 Memory hook**
> Slip a new row **between** two rows by rewiring the parents of the old row.
> **Mantra: AT DEPTH−1: NEW KIDS TAKE OLD KIDS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=24) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Insert a row of nodes with value `val` at the given depth.

## Key insight
At depth − 1 give every node a new left child that adopts the old left subtree and a new right child that adopts the old right subtree. Depth 1 makes a new root.

## Approach 1: DFS
```java
// Recursion: at depth - 1 hang the new nodes between the parent and its old children
public TreeNode addOneRow(TreeNode root, int val, int depth) {
    if (depth == 1) return new TreeNode(val, root, null);
    dfs(root, val, depth, 1);
    return root;
}

// Walks to depth - 1 and splices a new left and right node under every node there
private void dfs(TreeNode n, int val, int depth, int cur) {
    if (n == null) return;
    if (cur == depth - 1) {
        n.left = new TreeNode(val, n.left, null);
        n.right = new TreeNode(val, null, n.right);
        return;
    }
    dfs(n.left, val, depth, cur + 1);
    dfs(n.right, val, depth, cur + 1);
}
```

## Approach 2: BFS
```java
// Level-order scan stopping at the level above the insertion row
public TreeNode addOneRowBfs(TreeNode root, int val, int depth) {
    if (depth == 1) return new TreeNode(val, root, null);
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    for (int level = 1; level < depth - 1; level++) {
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
    }
    for (TreeNode cur : q) {
        cur.left = new TreeNode(val, cur.left, null);
        cur.right = new TreeNode(val, null, cur.right);
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n) | O(h) |
| BFS | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Special case?</summary>

depth == 1: the old tree becomes the left child of the new root.

</details>


## Connected
- [Reverse Odd Levels of Binary Tree](Reverse%20Odd%20Levels%20of%20Binary%20Tree.md)
