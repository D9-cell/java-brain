---
topic: Linked List
pattern: [Prefix sums]
source: LeetCode 1171
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Remove Zero Sum Consecutive Nodes from Linked List

> [!TIP]
> **🧠 Memory hook**
> Same prefix sum twice ⇒ everything between cancels.
> **Mantra: LAST NODE PER PREFIX SUM, JUMP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=29) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Repeatedly delete consecutive sequences summing to 0.

## Key insight
First pass: map each prefix sum to its LAST node. Second pass: link each node to last[sum].next.

## Approach: Two-pass prefix map
```java
// Two passes over prefix sums: remember the LAST node for each prefix sum, then link each node past its zero-sum block
public ListNode removeZeroSumSublists(ListNode head) {
    ListNode dummy = new ListNode(0, head);
    Map<Integer, ListNode> last = new HashMap<>();
    int sum = 0;
    for (ListNode t = dummy; t != null; t = t.next) { sum += t.val; last.put(sum, t); }
    sum = 0;
    for (ListNode t = dummy; t != null; t = t.next) { sum += t.val; t.next = last.get(sum).next; }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Two-pass prefix map | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked: no zero-sum block remains and the result is a subsequence of the input.

## Recall before you reveal
<details><summary>Why the dummy (sum 0)?</summary>

A zero-sum prefix starting at the head.

</details>

