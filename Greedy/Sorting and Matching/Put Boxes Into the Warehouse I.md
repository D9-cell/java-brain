---
topic: Sorting and Matching
pattern: [Prefix minimum, Sort]
source: LeetCode 1564
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Put Boxes Into the Warehouse I

> [!TIP]
> **🧠 Memory hook**
> A box slides from the left until it hits a **low ceiling**, so each room is limited by the lowest room before it.
> **Mantra: ROOM LIMIT = PREFIX MIN, SMALLEST BOXES DEEPEST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=5) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Boxes are pushed into the warehouse from the left; a box stops before the first room lower than itself. You may reorder boxes. Return the maximum number of boxes placed.

## Key insight
Replace each room height by the prefix minimum (effective height). Then place the smallest boxes into the deepest rooms: scan rooms from the right and boxes from the smallest.

## Approach 1: Prefix min + smallest boxes deepest
```java
// A box can only reach room i if every room before it is at least as tall, so cap each room by the minimum so far; then place the smallest boxes deepest
public int maxBoxesInWarehouse(int[] boxes, int[] warehouse) {
    int[] cap = warehouse.clone();
    for (int i = 1; i < cap.length; i++) cap[i] = Math.min(cap[i], cap[i - 1]);
    Arrays.sort(boxes);
    int placed = 0, b = 0;
    for (int room = cap.length - 1; room >= 0 && b < boxes.length; room--) if (boxes[b] <= cap[room]) { placed++; b++; }
    return placed;
}
```

## Approach 2: Largest first from the left
```java
// Boxes inserted largest first: each room takes the largest box that still fits it
public int maxBoxesInWarehouseLargestFirst(int[] boxes, int[] warehouse) {
    Integer[] sorted = new Integer[boxes.length];
    for (int i = 0; i < boxes.length; i++) sorted[i] = boxes[i];
    Arrays.sort(sorted, Collections.reverseOrder());
    int cap = Integer.MAX_VALUE, placed = 0, b = 0;
    for (int room : warehouse) {
        cap = Math.min(cap, room);
        while (b < sorted.length && sorted[b] > cap) b++;
        if (b == sorted.length) break;
        placed++;
        b++;
    }
    return placed;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix min + smallest boxes deepest | O(n log n + m) | O(m) |
| Largest first from the left | O(n log n + m) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why scan rooms from the right?</summary>

The deepest rooms have the smallest effective height, so they should take the smallest boxes.

</details>


## Connected
- [Two City Scheduling](Two%20City%20Scheduling.md)
