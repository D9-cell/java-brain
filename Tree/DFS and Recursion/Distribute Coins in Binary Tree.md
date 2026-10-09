---
topic: DFS and Recursion
pattern: [Bottom-up combine, Flow across each edge]
source: LeetCode 979
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Distribute Coins in Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Every edge carries the **surplus or deficit** of the subtree below it.
> **Mantra: EDGE COST = |COINS − NODES| OF SUBTREE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=4) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Each move shifts one coin between adjacent nodes. Return the minimum moves so every node holds exactly one coin.

## Key insight
A subtree with `c` coins and `n` nodes must send out `c - n` coins (or receive `n - c`) through its parent edge. Add the absolute values of that flow over all edges.

## Approach: Post-order excess
```java
// Each edge carries |coins in subtree - nodes in subtree| coins; add them all up
public int distributeCoins(TreeNode root) {
    int[] moves = {0};
    excess(root, moves);
    return moves[0];
}

// Returns coins minus nodes of the subtree, which is the net flow over the edge to the parent
private int excess(TreeNode n, int[] moves) {
    if (n == null) return 0;
    int l = excess(n.left, moves), r = excess(n.right, moves);
    moves[0] += Math.abs(l) + Math.abs(r);
    return n.val + l + r - 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order excess | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Checked against a breadth-first search over coin arrangements. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why can the flows be added independently?</summary>

Each edge must carry exactly that net amount, whatever route the coins take.

</details>


## Connected
- [Binary Tree Tilt](Binary%20Tree%20Tilt.md)
