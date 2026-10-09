---
topic: Linked List
pattern: [Counting]
source: LeetCode 725
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Split Linked List in Parts

> [!TIP]
> **🧠 Memory hook**
> Share n sweets among k kids: the first n % k kids get one more.
> **Mantra: SIZE = n/k (+1 FOR FIRST n%k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=36) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Split into k consecutive parts with sizes differing by at most 1 (earlier parts larger).

## Key insight
Count n; part i has size n/k + (i < n%k ? 1 : 0); cut after each part.

## Approach: Count + cut
```java
// Sizes: len / k each, and the first len % k parts get one extra node
public ListNode[] splitListToParts(ListNode head, int k) {
    int len = 0;
    for (ListNode t = head; t != null; t = t.next) len++;
    ListNode[] parts = new ListNode[k];
    ListNode cur = head;
    for (int i = 0; i < k && cur != null; i++) {
        parts[i] = cur;
        int size = len / k + (i < len % k ? 1 : 0);
        for (int j = 1; j < size; j++) cur = cur.next;
        ListNode nx = cur.next;
        cur.next = null;
        cur = nx;
    }
    return parts;
}
```

| Approach | Time | Space |
|---|---|---|
| Count + cut | O(n + k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Checked sizes and order for every n ≤ 12, k ≤ 6.

## Recall before you reveal
<details><summary>k > n?</summary>

Trailing parts are null.

</details>

