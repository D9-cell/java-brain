---
topic: Traversals and Views
pattern: [Next pointers, Use the previous level]
source: LeetCode 116
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Populating Next Right Pointers in Each Node

> [!TIP]
> **🧠 Memory hook**
> Each finished row is a **railway** you can ride to wire the row below.
> **Mantra: WIRE LEFT→RIGHT, THEN CROSS TO NEIGHBOUR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=19) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Fill every `next` pointer of a perfect binary tree with the node to its right on the same level.

## Key insight
For a node `cur` on the level above: `cur.left.next = cur.right`, and `cur.right.next = cur.next.left` when `cur.next` exists. No queue is needed.

## Approach: Level-by-level wiring, O(1) space
```java
// Part I (perfect tree): use the next pointers already built on the level above, O(1) space
public Node connectPerfect(Node root) {
    for (Node leftmost = root; leftmost != null && leftmost.left != null; leftmost = leftmost.left) {
        for (Node cur = leftmost; cur != null; cur = cur.next) {
            cur.left.next = cur.right;
            if (cur.next != null) cur.right.next = cur.next.left;
        }
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Level-by-level wiring, O(1) space | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why can it use `cur.next`?</summary>

The level above was wired in the previous round.

</details>


## Connected
- [Populating Next Right Pointers in Each Node II](Populating%20Next%20Right%20Pointers%20in%20Each%20Node%20II.md)
