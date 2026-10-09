---
topic: Linked List
pattern: [Splicing]
source: LeetCode 1669
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Merge In Between Linked Lists

> [!TIP]
> **🧠 Memory hook**
> Cut out a stretch of track and splice in a new one.
> **Mantra: FIND a−1 AND b+1, SPLICE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=18) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Remove nodes a..b from list1 and insert list2 there.

## Key insight
Find node a−1, node b+1 and list2's tail; rewire two arrows.

## Approach: Splice
```java
// Find node a-1 and node b+1, then splice list2 between them
public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
    ListNode left = list1;
    for (int i = 0; i < a - 1; i++) left = left.next;
    ListNode right = left;
    for (int i = a - 1; i <= b; i++) right = right.next;
    left.next = list2;
    ListNode tail = list2;
    while (tail.next != null) tail = tail.next;
    tail.next = right;
    return list1;
}
```

| Approach | Time | Space |
|---|---|---|
| Splice | O(m + n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Arrows changed?</summary>

left.next = list2, tail.next = right.

</details>

