---
topic: DFS and Recursion
pattern: [Backtracking, Prefix from the root]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Paths from Root with a Specified Sum

> [!TIP]
> **🧠 Memory hook**
> Not only leaves: **any prefix of a root-down path** may match.
> **Mantra: RECORD WHEN SUM == TARGET, KEEP GOING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=16) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return all paths that start at the root, go downward, may stop at any node, and add up to the target.

## Key insight
Same backtracking as Path Sum II, but record at every node whose running sum equals the target and keep recursing because later negative values can reach the target again.

## Approach: Backtracking
```java
// Every root-down path (it may stop at any node) whose values add up to the target
public List<List<Integer>> pathsWithSum(TreeNode root, int target) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(root, target, 0, new ArrayList<>(), res);
    return res;
}

// Records the path whenever the running sum equals the target and keeps going, since later negatives can fix it again
private void dfs(TreeNode n, int target, int sum, List<Integer> path, List<List<Integer>> res) {
    if (n == null) return;
    sum += n.val;
    path.add(n.val);
    if (sum == target) res.add(new ArrayList<>(path));
    dfs(n.left, target, sum, path, res);
    dfs(n.right, target, sum, path, res);
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
<details><summary>Why not stop after a match?</summary>

With negative values a longer path may match as well.

</details>


## Connected
- [Path Sum II](Path%20Sum%20II.md)
