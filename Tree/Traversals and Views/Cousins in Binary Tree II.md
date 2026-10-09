---
topic: Traversals and Views
pattern: [Level sums, Subtract the sibling group]
source: LeetCode 2641
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Cousins in Binary Tree II

> [!TIP]
> **🧠 Memory hook**
> A node's cousins are everybody on its row **except its own family** (itself and its sibling).
> **Mantra: LEVEL SUM − (ME + SIBLING)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=22) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Replace each node value with the sum of its cousins' values.

## Key insight
Compute every level sum first. For a parent, the two children share the same new value: `levelSum - leftVal - rightVal`.

## Approach: Level sums + sibling subtraction
```java
// Level sums first; then each node becomes (level sum - sum of itself and its sibling)
public TreeNode replaceValueInTree(TreeNode root) {
    List<Integer> sums = new ArrayList<>();
    for (List<Integer> lv : TreeNode.levels(root)) sums.add(lv.stream().mapToInt(Integer::intValue).sum());
    root.val = 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    for (int level = 1; !q.isEmpty(); level++) {
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            int sibling = (cur.left == null ? 0 : cur.left.val) + (cur.right == null ? 0 : cur.right.val);
            if (cur.left != null) { cur.left.val = sums.get(level) - sibling; q.add(cur.left); }
            if (cur.right != null) { cur.right.val = sums.get(level) - sibling; q.add(cur.right); }
        }
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Level sums + sibling subtraction | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What are the root and its children set to?</summary>

The root has no cousins (0); children of the root also get 0 since their level sum minus both of them is 0.

</details>


## Connected
- [Find Largest Value in Each Tree Row](Find%20Largest%20Value%20in%20Each%20Tree%20Row.md)
