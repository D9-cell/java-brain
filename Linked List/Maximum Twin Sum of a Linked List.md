---
topic: Linked List
pattern: [Reverse second half]
source: LeetCode 2130
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Maximum Twin Sum of a Linked List

> [!TIP]
> **🧠 Memory hook**
> Fold the list in half like a sheet of paper.
> **Mantra: MIDDLE, REVERSE SECOND HALF, PAIR UP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=16) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Max of node i + node n−1−i.

## Key insight
Find the middle, reverse the second half and walk both halves together (or use a stack).

## Approach 1: Stack
```java
// Approach 2: push the first half on a stack, pop while walking the second half
public int pairSumStack(ListNode head) {
    Deque<Integer> st = new ArrayDeque<>();
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) { st.push(slow.val); slow = slow.next; fast = fast.next.next; }
    int best = 0;
    for (; slow != null; slow = slow.next) best = Math.max(best, slow.val + st.pop());
    return best;
}
```

## Approach 2: Reverse second half
```java
// Approach 3: find the middle, reverse the second half, walk both halves together
public int pairSum(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
    ListNode prev = null;
    while (slow != null) { ListNode nx = slow.next; slow.next = prev; prev = slow; slow = nx; }
    int best = 0;
    for (ListNode a = head, b = prev; b != null; a = a.next, b = b.next) best = Math.max(best, a.val + b.val);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |
| Reverse second half | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Also solves?</summary>

Palindrome Linked List.

</details>


## Connected
- [Palindrome Linked List](Palindrome%20Linked%20List.md)
