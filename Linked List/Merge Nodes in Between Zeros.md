---
topic: Linked List
pattern: [In-place rewiring]
source: LeetCode 2181
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Merge Nodes in Between Zeros

> [!TIP]
> **🧠 Memory hook**
> Each zero is a bucket that collects the block after it.
> **Mantra: REUSE ZEROS AS HOLDERS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=22) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Replace each block between zeros by one node holding its sum.

## Key insight
Accumulate into the leading zero node; link holders together; drop the last zero.

## Approach 1: Iterative
```java
// Reuse each zero node as the holder of the sum that follows it; skip to the next zero
public ListNode mergeNodes(ListNode head) {
    ListNode holder = head;
    for (ListNode t = head.next; t != null; t = t.next) {
        if (t.val != 0) holder.val += t.val;
        else if (t.next != null) { holder.next = t; holder = t; }
        else holder.next = null;
    }
    return head;
}
```

## Approach 2: Recursive
```java
// Recursion story: sum this segment, then recurse from the next zero
public ListNode mergeNodesRec(ListNode head) {
    if (head.next == null) return null;
    ListNode t = head.next;
    int sum = 0;
    while (t.val != 0) { sum += t.val; t = t.next; }
    head.val = sum;
    head.next = mergeNodesRec(t);
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative | O(n) | O(1) |
| Recursive | O(n) | O(blocks) stack |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Last zero?</summary>

holder.next = null.

</details>

