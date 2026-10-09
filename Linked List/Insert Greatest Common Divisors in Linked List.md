---
topic: Linked List
pattern: [Splicing]
source: LeetCode 2807
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Insert Greatest Common Divisors in Linked List

> [!TIP]
> **🧠 Memory hook**
> A bridge between every pair of neighbours.
> **Mantra: INSERT gcd, JUMP TWO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=11) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Insert a node with gcd(a, b) between every adjacent pair.

## Key insight
Insert and skip over the new node.

## Approach 1: Iterative
```java
// Euclid
static int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }

// Approach 1: between every adjacent pair insert a node with their gcd, then skip over it
public ListNode insertGreatestCommonDivisors(ListNode head) {
    for (ListNode t = head; t.next != null; t = t.next.next) t.next = new ListNode(gcd(t.val, t.next.val), t.next);
    return head;
}
```

## Approach 2: Recursive
```java
// Approach 2: recursion story: fix the rest, then link this node → gcd node → rest
public ListNode insertRec(ListNode head) {
    if (head.next == null) return head;
    ListNode rest = insertRec(head.next);
    head.next = new ListNode(gcd(head.val, rest.val), rest);
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative | O(n log V) | O(1) extra |
| Recursive | O(n log V) | O(n) stack |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Step size?</summary>

Two nodes.

</details>

