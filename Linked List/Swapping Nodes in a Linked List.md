---
topic: Linked List
pattern: [Two pointers with a gap]
source: LeetCode 1721
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Swapping Nodes in a Linked List

> [!TIP]
> **🧠 Memory hook**
> The k-th from the end trails a probe that started at the k-th from the front.
> **Mantra: FIND FIRST, TRAIL TO SECOND, SWAP VALUES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=38) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Swap the values of the k-th node from the start and the k-th from the end.

## Key insight
Walk k−1 steps to first; move a probe from first to the end while second moves from the head.

## Approach: One pass
```java
// One pass: the k-th from the front is found first; a second pointer started then reaches the k-th from the end
public ListNode swapNodes(ListNode head, int k) {
    ListNode first = head;
    for (int i = 1; i < k; i++) first = first.next;
    ListNode second = head;
    for (ListNode t = first; t.next != null; t = t.next) second = second.next;
    int tmp = first.val;
    first.val = second.val;
    second.val = tmp;
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked every k for n ≤ 10.

## Recall before you reveal
<details><summary>Same node?</summary>

When k is the exact middle; the swap is a no-op.

</details>


## Connected
- [Remove Nth Node From End of List](Remove%20Nth%20Node%20From%20End%20of%20List.md)
