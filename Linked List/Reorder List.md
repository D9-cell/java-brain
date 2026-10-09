---
topic: Linked List
pattern: [Middle + reverse + merge]
source: LeetCode 143
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Reorder List

> [!TIP]
> **🧠 Memory hook**
> Alternate from the top and the bottom of the deck.
> **Mantra: MIDDLE, REVERSE SECOND HALF, ZIP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=30) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Reorder L0 L1 … Ln to L0 Ln L1 Ln−1 … in place.

## Key insight
Split at the middle, reverse the second half, interleave the halves.

## Approach 1: Stack
```java
// Approach 1: push all nodes on a stack; pop from the back while walking from the front
public void reorderListStack(ListNode head) {
    Deque<ListNode> st = new ArrayDeque<>();
    for (ListNode t = head; t != null; t = t.next) st.push(t);
    int k = st.size() / 2;
    ListNode cur = head;
    for (int i = 0; i < k; i++) { ListNode last = st.pop(), nx = cur.next; cur.next = last; last.next = nx; cur = nx; }
    cur.next = null;
}
```

## Approach 2: Middle + reverse + zip
```java
// Approach 2: split at the middle, reverse the second half, then interleave the halves
public void reorderList(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) { slow = slow.next; fast = fast.next.next; }
    ListNode second = slow.next, prev = null;
    slow.next = null;
    while (second != null) { ListNode nx = second.next; second.next = prev; prev = second; second = nx; }
    for (ListNode a = head, b = prev; b != null; ) {
        ListNode an = a.next, bn = b.next;
        a.next = b;
        b.next = an;
        a = an;
        b = bn;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |
| Middle + reverse + zip | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both approaches checked for n = 1..15.

## Recall before you reveal
<details><summary>Three building blocks?</summary>

Middle, reverse, merge.

</details>


## Connected
- [Palindrome Linked List](Palindrome%20Linked%20List.md)
