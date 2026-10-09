---
topic: DFS and Recursion
pattern: [Bit mask parity, Top-down state]
source: LeetCode 1457
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Pseudo-Palindromic Paths in a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Toggle one **light switch per digit**. A palindrome needs at most one light left on.
> **Mantra: XOR A BIT, mask & (mask−1) == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=19) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
A path is pseudo-palindromic if its digits can be rearranged into a palindrome. Count such root-to-leaf paths.

## Key insight
XOR `1 << digit` along the path. At most one odd count means `mask & (mask - 1) == 0`.

## Approach: Bit mask DFS
```java
// XOR a bit per digit down the path; the path can be rearranged into a palindrome when at most one bit stays set
public int pseudoPalindromicPaths(TreeNode root) { return dfs(root, 0); }

// Counts the good leaves below n
private int dfs(TreeNode n, int mask) {
    if (n == null) return 0;
    mask ^= 1 << n.val;
    if (n.left == null && n.right == null) return (mask & (mask - 1)) == 0 ? 1 : 0;
    return dfs(n.left, mask) + dfs(n.right, mask);
}
```

| Approach | Time | Space |
|---|---|---|
| Bit mask DFS | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What does `mask & (mask - 1)` do?</summary>

Clears the lowest set bit; the result is zero when at most one bit was set.

</details>


## Connected
- [Sum Root to Leaf Numbers](Sum%20Root%20to%20Leaf%20Numbers.md)
- [Bit Magic - Pattern Map](../../Bit_Magic/Bit%20Magic%20-%20Pattern%20Map.md)
