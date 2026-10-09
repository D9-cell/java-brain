---
topic: DFS and Recursion
pattern: [Two trees together, Leaf sequence]
source: LeetCode 872
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Leaf-Similar Trees

> [!TIP]
> **🧠 Memory hook**
> Read the leaves of each tree **left to right** like a barcode.
> **Mantra: COMPARE THE LEAF SEQUENCES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=31) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Two trees are leaf-similar if their leaf value sequences (left to right) are equal.

## Key insight
Collect leaves with an in-order walk and compare the two lists. A lazy version uses two stacks and stops at the first difference.

## Approach 1: Two lists
```java
// Collect the leaf sequence of each tree and compare
public boolean leafSimilar(TreeNode a, TreeNode b) {
    List<Integer> x = new ArrayList<>(), y = new ArrayList<>();
    leaves(a, x);
    leaves(b, y);
    return x.equals(y);
}

// Appends leaves left to right
private void leaves(TreeNode n, List<Integer> out) {
    if (n == null) return;
    if (n.left == null && n.right == null) out.add(n.val);
    leaves(n.left, out);
    leaves(n.right, out);
}
```

## Approach 2: Two lazy stacks
```java
// Lazy version: two stacks that produce the next leaf on demand and stop at the first mismatch
public boolean leafSimilarLazy(TreeNode a, TreeNode b) {
    Deque<TreeNode> s1 = new ArrayDeque<>(), s2 = new ArrayDeque<>();
    s1.push(a);
    s2.push(b);
    while (!s1.isEmpty() && !s2.isEmpty()) if (nextLeaf(s1) != nextLeaf(s2)) return false;
    return s1.isEmpty() && s2.isEmpty();
}

// Pops until a leaf is found and returns its value
private int nextLeaf(Deque<TreeNode> st) {
    while (true) {
        TreeNode n = st.pop();
        if (n.left == null && n.right == null) return n.val;
        if (n.right != null) st.push(n.right);
        if (n.left != null) st.push(n.left);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two lists | O(n + m) | O(n + m) |
| Two lazy stacks | O(n + m) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Does the tree shape matter?</summary>

No, only the sequence of leaves.

</details>


## Connected
- [Same Tree](Same%20Tree.md)
