---
topic: Traversals and Views
pattern: [Level scan (last of level), Depth-first, right first]
source: LeetCode 199
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Right Side View

> [!TIP]
> **🧠 Memory hook**
> Stand on the right of the tree: at each depth you see the **rightmost** node.
> **Mantra: LAST OF EVERY LEVEL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=0) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the values you can see when looking at the tree from the right side, top to bottom.

## Key insight
It is the last node of each level. DFS gets the same answer by visiting right before left and keeping the first node of each new depth.

## Approach 1: BFS, last of level
```java
// Level-order scan keeping the last node of every level
public List<Integer> rightSideViewBfs(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode cur = q.poll();
            if (i == size - 1) res.add(cur.val);
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
    }
    return res;
}
```

## Approach 2: DFS, right first
```java
// Right-first DFS where the first node reaching a new depth is the visible one
public List<Integer> rightSideViewDfs(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    dfs(root, 0, res);
    return res;
}

// Visits right before left and records a value when the depth is seen for the first time
private void dfs(TreeNode node, int depth, List<Integer> res) {
    if (node == null) return;
    if (depth == res.size()) res.add(node.val);
    dfs(node.right, depth + 1, res);
    dfs(node.left, depth + 1, res);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS, last of level | O(n) | O(w) |
| DFS, right first | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why does `depth == res.size()` mean "first time at this depth"?</summary>

Depths are discovered in order 0, 1, 2…, so the list size equals the number of depths already seen.

</details>


<details><summary>What if the left subtree is deeper?</summary>

Its extra levels still show, because no right node exists there to hide them.

</details>


## Connected
- [Left View of Binary Tree](Left%20View%20of%20Binary%20Tree.md)
- [Find Bottom Left Tree Value](Find%20Bottom%20Left%20Tree%20Value.md)
