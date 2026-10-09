---
topic: Linked List
pattern: [Head insertion]
source: LeetCode 25
difficulty: Hard
companies: [Amazon, Microsoft, Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Reverse Nodes in k-Group

> [!TIP]
> **🧠 Memory hook**
> Reverse-List-II applied to every full window.
> **Mantra: COUNT, HEAD-INSERT k−1 PER GROUP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=33) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Reverse every consecutive group of k nodes; a short tail stays as is.

## Key insight
Count the length; for each full group apply head insertion k−1 times; the old group head becomes the next groupPrev.

## Approach: Count + head insertion
```java
// Count first: only full groups are reversed. For each group, head-insert k-1 nodes after groupPrev
public ListNode reverseKGroup(ListNode head, int k) {
    int len = 0;
    for (ListNode t = head; t != null; t = t.next) len++;
    ListNode dummy = new ListNode(0, head), groupPrev = dummy;
    for (int g = 0; g < len / k; g++) {
        ListNode cur = groupPrev.next;
        for (int i = 0; i < k - 1; i++) {
            ListNode move = cur.next;
            cur.next = move.next;
            move.next = groupPrev.next;
            groupPrev.next = move;
        }
        groupPrev = cur;
    }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Count + head insertion | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked every k for n ≤ 12.

## Recall before you reveal
<details><summary>Next groupPrev?</summary>

The group's original first node (now its tail).

</details>


## Connected
- [Reverse Linked List II](Reverse%20Linked%20List%20II.md)
