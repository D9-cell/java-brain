---
topic: Linked List
pattern: [Digits as nodes]
source: LeetCode 2816
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Double a Number Represented as a Linked List

> [!TIP]
> **🧠 Memory hook**
> A digit only gets a carry if its right neighbour is ≥ 5.
> **Mantra: CARRY = NEXT ≥ 5**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=6) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Double the number stored in the list.

## Key insight
Reverse + carry, recursion returning the carry, or one pass: each digit = 2d mod 10, +1 if the next digit ≥ 5.

## Approach 1: Recursion returning carry
```java
// Approach 2 (recursion): the carry comes back from the tail; returns the carry out of this node
private int dbl(ListNode n) {
    if (n == null) return 0;
    int v = n.val * 2 + dbl(n.next);
    n.val = v % 10;
    return v / 10;
}

// Recursive entry point
public ListNode doubleItRec(ListNode head) {
    int carry = dbl(head);
    return carry > 0 ? new ListNode(carry, head) : head;
}
```

## Approach 2: One pass (bonus)
```java
// Bonus (one pass, no reverse; not in the C++ file): a digit's carry only depends on whether the NEXT digit is >= 5
public ListNode doubleIt(ListNode head) {
    if (head.val >= 5) head = new ListNode(0, head);
    for (ListNode t = head; t != null; t = t.next) {
        t.val = t.val * 2 % 10;
        if (t.next != null && t.next.val >= 5) t.val++;
    }
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion returning carry | O(n) | O(n) stack |
| One pass (bonus) | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger. The one-pass version is an addition (the C++ uses reverse and recursion).

## Recall before you reveal
<details><summary>New leading digit?</summary>

If the head ≥ 5, prepend a 0 first.

</details>


## Connected
- [Plus One Linked List](Plus%20One%20Linked%20List.md)
