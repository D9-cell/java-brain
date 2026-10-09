---
topic: LCA Distance and Tree Graphs
pattern: [Top two heights per level]
source: LeetCode 2458
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Height of Binary Tree After Subtree Removal Queries

> [!TIP]
> **🧠 Memory hook**
> On each level keep the **two tallest** subtrees; removing the tallest promotes the runner-up.
> **Mantra: DEPTH + BEST OTHER HEIGHT ON THE LEVEL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=9) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
For each query remove the subtree rooted at the given node (independently) and return the height of the remaining tree.

## Key insight
Precompute depth and subtree height for every node, and the two largest heights on every level. After removing node v at depth d the tree height is `d + (best height on that level other than v) - 1`.

## Approach: Top-two per level
```java
// Per level keep the two tallest subtrees; removing the tallest falls back to the second one
public int[] treeQueries(TreeNode root, int[] queries) {
    Map<Integer, Integer> depth = new HashMap<>(), height = new HashMap<>();
    Map<Integer, int[]> top = new HashMap<>();
    measure(root, 0, depth, height, top);
    int[] res = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        int v = queries[i], d = depth.get(v), h = height.get(v);
        int[] t = top.get(d);
        int bestOnLevel = h == t[0] ? t[1] : t[0];
        res[i] = d + bestOnLevel - 1;
    }
    return res;
}

// Returns the height in nodes of the subtree and keeps the two largest heights of every level
private int measure(TreeNode n, int d, Map<Integer, Integer> depth, Map<Integer, Integer> height, Map<Integer, int[]> top) {
    if (n == null) return 0;
    int h = 1 + Math.max(measure(n.left, d + 1, depth, height, top), measure(n.right, d + 1, depth, height, top));
    depth.put(n.val, d);
    height.put(n.val, h);
    int[] t = top.computeIfAbsent(d, k -> new int[2]);
    if (h > t[0]) { t[1] = t[0]; t[0] = h; } else if (h > t[1]) t[1] = h;
    return h;
}
```

| Approach | Time | Space |
|---|---|---|
| Top-two per level | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why only the same level?</summary>

Everything at other depths is untouched, and the deepest remaining node is either on this level or above it.

</details>


<details><summary>What if v is the only node on its level?</summary>

The second best is 0, giving height d - 1.

</details>


## Connected
- [Maximum Level Sum of a Binary Tree](../Traversals%20and%20Views/Maximum%20Level%20Sum%20of%20a%20Binary%20Tree.md)
- [Diameter of Binary Tree](../DFS%20and%20Recursion/Diameter%20of%20Binary%20Tree.md)
