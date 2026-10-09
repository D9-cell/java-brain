---
topic: Linked List
pattern: [Reverse in place]
source: LeetCode 206 / GFG
difficulty: Easy
companies: [Amazon, Microsoft, Apple]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Reverse Linked List

> [!TIP]
> **🧠 Memory hook**
> Turn every arrow around while walking.
> **Mantra: SAVE NEXT, FLIP, ADVANCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=31) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Reverse a singly linked list.

## Key insight
prev / cur / next: save next, point cur back to prev, advance both.

## Approach 1: Recursion
```java
// Approach 1: recursion: reverse the rest, then make head.next point back to head
public ListNode reverseListRec(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode last = reverseListRec(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}
```

## Approach 2: Iterative
```java
// Approach 2: iterative with prev / cur / next
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    while (head != null) { ListNode nx = head.next; head.next = prev; prev = head; head = nx; }
    return prev;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(n) | O(n) stack |
| Iterative | O(n) | O(1) |

## Recall before you reveal
<details><summary>Recursive core lines?</summary>

head.next.next = head; head.next = null.

</details>


## Connected
- [Reverse Linked List II](Reverse%20Linked%20List%20II.md)
- [Reverse Nodes in k-Group](Reverse%20Nodes%20in%20k-Group.md)
