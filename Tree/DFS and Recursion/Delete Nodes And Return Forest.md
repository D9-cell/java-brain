---
topic: DFS and Recursion
pattern: [Rebuild by returning a node, Forest roots]
source: LeetCode 1110
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Delete Nodes And Return Forest

> [!TIP]
> **🧠 Memory hook**
> Cut a node and its **orphaned children become new trees**.
> **Mantra: DELETED NODE RETURNS null, CHILDREN BECOME ROOTS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=23) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Delete the nodes with values in `toDelete` and return the roots of the remaining trees.

## Key insight
Post-order: after handling the children, a deleted node adds its surviving children to the forest and returns `null` to its parent. The original root joins the forest if it survives.

## Approach 1: Post-order
```java
// Post-order: a deleted node returns null to its parent and hands its surviving children over as new roots
public List<TreeNode> delNodes(TreeNode root, int[] toDelete) {
    Set<Integer> del = new HashSet<>();
    for (int v : toDelete) del.add(v);
    List<TreeNode> forest = new ArrayList<>();
    if (dfs(root, del, forest) != null) forest.add(root);
    return forest;
}

// Returns the node itself when it stays, null when it is deleted
private TreeNode dfs(TreeNode n, Set<Integer> del, List<TreeNode> forest) {
    if (n == null) return null;
    n.left = dfs(n.left, del, forest);
    n.right = dfs(n.right, del, forest);
    if (!del.contains(n.val)) return n;
    if (n.left != null) forest.add(n.left);
    if (n.right != null) forest.add(n.right);
    return null;
}
```

## Approach 2: Pre-order with a root flag
```java
// Pre-order version: a node becomes a root when its parent was deleted
public List<TreeNode> delNodesTopDown(TreeNode root, int[] toDelete) {
    Set<Integer> del = new HashSet<>();
    for (int v : toDelete) del.add(v);
    List<TreeNode> forest = new ArrayList<>();
    down(root, true, del, forest);
    return forest;
}

// Returns null when n is deleted; otherwise keeps it and, if its parent was deleted, makes it a root
private TreeNode down(TreeNode n, boolean isRoot, Set<Integer> del, List<TreeNode> forest) {
    if (n == null) return null;
    boolean deleted = del.contains(n.val);
    if (isRoot && !deleted) forest.add(n);
    n.left = down(n.left, deleted, del, forest);
    n.right = down(n.right, deleted, del, forest);
    return deleted ? null : n;
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order | O(n) | O(h) |
| Pre-order with a root flag | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>How does a child know it is a root?</summary>

Its parent was deleted: pass `deleted` as the `isRoot` flag.

</details>


## Connected
- [Delete Leaves With a Given Value](Delete%20Leaves%20With%20a%20Given%20Value.md)
