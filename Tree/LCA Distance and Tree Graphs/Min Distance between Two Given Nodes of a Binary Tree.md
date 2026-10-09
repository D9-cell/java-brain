---
topic: LCA Distance and Tree Graphs
pattern: [LCA distance formula]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Min Distance between Two Given Nodes of a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Walk up to the meeting point and back down: **two legs of a V**.
> **Mantra: dist = depth(a) + depth(b) − 2·depth(LCA)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=5) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return the number of edges on the shortest path between two nodes.

## Key insight
Find the LCA, then add the distance from the LCA to each node. Or compare the two root paths and drop their common prefix.

## Approach 1: LCA + depths
```java
// distance = depth(a) + depth(b) - 2 * depth(lca)
public int findDist(TreeNode root, int a, int b) {
    TreeNode lca = lca(root, a, b);
    return depth(lca, a, 0) + depth(lca, b, 0);
}

// Lowest common ancestor by value
private TreeNode lca(TreeNode n, int a, int b) {
    if (n == null) return null;
    if (n.val == a || n.val == b) return n;
    TreeNode l = lca(n.left, a, b), r = lca(n.right, a, b);
    return l != null && r != null ? n : l != null ? l : r;
}

// Edges from n down to the value, or 0 when missing
private int depth(TreeNode n, int v, int d) {
    if (n == null) return 0;
    if (n.val == v) return d;
    int l = depth(n.left, v, d + 1);
    return l != 0 ? l : depth(n.right, v, d + 1);
}
```

## Approach 2: Root paths minus common prefix
```java
// Root paths of both nodes: drop the common prefix and add what is left of each
public int findDistPaths(TreeNode root, int a, int b) {
    List<Integer> pa = new ArrayList<>(), pb = new ArrayList<>();
    path(root, a, new ArrayList<>(), pa);
    path(root, b, new ArrayList<>(), pb);
    int c = 0;
    while (c < pa.size() && c < pb.size() && pa.get(c).equals(pb.get(c))) c++;
    return pa.size() - c + pb.size() - c;
}

// Stores the root-to-value path in out
private boolean path(TreeNode n, int v, List<Integer> cur, List<Integer> out) {
    if (n == null) return false;
    cur.add(n.val);
    if (n.val == v) { out.addAll(cur); return true; }
    if (path(n.left, v, cur, out) || path(n.right, v, cur, out)) return true;
    cur.remove(cur.size() - 1);
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| LCA + depths | O(n) | O(h) |
| Root paths minus common prefix | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Distance from a node to itself?</summary>

0.

</details>


## Connected
- [Lowest Common Ancestor of a Binary Tree](Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree.md)
- [Step-By-Step Directions From a Binary Tree Node to Another](Step-By-Step%20Directions%20From%20a%20Binary%20Tree%20Node%20to%20Another.md)
