---
topic: Traversals and Views
pattern: [Level scan, Direction flag]
source: LeetCode 103
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Zigzag Level Order Traversal

> [!TIP]
> **🧠 Memory hook**
> A snake path: left to right on one row, right to left on the next.
> **Mantra: FLIP DIRECTION EACH LEVEL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=4) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Return the zigzag level order traversal.

## Key insight
Run a normal BFS and decide where each value goes: index `i` going right, index `size - 1 - i` going left.

## Approach 1: Fill from either end
```java
// Level-order scan that fills each level from the left or from the right alternately
public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    boolean leftToRight = true;
    while (!q.isEmpty()) {
        int size = q.size();
        Integer[] level = new Integer[size];
        for (int i = 0; i < size; i++) {
            TreeNode cur = q.poll();
            level[leftToRight ? i : size - 1 - i] = cur.val;
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
        res.add(Arrays.asList(level));
        leftToRight = !leftToRight;
    }
    return res;
}
```

## Approach 2: Reverse odd levels
```java
// Level-order scan that reverses every odd level after collecting it
public List<List<Integer>> zigzagReverse(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        List<Integer> level = new ArrayList<>();
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            level.add(cur.val);
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
        if (res.size() % 2 == 1) Collections.reverse(level);
        res.add(level);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Fill from either end | O(n) | O(w) |
| Reverse odd levels | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why not change the queue order?</summary>

The queue must stay left-to-right so children are discovered correctly; only the output order flips.

</details>


## Connected
- [Binary Tree Right Side View](Binary%20Tree%20Right%20Side%20View.md)
- [Reverse Odd Levels of Binary Tree](Reverse%20Odd%20Levels%20of%20Binary%20Tree.md)
