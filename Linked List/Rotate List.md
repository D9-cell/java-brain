---
topic: Linked List
pattern: [Ring and cut]
source: LeetCode 61
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Rotate List

> [!TIP]
> **🧠 Memory hook**
> Bend the list into a ring and cut it at a new place.
> **Mantra: k %= len, RING, CUT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=34) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Rotate the list right by k.

## Key insight
Measure the length, close the ring, walk len − k − 1 from the head to the new tail, cut.

## Approach: Ring
```java
// Close the list into a ring, then cut it len - k%len steps from the old head
public ListNode rotateRight(ListNode head, int k) {
    if (head == null) return null;
    int len = 1;
    ListNode tail = head;
    while (tail.next != null) { tail = tail.next; len++; }
    k %= len;
    if (k == 0) return head;
    tail.next = head;
    ListNode newTail = head;
    for (int i = 0; i < len - k - 1; i++) newTail = newTail.next;
    ListNode newHead = newTail.next;
    newTail.next = null;
    return newHead;
}
```

| Approach | Time | Space |
|---|---|---|
| Ring | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked every k ≤ 2n for n ≤ 8.

## Recall before you reveal
<details><summary>Huge k?</summary>

k %= len first.

</details>

