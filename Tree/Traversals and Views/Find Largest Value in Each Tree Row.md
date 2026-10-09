---
topic: Traversals and Views
pattern: [Level scan, Per-level aggregate]
source: LeetCode 515
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Largest Value in Each Tree Row

> [!TIP]
> **🧠 Memory hook**
> One **scoreboard slot per row**, always keeping the biggest.
> **Mantra: ONE SLOT PER LEVEL, KEEP THE MAX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=12) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the largest value of every row.

## Key insight
BFS by levels with a running max, or DFS that grows a list when a new depth appears and updates `max` in place.

## Approach 1: BFS
```java
// Level-order scan keeping the maximum of every level
public List<Integer> largestValuesBfs(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        int max = Integer.MIN_VALUE;
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            max = Math.max(max, cur.val);
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
        res.add(max);
    }
    return res;
}
```

## Approach 2: DFS
```java
// DFS that updates the maximum of the level it is standing on
public List<Integer> largestValuesDfs(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    dfs(root, 0, res);
    return res;
}

// Adds a slot the first time a depth appears, then keeps the larger value
private void dfs(TreeNode n, int depth, List<Integer> res) {
    if (n == null) return;
    if (depth == res.size()) res.add(n.val); else res.set(depth, Math.max(res.get(depth), n.val));
    dfs(n.left, depth + 1, res);
    dfs(n.right, depth + 1, res);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n) | O(w) |
| DFS | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Initial value of the running max?</summary>

`Integer.MIN_VALUE` because values can be negative.

</details>


## Connected
- [Maximum Level Sum of a Binary Tree](Maximum%20Level%20Sum%20of%20a%20Binary%20Tree.md)
