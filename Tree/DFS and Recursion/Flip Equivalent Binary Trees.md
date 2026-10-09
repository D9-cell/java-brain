---
topic: DFS and Recursion
pattern: [Two trees together, Straight or crossed]
source: LeetCode 951
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Flip Equivalent Binary Trees

> [!TIP]
> **🧠 Memory hook**
> You may swap the children of any node: the match is **straight or crossed**.
> **Mantra: SAME VALUE, (L=L & R=R) OR (L=R & R=L)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=26) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Two trees are flip equivalent if one becomes the other after swapping the children of some nodes. Decide whether they are.

## Key insight
Compare roots; then try both pairings of the children. Alternatively normalise each tree by ordering the children's serialized forms.

## Approach 1: Recursive match
```java
// Equal roots, and the children match either straight or crossed
public boolean flipEquiv(TreeNode a, TreeNode b) {
    if (a == null || b == null) return a == b;
    if (a.val != b.val) return false;
    return (flipEquiv(a.left, b.left) && flipEquiv(a.right, b.right)) || (flipEquiv(a.left, b.right) && flipEquiv(a.right, b.left));
}
```

## Approach 2: Canonical form
```java
// Canonical form: serialize every node with its two child strings in sorted order, then compare strings
public boolean flipEquivCanonical(TreeNode a, TreeNode b) { return canon(a).equals(canon(b)); }

// Child strings are ordered so a flipped pair gives the same text
private String canon(TreeNode n) {
    if (n == null) return "#";
    String l = canon(n.left), r = canon(n.right);
    return l.compareTo(r) <= 0 ? "(" + n.val + " " + l + " " + r + ")" : "(" + n.val + " " + r + " " + l + ")";
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive match | O(n) | O(h) |
| Canonical form | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is the recursion still linear?</summary>

Only one of the two pairings can have equal root values, so the second branch is skipped quickly.

</details>


## Connected
- [Same Tree](Same%20Tree.md)
- [Find Duplicate Subtrees](Find%20Duplicate%20Subtrees.md)
