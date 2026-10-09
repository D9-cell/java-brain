---
topic: Linked List
pattern: [Reservoir sampling]
source: LeetCode 382
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Linked List Random Node

> [!TIP]
> **🧠 Memory hook**
> Keep the i-th visitor with probability 1/i.
> **Mantra: RESERVOIR SAMPLING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=15) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Return a uniformly random node value.

## Key insight
Store values in an array, or use reservoir sampling for O(1) space and unknown length.

## Approach 1: Array
```java
// Approach 1 (simple): copy values to a list and pick a random index
static class ArraySolution {
    private final List<Integer> vals;
    private final Random rnd = new Random(1);

    ArraySolution(ListNode head) { vals = ListNode.toList(head); }

    // Uniform index
    public int getRandom() { return vals.get(rnd.nextInt(vals.size())); }
}
```

## Approach 2: Reservoir sampling
```java
// Reservoir sampling: keep the i-th node with probability 1/i, one pass, O(1) space
static class Solution {
    private final ListNode head;
    private final Random rnd;

    Solution(ListNode head, long seed) { this.head = head; this.rnd = new Random(seed); }

    // Every node ends up chosen with probability 1/n
    public int getRandom() {
        int res = 0, i = 0;
        for (ListNode t = head; t != null; t = t.next) if (rnd.nextInt(++i) == 0) res = t.val;
        return res;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Array | O(1) per call | O(n) |
| Reservoir sampling | O(n) per call | O(1) |

> [!WARNING]
> **Java gotcha**
> Empirical check: 100,000 draws are uniform within 2%.

## Recall before you reveal
<details><summary>Proof?</summary>

(1/i) · Π(1 − 1/j) for j > i = 1/n.

</details>

