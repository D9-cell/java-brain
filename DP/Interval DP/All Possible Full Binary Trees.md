---
topic: Interval DP
pattern: [Choose a split, Memo by size]
source: LeetCode 894
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# All Possible Full Binary Trees

> [!TIP]
> **🧠 Memory hook**
> A full binary tree has an **odd** node count; the root splits the rest into odd left and odd right.
> **Mantra: trees(n) = ∪ left (odd): trees(left) × trees(n − 1 − left)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=9) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Return all full binary trees (every node has 0 or 2 children) with n nodes.

## Key insight
Even n is impossible. For odd n the root takes one node and the remaining n − 1 are split as (1, n−2), (3, n−4), ... Memoise results by n.

## Approach: Memo by size
```java
public class AllPossibleFullBinaryTrees {
    static class TreeNode {
        int val;
        TreeNode left, right;

        TreeNode(int val) {
            this.val = val;
        }
    }

    private final Map<Integer, List<TreeNode>> memo = new HashMap<>();

    // The root uses one node; the other n - 1 split into odd left and right counts
    public List<TreeNode> allPossibleFBT(int n) {
        if (n % 2 == 0) return new ArrayList<>();
        if (n == 1) return List.of(new TreeNode(0));
        if (memo.containsKey(n)) return memo.get(n);
        List<TreeNode> res = new ArrayList<>();
        for (int left = 1; left < n; left += 2)
            for (TreeNode l : allPossibleFBT(left))
                for (TreeNode r : allPossibleFBT(n - 1 - left)) {
                    TreeNode root = new TreeNode(0);
                    root.left = l;
                    root.right = r;
                    res.add(root);
                }
        memo.put(n, res);
        return res;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Memo by size | O(Catalan(n/2)) | O(Catalan(n/2)) |

> [!WARNING]
> **Java gotcha**
> Memoised trees are shared; do not mutate them after returning.

## Recall before you reveal
<details><summary>Why odd only?</summary>

Each internal node adds two children to the single root.

</details>


<details><summary>Why memo?</summary>

trees(3) is rebuilt under many larger roots.

</details>


## Connected
- [Unique Binary Search Trees II](Unique%20Binary%20Search%20Trees%20II.md)
