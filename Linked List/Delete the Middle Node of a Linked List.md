---
topic: Linked List
pattern: [Slow / fast]
source: LeetCode 2095 / GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Delete the Middle Node of a Linked List

> [!TIP]
> **🧠 Memory hook**
> Give the hare a two-step head start.
> **Mantra: fast = head.next.next**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=5) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Delete the node at index ⌊n/2⌋.

## Key insight
Start fast two ahead so slow stops just before the middle (or track prev).

## Approach 1: prev pointer
```java
// Approach 1: track prev of slow
public ListNode deleteMiddlePrev(ListNode head) {
    if (head.next == null) return null;
    ListNode prev = null, slow = head, fast = head;
    while (fast != null && fast.next != null) { prev = slow; slow = slow.next; fast = fast.next.next; }
    prev.next = slow.next;
    return head;
}
```

## Approach 2: Head start
```java
// Approach 2: start fast two steps ahead, so slow stops just BEFORE the middle
public ListNode deleteMiddle(ListNode head) {
    if (head.next == null) return null;
    ListNode slow = head, fast = head.next.next;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
    slow.next = slow.next.next;
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| prev pointer | O(n) | O(1) |
| Head start | O(n) | O(1) |

## Recall before you reveal
<details><summary>n = 1?</summary>

Return null.

</details>


## Connected
- [Middle of the Linked List](Middle%20of%20the%20Linked%20List.md)
