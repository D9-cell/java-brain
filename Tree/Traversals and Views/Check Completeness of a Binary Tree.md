---
topic: Traversals and Views
pattern: [Level scan with nulls, Heap index]
source: LeetCode 958
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Check Completeness of a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> A complete tree fills every row from the left. After the first **gap** nothing may appear.
> **Mantra: FIRST NULL, THEN NO MORE NODES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=17) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return true if every level except possibly the last is full and the last level is filled from the left.

## Key insight
BFS and enqueue nulls too. Once a null has been seen, any later real node breaks completeness. Or compare each heap index with the node count.

## Approach 1: BFS with nulls
```java
// Level-order scan: once a null shows up, no real node may follow
public boolean isCompleteTree(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    boolean seenNull = false;
    while (!q.isEmpty()) {
        TreeNode cur = q.poll();
        if (cur == null) { seenNull = true; continue; }
        if (seenNull) return false;
        q.add(cur.left);
        q.add(cur.right);
    }
    return true;
}
```

## Approach 2: Heap index <= n
```java
// DFS check: a complete tree with n nodes never has a node whose heap index is >= n
public boolean isCompleteTreeIndex(TreeNode root) {
    return fits(root, 1, count(root));
}

// Counts the nodes
private int count(TreeNode n) { return n == null ? 0 : 1 + count(n.left) + count(n.right); }

// Every node must sit at a heap index not larger than the node count
private boolean fits(TreeNode n, int i, int total) {
    if (n == null) return true;
    return i <= total && fits(n.left, 2 * i, total) && fits(n.right, 2 * i + 1, total);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS with nulls | O(n) | O(w) |
| Heap index <= n | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> `LinkedList` accepts nulls, `ArrayDeque` does not. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why queue null children?</summary>

They mark exactly where the first gap is.

</details>


## Connected
- [Count Complete Tree Nodes](Count%20Complete%20Tree%20Nodes.md)
- [Maximum Width of Binary Tree](Maximum%20Width%20of%20Binary%20Tree.md)
