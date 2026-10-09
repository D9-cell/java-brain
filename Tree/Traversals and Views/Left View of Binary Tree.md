---
topic: Traversals and Views
pattern: [Level scan (first of level), Depth-first, left first]
source: GeeksforGeeks
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Left View of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Mirror image of the right view: you see the **leftmost** node per depth.
> **Mantra: FIRST OF EVERY LEVEL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=1) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the nodes visible when looking at the tree from the left.

## Key insight
Visit left before right and record the first node of every new depth, or take the first node of each BFS level.

## Approach 1: DFS, left first
```java
// Left-first DFS where the first node reaching a new depth is the visible one
public List<Integer> leftViewDfs(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    dfs(root, 0, res);
    return res;
}

// Visits left before right and records a value when the depth is seen for the first time
private void dfs(TreeNode node, int depth, List<Integer> res) {
    if (node == null) return;
    if (depth == res.size()) res.add(node.val);
    dfs(node.left, depth + 1, res);
    dfs(node.right, depth + 1, res);
}
```

## Approach 2: BFS, first of level
```java
// Level-order scan keeping the first node of every level
public List<Integer> leftViewBfs(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode cur = q.poll();
            if (i == 0) res.add(cur.val);
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS, left first | O(n) | O(h) |
| BFS, first of level | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Which side must DFS visit first?</summary>

Left, so the first node per depth is the leftmost.

</details>


## Connected
- [Binary Tree Right Side View](Binary%20Tree%20Right%20Side%20View.md)
