---
topic: Linked List
pattern: [Merge sorted, Heap, Divide and conquer]
source: LeetCode 23
difficulty: Hard
companies: [Amazon, Google, Meta, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Merge k Sorted Lists

> [!TIP]
> **🧠 Memory hook**
> k sorted queues; a referee (heap) calls the smallest head.
> **Mantra: MIN-HEAP OF HEADS (OR DIVIDE & CONQUER)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=19) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Merge k sorted lists into one.

## Key insight
Min-heap of current heads (pop, push its next), or pairwise merging like merge sort.

## Approach 1: Divide and conquer
```java
// Classic two-list merge with a dummy head
static ListNode merge(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), t = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; }
        t = t.next;
    }
    t.next = a != null ? a : b;
    return dummy.next;
}

// Approach 1: divide and conquer (merge sort over the lists): log k rounds
private ListNode divide(ListNode[] lists, int l, int r) {
    if (l > r) return null;
    if (l == r) return lists[l];
    int m = (l + r) >>> 1;
    return merge(divide(lists, l, m), divide(lists, m + 1, r));
}

// Divide-and-conquer entry point
public ListNode mergeKListsDivide(ListNode[] lists) { return divide(lists, 0, lists.length - 1); }
```

## Approach 2: Min-heap
```java
// Approach 2: min-heap of the current heads
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
    for (ListNode l : lists) if (l != null) pq.offer(l);
    ListNode dummy = new ListNode(0), t = dummy;
    while (!pq.isEmpty()) {
        t = t.next = pq.poll();
        if (t.next != null) pq.offer(t.next);
    }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Divide and conquer | O(N log k) | O(log k) |
| Min-heap | O(N log k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Naive cost?</summary>

Merging one by one is O(N·k).

</details>


## Connected
- [Merge Two Sorted Lists](Merge%20Two%20Sorted%20Lists.md)
