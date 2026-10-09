---
topic: DFS and Recursion
pattern: [Bottom-up combine, Return sum and count]
source: LeetCode 2265
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Count Nodes Equal to Average of Subtree

> [!TIP]
> **🧠 Memory hook**
> Each subtree reports **(sum, count)** so the parent can compute an average in O(1).
> **Mantra: RETURN {SUM, COUNT}, CHECK SUM / COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=10) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Count nodes whose value equals the integer average (rounded down) of their subtree.

## Key insight
Post-order returns the pair `{sum, count}`. A node matches when `sum / count == val`.

## Approach: Post-order pair
```java
// Post-order: every node returns {sum, count} of its subtree and checks sum / count == val
public int averageOfSubtree(TreeNode root) {
    int[] matches = {0};
    dfs(root, matches);
    return matches[0];
}

// Returns {sum, count}; integer division gives the rounded-down average
private int[] dfs(TreeNode n, int[] matches) {
    if (n == null) return new int[]{0, 0};
    int[] l = dfs(n.left, matches), r = dfs(n.right, matches);
    int sum = l[0] + r[0] + n.val, cnt = l[1] + r[1] + 1;
    if (sum / cnt == n.val) matches[0]++;
    return new int[]{sum, cnt};
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order pair | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Rounded down means what in Java?</summary>

Plain integer division for non-negative sums.

</details>


## Connected
- [Binary Tree Tilt](Binary%20Tree%20Tilt.md)
