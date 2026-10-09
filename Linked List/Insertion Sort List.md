---
topic: Linked List
pattern: [Dummy head]
source: LeetCode 147 / GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Insertion Sort List

> [!TIP]
> **🧠 Memory hook**
> Deal cards into a sorted hand.
> **Mantra: DUMMY, FIND SLOT, INSERT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=12) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Sort a list with insertion sort.

## Key insight
Detach nodes one at a time and insert each into a sorted list behind a dummy.

## Approach: Insertion sort
```java
// Take nodes one by one and insert each into a growing sorted list behind a dummy head
public ListNode insertionSortList(ListNode head) {
    ListNode dummy = new ListNode(Integer.MIN_VALUE);
    while (head != null) {
        ListNode nx = head.next, p = dummy;
        while (p.next != null && p.next.val <= head.val) p = p.next;
        head.next = p.next;
        p.next = head;
        head = nx;
    }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Insertion sort | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Faster sort for lists?</summary>

Merge sort (O(n log n)).

</details>

