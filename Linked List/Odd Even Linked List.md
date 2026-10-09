---
topic: Linked List
pattern: [In-place rewiring]
source: LeetCode 328
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Odd Even Linked List

> [!TIP]
> **🧠 Memory hook**
> Two zippers separated: odd positions and even positions.
> **Mantra: TWO CHAINS IN PLACE, ODDS THEN EVENS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=23) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Group odd-indexed nodes before even-indexed ones, in place.

## Key insight
Build the odd and even chains simultaneously, then link the odd tail to the even head.

## Approach: Two chains
```java
// Two chains (odd positions, even positions) built in place; attach evens after odds
public ListNode oddEvenList(ListNode head) {
    if (head == null) return null;
    ListNode odd = head, even = head.next, evenHead = even;
    while (even != null && even.next != null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Two chains | O(n) | O(1) |

## Recall before you reveal
<details><summary>Loop condition?</summary>

even != null && even.next != null.

</details>

