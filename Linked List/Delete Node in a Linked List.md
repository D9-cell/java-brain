---
topic: Linked List
pattern: [Copy successor]
source: LeetCode 237 / GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Delete Node in a Linked List

> [!TIP]
> **🧠 Memory hook**
> If you cannot reach your predecessor, become your successor.
> **Mantra: COPY NEXT VALUE, SKIP NEXT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=3) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Delete a node given only that node (not the tail).

## Key insight
Copy the next node's value into this one and unlink the next node.

## Approach: Copy + skip
```java
// No access to the previous node: become your successor (copy its value) and skip it
public void deleteNode(ListNode node) {
    node.val = node.next.val;
    node.next = node.next.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Copy + skip | O(1) | O(1) |

## Recall before you reveal
<details><summary>Limitation?</summary>

Cannot delete the tail this way.

</details>

