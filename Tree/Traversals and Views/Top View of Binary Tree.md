---
topic: Traversals and Views
pattern: [Column map, BFS with horizontal distance]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Top View of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Look from above: for each **column** you see the node nearest the root.
> **Mantra: BFS + COLUMN, FIRST WINS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=2) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the nodes visible from the top, from the leftmost column to the rightmost.

## Key insight
Left child is column − 1, right child is column + 1. A level-order walk reaches the shallowest node of a column first, so `putIfAbsent` keeps the right one.

## Approach: BFS + TreeMap
```java
// Level-order walk with horizontal distance; the first node seen in a column is on top
public List<Integer> topView(TreeNode root) {
    TreeMap<Integer, Integer> col = new TreeMap<>();
    if (root == null) return new ArrayList<>();
    Queue<TreeNode> nodes = new LinkedList<>();
    Queue<Integer> dist = new LinkedList<>();
    nodes.add(root);
    dist.add(0);
    while (!nodes.isEmpty()) {
        TreeNode cur = nodes.poll();
        int d = dist.poll();
        col.putIfAbsent(d, cur.val);
        if (cur.left != null) { nodes.add(cur.left); dist.add(d - 1); }
        if (cur.right != null) { nodes.add(cur.right); dist.add(d + 1); }
    }
    return new ArrayList<>(col.values());
}
```

| Approach | Time | Space |
|---|---|---|
| BFS + TreeMap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Two nodes in the same column and row: BFS visits the left one first and keeps it. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why BFS and not DFS?</summary>

DFS may meet a deeper node of a column before the shallower one.

</details>


<details><summary>Why TreeMap?</summary>

It returns the columns already sorted left to right.

</details>


## Connected
- [Bottom View of Binary Tree](Bottom%20View%20of%20Binary%20Tree.md)
- [Vertical Tree Traversal](Vertical%20Tree%20Traversal.md)
