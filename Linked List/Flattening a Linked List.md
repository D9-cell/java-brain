---
topic: Linked List
pattern: [Merge sorted]
source: GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Flattening a Linked List

> [!TIP]
> **🧠 Memory hook**
> Sorted columns merged right to left.
> **Mantra: FLATTEN RIGHT, MERGE TWO SORTED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=10) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Each node has next and a sorted bottom list; flatten into one sorted bottom list.

## Key insight
Recursively flatten the rest, then merge the current column with it (Merge Two Sorted Lists along bottom).

## Approach: Recursive merge
```java
// Merge Two Sorted Lists along the bottom pointers
static Node merge(Node a, Node b) {
    Node dummy = new Node(0), t = dummy;
    while (a != null && b != null) {
        if (a.data <= b.data) { t.bottom = a; a = a.bottom; } else { t.bottom = b; b = b.bottom; }
        t = t.bottom;
    }
    t.bottom = a != null ? a : b;
    return dummy.bottom;
}

// Flatten the rest, then merge this column into it
public Node flatten(Node root) {
    if (root == null || root.next == null) return root;
    Node rest = flatten(root.next);
    root.next = null;
    return merge(root, rest);
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive merge | O(N · columns) | O(columns) |

> [!WARNING]
> **Java gotcha**
> Verified on random sorted columns.

## Recall before you reveal
<details><summary>Heap alternative?</summary>

Min-heap of column heads.

</details>


## Connected
- [Merge Two Sorted Lists](Merge%20Two%20Sorted%20Lists.md)
