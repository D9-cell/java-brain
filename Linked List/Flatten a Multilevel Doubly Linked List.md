---
topic: Linked List
pattern: [Splicing]
source: LeetCode 430
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Flatten a Multilevel Doubly Linked List

> [!TIP]
> **🧠 Memory hook**
> Splice each child chain into the main road.
> **Mantra: CHILD BETWEEN cur AND cur.next**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=9) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Flatten child lists depth-first into one doubly linked list.

## Key insight
At a node with a child, splice the child list between it and its next; keep walking (nested children are handled when reached).

## Approach: Iterative splice
```java
// Iterative: when a node has a child, splice the child list between the node and its next, then keep walking
public Node flatten(Node head) {
    for (Node cur = head; cur != null; cur = cur.next) {
        if (cur.child == null) continue;
        Node child = cur.child, tail = child;
        while (tail.next != null) tail = tail.next;
        tail.next = cur.next;
        if (cur.next != null) cur.next.prev = tail;
        cur.next = child;
        child.prev = cur;
        cur.child = null;
    }
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative splice | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> LeetCode sample checked forward, backward and child pointers.

## Recall before you reveal
<details><summary>Don't forget?</summary>

prev pointers and setting child = null.

</details>

