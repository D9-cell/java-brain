---
topic: Linked List
pattern: [Merge sorted, Dummy head]
source: LeetCode 21
difficulty: Easy
companies: [Amazon, Microsoft, Apple]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Merge Two Sorted Lists

> [!TIP]
> **🧠 Memory hook**
> Two sorted decks: take the smaller top card.
> **Mantra: DUMMY + TAIL, TAKE SMALLER, ATTACH REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=20) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Merge two sorted lists.

## Key insight
Dummy head + tail pointer; attach the leftover list at the end.

## Approach 1: Recursion
```java
// Approach 1: recursion: the smaller head stays first and points to the merge of the rest
public ListNode mergeTwoListsRec(ListNode a, ListNode b) {
    if (a == null) return b;
    if (b == null) return a;
    if (a.val <= b.val) { a.next = mergeTwoListsRec(a.next, b); return a; }
    b.next = mergeTwoListsRec(a, b.next);
    return b;
}
```

## Approach 2: Iterative
```java
// Approach 2: iterative with a dummy head and a tail pointer
public ListNode mergeTwoLists(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), t = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; }
        t = t.next;
    }
    t.next = a != null ? a : b;
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(m + n) | O(m + n) stack |
| Iterative | O(m + n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Why prefer iterative in Java?</summary>

Long lists overflow the recursion stack.

</details>


## Connected
- [Merge k Sorted Lists](Merge%20k%20Sorted%20Lists.md)
