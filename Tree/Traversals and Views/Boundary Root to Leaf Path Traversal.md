---
topic: Traversals and Views
pattern: [Backtracking paths, Two-ended print]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Boundary Root to Leaf Path Traversal

> [!TIP]
> **🧠 Memory hook**
> List every root-to-leaf path, then read them **from both ends toward the middle**.
> **Mantra: ALL PATHS, FIRST FORWARD, LAST BACKWARD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=9) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Print the root-to-leaf paths so the first path is forward, the last path is printed leaf to root, then the second, the second to last, and so on.

## Key insight
A left-to-right DFS lists the paths in order. Two pointers walk in from both ends: the left one prints forward, the right one prints reversed.

## Approach: DFS paths + two pointers
```java
// Lists all root-to-leaf paths, then prints them outside-in: first path forward, last path reversed, and so on
public List<List<Integer>> boundaryPaths(TreeNode root) {
    List<List<Integer>> paths = new ArrayList<>();
    collect(root, new ArrayList<>(), paths);
    List<List<Integer>> res = new ArrayList<>();
    int lo = 0, hi = paths.size() - 1;
    while (lo < hi) {
        res.add(paths.get(lo++));
        List<Integer> back = new ArrayList<>(paths.get(hi--));
        Collections.reverse(back);
        res.add(back);
    }
    if (lo == hi) res.add(paths.get(lo));
    return res;
}

// Backtracking DFS that stores a copy of the current path at every leaf
private void collect(TreeNode n, List<Integer> cur, List<List<Integer>> paths) {
    if (n == null) return;
    cur.add(n.val);
    if (n.left == null && n.right == null) paths.add(new ArrayList<>(cur));
    collect(n.left, cur, paths);
    collect(n.right, cur, paths);
    cur.remove(cur.size() - 1);
}
```

| Approach | Time | Space |
|---|---|---|
| DFS paths + two pointers | O(n · h) | O(n · h) |

## Recall before you reveal
<details><summary>Which path is printed in the middle?</summary>

With an odd number of paths, the one left when both pointers meet.

</details>


## Connected
- [Boundary Traversal of Binary Tree](Boundary%20Traversal%20of%20Binary%20Tree.md)
- [Path Sum II](../DFS%20and%20Recursion/Path%20Sum%20II.md)
