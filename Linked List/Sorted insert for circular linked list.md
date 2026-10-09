---
topic: Linked List
pattern: [Circular list]
source: GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Sorted insert for circular linked list

> [!TIP]
> **🧠 Memory hook**
> Seat a newcomer at a round table sorted by number.
> **Mantra: SMALLER THAN HEAD → NEW HEAD; ELSE AFTER LAST ≤**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=35) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Insert a value into a sorted circular list and return the head.

## Key insight
Empty → self loop. Smaller than the head → insert after the tail and return it as the new head. Else insert after the last node ≤ data.

## Approach: Walk the ring
```java
// Smaller than the head → becomes the new head (insert before head, i.e. after the tail); else insert after the last node <= data
public ListNode sortedInsert(ListNode head, int data) {
    ListNode node = new ListNode(data);
    if (head == null) { node.next = node; return node; }
    if (data < head.val) {
        ListNode tail = head;
        while (tail.next != head) tail = tail.next;
        tail.next = node;
        node.next = head;
        return node;
    }
    ListNode t = head;
    while (t.next != head && t.next.val <= data) t = t.next;
    node.next = t.next;
    t.next = node;
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Walk the ring | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Stop condition?</summary>

t.next == head or t.next.val > data.

</details>

