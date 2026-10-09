---
topic: Traversals and Views
pattern: [Heap indexing, Level scan]
source: LeetCode 662
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Width of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Pretend the tree is stored in an **array heap**: children of `i` live at `2i` and `2i+1`.
> **Mantra: INDEX CHILDREN, WIDTH = LAST − FIRST + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=16) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Width of a level is the distance between its leftmost and rightmost non-null nodes, counting the nulls between them.

## Key insight
Give every node its heap index. Within a level the width is `last - first + 1`. Subtract the first index of the level so numbers do not overflow in skewed trees.

## Approach 1: BFS with normalised indexes
```java
// Level-order scan with heap-style indexes; each level subtracts its first index so numbers stay small
public int widthOfBinaryTree(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> nodes = new LinkedList<>();
    Queue<Long> idx = new LinkedList<>();
    nodes.add(root);
    idx.add(0L);
    long best = 0;
    while (!nodes.isEmpty()) {
        long first = idx.peek(), last = first;
        for (int i = nodes.size(); i > 0; i--) {
            TreeNode cur = nodes.poll();
            long id = idx.poll() - first;
            last = id;
            if (cur.left != null) { nodes.add(cur.left); idx.add(2 * id); }
            if (cur.right != null) { nodes.add(cur.right); idx.add(2 * id + 1); }
        }
        best = Math.max(best, last + 1);
    }
    return (int) best;
}
```

## Approach 2: DFS with first index per depth
```java
// DFS remembering the index of the first node seen on every depth
public int widthOfBinaryTreeDfs(TreeNode root) {
    return (int) dfs(root, 0, 0, new ArrayList<>());
}

// Returns the widest level in the subtree; child indexes are measured from the first node of their parent level
private long dfs(TreeNode n, int depth, long id, List<Long> firstAt) {
    if (n == null) return 0;
    if (depth == firstAt.size()) firstAt.add(id);
    long base = firstAt.get(depth), here = id - base + 1;
    long l = dfs(n.left, depth + 1, 2 * (id - base), firstAt);
    long r = dfs(n.right, depth + 1, 2 * (id - base) + 1, firstAt);
    return Math.max(here, Math.max(l, r));
}
```

| Approach | Time | Space |
|---|---|---|
| BFS with normalised indexes | O(n) | O(w) |
| DFS with first index per depth | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Raw heap indexes overflow `long` after about 63 levels. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What overflows without normalising?</summary>

A skewed tree of depth 1000 would need indexes near 2^1000.

</details>


## Connected
- [Check Completeness of a Binary Tree](Check%20Completeness%20of%20a%20Binary%20Tree.md)
