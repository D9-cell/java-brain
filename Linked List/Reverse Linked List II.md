---
topic: Linked List
pattern: [Head insertion]
source: LeetCode 92
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Reverse Linked List II

> [!TIP]
> **🧠 Memory hook**
> Reverse a window by moving each node to the window's front.
> **Mantra: STOP BEFORE left, HEAD-INSERT right−left TIMES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=32) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Reverse the nodes from position left to right in one pass.

## Key insight
Walk to the node before the window; then right − left times move cur.next to just after prev.

## Approach: Head insertion
```java
// One pass "head insertion": walk to the node before left, then move each next node to just after prev
public ListNode reverseBetween(ListNode head, int left, int right) {
    ListNode dummy = new ListNode(0, head), prev = dummy;
    for (int i = 1; i < left; i++) prev = prev.next;
    ListNode cur = prev.next;
    for (int i = 0; i < right - left; i++) {
        ListNode move = cur.next;
        cur.next = move.next;
        move.next = prev.next;
        prev.next = move;
    }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Head insertion | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked every (left, right) for n ≤ 8.

## Recall before you reveal
<details><summary>Which pointers stay fixed?</summary>

prev and cur (cur drifts right as nodes jump over it).

</details>


## Connected
- [Reverse Nodes in k-Group](Reverse%20Nodes%20in%20k-Group.md)
