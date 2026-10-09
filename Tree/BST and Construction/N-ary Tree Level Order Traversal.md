---
topic: BST and Construction
pattern: [Level scan, Children list]
source: LeetCode 429
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# N-ary Tree Level Order Traversal

> [!TIP]
> **🧠 Memory hook**
> Binary-tree BFS where `left, right` became **`children`**.
> **Mantra: BFS BY LEVEL, addAll(children)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=20) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the level order traversal of an N-ary tree.

## Key insight
Same loop as the binary version: process `q.size()` nodes per level and enqueue all children.

## Approach 1: BFS
```java
// Level order: BFS by levels
public List<List<Integer>> levelOrder(Node root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<Node> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        List<Integer> level = new ArrayList<>();
        for (int i = q.size(); i > 0; i--) {
            Node cur = q.poll();
            level.add(cur.val);
            q.addAll(cur.children);
        }
        res.add(level);
    }
    return res;
}
```

## Approach 2: DFS with depth
```java
// Level order with DFS: the depth picks the list
public List<List<Integer>> levelOrderDfs(Node root) {
    List<List<Integer>> res = new ArrayList<>();
    fill(root, 0, res);
    return res;
}

// Appends the value to the list of its depth
private void fill(Node n, int d, List<List<Integer>> res) {
    if (n == null) return;
    if (d == res.size()) res.add(new ArrayList<>());
    res.get(d).add(n.val);
    for (Node c : n.children) fill(c, d + 1, res);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n) | O(w) |
| DFS with depth | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Difference to the binary version?</summary>

Only `q.addAll(cur.children)`.

</details>


## Connected
- [Binary Tree Zigzag Level Order Traversal](../Traversals%20and%20Views/Binary%20Tree%20Zigzag%20Level%20Order%20Traversal.md)
- [N-ary Tree Preorder Traversal](N-ary%20Tree%20Preorder%20Traversal.md)
