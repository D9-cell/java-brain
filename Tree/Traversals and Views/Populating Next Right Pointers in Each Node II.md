---
topic: Traversals and Views
pattern: [Next pointers, Dummy head per level]
source: LeetCode 117
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Populating Next Right Pointers in Each Node II

> [!TIP]
> **🧠 Memory hook**
> Same railway, but some stations are missing, so build each next row with a **dummy head**.
> **Mantra: DUMMY HEAD, TAIL APPENDS CHILDREN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=20) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
Same as before, but the tree is any binary tree.

## Key insight
Walk the current level through its `next` chain. Append every child to a tail pointer hanging from a dummy node; the dummy's next is the head of the next level.

## Approach 1: Dummy head, O(1) space
```java
// Part II (any tree): walk a level through its next chain and build the next level with a dummy head, O(1) space
public Node connect(Node root) {
    Node head = root;
    while (head != null) {
        Node dummy = new Node(0), tail = dummy;
        for (Node cur = head; cur != null; cur = cur.next) {
            if (cur.left != null) { tail.next = cur.left; tail = tail.next; }
            if (cur.right != null) { tail.next = cur.right; tail = tail.next; }
        }
        head = dummy.next;
    }
    return root;
}
```

## Approach 2: Queue
```java
// Part II with a queue, O(n) space
public Node connectQueue(Node root) {
    if (root == null) return null;
    Queue<Node> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        Node prev = null;
        for (int i = q.size(); i > 0; i--) {
            Node cur = q.poll();
            if (prev != null) prev.next = cur;
            prev = cur;
            if (cur.left != null) q.add(cur.left);
            if (cur.right != null) q.add(cur.right);
        }
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Dummy head, O(1) space | O(n) | O(1) |
| Queue | O(n) | O(w) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why a dummy head?</summary>

The first child of the next level is not known in advance.

</details>


## Connected
- [Populating Next Right Pointers in Each Node](Populating%20Next%20Right%20Pointers%20in%20Each%20Node.md)
- [Linked List dummy head](../../Linked%20List/Linked%20List%20-%20Pattern%20Map.md)
