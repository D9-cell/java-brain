---
topic: Linked List
pattern: [Interleaving]
source: LeetCode 138
difficulty: Medium
companies: [Amazon, Microsoft, Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Copy List with Random Pointer

> [!TIP]
> **🧠 Memory hook**
> Weave each copy right behind its original.
> **Mantra: INTERLEAVE, SET random, UNZIP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=2) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Deep copy a list where nodes also have a random pointer.

## Key insight
With a map old → new it is easy. In O(1) extra space, interleave copies (A A' B B'), set copy.random = original.random.next, then unzip.

## Approach 1: HashMap
```java
// Approach 1: HashMap old → new, then wire next and random through the map
public Node copyRandomListMap(Node head) {
    Map<Node, Node> m = new HashMap<>();
    for (Node t = head; t != null; t = t.next) m.put(t, new Node(t.val));
    for (Node t = head; t != null; t = t.next) { m.get(t).next = m.get(t.next); m.get(t).random = m.get(t.random); }
    return m.get(head);
}
```

## Approach 2: Interleave
```java
// Approach 2: interleave copies (A A' B B' …), set random = old.random.next, then unzip
public Node copyRandomList(Node head) {
    for (Node t = head; t != null; t = t.next.next) { Node c = new Node(t.val); c.next = t.next; t.next = c; }
    for (Node t = head; t != null; t = t.next.next) t.next.random = t.random == null ? null : t.random.next;
    Node dummy = new Node(0), tail = dummy;
    for (Node t = head; t != null; t = t.next) { tail = tail.next = t.next; t.next = t.next.next; }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| HashMap | O(n) | O(n) |
| Interleave | O(n) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Verified on random lists: values, random targets by index, no shared nodes, original restored.

## Recall before you reveal
<details><summary>Why must you unzip?</summary>

To restore the original list.

</details>

