---
topic: DFS and Recursion
pattern: [Build from an array, Monotonic stack]
source: LeetCode 654
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Maximum Binary Tree

> [!TIP]
> **🧠 Memory hook**
> The biggest number is the **boss**; what is left of it and right of it become its two teams.
> **Mantra: MAX IS THE ROOT, SPLIT AROUND IT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=40) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Build a tree from an array without duplicates: the root is the maximum, the left subtree comes from the part before it, the right subtree from the part after it.

## Key insight
Recursion finds the maximum in each slice (O(n²) worst). A decreasing stack builds the tree in O(n): a bigger value adopts the popped nodes as its left subtree and becomes the right child of the new top.

## Approach 1: Recursive split
```java
// The maximum becomes the root; the parts on its left and right build the subtrees
public TreeNode constructMaximumBinaryTree(int[] nums) { return build(nums, 0, nums.length - 1); }

// Builds from the slice [lo, hi]
private TreeNode build(int[] a, int lo, int hi) {
    if (lo > hi) return null;
    int m = lo;
    for (int i = lo + 1; i <= hi; i++) if (a[i] > a[m]) m = i;
    TreeNode n = new TreeNode(a[m]);
    n.left = build(a, lo, m - 1);
    n.right = build(a, m + 1, hi);
    return n;
}
```

## Approach 2: Monotonic stack
```java
// O(n) with a decreasing stack: a bigger value adopts the popped nodes as its left subtree
public TreeNode constructMaximumBinaryTreeStack(int[] nums) {
    Deque<TreeNode> st = new ArrayDeque<>();
    for (int v : nums) {
        TreeNode cur = new TreeNode(v), last = null;
        while (!st.isEmpty() && st.peek().val < v) last = st.pop();
        cur.left = last;
        if (!st.isEmpty()) st.peek().right = cur;
        st.push(cur);
    }
    return st.isEmpty() ? null : st.peekLast();
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive split | O(n²) worst | O(h) |
| Monotonic stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What does the stack hold?</summary>

The right spine of the tree built so far, in decreasing order.

</details>


## Connected
- [Largest Rectangle in Histogram](../../Stack/Largest%20Rectangle%20in%20Histogram.md)
- [Daily Temperatures](../../Stack/Daily%20Temperatures.md)
