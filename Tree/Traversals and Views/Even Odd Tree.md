---
topic: Traversals and Views
pattern: [Level scan, Monotonic check per level]
source: LeetCode 1609
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Even Odd Tree

> [!TIP]
> **🧠 Memory hook**
> Even rows climb through **odd** numbers, odd rows fall through **even** numbers.
> **Mantra: EVEN LEVEL: ODD ↑, ODD LEVEL: EVEN ↓**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=14) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Check that every even-indexed level has strictly increasing odd values and every odd-indexed level has strictly decreasing even values.

## Key insight
Keep the previous value of the level; reset it to MIN for even levels and MAX for odd levels.

## Approach: BFS with previous value
```java
// Level-order scan: even levels need odd values rising, odd levels need even values falling
public boolean isEvenOddTree(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    for (int level = 0; !q.isEmpty(); level++) {
        int prev = level % 2 == 0 ? Integer.MIN_VALUE : Integer.MAX_VALUE;
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            boolean evenLevel = level % 2 == 0;
            if (evenLevel && (cur.val % 2 == 0 || cur.val <= prev)) return false;
            if (!evenLevel && (cur.val % 2 == 1 || cur.val >= prev)) return false;
            prev = cur.val;
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS with previous value | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Parity rule in one line?</summary>

Value parity must differ from level parity.

</details>


## Connected
- [Binary Tree Zigzag Level Order Traversal](Binary%20Tree%20Zigzag%20Level%20Order%20Traversal.md)
