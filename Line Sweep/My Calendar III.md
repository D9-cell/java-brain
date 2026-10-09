---
topic: Line Sweep
pattern: [Line sweep, Max overlap]
source: LeetCode 732
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# My Calendar III

> [!TIP]
> **🧠 Memory hook**
> A stadium counter that shows the biggest crowd ever after each new event is added.
> **Mantra: ADD, SWEEP, RETURN MAX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=7) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
After every `book(start, end)` return the largest k such that some moment is covered by k bookings.

## Key insight
Same as Meeting Rooms II, recomputed after each booking: add the deltas, then sweep for the maximum running sum.

## Approach: TreeMap sweep
```java
// Keeps all boundaries in a TreeMap; each booking sweeps for the max overlap
static class MyCalendarThree {
    private final TreeMap<Integer, Integer> events = new TreeMap<>();

    // Adds the booking and returns the largest k-booking so far
    public int book(int start, int end) {
        events.merge(start, 1, Integer::sum);
        events.merge(end, -1, Integer::sum);
        int active = 0, best = 0;
        for (int d : events.values()) {
            active += d;
            best = Math.max(best, active);
        }
        return best;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap sweep | O(n) per book | O(n) |

## Recall before you reveal
<details><summary>Faster for many calls?</summary>

Dynamic segment tree with lazy max: O(log C).

</details>


<details><summary>Offline twin?</summary>

[Meeting Rooms II](Meeting%20Rooms%20II.md).

</details>


## Connected
- [My Calendar II](My%20Calendar%20II.md)
- [Meeting Rooms II](Meeting%20Rooms%20II.md)
