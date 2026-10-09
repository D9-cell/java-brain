---
topic: Linked List
pattern: [Digits as nodes]
source: LeetCode 1290
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Convert Binary Number in a Linked List to Integer

> [!TIP]
> **🧠 Memory hook**
> Read binary like decimal: shift and add.
> **Mantra: v = 2v + bit**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=13) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Decimal value of a binary number stored most significant bit first.

## Key insight
Horner's rule: v = (v << 1) | bit.

## Approach: Shift and add
```java
// Read most significant bit first: value = value * 2 + bit (no reversal needed)
public int getDecimalValue(ListNode head) {
    int v = 0;
    for (; head != null; head = head.next) v = (v << 1) | head.val;
    return v;
}
```

| Approach | Time | Space |
|---|---|---|
| Shift and add | O(n) | O(1) |

## Recall before you reveal
<details><summary>Why no reversal?</summary>

Horner consumes digits left to right.

</details>

