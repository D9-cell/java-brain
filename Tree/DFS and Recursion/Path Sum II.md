---
topic: DFS and Recursion
pattern: [Backtracking, Top-down state]
source: LeetCode 113
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Path Sum II

> [!TIP]
> **🧠 Memory hook**
> Same toll road, but now you **write down** every winning route.
> **Mantra: ADD, RECURSE, REMOVE; COPY AT THE LEAF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=14) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return all root-to-leaf paths whose values add up to the target.

## Key insight
Keep one shared path list: add the node, recurse, remove it again. When the leaf meets the target store a copy, not the list itself.

## Approach: Backtracking
```java
// Backtracking: keep the current path, record it at a leaf when the remaining target hits zero
public List<List<Integer>> pathSum(TreeNode root, int target) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(root, target, new ArrayList<>(), res);
    return res;
}

// Adds the node, recurses, then removes it again (backtrack)
private void dfs(TreeNode n, int remain, List<Integer> path, List<List<Integer>> res) {
    if (n == null) return;
    path.add(n.val);
    if (n.left == null && n.right == null && remain == n.val) res.add(new ArrayList<>(path));
    dfs(n.left, remain - n.val, path, res);
    dfs(n.right, remain - n.val, path, res);
    path.remove(path.size() - 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(n · h) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What bug appears if you store `path` without copying?</summary>

All results end up pointing at the same list that finally becomes empty.

</details>


## Connected
- [Path Sum](Path%20Sum.md)
- [Boundary Root to Leaf Path Traversal](../Traversals%20and%20Views/Boundary%20Root%20to%20Leaf%20Path%20Traversal.md)
