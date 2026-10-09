---
topic: Design
pattern: [Counters]
source: LeetCode 1603
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Parking System

> [!TIP]
> **🧠 Memory hook**
> Three ticket counters, one per car size.
> **Mantra: COUNTER PER TYPE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=12) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
addCar(carType) if a slot of that size is left.

## Key insight
Index the counters by carType.

## Approach: Counters
```java
// Remaining slots per car type (1 big, 2 medium, 3 small)
static class ParkingSystem {
    private final int[] slots;

    ParkingSystem(int big, int medium, int small) { slots = new int[]{0, big, medium, small}; }

    // Take a slot if one is left
    public boolean addCar(int carType) {
        if (slots[carType] == 0) return false;
        slots[carType]--;
        return true;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Counters | O(1) | O(1) |

## Recall before you reveal
<details><summary>Why size 4?</summary>

carType is 1..3; index 0 unused.

</details>

