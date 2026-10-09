---
topic: BST and Construction
pattern: [Search path, Track the best difference]
source: GeeksforGeeks
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find the Closest Element in BST

> [!TIP]
> **🧠 Memory hook**
> Search for `k`; **the closest key is somewhere on the search path**.
> **Mantra: FOLLOW THE SEARCH PATH, KEEP MIN |k − node|**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=3) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the minimum absolute difference between `k` and any key of the BST.

## Key insight
The closest key is either `k` itself or the last key smaller or larger than `k` met while searching. Update the best difference at every node on the path.

## Approach 1: Iterative
```java
// Follow the search path for k, keeping the smallest |k - node|
public int minDiff(TreeNode root, int k) {
    int best = Integer.MAX_VALUE;
    for (TreeNode cur = root; cur != null; ) {
        best = Math.min(best, Math.abs(k - cur.val));
        if (k == cur.val) return 0;
        cur = k > cur.val ? cur.right : cur.left;
    }
    return best;
}
```

## Approach 2: Recursive
```java
// Recursive form
public int minDiffRecursive(TreeNode root, int k) {
    if (root == null) return Integer.MAX_VALUE;
    int here = Math.abs(k - root.val);
    return Math.min(here, minDiffRecursive(k > root.val ? root.right : root.left, k));
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative | O(h) | O(1) |
| Recursive | O(h) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why not look at the other subtree?</summary>

Everything there is farther from `k` than the current node.

</details>


## Connected
- [Inorder Successor in BST](Inorder%20Successor%20in%20BST.md)
