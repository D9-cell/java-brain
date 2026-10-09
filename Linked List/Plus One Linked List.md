---
topic: Linked List
pattern: [Digits as nodes]
source: LeetCode 369 (Premium)
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Plus One Linked List

> [!TIP]
> **🧠 Memory hook**
> An odometer: 9s roll over, the last non-9 digit ticks up.
> **Mantra: LAST NON-9 ++, ZEROS AFTER, SENTINEL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=26) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Add one to the number stored in the list.

## Key insight
Find the last digit ≠ 9 (a sentinel 0 in front covers all-9s), increment it and zero everything after.

## Approach: Last non-9
```java
// Find the last digit that is not 9; increment it and zero everything after it (a sentinel 0 handles 999)
public ListNode plusOne(ListNode head) {
    ListNode sentinel = new ListNode(0, head), notNine = sentinel;
    for (ListNode t = head; t != null; t = t.next) if (t.val != 9) notNine = t;
    notNine.val++;
    for (ListNode t = notNine.next; t != null; t = t.next) t.val = 0;
    return sentinel.val == 1 ? sentinel : head;
}
```

| Approach | Time | Space |
|---|---|---|
| Last non-9 | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger with many trailing 9s.

## Recall before you reveal
<details><summary>All 9s?</summary>

The sentinel becomes 1 and is the new head.

</details>


## Connected
- [Double a Number Represented as a Linked List](Double%20a%20Number%20Represented%20as%20a%20Linked%20List.md)
