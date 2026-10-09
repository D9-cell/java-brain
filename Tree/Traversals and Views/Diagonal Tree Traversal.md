---
topic: Traversals and Views
pattern: [Diagonal number, Right-chain walk]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Diagonal Tree Traversal

> [!TIP]
> **🧠 Memory hook**
> Slide down every slanted **/ line**: going left starts a new diagonal, going right stays on it.
> **Mantra: LEFT = NEXT DIAGONAL, RIGHT = SAME**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=7) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Print the nodes of each diagonal (lines with slope −1), from the top-right diagonal to the bottom-left one.

## Key insight
Diagonal number: left child +1, right child +0. The queue-only version follows the right chain of each queued node and queues the left children it meets.

## Approach 1: DFS + map
```java
// DFS where a left child starts the next diagonal and a right child stays on the same one
public List<List<Integer>> diagonalMap(TreeNode root) {
    TreeMap<Integer, List<Integer>> map = new TreeMap<>();
    fill(root, 0, map);
    return new ArrayList<>(map.values());
}

// Preorder walk that appends to the diagonal list
private void fill(TreeNode n, int d, TreeMap<Integer, List<Integer>> map) {
    if (n == null) return;
    map.computeIfAbsent(d, k -> new ArrayList<>()).add(n.val);
    fill(n.left, d + 1, map);
    fill(n.right, d, map);
}
```

## Approach 2: BFS + map + parallel queue
```java
// Level-order walk carrying the diagonal number in a parallel queue
public List<List<Integer>> diagonalMapQueue(TreeNode root) {
    TreeMap<Integer, List<Integer>> map = new TreeMap<>();
    if (root == null) return new ArrayList<>();
    Queue<TreeNode> nodes = new LinkedList<>();
    Queue<Integer> dist = new LinkedList<>();
    nodes.add(root);
    dist.add(0);
    while (!nodes.isEmpty()) {
        TreeNode cur = nodes.poll();
        int d = dist.poll();
        map.computeIfAbsent(d, k -> new ArrayList<>()).add(cur.val);
        if (cur.left != null) { nodes.add(cur.left); dist.add(d + 1); }
        if (cur.right != null) { nodes.add(cur.right); dist.add(d); }
    }
    return new ArrayList<>(map.values());
}
```

## Approach 3: Queue only, right chains
```java
// Only a queue: follow the right chain of each queued node and queue the left children met on the way
public List<List<Integer>> diagonalOnlyQueue(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        List<Integer> line = new ArrayList<>();
        for (int size = q.size(); size > 0; size--) {
            for (TreeNode cur = q.poll(); cur != null; cur = cur.right) {
                line.add(cur.val);
                if (cur.left != null) q.add(cur.left);
            }
        }
        res.add(line);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS + map | O(n log n) | O(n) |
| BFS + map + parallel queue | O(n log n) | O(n) |
| Queue only, right chains | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Order inside one diagonal can differ between approaches; the same nodes land on each diagonal. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why no map in the queue-only version?</summary>

One loop round empties exactly one diagonal, so the round number is the diagonal number.

</details>


## Connected
- [Vertical Tree Traversal](Vertical%20Tree%20Traversal.md)
