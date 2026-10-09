---
topic: DFS and Recursion
pattern: [Top-down state, Streak from parent]
source: LeetCode 298
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Longest Consecutive Sequence

> [!TIP]
> **🧠 Memory hook**
> Carry a **streak counter** down: parent + 1 continues it, anything else restarts it.
> **Mantra: CHILD == PARENT + 1 → STREAK + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=7) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest downward path in which each value is exactly one more than its parent.

## Key insight
Pass the current streak to the children. A child that equals `parent + 1` extends it, any other value restarts at 1.

## Approach: Top-down streak
```java
// Part I: downward path where each child is parent + 1
public int longestConsecutive(TreeNode root) {
    int[] best = {0};
    down(root, null, 0, best);
    return best[0];
}

// Carries the streak length from the parent; it grows by one when the value is parent + 1
private void down(TreeNode n, TreeNode parent, int len, int[] best) {
    if (n == null) return;
    len = parent != null && n.val == parent.val + 1 ? len + 1 : 1;
    best[0] = Math.max(best[0], len);
    down(n.left, n, len, best);
    down(n.right, n, len, best);
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down streak | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Part II lives in the same Java file. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Can the path go up and then down?</summary>

Not in this version; see part II.

</details>


## Connected
- [Binary Tree Longest Consecutive Sequence II](Binary%20Tree%20Longest%20Consecutive%20Sequence%20II.md)
