---
topic: Linked List
pattern: [Merge sorted, Prepend]
source: GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Merge 2 sorted linked list in reverse order

> [!TIP]
> **🧠 Memory hook**
> Merge, but put each taken card on top of the pile.
> **Mantra: MERGE + PREPEND**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=17) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Merge two ascending lists into one descending list.

## Key insight
Standard merge, but each taken node is pushed to the front of the result.

## Approach: Merge + prepend
```java
// Merge by always taking the smaller node and pushing it to the FRONT of the result
public ListNode mergeResult(ListNode a, ListNode b) {
    ListNode res = null;
    while (a != null || b != null) {
        ListNode take;
        if (b == null || (a != null && a.val <= b.val)) { take = a; a = a.next; } else { take = b; b = b.next; }
        take.next = res;
        res = take;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Merge + prepend | O(m + n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Alternative?</summary>

Merge normally and reverse.

</details>


## Connected
- [Merge Two Sorted Lists](Merge%20Two%20Sorted%20Lists.md)
