---
topic: Interval DP
pattern: [Choose a root, Generate all]
source: LeetCode 95
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Unique Binary Search Trees II

> [!TIP]
> **🧠 Memory hook**
> Every value in the range can be the **root**; combine every left tree with every right tree.
> **Mantra: trees(lo, hi) = ∪ root: left × right**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=8) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Return all structurally unique BSTs that store the values 1..n.

## Key insight
For root r, the left subtree uses lo..r−1 and the right r+1..hi. An empty range gives a single null tree. Count equals the Catalan number.

## Approach: Recursion over ranges
```java
// Every value in lo..hi can be the root; combine all left trees with all right trees
public List<TreeNode> generateTrees(int n) {
    return build(1, n);
}

// All BSTs over the values lo..hi (a single null when the range is empty)
private List<TreeNode> build(int lo, int hi) {
    List<TreeNode> res = new ArrayList<>();
    if (lo > hi) {
        res.add(null);
        return res;
    }
    for (int root = lo; root <= hi; root++)
        for (TreeNode left : build(lo, root - 1))
            for (TreeNode right : build(root + 1, hi)) {
                TreeNode node = new TreeNode(root);
                node.left = left;
                node.right = right;
                res.add(node);
            }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion over ranges | O(Catalan(n) · n) | O(Catalan(n) · n) |

> [!WARNING]
> **Java gotcha**
> Subtrees are shared between results; treat the returned trees as read-only.

## Recall before you reveal
<details><summary>How many trees?</summary>

Catalan(n): 1, 2, 5, 14, 42, ...

</details>


<details><summary>Why one null for an empty range?</summary>

It keeps the double loop from producing zero combinations.

</details>


## Connected
- [All Possible Full Binary Trees](All%20Possible%20Full%20Binary%20Trees.md)
- [Boolean Parenthesization](Boolean%20Parenthesization.md)
