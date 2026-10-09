---
topic: Linked List
pattern: [Recursion]
source: LeetCode 24
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Swap Nodes in Pairs

> [!TIP]
> **🧠 Memory hook**
> Swap the first two and trust recursion for the rest.
> **Mantra: SECOND → HEAD → SWAP(REST)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=37) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Swap every two adjacent nodes (not values).

## Key insight
second = head.next; head.next = swap(second.next); second.next = head.

## Approach: Recursion
```java
// Recursion: swap the first two, and let recursion handle the rest
public ListNode swapPairs(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode second = head.next;
    head.next = swapPairs(second.next);
    second.next = head;
    return second;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(n) | O(n) stack |

## Recall before you reveal
<details><summary>Iterative?</summary>

Dummy + prev, rewire three arrows per pair.

</details>

