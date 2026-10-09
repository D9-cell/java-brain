---
topic: DFS and Recursion
pattern: [Height grouping, Post-order]
source: LeetCode 366
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Leaves Of Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Peel the tree **like an onion**: round `h` removes the nodes of height `h`.
> **Mantra: GROUP BY HEIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=24) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Collect the leaves, remove them, and repeat until the tree is empty. Return the leaves of every round.

## Key insight
A node is removed in the round equal to its height (a leaf has height 0). One post-order pass puts each value in the list for its height.

## Approach 1: Height grouping
```java
// A node is removed in the round equal to its height, so group values by height
public List<List<Integer>> findLeaves(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    height(root, res);
    return res;
}

// Height of n (leaf = 0); the value joins the list of its height
private int height(TreeNode n, List<List<Integer>> res) {
    if (n == null) return -1;
    int h = 1 + Math.max(height(n.left, res), height(n.right, res));
    if (h == res.size()) res.add(new ArrayList<>());
    res.get(h).add(n.val);
    return h;
}
```

## Approach 2: Literal simulation
```java
// Literal simulation: strip all leaves, repeat
public List<List<Integer>> findLeavesSimulation(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    while (root != null) {
        List<Integer> round = new ArrayList<>();
        root = strip(root, round);
        res.add(round);
    }
    return res;
}

// Removes the current leaves below n and records them left to right
private TreeNode strip(TreeNode n, List<Integer> round) {
    if (n == null) return null;
    if (n.left == null && n.right == null) { round.add(n.val); return null; }
    n.left = strip(n.left, round);
    n.right = strip(n.right, round);
    return n;
}
```

| Approach | Time | Space |
|---|---|---|
| Height grouping | O(n) | O(h) |
| Literal simulation | O(n · h) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `1 + max(left, right)`?</summary>

A node leaves after both of its subtrees are gone, i.e. after the taller one.

</details>


## Connected
- [Delete Leaves With a Given Value](Delete%20Leaves%20With%20a%20Given%20Value.md)
- [Diameter of Binary Tree](Diameter%20of%20Binary%20Tree.md)
