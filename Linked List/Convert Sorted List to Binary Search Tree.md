---
topic: Linked List
pattern: [Slow / fast, Divide and conquer]
source: LeetCode 109
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Convert Sorted List to Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> The middle of a sorted list is the fair root.
> **Mantra: MIDDLE = ROOT, RECURSE HALVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=1) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Build a height-balanced BST from a sorted list.

## Key insight
Find the middle (cut before it), make it the root, recurse on both halves.

## Approach: Middle split
```java
// Find the middle with slow/fast (cut the list before it); middle = root, halves = subtrees
public TreeNode sortedListToBST(ListNode head) {
    if (head == null) return null;
    if (head.next == null) return new TreeNode(head.val);
    ListNode prev = null, slow = head, fast = head;
    while (fast != null && fast.next != null) { prev = slow; slow = slow.next; fast = fast.next.next; }
    prev.next = null;
    TreeNode root = new TreeNode(slow.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(slow.next);
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Middle split | O(n log n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked balance and in-order sequence for n = 0..40.

## Recall before you reveal
<details><summary>O(n) version?</summary>

Count n, build by in-order index ranges while advancing a global list pointer.

</details>


## Connected
- [Middle of the Linked List](Middle%20of%20the%20Linked%20List.md)
