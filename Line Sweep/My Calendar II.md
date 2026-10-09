---
topic: Line Sweep
pattern: [Line sweep, Undo on failure]
source: LeetCode 731
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# My Calendar II

> [!TIP]
> **🧠 Memory hook**
> Booking in pencil: write it in, sweep for a triple clash, and erase it if there is one.
> **Mantra: ADD, SWEEP, >2 → UNDO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=6) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
`book(start, end)` must return false (and not store the booking) if it would cause a triple booking.

## Key insight
Tentatively apply the deltas, sweep the TreeMap, and if any running count exceeds 2, roll the deltas back.

## Approach: TreeMap sweep with rollback
```java
// Tentatively add the booking, sweep; if any point exceeds 2 overlaps, undo it
static class MyCalendarTwo {
    private final TreeMap<Integer, Integer> events = new TreeMap<>();

    // Returns true and keeps the booking unless it causes a triple booking
    public boolean book(int start, int end) {
        events.merge(start, 1, Integer::sum);
        events.merge(end, -1, Integer::sum);
        int active = 0;
        for (int d : events.values()) {
            active += d;
            if (active > 2) {
                events.merge(start, -1, Integer::sum);
                events.merge(end, 1, Integer::sum);
                return false;
            }
        }
        return true;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap sweep with rollback | O(n) per book | O(n) |

## Recall before you reveal
<details><summary>Why roll back?</summary>

Rejected bookings must not affect later answers.

</details>


<details><summary>What changes for My Calendar I?</summary>

The limit becomes 1.

</details>


## Connected
- [My Calendar III](My%20Calendar%20III.md)
