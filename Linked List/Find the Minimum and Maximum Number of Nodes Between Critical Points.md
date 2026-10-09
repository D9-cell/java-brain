---
topic: Linked List
pattern: [One pass with prev/next]
source: LeetCode 2058
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Find the Minimum and Maximum Number of Nodes Between Critical Points

> [!TIP]
> **🧠 Memory hook**
> Hills and valleys: only first, previous and current matter.
> **Mantra: TRACK first, last, minGap**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=8) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Return [min distance, max distance] between critical points (local maxima/minima) or [-1, -1].

## Key insight
One pass with prev, cur, next; track the first and the last critical index and the minimum gap.

## Approach: One pass
```java
// One pass with prev/cur/next; remember the first and the previous critical index
public int[] nodesBetweenCriticalPoints(ListNode head) {
    int first = -1, last = -1, minD = Integer.MAX_VALUE, idx = 1;
    ListNode prev = head, cur = head.next;
    while (cur != null && cur.next != null) {
        boolean crit = (cur.val > prev.val && cur.val > cur.next.val) || (cur.val < prev.val && cur.val < cur.next.val);
        if (crit) {
            if (first == -1) first = idx;
            else minD = Math.min(minD, idx - last);
            last = idx;
        }
        prev = cur;
        cur = cur.next;
        idx++;
    }
    return minD == Integer.MAX_VALUE ? new int[]{-1, -1} : new int[]{minD, last - first};
}
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Max distance?</summary>

last − first.

</details>

