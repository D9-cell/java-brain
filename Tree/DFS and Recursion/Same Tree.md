---
topic: DFS and Recursion
pattern: [Two trees together, Parallel walk]
source: LeetCode 100
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Same Tree

> [!TIP]
> **🧠 Memory hook**
> Walk two trees **in lockstep**.
> **Mantra: BOTH null, OR SAME VALUE AND SAME CHILDREN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=27) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Are the two trees identical in structure and values?

## Key insight
If both are null → true; if exactly one is null → false; otherwise compare values and recurse on both sides.

## Approach 1: Recursive
```java
// Both empty, or equal values and equal children
public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null || q == null) return p == q;
    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

## Approach 2: Iterative stack of pairs
```java
// Iterative: walk both trees together with a stack of pairs
public boolean isSameTreeIterative(TreeNode p, TreeNode q) {
    Deque<TreeNode[]> st = new ArrayDeque<>();
    st.push(new TreeNode[]{p, q});
    while (!st.isEmpty()) {
        TreeNode[] pair = st.pop();
        if (pair[0] == null && pair[1] == null) continue;
        if (pair[0] == null || pair[1] == null || pair[0].val != pair[1].val) return false;
        st.push(new TreeNode[]{pair[0].left, pair[1].left});
        st.push(new TreeNode[]{pair[0].right, pair[1].right});
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Iterative stack of pairs | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `p == q` when one of them is null?</summary>

It is true only if both are null.

</details>


## Connected
- [Symmetric Tree](Symmetric%20Tree.md)
- [Subtree of Another Tree](Subtree%20of%20Another%20Tree.md)
