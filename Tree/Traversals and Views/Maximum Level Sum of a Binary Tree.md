---
topic: Traversals and Views
pattern: [Level scan, Per-level aggregate]
source: LeetCode 1161
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Level Sum of a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Add each row and remember **which row won**.
> **Mantra: SUM PER LEVEL, SMALLEST WINNING LEVEL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=13) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the smallest level number (root is 1) with the maximum sum.

## Key insight
Compare with `>` (not `>=`) so the first level that reaches the maximum is kept.

## Approach 1: BFS
```java
// Level-order scan that remembers the smallest level with the largest sum
public int maxLevelSum(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    int best = Integer.MIN_VALUE, bestLevel = 1;
    for (int level = 1; !q.isEmpty(); level++) {
        int sum = 0;
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            sum += cur.val;
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
        if (sum > best) { best = sum; bestLevel = level; }
    }
    return bestLevel;
}
```

## Approach 2: DFS sums list
```java
// DFS filling a per-level sum list, then picking the first maximum
public int maxLevelSumDfs(TreeNode root) {
    List<Integer> sums = new ArrayList<>();
    dfs(root, 0, sums);
    int best = 0;
    for (int i = 1; i < sums.size(); i++) if (sums.get(i) > sums.get(best)) best = i;
    return best + 1;
}

// Adds the node value to the sum of its depth
private void dfs(TreeNode n, int depth, List<Integer> sums) {
    if (n == null) return;
    if (depth == sums.size()) sums.add(0);
    sums.set(depth, sums.get(depth) + n.val);
    dfs(n.left, depth + 1, sums);
    dfs(n.right, depth + 1, sums);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n) | O(w) |
| DFS sums list | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why start best at `Integer.MIN_VALUE`?</summary>

All sums can be negative.

</details>


## Connected
- [Find Largest Value in Each Tree Row](Find%20Largest%20Value%20in%20Each%20Tree%20Row.md)
