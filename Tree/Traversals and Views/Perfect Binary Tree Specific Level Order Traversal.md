---
topic: Traversals and Views
pattern: [Mirror pairs, Queue of pairs]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Perfect Binary Tree Specific Level Order Traversal

> [!TIP]
> **🧠 Memory hook**
> Read each level from **both ends inward**: leftmost, rightmost, next-left, next-right.
> **Mantra: ROOT, THEN MIRROR PAIRS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=11) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Print a perfect binary tree level by level, taking nodes in pairs from the left end and the right end.

## Key insight
Queue the children as mirror pairs: `l.left, r.right`, then `l.right, r.left`. Polling two at a time prints both ends of the level.

## Approach 1: Part I: queue of mirror pairs
```java
// Part I: print the root, then walk down level by level taking the next two nodes from the left end and the right end together
public List<Integer> specificOrder(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    res.add(root.val);
    if (root.left == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root.left);
    q.add(root.right);
    while (!q.isEmpty()) {
        TreeNode l = q.poll(), r = q.poll();
        res.add(l.val);
        res.add(r.val);
        if (l.left != null) {
            q.add(l.left);
            q.add(r.right);
            q.add(l.right);
            q.add(r.left);
        }
    }
    return res;
}
```

## Approach 2: Part II: levels, two pointers
```java
// Part II: same output as bottom-up reversed levels, built from a plain level-order scan with a stack of level pairs
public List<Integer> specificOrderReversed(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    res.add(root.val);
    List<List<TreeNode>> levels = new ArrayList<>();
    List<TreeNode> cur = List.of(root);
    while (!cur.isEmpty()) {
        levels.add(cur);
        List<TreeNode> next = new ArrayList<>();
        for (TreeNode n : cur) { if (n.left != null) next.add(n.left); if (n.right != null) next.add(n.right); }
        cur = next;
    }
    for (int d = 1; d < levels.size(); d++) {
        List<TreeNode> lv = levels.get(d);
        for (int i = 0, j = lv.size() - 1; i < j; i++, j--) { res.add(lv.get(i).val); res.add(lv.get(j).val); }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Part I: queue of mirror pairs | O(n) | O(n) |
| Part II: levels, two pointers | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why does it need a perfect tree?</summary>

Every node has two children, so the pairs always exist.

</details>


## Connected
- [Reverse Odd Levels of Binary Tree](Reverse%20Odd%20Levels%20of%20Binary%20Tree.md)
