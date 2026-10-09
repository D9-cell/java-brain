---
topic: LCA Distance and Tree Graphs
pattern: [LCA path as letters]
source: LeetCode 2096
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Step-By-Step Directions From a Binary Tree Node to Another

> [!TIP]
> **🧠 Memory hook**
> The route is **U moves up to the meeting point, then L/R moves down**.
> **Mantra: ROOT PATHS, CUT COMMON PREFIX, U FOR THE REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=6) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return the shortest path from `startValue` to `destValue` as a string of L, R and U moves.

## Key insight
Build the root-to-node path of each as a string of L/R. Remove the common prefix; every remaining letter of the start path becomes U, then append the rest of the destination path.

## Approach 1: Root paths
```java
// Root paths as L/R strings; drop the common prefix, turn the rest of the start path into U and keep the rest of the destination path
public String getDirections(TreeNode root, int startValue, int destValue) {
    StringBuilder s = new StringBuilder(), d = new StringBuilder();
    path(root, startValue, s);
    path(root, destValue, d);
    s.reverse();
    d.reverse();
    int c = 0;
    while (c < s.length() && c < d.length() && s.charAt(c) == d.charAt(c)) c++;
    return "U".repeat(s.length() - c) + d.substring(c);
}

// Builds the path from the target up to the root (reversed by the caller)
private boolean path(TreeNode n, int v, StringBuilder sb) {
    if (n == null) return false;
    if (n.val == v) return true;
    if (path(n.left, v, sb)) { sb.append('L'); return true; }
    if (path(n.right, v, sb)) { sb.append('R'); return true; }
    return false;
}
```

## Approach 2: Search from the LCA
```java
// Finds the LCA first, then searches the two shorter paths
public String getDirectionsLca(TreeNode root, int startValue, int destValue) {
    TreeNode lca = lca(root, startValue, destValue);
    StringBuilder s = new StringBuilder(), d = new StringBuilder();
    path(lca, startValue, s);
    path(lca, destValue, d);
    return "U".repeat(s.length()) + d.reverse();
}

// Lowest common ancestor by value
private TreeNode lca(TreeNode n, int a, int b) {
    if (n == null || n.val == a || n.val == b) return n;
    TreeNode l = lca(n.left, a, b), r = lca(n.right, a, b);
    return l != null && r != null ? n : l != null ? l : r;
}
```

| Approach | Time | Space |
|---|---|---|
| Root paths | O(n) | O(h) |
| Search from the LCA | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Path strings can reach 10^5 characters, so build them with a `StringBuilder`. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why build the paths reversed?</summary>

The recursion appends a letter while unwinding, so the string is leaf-to-root and must be reversed.

</details>


## Connected
- [Min Distance between Two Given Nodes of a Binary Tree](Min%20Distance%20between%20Two%20Given%20Nodes%20of%20a%20Binary%20Tree.md)
- [Lowest Common Ancestor of a Binary Tree](Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree.md)
