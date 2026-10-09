---
topic: Linked List
pattern: [Monotonic stack / recursion]
source: LeetCode 2487
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Remove Nodes From Linked List

> [!TIP]
> **🧠 Memory hook**
> Keep only nodes that see no taller building to their right.
> **Mantra: RECURSE RIGHT, KEEP IF ≥ NEXT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=27) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Remove every node that has a strictly greater value somewhere to its right.

## Key insight
The result is non-increasing. Build it with a monotonic stack, or recursively from the right.

## Approach 1: Monotonic stack
```java
// Approach 1: monotonic stack of nodes (non-increasing); a bigger node removes smaller ones before it
public ListNode removeNodesStack(ListNode head) {
    Deque<ListNode> st = new ArrayDeque<>();
    for (ListNode t = head; t != null; t = t.next) {
        while (!st.isEmpty() && st.peek().val < t.val) st.pop();
        st.push(t);
    }
    ListNode res = null;
    while (!st.isEmpty()) { ListNode n = st.pop(); n.next = res; res = n; }
    return res;
}
```

## Approach 2: Recursion
```java
// Approach 2: recursion: clean the rest first; keep head only if it is >= the new next head
public ListNode removeNodes(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode rest = removeNodes(head.next);
    if (head.val < rest.val) return rest;
    head.next = rest;
    return head;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(n) |
| Recursion | O(n) | O(n) stack |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Third way?</summary>

Reverse, keep a running max, reverse back.

</details>


## Connected
- [Stack - Pattern Map](../Stack/Stack%20-%20Pattern%20Map.md)
