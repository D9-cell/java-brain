---
topic: BST and Construction
pattern: [Depth, Max over children]
source: LeetCode 559
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Depth of N-ary Tree

> [!TIP]
> **🧠 Memory hook**
> One more than the **deepest child**.
> **Mantra: 1 + MAX(DEPTH OF CHILDREN)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=22) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the maximum depth (number of nodes on the longest root-to-leaf path).

## Key insight
DFS with a max over the children, or count BFS levels.

## Approach 1: DFS
```java
// Maximum depth, DFS
public int maxDepth(Node root) {
    if (root == null) return 0;
    int best = 0;
    for (Node c : root.children) best = Math.max(best, maxDepth(c));
    return best + 1;
}
```

## Approach 2: BFS
```java
// Maximum depth, BFS: count the levels
public int maxDepthBfs(Node root) {
    if (root == null) return 0;
    int depth = 0;
    Queue<Node> q = new LinkedList<>(List.of(root));
    while (!q.isEmpty()) {
        depth++;
        for (int i = q.size(); i > 0; i--) q.addAll(q.poll().children);
    }
    return depth;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n) | O(h) |
| BFS | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Depth of a leaf?</summary>

1; an empty tree has depth 0.

</details>


## Connected
- [Minimum Depth of Binary Tree](../Traversals%20and%20Views/Minimum%20Depth%20of%20Binary%20Tree.md)
- [N-ary Tree Level Order Traversal](N-ary%20Tree%20Level%20Order%20Traversal.md)
