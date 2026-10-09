---
topic: Linked List
pattern: [Floyd cycle detection]
source: LeetCode 142
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Linked List Cycle II

> [!TIP]
> **🧠 Memory hook**
> Runners meet on the track; a new runner from the start meets the slow one at the entrance.
> **Mantra: FLOYD MEET, RESET ONE TO HEAD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=14) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Return the node where the cycle begins (or null).

## Key insight
Slow/fast meet inside the cycle; then moving one pointer from the head and one from the meeting point, one step each, they meet at the entry.

## Approach: Floyd
```java
// Floyd: meet inside the cycle, then one pointer from head and one from the meeting point meet at the entry
public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            ListNode p = head;
            while (p != slow) { p = p.next; slow = slow.next; }
            return p;
        }
    }
    return null;
}
```

| Approach | Time | Space |
|---|---|---|
| Floyd | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked every cycle entry position for n ≤ 12.

## Recall before you reveal
<details><summary>Why do they meet at the entry?</summary>

head→entry distance ≡ meet→entry distance (mod cycle length).

</details>

