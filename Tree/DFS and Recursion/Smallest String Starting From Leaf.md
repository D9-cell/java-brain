---
topic: DFS and Recursion
pattern: [Top-down state, Prepend while descending]
source: LeetCode 988
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Smallest String Starting From Leaf

> [!TIP]
> **🧠 Memory hook**
> Read the path **from the leaf up**, so prepend each node to the text you carry down.
> **Mantra: PREPEND LETTER, COMPARE AT LEAVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=18) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Node values 0..25 are letters a..z. Return the lexicographically smallest string that starts at a leaf and ends at the root.

## Key insight
Carry `letter + suffix` down, so the string is already leaf-to-root at the leaf. Return the smaller of the two children's answers.

## Approach: Prepend and compare
```java
// Build the string leaf-first by prepending each node on the way down, keep the smallest at the leaves
public String smallestFromLeaf(TreeNode root) { return dfs(root, ""); }

// Returns the smallest leaf-to-root string below n; null when there is nothing there
private String dfs(TreeNode n, String suffix) {
    if (n == null) return null;
    String cur = (char) ('a' + n.val) + suffix;
    if (n.left == null && n.right == null) return cur;
    String l = dfs(n.left, cur), r = dfs(n.right, cur);
    if (l == null) return r;
    if (r == null) return l;
    return l.compareTo(r) <= 0 ? l : r;
}
```

| Approach | Time | Space |
|---|---|---|
| Prepend and compare | O(n · h) | O(h) |

> [!WARNING]
> **Java gotcha**
> A node with one null child must ignore that side, otherwise `null` would win the comparison. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why can you not compare partial strings early?</summary>

A shorter prefix is smaller, but the path may not end there; only leaves count.

</details>


## Connected
- [Sum Root to Leaf Numbers](Sum%20Root%20to%20Leaf%20Numbers.md)
