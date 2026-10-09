---
topic: Linked List
pattern: [Digits as nodes, Stack / reverse]
source: LeetCode 445
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Add Two Numbers II

> [!TIP]
> **🧠 Memory hook**
> Column addition starts at the right, but the list starts at the left.
> **Mantra: STACKS (OR REVERSE), PREPEND**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=0) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Add two numbers stored most-significant digit first.

## Key insight
Either reverse both lists and add normally, or (without modifying input) push digits on stacks and prepend result nodes.

## Approach 1: Reverse + add
```java
// Reverses a list in place and returns the new head
static ListNode reverse(ListNode h) {
    ListNode prev = null;
    while (h != null) { ListNode nx = h.next; h.next = prev; prev = h; h = nx; }
    return prev;
}

// Approach 1: reverse both, add from the least significant digit, reverse the result
public ListNode addTwoNumbersReverse(ListNode a, ListNode b) {
    a = reverse(a);
    b = reverse(b);
    ListNode dummy = new ListNode(0), t = dummy;
    int carry = 0;
    while (a != null || b != null || carry > 0) {
        int s = carry + (a != null ? a.val : 0) + (b != null ? b.val : 0);
        t = t.next = new ListNode(s % 10);
        carry = s / 10;
        if (a != null) a = a.next;
        if (b != null) b = b.next;
    }
    return reverse(dummy.next);
}
```

## Approach 2: Two stacks
```java
// Approach 2: inputs untouched; stacks give the digits from the back; build the answer by prepending
public ListNode addTwoNumbers(ListNode a, ListNode b) {
    Deque<Integer> s1 = new ArrayDeque<>(), s2 = new ArrayDeque<>();
    for (; a != null; a = a.next) s1.push(a.val);
    for (; b != null; b = b.next) s2.push(b.val);
    ListNode head = null;
    int carry = 0;
    while (!s1.isEmpty() || !s2.isEmpty() || carry > 0) {
        int s = carry + (s1.isEmpty() ? 0 : s1.pop()) + (s2.isEmpty() ? 0 : s2.pop());
        head = new ListNode(s % 10, head);
        carry = s / 10;
    }
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse + add | O(m + n) | O(1) extra |
| Two stacks | O(m + n) | O(m + n) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger.

## Recall before you reveal
<details><summary>Final carry?</summary>

Loop while carry > 0 as well.

</details>


## Connected
- [Reverse Linked List](Reverse%20Linked%20List.md)
