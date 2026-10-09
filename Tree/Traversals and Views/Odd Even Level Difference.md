---
topic: Traversals and Views
pattern: [Level parity, Signed sum]
source: GeeksforGeeks
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Odd Even Level Difference

> [!TIP]
> **🧠 Memory hook**
> Two buckets: **odd rows** and **even rows**. Return odd − even.
> **Mantra: ODD LEVELS − EVEN LEVELS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=25) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the sum of nodes on odd levels minus the sum of nodes on even levels (root is level 1).

## Key insight
Either keep two sums indexed by `level % 2`, or flip a sign each BFS level and add.

## Approach 1: DFS with two buckets
```java
// DFS adding each value to the odd or even bucket by level (root is level 1)
public int levelDiff(TreeNode root) {
    int[] sum = new int[2];
    dfs(root, 1, sum);
    return sum[1] - sum[0];
}

// Level 1 goes to bucket 1, level 2 to bucket 0, and so on
private void dfs(TreeNode n, int level, int[] sum) {
    if (n == null) return;
    sum[level % 2] += n.val;
    dfs(n.left, level + 1, sum);
    dfs(n.right, level + 1, sum);
}
```

## Approach 2: BFS with a flipping sign
```java
// Level-order scan that flips the sign every level
public int levelDiffBfs(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    int diff = 0, sign = 1;
    while (!q.isEmpty()) {
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            diff += sign * cur.val;
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
        sign = -sign;
    }
    return diff;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with two buckets | O(n) | O(h) |
| BFS with a flipping sign | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Is the root level odd or even?</summary>

Odd (level 1).

</details>


## Connected
- [Maximum Level Sum of a Binary Tree](Maximum%20Level%20Sum%20of%20a%20Binary%20Tree.md)
