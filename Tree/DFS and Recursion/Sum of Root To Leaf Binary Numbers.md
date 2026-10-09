---
topic: DFS and Recursion
pattern: [Top-down state, Shift and add a bit]
source: LeetCode 1022
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Sum of Root To Leaf Binary Numbers

> [!TIP]
> **🧠 Memory hook**
> Each step down is **shift left and add a bit**: `cur = cur << 1 | bit`.
> **Mantra: cur = (cur << 1) | bit**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=36) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Each root-to-leaf path of 0/1 nodes is a binary number. Return the sum of them.

## Key insight
Same as Sum Root to Leaf Numbers with base 2.

## Approach: Shift DFS
```java
// Shift the number left and add the bit while walking down; sum at the leaves
public int sumRootToLeaf(TreeNode root) { return dfs(root, 0); }

// Returns the sum of all root-to-leaf numbers in the subtree
private int dfs(TreeNode n, int cur) {
    if (n == null) return 0;
    cur = (cur << 1) | n.val;
    if (n.left == null && n.right == null) return cur;
    return dfs(n.left, cur) + dfs(n.right, cur);
}
```

| Approach | Time | Space |
|---|---|---|
| Shift DFS | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why shifting instead of `cur * 2`?</summary>

Both work; the shift states the intent.

</details>


## Connected
- [Sum Root to Leaf Numbers](Sum%20Root%20to%20Leaf%20Numbers.md)
