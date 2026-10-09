---
topic: Traversals and Views
pattern: [Column map, Sort by (col, row, value)]
source: LeetCode 987
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Vertical Order Traversal of a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Same plumb line, but two nodes sharing a cell are sorted by **value**.
> **Mantra: TRIPLES (COL, ROW, VAL), SORT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=6) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Group nodes by column; inside a column go by row, and break ties in the same row by smaller value first.

## Key insight
Collect `(col, row, val)` for every node and sort the triples. Cutting the sorted list wherever the column changes gives the answer.

## Approach 1: DFS + sort triples
```java
// Collect (column, row, value) for every node, sort all triples, then cut them into columns
public List<List<Integer>> verticalTraversal(TreeNode root) {
    List<int[]> all = new ArrayList<>();
    dfs(root, 0, 0, all);
    all.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < all.size(); i++) {
        if (i == 0 || all.get(i)[0] != all.get(i - 1)[0]) res.add(new ArrayList<>());
        res.get(res.size() - 1).add(all.get(i)[2]);
    }
    return res;
}

// Preorder walk that records {column, row, value}
private void dfs(TreeNode n, int c, int r, List<int[]> all) {
    if (n == null) return;
    all.add(new int[]{c, r, n.val});
    dfs(n.left, c - 1, r + 1, all);
    dfs(n.right, c + 1, r + 1, all);
}
```

## Approach 2: Nested sorted maps
```java
// Nested sorted maps column -> row -> min-heap, filled by a level-order walk
public List<List<Integer>> verticalTraversalMaps(TreeNode root) {
    TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map = new TreeMap<>();
    if (root == null) return new ArrayList<>();
    Queue<Object[]> q = new LinkedList<>();
    q.add(new Object[]{root, 0, 0});
    while (!q.isEmpty()) {
        Object[] cur = q.poll();
        TreeNode n = (TreeNode) cur[0];
        int c = (int) cur[1], r = (int) cur[2];
        map.computeIfAbsent(c, k -> new TreeMap<>()).computeIfAbsent(r, k -> new PriorityQueue<>()).add(n.val);
        if (n.left != null) q.add(new Object[]{n.left, c - 1, r + 1});
        if (n.right != null) q.add(new Object[]{n.right, c + 1, r + 1});
    }
    List<List<Integer>> res = new ArrayList<>();
    for (TreeMap<Integer, PriorityQueue<Integer>> rows : map.values()) {
        List<Integer> line = new ArrayList<>();
        for (PriorityQueue<Integer> pq : rows.values()) while (!pq.isEmpty()) line.add(pq.poll());
        res.add(line);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS + sort triples | O(n log n) | O(n) |
| Nested sorted maps | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is plain BFS wrong here?</summary>

Two nodes in the same row and column must be ordered by value, not by arrival order.

</details>


## Connected
- [Vertical Tree Traversal](Vertical%20Tree%20Traversal.md)
- [Top View of Binary Tree](Top%20View%20of%20Binary%20Tree.md)
