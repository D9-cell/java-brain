---
topic: Recursion
pattern: [Tree recursion]
source: LeetCode 606
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Construct String from Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Write the family register: name, (left family), (right family); write an empty "()" only when a right family exists.
> **Mantra: LEAF → v; NO RIGHT → v(L); ELSE v(L)(R)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=9) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Build the preorder string with parentheses, omitting empty pairs that do not affect the mapping.

## Key insight
Four cases by which children exist; the left "()" must stay when only the right child exists.

## Approach: Recursion
```java
// Leaf → "v"; only left → "v(L)"; only right → "v()(R)"; both → "v(L)(R)"
public String tree2str(TreeNode root) {
    if (root == null) return "";
    String s = String.valueOf(root.val);
    if (root.left == null && root.right == null) return s;
    String l = "(" + tree2str(root.left) + ")";
    if (root.right == null) return s + l;
    return s + l + "(" + tree2str(root.right) + ")";
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(n) calls (string concat makes it O(n²) worst) | O(h) |

## Recall before you reveal
<details><summary>Make it truly O(n)?</summary>

Pass one StringBuilder down.

</details>


## Connected
- Tree folder
