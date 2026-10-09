---
topic: DFS and Recursion
pattern: [Bottom-up combine, Increasing and decreasing chains]
source: LeetCode 549
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Longest Consecutive Sequence II

> [!TIP]
> **🧠 Memory hook**
> A bent path is a **climb on one side joined to a descent on the other**.
> **Mantra: RETURN {INC, DEC}, RECORD INC + DEC − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=8) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Same as part I, but the path may go up and down through a node and may be increasing or decreasing.

## Key insight
Each node returns the longest +1 chain and the longest −1 chain going down. The best path bending at the node is `inc + dec - 1` (the node is counted twice).

## Approach: Post-order pair
```java
// Part II: a path may bend at a node and may increase or decrease, so each node returns {inc, dec}
public int longestConsecutiveBothWays(TreeNode root) {
    int[] best = {0};
    both(root, best);
    return best[0];
}

// Returns {longest +1 chain going down from n, longest -1 chain going down from n}; their join at n is a bent path
private int[] both(TreeNode n, int[] best) {
    if (n == null) return new int[]{0, 0};
    int inc = 1, dec = 1;
    for (TreeNode c : new TreeNode[]{n.left, n.right}) {
        if (c == null) continue;
        int[] r = both(c, best);
        if (c.val == n.val + 1) inc = Math.max(inc, r[0] + 1);
        if (c.val == n.val - 1) dec = Math.max(dec, r[1] + 1);
    }
    best[0] = Math.max(best[0], inc + dec - 1);
    return new int[]{inc, dec};
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order pair | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against all pairs of nodes. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why subtract 1?</summary>

The node belongs to both chains.

</details>


<details><summary>Can inc and dec use the same child?</summary>

No: a child is either parent + 1 or parent − 1, never both.

</details>


## Connected
- [Binary Tree Longest Consecutive Sequence](Binary%20Tree%20Longest%20Consecutive%20Sequence.md)
- [Diameter of Binary Tree](Diameter%20of%20Binary%20Tree.md)
