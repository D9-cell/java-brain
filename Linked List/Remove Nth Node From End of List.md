---
topic: Linked List
pattern: [Two pointers with a gap]
source: LeetCode 19
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Remove Nth Node From End of List

> [!TIP]
> **🧠 Memory hook**
> Two hikers joined by a rope of length n.
> **Mantra: GAP n, MOVE BOTH, UNLINK slow.next**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=28) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Remove the n-th node from the end.

## Key insight
From a dummy, move fast n ahead, then both until fast is last; slow is just before the target.

## Approach 1: Two pass
```java
// Approach 1: two passes (length, then walk to length - n)
public ListNode removeNthFromEndTwoPass(ListNode head, int n) {
    int len = 0;
    for (ListNode t = head; t != null; t = t.next) len++;
    ListNode dummy = new ListNode(0, head), t = dummy;
    for (int i = 0; i < len - n; i++) t = t.next;
    t.next = t.next.next;
    return dummy.next;
}
```

## Approach 2: One pass
```java
// Approach 2: one pass: move fast n steps ahead, then move both until fast hits the end
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head), fast = dummy, slow = dummy;
    for (int i = 0; i < n; i++) fast = fast.next;
    while (fast.next != null) { fast = fast.next; slow = slow.next; }
    slow.next = slow.next.next;
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Two pass | O(n) | O(1) |
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked every (length, n) up to 10.

## Recall before you reveal
<details><summary>Why the dummy?</summary>

Removing the head becomes normal.

</details>


## Connected
- [Swapping Nodes in a Linked List](Swapping%20Nodes%20in%20a%20Linked%20List.md)
