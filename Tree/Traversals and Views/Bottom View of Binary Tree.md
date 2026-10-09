---
topic: Traversals and Views
pattern: [Column map, BFS with horizontal distance]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Bottom View of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Look from below: for each column you see the **deepest** node.
> **Mantra: BFS + COLUMN, LAST WINS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=3) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the nodes visible from the bottom, from the leftmost column to the rightmost.

## Key insight
Same walk as the top view but `put` overwrites, so the last node reached in each column survives.

## Approach: BFS + TreeMap
```java
// Level-order walk with horizontal distance; the last node seen in a column is at the bottom
public List<Integer> bottomView(TreeNode root) {
    TreeMap<Integer, Integer> col = new TreeMap<>();
    if (root == null) return new ArrayList<>();
    Queue<TreeNode> nodes = new LinkedList<>();
    Queue<Integer> dist = new LinkedList<>();
    nodes.add(root);
    dist.add(0);
    while (!nodes.isEmpty()) {
        TreeNode cur = nodes.poll();
        int d = dist.poll();
        col.put(d, cur.val);
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
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Difference from the top view in one word?</summary>

`put` instead of `putIfAbsent`.

</details>


<details><summary>Two nodes at the same depth and column?</summary>

The right one is polled later and wins.

</details>


## Connected
- [Top View of Binary Tree](Top%20View%20of%20Binary%20Tree.md)
