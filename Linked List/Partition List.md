---
topic: Linked List
pattern: [Two dummy chains]
source: LeetCode 86
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Partition List

> [!TIP]
> **🧠 Memory hook**
> Deal cards into two piles, keep their order, stack the piles.
> **Mantra: TWO DUMMY CHAINS, more.next = null**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=25) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Move all nodes < x before nodes ≥ x, keeping relative order.

## Key insight
Append each node to a "less" or "more" chain; join; terminate the more chain.

## Approach: Two chains
```java
// Two dummy-headed chains (< x and >= x) keep the original order; join them
public ListNode partition(ListNode head, int x) {
    ListNode lessD = new ListNode(0), moreD = new ListNode(0), less = lessD, more = moreD;
    for (; head != null; head = head.next) {
        if (head.val < x) less = less.next = head;
        else more = more.next = head;
    }
    more.next = null;
    less.next = moreD.next;
    return lessD.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Two chains | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Cycle trap?</summary>

Forgetting more.next = null.

</details>

