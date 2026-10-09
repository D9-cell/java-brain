---
topic: Linked List
pattern: [Dummy head, HashSet]
source: LeetCode 3217
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Delete Nodes From Linked List Present in Array

> [!TIP]
> **🧠 Memory hook**
> A bouncer looking one step ahead.
> **Mantra: SET + DUMMY + LOOK AHEAD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=4) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Remove every node whose value appears in nums.

## Key insight
Set of values; walk from a dummy and unlink bad next nodes without advancing.

## Approach: Set + dummy
```java
// Put nums in a set; walk with a dummy head and unlink every node whose value is in the set
public ListNode modifiedList(int[] nums, ListNode head) {
    Set<Integer> bad = new HashSet<>();
    for (int x : nums) bad.add(x);
    ListNode dummy = new ListNode(0, head), t = dummy;
    while (t.next != null) {
        if (bad.contains(t.next.val)) t.next = t.next.next;
        else t = t.next;
    }
    return dummy.next;
}
```

| Approach | Time | Space |
|---|---|---|
| Set + dummy | O(n + m) | O(m) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Why stay after unlinking?</summary>

The new next might also be bad.

</details>

