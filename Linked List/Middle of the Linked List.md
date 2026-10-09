---
topic: Linked List
pattern: [Slow / fast]
source: LeetCode 876 / GFG
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Middle of the Linked List

> [!TIP]
> **🧠 Memory hook**
> Tortoise and hare.
> **Mantra: SLOW 1, FAST 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=21) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Return the middle node (second middle for even length).

## Key insight
Fast moves two, slow one; slow is the middle when fast ends.

## Approach: Slow / fast
```java
// Tortoise and hare: when fast reaches the end, slow is in the middle (second middle for even length)
public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
    return slow;
}
```

| Approach | Time | Space |
|---|---|---|
| Slow / fast | O(n) | O(1) |

## Recall before you reveal
<details><summary>First middle?</summary>

Stop when fast.next.next == null.

</details>


## Connected
- [Delete the Middle Node of a Linked List](Delete%20the%20Middle%20Node%20of%20a%20Linked%20List.md)
