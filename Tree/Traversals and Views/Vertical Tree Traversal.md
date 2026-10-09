---
topic: Traversals and Views
pattern: [Column map, BFS with horizontal distance]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Vertical Tree Traversal

> [!TIP]
> **🧠 Memory hook**
> Drop a plumb line through the tree and read each **column** top to bottom.
> **Mantra: COLUMN NUMBERS, BFS KEEPS THE ORDER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=5) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Print the nodes column by column from left to right.

## Key insight
Number the columns (left −1, right +1) and group. BFS keeps top-to-bottom order automatically; a DFS keeps preorder inside a column.

## Approach 1: BFS + TreeMap
```java
// BFS with column numbers, so nodes of one column come out top to bottom and left to right
public List<List<Integer>> verticalBfs(TreeNode root) {
    TreeMap<Integer, List<Integer>> col = new TreeMap<>();
    if (root == null) return new ArrayList<>();
    Queue<TreeNode> nodes = new LinkedList<>();
    Queue<Integer> dist = new LinkedList<>();
    nodes.add(root);
    dist.add(0);
    while (!nodes.isEmpty()) {
        TreeNode cur = nodes.poll();
        int d = dist.poll();
        col.computeIfAbsent(d, k -> new ArrayList<>()).add(cur.val);
        if (cur.left != null) { nodes.add(cur.left); dist.add(d - 1); }
        if (cur.right != null) { nodes.add(cur.right); dist.add(d + 1); }
    }
    return new ArrayList<>(col.values());
}
```

## Approach 2: DFS + TreeMap
```java
// DFS with a sorted map of columns; nodes in one column appear in preorder
public List<List<Integer>> verticalDfsMap(TreeNode root) {
    TreeMap<Integer, List<Integer>> col = new TreeMap<>();
    fill(root, 0, col);
    return new ArrayList<>(col.values());
}

// Preorder walk that appends each node to the list of its column
private void fill(TreeNode n, int c, TreeMap<Integer, List<Integer>> col) {
    if (n == null) return;
    col.computeIfAbsent(c, k -> new ArrayList<>()).add(n.val);
    fill(n.left, c - 1, col);
    fill(n.right, c + 1, col);
}
```

## Approach 3: No map: rescan per column
```java
// No map: find the column range once, then rescan the tree for every column
public List<List<Integer>> verticalNoMap(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    int[] range = {0, 0};
    bounds(root, 0, range);
    for (int c = range[0]; c <= range[1]; c++) {
        List<Integer> line = new ArrayList<>();
        collect(root, 0, c, line);
        res.add(line);
    }
    return res;
}

// Finds the leftmost and rightmost column numbers
private void bounds(TreeNode n, int c, int[] range) {
    if (n == null) return;
    range[0] = Math.min(range[0], c);
    range[1] = Math.max(range[1], c);
    bounds(n.left, c - 1, range);
    bounds(n.right, c + 1, range);
}

// Preorder walk that keeps only the nodes sitting in column target
private void collect(TreeNode n, int c, int target, List<Integer> line) {
    if (n == null) return;
    if (c == target) line.add(n.val);
    collect(n.left, c - 1, target, line);
    collect(n.right, c + 1, target, line);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS + TreeMap | O(n log n) | O(n) |
| DFS + TreeMap | O(n log n) | O(n) |
| No map: rescan per column | O(n · w) | O(h) |

> [!WARNING]
> **Java gotcha**
> The DFS versions order nodes of one column by preorder, not by level. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Which approach is safe when order inside a column matters?</summary>

BFS. The DFS versions give preorder, which can put a deeper node first.

</details>


<details><summary>Cost of the no-map version?</summary>

One full scan per column, so O(n · width).

</details>


## Connected
- [Vertical Order Traversal of a Binary Tree](Vertical%20Order%20Traversal%20of%20a%20Binary%20Tree.md)
- [Top View of Binary Tree](Top%20View%20of%20Binary%20Tree.md)
