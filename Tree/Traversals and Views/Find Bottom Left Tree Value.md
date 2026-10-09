---
topic: Traversals and Views
pattern: [Level scan, Last polled node]
source: LeetCode 513
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Bottom Left Tree Value

> [!TIP]
> **🧠 Memory hook**
> Scan each row **right to left**; the very last node you touch is the bottom-left one.
> **Mantra: BFS RIGHT→LEFT, LAST NODE WINS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=15) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the leftmost value in the last row.

## Key insight
Queue the right child before the left child. The final node polled is on the last level and furthest left.

## Approach 1: BFS, right child first
```java
// Level-order scan from right to left, so the last node polled is the bottom-left one
public int findBottomLeftValue(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    TreeNode cur = root;
    while (!q.isEmpty()) {
        cur = q.poll();
        if (cur.right != null) q.add(cur.right);
        if (cur.left != null) q.add(cur.left);
    }
    return cur.val;
}
```

## Approach 2: DFS, strictly deeper wins
```java
// DFS that takes the first node found at a new maximum depth
public int findBottomLeftValueDfs(TreeNode root) {
    int[] best = {-1, 0};
    dfs(root, 0, best);
    return best[1];
}

// Left-first walk; a strictly deeper node replaces the answer
private void dfs(TreeNode n, int depth, int[] best) {
    if (n == null) return;
    if (depth > best[0]) { best[0] = depth; best[1] = n.val; }
    dfs(n.left, depth + 1, best);
    dfs(n.right, depth + 1, best);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS, right child first | O(n) | O(w) |
| DFS, strictly deeper wins | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why must the DFS use `>` for depth?</summary>

With `>=` a later node on the same depth would replace the leftmost one.

</details>


## Connected
- [Left View of Binary Tree](Left%20View%20of%20Binary%20Tree.md)
