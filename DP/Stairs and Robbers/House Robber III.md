---
topic: Stairs and Robbers
pattern: [Take or skip on a tree, Pair per node]
source: LeetCode 337
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# House Robber III

> [!TIP]
> **🧠 Memory hook**
> On a tree, a robbed node blocks its **children**, so each node reports `{robbed, skipped}`.
> **Mantra: ROB: val + children skipped; SKIP: max of each child**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=6) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Houses form a binary tree; robbing a node alerts its direct children. Return the maximum money.

## Key insight
Post-order DP: for node n, `robbed = n.val + skipped(left) + skipped(right)` and `skipped = max(l) + max(r)`. The answer is the better value at the root. A memo on `rob(node)` using grandchildren is the same idea.

## Approach 1: Pair per node
```java
// Each node returns {best if it is robbed, best if it is not robbed}
public int rob(TreeNode root) {
    int[] r = dfs(root);
    return Math.max(r[0], r[1]);
}

// {robbed, skipped} for the subtree
private int[] dfs(TreeNode n) {
    if (n == null) return new int[]{0, 0};
    int[] l = dfs(n.left), r = dfs(n.right);
    int robbed = n.val + l[1] + r[1];
    int skipped = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
    return new int[]{robbed, skipped};
}
```

## Approach 2: Memo with grandchildren
```java
// Memoised version on the node: rob(node) = max(val + grandchildren, children)
public int robMemo(TreeNode root) { return go(root, new HashMap<>()); }

// Best for the subtree rooted at n
private int go(TreeNode n, Map<TreeNode, Integer> memo) {
    if (n == null) return 0;
    if (memo.containsKey(n)) return memo.get(n);
    int take = n.val;
    if (n.left != null) take += go(n.left.left, memo) + go(n.left.right, memo);
    if (n.right != null) take += go(n.right.left, memo) + go(n.right.right, memo);
    int res = Math.max(take, go(n.left, memo) + go(n.right, memo));
    memo.put(n, res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Pair per node | O(n) | O(h) |
| Memo with grandchildren | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why is plain recursion exponential?</summary>

Without memo the grandchildren are visited from several parents.

</details>


## Connected
- [House Robber](House%20Robber.md)
- [Binary Tree Cameras](../../Tree/DFS%20and%20Recursion/Binary%20Tree%20Cameras.md)
