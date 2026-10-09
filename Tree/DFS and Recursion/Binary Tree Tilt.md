---
topic: DFS and Recursion
pattern: [Bottom-up combine, Return sum, record difference]
source: LeetCode 563
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Tilt

> [!TIP]
> **🧠 Memory hook**
> Weigh each node's two sides on a **balance scale** and sum the differences.
> **Mantra: RETURN SUBTREE SUM, ADD |L − R|**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=3) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
The tilt of a node is |sum of left subtree − sum of right subtree|. Return the total tilt of all nodes.

## Key insight
One post-order pass: return the subtree sum, add the absolute difference of the children's sums to a global total.

## Approach: Post-order sums
```java
// Post-order: each node returns its subtree sum and adds |leftSum - rightSum| to the total tilt
public int findTilt(TreeNode root) {
    int[] tilt = {0};
    sum(root, tilt);
    return tilt[0];
}

// Sum of the subtree, collecting tilt on the way up
private int sum(TreeNode n, int[] tilt) {
    if (n == null) return 0;
    int l = sum(n.left, tilt), r = sum(n.right, tilt);
    tilt[0] += Math.abs(l - r);
    return l + n.val + r;
}
```

| Approach | Time | Space |
|---|---|---|
| Post-order sums | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What is the tilt of a leaf?</summary>

0 (both sides empty).

</details>


## Connected
- [Maximum Product of Splitted Binary Tree](Maximum%20Product%20of%20Splitted%20Binary%20Tree.md)
- [Distribute Coins in Binary Tree](Distribute%20Coins%20in%20Binary%20Tree.md)
